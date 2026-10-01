import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css'; // Modern Lenis requirement

// Register GSAP plugins globally here if needed
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isTouch = typeof window !== 'undefined' && (
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.innerWidth < 768
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactLenis
      root
      options={{
        lerp: isTouch ? 1 : 0.1,
        duration: isTouch ? 0.3 : 1.2,
        syncTouch: false,
        smoothWheel: true,
        touchMultiplier: 1,
      }}
    >
      <App />
    </ReactLenis>
  </React.StrictMode>
);
