import * as pdfjsLib from 'pdfjs-dist';
import type { PortfolioData, Experience, Education, SkillCategory } from '../types';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  try {
    // Use matching unpkg CDN worker to avoid complex bundler worker configuration
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '4.10.38'}/build/pdf.worker.min.mjs`;
  } catch (e) {
    console.warn('PDF.js worker initialization notice:', e);
  }
}

export interface ParsedLinkedInData {
  profile?: {
    name?: string;
    title?: string;
    location?: string;
    email?: string;
    linkedinUrl?: string;
    phone?: string;
  };
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  certifications?: string[];
  publications?: {
    title: string;
    details: string;
    link: string;
  }[];
  rawTextPreview?: string;
}

interface TextItem {
  str: string;
  x: number;
  y: number;
  page: number;
  height: number;
}

const DATE_RANGE_REGEX = /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Juli?|Agustus|Desember)?\s*\d{4}\s*[-–—]\s*(?:Present|Sekarang|(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?|Juli?|Agustus|Desember)?\s*\d{4})(?:\s*\(.*?\))?/i;

const YEAR_RANGE_REGEX = /\b(19\d\d|20\d\d)\s*[-–—]\s*(19\d\d|20\d\d|Present|Sekarang)\b/i;

/**
 * Extract all text items with coordinates from a PDF file using PDF.js
 */
export async function extractTextItemsFromPdf(file: File): Promise<TextItem[]> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;
  const items: TextItem[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    for (const item of textContent.items as any[]) {
      if (!item.str || item.str.trim() === '') continue;
      // transform: [scaleX, skewY, skewX, scaleY, translateX, translateY]
      const tx = item.transform[4] || 0;
      const ty = item.transform[5] || 0;
      items.push({
        str: item.str.trim(),
        x: Math.round(tx),
        y: Math.round(ty),
        page: pageNum,
        height: item.height || 10,
      });
    }
  }

  return items;
}

/**
 * Parse structured LinkedIn data from text items
 */
export async function parseLinkedInPdf(file: File): Promise<ParsedLinkedInData> {
  const items = await extractTextItemsFromPdf(file);

  if (items.length === 0) {
    throw new Error('No readable text found in PDF. Make sure this is an official LinkedIn PDF resume.');
  }

  // LinkedIn Standard PDF layout:
  // Page width is ~595 pt (A4). Left column has x < 210, Main column has x >= 210.
  const sidebarItems: TextItem[] = [];
  const mainItems: TextItem[] = [];

  for (const it of items) {
    if (it.x < 210) {
      sidebarItems.push(it);
    } else {
      mainItems.push(it);
    }
  }

  // Sort function: page asc, then y desc (top to bottom), then x asc
  const sortTopToBottom = (a: TextItem, b: TextItem) => {
    if (a.page !== b.page) return a.page - b.page;
    if (Math.abs(a.y - b.y) > 3) return b.y - a.y; // Higher Y = closer to top in PDF coordinates
    return a.x - b.x;
  };

  sidebarItems.sort(sortTopToBottom);
  mainItems.sort(sortTopToBottom);

  const sidebarLines = sidebarItems.map((i) => i.str);
  const mainLines = mainItems.map((i) => i.str);

  const result: ParsedLinkedInData = {
    profile: {},
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    publications: [],
  };

  // 1. Extract Profile from Main Header & Sidebar
  // Main header usually: Line 0 = Name, Line 1 = Headline, Line 2 = Location
  if (mainLines.length > 0) {
    result.profile!.name = mainLines[0];
  }
  if (mainLines.length > 1 && !mainLines[1].toLowerCase().includes('summary') && !mainLines[1].toLowerCase().includes('experience')) {
    result.profile!.title = mainLines[1];
  }
  if (mainLines.length > 2 && !mainLines[2].toLowerCase().includes('summary') && !mainLines[2].toLowerCase().includes('experience')) {
    result.profile!.location = mainLines[2];
  }

  // Find Email, LinkedIn URL, Phone in Sidebar or anywhere
  const fullText = [...sidebarLines, ...mainLines].join('\n');
  const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    result.profile!.email = emailMatch[0];
  }

  const linkedinMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  if (linkedinMatch) {
    result.profile!.linkedinUrl = linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`;
  }

  const phoneMatch = fullText.match(/(?:\+62|08)[0-9\s-]{8,14}/);
  if (phoneMatch) {
    result.profile!.phone = phoneMatch[0].replace(/[\s-]/g, '');
  }

  // 2. Parse Sidebar Sections (Top Skills, Certifications, Publications)
  let currentSidebarSection: 'none' | 'skills' | 'certifications' | 'publications' = 'none';

  for (let i = 0; i < sidebarLines.length; i++) {
    const line = sidebarLines[i];
    const lower = line.toLowerCase();

    if (lower === 'top skills' || lower === 'skills') {
      currentSidebarSection = 'skills';
      continue;
    } else if (lower.includes('certifications') || lower.includes('licenses & certifications')) {
      currentSidebarSection = 'certifications';
      continue;
    } else if (lower.includes('publications')) {
      currentSidebarSection = 'publications';
      continue;
    } else if (lower === 'languages' || lower === 'contact' || lower === 'summary') {
      currentSidebarSection = 'none';
      continue;
    }

    if (currentSidebarSection === 'skills') {
      if (line && line.length > 1 && !line.includes('Page ') && !line.includes('www.linkedin.com')) {
        result.skills!.push(line);
      }
    } else if (currentSidebarSection === 'certifications') {
      if (line && line.length > 2 && !line.includes('Page ') && !line.includes('www.linkedin.com')) {
        result.certifications!.push(line);
      }
    } else if (currentSidebarSection === 'publications') {
      if (line && line.length > 2 && !line.includes('Page ')) {
        result.publications!.push({
          title: line,
          details: 'Extracted from LinkedIn profile',
          link: '',
        });
      }
    }
  }

  // 3. Parse Main Body Sections (Summary, Experience, Education)
  // Divide main lines by primary section headers
  interface SectionBlock {
    name: string;
    lines: string[];
  }

  const sectionBlocks: SectionBlock[] = [];
  let currentBlock: SectionBlock = { name: 'header', lines: [] };

  const knownHeaders = ['summary', 'experience', 'education', 'publications', 'projects', 'certifications'];

  for (const line of mainLines) {
    const lower = line.trim().toLowerCase();
    if (knownHeaders.includes(lower)) {
      if (currentBlock.lines.length > 0) {
        sectionBlocks.push(currentBlock);
      }
      currentBlock = { name: lower, lines: [] };
    } else {
      currentBlock.lines.push(line);
    }
  }
  if (currentBlock.lines.length > 0) {
    sectionBlocks.push(currentBlock);
  }

  // Process Summary
  const summaryBlock = sectionBlocks.find((b) => b.name === 'summary');
  if (summaryBlock && summaryBlock.lines.length > 0) {
    result.summary = summaryBlock.lines.join(' ').replace(/\s+/g, ' ').trim();
  }

  // Process Experience
  const expBlock = sectionBlocks.find((b) => b.name === 'experience');
  if (expBlock && expBlock.lines.length > 0) {
    result.experience = parseExperienceLines(expBlock.lines);
  }

  // Process Education
  const eduBlock = sectionBlocks.find((b) => b.name === 'education');
  if (eduBlock && eduBlock.lines.length > 0) {
    result.education = parseEducationLines(eduBlock.lines);
  }

  result.rawTextPreview = [...mainLines.slice(0, 15), '...', `Total lines extracted: ${mainLines.length + sidebarLines.length}`].join('\n');

  return result;
}

