import React, { useEffect, useRef, useState } from 'react';
import GlowCard from './GlowCard';
import { Link, useNavigate } from 'react-router-dom';

const projects = [
  {
    number: "01 ",
    title: "AI Agent Assistant",
    desc: "A context-aware AI voice agent delivered guided guidance at the right moment, reducing drop-offs.",
    label: "Project one",
    glowColor: "rgba(192, 132, 252, 0.95)",
    prototypeUrl: "#prototype-1",
    viewUrl: "/case-study/ai-agent",

    // Static image shown before hover
    media: "/assets/ai-agent.svg",

    // Video played on hover
    video: "/assets/ai-agent.webm",
  },
  {
    number: "02 ",
    title: "Document Upload Flow",
    desc: "A clearer bank-statement verification flow with visible upload guidance and feedback.",
    label: "Document upload flow",
    glowColor: "rgba(98, 193, 229, 0.95)",
    prototypeUrl: "#prototype-2",
    viewUrl: "/case-study/document-upload",

    // Static image shown before hover
    media: "/assets/document-upload.svg",

    // Video played on hover
    video: "/assets/document-upload.webm",
  },
];

export default function Work() {
  const containerRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const videoRefs = useRef({});

  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    const handleScroll = () => {
      if (window.innerWidth < 768 || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalDistance = rect.height - window.innerHeight;

      if (totalDistance <= 0) return;

      const scrolled = -rect.top;

      const progress = Math.min(
        Math.max(scrolled / totalDistance, 0),
        1
      );

      setScrollProgress(progress);
    };

    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = (idx) => {
    setHoveredCard(idx);

    const video = videoRefs.current[idx];

    if (video) {
      video.currentTime = 0;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore autoplay errors.
        });
      }
    }
  };

  const handleMouseLeave = (idx) => {
    setHoveredCard(null);

    const video = videoRefs.current[idx];

    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleCardClick = (project) => {
    navigate(project.viewUrl);
  };

  const textOpacity = isMobile
    ? 1
    : Math.max(0, 1 - scrollProgress * 3.5);

  const textTranslateY = isMobile
    ? 0
    : -scrollProgress * 80;

  const cardAnim = isMobile
    ? 1
    : Math.min(
        Math.max(scrollProgress / 0.5, 0),
        1
      );

  const invAnim = 1 - cardAnim;

  const rotateX = isMobile ? 0 : invAnim * 28;
  const rotateY = isMobile ? 0 : invAnim * -14;
  const rotateZ = isMobile ? 0 : invAnim * 16;

  const translateZ = isMobile
    ? 0
    : invAnim * -350;

  const translateY = isMobile
    ? 0
    : invAnim * 120;

  const scale = isMobile
    ? 1
    : 0.72 + cardAnim * 0.28;

  const opacity = isMobile
    ? 1
    : 0.25 + cardAnim * 0.75;

  const blur = isMobile
    ? 0
    : invAnim * 0;

  return (
    <section
      ref={containerRef}
      id="work"
      data-cursor-theme="light"
      className={`relative w-full bg-[#F7F8F6] overflow-x-clip ${
        isMobile ? 'py-16' : 'h-[260vh]'
      }`}
    >
      <div
        className={
          isMobile
            ? 'w-full px-4'
            : 'sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20'
        }
      >
        <div className="relative w-full max-w-[1100px] mx-auto flex flex-col justify-center items-center">

          {/* SECTION INTRO */}
          <div
            className={`w-full will-change-transform flex flex-col ${
              isMobile
                ? 'text-left items-start mb-8'
                : 'text-center items-center pointer-events-none z-10 transition-transform duration-75'
            }`}
            style={{
              opacity: textOpacity,
              transform: `translateY(${textTranslateY}px)`,
              display:
                !isMobile && textOpacity === 0
                  ? 'none'
                  : 'flex',
            }}
          >
            <p className="m-0 mb-3 text-[11px] leading-none tracking-[0.12em] uppercase font-bold text-[#587078]">
              Selected work
            </p>

            <h2 className="m-0 max-w-[760px] text-[clamp(28px,5vw,76px)] leading-[1.05] tracking-[-0.04em] font-[650] text-[#102F38]">
              A few things worth scrolling for.
            </h2>

            <p className="max-w-[590px] mt-3 mb-0 text-[15px] sm:text-[17px] leading-[1.55] text-[#587078]">
              Product experiences, interfaces and visual work shaped around
              clarity, curiosity and the details that make digital products
              feel considered.
            </p>
          </div>

          {/* PROJECT CARDS */}
          <div
            className="w-full flex justify-center items-center"
            style={{
              perspective: isMobile
                ? 'none'
                : '1300px',

              transformStyle: isMobile
                ? 'flat'
                : 'preserve-3d',

              marginTop: isMobile
                ? '0px'
                : '-120px',
            }}
          >
            <div
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 will-change-transform"
              style={{
                transform: isMobile
                  ? 'none'
                  : `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,

                transformOrigin:
                  'center center',

                opacity,

                filter: isMobile
                  ? 'none'
                  : `blur(${blur}px)`,

                pointerEvents: 'auto',
              }}
            >
              {projects.map((project, idx) => {
                const isInternalRoute =
                  project.viewUrl.startsWith('/');

                const isHovered =
                  hoveredCard === idx;

                return (
                  <div
                    key={idx}
                    className="w-full min-w-0 cursor-pointer"
                    onMouseEnter={() =>
                      handleMouseEnter(idx)
                    }
                    onMouseLeave={() =>
                      handleMouseLeave(idx)
                    }
                    onClick={() =>
                      handleCardClick(project)
                    }
                  >
                    <GlowCard
                      aria-label={project.label}
                      glowColor={project.glowColor}
                      glowSize={320}
                      className="w-full"
                    >
                      {/* MEDIA */}
                      <div className="relative aspect-[4/3] m-[10px] rounded-[17px] overflow-hidden bg-[#E9F0F0] border border-[rgba(16,47,56,0.06)] flex-none">

                        {/* STATIC IMAGE */}
                        <img
                          src={project.media}
                          alt={project.title}
                          draggable="false"
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                            isHovered
                              ? 'opacity-0 scale-[1.04]'
                              : 'opacity-100 scale-100'
                          }`}
                        />

                        {/* HOVER VIDEO */}
                        <video
                          ref={(el) => {
                            videoRefs.current[idx] = el;
                          }}
                          src={project.video}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                            isHovered
                              ? 'opacity-100 scale-100'
                              : 'opacity-0 scale-[1.04]'
                          }`}
                        />
                      </div>

                      {/* PROJECT INFORMATION */}
                      <div className="px-5 pt-4 pb-5 text-left flex flex-col justify-between flex-1">
                        <div>
                          <span className="block mb-2 font-mono font-medium text-[10px] leading-none tracking-[0.12em] text-[#62AFCB]">
                            {project.number}
                          </span>

                          <h3 className="m-0 text-[20px] sm:text-[22px] leading-[1.15] tracking-[-0.025em] font-[650] text-[#102F38]">
                            {project.title}
                          </h3>

                          <p className="mt-2 mb-0 text-[13px] sm:text-[14px] leading-[1.5] text-[#687D84]">
                            {project.desc}
                          </p>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-[rgba(16,47,56,0.08)]">

                          <a
                            href={project.prototypeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#0A2F3D] text-white text-[12px] font-semibold tracking-tight shadow-sm transition-all duration-200 hover:bg-[#62C1E5] hover:text-[#0A2F3D] active:scale-95 no-underline"
                            onClick={(e) =>
                              e.stopPropagation()
                            }
                          >
                            <span>
                              Prototype
                            </span>

                            <span className="text-[12px] leading-none">
                              ↗
                            </span>
                          </a>

                          {isInternalRoute ? (
                            <Link
                              to={project.viewUrl}
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[rgba(16,47,56,0.18)] text-[#0A2F3D] text-[12px] font-semibold tracking-tight transition-all duration-200 hover:border-[#0A2F3D] hover:bg-[#F7F8F6] active:scale-95 no-underline"
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >
                              <span>
                                View
                              </span>

                              <span className="text-[12px] leading-none">
                                →
                              </span>
                            </Link>
                          ) : (
                            <a
                              href={project.viewUrl}
                              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[rgba(16,47,56,0.18)] text-[#0A2F3D] text-[12px] font-semibold tracking-tight transition-all duration-200 hover:border-[#0A2F3D] hover:bg-[#F7F8F6] active:scale-95 no-underline"
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >
                              <span>
                                View
                              </span>

                              <span className="text-[12px] leading-none">
                                →
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </GlowCard>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
