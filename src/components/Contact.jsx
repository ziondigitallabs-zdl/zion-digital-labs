import React from 'react';
import blueSquiggleSvg from '../assets/blue squiggle for the contact us page.svg?raw';
import twoOvalsSvg from '../assets/the two oval structure on the hero page.svg?raw';
import whiteAsteriskSvg from '../assets/white asterik for the contact us page.svg?raw';

export default function Contact() {
  
  // Clean raw SVGs dynamically and set appropriate viewBox scaling attributes
  const cleanBlueSquiggle = blueSquiggleSvg
    ? blueSquiggleSvg
        .replace(/<\?xml[^>]*\?>/gi, '')
        .replace(/preserveAspectRatio="none"/gi, 'preserveAspectRatio="xMidYMid meet"')
        .replace(/width="1536"\s+height="1024"/gi, 'width="100%" height="100%"')
        .trim()
    : '';

  const cleanTwoOvals = twoOvalsSvg
    ? twoOvalsSvg
        .replace(/<\?xml[^>]*\?>/gi, '')
        .replace(/width="100%"\s+height="100%"/gi, 'width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
        .trim()
    : '';

  const cleanWhiteAsterisk = whiteAsteriskSvg
    ? whiteAsteriskSvg
        .replace(/<\?xml[^>]*\?>/gi, '')
        .replace(/<svg([^>]*)width="1536"\s+height="1024"/gi, '<svg$1viewBox="0 0 1536 1024" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
        .trim()
    : '';

  return (
    <section 
      className="relative w-screen h-screen bg-[#ff3c00] overflow-hidden select-none contact-section"
      style={{ contentVisibility: 'auto' }}
    >
      
      {/* --- Headline (LET'S TALK.) --- */}
      <div 
        className="absolute left-0 right-0 top-[10.5%] w-full h-[47%] flex items-center justify-center pointer-events-none select-none z-10 contact-headline-wrap"
      >
        <h1 
          className="font-anton text-[#F0EDE8] uppercase tracking-tight text-center"
          style={{
            fontSize: 'clamp(50px, 18.2vw, 44vh)',
            lineHeight: '0.85',
            margin: 0,
            padding: 0
          }}
        >
          LET'S TALK<span style={{ marginLeft: '0.07em' }}>.</span>
        </h1>
      </div>

      {/* --- Subtext --- */}
      <p 
        className="absolute left-1/2 -translate-x-1/2 text-white font-sans text-center select-none z-10 contact-subtext"
        style={{
          top: '64.5%', // perfectly centered in the vertical gap
          fontSize: 'clamp(16px, 1.95vw, 23px)',
          fontWeight: 'bold',
          width: '90%',
          margin: 0,
          opacity: 1
        }}
      >
        Book a free 12-minute call on Google Meet.
      </p>

      {/* --- CTA Button (BOOK YOUR CALL →) --- */}
      <a 
        href="https://calendly.com/ziondigitallabs/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-[36.9%] top-[71.67%] w-[30.4%] h-[15.24%] rounded-full bg-[#F0EDE8] shadow-[0_12px_35px_rgba(0,0,0,0.18)] flex items-center justify-center select-none hover:scale-[1.03] active:scale-95 transition-transform duration-300 group cursor-pointer z-20 contact-cta-button"
      >
        <span 
          className="font-permanent text-black uppercase tracking-wider mt-[-2px]"
          style={{
            fontSize: 'clamp(14px, 1.7vw, 22px)'
          }}
        >
          BOOK YOUR CALL →
        </span>
      </a>

      {/* --- Footer Text --- */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 flex items-center select-none z-10 contact-footer-text"
        style={{
          top: '91.8%',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(10px, 1.1vw, 13px)',
          fontWeight: '500',
          letterSpacing: '0.15em',
          opacity: 0.8
        }}
      >
        <span>NO CONTRACTS</span>
        <span className="text-white/35 mx-3 font-light">|</span>
        <span>NO COMMITMENT</span>
      </div>

      {/* --- Decorative Vectors (Absolute Placements) --- */}

      {/* Blue Squiggle (Top Left) */}
      <div 
        className="absolute left-[2.2%] top-[4.2%] w-[15.5%] h-[9.5%] z-10 pointer-events-none flex items-center justify-center contact-squiggle"
        style={{ transform: 'rotate(-18deg)' }}
      >
        <div 
          className="w-full h-full flex items-center justify-center" 
          dangerouslySetInnerHTML={{ __html: cleanBlueSquiggle }}
        />
      </div>

      {/* Two Ovals Structure (Bottom Left) */}
      <div 
        className="absolute left-[1.3%] top-[77.47%] w-[15.37%] h-[13.95%] z-10 pointer-events-none flex items-center justify-center contact-two-ovals"
      >
        <div 
          className="w-full h-full flex items-center justify-center" 
          dangerouslySetInnerHTML={{ __html: cleanTwoOvals }}
        />
      </div>

      {/* White Dot next to ovals */}
      <div 
        className="absolute left-[19.0%] top-[78.5%] w-[0.9vw] h-[0.9vw] min-w-[7px] min-h-[7px] bg-white rounded-full z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 contact-white-dot"
      />

      {/* Blue Dot (Top Right, near headline) */}
      <div 
        className="absolute left-[92.4%] top-[29.8%] w-[1.1vw] h-[1.1vw] min-w-[8px] min-h-[8px] bg-blue rounded-full z-10 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 contact-blue-dot"
      />

      {/* White Asterisk (Bottom Right) */}
      <div 
        className="absolute left-[80%] top-[75%] w-[14%] h-[19%] z-10 pointer-events-none flex items-center justify-center contact-white-asterisk"
      >
        <div 
          className="w-full h-full flex items-center justify-center" 
          dangerouslySetInnerHTML={{ __html: cleanWhiteAsterisk }}
        />
      </div>

    </section>
  );
}
