import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import asteriskBlackSvg from '../assets/small black asterik.svg?raw';

const SERVICES_DATA = [
  {
    id: 0,
    menuTitle: "WEBSITES",
    description: "We design and build websites that look expensive, load fast, and actually convert.",
    tagsRow1: [
      "Custom web design",
      "Landing pages",
      "E-commerce stores",
      "SEO optimization",
      "GEO optimization"
    ],
    tagsRow2: [
      "Speed & performance",
      "Mobile responsive",
      "CMS integration",
      "Webflow / Framer builds"
    ]
  },
  {
    id: 1,
    menuTitle: "APPS",
    description: "Native iOS and Android apps built from scratch — designed to feel smooth and look stunning.",
    tagsRow1: [
      "iOS native apps",
      "Android native apps",
      "Cross-platform apps",
      "UI/UX design"
    ],
    tagsRow2: [
      "App Store optimization",
      "API integration",
      "Push notifications",
      "App maintenance"
    ]
  },
  {
    id: 2,
    menuTitle: "AI FEATURES",
    description: "We plug AI into your business so it works smarter, faster, and without you lifting a finger.",
    tagsRow1: [
      "AI chatbots",
      "Workflow automation",
      "Smart recommendations",
      "AI content generation"
    ],
    tagsRow2: [
      "Lead capture bots",
      "AI search integration",
      "Custom AI tools",
      "GEO optimization"
    ]
  }
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0); // Locked selection on click
  const [hoveredIndex, setHoveredIndex] = useState(null); // Preview selection on hover
  const [reducedMotion, setReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const accordionRefs = useRef([]);
  const illustrationRefs = useRef([]);

  // Compute currently rendered selection (hover takes priority over click/lock)
  const currentId = hoveredIndex !== null ? hoveredIndex : activeIndex;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // 1. Accordion Expand/Collapse Tween linked to currentId
  useEffect(() => {
    SERVICES_DATA.forEach((service, idx) => {
      const panel = accordionRefs.current[idx];
      if (!panel) return;

      if (currentId === idx) {
        gsap.to(panel, {
          height: "auto",
          opacity: 1,
          duration: reducedMotion ? 0 : 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: reducedMotion ? 0 : 0.35,
          ease: "power2.inOut",
          overwrite: "auto"
        });
      }
    });
  }, [currentId, reducedMotion]);

  // 2. Illustration Swapping (morph crossfade & scale-down / scale-up entry) linked to currentId
  useEffect(() => {
    SERVICES_DATA.forEach((service, idx) => {
      const el = illustrationRefs.current[idx];
      if (!el) return;

      if (currentId === idx) {
        // Transition IN
        if (reducedMotion) {
          gsap.set(el, { opacity: 1, scale: 1, pointerEvents: "none" });
        } else {
          gsap.fromTo(el,
            { opacity: 0, scale: 0.88 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.35,
              ease: "power2.out",
              pointerEvents: "none",
              overwrite: "auto"
            }
          );
        }
      } else {
        // Transition OUT
        if (reducedMotion) {
          gsap.set(el, { opacity: 0, scale: 0.88, pointerEvents: "none" });
        } else {
          gsap.to(el, {
            opacity: 0,
            scale: 0.88,
            duration: 0.3,
            ease: "power2.inOut",
            pointerEvents: "none",
            overwrite: "auto"
          });
        }
      }
    });
  }, [currentId, reducedMotion]);

  const handleRowClick = (id) => {
    console.log(`[Services click] locked selection: ${id}`);
    setActiveIndex(id);
  };

  const handleRowMouseEnter = (id) => {
    if (window.innerWidth <= 768) return;
    console.log(`[Services hover enter] previewing row: ${id}`);
    setHoveredIndex(id);
  };

  const handleRowMouseLeave = () => {
    if (window.innerWidth <= 768) return;
    console.log(`[Services hover leave] clearing preview`);
    setHoveredIndex(null);
  };

  // Strip XML prologs and override hardcoded fills to exactly #1B1B1B
  const cleanAsteriskSvg = asteriskBlackSvg
    ? asteriskBlackSvg
        .replace(/<\?xml[^>]*\?>/gi, '')
        .replace(/fill="[^"]+"/g, 'fill="#1B1B1B"')
        .trim()
    : '';

  return (
    <div 
      ref={containerRef}
      className="relative w-screen min-h-screen bg-[#F2EDE8] py-16 flex items-center justify-center overflow-hidden select-none services-section"
    >
      
      {/* 
        Step 2: Top-Left Label (Positioned absolute relative to the full viewport)
        Pins it matching the Manifesto header padding, z-index, and size precisely.
      */}
      <div 
        className="absolute top-0 left-0 flex items-center z-30 select-none services-label"
        style={{ padding: '40px', gap: '12px' }}
      >
        {/* Constrained black asterisk icon scaled to 32px */}
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
          SERVICES
        </p>
      </div>



      {/* 
        Aspect-Locked Canvas Container (962 x 537 px reference)
        Maintains structural spacing ratios. Scales dynamically.
      */}
      <div 
        className="relative w-full h-full max-w-[calc(100vh*962/537)] max-h-[calc(100vw*537/962)] aspect-[962/537] flex flex-col md:flex-row justify-between [container-type:size] px-8 md:px-12 py-10 services-canvas"
      >
        
        {/* --- LEFT COLUMN: Three-Item Vertical Accordion --- */}
        <div 
          className="w-full md:w-[54%] flex flex-col justify-center mt-12 md:mt-4 z-10 font-anton pr-0 md:pr-4 services-left-col"
        >
          <div className="flex flex-col gap-[2.2cqw]">
            {SERVICES_DATA.map((service) => (
              <div 
                key={service.id}
                onClick={() => handleRowClick(service.id)}
                onMouseEnter={() => handleRowMouseEnter(service.id)}
                onMouseLeave={handleRowMouseLeave}
                className="flex flex-col border-b border-black/10 pb-[1.2cqw] cursor-pointer services-accordion-item"
              >
                {/* Accordion Title (Full width clickable text block) */}
                <h2
                  className="text-left text-[4.47cqw] font-normal uppercase leading-none tracking-wide transition-colors duration-300 transform select-none services-accordion-title"
                  style={{ color: currentId === service.id ? '#FC5910' : '#BEB3AA' }}
                >
                  {service.menuTitle}
                </h2>

                {/* Expandable Content Panel */}
                <div
                  ref={(el) => (accordionRefs.current[service.id] = el)}
                  className="h-0 opacity-0 overflow-hidden font-sans text-black services-accordion-panel"
                >
                  {/* Prevent trigger clicks inside paragraph/tag container */}
                  <div 
                    className="pt-[1.5cqw] pb-[1.0cqw] services-panel-inner"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Description Paragraph */}
                    <p className="text-[1.5cqw] md:text-[14px] lg:text-[16px] font-normal leading-[1.4] text-[#2d2d2d] max-w-[420px] select-none mb-[1.5cqw] services-accordion-desc">
                      {service.description}
                    </p>

                    {/* Tag Pills Row 1 */}
                    <div className="flex flex-wrap gap-[0.7cqw] mb-[0.8cqw] max-w-[450px] services-tags-row">
                      {service.tagsRow1.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-[1.2cqw] py-[0.5cqw] rounded-full border border-black/20 text-[1.1cqw] md:text-[11px] lg:text-[13px] font-medium text-black/90 whitespace-nowrap bg-black/5 hover:bg-black/10 transition-colors duration-200 services-accordion-tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Tag Pills Row 2 */}
                    <div className="flex flex-wrap gap-[0.7cqw] max-w-[450px] services-tags-row">
                      {service.tagsRow2.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-[1.2cqw] py-[0.5cqw] rounded-full border border-black/20 text-[1.1cqw] md:text-[11px] lg:text-[13px] font-medium text-black/90 whitespace-nowrap bg-black/5 hover:bg-black/10 transition-colors duration-200 services-accordion-tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Inline mobile-only illustration */}
                    <div className="services-inline-illustration">
                      {service.id === 0 && (
                        <svg viewBox="0 0 330 330" className="w-[120px] h-[120px] mx-auto mt-6">
                          <circle cx="165" cy="165" r="160" fill="#FC5910" />
                        </svg>
                      )}
                      {service.id === 1 && (
                        <svg viewBox="0 0 330 330" className="w-[120px] h-[120px] mx-auto mt-6">
                          <path d="M 5 325 L 325 325 L 325 5 Z" fill="#FC5910" />
                        </svg>
                      )}
                      {service.id === 2 && (
                        <svg viewBox="0 0 400 400" className="w-[140px] h-[140px] mx-auto mt-6">
                          <defs>
                            <radialGradient id="mobile-services-portal-glow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                              <stop offset="35%" stopColor="#e0e7ff" stopOpacity="0.6" />
                              <stop offset="70%" stopColor="#818cf8" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#2500ef" stopOpacity="0" />
                            </radialGradient>
                            <filter id="mobile-services-portal-blur" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="6" result="blur" />
                              <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                              </feMerge>
                            </filter>
                          </defs>
                          <ellipse cx="200" cy="120" rx="140" ry="36" transform="rotate(-15 200 120)" fill="url(#mobile-services-portal-glow)" stroke="#FC5910" strokeWidth="8" filter="url(#mobile-services-portal-blur)" />
                          <ellipse cx="200" cy="280" rx="140" ry="36" transform="rotate(15 200 280)" fill="url(#mobile-services-portal-glow)" stroke="#FC5910" strokeWidth="8" filter="url(#mobile-services-portal-blur)" />
                        </svg>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN: Proportional Illustration Container --- */}
        <div 
          className="w-full md:w-[46%] relative flex items-center justify-center mt-8 md:mt-0 services-right-col"
          style={{ pointerEvents: 'none' }} // Ensure container doesn't block accordion trigger clicks
        >
          
          {/* Websites: Solid Orange Circle (329px x 330px scaled to cqw) */}
          <div
            ref={(el) => (illustrationRefs.current[0] = el)}
            className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none scale-[0.88] will-change-[opacity,transform]"
          >
            <svg 
              viewBox="0 0 330 330" 
              className="w-[34.2cqw] h-[34.3cqw] max-w-[329px] max-h-[330px]"
            >
              <circle cx="165" cy="165" r="160" fill="#FC5910" />
            </svg>
          </div>

          {/* Apps: Solid Orange Right-Triangle */}
          <div
            ref={(el) => (illustrationRefs.current[1] = el)}
            className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none scale-[0.88] will-change-[opacity,transform]"
          >
            <svg 
              viewBox="0 0 330 330" 
              className="w-[34.2cqw] h-[34.3cqw] max-w-[329px] max-h-[330px]"
            >
              <path d="M 5 325 L 325 325 L 325 5 Z" fill="#FC5910" />
            </svg>
          </div>

          {/* AI Features: Glowing Mirrored Ellipses Portals */}
          <div
            ref={(el) => (illustrationRefs.current[2] = el)}
            className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none scale-[0.88] will-change-[opacity,transform]"
          >
            <svg 
              viewBox="0 0 400 400" 
              className="w-[41.5cqw] h-[41.5cqw] max-w-[400px] max-h-[400px]"
            >
              <defs>
                {/* Glowing radial portal core gradient */}
                <radialGradient id="services-portal-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#e0e7ff" stopOpacity="0.6" />
                  <stop offset="70%" stopColor="#818cf8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2500ef" stopOpacity="0" />
                </radialGradient>
                {/* Glow enhancement blur filter */}
                <filter id="services-portal-blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Top Portal Ellipse (Tilted one way) */}
              <ellipse 
                cx="200" 
                cy="120" 
                rx="140" 
                ry="36" 
                transform="rotate(-15 200 120)" 
                fill="url(#services-portal-glow)" 
                stroke="#FC5910" 
                strokeWidth="8" 
                filter="url(#services-portal-blur)"
              />
              
              {/* Bottom Portal Ellipse (Tilted mirrored way) */}
              <ellipse 
                cx="200" 
                cy="280" 
                rx="140" 
                ry="36" 
                transform="rotate(15 200 280)" 
                fill="url(#services-portal-glow)" 
                stroke="#FC5910" 
                strokeWidth="8" 
                filter="url(#services-portal-blur)"
              />
            </svg>
          </div>

        </div>

      </div>
    </div>
  );
}
