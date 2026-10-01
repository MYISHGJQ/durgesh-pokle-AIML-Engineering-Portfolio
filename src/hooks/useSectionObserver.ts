import { useEffect, useState } from 'react';

export function useSectionObserver(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || 'home');

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const visibleMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleMap.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = '';
        let highestRatio = -1;

        for (const id of sectionIds) {
          const ratio = visibleMap.get(id) || 0;
          if (ratio > highestRatio && ratio > 0.05) {
            highestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveSection((prev) => (prev !== bestId ? bestId : prev));
        }
      },
      {
        rootMargin: '-15% 0px -45% 0px',
        threshold: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
