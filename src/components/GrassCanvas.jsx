import React, { useEffect, useRef } from 'react';

export default function GrassCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let grassW = 0;
    let grassH = 140;
    let grassBlades = [];
    let grassFlowers = [];
    let grassWind = 0;
    let grassTargetWind = 0;
    let grassRAF = 0;
    let grassLast = 0;
    let grassWindTimer = 0;
    let grassGustTimer = 0;
    let grassGustActive = false;

    const grassLayers = [
      { color: "#6dab1b", spacing: 15, height: 20, width: 10, angle: 10, scale: 0.2 },
      { color: "#24750c", spacing: 90, height: 40, width: 3, angle: 20, scale: 0.2, flower: "daisy" },
      { color: "#24750c99", spacing: 300, height: 34, width: 4, angle: 20, scale: 0.2, flower: "dandelion" },
      { color: "#24750ccc", spacing: 3, height: 40, width: 7, angle: 6, scale: 0.1 }
    ];

    function scheduleGrassGust() {
      grassWindTimer = 2200 + Math.random() * 3200;
    }

    function startGrassGust() {
      grassGustActive = true;
      grassTargetWind = (Math.random() < 0.5 ? -1 : 1) * (0.45 + Math.random() * 1.35);
      grassGustTimer = 900 + Math.random() * 1100;
    }

    function updateGrassWind(dt) {
      if (grassGustActive) {
        grassGustTimer -= dt * 1000;
        if (grassGustTimer <= 0) {
          grassGustActive = false;
          grassTargetWind = 0;
          scheduleGrassGust();
        }
      } else {
        grassWindTimer -= dt * 1000;
        if (grassWindTimer <= 0) startGrassGust();
      }
    }

    function drawBlade(x, h, rot, width, alpha) {
      const bend = grassWind * 0.55 + rot;
      ctx.save();
      ctx.translate(x, grassH);
      ctx.rotate(bend);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = width > 5 ? "#6dab1b" : "#24750c";
      ctx.beginPath();
      ctx.moveTo(-width / 2, 0);
      ctx.quadraticCurveTo(-width * 0.9, -h * 0.48, width * 0.05, -h);
      ctx.quadraticCurveTo(width * 0.75, -h * 0.5, width / 2, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawGrass(now) {
      grassRAF = 0;
      if (!grassLast) grassLast = now;
      const dt = Math.min((now - grassLast) / 1000, 0.05);
      grassLast = now;

      updateGrassWind(dt);
      grassWind += (grassTargetWind - grassWind) * Math.min(1, dt * 4.5);
      if (!grassGustActive) grassTargetWind *= Math.max(0, 1 - dt * 1.8);

      const moving = Math.abs(grassWind) > 0.01 || Math.abs(grassTargetWind) > 0.01 || grassGustActive;

      ctx.clearRect(0, 0, grassW, grassH);

      grassBlades.forEach(b => {
        const l = grassLayers[b.layer];
        drawBlade(b.x, b.h, b.rot, l.width, b.layer === 3 ? 0.9 : 1);
      });

      grassFlowers.forEach(f => {
        const bend = grassWind * 0.65 + f.rot;
        ctx.save();
        ctx.translate(f.x, grassH);
        ctx.rotate(bend);
        ctx.strokeStyle = "#24750c";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(0, -f.h * 0.55, 0, -f.h);
        ctx.stroke();

        const y = -f.h;
        ctx.translate(0, y);
        if (f.type === "daisy") {
          ctx.fillStyle = "#fafbf0";
          for (let i = 0; i < 8; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 4);
            ctx.beginPath();
            ctx.ellipse(0, -5, 3, 7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          ctx.fillStyle = "#f4c84a";
          ctx.beginPath();
          ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = "#fafbf0";
          ctx.lineWidth = 1;
          for (let i = 0; i < 18; i++) {
            const a = (i * Math.PI) / 9;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(a) * 9, Math.sin(a) * 9);
            ctx.stroke();
          }
        }
        ctx.restore();
      });

      if (moving) {
        grassRAF = requestAnimationFrame(drawGrass);
      }
    }

    function resizeGrass() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      grassW = Math.max(1, Math.floor(rect.width));
      grassH = Math.max(80, Math.floor(rect.height));
      canvas.width = Math.floor(grassW * dpr);
      canvas.height = Math.floor(grassH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      grassBlades = [];
      grassFlowers = [];

      grassLayers.forEach((layer, li) => {
        for (let x = -10; x < grassW + layer.spacing; x += layer.spacing) {
          const h = layer.height * (0.8 + Math.random() * layer.scale * 2);
          const rot = (Math.random() - 0.5) * (layer.angle * Math.PI / 180);
          if (layer.flower) {
            grassFlowers.push({ x: x + Math.random() * 10, h, rot, type: layer.flower, layer: li });
          } else {
            grassBlades.push({ x: x + Math.random() * 8, h, rot, layer: li });
          }
        }
      });

      if (!grassRAF) grassRAF = requestAnimationFrame(drawGrass);
    }

    scheduleGrassGust();
    window.addEventListener('resize', resizeGrass, { passive: true });
    resizeGrass();

    return () => {
      window.removeEventListener('resize', resizeGrass);
      if (grassRAF) cancelAnimationFrame(grassRAF);
    };
  }, []);

  return (
    <div className="grass" id="grass">
      <canvas ref={canvasRef} id="fieldCanvas" aria-hidden="true" />
    </div>
  );
}