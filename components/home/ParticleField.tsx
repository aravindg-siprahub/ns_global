'use client';
import { useEffect, useRef } from 'react';

/**
 * Flowing particle ribbon (canvas 2D): a twisting band of dots sweeping
 * through 3D space, softly lit by depth — in the spirit of the particle
 * sculptures on premium consulting sites. Leans toward the pointer,
 * pauses off-screen or when `paused`, and draws one still frame for
 * reduced-motion users.
 */
export function ParticleField({ className, paused = false }: { className?: string; paused?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 768;
    const U = small ? 160 : 300; // samples along the ribbon
    const V = small ? 18 : 30; // samples across it
    let w = 0, h = 0, raf = 0, t = 0, visible = true;
    let mx = 0, my = 0, tx = 0, ty = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      mx += (tx - mx) * 0.03;
      my += (ty - my) * 0.03;
      const S = Math.min(w, h * 1.6);
      const cx = w * (small ? 0.5 : 0.56) + mx * 25;
      const cy = h * 0.5 + my * 15;
      const fov = 900;
      const yaw = t * 0.12 + mx * 0.25;
      const cyw = Math.cos(yaw), syw = Math.sin(yaw);
      const width = S * 0.13;

      for (let i = 0; i < U; i++) {
        const u = i / (U - 1);
        // centre line: a wide S-swoosh drifting over time
        const px = (u - 0.5) * S * 1.25;
        const py = Math.sin(u * Math.PI * 1.7 + t * 0.35) * S * 0.16;
        const pz = Math.cos(u * Math.PI * 1.3 + t * 0.25) * S * 0.22;
        const twist = u * Math.PI * 2.2 + t * 0.3;
        const ty2 = Math.cos(twist), tz2 = Math.sin(twist);
        const taper = Math.sin(u * Math.PI); // thin at both ends
        for (let j = 0; j < V; j++) {
          const v = (j / (V - 1) - 0.5) * 2;
          const ripple = Math.sin(v * 3 + u * 18 + t) * 6;
          let x = px;
          let y = py + v * width * taper * ty2 + ripple;
          let z = pz + v * width * taper * tz2;
          // rotate around Y
          const rx = x * cyw - z * syw;
          const rz = x * syw + z * cyw;
          x = rx; z = rz;
          const k = fov / (fov + z + S * 0.4);
          const sx = cx + x * k;
          const sy = cy + y * k;
          if (sx < -4 || sx > w + 4 || sy < -4 || sy > h + 4) continue;
          const light = Math.max(0, Math.min(1, (k - 0.55) * 1.6));
          const a = (0.12 + light * 0.62) * (0.45 + taper * 0.55);
          ctx.fillStyle = j % 7 === 0 ? `rgba(190,150,255,${a})` : `rgba(235,235,245,${a})`;
          const size = 0.9 + k * 1.5;
          ctx.fillRect(sx, sy, size, size);
        }
      }
    };

    const loop = () => {
      if (!pausedRef.current) {
        t += 0.008;
        draw();
      }
      if (visible) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(); // first frame immediately, never a blank canvas
    if (!reduce) raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
