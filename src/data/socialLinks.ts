import type { SocialLink } from '../types';

export const socialLinks: SocialLink[] = [
  {
    platform: 'Email',
    url: 'mailto:durgeshpokle@example.com', // Replace with real email
    icon: 'mail',
    label: 'Send Email',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/durgeshpokle', // Replace with real LinkedIn
    icon: 'linkedin',
    label: 'Connect on LinkedIn',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/durgeshpokle', // Replace with real GitHub
    icon: 'github',
    label: 'View GitHub',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/durgeshpokle', // Replace with real Instagram
    icon: 'instagram',
    label: 'Follow on Instagram',
  },
  {
    platform: 'Resume',
    url: '/resume.pdf', // Place resume.pdf in the public folder
    icon: 'file',
    label: 'Download Resume',
  },
];
