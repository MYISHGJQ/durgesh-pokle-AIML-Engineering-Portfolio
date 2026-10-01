import type { SocialLink } from '../types';

export const socialLinks: SocialLink[] = [
  {
    platform: 'Email',
    url: 'mailto:durgeshpokle.20@gmail.com',
    icon: 'mail',
    label: 'Send Email',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/durgesh-pokle-5b2611328?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    icon: 'linkedin',
    label: 'Connect on LinkedIn',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/MYISHGJQ',
    icon: 'github',
    label: 'View GitHub',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/durgxxsh_pokle20?stkn=MWVoNWprcDNsdXZpMQ%3D%3D&utm_source=qr',
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
