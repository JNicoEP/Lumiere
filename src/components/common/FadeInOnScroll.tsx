import React, { useEffect, useRef, useState } from 'react';

interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    // Check if element is already in viewport on mount
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: '750ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-all ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-10 blur-[0.5px]'
      } ${className}`}
    >
      {children}
    </div>
  );
};
