// ─── Project Types ───────────────────────────────────────────────
export interface ProjectMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  /** e.g. '16:9', '9:16', '4:5', '1:1' */
  aspectRatio?: string;
  orientation?: 'landscape' | 'portrait' | 'square';
  poster?: string; // video thumbnail
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  media: ProjectMedia[];
  githubLink?: string;
  liveDemoLink?: string;
  year: number;
  featured: boolean;
  /** Unique color accent for the project node */
  accentColor: string;
  /** Visual style hint for the 3D project node */
  visualStyle: 'factory' | 'weather' | 'mechanical' | 'creative' | 'management';
}

export type ProjectCategory =
  | 'AI / Digital Twin'
  | 'Machine Learning'
  | 'Web Development'
  | 'Mechanical Engineering'
  | 'Automation / Plugins'
  | 'System Management';

// ─── Skill Types ─────────────────────────────────────────────────
export interface Skill {
  name: string;
  /** Optional proficiency score if needed */
  proficiency?: number;
  description?: string;
  usedInProject?: string; // e.g. "AI Digital Twin System"
  tag?: string; // e.g. "CORE ENGINE", "FRONTEND"
}

export interface SkillCategory {
  id: string;
  number?: string;
  name: string;
  subtitle?: string;
  badge?: string;
  skills: Skill[];
  accentColor: string;
}

// ─── Experience Types ────────────────────────────────────────────
export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

// ─── Certification Types ─────────────────────────────────────────
export interface Certification {
  id: string;
  name: string;
  organization: string;
  date: string;
  skillsCovered: string[];
  credentialLink?: string;
  verificationUrl?: string;
  image?: string;
  featured: boolean;
}

// ─── Achievement Types ───────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'competition' | 'academic' | 'milestone' | 'certification' | 'professional';
  icon: string; // emoji
  year: number;
}

// ─── Education Types ─────────────────────────────────────────────
export interface Education {
  id: string;
  year: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  skills: string[];
  milestones: string[];
  current: boolean;
}

// ─── Social / Contact Types ──────────────────────────────────────
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Site Configuration ──────────────────────────────────────────
export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  mission: string;
  email: string;
  stats: PortfolioStats;
}

export interface PortfolioStats {
  projectsBuilt: number;
  certifications: number;
  technologies: number;
  achievements: number;
  experiments: number;
  yearsOfLearning: number;
}

// ─── Performance Types ───────────────────────────────────────────
export type PerformanceTier = 'high' | 'medium' | 'low';

export interface PerformanceConfig {
  particleCount: number;
  enableShaders: boolean;
  enablePostProcessing: boolean;
  maxDpr: number;
  shadowQuality: 'high' | 'medium' | 'none';
  enableBloom: boolean;
}

// ─── Section Types ───────────────────────────────────────────────
export type SectionId =
  | 'hero'
  | 'neural-network'
  | 'about'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'achievements'
  | 'education'
  | 'command-center'
  | 'future'
  | 'contact';
