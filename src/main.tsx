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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, syncTouch: true }}>
      <App />
    </ReactLenis>
  </React.StrictMode>
);
