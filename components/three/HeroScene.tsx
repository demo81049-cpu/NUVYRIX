"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Ashima 3D simplex noise (MIT) — drives the orb's surface displacement.
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uHover;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${noise}
void main(){
  float n = snoise(normal * 1.1 + uTime * 0.3);
  float n2 = snoise(normal * 2.4 - uTime * 0.2) * 0.25;
  float d = (n + n2) * (0.09 + uHover * 0.06);
  vNoise = n;
  vec3 pos = position + normal * d;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const orbFragment = /* glsl */ `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
void main(){
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
  vec3 sky = vec3(0.22, 0.74, 0.97);
  vec3 blue = vec3(0.15, 0.39, 0.92);
  vec3 violet = vec3(0.49, 0.23, 0.93);
  float t = clamp(vNoise * 0.5 + 0.5 + sin(uTime * 0.4) * 0.15, 0.0, 1.0);
  vec3 base = mix(mix(sky, blue, t), violet, smoothstep(0.45, 1.0, t));
  // Dark core, glowing rim — keeps the headline readable on top.
  vec3 col = base * (0.06 + fres * 1.25);
  col += vec3(0.85, 0.92, 1.0) * pow(fres, 6.0) * 0.45;
  gl_FragColor = vec4(col, 0.12 + fres * 0.7);
}
`;

export function HeroScene({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL — the CSS background still looks fine.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const root = new THREE.Group();
    scene.add(root);

    // Orb
    const orbMat = new THREE.ShaderMaterial({
      vertexShader: orbVertex,
      fragmentShader: orbFragment,
      uniforms: { uTime: { value: 0 }, uHover: { value: 0 } },
      transparent: true,
      depthWrite: false,
    });
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, small ? 48 : 96), orbMat);
    root.add(orb);

    // Wireframe shell
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.05, 2),
      new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: 0.09 }),
    );
    root.add(shell);

    // Orbit rings
    const ringMat = (color: number, opacity: number) =>
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.008, 8, 200), ringMat(0x38bdf8, 0.55));
    ring1.rotation.set(1.2, 0.2, 0);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.05, 0.006, 8, 200), ringMat(0xa78bfa, 0.4));
    ring2.rotation.set(1.75, -0.5, 0.3);
    root.add(ring1, ring2);

    // Satellites riding the rings
    const satGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const sat1 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0x7dd3fc }));
    const sat2 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0xc4b5fd }));
    ring1.add(sat1);
    ring2.add(sat2);

    // Particle field
    const count = small ? 700 : 1600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [new THREE.Color(0x38bdf8), new THREE.Color(0x2563eb), new THREE.Color(0xa78bfa)];
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi) - 2;
      const c = palette[i % palette.length];
      colors.set([c.r, c.g, c.b], i * 3);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const sprite = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.3, "rgba(255,255,255,0.5)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.09,
        map: sprite,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(particles);

    // Sizing
    let ready = false;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Keep the orb comfortably sized on narrow screens.
      camera.position.z = w < 640 ? 9.5 : 7;
      camera.updateProjectionMatrix();
      // setSize clears the canvas — repaint so a paused scene never goes blank.
      if (ready) renderFrame();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // Pointer
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Only animate while visible
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced) start();
    });
    io.observe(el);

    const t0 = performance.now();
    let raf = 0;
    let running = false;

    const renderFrame = () => {
      const t = (performance.now() - t0) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      orbMat.uniforms.uTime.value = t;
      orbMat.uniforms.uHover.value +=
        (Math.min(1, Math.hypot(pointer.x, pointer.y)) - orbMat.uniforms.uHover.value) * 0.05;

      root.rotation.y = t * 0.12 + pointer.x * 0.5;
      root.rotation.x = pointer.y * 0.3;
      shell.rotation.y = -t * 0.08;
      shell.rotation.z = t * 0.05;
      ring1.rotation.z = t * 0.25;
      ring2.rotation.z = -t * 0.18;
      sat1.position.set(Math.cos(t * 0.9) * 2.6, Math.sin(t * 0.9) * 2.6, 0);
      sat2.position.set(Math.cos(-t * 0.6) * 3.05, Math.sin(-t * 0.6) * 3.05, 0);
      particles.rotation.y = t * 0.02 + pointer.x * 0.15;
      particles.rotation.x = pointer.y * 0.08;

      // Drift up and fade as the hero scrolls away.
      const p = Math.min(1, window.scrollY / Math.max(1, el.clientHeight));
      root.position.y = p * 1.8;
      root.scale.setScalar(1 - p * 0.25);

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!visible || document.hidden) {
        running = false;
        return;
      }
      renderFrame();
      raf = requestAnimationFrame(loop);
    };
    function start() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (!document.hidden && visible && !reduced) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Paint immediately so the scene shows even before the first rAF tick.
    ready = true;
    renderFrame();
    if (!reduced) start();

    // Fade the canvas in once the first frame is ready.
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 1.2s ease";
    requestAnimationFrame(() => (renderer.domElement.style.opacity = "1"));

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
      sprite.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} aria-hidden className={className} />;
}
