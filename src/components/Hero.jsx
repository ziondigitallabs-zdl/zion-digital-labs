import React from 'react';
import blobSvg from '../assets/Blue blob button on the hero page.svg?raw';
import asteriskSvg from '../assets/the asterik on the hero page.svg?raw';
import arrowSvg from '../assets/The arrow on the hero page.svg?raw';
import underlineSvg from '../assets/The blue underline under the main hero text on hero page.svg?raw';
import squiggleSvg from '../assets/blue squiggle on hero page.svg?raw';
import ovalsSvg from '../assets/the two oval structure on the hero page.svg?raw';

export default function Hero() {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-orange overflow-hidden select-none hero-section">
      {/* 
        Aspect-Locked Canvas Container (1001 x 564 px)
        Maintains exactly 1001:564 proportions. Scales to fit the screen.
      */}
      <div 
        className="relative w-full h-full max-w-[calc(100vh*1001/564)] max-h-[calc(100vw*564/1001)] aspect-[1001/564] bg-orange overflow-hidden [container-type:size] hero-canvas"
        style={{ color: '#ffffff' }}
      >
        
        {/* --- Box 1: Top-Left Wordmark Link (Shifted slightly upper to Y = 20px / 3.5%) --- */}
        <div 
          className="absolute left-[4.0%] top-[3.5%] z-20 font-sans text-[1.4cqw] font-normal tracking-wide hero-made-by"
        >
          <span className="block font-light opacity-90">made by</span>
          <a href="#" className="border-b-[0.1cqw] border-white pb-[0.1cqw] hover:opacity-85 transition-opacity font-semibold">Zion digital labs</a>
        </div>

        {/* Center signature flourish (Mobile only) */}
        <div className="hero-flourish select-none pointer-events-none">
          <svg viewBox="0 0 80 30" className="w-[80px] h-[30px]">
            <path 
              d="M10,22 C22,8 26,10 32,20 C38,30 42,6 48,18 C54,30 58,12 65,18 C69,22 72,12 75,16" 
              stroke="#ffffff" 
              strokeWidth="3.5" 
              strokeLinecap="round" 
              fill="none" 
            />
          </svg>
        </div>

        {/* --- Box 2: Top-Right Text (Shifted slightly upper to Y = 20px / 3.5%) --- */}
        <div 
          className="absolute left-[82.7%] top-[3.5%] z-20 font-sans text-[1.4cqw] font-normal hover:opacity-85 transition-opacity hero-powered-by"
        >
          <div className="flex items-center gap-[0.4cqw] hero-powered-inner">
            <div className="text-left font-light leading-[1.25]">
              <span className="block">Powered by</span>
              <a href="#" className="flex items-center gap-[0.2cqw] font-semibold">
                coffee <span className="inline-block transition-transform duration-300 hover:translate-x-[0.4cqw]">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* --- Box 3: Main Headline Container (Anton Font) --- */}
        <div 
          className="absolute left-[4.7%] top-[17.4%] w-[65%] z-10 hero-headline-container"
        >
          <h1 className="font-anton font-normal text-[8.8cqw] leading-[0.95] tracking-[-0.02em] text-white uppercase select-none hero-h1">
            Your
            <br className="hero-br-mobile" />
            {" "}Competition
            <br className="hero-br-desktop" />
            <br className="hero-br-mobile" />
            {" "}Already
            <br className="hero-br-mobile" />
            {" "}Has A
            <br className="hero-br-desktop" />
            <br className="hero-br-mobile" />
            {" "}Better
            <br className="hero-br-mobile" />
            {" "}Website.
          </h1>
        </div>

        {/* Blue Underline SVG */}
        <div 
          className="absolute left-[1.1%] top-[48.8%] w-[25.9%] h-[32.3%] z-0 pointer-events-none hero-underline"
          dangerouslySetInnerHTML={{ __html: underlineSvg }}
        />

        {/* --- Box 5: Subtext Container (Inter Font) --- */}
        <div 
          className="absolute left-[4.8%] top-[69.5%] w-[37.9%] h-[16.1%] z-10 flex flex-col justify-start text-white font-sans hero-subtext-container"
        >
          <p className="font-sans text-[2.0cqw] font-semibold leading-tight select-none">Not for long.</p>
          <p className="font-sans text-[1.5cqw] font-normal opacity-90 leading-[1.4] mt-[0.3cqw] select-none">
            Websites, apps & AI features &mdash;<br />built fast. priced fair.
          </p>
        </div>

        {/* --- SVG Graphic Layers (Absolute Positioned via Penpot Bounds) --- */}
        
        {/* White Asterisk SVG */}
        <div 
          className="absolute left-[69.1%] top-[4.4%] w-[26.5%] h-[35.8%] z-0 pointer-events-none hero-asterisk"
          dangerouslySetInnerHTML={{ __html: asteriskSvg }}
        />

        {/* White Arrow SVG */}
        <div 
          className="absolute left-[61.4%] top-[27.0%] w-[35.3%] h-[36.7%] z-0 pointer-events-none hero-arrow"
          dangerouslySetInnerHTML={{ __html: arrowSvg }}
        />

        {/* Blue Squiggle SVG */}
        <div 
          className="absolute left-[42.3%] top-[81.7%] w-[13.6%] h-[16.3%] z-0 pointer-events-none hero-squiggle"
          dangerouslySetInnerHTML={{ __html: squiggleSvg }}
        />

        {/* Two Ovals White SVG (Clipped overflow automatically by canvas wrapper) */}
        <div 
          className="absolute left-[0.7%] top-[79.6%] w-[24.1%] h-[34.4%] z-0 pointer-events-none hero-ovals"
          dangerouslySetInnerHTML={{ __html: ovalsSvg }}
        />

        {/* Blue Blob Button / CTA Container */}
        <a 
          href="https://calendly.com/ziondigitallabs/30min" 
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[61.2%] top-[60.6%] w-[40.3%] h-[42.7%] z-20 flex flex-col justify-center items-center text-center select-none group transition-transform duration-300 active:scale-95 hero-cta-button"
          style={{ textDecoration: 'none' }}
        >
          {/* Blob Vector Graphic (Scales 100% inside container) */}
          <div 
            className="absolute inset-0 z-0 transition-transform duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) group-hover:scale-[1.04] group-hover:rotate-1"
            dangerouslySetInnerHTML={{ __html: blobSvg ? blobSvg.replace('<svg ', '<svg preserveAspectRatio="none" ') : '' }}
          />
          {/* Marker CTA Text (Permanent Marker Font, wobbly underline SVG) */}
          <span 
            className="relative z-10 font-permanent text-[2.8cqw] font-normal text-white uppercase leading-none mt-[-1cqw] tracking-[0.05em] select-none transition-transform duration-300 group-hover:scale-105 inline-block"
          >
            BOOK A CALL
            <svg 
              viewBox="0 0 100 10" 
              preserveAspectRatio="none" 
              className="absolute left-[-2%] bottom-[-0.8cqw] w-[104%] h-[0.9cqw] text-white fill-none stroke-current stroke-[3.5] stroke-linecap-round pointer-events-none"
            >
              <path d="M 2 5 C 20 7, 40 3, 60 6 C 80 4, 95 6, 98 5" />
            </svg>
          </span>
        </a>

        {/* --- Marker Dots (Absolute Positioned) --- */}
        
        {/* Marker 8: White Dot bottom left */}
        <div 
          className="absolute left-[25.0%] top-[93.1%] w-[0.8cqw] h-[0.8cqw] bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hero-white-dot"
        />

        {/* Marker 7: Blue Dot top right */}
        <div 
          className="absolute left-[92.4%] top-[29.8%] w-[1.2cqw] h-[1.2cqw] bg-blue rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none hero-blue-dot"
        />

      </div>
    </div>
  );
}
