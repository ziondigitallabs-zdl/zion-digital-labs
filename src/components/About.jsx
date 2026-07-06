import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Reset scroll restoration to manual if supported to prevent jumping on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Scroll-driven timeline using ScrollTrigger scrub
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const headline = sectionRef.current.querySelector(".about-headline");
        const paragraphWrap = sectionRef.current.querySelector(".about-paragraph-wrap");
        const overlay = sectionRef.current.querySelector(".paragraph-overlay");

        if (!headline || !paragraphWrap || !overlay) return;

        if (progress < 0.2) {
          // Phase 1: headline holds, centered, static
          gsap.set(headline, { opacity: 1, y: 0 });
          gsap.set(paragraphWrap, { opacity: 0, y: 400 });
        } else if (progress < 0.35) {
          // Phase 2: headline exits upward
          const local = (progress - 0.2) / 0.15;
          gsap.set(headline, { opacity: 1 - local, y: -local * 140 });
          gsap.set(paragraphWrap, { opacity: 0 });
        } else if (progress < 0.55) {
          // Phase 3: paragraph slides up into position
          const local = (progress - 0.35) / 0.2;
          gsap.set(headline, { opacity: 0 });
          gsap.set(paragraphWrap, { opacity: 1, y: 400 - local * 400 });
          overlay.style.setProperty('--reveal', '0%');
        } else if (progress < 0.9) {
          // Phase 4: paragraph locked in place, mask sweep darkens/reveals it left-to-right
          const local = (progress - 0.55) / 0.35;
          gsap.set(paragraphWrap, { opacity: 1, y: 0 });
          overlay.style.setProperty('--reveal', `${local * 100}%`);
        } else {
          // Phase 5: hold fully revealed before release
          gsap.set(paragraphWrap, { opacity: 1, y: 0 });
          overlay.style.setProperty('--reveal', '100%');
        }
      }
    });

    // Force refresh ScrollTrigger calculations on window load or font loading paint
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

    // Refresh once on mount immediately
    ScrollTrigger.refresh();

    return () => {
      trigger.kill();
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="about-section"
      id="about"
    >
      <div className="about-sticky">

        {/* Top-Left Label (reusing the Manifesto styling parameters) */}
        <div className="about-label select-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" fill="none" className="animate-spin-slow">
            <path d="M13.6377 16.1337C17.3373 27.5222 7.47315 27.5222 11.1713 16.1337C7.47166 27.5222 -0.5069 21.7222 9.177 14.6841C-0.5069 21.7222 -3.55565 12.3376 8.41444 12.3376C-3.55565 12.3376 -0.5069 2.95291 9.177 9.99102C-0.5069 2.95291 7.47315 -2.84713 11.1713 8.54138C7.47166 -2.84713 17.3358 -2.84713 13.6377 8.54138C17.3373 -2.84713 25.3173 2.95291 15.6319 9.99102C25.3158 2.95291 28.3646 12.3376 16.3945 12.3376C28.3646 12.3376 25.3158 21.7222 15.6319 14.6841C25.3158 21.7222 17.3358 27.5222 13.6377 16.1337Z" fill="currentColor"/>
          </svg>
          <span>ABOUT US</span>
        </div>

        {/* Headline block (Phase 1 & 2) */}
        <div className="about-headline select-none">
          <h2>
            NICE TO<br />MEET YOU,<br />FINALLY.
          </h2>
        </div>

        {/* Paragraph text Reveal block (Phase 3, 4 & 5) */}
        <div className="about-paragraph-wrap select-none">
          <p className="paragraph-base">
            WE'RE BUILDERS, TINKERERS, AND PIXEL PUSHERS. CHRONICALLY ONLINE, POWERED BY COFFEE, SLIGHTLY OBSESSED WITH CLEAN CODE. WE USE AI NOT BECAUSE IT'S TRENDY BUT BECAUSE IT MAKES US FASTER AND YOU HAPPIER. EVERY PROJECT WE TAKE ON WE TREAT LIKE IT'S OURS. BECAUSE HONESTLY? IT KINDA IS.
          </p>
          <p className="paragraph-overlay">
            WE'RE BUILDERS, TINKERERS, AND PIXEL PUSHERS. CHRONICALLY ONLINE, POWERED BY COFFEE, SLIGHTLY OBSESSED WITH CLEAN CODE. WE USE AI NOT BECAUSE IT'S TRENDY BUT BECAUSE IT MAKES US FASTER AND YOU HAPPIER. EVERY PROJECT WE TAKE ON WE TREAT LIKE IT'S OURS. BECAUSE HONESTLY? IT KINDA IS.
          </p>
        </div>

      </div>
    </section>
  );
}
