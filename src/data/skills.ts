import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    number: '01',
    name: 'AI & MACHINE LEARNING',
    subtitle: 'Primary Specialty & Computational Intelligence',
    badge: 'CORE ENGINE',
    accentColor: '#00d4ff', // Cyan / Blue
    skills: [
      {
        name: 'Artificial Intelligence',
        description: 'Intelligent algorithm design & automated system reasoning',
        usedInProject: 'AI Digital Twin System',
        tag: 'PRIMARY FOCUS',
      },
      {
        name: 'Machine Learning',
        description: 'Predictive modeling, classification, and regression algorithms',
        usedInProject: 'AI Digital Twin System',
        tag: 'PREDICTIVE MODELS',
      },
      {
        name: 'Data Analysis',
        description: 'Extracting insights and patterns from complex sensor datasets',
        usedInProject: 'AI Digital Twin & Lab Safety System',
        tag: 'DATA PIPELINES',
      },
      {
        name: 'Predictive Analytics',
        description: 'Real-time equipment failure forecasting & anomaly detection',
        usedInProject: 'AI Digital Twin System',
        tag: 'REAL-TIME METRICS',
      },
      {
        name: 'Neural Networks',
        description: 'Deep neural network architectures for digital twin modeling',
        usedInProject: 'AI Digital Twin System',
        tag: 'DEEP LEARNING',
      },
    ],
  },
  {
    id: 'programming-tech',
    number: '02',
    name: 'PROGRAMMING & TECHNOLOGY',
    subtitle: 'Software Engineering, Web Stack & System Infrastructure',
    badge: 'ENGINEERING BASE',
    accentColor: '#3b82f6', // Sapphire Blue
    skills: [
      {
        name: 'Python',
        description: 'Primary language for AI/ML development, data science, and automation',
        usedInProject: 'AI Digital Twin System',
        tag: 'CORE LANG',
      },
      {
        name: 'JavaScript',
        description: 'Interactive web applications, APIs, and ExtendScript scripting',
        usedInProject: 'Weather Application & AE Plugin',
        tag: 'WEB & AUTOMATION',
      },
      {
        name: 'HTML & CSS',
        description: 'Semantic markup, modern styling, and responsive user interfaces',
        usedInProject: 'Weather Application',
        tag: 'FRONTEND',
      },
      {
        name: 'Web Development & APIs',
        description: 'RESTful API integration and full-stack web application design',
        usedInProject: 'Weather Application & Lab System',
        tag: 'APIS & STACK',
      },
      {
        name: 'Linux',
        description: 'OS fundamentals, environment configuration, and shell commands',
        usedInProject: 'System Management',
        tag: 'INFRASTRUCTURE',
      },
      {
        name: 'Java',
        description: 'Object-oriented programming, data structures, and software principles',
        usedInProject: 'Software Engineering',
        tag: 'OOP',
      },
      {
        name: 'C++',
        description: 'Low-level systems programming and computational performance',
        usedInProject: 'Systems Programming',
        tag: 'SYSTEMS',
      },
      {
        name: 'CAD & Mechanical Systems',
        description: 'Physical CAD modeling, thermodynamics, and manufacturing specs',
        usedInProject: 'Domestic Tumbler Design',
        tag: 'PHYSICAL ENG',
      },
    ],
  },
  {
    id: 'creative-media',
    number: '03',
    name: 'CREATIVE & MEDIA',
    subtitle: 'Additional Post-Production & Workflow Automation Capabilities',
    badge: 'ADDITIONAL CAPABILITIES',
    accentColor: '#8b5cf6', // Violet
    skills: [
      {
        name: 'Video Editing',
        description: 'Post-production workflow optimization and video processing',
        usedInProject: 'Content & Media Workflows',
        tag: 'POST-PRODUCTION',
      },
      {
        name: 'Motion Graphics',
        description: 'Visual storytelling, dynamic animations, and motion pipelines',
        usedInProject: 'After Effects Plugin',
        tag: 'ANIMATION',
      },
      {
        name: 'Sound Designing',
        description: 'Audio editing, mixing, and sound engineering for digital media',
        usedInProject: 'Digital Media Projects',
        tag: 'AUDIO',
      },
      {
        name: 'ExtendScript Automation',
        description: 'Custom plugin development for Adobe Creative Cloud workflows',
        usedInProject: 'After Effects Plugin',
        tag: 'PLUGIN DEV',
      },
    ],
  },
];
