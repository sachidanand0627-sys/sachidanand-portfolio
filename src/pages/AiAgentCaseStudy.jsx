import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CaseStudyShell, {
  SectionHead,
  Eyebrow,
  Note,
  Hand,
} from './CaseStudyShell';

const qs = [
  {
    number: '01',
    question: 'Where does the user get stuck?',
    answer:
      'The biggest friction appeared when users had to understand what action to take next during the loan application.',
  },
  {
    number: '02',
    question: 'What happens when users need help?',
    answer:
      'Support was mostly verbal, which meant users still had to translate the guidance into actions on the screen.',
  },
  {
    number: '03',
    question: 'Can the guidance stay contextual?',
    answer:
      'The assistant needed to appear close to the task instead of taking users away from the application flow.',
  },
  {
    number: '04',
    question: 'How much control should the user have?',
    answer:
      'Users should be able to decide when the assistant is listening and when it should stay quiet.',
  },
  {
    number: '05',
    question: 'What should the first version include?',
    answer:
      'The first version needed to focus on contextual voice guidance without trying to solve every support scenario at once.',
  },
  {
    number: '06',
    question: 'How can this scale later?',
    answer:
      'The experience could later expand into chat, regional languages and more contextual assistance across the application journey.',
  },
];

const decisions = [
  {
    number: '01',
    title: 'Keep the assistant close to the task',
    text:
      'Instead of creating a separate support experience, the assistant sits on the right edge so help remains available without taking users away from the application.',
  },
  {
    number: '02',
    title: 'Use a floating interaction',
    text:
      'A floating assistant keeps the experience lightweight and allows the user to continue interacting with the loan application underneath it.',
  },
  {
    number: '03',
    title: 'Continuous listening',
    text:
      'A tap-and-hold interaction was explored, but continuous listening was chosen because the development constraints made repeated interaction less practical.',
  },
  {
    number: '04',
    title: 'Give users a mute control',
    text:
      'Because the assistant continuously listens, mute and unmute controls make the interaction feel more predictable and give users control over the experience.',
  },
  {
    number: '05',
    title: 'Start with a focused rollout',
    text:
      'The first phase was considered for around 20% of users, with English and Hindi as the initial languages.',
  },
  {
    number: '06',
    title: 'Design for future expansion',
    text:
      'Chat and regional language support were considered as future directions rather than adding them to the first version.',
  },
];