/**
 * Parse lines belonging to the Experience section of LinkedIn PDF
 */
function parseExperienceLines(lines: string[]): Experience[] {
  const experiences: Experience[] = [];
  
  let currentExp: Partial<Experience> | null = null;
  let responsibilitiesBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.includes('Page ') || line.includes('LinkedIn')) continue;

    // Check if line contains a date range (indicates an experience entry)
    const isDateLine = DATE_RANGE_REGEX.test(line) || YEAR_RANGE_REGEX.test(line);

    if (isDateLine) {
      // If we already had an experience accumulating, flush it
      if (currentExp && currentExp.company && currentExp.role) {
        currentExp.responsibilities = [...responsibilitiesBuffer];
        currentExp.achievements = [];
        experiences.push(currentExp as Experience);
      }

      // In LinkedIn PDFs, the 2 lines BEFORE the date line are usually Role & Company
      // e.g.:
      // line i-2: Company Name (or Role)
      // line i-1: Role (or Company Name)
      // line i: July 2023 - Present (1 year 3 months)
      const prevLine1 = i >= 1 ? lines[i - 1].trim() : '';
      const prevLine2 = i >= 2 ? lines[i - 2].trim() : '';

      currentExp = {
        role: prevLine1 || 'Specialist',
        company: prevLine2 || 'Organization',
        period: line,
        responsibilities: [],
        achievements: [],
      };
      responsibilitiesBuffer = [];
    } else if (currentExp) {
      // Check if this line is location or description
      const isLocation = /^(?:Indonesia|Jakarta|Bandung|Ciamis|West Java|Jawa Barat|[A-Z][a-z]+,\s*[A-Z][a-z]+)/.test(line);
      if (!isLocation && line.length > 3) {
        responsibilitiesBuffer.push(line);
      }
    }
  }

  // Flush last item
  if (currentExp && (currentExp.company || currentExp.role)) {
    currentExp.responsibilities = [...responsibilitiesBuffer];
    currentExp.achievements = [];
    experiences.push(currentExp as Experience);
  }

  return experiences;
}

