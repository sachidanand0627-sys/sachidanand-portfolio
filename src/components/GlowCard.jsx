import React, { useRef, useState } from 'react';

export default function GlowCard({
  children,
  glowColor = 'rgba(192, 132, 252, 0.95)',
  glowSize = 300,
  className = '',
  ...rest
}) {
  const cardRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    setOpacity(1);
  };

  const handlePointerLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`glow-card-container group relative flex flex-col min-w-0 rounded-[24px] max-[800px]:rounded-[20px] transition-transform duration-300 ease-out hover:-translate-y-1.5 ${className}`}
      style={{
        '--glow-color': glowColor,
        '--glow-size': `${glowSize}px`,
        '--glow-opacity': opacity,
      }}
      {...rest}
    >
      {/* 1. Crisp 1px Outer Border Spotlight */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[24px] max-[800px]:rounded-[20px] transition-opacity duration-300 ease-out z-20"
        style={{
          opacity: 'var(--glow-opacity)',
          background: `radial-gradient(var(--glow-size) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color), transparent 70%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
        aria-hidden="true"
      />

      {/* 2. Base Card Container */}
      <div className="relative z-10 flex flex-col h-full w-full bg-white border border-[rgba(16,47,56,0.10)] rounded-[24px] max-[800px]:rounded-[20px] overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(10,47,61,0.08)]">
        
        {/* 3. Interior Glow Wash */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out z-[1]"
          style={{
            opacity: opacity ? 0.35 : 0,
            background: `radial-gradient(var(--glow-size) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color), transparent 75%)`,
          }}
          aria-hidden="true"
        />

        {/* 4. Card Content */}
        <div className="relative z-[2] flex flex-col h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}