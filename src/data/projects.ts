import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'ai-digital-twin',
    title: 'AI Digital Twin for Predictive Smart Manufacturing',
    subtitle: 'Intelligent Manufacturing Environment',
    category: 'AI / Digital Twin',
    description:
      'The culmination of my engineering journey. A cutting-edge AI-powered digital twin system that creates a virtual replica of industrial equipment, enabling real-time monitoring, predictive analytics, and intelligent decision-making through live data streams.',
    problem:
      'Industrial facilities lack real-time visibility into equipment health, leading to unexpected failures, costly downtime, and inefficient maintenance scheduling.',
    solution:
      'Built an AI-driven digital twin that mirrors physical equipment in real-time, using sensor data, machine learning models, and predictive algorithms to forecast failures before they happen.',
    features: [
      'Real-time equipment health monitoring dashboard',
      'Predictive failure detection using ML models',
      'Live sensor data visualization with anomaly detection',
      'Intelligent manufacturing environment integration',
    ],
    technologies: [
      'Artificial Intelligence',
      'Machine Learning',
      'Python',
      'Data Analytics',
    ],
    media: [],
    githubLink: '',
    liveDemoLink: '',
    year: 2024,
    featured: true, // PRIMARY FEATURED PROJECT
    accentColor: '#00d4ff', // Cyan
    visualStyle: 'factory', // Unique visual style
  },
  {
    id: 'weather-forecasting',
    title: 'Weather Forecasting Web Application',
    subtitle: 'Real-Time Atmospheric Data',
    category: 'Web Development',
    description:
      'Developed a responsive web application with real-time weather data integration using APIs and modern web technologies.',
    problem:
      'Access to accurate and localized real-time weather information requires parsing complex API data structures.',
    solution:
      'Designed a clean, professional web interface that seamlessly integrates with weather APIs to provide instantaneous atmospheric updates.',
    features: [
      'Real-time weather data fetching',
      'API integration and data parsing',
      'Responsive professional interface',
      'Dynamic weather system visualization',
    ],
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Web APIs',
    ],
    media: [],
    githubLink: '',
    liveDemoLink: '',
    year: 2023,
    featured: true,
    accentColor: '#3b82f6', // Blue
    visualStyle: 'weather',
  },
  {
    id: 'domestic-tumbler',
    title: 'Household Domestic Purpose Composed Tumbler',
    subtitle: 'Mechanical Design & Manufacturing',
    category: 'Mechanical Engineering',
    description:
      'Designed an innovative household tumbler demonstrating mechanical design and manufacturing principles. This project represents my foundational background in mechanical engineering.',
    problem:
      'Traditional household tumblers lack optimized mechanical design for specific domestic utility and manufacturing efficiency.',
    solution:
      'Applied core mechanical engineering principles to design a functional, structurally sound, and manufacturing-ready tumbler.',
    features: [
      'Optimized mechanical design',
      'Manufacturing-ready specifications',
      'Structural integrity analysis',
    ],
    technologies: [
      'Mechanical Engineering',
      'CAD',
      'Manufacturing Principles',
    ],
    media: [],
    githubLink: '',
    liveDemoLink: '',
    year: 2022,
    featured: true,
    accentColor: '#f59e0b', // Amber
    visualStyle: 'mechanical',
  },
  {
    id: 'after-effects-plugin',
    title: 'After Effects Plugin for Workflow Optimization',
    subtitle: 'Creative Technology Automation',
    category: 'Automation / Plugins',
    description:
      'Created a custom plugin to streamline video editing workflows and improve productivity for content creators, showcasing skills beyond traditional engineering.',
    problem:
      'Video editors face repetitive tasks in post-production that consume valuable creative time.',
    solution:
      'Automated complex editing workflows through a custom-built plugin, drastically reducing manual effort and processing time.',
    features: [
      'Workflow automation',
      'Motion graphics pipeline optimization',
      'Custom user interface within host application',
    ],
    technologies: [
      'JavaScript (ExtendScript)',
      'Motion Graphics',
      'Video Editing',
    ],
    media: [],
    githubLink: '',
    liveDemoLink: '',
    year: 2023,
    featured: false,
    accentColor: '#ec4899', // Pink
    visualStyle: 'creative',
  },
  {
    id: 'lab-safety-management',
    title: 'Laboratory Safety Management System',
    subtitle: 'Smart Monitoring & Stock Tracking',
    category: 'System Management',
    description:
      'Developed a comprehensive maintenance alert and stock monitoring system to improve laboratory safety and operational efficiency.',
    problem:
      'Laboratories struggle with manual tracking of hazardous stock and safety equipment maintenance, leading to potential safety risks.',
    solution:
      'Built a centralized monitoring system with automated alerts, stock level tracking, and safety status indicators.',
    features: [
      'Automated maintenance alerts',
      'Real-time stock monitoring',
      'Safety equipment status tracking',
      'Connected laboratory environment',
    ],
    technologies: [
      'System Architecture',
      'Data Management',
      'Web Technologies',
    ],
    media: [],
    githubLink: '',
    liveDemoLink: '',
    year: 2024,
    featured: false,
    accentColor: '#10b981', // Emerald
    visualStyle: 'management',
  },
];
