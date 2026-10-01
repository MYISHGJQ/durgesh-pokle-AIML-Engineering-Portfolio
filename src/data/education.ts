import type { Education } from '../types';

export const education: Education[] = [
  {
    id: 'edu-btech',
    year: '2024 — 2027',
    degree: 'B.Tech in Artificial Intelligence & Machine Learning',
    institution: 'DMIHER, Sawangi',
    location: 'Maharashtra, India',
    description:
      'Pursuing specialized engineering degree focusing on modern AI architectures, machine learning models, and intelligent systems.',
    skills: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Analysis',
      'Python',
    ],
    milestones: [
      'Transitioned from mechanical to software engineering',
      'Developing AI Digital Twin systems',
    ],
    current: true,
  },
  {
    id: 'edu-diploma',
    year: '2021 — 2024',
    degree: 'Diploma in Mechanical Engineering',
    institution: 'Acharya Shrimannarayan Polytechnic, Wardha',
    location: 'Maharashtra, India',
    description:
      'Gained strong foundational knowledge in mechanical systems, manufacturing processes, and engineering principles.',
    skills: ['Mechanical Design', 'Manufacturing', 'Engineering Principles', 'CAD'],
    milestones: [
      'Scored 67.95%',
      'Designed Household Domestic Purpose Composed Tumbler',
    ],
    current: false,
  },
  {
    id: 'edu-ssc',
    year: '2021', // approximate based on diploma start
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Good Shepherd English School, Anji',
    location: 'Maharashtra, India',
    description:
      'Completed secondary education with distinction, establishing a strong foundation for future technical studies.',
    skills: ['Mathematics', 'Science'],
    milestones: [
      'Scored 67.40%',
    ],
    current: false,
  },
];
