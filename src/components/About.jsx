import React from 'react';
import LogoLoop from './LogoLoop.jsx';

export default function About() {
  return (
    <section
      id="about"
      data-cursor-theme="light"
      className="relative w-full overflow-hidden py-[clamp(88px,10vw,150px)] max-[800px]:py-[82px] bg-[#EEF3F2]"
    >
      <div className="w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)] mx-auto grid grid-cols-[minmax(220px,0.8fr)_minmax(0,1.4fr)] max-[800px]:grid-cols-1 gap-[clamp(36px,7vw,100px)] items-center">

        {/* About Image */}
        <div className="relative w-full flex items-center justify-center overflow-visible">

          {/* Image background stroke */}
          <div
            className="
              absolute
              bottom-[8%]
              left-[5%]
              w-[90%]
              h-[78%]
              rounded-[28px]
              border
              border-[#2CAEDF]

              max-[800px]:bottom-[10%]
              max-[800px]:left-[9%]
              max-[800px]:w-[82%]
              max-[800px]:h-[72%]

              max-[500px]:bottom-[11%]
              max-[500px]:left-[11%]
              max-[500px]:w-[78%]
              max-[500px]:h-[68%]
            "
          />

          <img
            src="/assets/about.svg"
            alt="Sachidanand"
            className="
              relative
              z-10
              block
              w-[150%]
              h-[150%]
              max-w-none
              object-contain
              object-center

              max-[800px]:w-[82%]
              max-[800px]:h-[82%]

              max-[500px]:w-[72%]
              max-[500px]:h-[72%]
            "
          />
        </div>

        {/* About Content */}
        <div className="max-w-[720px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#587078]">
            About me
          </p>

          <h2 className="mt-4 text-[clamp(42px,5vw,68px)] font-medium leading-[0.98] tracking-[-0.055em] text-[#102F38]">
            Designing with curiosity.
          </h2>

          <p className="mt-7 max-w-[650px] text-[17px] leading-[1.7] text-[#587078]">
            Product designer focused on making digital experiences clearer,
            more engaging and a little less obvious.
          </p>

          <p className="mt-5 max-w-[650px] text-[17px] leading-[1.7] text-[#587078]">
            A mix of product thinking, UI/UX, visual design and experimentation
            shapes the way each problem is approached — from the first
            interaction to the smallest detail.
          </p>

          {/* Skills */}
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
                  rounded-full
                  border
                  border-[#102F38]/15
                  px-3.5
                  py-2
                  text-[11px]
                  font-medium
                  text-[#102F38]
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
                  node: (
                    <img
                      src="/assets/tools/after-effects.svg"
                      alt="Adobe After Effects"
                    />
                  ),
                  title: 'Adobe After Effects',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/adobe-xd.svg"
                      alt="Adobe XD"
                    />
                  ),
                  title: 'Adobe XD',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/ai-studio.svg"
                      alt="AI Studio"
                    />
                  ),
                  title: 'AI Studio',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/canva.svg"
                      alt="Canva"
                    />
                  ),
                  title: 'Canva',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/claude.svg"
                      alt="Claude AI"
                    />
                  ),
                  title: 'Claude AI',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/figma.svg"
                      alt="Figma"
                    />
                  ),
                  title: 'Figma',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/framer.svg"
                      alt="Framer"
                    />
                  ),
                  title: 'Framer',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/github.svg"
                      alt="GitHub"
                    />
                  ),
                  title: 'GitHub',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/lottiefiles.svg"
                      alt="LottieFiles"
                    />
                  ),
                  title: 'LottieFiles',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/lovable.svg"
                      alt="Lovable"
                    />
                  ),
                  title: 'Lovable',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/miro.svg"
                      alt="Miro"
                    />
                  ),
                  title: 'Miro',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/vscode.svg"
                      alt="VS Code"
                    />
                  ),
                  title: 'VS Code',
                  href: '#',
                },
                {
                  node: (
                    <img
                      src="/assets/tools/webflow.svg"
                      alt="Webflow"
                    />
                  ),
                  title: 'Webflow',
                  href: '#',
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