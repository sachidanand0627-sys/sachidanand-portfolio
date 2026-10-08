import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CaseStudyShell, {
  SectionHead,
  Eyebrow,
  Note,
  Hand,
} from './CaseStudyShell';

const qs = [
  ['01', 'How should users start talking to the assistant?'],
  ['02', 'Can the assistant stay available while users fill the form?'],
  ['03', 'How will users know when it is listening?'],
  ['04', "What if a user doesn't respond?"],
  ['05', 'Should users be able to switch to typing?'],
  ['06', 'What should happen when users want to leave?'],
];

const decisions = [
  [
    '01',
    'Keep the assistant in context',
    'A floating, draggable entry point keeps support near the application and lets users position it around the content they need.',
  ],
  [
    '02',
    'Make voice state visible',
    'Listening and muted states are represented directly in the assistant controls, helping users understand when voice input is active.',
  ],
  [
    '03',
    'Support more than one mode',
    'Voice remains the primary interaction, with a chat option available as an alternative way to ask a question.',
  ],
  [
    '04',
    'Give users control to exit',
    'An end-conversation confirmation separates leaving the assistant from continuing to use it.',
  ],
  [
    '05',
    'Design within implementation constraints',
    'Continuous listening with manual mute/unmute was used instead of a press-and-hold interaction due to development constraints.',
  ],
  [
    '06',
    'Start with a focused rollout',
    'The initial scope considered a 20% user rollout in English and Hindi, with chat and regional-language support planned for later phases.',
  ],
];

const screens = [
  [
    'frame 8.svg',
    'Assistant entry point',
    'The application remains the primary surface. The assistant is available as a small floating entry point rather than a separate step in the loan journey.',
  ],
  [
    'frame 9.svg',
    'Prepare for voice',
    'A volume prompt appears before continuing, asking the user to raise their device volume so the assistant can be heard clearly.',
  ],
  [
    'frame 10.svg',
    'Compact voice controls',
    'The compact assistant presents a small set of controls while leaving most of the application visible. The user can manage the voice interaction without losing context.',
  ],
  [
    'frame 11.svg',
    'Expand the assistant',
    'Expanded controls expose voice, chat, and close actions. This gives users a more direct way to change how they interact with the assistant.',
  ],
  [
    'frame 12.svg',
    'Manual mute control',
    'The compact state shows a mute control, supporting the continuous-listening model with a clear way for users to pause microphone input.',
  ],
  [
    'frame 13.svg',
    'Move into chat',
    'The assistant can be used through text as well. The chat surface shows the conversation and provides an input for the user’s question.',
  ],
  [
    'frame 14.svg',
    'Answer in context',
    'The user asks, “Why is PAN required?” and the assistant responds with an explanation. This illustrates how a question can be handled within the application support experience.',
  ],
  [
    'frame 15.svg',
    'End with a clear choice',
    'Before the conversation closes, the assistant asks for confirmation and offers two clear actions: exit or keep talking.',
  ],
];

