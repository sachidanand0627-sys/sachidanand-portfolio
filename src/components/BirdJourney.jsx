import React, { useEffect, useRef } from 'react';

const FLYING_FRAMES = Array.from({ length: 12 }, (_, index) =>
  `/assets/bird-frames/bird-frame-${String(index + 1).padStart(2, '0')}.png`
);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function BirdJourney() {
  const birdRef = useRef(null);
  const rafRef = useRef(0);
  const frameRef = useRef(0);
  const lastFrameTimeRef = useRef(0);
  const previousPointerRef = useRef({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.35,
    time: performance.now(),
  });
  const directionRef = useRef(1);

  const pointerRef = useRef({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.35,
    vx: 0,
    vy: 0,
    active: false,
  });

  useEffect(() => {
    const bird = birdRef.current;
    if (!bird) return undefined;

    const pointerQuery = window.matchMedia('(pointer: fine)');
    if (!pointerQuery.matches) {
      bird.style.display = 'none';
      return undefined;
    }

    document.documentElement.classList.add('bird-cursor-active');

    const images = FLYING_FRAMES.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });

    const handlePointerMove = (event) => {
      const now = performance.now();
      const previous = previousPointerRef.current;
      const dt = Math.max(8, now - previous.time);
      const dx = event.clientX - previous.x;
      const dy = event.clientY - previous.y;

      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
      pointerRef.current.vx = clamp((dx / dt) * 16, -18, 18);
      pointerRef.current.vy = clamp((dy / dt) * 16, -18, 18);
      pointerRef.current.active = true;

      // Remember the last horizontal direction.
if (pointerRef.current.vx < -0.35) {
  directionRef.current = -1;
} else if (pointerRef.current.vx > 0.35) {
  directionRef.current = 1;
}

      previousPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        time: now,
      };
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    const update = (now) => {
      const pointer = pointerRef.current;

      // Keep the bird exactly on the native cursor position. The bird itself is the cursor.
      const angle = clamp(pointer.vy * 1.15, -18, 18);
      const horizontalDirection = directionRef.current;

      // Continuous wing animation — independent of cursor movement.
      const frameDelay = 72;
      if (now - lastFrameTimeRef.current >= frameDelay) {
        frameRef.current = (frameRef.current + 1) % FLYING_FRAMES.length;
        bird.src = images[frameRef.current]?.src || FLYING_FRAMES[frameRef.current];
        lastFrameTimeRef.current = now;
      }

      // The source image is 640x640. At 30px, the beak is ~29px from the left
      // and ~14px from the top, so the beak sits directly on the real cursor hotspot.
      bird.style.transform = `translate3d(${pointer.x - 29}px, ${pointer.y - 14}px, 0) rotate(${angle}deg) scaleX(${horizontalDirection})`;
      bird.style.opacity = pointer.active ? '1' : '0';

      // Quickly settle the direction when the pointer stops without moving the bird.
      pointer.vx *= 0.82;
      pointer.vy *= 0.82;

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove('bird-cursor-active');
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="bird-cursor-layer" aria-hidden="true">
      <img
        ref={birdRef}
        className="bird-cursor"
        src={FLYING_FRAMES[0]}
        alt=""
        draggable="false"
      />
    </div>
  );
}
