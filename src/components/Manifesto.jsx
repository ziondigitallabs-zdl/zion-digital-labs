import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const textPath1 = sectionRef.current.querySelector("#wavyTextPath1");
    const textPath2 = sectionRef.current.querySelector("#wavyTextPath2");
    const revealText = sectionRef.current.querySelector("#revealText");

    if (!textPath1 || !textPath2 || !revealText) return;

    // Linear Scroll-driven updates matching the 6 phases
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // 1) Translate S-curve texts horizontally (staggered)
        // Starts fully offscreen right (100%) -> glides past center -> exits offscreen left (-140%)
        const isMobile = window.innerWidth <= 768;
        const stagger = isMobile ? 1.5 : 22; // aligns them vertically on mobile, staggers on desktop
        const startOffsetVal1 = 100 - progress * 260; // 100% to -160%
        const startOffsetVal2 = startOffsetVal1 + stagger;

        textPath1.setAttribute('startOffset', `${startOffsetVal1}%`);
        textPath2.setAttribute('startOffset', `${startOffsetVal2}%`);

        // 2) Animate paragraph reveal
        // Fades and slides in from below starting around progress = 0.45, settling by 0.75
        if (progress < 0.45) {
          gsap.set(revealText, { opacity: 0, y: 180 });
        } else if (progress < 0.75) {
          const local = (progress - 0.45) / 0.3; // 0.0 to 1.0
          gsap.set(revealText, { 
            opacity: local, 
            y: 180 - local * 180 
          });
        } else {
          // Hold phase (0.75 to 1.0)
          gsap.set(revealText, { opacity: 1, y: 0 });
        }
      }
    });

    // Refresh ScrollTrigger calculations on mount/font settle
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", handleLoad);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="manifesto-section" 
      id="manifesto"
    >
      {/* Sticky locking viewport */}
      <div className="manifesto-sticky select-none">

        {/* Top-Left Header Label */}
        <div className="manifesto-header select-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none" className="animate-spin-slow">
            <path d="M13.6377 16.1337C17.3373 27.5222 7.47315 27.5222 11.1713 16.1337C7.47166 27.5222 -0.5069 21.7222 9.177 14.6841C-0.5069 21.7222 -3.55565 12.3376 8.41444 12.3376C-3.55565 12.3376 -0.5069 2.95291 9.177 9.99102C-0.5069 2.95291 7.47315 -2.84713 11.1713 8.54138C7.47166 -2.84713 17.3358 -2.84713 13.6377 8.54138C17.3373 -2.84713 25.3173 2.95291 15.6319 9.99102C25.3158 2.95291 28.3646 12.3376 16.3945 12.3376C28.3646 12.3376 25.3158 21.7222 15.6319 14.6841C25.3158 21.7222 17.3358 27.5222 13.6377 16.1337Z" fill="currentColor"/>
          </svg>
          <p>Our manifesto</p>
        </div>

        {/* 1) Curved S-Wave Marquee Text (Rotated slightly in CSS) */}
        <div className="curved-text-wrapper">
          <svg viewBox="-400 0 2240 360" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path 
                id="wavyPath1" 
                d="M -400 110 Q -200 234 0.339844 110 C 224.22 -14 496.45 -14 720.34 110 C 944.22 234 1216.45 234 1440.34 110 Q 1640 -14 1840 110" 
                fill="none" 
              />
              <path 
                id="wavyPath2" 
                d="M -400 210 Q -200 334 0.339844 210 C 224.22 86 496.45 86 720.34 210 C 944.22 334 1216.45 334 1440.34 210 Q 1640 86 1840 210" 
                fill="none" 
              />
            </defs>
            <text fill="#ffffff">
              <textPath id="wavyTextPath1" href="#wavyPath1" startOffset="100%">
                Somewhere out there,
              </textPath>
            </text>
            <text fill="#ffffff">
              <textPath id="wavyTextPath2" href="#wavyPath2" startOffset="122%">
                Someone is googling you.
              </textPath>
            </text>
          </svg>
        </div>

        {/* 2) Paragraph Reveal Content */}
        <div 
          id="revealText"
          className="absolute left-[50%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[1100px] flex flex-col items-center justify-center text-center opacity-0 z-20 pointer-events-none select-none"
        >
          <p className="font-anton text-white uppercase text-[clamp(21px,3.2vw,36px)] leading-[1.15] tracking-tight m-0 mb-8">
            They found your name somehow. Maybe a friend mentioned you. Maybe they saw your ad. Either way they're curious — and your website is about to make or break it. We bring creativity, speed, and AI together to make sure that moment works in your favour every single time.
          </p>
          <h2 className="font-anton text-white uppercase text-[clamp(27px,4.8vw,54px)] leading-[1.1] tracking-tighter m-0">
            Good design shouldn't cost a fortune.<br />
            Bad design already is one.
          </h2>
        </div>

      </div>
    </section>
  );
}
