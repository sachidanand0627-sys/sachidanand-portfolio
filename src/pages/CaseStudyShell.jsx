import React from 'react';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';

export function CaseStudyShell({ children }) {
  return (
    <div id="top" className="min-h-screen bg-[#F7F8F6] text-[#0A2F3D] font-sans antialiased">
      <Navbar />
      {children}
      <Contact />
    </div>
  );
}

export function Eyebrow({ children }) {
  return <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#587078]">{children}</div>;
}

export function SectionHead({ number, title, children }) {
  return (
    <div className="mb-8 grid gap-3 md:mb-11 md:grid-cols-[180px_1fr] md:gap-10">
      <div className="pt-1 md:pt-2"><Eyebrow>{number}</Eyebrow></div>
      <div>
        <h2 className="m-0 max-w-[760px] text-[clamp(32px,4.5vw,52px)] font-[650] leading-[1.04] tracking-[-0.055em] text-[#102F38]">{title}</h2>
        {children && <p className="mt-4 max-w-[620px] text-[14px] leading-[1.8] text-[#587078]">{children}</p>}
      </div>
    </div>
  );
}

export function Hand({ children, className='' }) {
  return <span className={`font-hand text-[23px] leading-[1.15] text-[#806F55] ${className}`}>{children}</span>;
}

export function Note({ number, children, alt=false, rotate='' }) {
  return (
    <div className={`relative min-h-[155px] p-5 sm:p-6 ${alt ? 'bg-[#E7EDE5]' : 'bg-[#F4E7B8]'} ${rotate}`}>
      <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#A47E59] shadow-sm"/>
      <div className="font-mono text-[9px] font-bold tracking-[0.15em] text-[#8B7959]">QUESTION {number}</div>
      <p className="mt-4 font-hand text-[23px] leading-[1.12] text-[#34403B]">{children}</p>
    </div>
  );
}

export default CaseStudyShell;
