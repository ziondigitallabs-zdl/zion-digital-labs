import React, { useEffect, useRef } from 'react';
import originalCloudSvg from '../assets/text cloud on the footer.svg?raw';
import mobileCloudSvg from '../assets/text-cloud-mobile.svg?raw';
import posterPng from '../assets/Missing person poster on the footer.png';

export default function Footer() {
  const headlineRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        // Reset desktop styles
        const lines = headlineRef.current?.querySelectorAll('.footer-headline-line');
        if (lines) {
          lines.forEach(line => {
            line.style.fontSize = '';
            line.style.whiteSpace = '';
            line.style.display = '';
          });
        }
        return;
      }

      const container = headlineRef.current;
      if (!container) return;

      const containerWidth = container.getBoundingClientRect().width;
      const lines = container.querySelectorAll('.footer-headline-line');
      
      lines.forEach(line => {
        const baseFontSize = 40;
        line.style.fontSize = baseFontSize + 'px';
        line.style.whiteSpace = 'nowrap';
        line.style.display = 'inline-block';
        const measuredWidth = line.getBoundingClientRect().width;
        if (measuredWidth > 0) {
          const scale = containerWidth / measuredWidth;
          line.style.fontSize = (baseFontSize * scale) + 'px';
        }
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Trigger fit calculations immediately and across rendering phases
    handleResize();
    const timer50 = setTimeout(handleResize, 50);
    const timer150 = setTimeout(handleResize, 150);

    if (document.fonts) {
      document.fonts.ready.then(handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer50);
      clearTimeout(timer150);
    };
  }, []);

  // Clean raw SVG dynamically and ensure it contain-scales properly
  const cleanSpeechCloud = originalCloudSvg
    ? originalCloudSvg
        .replace(/<\?xml[^>]*\?>/gi, '')
        .replace(/preserveAspectRatio="none"/gi, 'preserveAspectRatio="none"')
        .replace(/width="1536"\s+height="1024"/gi, 'width="100%" height="100%"')
        .trim()
    : '';

  const cleanMobileSpeechCloud = mobileCloudSvg
    ? mobileCloudSvg
        .replace(/<\?xml[^>]*\?>/gi, '')
        .replace(/<svg/i, '<svg preserveAspectRatio="none"')
        .trim()
    : '';

  return (
    <footer 
      className="relative w-screen min-h-screen bg-[#F74301] flex items-center justify-center select-none overflow-hidden py-16 md:py-0"
      style={{ contentVisibility: 'auto' }}
    >
      
      {/* 
        Aspect-Locked Canvas Container (740.19 / 467.12 reference ratio)
        Matches all percentage-based offsets 1:1 on desktop.
        Stacks vertically on mobile screen widths.
      */}
      <div 
        className="relative w-full flex flex-col md:block md:w-full md:h-full md:max-w-[calc(100vh*740.19/467.12)] md:max-h-[calc(100vw*467.12/740.19)] md:aspect-[740.19/467.12] md:[container-type:size] px-6 md:px-0"
      >
        
        {/* --- 1) Headline (THIS IS WHERE IT STARTS.) --- */}
        <div 
          ref={headlineRef}
          className="relative md:absolute md:left-[1.35%] md:top-[2.14%] md:w-[97.3%] md:h-[21.82%] flex items-center justify-center text-center select-none z-10 mt-6 md:mt-0 footer-headline"
        >
          <h1 
            className="font-anton text-white uppercase tracking-tighter text-center leading-none w-full flex flex-col items-center"
            style={{
              fontSize: 'clamp(36px, 9.4vw, 140px)',
              margin: 0,
              padding: 0
            }}
          >
            <span className="hidden md:inline">This is where it starts.</span>
            <span className="footer-headline-line inline md:hidden">This is where</span>
            <span className="footer-headline-line inline md:hidden">it starts.</span>
          </h1>
        </div>

        {/* --- Flex Container for Poster & Cloud on mobile, absolute stacked on desktop --- */}
        <div className="flex flex-col md:block gap-8 md:gap-0 mt-8 md:mt-0 z-20">
          
          {/* --- 2) Missing Person Poster --- */}
          <div 
            className="relative md:absolute md:left-[21%] md:top-[11%] md:w-[35%] md:h-[76%] flex items-center justify-center z-30"
          >
            <img 
              src={posterPng} 
              alt="Wanted: Someone who needs a killer website" 
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* --- 3) Speech Cloud SVG (DESKTOP) --- */}
          <div 
            className="hidden md:flex relative md:absolute md:left-[47%] md:top-[13.5%] md:w-[53%] md:h-[73.5%] items-center justify-center z-20 footer-speech-cloud"
          >
            {/* Raw Speech Bubble SVG Frame */}
            <div 
              className="w-full h-full flex items-center justify-center" 
              dangerouslySetInnerHTML={{ __html: cleanSpeechCloud }}
            />

            {/* Paragraph Text Overlay (Architects Daughter Handwriting Font) */}
            <div 
              className="absolute left-[23%] top-[25.5%] w-[54%] h-[58%] flex flex-col justify-center items-center text-center px-4 font-handwritten text-white uppercase leading-[1.3] font-bold select-none"
            >
              <p className="m-0 mb-[1.2cqw] text-[clamp(11px,1.25cqw,16px)] text-white font-extrabold tracking-wide">
                Got an idea? Even a vague one? We're in.
              </p>
              <p className="m-0 mb-[1.2cqw] text-[clamp(11px,1.25cqw,16px)] text-white font-extrabold tracking-wide">
                Book a free 12-min call — no pitch, no pressure, just a chat.
              </p>
              <p className="m-0 mb-[1.2cqw] text-[clamp(11px,1.25cqw,16px)] text-white font-extrabold tracking-wide">
                And yeah, we're affordable too.
              </p>
              <p className="m-0 text-[clamp(12px,1.35cqw,18px)] font-black text-white">
                — Zion Digital Labs
              </p>
            </div>
          </div>

          {/* --- 3) Speech Cloud SVG (MOBILE) --- */}
          <div 
            className="flex md:hidden relative items-center justify-center z-20 footer-speech-cloud-mobile"
          >
            {/* Raw Mobile Speech Bubble SVG Frame */}
            <div 
              className="w-full h-full flex items-center justify-center" 
              dangerouslySetInnerHTML={{ __html: cleanMobileSpeechCloud }}
            />

            {/* Paragraph Text Overlay inside 50% x 45% safe zone */}
            <div 
              className="absolute inset-0 m-auto w-[50%] h-[45%] flex flex-col justify-center items-center text-center font-handwritten text-white uppercase leading-[1.25] font-bold select-none footer-mobile-text-container"
            >
              <p className="m-0 font-extrabold tracking-wide">
                Got an idea? Even a vague one? We're in.
              </p>
              <p className="m-0 font-extrabold tracking-wide">
                Book a free 12-min call — no pitch, no pressure, just a chat.
              </p>
              <p className="m-0 font-extrabold tracking-wide">
                And yeah, we're affordable too.
              </p>
              <p className="m-0 font-black text-white">
                — Zion Digital Labs
              </p>
            </div>
          </div>

        </div>

        {/* --- 4) CTA Button (Book Your Free Call →) --- */}
        <a 
          href="https://calendly.com/ziondigitallabs/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="relative md:absolute md:left-[30%] md:top-[87.5%] md:w-[40%] md:h-[10.5%] rounded-full bg-[#F0EDE8] shadow-[0_12px_35px_rgba(0,0,0,0.18)] flex items-center justify-center select-none hover:scale-[1.03] active:scale-95 transition-transform duration-300 group cursor-pointer z-40 mt-8 md:mt-0 py-4 md:py-0 footer-cta-button"
        >
          <span 
            className="font-permanent text-black uppercase tracking-wider mt-[-2px]"
            style={{
              fontSize: 'clamp(14px, 1.8vw, 24px)'
            }}
          >
            Book Your Free Call →
          </span>
        </a>

        {/* --- 5) Bottom Contact Bar --- */}
        <div className="footer-bottom-row">
          {/* Email & Copyright (Bottom Left) */}
          <div 
            className="relative md:absolute md:left-[1.8%] md:bottom-[5%] flex flex-col items-center md:items-start text-center md:text-left text-white/80 font-sans z-20 mt-10 md:mt-0 footer-contact-info"
          >
            <a 
              href="mailto:hello@ziondigitallabs.com"
              className="font-sans text-[14px] md:text-[1.4cqw] lg:text-[14px] font-semibold hover:text-white transition-colors duration-200 mb-1 cursor-pointer"
            >
              hello@ziondigitallabs.com
            </a>
            <span 
              className="font-sans text-[11px] md:text-[1.1cqw] lg:text-[11px] font-normal opacity-70"
            >
              © 2026 Zion Digital Labs. All rights reserved.
            </span>
          </div>

          {/* Social Icons (Bottom Right) */}
          <div 
            className="relative md:absolute md:right-[1.8%] md:bottom-[5%] flex items-center justify-center gap-3 z-20 mt-6 md:mt-0 mb-6 md:mb-0 footer-social-icons"
          >
            {/* Instagram Icon link */}
            <a 
              href="https://www.instagram.com/ziondigitallabs/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-all duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>

            {/* X (formerly Twitter) Icon link */}
            <a 
              href="https://x.com/ziondigitallabs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
