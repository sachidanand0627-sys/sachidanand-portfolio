import React, { useEffect, useRef, useState } from 'react';

const experiences = [
  {
    year: '2025',
    period: '2025 — september 2026',
    role: 'Product Designer',
    company: 'InCred Finance',
    description:
      'Worked across lending, loan applications, payments, mutual fund investments, document verification, AI-powered voice assistants, AI-driven design systems, enterprise platforms, and customer-facing web and mobile experiences.',
  },
  
];

export default function Experience() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      /*
       * Animation starts when the Experience section
       * enters the viewport.
       */
      const start = viewportHeight * 0.78;

      /*
       * Animation finishes when the bottom of the
       * timeline reaches the viewport.
       */
      const end = viewportHeight * 0.18;

      const total = rect.height - (start - end);

      const travelled = start - rect.top;

      const nextProgress = Math.max(
        0,
        Math.min(1, travelled / Math.max(total, 1))
      );

      setProgress(nextProgress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    const handleResize = () => {
      updateProgress();
    };

    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /*
   * The path itself is positioned from the first
   * experience dot to the last experience dot.
   */
  const pathHeight = trackRef.current
    ? trackRef.current.offsetHeight
    : 500;

  const activePosition = progress * pathHeight;

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-cursor-theme="light"
      className="
        relative w-full
        bg-[#F7F8F6]
        py-[clamp(110px,12vw,180px)]
        max-[800px]:py-[90px]
        overflow-hidden
      "
    >
      <div className="w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)] mx-auto">

        {/* Section heading */}
        <div className="max-w-[820px]">
          <p className="m-0 mb-[14px] text-[11px] leading-none tracking-[0.12em] uppercase font-bold text-[#587078]">
            Experience
          </p>

          <h2 className="m-0 text-[clamp(48px,7vw,88px)] leading-[0.94] tracking-[-0.06em] font-[650] text-[#102F38]">
            Where the work has
            <br />
            taken me.
          </h2>
        </div>

        {/* Timeline */}
        <div
          ref={trackRef}
          className="
            relative
            mt-[clamp(80px,9vw,120px)]
            ml-[26px]
            max-[800px]:ml-[8px]
          "
        >
          {/* Background path */}
          <div
            className="
              absolute
              left-[0]
              top-0
              bottom-0
              w-[1px]
              bg-[#102F38]/15
            "
          />

          {/* Animated path */}
          <div
            className="
              absolute
              left-[0px]
              top-0
              w-[3px]
              rounded-full
              bg-[#2CAEDF]
              origin-top
            "
            style={{
              height: `${activePosition}px`,
            }}
          />

          <div className="flex flex-col gap-[clamp(110px,13vw,180px)]">
            {experiences.map((experience, index) => {
              const itemPosition =
                experiences.length === 1
                  ? 1
                  : index / (experiences.length - 1);

              const isActive = progress >= itemPosition;
              const distanceFromPoint = progress - itemPosition;

              const revealProgress = Math.max(
                0,
                Math.min(1, distanceFromPoint * 7 + 1)
              );

              return (
                <article
                  key={`${experience.company}-${experience.role}`}
                  className="
                    relative
                    grid
                    grid-cols-[120px_minmax(0,1fr)]
                    max-[800px]:grid-cols-[76px_minmax(0,1fr)]
                    gap-[clamp(28px,5vw,54px)]
                  "
                >
                  {/* Year */}
                  <div
                    className="
                      relative
                      pt-[2px]
                      text-right
                      pr-[20px]
                      max-[800px]:pr-[14px]
                    "
                  >
                    <span
                      className={`
                        text-[clamp(22px,2.5vw,30px)]
                        leading-none
                        tracking-[-0.04em]
                        font-[650]
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? 'text-[#102F38]'
                            : 'text-[#102F38]/25'
                        }
                      `}
                    >
                      {experience.year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div
                    className="
                      absolute
                      left-[-5px]
                      top-[2px]
                      flex
                      h-[11px]
                      w-[11px]
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className={`
                        block
                        h-[9px]
                        w-[9px]
                        rounded-full
                        border
                        transition-all
                        duration-500
                        ${
                          isActive
                            ? 'scale-[1.25] border-[#2CAEDF] bg-[#2CAEDF]'
                            : 'scale-100 border-[#102F38]/30 bg-[#F7F8F6]'
                        }
                      `}
                    />
                  </div>

                  {/* Experience content */}
                  <div
                    className="max-w-[760px]"
                    style={{
                      opacity: isActive ? 1 : 0.28,
                      transform: `translateY(${Math.max(
                        0,
                        (1 - revealProgress) * 28
                      )}px)`,
                      transition:
                        'opacity 500ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    <p className="m-0 text-[11px] leading-none tracking-[0.12em] uppercase font-bold text-[#587078]">
                      {experience.period}
                    </p>

                    <h3 className="mt-[20px] mb-0 text-[clamp(36px,5vw,58px)] leading-[0.98] tracking-[-0.055em] font-[650] text-[#102F38]">
                      {experience.role}
                    </h3>

                    <p className="mt-[12px] mb-0 text-[clamp(20px,2.2vw,27px)] leading-[1.2] tracking-[-0.025em] text-[#102F38]">
                      {experience.company}
                    </p>

                    <p className="mt-[24px] mb-0 max-w-[700px] text-[16px] leading-[1.65] text-[#587078]">
                      {experience.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="mt-[70px] ml-[26px] max-[800px]:ml-[8px]">
          <div className="flex items-center gap-3">
          </div>
        </div>
      </div>
    </section>
  );
}