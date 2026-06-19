"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Industry = {
  id: string;
  label: string;
  color: string;
  product: string;
  materials: string;
};

const INDUSTRIES: Industry[] = [
  {
    id: "ceramic",
    label: "کاشی و سرامیک",
    color: "#C8A96E",
    product: "کاشی سرامیک",
    materials: "سیلیکات زیرکونیوم · اکسید کبالت",
  },
  {
    id: "glass",
    label: "صنعت شیشه",
    color: "#378ADD",
    product: "شیشه بلور",
    materials: "شن کوارتز · سودا اش · اکسید قلع",
  },
  {
    id: "sanitary",
    label: "چینی بهداشتی",
    color: "#5DCAA5",
    product: "چینی بهداشتی",
    materials: "هیدروکسید کبالت · کائولن OKA",
  },
  {
    id: "battery",
    label: "باطری‌سازی",
    color: "#EF9F27",
    product: "سلول باتری",
    materials: "شمش قلع · هیدروکسید کبالت",
  },
  {
    id: "glaze",
    label: "لعاب‌سازی",
    color: "#AFA9EC",
    product: "لعاب صنعتی",
    materials: "اکسید تیتانیوم · فریت · زیرکونیوم",
  },
  {
    id: "tableware",
    label: "چینی ظروف",
    color: "#F0996B",
    product: "ظرف چینی",
    materials: "خاک چینی باریوم · تبولار آلومینا",
  },
];

const BG = "#06080D";
const BASE_GOLD = "#C8A96E";
const HEADLINE = "تأمین مواد اولیه برای صنایع پیشرو";
const DESKTOP_PARTICLES = 10000;
const MOBILE_PARTICLES = 3000;
const MOBILE_BREAKPOINT = 768;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aSize;
  attribute float aPhase;
  attribute float aDepth;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    pos.x += sin(uTime * 0.28 + aPhase) * 0.18;
    pos.y += cos(uTime * 0.22 + aPhase * 1.4) * 0.14;
    pos.z += sin(uTime * 0.18 + aPhase * 0.8) * 0.16;

    float parallax = aDepth * 0.12;
    pos.x += uMouse.x * parallax;
    pos.y += uMouse.y * parallax;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (280.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 0.9 + aPhase));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBaseColor;
  uniform vec3 uActiveColor;
  uniform float uColorMix;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    vec3 color = mix(uBaseColor, uActiveColor, uColorMix);
    gl_FragColor = vec4(color, glow * vAlpha * 0.9);
  }
