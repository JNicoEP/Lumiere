import React, { useRef, useEffect, useState } from 'react';
import { Lottie, LottieHandle } from 'lottie-react';
import dayNightAnimation from '../../assets/day-night.json';
import { useSalon } from '../../context/SalonContext';

export const ThemeToggleLottie: React.FC = () => {
  const { isDark, toggleTheme } = useSalon();
  const lottieRef = useRef<LottieHandle>(null);
  const isFirstRender = useRef(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!lottieRef.current) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Frame 50 is full Night, Frame 0 is full Day
      if (isDark) {
        lottieRef.current.seek(50);
        lottieRef.current.pause();
      } else {
        lottieRef.current.seek(0);
        lottieRef.current.pause();
      }
      return;
    }

    lottieRef.current.setSpeed(1.4);
    if (isDark) {
      // Transitioning to Night (0 -> 50)
      lottieRef.current.playSegments([0, 50]);
    } else {
      // Transitioning to Day (50 -> 100)
      lottieRef.current.playSegments([50, 100]);
    }
  }, [isDark]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 650);

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const doc = document as any;

    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const transition = doc.startViewTransition(() => {
        toggleTheme();
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      toggleTheme();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Alternar tema oscuro y claro"
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="relative w-12 h-12 rounded-full overflow-hidden border border-violet-500/40 hover:border-violet-400 shadow-lg hover:shadow-violet-600/30 flex items-center justify-center p-0 cursor-pointer bg-[#0A0A14] backdrop-blur-md hover:scale-105 active:scale-95 transition-all select-none group shrink-0"
    >
      <div className="w-[115%] h-[115%] flex items-center justify-center pointer-events-none">
        <Lottie
          lottieRef={lottieRef}
          src={dayNightAnimation}
          loop={false}
          autoplay={false}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="absolute inset-0 rounded-full border border-white/10 group-hover:border-violet-400/50 transition-colors pointer-events-none" />
    </button>
  );
};
