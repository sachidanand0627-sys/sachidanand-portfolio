import React, { useEffect, useRef } from "react";
import CloudLayer from "./CloudLayer";
import GrassCanvas from "./GrassCanvas";

export default function HeroGame({ heroRef }) {
  const gameRef = useRef(null);
  const playerRef = useRef(null);
  const playerArtRef = useRef(null);
  const playerFallbackRef = useRef(null);
  const gunRef = useRef(null);

  useEffect(() => {
    const game = gameRef.current;
    const player = playerRef.current;
    const playerArt = playerArtRef.current;
    const playerFallback = playerFallbackRef.current;
    const gun = gunRef.current;
    const hero = heroRef.current;

    if (!game || !player || !playerArt || !gun || !hero) return;

    const FIRE_RATE = 90;
    const BULLET_SPEED = 900;
    const BIRD_MAX = 10;
    const BIRD_SPAWN_MS = 360;
    const PLAYER_SPEED = 310;

    let active = true;
    let paused = false;
    let score = 0;
    let last = 0;
    let spawnClock = 0;
    let fireClock = 0;
    let raf = 0;
    let shooting = false;
    let playerX = 0;
    let aimX = 0;
    let aimY = 0;
    let facing = 1;

    const keys = { left: false, right: false };
    const birds = [];
    const bullets = [];
    const activePointers = {};

    let lastClientX = 0;
    let lastClientY = 0;

    function resizePlayer() {
      playerX = Math.max(
        8,
        Math.min(
          playerX || game.clientWidth * 0.12,
          game.clientWidth - 88
        )
      );

      player.style.left = `${playerX}px`;
      playerArt.style.transform = `scaleX(${facing})`;
    }

    function setAim(clientX, clientY) {
      const r = game.getBoundingClientRect();

      aimX = clientX - r.left;
      aimY = clientY - r.top;

      const pivotX = playerX + 42;
      const pivotY = game.clientHeight - 27 - 42;

      const angle =
        (Math.atan2(aimY - pivotY, aimX - pivotX) * 180) / Math.PI;

      gun.style.transform = `rotate(${angle}deg)`;
    }

    function fire() {
      if (!active || paused) return;

      const pivotX = playerX + 42;
      const pivotY = game.clientHeight - 27 - 42;

      const dx = aimX - pivotX;
      const dy = aimY - pivotY;
      const len = Math.hypot(dx, dy) || 1;

      const vx = dx / len;
      const vy = dy / len;

      const el = document.createElement("div");
      el.className = "bullet";

      el.style.left = `${pivotX + vx * 45 - 3}px`;
      el.style.top = `${pivotY + vy * 45 - 3}px`;

      game.appendChild(el);

      bullets.push({
        el,
        x: pivotX + vx * 45,
        y: pivotY + vy * 45,
        vx,
        vy,
        life: 0,
      });
    }

    function spawnBird() {
      if (!active || paused || birds.length >= BIRD_MAX) return;

      const w = game.clientWidth;
      const h = game.clientHeight;

      const fromRight = Math.random() < 0.5;
      const x = fromRight ? w + 25 : -135;

      const birdMarginTop = 30;
      const birdMarginBottom = 100;

      const y =
        birdMarginTop +
        Math.random() *
          Math.max(
            40,
            h - birdMarginTop - birdMarginBottom
          );

      const direction = fromRight ? -1 : 1;

      const el = document.createElement("div");
      el.className = "bird flap";

      const body = document.createElement("img");
      body.className = "bird-body";
      body.alt = "";
      body.draggable = false;
      body.src = "/assets/bird-body.svg";

      const wing = document.createElement("img");
      wing.className = "bird-wing";
      wing.alt = "";
      wing.draggable = false;
      wing.src = "/assets/bird-wing-open.svg";

      el.appendChild(wing);
      el.appendChild(body);

      game.appendChild(el);

      const scale = 0.78 + Math.random() * 0.42;
      const speed = 105 + Math.random() * 100;

      birds.push({
        el,
        body,
        wing,
        x,
        y,
        vx: direction * speed,
        vy: (Math.random() - 0.5) * 30,
        phase: Math.random() * Math.PI * 2,
        scale,
        wingClock: Math.random() * 220,
        wingFrame: 0,
      });
    }

    function hitBird(bird) {
      const idx = birds.indexOf(bird);

      if (idx < 0) return;

      bird.el.remove();
      birds.splice(idx, 1);
      score++;
    }

    function update(dt) {
      if (!active || paused) return;

      if (keys.left) {
        playerX -= PLAYER_SPEED * dt;
      }

      if (keys.right) {
        playerX += PLAYER_SPEED * dt;
      }

      playerX = Math.max(
        8,
        Math.min(playerX, game.clientWidth - 88)
      );

      player.style.left = `${playerX}px`;
      playerArt.style.transform = `scaleX(${facing})`;

      spawnClock += dt * 1000;

      if (spawnClock >= BIRD_SPAWN_MS) {
        spawnClock = 0;
        spawnBird();
      }

      if (shooting) {
        fireClock += dt * 1000;

        while (fireClock >= FIRE_RATE) {
          fireClock -= FIRE_RATE;
          fire();
        }
      } else {
        fireClock = FIRE_RATE;
      }

      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];

        b.x += b.vx * BULLET_SPEED * dt;
        b.y += b.vy * BULLET_SPEED * dt;
        b.life += dt * 1000;

        b.el.style.left = `${b.x - 3}px`;
        b.el.style.top = `${b.y - 3}px`;

        let remove =
          b.life > 1400 ||
          b.x < -30 ||
          b.x > game.clientWidth + 30 ||
          b.y < -30 ||
          b.y > game.clientHeight + 30;

        for (
          let j = birds.length - 1;
          j >= 0 && !remove;
          j--
        ) {
          const bird = birds[j];

          const bx = bird.x + 27;
          const by = bird.y + 18;

          if (Math.hypot(b.x - bx, b.y - by) < 29) {
            hitBird(bird);
            remove = true;
          }
        }

        if (remove) {
          b.el.remove();
          bullets.splice(i, 1);
        }
      }

      for (let i = birds.length - 1; i >= 0; i--) {
        const bird = birds[i];

        bird.x += bird.vx * dt;
        bird.y += bird.vy * dt;

        const birdMarginTop = 70;
        const birdMarginBottom = 100;

        bird.y = Math.max(
          birdMarginTop,
          Math.min(
            game.clientHeight - birdMarginBottom,
            bird.y
          )
        );

        bird.phase += dt * 3;

        bird.wingClock += dt * 1000;

        if (bird.wingClock >= 110) {
          bird.wingClock -= 110;

          bird.wingFrame =
            bird.wingFrame === 0 ? 1 : 0;

          bird.wing.src =
            bird.wingFrame === 0
              ? "/assets/bird-wing-open.svg"
              : "/assets/bird-wing-folded.svg";
        }

        const wave = Math.sin(bird.phase) * 18;
        const facingScale = bird.vx > 0 ? -1 : 1;

        bird.el.style.transform =
          `translate(${bird.x}px,${bird.y + wave * 0.08}px) ` +
          `scaleX(${facingScale}) scale(${bird.scale})`;

        if (
          bird.x < -150 ||
          bird.x > game.clientWidth + 150
        ) {
          bird.el.remove();
          birds.splice(i, 1);
        }
      }
    }

    function loop(t) {
      if (!last) last = t;

      const dt = Math.min(
        0.033,
        (t - last) / 1000
      );

      last = t;

      update(dt);

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    const onContextMenu = (e) => e.preventDefault();

    hero.addEventListener(
      "contextmenu",
      onContextMenu
    );

    const onPointerDown = (e) => {
      if (!active || paused) return;

      try {
        hero.setPointerCapture(e.pointerId);
      } catch (_) {}

      if (e.pointerType === "mouse") {
        if (e.button === 0) {
          lastClientX = e.clientX;
          lastClientY = e.clientY;

          activePointers[e.pointerId] = {
            type: "shoot",
          };

          setAim(e.clientX, e.clientY);

          shooting = true;
          fire();
        }
      } else {
        const gameRect =
          game.getBoundingClientRect();

        const isLowerArea =
          e.clientY > gameRect.bottom - 110;

        if (isLowerArea) {
          activePointers[e.pointerId] = {
            type: "move",
            lastX: e.clientX,
          };
        } else {
          lastClientX = e.clientX;
          lastClientY = e.clientY;

          activePointers[e.pointerId] = {
            type: "shoot",
          };

          setAim(e.clientX, e.clientY);

          shooting = true;
          fire();
        }
      }
    };

    const onPointerMove = (e) => {
      if (!active || paused) return;

      e.preventDefault();

      if (e.pointerType === "mouse") {
        lastClientX = e.clientX;
        lastClientY = e.clientY;

        setAim(e.clientX, e.clientY);
      } else if (activePointers[e.pointerId]) {
        const ptr =
          activePointers[e.pointerId];

        if (ptr.type === "shoot") {
          lastClientX = e.clientX;
          lastClientY = e.clientY;

          setAim(e.clientX, e.clientY);
        } else if (ptr.type === "move") {
          const dx = e.clientX - ptr.lastX;

          playerX += dx;

          if (dx > 0) facing = 1;
          else if (dx < 0) facing = -1;

          ptr.lastX = e.clientX;

          playerX = Math.max(
            8,
            Math.min(
              playerX,
              game.clientWidth - 88
            )
          );

          player.style.left = `${playerX}px`;

          playerArt.style.transform =
            `scaleX(${facing})`;

          setAim(
            lastClientX,
            lastClientY
          );
        }
      }
    };

    function resolvePointerUp(e) {
      if (activePointers[e.pointerId]) {
        delete activePointers[e.pointerId];
      }

      let stillShooting = false;

      for (const id in activePointers) {
        if (
          activePointers[id].type === "shoot"
        ) {
          stillShooting = true;
        }
      }

      shooting = stillShooting;
    }

    const onBlur = () => {
      shooting = false;

      keys.left = false;
      keys.right = false;

      for (const key in activePointers) {
        delete activePointers[key];
      }
    };

    const onKeyDown = (e) => {
      if (!active || paused) return;

      if (e.key === "ArrowLeft") {
        keys.left = true;
        facing = -1;

        playerArt.style.transform =
          `scaleX(${facing})`;

        setAim(
          aimX + game.getBoundingClientRect().left,
          aimY + game.getBoundingClientRect().top
        );

        e.preventDefault();
      }

      if (e.key === "ArrowRight") {
        keys.right = true;
        facing = 1;

        playerArt.style.transform =
          `scaleX(${facing})`;

        setAim(
          aimX + game.getBoundingClientRect().left,
          aimY + game.getBoundingClientRect().top
        );

        e.preventDefault();
      }
    };

    const onKeyUp = (e) => {
      if (e.key === "ArrowLeft") {
        keys.left = false;
      }

      if (e.key === "ArrowRight") {
        keys.right = false;
      }
    };

    hero.addEventListener(
      "pointerdown",
      onPointerDown
    );

    hero.addEventListener(
      "pointermove",
      onPointerMove
    );

    window.addEventListener(
      "pointerup",
      resolvePointerUp
    );

    window.addEventListener(
      "pointercancel",
      resolvePointerUp
    );

    window.addEventListener(
      "blur",
      onBlur
    );

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    window.addEventListener(
      "keyup",
      onKeyUp
    );

    window.addEventListener(
      "resize",
      resizePlayer
    );

    const testImage = new Image();

    testImage.onload = () => {};

    testImage.onerror = () => {
      if (playerArt) {
        playerArt.style.display = "none";
      }

      if (playerFallback) {
        playerFallback.style.display = "block";
      }
    };

    testImage.src = "/assets/character.png";

    resizePlayer();

    return () => {
      active = false;

      cancelAnimationFrame(raf);

      hero.removeEventListener(
        "contextmenu",
        onContextMenu
      );

      hero.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      hero.removeEventListener(
        "pointermove",
        onPointerMove
      );

      window.removeEventListener(
        "pointerup",
        resolvePointerUp
      );

      window.removeEventListener(
        "pointercancel",
        resolvePointerUp
      );

      window.removeEventListener(
        "blur",
        onBlur
      );

      window.removeEventListener(
        "keydown",
        onKeyDown
      );

      window.removeEventListener(
        "keyup",
        onKeyUp
      );

      window.removeEventListener(
        "resize",
        resizePlayer
      );

      bullets.forEach((b) => b.el.remove());
      birds.forEach((b) => b.el.remove());
    };
  }, [heroRef]);

  return (
    <div
      ref={gameRef}
      id="game"
      className="relative h-[40%] min-h-[235px] max-[700px]:min-h-[220px] w-screen ml-[calc(50%-50vw)] border-t-0 overflow-visible select-none touch-none"
      aria-label="Bird shooting portfolio game"
    >
      <div className="absolute inset-0 pointer-events-none translate-y-20">
        <CloudLayer />
      </div>

      <div className="absolute top-[14px] left-1/2 -translate-x-1/2 z-30 text-[11px] max-[700px]:text-[10px] tracking-[0.04em] text-[rgba(245,247,250,0.52)] whitespace-nowrap pointer-events-none">
        Click to shoot · Drag the bottom to move
      </div>

      <div
        id="message"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-center pointer-events-none opacity-0 transition-opacity duration-250 ease"
      >
        <strong
          id="messageTitle"
          className="block text-[17px]"
        >
          Nice shot.
        </strong>

        <span
          id="messageText"
          className="block mt-[6px] text-[12px] text-[rgba(10,47,61,0.68)]"
        >
          You cleared the round.
        </span>
      </div>

      <div
        ref={playerRef}
        id="player"
        className="player"
      >
        <div
          ref={playerArtRef}
          id="playerArt"
          className="player-art"
        />

        <div
          ref={playerFallbackRef}
          id="playerFallback"
          className="player-fallback"
        />

        <div
          ref={gunRef}
          id="gun"
          className="gun"
        />
      </div>

      {/* Grass stays exactly as its own component at the bottom */}
      <GrassCanvas />
    </div>
  );
}