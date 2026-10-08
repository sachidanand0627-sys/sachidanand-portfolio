import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { useCallback, useLayoutEffect, useState } from 'react';

import About from './components/About.jsx';
import CursorEffects from './components/CursorEffects.jsx';
import Contact from './components/Contact.jsx';
import Experience from './components/Experience.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';

import PortfolioLoader from './components/PortfolioLoader.jsx';
import Work from './components/Work.jsx';

import AiAgentCaseStudy from './pages/AiAgentCaseStudy.jsx';
import DocumentUploadCaseStudy from './pages/DocumentUploadCaseStudy.jsx';

const LOADER_KEY = 'portfolio-loader-seen';

const hasSeenLoader = () => {
  try {
    return sessionStorage.getItem(LOADER_KEY) === '1';
  } catch {
    return false;
  }
};

const markLoaderSeen = () => {
  try {
    sessionStorage.setItem(LOADER_KEY, '1');
  } catch {
    /* ignore */
  }
};

/*
 * Scroll to the top whenever the route changes.
 *
 * This fixes the issue where clicking "View" on a case-study card
 * opens the new case-study page at the previous scroll position.
 */
function RouteScrollReset() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Disable smooth scrolling temporarily so the reset is instant.
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    // Restore the previous scroll behavior.
    html.style.scrollBehavior = previousScrollBehavior;
  }, [pathname]);

  return null;
}

// Scroll to a section by id (or the very top for hero / no target)
// without smooth animation.
function jumpToSection(id) {
  const target =
    id && id !== 'hero' && id !== 'top'
      ? document.getElementById(id)
      : null;

  const html = document.documentElement;
  const prev = html.style.scrollBehavior;

  html.style.scrollBehavior = 'auto';

  if (target) {
    target.scrollIntoView({
      block: 'start',
    });
  } else {
    window.scrollTo(0, 0);
  }

  html.style.scrollBehavior = prev;
}

function HomePage() {
  const location = useLocation();

  // The loader only plays once per browser session
  // (first visit / refresh of a new tab).
  const [isLoading, setIsLoading] = useState(() => !hasSeenLoader());
  const [isRevealed, setIsRevealed] = useState(() => hasSeenLoader());

  const handleExitStart = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const handleComplete = useCallback(() => {
    markLoaderSeen();
    setIsLoading(false);
  }, []);

  /*
   * Take over browser scroll restoration so the page
   * always opens at the correct position.
   */
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  /*
   * Handle homepage section hashes such as:
   * /#work
   * /#about
   * /#contact
   */
  useLayoutEffect(() => {
    // Only honour a section hash once the page is actually visible.
    if (isLoading && !isRevealed) {
      window.scrollTo(0, 0);
      return;
    }

    const sectionId = location.hash
      ? location.hash.slice(1)
      : 'hero';

    // Wait a frame so the sections have laid out.
    const raf = requestAnimationFrame(() => {
      jumpToSection(sectionId);
    });

    return () => cancelAnimationFrame(raf);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, location.hash, isRevealed]);

  return (
    <>
      <div
        id="top"
        className="min-h-screen bg-[#F7F8F6] text-[#0A2F3D] font-sans antialiased transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          /*
           * 'none' once the intro is finished:
           * any transform, even translateY(0), would stop the
           * fixed navbar from staying pinned to the viewport.
           */
          transform: !isRevealed
            ? 'translateY(100vh)'
            : isLoading
              ? 'translateY(0)'
              : 'none',

          opacity: isRevealed ? 1 : 0,
        }}
      >
        <Navbar />

        <main>
          <Hero />
          <Work />
          <About />
          <Experience />
          <Contact />
        </main>
      </div>

      {isLoading && (
        <PortfolioLoader
          onExitStart={handleExitStart}
          onComplete={handleComplete}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Global cursor effects */}
      <CursorEffects />

      {/* Reset scroll position whenever the route changes */}
      <RouteScrollReset />

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* AI Agent Case Study */}
        <Route
          path="/case-study/ai-agent"
          element={<AiAgentCaseStudy />}
        />

        {/* Document Upload Case Study */}
        <Route
          path="/case-study/document-upload"
          element={<DocumentUploadCaseStudy />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}