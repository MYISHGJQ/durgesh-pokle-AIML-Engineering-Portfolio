import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '../../store';

export default function NeuralNetwork() {
  const container = useRef<HTMLDivElement>(null);
  const bootComplete = useStore((state) => state.bootComplete);

  useGSAP(() => {
    if (!bootComplete) return;

    // We pin the container and animate text based on scroll progress
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // The component is 300vh tall.
    // 0-33%: "EVERY SYSTEM STARTS WITH A CONNECTION."
    // 33-66%: Transition to "EVERY IDEA BECOMES INTELLIGENCE."
    // 66-100%: Fade out for the next section

    tl.fromTo('.neural-text-1', 
      { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 }
    )
    .to('.neural-text-1', 
      { opacity: 0, scale: 1.2, filter: 'blur(10px)', duration: 1 }
    )
    .fromTo('.neural-text-2', 
      { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1 }
    )
    .to('.neural-text-2', 
      { opacity: 0, scale: 1.2, filter: 'blur(10px)', duration: 1 }
    );

  }, { scope: container, dependencies: [bootComplete] });

  return (
    <section 
      ref={container} 
      id="neural-network"
      className="relative w-full h-[300vh] pointer-events-none"
    >
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        <h2 className="neural-text-1 absolute text-center font-outfit font-black text-4xl md:text-7xl leading-tight text-white px-4 max-w-4xl opacity-0">
          EVERY SYSTEM<br />
          STARTS WITH<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">A CONNECTION.</span>
        </h2>
        
        <h2 className="neural-text-2 absolute text-center font-outfit font-black text-4xl md:text-7xl leading-tight text-white px-4 max-w-4xl opacity-0">
          EVERY IDEA<br />
          BECOMES<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">INTELLIGENCE.</span>
        </h2>

      </div>
    </section>
  );
}
