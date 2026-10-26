import React, { useRef, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
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
    setTimeout(() => setIsAnimating(false), 600);

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const doc = document as any;

    // View Transitions API Circular Reveal (Nejc Furh / Chrome / Edge standard)
    if (doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          toggleTheme();
        });
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
            duration: 600,
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
      className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border transition-all duration-300 select-none group shrink-0 flex items-center justify-center p-0 cursor-pointer shadow-md hover:scale-105 active:scale-95 ${
        isDark
          ? 'border-violet-500/50 shadow-violet-950/60'
          : 'border-indigo-300/80 shadow-indigo-300/40'
      }`}
    >
      {/* Scaled to 190% so the inner 315px circle graphic fills 100% of the button edge-to-edge */}
      <div className="w-[190%] h-[190%] flex items-center justify-center pointer-events-none shrink-0">
        <Lottie
          lottieRef={lottieRef}
          src={dayNightAnimation}
          loop={false}
          autoplay={false}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="absolute inset-0 rounded-full border border-white/20 group-hover:border-violet-400/60 transition-colors pointer-events-none" />
    </button>
  );
};
