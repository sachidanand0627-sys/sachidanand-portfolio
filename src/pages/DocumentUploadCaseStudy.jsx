import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CaseStudyShell, {
  SectionHead,
  Eyebrow,
  Note,
  Hand,
} from './CaseStudyShell';

const screens = [
  [
    '01',
    'A focused upload entry point',
    'Once PDF upload is selected, the screen keeps the upload action prominent and places file guidance close to it. The empty state avoids competing actions while the user is preparing to add a statement.',
    'No surprises at the upload step.',
    'File size and upload limits are visible before users choose a document—so the user knows the rules upfront.',
    '02-empty-upload.svg',
    'Keep the next action obvious ↗',
  ],
  [
    '02',
    'Choose a verification method',
    'The flow presents OTP verification and PDF upload as two ways to verify a bank statement. Each option includes a short explanation so users can understand what the method involves before continuing.',
    'Make the choice before the first step.',
    'The selection screen sets expectations before the user enters the upload journey. The choice is clear before the work begins.',
    '01-verification-method.svg',
    'Start with a clear choice ↗',
  ],
  [
    '03',
    'Manage files as they upload',
    'The populated state shows selected PDF statements with their upload status. A progress indicator gives feedback while a file is still uploading, while completed files are visibly marked as uploaded.',
    'Keep users in the loop.',
    'Users can distinguish completed files from an upload that is still in progress, without being left in the dark.',
    '03-upload-progress.svg',
    'Show progress, not uncertainty ↗',
  ],
  [
    '04',
    'Confirm before deleting a file',
    'Removing an uploaded statement is a consequential action. The confirmation dialog identifies the file and gives the user a clear choice to remove it or keep it, helping prevent accidental deletion.',
    'A second chance before removal.',
    'The dialog makes the action and its consequence clear before the file is removed, leaving room to change course.',
    '05-delete-confirmation.svg',
    'Prevent accidental removal ↗',
  ],
  [
    '05',
    'Confirm a successful upload',
    'A success message acknowledges that the document has been uploaded. This gives the user a clear response to the action rather than leaving them to infer whether the upload worked.',
    'A clear sign it worked.',
    'The confirmation makes the upload outcome explicit and closes the loop.',
    '04-upload-success.svg',
    'Confirm the action ↗',
  ],
];

