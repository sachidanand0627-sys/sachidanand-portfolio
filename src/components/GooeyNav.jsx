import React, { useEffect, useRef, useState } from 'react';

const GooeyNav = ({
  items,
  particleCount = 12,
  particleDistances = [90, 10],
  particleR = 100,
  initialActiveIndex = 0,
  animationTime = 600,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  onItemClick,
  effectsEnabled = true,
  activeIndexOverride
}) => {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  // Allow the parent to drive the highlighted item (e.g. from scroll position, or -1 for none)
  useEffect(() => {
    if (typeof activeIndexOverride === 'number') {
      setActiveIndex(activeIndexOverride);
    }
  }, [activeIndexOverride]);

  const textRef = useRef(null);
  const filterRef = useRef(null);
  const navRef = useRef(null);

  const updateEffectPosition = (element) => {
    if (!element || !filterRef.current) return;

    const containerRect = navRef.current?.getBoundingClientRect();
    const rect = element.getBoundingClientRect();

    if (!containerRect) return;

    const left = rect.left - containerRect.left;
    const top = rect.top - containerRect.top;

    filterRef.current.style.setProperty('--effect-left', `${left}px`);
    filterRef.current.style.setProperty('--effect-top', `${top}px`);
    filterRef.current.style.setProperty('--effect-width', `${rect.width}px`);
    filterRef.current.style.setProperty('--effect-height', `${rect.height}px`);
  };

  const makeParticles = (element) => {
    if (!element || !effectsEnabled) return;

    const [distX, distY] = particleDistances;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');

      particle.className = 'particle';

      const colorIndex = colors[i % colors.length];

      particle.style.setProperty(
        '--particle-color',
        `var(--color-${colorIndex})`
      );

      const angle = Math.random() * Math.PI * 2;
      const distanceX = (Math.random() * distX) - distX / 2;
      const distanceY = (Math.random() * distY) - distY / 2;

      const startX = Math.cos(angle) * particleR;
      const startY = Math.sin(angle) * particleR;

      const duration =
        animationTime +
        (Math.random() * timeVariance - timeVariance / 2);

      particle.style.setProperty('--start-x', `${startX}px`);
      particle.style.setProperty('--start-y', `${startY}px`);
      particle.style.setProperty('--end-x', `${distanceX}px`);
      particle.style.setProperty('--end-y', `${distanceY}px`);
      particle.style.setProperty('--duration', `${duration}ms`);

      particle.style.left = '50%';
      particle.style.top = '50%';

      element.appendChild(particle);

      requestAnimationFrame(() => {
        particle.classList.add('animate');
      });

      setTimeout(() => {
        particle.remove();
      }, duration + 100);
    }
  };

  const handleClick = (e, index) => {
    e.preventDefault();

    const liEl = e.currentTarget.closest('li');

    if (!liEl) return;

    if (!effectsEnabled) {
      if (onItemClick) onItemClick(e, items[index]);
      return;
    }

    if (activeIndex === index) {
      if (onItemClick) {
        onItemClick(e, items[index]);
      }

      return;
    }

    setActiveIndex(index);

    updateEffectPosition(liEl);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');

      particles.forEach((particle) => {
        particle.remove();
      });
    }

    if (textRef.current) {
      textRef.current.classList.remove('active');

      void textRef.current.offsetWidth;

      textRef.current.classList.add('active');
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    if (onItemClick) {
      onItemClick(e, items[index]);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  useEffect(() => {
    const activeItem = navRef.current?.querySelector('li.active');

    if (activeItem) {
      updateEffectPosition(activeItem);
    }

    const handleResize = () => {
      const currentActive = navRef.current?.querySelector('li.active');

      if (currentActive) {
        updateEffectPosition(currentActive);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex, effectsEnabled]);

  return (
    <>
      <style>
        {`
          :root {
            --color-1: #62C1E5;
            --color-2: #0A2F3D;
            --color-3: #B6C2D2;
            --color-4: #F7F8F6;

            --linear-ease: linear(
              0,
              0.004,
              0.016,
              0.035,
              0.063,
              0.091,
              0.14,
              0.25,
              0.39,
              0.55,
              0.7,
              0.82,
              0.91,
              0.96,
              0.985,
              1
            );
          }

          .gooey-nav {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .gooey-nav ul {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .gooey-nav li {
            position: relative;
            z-index: 1;
          }

          .gooey-nav li a {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 7px 12px;
            color: #0A2F3D;
            text-decoration: none;
            font-size: 14px;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            transition:
              color 180ms ease,
              transform 180ms ease;
          }

          .gooey-nav li a:hover {
            transform: translateY(-1px);
          }

          .gooey-nav li.active a {
            color: #F7F8F6;
          }

          .gooey-nav li.active::after {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            border-radius: 999px;
            background: #0A2F3D;
            transform: scale(1);
            transition:
              transform 500ms var(--linear-ease),
              opacity 300ms ease;
          }

          

          .gooey-nav-effect {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
          }

          .gooey-nav-effect::before {
            content: '';
            position: absolute;
            left: var(--effect-left);
            top: var(--effect-top);
            width: var(--effect-width);
            height: var(--effect-height);
            border-radius: 999px;
            background: transparent;
            transition:
              left ${animationTime}ms var(--linear-ease),
              top ${animationTime}ms var(--linear-ease),
              width ${animationTime}ms var(--linear-ease),
              height ${animationTime}ms var(--linear-ease);
          }

          .gooey-nav-effect .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 999px;
            background: var(--particle-color);
            opacity: 0;
            pointer-events: none;
            transform: translate(-50%, -50%) translate(
              var(--start-x),
              var(--start-y)
            ) scale(0.4);
            filter: blur(0.2px);
          }

          .gooey-nav-effect .particle.animate {
            animation:
              gooey-particle var(--duration) var(--linear-ease) forwards;
          }

          @keyframes gooey-particle {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) translate(
                var(--start-x),
                var(--start-y)
              ) scale(0.4);
            }

            15% {
              opacity: 1;
            }

            70% {
              opacity: 0.9;
            }

            100% {
              opacity: 0;
              transform: translate(-50%, -50%) translate(
                var(--end-x),
                var(--end-y)
              ) scale(1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .gooey-nav li a,
            .gooey-nav li.active::after,
            .gooey-nav-effect::before {
              transition: none !important;
            }

            .gooey-nav-effect .particle {
              animation: none !important;
              display: none;
            }
          }
        `}
      </style>

      <nav
        ref={navRef}
        className={`gooey-nav${effectsEnabled ? '' : ' gooey-nav--quiet'}`}
        aria-label="Portfolio navigation"
      >
        <div
          ref={filterRef}
          className="gooey-nav-effect"
          aria-hidden="true"
        />

        <ul>
          {items.map((item, index) => (
            <li
              key={item.label}
              className={index === activeIndex ? 'active' : ''}
            >
              <a
                href={item.href}
                onClick={(e) => handleClick(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={index === activeIndex ? textRef : null}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default GooeyNav;