import { useState, useEffect } from 'react';
import type { PerformanceTier, PerformanceConfig } from '../types';

const PERFORMANCE_CONFIGS: Record<PerformanceTier, PerformanceConfig> = {
  high: {
    particleCount: 3000,
    enableShaders: true,
    enablePostProcessing: true,
    maxDpr: 2,
    shadowQuality: 'high',
    enableBloom: true,
  },
  medium: {
    particleCount: 1200,
    enableShaders: true,
    enablePostProcessing: false,
    maxDpr: 1.5,
    shadowQuality: 'medium',
    enableBloom: false,
  },
  low: {
    particleCount: 400,
    enableShaders: false,
    enablePostProcessing: false,
    maxDpr: 1,
    shadowQuality: 'none',
    enableBloom: false,
  },
};

function detectPerformanceTier(): PerformanceTier {
  // Check for reduced motion preference
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    return 'low';
  }

  // Check device memory (Chrome only)
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) {
    return 'low';
  }

  // Check hardware concurrency
  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2) {
    return 'low';
  }

  // Check screen size as mobile proxy
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return 'medium';
  }

  // Check device pixel ratio (very high DPR = mobile, potentially slower GPU)
  if (typeof window !== 'undefined' && window.devicePixelRatio > 2.5) {
    return 'medium';
  }

  // Check WebGL renderer info for GPU detection
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        const rendererStr = (renderer as string).toLowerCase();
        // Integrated GPUs and known low-end
        if (
          rendererStr.includes('intel') ||
          rendererStr.includes('swiftshader') ||
          rendererStr.includes('llvmpipe')
        ) {
          return 'medium';
        }
      }
    }
  } catch {
    // WebGL not available
    return 'low';
  }

  return 'high';
}

export function usePerformanceTier() {
  const [tier, setTier] = useState<PerformanceTier>('medium'); // default safe
  const [config, setConfig] = useState<PerformanceConfig>(PERFORMANCE_CONFIGS.medium);
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLAvailable(!!gl);
    } catch {
      setWebGLAvailable(false);
    }

    const detected = detectPerformanceTier();
    setTier(detected);
    setConfig(PERFORMANCE_CONFIGS[detected]);
  }, []);

  return { tier, config, webGLAvailable };
}
