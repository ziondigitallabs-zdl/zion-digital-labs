import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import asteriskBlackSvg from '../assets/small black asterik.svg?raw';

const PROCESS_STEPS = [
  {
    id: 0,
    number: "01",
    title: "DISCOVERY",
    description: "We get on a call, understand your vision, your goals, and what you actually need."
  },
  {
    id: 1,
    number: "02",
    title: "STRATEGY",
    description: "We map out the site structure, features, and timeline before a single pixel is designed."
  },
  {
    id: 2,
    number: "03",
    title: "DESIGN",
    description: "UI/UX design that looks stunning and makes sense to every visitor."
  },
  {
    id: 3,
    number: "04",
    title: "BUILD",
    description: "We develop everything fast using AI-powered workflows — coded clean, tested properly."
  },
  {
    id: 4,
    number: "05",
    title: "LAUNCH",
    description: "We go live, hand everything over, and make sure you're set to grow."
  }
];

export default function WorkProcess() {
  const sectionRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const startAngles = [0, 75, 145, 230, 310];

    if (!sectionRef.current) return;
    const wrappers = sectionRef.current.querySelectorAll('.orbit-bead-wrapper');

    wrappers.forEach((wrapper, i) => {
      const startAngle = startAngles[i % startAngles.length];

      gsap.killTweensOf(wrapper);

      // Set initial rotation angle
      gsap.set(wrapper, { rotation: startAngle });

      // Spin continuously loop forever
      gsap.to(wrapper, {
        rotation: startAngle + 360,
        duration: 7,
        ease: "none",
        repeat: -1,
        overwrite: "auto"
      });
    });

    return () => {
      if (sectionRef.current) {
        const wrappers = sectionRef.current.querySelectorAll('.orbit-bead-wrapper');
        wrappers.forEach(w => gsap.killTweensOf(w));
      }
    };
  }, []);


  // Strip XML prologs and override hardcoded fills to exactly #1B1B1B
  const cleanAsteriskSvg = asteriskBlackSvg
    ? asteriskBlackSvg
        .replace(/<\?xml[^>]*\?>/gi, '')
        .replace(/fill="[^"]+"/g, 'fill="#1B1B1B"')
        .trim()
    : '';

  return (
    <section 
      ref={sectionRef}
      className="relative w-screen min-h-screen bg-[#F2EDE8] py-16 flex items-center justify-center overflow-hidden select-none process-section"
    >
      
      {/* Top-Left Label (Positioned absolute relative to the viewport container) */}
      <div 
        className="absolute top-0 left-0 flex items-center z-30 select-none process-label"
        style={{ padding: '40px', gap: '12px' }}
      >
        <div 
          className="flex items-center justify-center pointer-events-none text-[#1B1B1B] fill-current" 
          style={{ width: '32px', height: '32px' }}
          dangerouslySetInnerHTML={{ __html: cleanAsteriskSvg }} 
        />
        <p
          className="font-anton uppercase text-[#1B1B1B]"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            margin: 0,
            lineHeight: 1
          }}
        >
          WORK PROCESS
        </p>
      </div>

      {/* 
        Aspect-Locked Canvas Container (962 x 537 px reference)
        Maintains structural spacing ratios. Scales dynamically.
      */}
      <div 
        className="relative w-full h-full max-w-[calc(100vh*962/537)] max-h-[calc(100vw*537/962)] aspect-[962/537] flex flex-col justify-center [container-type:size] px-6 md:px-12 py-10 process-canvas"
      >
        
        {/* Horizontal Overlapping chain of circles */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 md:-space-x-[3.8cqw] w-full mt-16 md:mt-4 z-10 process-row">
          {PROCESS_STEPS.map((step) => (
            <div 
              key={step.id}
              className="process-circle w-[65%] md:w-[23.5%] aspect-square rounded-full border border-black/80 relative flex flex-col justify-center p-[4.2cqw] md:p-[2.6cqw] bg-transparent"
            >
              {/* Rotating Wrapper covering 100% of parent circle */}
              <div className="orbit-bead-wrapper absolute inset-0 rounded-full pointer-events-none">
                <div className="orbit-bead" />
              </div>
              
              {/* Card content text */}
              <div className="flex flex-col text-left max-w-[90%] mx-auto font-anton process-circle-content">
                <span className="text-[3cqw] md:text-[2.2cqw] text-[#FC5910] leading-none mb-[0.3cqw] process-circle-num">
                  {step.number} —
                </span>
                <h3 className="text-[4.5cqw] md:text-[3.2cqw] text-[#FC5910] leading-none uppercase mb-[1.2cqw] process-circle-title">
                  {step.title}
                </h3>
                <p className="font-sans text-[2.2cqw] md:text-[1.1cqw] lg:text-[13px] text-black/85 leading-snug process-circle-desc">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
