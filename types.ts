
export interface Testimonial {
  id?: string;
  name: string;
  role?: string;
  position?: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author?: string;
  category?: string;
  image?: string;
  tags?: string[];
  readTime: number;
  featured?: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
  category: string;
  projectId?: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
}

export interface Publication {
  title: string;
  details: string;
  link: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  challenge: string;
  solution: string;
  images: string[];
  link?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Stat {
    label: string;
    value: number;
    suffix?: string;
}

export interface LocationPoint {
    name: string;
    position: [number, number]; // [lat, lng]
    description: string;
}

export interface ProjectShowcase {
    title: string;
    description: string;
    before: {
        description: string;
        imageUrls: string[];
    };
    after: {
        description: string;
        imageUrls: string[];
    };
}


export interface PortfolioData {
  profile: Profile;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  organizations: string[];
  certifications: string[];
  publications: Publication[];
  projects: Project[];
  stats: Stat[];
  locations: LocationPoint[];
  showcase: ProjectShowcase;
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  gallery: GalleryImage[];
}