export default function AiAgentCaseStudy() {
  const heroRef = useRef(null);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Floating CTA appears only after the hero is no longer visible.
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

        {/* =========================================================
            BACK TO WORK
        ========================================================= */}
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] pt-24 sm:pt-28">
          <Link
            to="/#work"
            className="text-[12px] font-semibold text-[#587078] transition-colors hover:text-[#0A2F3D]"
          >
            ← Back to selected work
          </Link>
        </div>

        {/* =========================================================
            HERO
        ========================================================= */}
        <section
          ref={heroRef}
          className="mx-auto w-[min(1120px,calc(100%-36px))] py-16 md:py-24"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">

            {/* LEFT — HERO CONTENT */}
            <div>
              <Eyebrow>Product design · Case study 02</Eyebrow>

              <h1 className="mt-6 max-w-[650px] text-[clamp(50px,7vw,92px)] font-[650] leading-[.94] tracking-[-.075em] text-[#102F38]">
                VoiceFirst
                <br />
                <span className="font-hand font-normal tracking-[-.04em] text-[#587078]">
                  AI Agent
                </span>
              </h1>

              <p className="mt-7 max-w-[560px] text-[16px] leading-[1.7] text-[#587078]">
                Bringing guided, voice-led support into the loan application
                journey—so users can move forward with greater clarity and
                confidence.
              </p>

              {/* Project information */}
              <div className="mt-10 flex max-w-[660px] flex-wrap gap-x-8 gap-y-5 border-t border-[rgba(16,47,56,0.14)] pt-5">
                {[
                  ['Role', 'Product Designer'],
                  ['Focus', 'Voice interaction · UX'],
                  ['Platform', 'Mobile web'],
                  ['Project', 'InCred Finance'],
                ].map((x) => (
                  <div key={x[0]} className="text-[11px]">
                    <strong className="mb-1 block font-mono text-[9px] uppercase tracking-[.12em] text-[#84918D]">
                      {x[0]}
                    </strong>
                    {x[1]}
                  </div>
                ))}
              </div>

              {/* =====================================================
                  HERO PROTOTYPE CTA
              ===================================================== */}
              <div className="mt-8">
                <Link
                  to="/ai-agent-prototype"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#102F38]
                    bg-[#102F38]
                    px-5
                    py-3
                    text-[12px]
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#0A2F3D]
                  "
                >
                  <span>View prototype</span>
                  <span className="text-[14px] leading-none">↗</span>
                </Link>
              </div>
            </div>

            {/* RIGHT — HERO IMAGE */}
            <div className="flex items-center justify-center lg:justify-end lg:-mr-8">
              <img
                src="/case-study/ai-agent/assets/hero.svg"
                alt="VoiceFirst AI Agent interface"
                className="w-full max-w-[620px] rounded-[28px] object-contain"
              />
            </div>

          </div>
        </section>

        {/* =========================================================
            OVERVIEW
        ========================================================= */}
        <section
          id="overview"
          className="border-t border-[rgba(16,47,56,.14)] py-16 md:py-20"
        >
          <div className="mx-auto w-[min(1120px,calc(100%-36px))]">

            <SectionHead
              number="01 / Overview"
              title="Support that stays with the user."
            >
              A voice assistant concept for helping customers through the loan
              application without pulling them away from the task they came to
              complete.
            </SectionHead>

            <div className="grid gap-10 md:grid-cols-2">

              <div>
                <h3 className="text-[20px] font-[650] tracking-[-.03em] text-[#102F38]">
                  Verbal guidance doesn't always translate into action.
                </h3>

                <p className="mt-3 max-w-[620px] text-[14px] leading-[1.9] text-[#587078]">
                  The challenge was not simply to add a voice feature. It was
                  to make guidance understandable in the moment, while users
                  remained focused on the form.
                </p>
              </div>

              <div className="grid gap-5">

                <div>
                  <h3 className="text-[16px] font-[650] text-[#102F38]">
                    What users faced
                  </h3>

                  <p className="mt-2 text-[13px] leading-[1.8] text-[#587078]">
                    Users could hear support instructions but still struggle to
                    connect those instructions to the right screen, field, or
                    next step in the application.
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] font-[650] text-[#102F38]">
                    What the experience needed
                  </h3>

                  <p className="mt-2 text-[13px] leading-[1.8] text-[#587078]">
                    Keep help close to the task, make the assistant's state
                    clear, and give users control over when to speak, mute,
                    switch to chat, or end the conversation.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            DISCOVERY
        ========================================================= */}
        <section
          id="questions"
          className="border-t border-[rgba(16,47,56,.14)] py-16 md:py-20"
        >
          <div className="mx-auto w-[min(1120px,calc(100%-36px))]">

            <SectionHead
              number="02 / Discovery"
              title="Questions before shaping the experience."
            >
              Product discussions help define the boundaries of an interaction
              before committing to a UI. These are working questions based on
              the documented design decisions; confirm exact historical wording
              before presenting them as verbatim meeting notes.
            </SectionHead>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {qs.map((q, i) => (
                <Note
                  key={q[0]}
                  number={q[0]}
                  alt={i % 2 === 1}
                  rotate={
                    i % 3 === 1
                      ? 'rotate-[1.2deg]'
                      : i % 3 === 2
                        ? 'rotate-[-.8deg]'
                        : 'rotate-[-1.2deg]'
                  }
                >
                  {q[1]}
                </Note>
              ))}
            </div>

            <p className="mt-6 text-[11px] text-[#687D84]">
              Working discussion prompts based on the project context—not
              verified verbatim meeting notes.
            </p>

          </div>
        </section>

        {/* =========================================================
            EXPERIENCE
        ========================================================= */}
        <section
          id="experience"
          className="border-t border-[rgba(16,47,56,.14)] py-16 md:py-20"
        >
          <div className="mx-auto w-[min(1120px,calc(100%-36px))]">

            <SectionHead
              number="03 / Experience"
              title="Help without taking over the journey."
            >
              The interaction model focused on continuity, clear system
              feedback, and giving users a choice in how they engage.
            </SectionHead>

            <div className="grid gap-x-12 md:grid-cols-2">
              {decisions.map((d) => (
                <div
                  key={d[0]}
                  className="grid grid-cols-[32px_1fr] gap-4 border-t border-[rgba(16,47,56,.14)] py-5"
                >
                  <div className="font-mono text-[10px] text-[#91A09B]">
                    {d[0]}
                  </div>

                  <div>
                    <h3 className="text-[15px] font-[650] tracking-[-.025em] text-[#102F38]">
                      {d[1]}
                    </h3>

                    <p className="mt-2 text-[12px] leading-[1.8] text-[#587078]">
                      {d[2]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================
            SCREENS
        ========================================================= */}
        <section className="border-t border-[rgba(16,47,56,.14)] py-16 md:py-20">
          <div className="mx-auto w-[min(1120px,calc(100%-36px))]">

            <SectionHead
              number="04 / Screens"
              title="From first entry to conversation end."
            >
              The prototype screens below follow the provided SVG sequence.
              Notes describe the visible interaction and the intent supported
              by the project context.
            </SectionHead>

            <div className="space-y-16 md:space-y-24">

              {screens.map((s, i) => (
                <div
                  key={s[0]}
                  className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
                >

                  <div
                    className={`flex flex-col items-center ${
                      i % 2 ? 'md:order-2' : ''
                    }`}
                  >
                    <img
                      src={`/case-study/ai-agent/assets/${s[0]}`}
                      alt={s[1]}
                      className="w-[min(300px,76%)] rounded-[28px] shadow-[0_18px_28px_rgba(16,47,56,.1)] transition-transform duration-300 hover:-translate-y-1"
                    />
                  </div>

                  <div className={i % 2 ? 'md:order-1' : ''}>

                    <Eyebrow>
                      {String(i + 1).padStart(2, '0')} / SCREEN
                    </Eyebrow>

                    <h3 className="mt-4 max-w-[480px] text-[clamp(30px,4vw,42px)] font-[650] leading-[1.06] tracking-[-.05em] text-[#102F38]">
                      {s[1]}
                    </h3>

                    <p className="mt-5 max-w-[500px] text-[14px] leading-[1.9] text-[#587078]">
                      {s[2]}
                    </p>

                    <Hand className="mt-7 block">
                      Keep the interaction clear ↗
                    </Hand>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* =========================================================
            DESIGN SUMMARY
        ========================================================= */}
        <section className="border-t border-[rgba(16,47,56,.14)] py-16 md:py-20">
          <div className="mx-auto w-[min(1120px,calc(100%-36px))]">

            <div className="grid gap-8 rounded-md bg-[#EEF3F2] p-7 md:grid-cols-[1fr_.7fr] md:p-12">

              <div>
                <Eyebrow>05 / Design summary</Eyebrow>

                <h2 className="mt-4 text-[clamp(30px,4vw,46px)] font-[650] leading-[1.05] tracking-[-.055em] text-[#102F38]">
                  A guided layer within the application.
                </h2>

                <p className="mt-4 text-[13px] leading-[1.8] text-[#587078]">
                  The prototype brings voice and chat support into the loan
                  application experience, keeping the user in control of how
                  they engage.
                </p>
              </div>

              <div>

                <Hand className="block rotate-[-3deg]">
                  Designed to guide, not distract.
                </Hand>

                <p className="mt-3 text-[12px] leading-[1.8] text-[#587078]">
                  The concept brings together a persistent assistant, visible
                  voice controls, a text alternative, and a deliberate exit
                  flow. It establishes an interaction direction for in-journey
                  support while leaving room for future language and capability
                  expansion.
                </p>

                <p className="mt-4 text-[11px] leading-[1.7] text-[#687D84]">
                  This case study describes the design concept and prototype. No
                  measured impact or post-launch results were provided.
                </p>

              </div>
            </div>
          </div>
        </section>

      </main>

      {/* =========================================================
          FLOATING PROTOTYPE CTA
          Appears only after the hero section leaves the viewport.
          It does NOT appear in the navbar/hero area.
      ========================================================= */}
      <div
        className={`
          pointer-events-none
          fixed
          bottom-6
          right-6
          z-40
          transition-all
          duration-300
          sm:bottom-7
          sm:right-7
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
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#102F38]
            bg-[#102F38]
            px-5
            py-3
            text-[12px]
            font-semibold
            text-white
            shadow-[0_10px_30px_rgba(16,47,56,0.16)]
            transition-all
            duration-300
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