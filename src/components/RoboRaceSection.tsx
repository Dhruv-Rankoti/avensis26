import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flag, Zap, Timer, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function RoboRaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLDivElement>(null);
  const titleRightRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLImageElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;

    // On mobile: no animations, no pinning - just show content
    if (isMobile) {
      // Make all elements visible immediately
      gsap.set([titleLeftRef.current, titleRightRef.current, vehicleRef.current, trackRef.current, ctaRef.current, labelRef.current], {
        opacity: 1, x: 0, y: 0, scale: 1, rotate: 0
      });
      return;
    }

    // Desktop: Full animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleLeftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        titleRightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        vehicleRef.current,
        { y: 60, scale: 0.85, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        trackRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#05060B] overflow-hidden"
    >
      {/* Track arc background */}
      <div
        ref={trackRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        <svg
          className="w-[80vw] h-[60vh] opacity-20"
          viewBox="0 0 800 400"
          fill="none"
        >
          <path
            d="M 50 350 Q 200 50, 400 200 T 750 150"
            stroke="url(#trackGradient)"
            strokeWidth="3"
            strokeDasharray="20 10"
            fill="none"
          />
          <path
            d="M 50 380 Q 200 80, 400 230 T 750 180"
            stroke="url(#trackGradient)"
            strokeWidth="2"
            strokeDasharray="10 15"
            fill="none"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7B2BFF" />
              <stop offset="50%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#FFAA2B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Title - left on desktop, top on mobile */}
      <div
        ref={titleLeftRef}
        className="absolute left-1/2 md:left-[7vw] top-[12%] md:top-[16%] -translate-x-1/2 md:translate-x-0 z-20 text-center md:text-left"
        style={{ opacity: 0 }}
      >
        <h2 className="font-orbitron font-black text-[clamp(36px,5.8vw,92px)] text-[#F4F6FF] tracking-widest text-glow-violet">
          ROBORACE
        </h2>
      </div>

      {/* Title - right on desktop, below roborace on mobile */}
      <div
        ref={titleRightRef}
        className="absolute left-1/2 md:left-auto right-auto md:right-[7vw] top-[20%] md:top-[16%] -translate-x-1/2 md:translate-x-0 z-20 text-center md:text-right"
        style={{ opacity: 0 }}
      >
        <h2 className="font-orbitron font-black text-[clamp(36px,5.8vw,92px)] text-[#F4F6FF] tracking-widest text-glow-cyan">
          TRACK
        </h2>
      </div>

      {/* Vehicle image - professional flexbox centering */}
      <div className="absolute inset-0 mt-4 md:mt-10 flex items-center justify-center z-10 pointer-events-none">
        <img
          ref={vehicleRef}
          src="/roborace_vehicle.png"
          alt="RoboRace Vehicle"
          className="w-[85vw] md:w-[58vw] max-w-215 h-auto object-contain"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Race stats overlay */}
      <div className="absolute left-1/2 top-[72%] md:top-[30%] -translate-x-1/2 flex flex-wrap justify-center gap-3 md:gap-8 z-20 px-4">
        <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16]/80 border border-[#FFAA2B]/30 rounded-lg backdrop-blur-sm">
          <Timer size={14} className="text-[#FFAA2B]" />
          <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Best: 45.2s</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16]/80 border border-[#7B2BFF]/30 rounded-lg backdrop-blur-sm">
          <Zap size={14} className="text-[#7B2BFF]" />
          <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Speed: 120km/h</span>
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16]/80 border border-[#00F0FF]/30 rounded-lg backdrop-blur-sm">
          <MapPin size={14} className="text-[#00F0FF]" />
          <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Track: 2.5km</span>
        </div>
      </div>


      {/* Sector label - bottom left, hidden on mobile */}
      <span
        ref={labelRef}
        className="absolute left-[7vw] top-[86%] font-mono text-xs text-[#A7B0C8]/60 tracking-widest z-20 hidden md:block"
        style={{ opacity: 0 }}
      >
        SECTOR 04
      </span>

      {/* Speed lines effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-linear-to-r from-transparent via-[#FFAA2B]/30 to-transparent"
            style={{
              top: `${30 + i * 10}%`,
              left: '-100%',
              width: '50%',
              animation: `speed-line ${2 + i * 0.5}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes speed-line {
          0% { transform: translateX(0); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </section>
  );
}