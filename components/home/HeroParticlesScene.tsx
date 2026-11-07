'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { particleFragment, particleVertex } from './shaders/particles';

/* ───────────── Tweakable constants ───────────── */
export const POINT_COUNT_DESKTOP = 32000;
export const POINT_COUNT_MOBILE = 12000;
export const PETAL_COUNT = 4;
export const ROWS_ACROSS = 44; // dots across each ribbon (halftone rows)
export const ROTATION_PERIOD_S = 75; // one full Y turn
export const TILT_DEG = 8; // ± X tilt
export const BASE_TILT_RAD = -0.55; // tips the bloom toward the viewer
export const DESKTOP_X = 0.45; // world units right of centre
export const DESKTOP_SCALE = 0.86;
export const TILT_PERIOD_S = 20;
export const NOISE_AMPLITUDE = 0.11;
export const NOISE_FREQUENCY = 0.55;
export const UNFOLD = 1.0; // petal open/close strength
export const INTRO_DURATION_S = 2.5;
export const PARALLAX_MAX_RAD = 0.15;
export const PARALLAX_LERP = 0.03; // per 60fps frame
export const POINT_SIZE = 2.2;
export const MAX_DPR = 1.75;
export const COLORS = { dot: '#E6E6F0', tint: '#9B30FF' };
/* ─────────────────────────────────────────────── */

type FlowerProps = { running: boolean; reduced: boolean; mobile: boolean };

function Flower({ running, reduced, mobile }: FlowerProps) {
  const group = useRef<THREE.Group>(null);
  const { gl, invalidate } = useThree();
  const clock = useRef({ time: 0, intro: reduced ? 1 : 0, rotY: 0.6, px: 0, py: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const geometry = useMemo(() => {
    const count = mobile ? POINT_COUNT_MOBILE : POINT_COUNT_DESKTOP;
    const perPetal = Math.floor(count / PETAL_COUNT);
    const along = Math.floor(perPetal / ROWS_ACROSS);
    const total = along * ROWS_ACROSS * PETAL_COUNT;
    const uv = new Float32Array(total * 2);
    const petal = new Float32Array(total * 2);
    const scatter = new Float32Array(total * 3);
    let k = 0;
    for (let p = 0; p < PETAL_COUNT; p++) {
      const angle = (p / PETAL_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const phase = p * 1.7;
      for (let i = 0; i < along; i++) {
        for (let j = 0; j < ROWS_ACROSS; j++) {
          // neat halftone rows + a little jitter so it isn't mechanical
          uv[k * 2] = (i + (Math.random() - 0.5) * 0.35) / (along - 1);
          uv[k * 2 + 1] = ((j + (Math.random() - 0.5) * 0.35) / (ROWS_ACROSS - 1)) * 2 - 1;
          petal[k * 2] = angle;
          petal[k * 2 + 1] = phase;
          const r = 4 + Math.random() * 4;
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          scatter[k * 3] = r * Math.sin(ph) * Math.cos(th);
          scatter[k * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
          scatter[k * 3 + 2] = r * Math.cos(ph);
          k++;
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(total * 3), 3));
    g.setAttribute('aUV', new THREE.BufferAttribute(uv, 2));
    g.setAttribute('aPetal', new THREE.BufferAttribute(petal, 2));
    g.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10);
    return g;
  }, [mobile]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntro: { value: reduced ? 1 : 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), MAX_DPR) },
      uSize: { value: POINT_SIZE },
      uNoiseAmp: { value: NOISE_AMPLITUDE },
      uNoiseFreq: { value: NOISE_FREQUENCY },
      uUnfold: { value: UNFOLD },
      uOpacity: { value: 1 },
      uDot: { value: new THREE.Color(COLORS.dot) },
      uTint: { value: new THREE.Color(COLORS.tint) },
    }),
    [gl, reduced],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  // pointer parallax (fine pointers only) + scroll fade; both wake a paused canvas
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches && !reduced;
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
      invalidate();
    };
    onScroll();
    if (fine) window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [invalidate, reduced]);

  useFrame((_, rawDelta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(rawDelta, 0.05); // no jumps after tab switches
    const c = clock.current;
    if (running) {
      c.time += dt;
      c.intro = Math.min(1, c.intro + dt / INTRO_DURATION_S);
      c.rotY += (dt * Math.PI * 2) / ROTATION_PERIOD_S;
    }
    const k = 1 - Math.pow(1 - PARALLAX_LERP, dt * 60); // frame-rate independent lerp
    c.px += (mouse.current.x * PARALLAX_MAX_RAD - c.px) * k;
    c.py += (mouse.current.y * PARALLAX_MAX_RAD - c.py) * k;
    const tilt = Math.sin((c.time * Math.PI * 2) / TILT_PERIOD_S) * THREE.MathUtils.degToRad(TILT_DEG);

    const s = scroll.current;
    const baseX = mobile ? 0 : DESKTOP_X;
    const baseY = mobile ? 0.55 : 0.05;
    const baseScale = mobile ? 0.68 : DESKTOP_SCALE;
    g.rotation.set(BASE_TILT_RAD + tilt + c.py, c.rotY + c.px, 0);
    g.position.set(baseX, baseY + s * 1.4, 0);
    g.scale.setScalar(baseScale * (1 - s * 0.15));

    uniforms.uTime.value = c.time;
    uniforms.uIntro.value = c.intro;
    uniforms.uOpacity.value = 1 - s;
  });

  return (
    <group ref={group}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          vertexShader={particleVertex}
          fragmentShader={particleFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/** One canvas, one draw call. Renders continuously only while `running`. */
export default function HeroParticlesScene({ running, reduced, onReady }: { running: boolean; reduced: boolean; onReady: () => void }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <Canvas
      dpr={[1, MAX_DPR]}
      frameloop={running ? 'always' : 'demand'}
      camera={{ position: [0, 0, 6.5], fov: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        onReady();
      }}
      aria-hidden
    >
      <Flower running={running} reduced={reduced} mobile={mobile} />
    </Canvas>
  );
}
