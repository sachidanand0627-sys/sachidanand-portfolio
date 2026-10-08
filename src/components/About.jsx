import React from 'react';
import LogoLoop from './LogoLoop.jsx';

export default function About() {
  return (
    <section
      id="about"
      data-cursor-theme="light"
      className="relative w-full overflow-x-clip py-[clamp(88px,10vw,150px)] max-[800px]:py-[82px] bg-[#EEF3F2]"
    >
      <div className="w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)] mx-auto grid grid-cols-[minmax(220px,0.8fr)_minmax(0,1.4fr)] max-[800px]:grid-cols-1 gap-[clamp(36px,7vw,100px)] items-center">

        {/* About Image */}
        <div className="relative w-full aspect-[5/5] max-h-[520px] flex items-end justify-center overflow-x-clip overflow-y-visible">
          <div className="absolute bottom-[20%] left-[8%] w-[84%] h-[78%] rounded-[28px] border border-[#2CAEDF]/100" />

          <img
            src="/assets/about.svg"
            alt="Sachidanand"
            className="relative z-10 w-[150%] h-[150%] max-w-none object-contain object-bottom"
          />
        </div>

        {/* About Content */}
        <div className="max-w-[720px]">
          <p className="m-0 mb-[14px] text-[11px] leading-none tracking-[0.12em] uppercase font-bold text-[#587078]">
            About me
          </p>

          <h2 className="m-0 max-w-[760px] text-[clamp(40px,6vw,76px)] leading-[0.96] tracking-[-0.055em] font-[650] text-[#102F38]">
            Designing with curiosity.
          </h2>

          <p className="mt-6 mb-0 text-[clamp(20px,2.5vw,32px)] leading-[1.3] tracking-[-0.025em] text-[#102F38]">
            Product designer focused on making digital experiences clearer,
            more engaging and a little less obvious.
          </p>

          <p className="mt-[26px] mb-0 text-[16px] leading-[1.65] tracking-normal text-[#587078]">
            A mix of product thinking, UI/UX, visual design and experimentation
            shapes the way each problem is approached — from the first
            interaction to the smallest detail.
          </p>

          {/* Skill Pills */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {[
              'Product Design',
              'UI/UX',
              'Interaction Design',
              'Visual Design',
              'AI Experiences',
              'Prototyping',
            ].map((skill) => (
              <span
                key={skill}
                className="
                  inline-flex items-center
                  rounded-full
                  border border-[#102F38]/15
                  bg-[#EEF3F2]
                  px-3.5 py-2
                  text-[12px]
                  font-medium
                  tracking-[-0.01em]
                  text-[#102F38]
                  transition-all duration-300
                  hover:border-[#2CAEDF]
                  hover:bg-white
                  hover:-translate-y-0.5
                "
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Logo Loop */}
          <div className="mt-8 w-full overflow-hidden">
            <LogoLoop
              logos={[
                {
                  src: '/assets/logos/adobe-after-effects-svgrepo-com 1.svg',
                  alt: 'Adobe After Effects',
                  title: 'Adobe After Effects',
                },
                {
                  src: '/assets/logos/adobe-xd-svgrepo-com 1.svg',
                  alt: 'Adobe XD',
                  title: 'Adobe XD',
                },
                {
                  src: '/assets/logos/ai-studio-google 1.svg',
                  alt: 'AI Studio',
                  title: 'AI Studio',
                },
                {
                  src: '/assets/logos/canva-svgrepo-com 1.svg',
                  alt: 'Canva',
                  title: 'Canva',
                },
                {
                  src: '/assets/logos/claude-ai-icon 1.svg',
                  alt: 'Claude AI',
                  title: 'Claude AI',
                },
                {
                  src: '/assets/logos/figma-svgrepo-com 1.svg',
                  alt: 'Figma',
                  title: 'Figma',
                },
                {
                  src: '/assets/logos/framer-black-icon 1.svg',
                  alt: 'Framer',
                  title: 'Framer',
                },
                {
                  src: '/assets/logos/github-142-svgrepo-com 1.svg',
                  alt: 'GitHub',
                  title: 'GitHub',
                },
                {
                  src: '/assets/logos/lottiefiles 1.svg',
                  alt: 'LottieFiles',
                  title: 'LottieFiles',
                },
                {
                  src: '/assets/logos/lovable.svg',
                  alt: 'Lovable',
                  title: 'Lovable',
                },
                {
                  src: '/assets/logos/miro-svgrepo-com 1.svg',
                  alt: 'Miro',
                  title: 'Miro',
                },
                {
                  src: '/assets/logos/VScode.svg',
                  alt: 'VS Code',
                  title: 'VS Code',
                },
                {
                  src: '/assets/logos/webflow.svg',
                  alt: 'Webflow',
                  title: 'Webflow',
                },
              ]}
              speed={70}
              direction="left"
              logoHeight={36}
              gap={56}
              hoverSpeed={0}
              fadeOut
              fadeOutColor="#EEF3F2"
              ariaLabel="Tools and companies"
            />
          </div>
        </div>
      </div>
    </section>
  );
}