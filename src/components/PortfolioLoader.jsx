import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextType from './TextType.jsx';

const LOADER_TEXT = [
  'Welcome to my portfolio!',
  "Let's build some amazing experiences together.",
];

export default function PortfolioLoader({ onExitStart, onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const exitTimerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(exitTimerRef.current);
  }, []);

  const handleTypingComplete = useCallback(() => {
    exitTimerRef.current = setTimeout(() => {
      setIsExiting(true);
      onExitStart?.();
    }, 800);
  }, [onExitStart]);

  const handleTransitionEnd = event => {
    if (
      event.target === event.currentTarget &&
      event.propertyName === 'transform'
    ) {
      onComplete?.();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F7F8F6] px-5 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="w-full max-w-5xl text-center">
        <TextType
          text={LOADER_TEXT}
          typingSpeed={75}
          initialDelay={200}
          pauseDuration={500}
          deletingSpeed={40}
          loop={false}
          showCursor
          cursorCharacter="_"
          cursorBlinkDuration={0.5}
          onTypingComplete={handleTypingComplete}
          className="whitespace-pre-wrap text-[clamp(1.25rem,5vw,4.5rem)] font-extrabold tracking-tight text-[#0A2F3D]"
        />
      </div>
    </div>
  );
}