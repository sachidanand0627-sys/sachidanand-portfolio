import React from 'react';

export default function Contact() {
  const name = "SACHIDANAND";

  return (
    <footer
      id="contact"
      data-cursor-theme="dark"
      /* Preserve the dark contact surface while removing the animated rays background. */
      className="relative flex min-h-[100dvh] overflow-hidden bg-[#0A2F3D] pt-[clamp(88px,14vh,160px)] pb-24 md:pb-[clamp(32px,6vh,64px)]"
    >




      {/* Container switches to space-between flex on desktop */}
      <div className="relative z-10 w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)] mx-auto flex flex-col justify-start gap-10 md:justify-between md:gap-0">
        
        
        {/* Top Contact Content */}
        <div className="flex-none">
          <p className="m-0 mb-3 text-[11px] leading-none tracking-[0.12em] uppercase font-bold text-[rgba(245,247,250,0.58)]">
            Have something in mind?
          </p>
          <h2 className="m-0 max-w-[850px] text-[clamp(32px,5.5vw,76px)] leading-[0.95] tracking-[-0.055em] font-[650] text-[#F5F7FA]">
            Let’s make something worth talking about.
          </h2>
          <p className="max-w-[540px] mt-4 mb-0 text-[rgba(245,247,250,0.68)] text-[clamp(14px,1.4vw,17px)] leading-[1.5]">
            Whether it’s a product, an interface or an idea that needs shaping,
            I’m always interested in good problems.
          </p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center justify-center mt-6 min-h-[42px] px-5 rounded-full bg-[#F5F7FA] text-[#0A2F3D] no-underline text-[14px] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#62C1E5]"
          >
            Let’s Talk ↗
          </a>
        </div>

        {/* Center Glowing Name Wordmark */}
        <div className="w-full select-none md:my-auto md:py-4">
          <div className="flex justify-between items-center w-full overflow-visible">
            {name.split('').map((letter, idx) => (
              <span
    key={idx}
    className="group relative cursor-default font-extrabold tracking-[-0.04em] transition-all duration-300 ease-out"
    style={{
      fontSize: 'clamp(28px, 8.5vw, 130px)',
      lineHeight: 0.9,
      color: 'transparent',
      WebkitTextStroke: '1.5px rgba(98, 193, 229, 0.35)',
      display: 'inline-block',
      filter: 'none',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = 'transparent'; // Keeps the interior hollow/empty
      e.currentTarget.style.WebkitTextStroke = '2px #62C1E5'; // Brightens and thickens the stroke line
      // filter: drop-shadow specifically traces the stroke vector path
      e.currentTarget.style.filter = 'drop-shadow(0 0 8px #62C1E5) drop-shadow(0 0 20px rgba(98, 193, 229, 0.7))';
      
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = 'transparent';
      e.currentTarget.style.WebkitTextStroke = '1.5px rgba(98, 193, 229, 0.35)';
      e.currentTarget.style.filter = 'none';
      e.currentTarget.style.transform = 'translateY(0px) scale(1)';
    }}
  >
    {letter}
  </span>
))}
          </div>
        </div>

       
      </div>
    </footer>
  );
}