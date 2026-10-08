import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';

const caseStudies = [
  {
    title: 'AI Agent Assistant',
    description:
      'An AI-powered voice assistant designed to guide users through the loan application journey.',
    image: '/assets/ai-agent.svg',
    route: '/case-study/ai-agent',
  },
  {
    title: 'Document Upload Flow',
    description:
      'A simpler document upload experience designed to make loan verification clearer and easier.',
    image: '/assets/document-upload.svg',
    route: '/case-study/document-upload',
  },
];

export function CaseStudyShell({ children }) {
  const location = useLocation();

  const relatedCaseStudies = caseStudies.filter(
    (project) => project.route !== location.pathname
  );

  return (
    <div
      id="top"
      className="min-h-screen bg-[#F7F8F6] text-[#0A2F3D] font-sans antialiased"
    >
      <Navbar />

      {children}

      {/* More Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="w-full px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="mx-auto max-w-[1400px]">

            {/* Section Heading */}
            <div className="mb-12 text-center md:mb-16">
              <Eyebrow>MORE WORK</Eyebrow>

              <h2 className="mt-3 text-[clamp(38px,5vw,64px)] font-[650] leading-[1] tracking-[-0.055em] text-[#102F38]">
                More Case Studies
              </h2>
            </div>

            {/* Centered Cards */}
            <div className="flex flex-wrap justify-center gap-10">
              {relatedCaseStudies.map((project) => (
                <Link
                  key={project.route}
                  to={project.route}
                  className="group block w-full max-w-[600px] text-center"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-[#E7EDE5]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Arrow */}
                    <div className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-[#F7F8F6] text-[20px] text-[#102F38] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      ↗
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="mt-6">
                    <h3 className="text-[26px] font-[600] leading-[1.1] tracking-[-0.035em] text-[#102F38] transition-colors duration-300 group-hover:text-[#806F55] md:text-[30px]">
                      {project.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-[1.75] text-[#587078]">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Contact />
    </div>
  );
}

export function Eyebrow({ children }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#587078]">
      {children}
    </div>
  );
}

export function SectionHead({ number, title, children }) {
  return (
    <div className="mb-8 grid gap-3 md:mb-11 md:grid-cols-[180px_1fr] md:gap-10">
      <div className="pt-1 md:pt-2">
        <Eyebrow>{number}</Eyebrow>
      </div>

      <div>
        <h2 className="m-0 max-w-[760px] text-[clamp(32px,4.5vw,52px)] font-[650] leading-[1.04] tracking-[-0.055em] text-[#102F38]">
          {title}
        </h2>

        {children && (
          <p className="mt-4 max-w-[620px] text-[14px] leading-[1.8] text-[#587078]">
            {children}
          </p>
        )}
      </div>
    </div>
  );
}

export function Hand({ children, className = '' }) {
  return (
    <span
      className={`font-hand text-[23px] leading-[1.15] text-[#806F55] ${className}`}
    >
      {children}
    </span>
  );
}

export function Note({
  number,
  children,
  alt = false,
  rotate = '',
}) {
  return (
    <div
      className={`relative min-h-[155px] p-5 sm:p-6 ${
        alt ? 'bg-[#E7EDE5]' : 'bg-[#F4E7B8]'
      } ${rotate}`}
    >
      <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#A47E59] shadow-sm" />

      <div className="font-mono text-[9px] font-bold tracking-[0.15em] text-[#8B7959]">
        QUESTION {number}
      </div>

      <p className="mt-4 font-hand text-[23px] leading-[1.12] text-[#34403B]">
        {children}
      </p>
    </div>
  );
}

export default CaseStudyShell;