`;

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

function getParticleCount(): number {
  if (typeof window === "undefined") return DESKTOP_PARTICLES;
  return window.innerWidth < MOBILE_BREAKPOINT
    ? MOBILE_PARTICLES
    : DESKTOP_PARTICLES;
}

export default function HeroParticleWebGL() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const frameRef = useRef(0);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurrentRef = useRef({ x: 0, y: 0 });
  const colorMixTargetRef = useRef(0);
  const colorMixCurrentRef = useRef(0);
  const activeColorRef = useRef(hexToVec3(BASE_GOLD));
  const activeColorTargetRef = useRef(hexToVec3(BASE_GOLD));

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hoveredIndustry =
    INDUSTRIES.find((i) => i.id === hoveredId) ?? null;

  const handleIndustryEnter = useCallback((industry: Industry) => {
    setHoveredId(industry.id);
    activeColorTargetRef.current = hexToVec3(industry.color);
    colorMixTargetRef.current = 0.42;
  }, []);

  const handleIndustryLeave = useCallback(() => {
    setHoveredId(null);
    activeColorTargetRef.current = hexToVec3(BASE_GOLD);
    colorMixTargetRef.current = 0;
  }, []);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    const count = getParticleCount();
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BG, 0.045);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      host.clientWidth / host.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(BG, 1);
    host.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const depths = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i3 + 2] = radius * Math.cos(phi) * 0.6 - 0.5;

      sizes[i] = 1.2 + Math.random() * 2.8;
      phases[i] = Math.random() * Math.PI * 2;
      depths[i] = 0.3 + Math.random() * 0.7;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aDepth", new THREE.BufferAttribute(depths, 1));
    geometryRef.current = geometry;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uBaseColor: { value: hexToVec3("#8a7348") },
        uActiveColor: { value: hexToVec3(BASE_GOLD) },
        uColorMix: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    const onMouseMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      mouseTargetRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    const onResize = () => {
      if (!host || !cameraRef.current || !rendererRef.current) return;
      const w = host.clientWidth;
      const h = host.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    host.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const mat = materialRef.current;
      const pts = pointsRef.current;

      if (mat) {
        mat.uniforms.uTime.value = t;

        mouseCurrentRef.current.x +=
          (mouseTargetRef.current.x - mouseCurrentRef.current.x) * 0.06;
        mouseCurrentRef.current.y +=
          (mouseTargetRef.current.y - mouseCurrentRef.current.y) * 0.06;
        mat.uniforms.uMouse.value.set(
          mouseCurrentRef.current.x,
          mouseCurrentRef.current.y
        );

        colorMixCurrentRef.current +=
          (colorMixTargetRef.current - colorMixCurrentRef.current) * 0.05;
        mat.uniforms.uColorMix.value = colorMixCurrentRef.current;

        activeColorRef.current.lerp(activeColorTargetRef.current, 0.05);
        mat.uniforms.uActiveColor.value.copy(activeColorRef.current);
      }

      if (pts && !reducedMotion) {
        pts.rotation.y = t * 0.04;
        pts.rotation.x = Math.sin(t * 0.12) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      host.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }

      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      pointsRef.current = null;
      materialRef.current = null;
      geometryRef.current = null;
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: BG }}
      dir="rtl"
      aria-label="بخش اصلی"
    >
      <div ref={canvasHostRef} className="absolute inset-0" aria-hidden />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, transparent 0%, rgba(6,8,13,0.55) 70%, rgba(6,8,13,0.92) 100%)",
        }}
        aria-hidden
      />

      <h2
        className="pointer-events-none absolute left-1/2 z-10 w-full max-w-3xl -translate-x-1/2 px-6 text-center text-white"
        style={{
          top: "35%",
          fontSize: "36px",
          fontWeight: 900,
          lineHeight: 1.2,
        }}
      >
        {HEADLINE}
      </h2>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 px-6 text-center transition-all duration-500"
        style={{
          opacity: hoveredIndustry ? 1 : 0,
          transform: hoveredIndustry
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -46%) scale(0.96)",
        }}
        aria-live="polite"
        aria-hidden={!hoveredIndustry}
      >
        {hoveredIndustry && (
          <>
            <p
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: hoveredIndustry.color }}
            >
              {hoveredIndustry.product}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
              {hoveredIndustry.materials}
            </p>
          </>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-8 sm:pb-10">
        <div className="flex max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3">
          {INDUSTRIES.map((industry) => {
            const isActive = hoveredId === industry.id;
            return (
              <button
                key={industry.id}
                type="button"
                className="rounded-full border bg-[#0D1018]/80 px-3.5 py-2 text-xs font-semibold backdrop-blur-sm transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm"
                style={{
                  borderColor: isActive
                    ? industry.color
                    : "rgba(255,255,255,0.12)",
                  color: isActive ? industry.color : "rgba(255,255,255,0.65)",
                  boxShadow: isActive
                    ? `0 0 24px ${industry.color}33`
                    : "none",
                }}
                onMouseEnter={() => handleIndustryEnter(industry)}
                onMouseLeave={handleIndustryLeave}
                onFocus={() => handleIndustryEnter(industry)}
                onBlur={handleIndustryLeave}
                aria-pressed={isActive}
              >
                {industry.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