const screens = [
  [
    'frame 8.svg',
    'Floating assistant entry',
    'The assistant remains visible at the edge of the application without interrupting the current loan application task.',
  ],
  [
    'frame 9.svg',
    'Get Started discovery',
    'After a short delay, the Get Started action appears below the assistant so users can discover how to begin.',
  ],
  [
    'frame 10.svg',
    'Connecting state',
    'A short connecting state communicates that the assistant is preparing before starting the conversation.',
  ],
  [
    'frame 11.svg',
    'Assistant greeting',
    'The assistant introduces itself and provides a clear starting point for the user.',
  ],
  [
    'frame 12.svg',
    'Listening state',
    'The listening state makes it clear that the assistant is actively waiting for the user to speak.',
  ],
  [
    'frame 13.svg',
    'No-input nudge',
    'After around 30 seconds without input, the assistant gently nudges the user instead of leaving the state ambiguous.',
  ],
  [
    'frame 14.svg',
    'Close or continue',
    'Users can either close the assistant or continue talking, keeping control of the interaction.',
  ],
  [
    'frame 15.svg',
    'Conversation experience',
    'The final interaction focuses on keeping the assistant contextual while the user continues through the loan application.',
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
      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden pt-[120px] pb-[80px] max-[800px]:pt-[100px] max-[800px]:pb-[60px]"
      >
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)]">
          <div className="max-w-[850px]">
            <Eyebrow>PRODUCT · AI EXPERIENCE</Eyebrow>

            <h1 className="mt-5 max-w-[900px] text-[clamp(48px,7vw,92px)] font-medium leading-[0.95] tracking-[-0.055em] text-[#102F38]">
              AI Agent Assistant
            </h1>

            <p className="mt-7 max-w-[680px] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[#53656B]">
              Designing a contextual voice assistant to guide users through
              the loan application journey.
            </p>

            <div className="mt-8">
              <Link
                to="/ai-agent-prototype"
                className="inline-flex items-center gap-2 rounded-full border border-[#102F38] bg-[#102F38] px-5 py-3 text-[12px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A2F3D]"
              >
                <span>View prototype</span>
                <span className="text-[14px] leading-none">↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-16 w-full overflow-hidden rounded-[28px]">
            <img
              src="/case-study/ai-agent/assets/hero.svg"
              alt="AI Agent Assistant"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          OVERVIEW
      ========================================================= */}
      <section className="w-full py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)]">
          <SectionHead
            eyebrow="01 / OVERVIEW"
            title="Making help part of the application."
          />

          <div className="mt-12 grid grid-cols-[1.1fr_0.9fr] gap-16 max-[800px]:grid-cols-1 max-[800px]:gap-10">
            <div className="max-w-[700px]">
              <p className="text-[18px] leading-[1.7] text-[#53656B]">
                The loan application journey had moments where users needed
                guidance but verbal support did not always translate into
                clear actions on the screen.
              </p>

              <p className="mt-6 text-[18px] leading-[1.7] text-[#53656B]">
                The idea was to bring that guidance into the product itself —
                through a lightweight AI-powered voice assistant that could
                understand the user's context and help them move forward.
              </p>
            </div>

            <Note>
              <Hand>
                The goal wasn't to replace the application.
                <br />
                It was to make the next step easier.
              </Hand>
            </Note>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROBLEM
      ========================================================= */}
      <section className="w-full bg-[#EEF3F2] py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)]">
          <SectionHead
            eyebrow="02 / THE PROBLEM"
            title="Guidance existed, but it wasn't always connected to the action."
          />

          <div className="mt-12 grid grid-cols-[1.1fr_0.9fr] gap-16 max-[800px]:grid-cols-1 max-[800px]:gap-10">
            <div>
              <p className="text-[18px] leading-[1.7] text-[#53656B]">
                Users could receive verbal help when they were stuck, but
                they still had to figure out how that guidance mapped to the
                interface in front of them.
              </p>

              <p className="mt-6 text-[18px] leading-[1.7] text-[#53656B]">
                This created a gap between understanding what to do and
                actually completing the action.
              </p>
            </div>

            <Note>
              <Hand>
                Help shouldn't feel like
                <br />
                another step in the journey.
              </Hand>
            </Note>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUESTIONS
      ========================================================= */}
      <section className="w-full py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)]">
          <SectionHead
            eyebrow="03 / QUESTIONS"
            title="Questions I asked the product manager."
          />

          <div className="mt-14 grid grid-cols-2 gap-x-14 gap-y-12 max-[800px]:grid-cols-1 max-[800px]:gap-10">
            {qs.map((item) => (
              <div key={item.number} className="border-t border-[#102F38]/15 pt-5">
                <div className="text-[11px] font-semibold tracking-[0.12em] text-[#7A898E]">
                  {item.number}
                </div>

                <h3 className="mt-3 text-[20px] font-medium tracking-[-0.02em] text-[#102F38]">
                  {item.question}
                </h3>

                <p className="mt-3 text-[15px] leading-[1.65] text-[#53656B]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          DIRECTION
      ========================================================= */}
      <section className="w-full bg-[#EEF3F2] py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)]">
          <SectionHead
            eyebrow="04 / DIRECTION"
            title="A voice assistant that stays with the user."
          />

          <div className="mt-12 max-w-[760px]">
            <p className="text-[18px] leading-[1.7] text-[#53656B]">
              The direction was to make the assistant feel like a contextual
              layer inside the loan application rather than a separate support
              destination.
            </p>

            <p className="mt-6 text-[18px] leading-[1.7] text-[#53656B]">
              The assistant sits on the right edge, can be expanded when help
              is needed, and stays lightweight enough that the underlying
              application remains visible.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESIGN DECISIONS
      ========================================================= */}
      <section className="w-full py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)]">
          <SectionHead
            eyebrow="05 / DESIGN DECISIONS"
            title="Small decisions shaped the interaction."
          />

          <div className="mt-14 grid grid-cols-2 gap-x-14 gap-y-12 max-[800px]:grid-cols-1 max-[800px]:gap-10">
            {decisions.map((item) => (
              <div key={item.number} className="border-t border-[#102F38]/15 pt-5">
                <div className="text-[11px] font-semibold tracking-[0.12em] text-[#7A898E]">
                  {item.number}
                </div>

                <h3 className="mt-3 text-[20px] font-medium tracking-[-0.02em] text-[#102F38]">
                  {item.title}
                </h3>

                <p className="mt-3 text-[15px] leading-[1.65] text-[#53656B]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SCREENS
      ========================================================= */}
      <section className="w-full bg-[#EEF3F2] py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)]">
          <SectionHead
            eyebrow="06 / THE EXPERIENCE"
            title="From discovery to conversation."
          />

          <div className="mt-16 space-y-24 max-[800px]:space-y-16">
            {screens.map((screen, index) => (
              <div
                key={screen[0]}
                className="grid grid-cols-[minmax(0,1fr)_320px] items-center gap-16 max-[800px]:grid-cols-1 max-[800px]:gap-8"
              >
                <div className="overflow-hidden rounded-[28px]">
                  <img
                    src={`/case-study/ai-agent/assets/${screen[0]}`}
                    alt={screen[1]}
                    className="block h-auto w-full"
                  />
                </div>

                <div>
                  <div className="text-[11px] font-semibold tracking-[0.12em] text-[#7A898E]">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <h3 className="mt-3 text-[24px] font-medium tracking-[-0.03em] text-[#102F38]">
                    {screen[1]}
                  </h3>

                  <p className="mt-4 text-[15px] leading-[1.7] text-[#53656B]">
                    {screen[2]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          OUTCOME
      ========================================================= */}
      <section className="w-full py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto w-[min(1100px,calc(100%-40px))] max-[800px]:w-[calc(100%-32px)]">
          <SectionHead
            eyebrow="07 / OUTCOME"
            title="A more contextual way to ask for help."
          />

          <div className="mt-12 grid grid-cols-[1.1fr_0.9fr] gap-16 max-[800px]:grid-cols-1 max-[800px]:gap-10">
            <div className="max-w-[720px]">
              <p className="text-[18px] leading-[1.7] text-[#53656B]">
                The concept explored how voice-based assistance could become
                part of a financial application without taking users away from
                the task they were trying to complete.
              </p>

              <p className="mt-6 text-[18px] leading-[1.7] text-[#53656B]">
                Starting with a focused rollout allowed the experience to be
                tested before expanding into chat, regional languages and
                broader support scenarios.
              </p>
            </div>

            <Note>
              <Hand>
                Start focused.
                <br />
                Learn from the interaction.
                <br />
                Expand from there.
              </Hand>
            </Note>
          </div>
        </div>
      </section>

      {/* =========================================================
          FLOATING PROTOTYPE CTA
          Appears only after the hero section leaves the viewport.
          Higher on mobile so it stays above bottom navigation.
      ========================================================= */}
      <div
        className={`
          pointer-events-none
          fixed
          bottom-[100px]
          right-4
          z-50
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