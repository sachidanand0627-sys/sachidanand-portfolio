import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ElectricLogo from './ElectricLogo.jsx';
import GooeyNav from './GooeyNav.jsx';

const NAV_ITEMS = ['work', 'about'];

/* ---------- small inline icons (no extra dependency) ---------- */
const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const HomeIcon = () => (
  <svg {...iconProps}>
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
  </svg>
);

const WorkIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const AboutIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const ContactIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

function Logo() {
  return (
    <ElectricLogo
      color="#62C1E5"
      glowColor="#0A2F3D"
      scale={0.7}
      intensity={1}
      glow={1}
      thickness={1.5}
      strands={4}
      bend={0.6}
      crackle={1.5}
      arcs={1}
      flicker={0.6}
      fill={0}
      speed={2.5}
      interactive={true}
      cursorIntensity={0.75}
      cursorRadius={100}
      theme="light"
      className="h-full w-full"
    />
  );
}

const CONTACT_CTA_CLASS =
  'rounded-full border border-[#0A2F3D]/20 bg-[#F5F7FA] px-4 py-2 text-[13px] font-semibold text-[#0A2F3D] transition-colors duration-200 hover:border-[#0A2F3D] hover:bg-[#0A2F3D] hover:text-[#F7F8F6]';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [activeIndex, setActiveIndex] = useState(-1);

  // scrolled: page is not at the very top  -> navbar gets its pill background
  // hidden:   user is scrolling down       -> desktop navbar slides away
  // inHero:   home page, hero still in view -> mobile shows the top bar instead of the bottom pill
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [inHero, setInHero] = useState(true);

  const lastYRef = useRef(0);

  // Opening the site on a case study page counts as having "arrived":
  // don't replay the welcome loader when the visitor later goes home.
  useEffect(() => {
    if (!isHome) {
      try {
        sessionStorage.setItem('portfolio-loader-seen', '1');
      } catch {
        /* ignore */
      }
    }
  }, [isHome]);

  // Highlight state: a nav item is only highlighted after it was clicked, and it is
  // cleared again as soon as the visitor scrolls out of that section.
  const activeIdRef = useRef(null);
  const arrivedRef = useRef(false);
  const lockUntilRef = useRef(0);

  const setActiveSection = useCallback((id) => {
    const index = id ? NAV_ITEMS.indexOf(id) : -1;
    activeIdRef.current = index >= 0 ? id : null;
    arrivedRef.current = false;
    // give the smooth scroll time to reach the section before we start checking
    lockUntilRef.current = Date.now() + 1500;
    setActiveIndex(index);
  }, []);

  // Arriving from another page (or a #work / #about link): highlight that item
  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }
    const hashId = location.hash ? location.hash.slice(1) : null;
    setActiveSection(NAV_ITEMS.includes(hashId) ? hashId : null);
  }, [isHome, location.hash, location.key, setActiveSection]);

  useEffect(() => {
    const marker = () => window.innerHeight * 0.42;

    const isInSection = (id) => {
      const section = document.getElementById(id);
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top <= marker() && rect.bottom > marker();
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;

      // --- show / hide + background (desktop) ---
      setScrolled(y > 8);
      if (y <= 8) {
        setHidden(false); // at the top: always visible, background goes away
      } else if (delta > 6) {
        setHidden(true); // scrolling down -> hide
      } else if (delta < -6) {
        setHidden(false); // scrolling up -> show the pill
      }
      lastYRef.current = y;

      // --- mobile: top bar while the hero is in view, bottom pill afterwards ---
      if (isHome) {
        const hero = document.getElementById('hero');
        setInHero(hero ? hero.getBoundingClientRect().bottom > 80 : true);
      } else {
        setInHero(false);
      }

      // --- click-only highlight for Work / About ---
      if (!isHome) return;
      const activeId = activeIdRef.current;
      if (!activeId) return;

      if (isInSection(activeId)) {
        arrivedRef.current = true;
      } else if (arrivedRef.current || Date.now() > lockUntilRef.current) {
        setActiveSection(null);
      }
    };

    lastYRef.current = window.scrollY;
    setHidden(false);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome, location.key, setActiveSection]);

  // One navigation path for every link, on every page
  const goToSection = (sectionId) => {
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    navigate({ pathname: '/', hash: `#${sectionId}` });
  };

  const goHome = (event) => {
    event?.preventDefault();
    setActiveSection(null);

    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // '#hero' makes the home page open on the hero, never on a previous scroll position
      navigate({ pathname: '/', hash: '#hero' });
    }
  };

  const handleNavClick = (event, sectionId) => {
    event?.preventDefault?.();
    setActiveSection(NAV_ITEMS.includes(sectionId) ? sectionId : null);
    goToSection(sectionId);
  };

  const showMobileTop = isHome && inHero;

  return (
    <>
      {/* ===================== Desktop navbar ===================== */}
      <header
        className={`fixed left-0 right-0 top-0 z-[100] hidden px-6 py-3 transition-transform duration-300 ease-out md:block ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div
          className={`mx-auto flex w-full max-w-[1400px] items-center justify-between rounded-full border px-4 py-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
            scrolled
              ? 'border-[#0A2F3D]/10 bg-[#F7F8F6]/80 shadow-[0_8px_30px_rgba(10,47,61,0.08)] backdrop-blur-md'
              : 'border-transparent bg-transparent'
          }`}
        >
          {/* Logo + Name */}
          <a
            href="/#hero"
            onClick={goHome}
            className="flex items-center no-underline"
            aria-label="Go to home"
          >
            <div className="h-9 w-9 shrink-0">
              <Logo />
            </div>
            <span className="ml-2 whitespace-nowrap text-[15px] font-bold tracking-[-0.02em] text-[#0A2F3D]">
              SACHIDANAND
            </span>
          </a>

          {/* Gooey Navigation */}
          <GooeyNav
            items={[
              { label: '[ Work ]', href: '/#work' },
              { label: '[ About ]', href: '/#about' },
            ]}
            particleCount={20}
            particleDistances={[90, 10]}
            particleR={400}
            initialActiveIndex={-1}
            activeIndexOverride={activeIndex}
            onItemClick={(event, item) =>
              handleNavClick(event, item.href.replace('/#', ''))
            }
            animationTime={600}
            timeVariance={500}
            colors={[1, 2, 3, 1, 3, 2, 1, 4]}
            effectsEnabled={true}
          />

          <button
            type="button"
            onClick={() => handleNavClick(null, 'contact')}
            className={`ml-3 ${CONTACT_CTA_CLASS}`}
          >
            Contact ↗
          </button>
        </div>
      </header>

      {/* ============ Mobile top bar (home page, hero only) ============ */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] px-4 py-3 transition-[opacity,transform] duration-300 ease-out md:hidden ${
          showMobileTop
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
        aria-hidden={!showMobileTop}
      >
        <div className="flex items-center justify-between">
          <a
            href="/#hero"
            onClick={goHome}
            className="flex min-w-0 items-center no-underline"
            aria-label="Go to home"
          >
            <div className="h-9 w-9 shrink-0">
              <Logo />
            </div>
            <span className="ml-1.5 whitespace-nowrap text-[13px] font-bold tracking-[-0.02em] text-[#0A2F3D]">
              SACHIDANAND
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleNavClick(null, 'work')}
              aria-label="Work"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0A2F3D]/15 bg-[#F5F7FA]/80 text-[#0A2F3D]"
            >
              <WorkIcon />
            </button>

            <button
              type="button"
              onClick={() => handleNavClick(null, 'about')}
              aria-label="About"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0A2F3D]/15 bg-[#F5F7FA]/80 text-[#0A2F3D]"
            >
              <AboutIcon />
            </button>

            <button
              type="button"
              onClick={() => handleNavClick(null, 'contact')}
              className={`${CONTACT_CTA_CLASS} !px-3 !py-2 !text-[12px] whitespace-nowrap`}
            >
              Contact ↗
            </button>
          </div>
        </div>
      </header>

      {/* ====== Mobile bottom pill (every page, once past the hero) ====== */}
      <header
        className={`fixed bottom-4 left-1/2 z-[100] -translate-x-1/2 transition-[opacity,transform] duration-300 ease-out md:hidden ${
          showMobileTop
            ? 'pointer-events-none translate-y-6 opacity-0'
            : 'translate-y-0 opacity-100'
        }`}
        aria-hidden={showMobileTop}
      >
        <nav className="flex items-center gap-1 rounded-full border border-white/20 bg-white/70 px-2 py-2 shadow-lg backdrop-blur-xl">
          <a
            href="/#hero"
            onClick={goHome}
            className="flex flex-col items-center gap-1 rounded-full px-4 py-1.5 text-[11px] font-semibold text-[#0A2F3D] no-underline"
          >
            <HomeIcon />
            Home
          </a>

          <button
            type="button"
            onClick={() => handleNavClick(null, 'work')}
            className="flex flex-col items-center gap-1 rounded-full border-0 bg-transparent px-4 py-1.5 text-[11px] font-semibold text-[#0A2F3D]"
          >
            <WorkIcon />
            Work
          </button>

          <button
            type="button"
            onClick={() => handleNavClick(null, 'about')}
            className="flex flex-col items-center gap-1 rounded-full border-0 bg-transparent px-4 py-1.5 text-[11px] font-semibold text-[#0A2F3D]"
          >
            <AboutIcon />
            About
          </button>

          <button
            type="button"
            onClick={() => handleNavClick(null, 'contact')}
            className="flex flex-col items-center gap-1 rounded-full border-0 bg-transparent px-4 py-1.5 text-[11px] font-semibold text-[#0A2F3D]"
          >
            <ContactIcon />
            Contact
          </button>
        </nav>
      </header>
    </>
  );
}