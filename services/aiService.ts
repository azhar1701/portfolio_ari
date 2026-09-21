/**
 * AI Service for Portfolio Admin Automation & Content Optimization
 * Powered by Google Gemini Flash API (Client-side directly in Admin Hub)
 */

const STORAGE_KEY = 'admin_gemini_api_key';

export function getGeminiApiKey(): string {
  if (typeof window === 'undefined') return '';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored.trim() !== '') return stored.trim();
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
  return envKey.trim();
}

export function saveGeminiApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  if (!key || key.trim() === '') {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }
}

export function hasGeminiApiKey(): boolean {
  return getGeminiApiKey().length > 5;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
    code?: number;
    status?: string;
  };
}

/**
 * Low-level call to Google Gemini REST API
 */
export async function callGeminiApi(
  prompt: string,
  systemInstruction?: string,
  model = 'gemini-2.0-flash'
): Promise<string> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('Google Gemini API Key belum disetel. Silakan masukkan API Key di pengaturan AI Assistant.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload: any = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 1200,
    }
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: GeminiResponse = await response.json();

  if (!response.ok || data.error) {
    const errorMsg = data.error?.message || `API error (${response.status})`;
    if (response.status === 400 && errorMsg.includes('API_KEY_INVALID')) {
      throw new Error('API Key Gemini tidak valid. Silakan periksa kembali API Key Anda.');
    }
    if (response.status === 429) {
      throw new Error('Batas kuota request tercapai (Rate limited). Mohon tunggu beberapa saat lalu coba lagi.');
    }
    throw new Error(errorMsg);
  }

  const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!resultText) {
    throw new Error('Model AI tidak mengembalikan teks respon yang valid.');
  }

  return resultText.trim();
}

const SYSTEM_ENGINEERING_PERSONA = `You are a Principal Water Resources & GIS Engineering Editor and Career Consultant. 
The subject is Ari Azhar Maulana, ST. — a Water Resources Engineer & GIS Specialist (Universitas Galuh alum, HATHI member) based in Indonesia.
Your tasks are to refine, polish, and synthesize technical engineering portfolio content.
Rules:
1. Always maintain technical accuracy and credibility in hydraulics, hydrology, GIS, remote sensing, and irrigation infrastructure.
2. Adhere to the Google XYZ resume formula: "Accomplished [X], as measured by [Y], by doing [Z]".
3. Do NOT invent false qualifications, degrees, or foreign institutions.
4. Keep the tone authoritative, concise, metric-driven, and devoid of empty buzzwords.
5. Return ONLY the requested output without conversational fluff or meta commentary.`;

/**
 * Polish and enhance engineering experience bullets or summary
 */
export async function polishEngineeringContent(
  content: string,
  targetType: 'summary' | 'responsibilities' | 'achievements',
  language: 'id' | 'en' = 'id'
): Promise<string> {
  const languageInstruction = language === 'id' 
    ? 'Tulis dalam Bahasa Indonesia teknis profesional berstandar teknik sipil/keairan nasional.'
    : 'Write in high-precision, technical international engineering English.';

  let specificPrompt = '';
  if (targetType === 'summary') {
    specificPrompt = `Polish and heighten the impact of this professional bio summary. Focus on value proposition, technical breadth (HEC-RAS, QGIS, watershed modeling, SIPASDA), and practical field leadership. Keep it to 2-3 concise, impactful sentences.\n\nInput:\n"${content}"`;
  } else if (targetType === 'responsibilities') {
    specificPrompt = `Transform these job responsibilities into punchy, high-impact bullet points. Each point must start with a strong engineering action verb and clearly state the technical scope, methodology, or system used. Keep one item per line.\n\nInput lines:\n${content}`;
  } else {
    specificPrompt = `Transform these job achievements into quantifiable, milestone-driven achievement statements (Google XYZ formula). Highlight measurable impact, efficiency gains, or technical validation. Keep one item per line.\n\nInput lines:\n${content}`;
  }

  const prompt = `${specificPrompt}\n\nLanguage: ${languageInstruction}`;
  return await callGeminiApi(prompt, SYSTEM_ENGINEERING_PERSONA);
}

/**
 * Generate technical case study (Challenge & Solution) for an engineering project
 */
export async function generateProjectCaseStudy(
  projectName: string,
  overview: string,
  tools: string,
  language: 'id' | 'en' = 'id'
): Promise<{ challenge: string; solution: string; description: string }> {
  const languageInstruction = language === 'id'
    ? 'Gunakan Bahasa Indonesia teknis profesional yang sering digunakan dalam laporan teknis Kementerian PUPR/konsultan keairan.'
    : 'Use international technical engineering English.';

  const prompt = `Based on this engineering project title and context, generate a structured case study:
Project Name: "${projectName}"
Context / Notes: "${overview}"
Technologies / Tools: "${tools}"

Generate a JSON response matching exactly this JSON format:
{
  "description": "A crisp 1-2 sentence overview of the project scope and primary objective.",
  "challenge": "2-3 sentences explaining the core engineering problem, environmental constraints, or data bottleneck.",
  "solution": "2-3 sentences explaining the technical GIS/hydrology methodology, modeling steps, or engineering intervention applied to resolve it."
}

Language requirement: ${languageInstruction}
Output ONLY raw valid JSON, without markdown code block backticks.`;

  const rawJson = await callGeminiApi(prompt, SYSTEM_ENGINEERING_PERSONA);
  
  try {
    const cleaned = rawJson.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    // Fallback if model wraps in text
    const match = rawJson.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error('Gagal mengurai format JSON dari AI. Silakan coba lagi.');
  }
}

/**
 * Translate and harmonize technical content between Indonesian and English
 */
export async function translateTechnicalContent(
  text: string,
  direction: 'id_to_en' | 'en_to_id'
): Promise<string> {
  const target = direction === 'id_to_en' ? 'Professional Technical English' : 'Bahasa Indonesia Teknik Sipil/Pengairan';
  const prompt = `Translate the following engineering content into ${target}. Ensure specialized terms (HEC-RAS, watershed, runoff, bathymetry, catchment area, debit banjir, tanggul, saluran irigasi sekunder) are translated with exact technical domain accuracy:\n\n"${text}"`;
  return await callGeminiApi(prompt, SYSTEM_ENGINEERING_PERSONA);
}
