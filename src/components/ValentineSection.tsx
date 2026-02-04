import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Calendar, Gift, Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ValentineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const heartRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const circuitRef = useRef<HTMLDivElement>(null);

  // Generate hearts on client-side only to avoid hydration mismatch
  const [hearts, setHearts] = useState<Array<{
    size: number;
    left: string;
    top: string;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate random hearts only on client
    setHearts(
      Array.from({ length: 8 }, () => ({
        size: 12 + Math.random() * 16,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;

    // On mobile: no animations, no pinning - just show content
    if (isMobile) {
      // Make all elements visible immediately
      gsap.set([titleRef.current, taglineRef.current, heartRef.current, circuitRef.current, ctaRef.current], {
        opacity: 1, x: 0, y: 0, scale: 1
      });
      return;
    }

    // Desktop: Full animations
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        titleRef.current,
        { y: '-28vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        taglineRef.current,
        { y: '-20vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        heartRef.current,
        { y: '60vh', scale: 0.7, opacity: 0 },
        { y: '8vh', scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        circuitRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        titleRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        taglineRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        heartRef.current,
        { y: '8vh', scale: 1, opacity: 1 },
        { y: '22vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        circuitRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#05060B] overflow-hidden"
    >
      {/* Circuit traces background */}
      <div
        ref={circuitRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1920 1080"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Circuit paths */}
          <path
            d="M 200 540 L 400 540 L 450 490 L 550 490"
            stroke="#FF2BD6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 5"
          />
          <path
            d="M 1720 540 L 1520 540 L 1470 490 L 1370 490"
            stroke="#FF2BD6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 5"
          />
          <path
            d="M 200 600 L 350 600 L 400 650 L 500 650"
            stroke="#7B2BFF"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8 4"
          />
          <path
            d="M 1720 600 L 1570 600 L 1520 650 L 1420 650"
            stroke="#7B2BFF"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="8 4"
          />
          {/* Nodes */}
          <circle cx="400" cy="540" r="6" fill="#FF2BD6" />
          <circle cx="1520" cy="540" r="6" fill="#FF2BD6" />
          <circle cx="350" cy="600" r="4" fill="#7B2BFF" />
          <circle cx="1570" cy="600" r="4" fill="#7B2BFF" />
        </svg>
      </div>

      {/* Title - top center */}
      <h2
        ref={titleRef}
        className="absolute left-1/2 top-[12%] md:top-[14%] -translate-x-1/2 font-orbitron font-black text-[clamp(28px,5vw,80px)] text-[#F4F6FF] tracking-[0.08em] md:tracking-[0.12em] text-glow-magenta z-20 whitespace-nowrap px-4"
        style={{ opacity: 0 }}
      >
        VALENTINE WEEK
      </h2>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="absolute left-1/2 top-[22%] md:top-[26%] -translate-x-1/2 font-inter text-[clamp(11px,1.4vw,20px)] text-[#A7B0C8] tracking-[0.12em] md:tracking-[0.2em] uppercase z-20 px-4 text-center"
        style={{ opacity: 0 }}
      >
        Where hearts sync with circuits
      </p>

      {/* Heart image - professional flexbox centering */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <img
          ref={heartRef}
          src="/valentine_heart.png"
          alt="Circuit Heart"
          className="w-[75vw] md:w-[46vw] max-w-170 h-auto object-contain"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Event schedule preview */}
      <div className="absolute left-1/2 top-[82%] md:top-[85%] -translate-x-1/2 flex flex-wrap justify-center gap-3 md:gap-6 z-20 px-4">
        <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16]/80 border border-[#FF2BD6]/30 rounded-lg backdrop-blur-sm">
          <Calendar size={14} className="text-[#FF2BD6]" />
          <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Feb 12-13</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16]/80 border border-[#7B2BFF]/30 rounded-lg backdrop-blur-sm">
          <Gift size={14} className="text-[#7B2BFF]" />
          <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Surprises</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16]/80 border border-[#00F0FF]/30 rounded-lg backdrop-blur-sm">
          <Music size={14} className="text-[#00F0FF]" />
          <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Live Music</span>
        </div>
      </div>

      {/* CTA - bottom center on mobile, bottom right on desktop */}
      <button
        ref={ctaRef}
        className="absolute left-1/2 md:left-auto right-auto md:right-[7vw] top-[92%] md:top-[86%] -translate-x-1/2 md:translate-x-0 cyber-button border-[#FF2BD6] z-20 group pulse-glow text-sm md:text-base"
        style={{ opacity: 0 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Heart size={16} className="animate-pulse" />
          Explore the Week
        </span>
      </button>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart, i) => (
          <Heart
            key={i}
            size={heart.size}
            className="absolute text-[#FF2BD6]/20"
            style={{
              left: heart.left,
              top: heart.top,
              animation: `float-heart ${heart.duration}s ease-in-out infinite`,
              animationDelay: `${heart.delay}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float-heart {
          0%, 100% { 
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% { 
            transform: translateY(-30px) scale(1.1);
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
}