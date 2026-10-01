import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Color, Vec2 } from 'ogl';

interface RadarProps {
  speed?: number;
  scale?: number;
  ringCount?: number;
  spokeCount?: number;
  ringThickness?: number;
  spokeThickness?: number;
  sweepSpeed?: number;
  sweepWidth?: number;
  sweepLobes?: number;
  color?: string;
  backgroundColor?: string;
  falloff?: number;
  brightness?: number;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
  className?: string;
  style?: React.CSSProperties;
}

const vertexShader = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uRingCount;
  uniform float uSpokeCount;
  uniform float uRingThickness;
  uniform float uSpokeThickness;
  uniform float uSweepSpeed;
  uniform float uSweepWidth;
  uniform float uSweepLobes;
  uniform vec3 uColor;
  uniform vec3 uBackgroundColor;
  uniform float uFalloff;
  uniform float uBrightness;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;

  varying vec2 vUv;

  #define PI 3.14159265359

  void main() {
    vec2 st = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
    
    st -= uMouse * uMouseInfluence;
    
    float dist = length(st) / uScale;
    float angle = atan(st.y, st.x);
    
    // Rings
    float ringPattern = abs(sin(dist * uRingCount * PI));
    float rings = smoothstep(1.0 - uRingThickness, 1.0, ringPattern);
    
    // Spokes
    float spokePattern = abs(sin(angle * uSpokeCount * 0.5));
    float spokes = smoothstep(1.0 - uSpokeThickness, 1.0, spokePattern);
    
    // Sweep radar beam
    float sweepAngle = mod(uTime * uSweepSpeed * 2.0 * PI, 2.0 * PI);
    float diff = mod(angle - sweepAngle + PI, 2.0 * PI) - PI;
    
    float sweep = 0.0;
    if (diff < 0.0) {
      sweep = exp(diff * uSweepWidth);
    }
    
    float grid = max(rings, spokes);
    float alpha = grid * 0.35 + sweep * 0.65;
    
    float attenuation = exp(-dist * uFalloff);
    alpha *= attenuation * uBrightness;
    
    vec3 finalColor = mix(uBackgroundColor, uColor, alpha);
    
    gl_FragColor = vec4(finalColor, alpha * uBrightness);
  }
`;

export default function Radar({
  speed = 0.35,
  scale = 0.45,
  ringCount = 8,
  spokeCount = 8,
  ringThickness = 0.035,
  spokeThickness = 0.008,
  sweepSpeed = 0.4,
  sweepWidth = 2.5,
  sweepLobes = 1,
  color = '#4F8CFF',
  backgroundColor = '#050505',
  falloff = 2.5,
  brightness = 0.35,
  enableMouseInteraction = true,
  mouseInfluence = 0.04,
  className = '',
  style = {},
}: RadarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect touch devices to disable mouse interaction for performance
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const allowMouse = enableMouseInteraction && !isTouchDevice;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';

    const geometry = new Triangle(gl);

    const colorObj = new Color(color);
    const bgObj = new Color(backgroundColor);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(container.clientWidth, container.clientHeight) },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uRingCount: { value: ringCount },
        uSpokeCount: { value: spokeCount },
        uRingThickness: { value: ringThickness },
        uSpokeThickness: { value: spokeThickness },
        uSweepSpeed: { value: sweepSpeed },
        uSweepWidth: { value: sweepWidth },
        uSweepLobes: { value: sweepLobes },
        uColor: { value: new Color(colorObj.r, colorObj.g, colorObj.b) },
        uBackgroundColor: { value: new Color(bgObj.r, bgObj.g, bgObj.b) },
        uFalloff: { value: falloff },
        uBrightness: { value: brightness },
        uMouse: { value: new Vec2(0, 0) },
        uMouseInfluence: { value: allowMouse ? mouseInfluence : 0 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value.set(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!allowMouse) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) / rect.width - 0.5;
      targetMouseY = -((e.clientY - rect.top) / rect.height - 0.5);
    };

    if (allowMouse) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let animationFrameId: number;
    const startTime = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startTime) * 0.001;
      program.uniforms.uTime.value = elapsed;

      if (allowMouse) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;
        program.uniforms.uMouse.value.set(currentMouseX, currentMouseY);
      }

      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (allowMouse) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (gl.canvas && gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    speed,
    scale,
    ringCount,
    spokeCount,
    ringThickness,
    spokeThickness,
    sweepSpeed,
    sweepWidth,
    sweepLobes,
    color,
    backgroundColor,
    falloff,
    brightness,
    enableMouseInteraction,
    mouseInfluence,
  ]);

  return (
    <div
      ref={containerRef}
      className={`radar-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        ...style,
      }}
    />
  );
}
