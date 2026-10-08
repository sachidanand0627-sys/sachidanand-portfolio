import React, { useRef } from 'react';
import HeroGame from './HeroGame';
import TextType from './TextType.jsx';

export default function Hero() {
  const heroRef = useRef(null);

  return (
    <section
      ref={heroRef}
      id="hero"
      data-cursor-theme="light"
      className="relative w-full h-[100dvh] pt-[clamp(28px,5vw,72px)] max-[700px]:pt-[24px] flex flex-col overflow-hidden bg-[#62C1E5] select-none"
    >
      {/* Centered Text Content */}
      <div className="relative z-[10] my-auto flex flex-col items-center text-center max-w-[800px] w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)] mx-auto px-4">

        <div className="text-[24px] tracking-[0.08em]  text-[rgba(10,47,61,0.68)] mb-[18px]">
          Hi
        </div>

        <h1
  className="
    flex
    items-center
    justify-center
    gap-2
    text-[clamp(2.25rem,5vw,3rem)]
    leading-[1.15]
    font-bold
    max-[700px]:flex-col
    max-[700px]:gap-3
    max-[700px]:text-[clamp(2rem,9vw,2.75rem)]
  "
>
  <span className="shrink-0">
    I'm a
  </span>

  <span
    className="
      inline-flex
      items-center
      justify-center
      bg-[#0A2F3D]
      text-white
      px-4
      py-2
      rounded-lg
      overflow-hidden
      max-[700px]:max-w-full
    "
  >
    <TextType
      text={['Product', 'UI/UX','Visual','Graphic']}
      typingSpeed={75}
      initialDelay={300}
      pauseDuration={1400}
      deletingSpeed={45}
      loop={true}
      showCursor={true}
      cursorCharacter="_"
      cursorBlinkDuration={0.5}
      className="whitespace-nowrap"
    />
  </span>

  <span className="shrink-0">
    Designer
  </span>

</h1>

        <p className="max-w-[590px] mt-6 text-[clamp(16px,1.5vw,20px)] max-[700px]:text-[15px] leading-[1.5] text-[rgba(10,47,61,0.68)]">
          Designing thoughtful digital experiences through product, UI/UX and AI.
        </p>
      </div>

      {/* Interactive game anchored to the bottom */}
      <div className="mt-auto w-full">
        <HeroGame heroRef={heroRef} />
      </div>
    </section>
  );
}