export default function DocumentUploadCaseStudy() {
  const heroRef = useRef(null);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingCta(!entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <CaseStudyShell>
      <main>
        {/* Back navigation */}
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] pt-24 sm:pt-28">
          <Link
            to="/#work"
            className="text-[12px] font-semibold text-[#587078] transition-colors hover:text-[#0A2F3D]"
          >
            ← Back to selected work
          </Link>
        </div>

        {/* HERO */}
        <section
          ref={heroRef}
          className="mx-auto w-[min(1120px,calc(100%-36px))] border-0 py-16 md:py-24"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-10">
            {/* Hero text */}
            <div>
              <Eyebrow>UX case study · Fintech</Eyebrow>

              <h1 className="mt-6 max-w-[760px] text-[clamp(48px,8vw,94px)] font-[650] leading-[0.94] tracking-[-0.07em] text-[#102F38]">
                Document
                <br />
                upload flow
                <span className="text-[#62C1E5]">.</span>
              </h1>

              <p className="mt-6 max-w-[580px] text-[16px] leading-[1.7] text-[#587078]">
                Designing a clearer way for users to submit bank statements,
                understand upload requirements, and move forward with
                verification.
              </p>

              {/* Hero metadata */}
              <div className="mt-9 flex max-w-[650px] flex-wrap gap-x-8 gap-y-5 border-t border-[rgba(16,47,56,0.14)] pt-5">
                {[
                  ['Focus', 'Document verification'],
                  ['Platform', 'Mobile experience'],
                  ['Role', 'Product design'],
                ].map((x) => (
                  <div
                    key={x[0]}
                    className="text-[11px] text-[#0A2F3D]"
                  >
                    <strong className="mb-1 block font-mono text-[9px] uppercase tracking-[0.12em] text-[#84918D]">
                      {x[0]}
                    </strong>
                    {x[1]}
                  </div>
                ))}
              </div>

              {/* Hero prototype CTA */}
              <div className="mt-8">
                <Link
                  to="/ai-agent-prototype"
                  className="
                    inline-flex items-center gap-2
                    rounded-full
                    border border-[#102F38]
                    bg-[#102F38]
                    px-5 py-3
                    text-[12px] font-semibold text-white
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#0A2F3D]
                  "
                >
                  <span>View prototype</span>
                  <span className="text-[14px] leading-none">↗</span>
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="flex items-center justify-center lg:justify-end">
              <img
                src="/case-study/document-upload/assets/hero.svg"
                alt="Document upload flow"
                className="
                  w-full
                  max-w-[620px]
                  rounded-[28px]
                  object-contain
                "
              />
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section
          id="overview"
          className="border-t border-[rgba(16,47,56,0.14)] py-16 md:py-20"
        >
          <div className="mx-auto w-[min(1120px,calc(100%-36px))]">
            <SectionHead
              number="01 / Overview"
              title="Making document verification easier to understand."
            >
              The experience gives users a choice in how they verify their bank
              statements, then guides them through uploading and managing the
              required files.
            </SectionHead>

            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="max-w-[650px] space-y-5 text-[14px] leading-[1.9] text-[#587078]">
                <p>
                  The document upload flow is part of a larger application
                  journey that can begin from a partner app. The design needs
                  to make the next step clear and communicate what users can
                  submit before they proceed.
                </p>

                <p>
                  For users choosing PDF upload, the interface provides a
                  place to add statements, see upload status, and manage files.
                  The screens focus on making the requirements visible and
                  giving feedback as the upload progresses.
                </p>
              </div>

              <div className="grid grid-cols-2 border-l border-t border-[rgba(16,47,56,0.14)]">
                {[
                  ['Requirement', 'Bank statement verification'],
                  ['Methods', 'OTP verification or PDF upload'],
                  ['File guidance', 'Maximum 10 MB per file; up to 10 PDFs'],
                  ['Design focus', 'Clarity, feedback, and file management'],
                ].map((x) => (
                  <div
                    key={x[0]}
                    className="border-b border-r border-[rgba(16,47,56,0.14)] p-4"
                  >
                    <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.1em] text-[#84918D]">
                      {x[0]}
                    </span>

                    <strong className="text-[12px] leading-[1.5] text-[#102F38]">
                      {x[1]}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DISCOVERY */}
        <section className="border-t border-[rgba(16,47,56,0.14)] py-16 md:py-20">
          <div className="mx-auto w-[min(1120px,calc(100%-36px))]">
            <SectionHead
              number="02 / Discovery"
              title="Questions before shaping the experience."
            >
              The discussion with the product manager helped clarify the
              purpose, journey, constraints, and expected next steps before
              translating the requirement into screens.
            </SectionHead>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                [
                  '01',
                  'What is the main goal of this document upload flow?',
                ],
                [
                  '02',
                  'How does the user journey work when someone comes from the partner app?',
                ],
                [
                  '03',
                  'What are the available ways for users to verify their bank statements?',
                ],
                [
                  '04',
                  'Are there any restrictions or technical limitations for uploading documents?',
                ],
                [
                  '05',
                  'What information do we need from users to complete the verification?',
                ],
                [
                  '06',
                  'What should happen after users submit their bank statements?',
                ],
              ].map((x, i) => (
                <Note
                  key={x[0]}
                  number={x[0]}
                  alt={i % 2 === 1}
                  rotate={
                    i % 3 === 1
                      ? 'rotate-[1.2deg]'
                      : i % 3 === 2
                        ? 'rotate-[-0.8deg]'
                        : 'rotate-[-1.2deg]'
                  }
                >
                  {x[1]}
                </Note>
              ))}
            </div>

            <p className="mt-6 text-[11px] text-[#687D84]">
              Discovery notes · Product manager discussion
            </p>
          </div>
        </section>

        {/* SCREEN SECTIONS */}
        {screens.map((s, i) => (
          <section
            key={s[5]}
            className="border-t border-[rgba(16,47,56,0.14)] py-14 md:py-20"
          >
            <div className="mx-auto grid w-[min(1120px,calc(100%-36px))] items-center gap-10 md:grid-cols-2 md:gap-16">
              {/* Screen image */}
              <div
                className={`${
                  i % 2 ? 'md:order-2' : ''
                } flex flex-col items-center`}
              >
                <img
                  src={`/case-study/document-upload/assets/${s[5]}`}
                  className="
                    w-[min(300px,76%)]
                    rounded-[28px]
                    shadow-[0_20px_30px_rgba(16,47,56,0.12)]
                    transition-transform duration-300
                    hover:-translate-y-1
                  "
                  alt={s[1]}
                />

                <Hand className="mt-6">{s[6]}</Hand>
              </div>

              {/* Screen description */}
              <div className={i % 2 ? 'md:order-1' : ''}>
                <Eyebrow>{s[0]}</Eyebrow>

                <h2 className="mt-4 max-w-[480px] text-[clamp(31px,4vw,43px)] font-[650] leading-[1.06] tracking-[-0.05em] text-[#102F38]">
                  {s[1]}
                </h2>

                <p className="mt-5 max-w-[500px] text-[14px] leading-[1.9] text-[#587078]">
                  {s[2]}
                </p>

                <div className="mt-6 border-l-2 border-[#9CB7AD] bg-[#EEF3F2] px-4 py-3">
                  <Hand>{s[3]}</Hand>

                  <p className="mt-2 text-[11px] leading-[1.7] text-[#587078]">
                    {s[4]}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* DESIGN SUMMARY */}
        <section className="border-t border-[rgba(16,47,56,0.14)] py-16 md:py-20">
          <div className="mx-auto w-[min(1120px,calc(100%-36px))]">
            <div className="grid gap-8 rounded-md bg-[#EEF3F2] p-7 md:grid-cols-[1fr_.7fr] md:p-12">
              <div>
                <Eyebrow>08 / Design summary</Eyebrow>

                <h2 className="mt-4 text-[clamp(30px,4vw,46px)] font-[650] leading-[1.05] tracking-[-0.055em] text-[#102F38]">
                  A guided path from choice to confirmation.
                </h2>

                <p className="mt-4 max-w-[620px] text-[13px] leading-[1.8] text-[#587078]">
                  The screens bring together verification-method selection,
                  upload guidance, progress feedback, success confirmation,
                  and file management in one document-upload experience.
                </p>
              </div>

              <ul className="m-0 list-none space-y-3 self-center p-0 text-[13px] text-[#587078]">
                {[
                  'Clear choice between OTP and PDF upload',
                  'Visible file limits before upload',
                  'Upload status and progress feedback',
                  'Confirmation for successful uploads and deletion',
                ].map((x) => (
                  <li
                    key={x}
                    className="border-b border-[rgba(16,47,56,0.12)] pb-3"
                  >
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING PROTOTYPE CTA */}
      <div
        className={`
          pointer-events-none fixed bottom-6 right-6 z-40
          transition-all duration-300
          sm:bottom-7 sm:right-7
          ${
            showFloatingCta
              ? 'translate-y-0 opacity-100'
              : 'translate-y-3 opacity-0'
          }
        `}
      >
        <Link
          to="/ai-agent-prototype"
          tabIndex={showFloatingCta ? 0 : -1}
          className="
            pointer-events-auto
            flex items-center gap-2
            rounded-full
            border border-[#102F38]
            bg-[#102F38]
            px-5 py-3
            text-[12px] font-semibold text-white
            shadow-[0_10px_30px_rgba(16,47,56,0.16)]
            transition-all duration-300
            hover:-translate-y-1
            hover:bg-[#0A2F3D]
            hover:shadow-[0_14px_36px_rgba(16,47,56,0.22)]
          "
        >
          <span>View prototype</span>
          <span className="text-[14px] leading-none">↗</span>
        </Link>
      </div>
    </CaseStudyShell>
  );
}