/**
 * Parse lines belonging to the Education section of LinkedIn PDF
 */
function parseEducationLines(lines: string[]): Education[] {
  const educations: Education[] = [];

  let currentEdu: Partial<Education> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.includes('Page ')) continue;

    const isYearLine = YEAR_RANGE_REGEX.test(line);

    if (isYearLine) {
      const prevLine1 = i >= 1 ? lines[i - 1].trim() : '';
      const prevLine2 = i >= 2 ? lines[i - 2].trim() : '';

      currentEdu = {
        institution: prevLine2 || prevLine1 || 'University',
        degree: prevLine2 ? prevLine1 : 'Bachelor Degree',
        period: line,
        gpa: '',
      };
      educations.push(currentEdu as Education);
      currentEdu = null;
    }
  }

  // Fallback if no exact date match
  if (educations.length === 0 && lines.length >= 2) {
    educations.push({
      institution: lines[0] || 'University',
      degree: lines[1] || 'Degree',
      period: lines[2] || '',
      gpa: '',
    });
  }

  return educations;
}

/**
 * Helper to merge parsed LinkedIn data into existing PortfolioData
 */
export function mergeLinkedInIntoPortfolio(
  existingData: PortfolioData,
  parsed: ParsedLinkedInData,
  selectedSections: {
    profile: boolean;
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    certifications: boolean;
    publications: boolean;
  }
): PortfolioData {
  const updated: PortfolioData = JSON.parse(JSON.stringify(existingData));

  if (selectedSections.profile && parsed.profile) {
    if (parsed.profile.name) updated.profile.name = parsed.profile.name;
    if (parsed.profile.title) updated.profile.title = parsed.profile.title;
    if (parsed.profile.location) updated.profile.location = parsed.profile.location;
    if (parsed.profile.email) updated.profile.email = parsed.profile.email;
    if (parsed.profile.phone) updated.profile.phone = parsed.profile.phone;
    if (parsed.profile.linkedinUrl) {
      if (!updated.profile.socials) updated.profile.socials = {};
      updated.profile.socials.linkedin = parsed.profile.linkedinUrl;
    }
  }

  if (selectedSections.summary && parsed.summary) {
    updated.summary = parsed.summary;
  }

  if (selectedSections.experience && parsed.experience && parsed.experience.length > 0) {
    // Merge or replace experiences
    updated.experience = parsed.experience;
  }

  if (selectedSections.education && parsed.education && parsed.education.length > 0) {
    updated.education = parsed.education;
  }

  if (selectedSections.skills && parsed.skills && parsed.skills.length > 0) {
    // Add to or create an "Extracted from LinkedIn" skill category if not present
    let targetCat = updated.skills.find((s) => s.category.toLowerCase().includes('linkedin') || s.category.toLowerCase().includes('core'));
    if (!targetCat) {
      targetCat = { category: 'Core & Specialized Skills', skills: [] };
      updated.skills.unshift(targetCat);
    }
    const set = new Set([...targetCat.skills, ...parsed.skills]);
    targetCat.skills = Array.from(set);
  }

  if (selectedSections.certifications && parsed.certifications && parsed.certifications.length > 0) {
    const certSet = new Set([...(updated.certifications || []), ...parsed.certifications]);
    updated.certifications = Array.from(certSet);
  }

  if (selectedSections.publications && parsed.publications && parsed.publications.length > 0) {
    updated.publications = [...(updated.publications || []), ...parsed.publications];
  }

  return updated;
}
