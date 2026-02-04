import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Cpu, Code, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TechArenaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleTechRef = useRef<HTMLDivElement>(null);
  const titleArenaRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const descriptorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;

    // On mobile: no animations, no pinning - just show content
    if (isMobile) {
      // Make all elements visible immediately
      gsap.set([titleTechRef.current, titleArenaRef.current, droneRef.current, descriptorRef.current, ctaRef.current, labelRef.current], {
        opacity: 1, x: 0, y: 0, scale: 1, rotate: 0
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
        titleTechRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        titleArenaRef.current,
        { x: '-55vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        droneRef.current,
        { y: '76vh', scale: 0.85, rotate: -6, opacity: 0 },
        { y: '24vh', scale: 1, rotate: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        descriptorRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // SETTLE (30% - 70%): Hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        titleTechRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        titleArenaRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        droneRef.current,
        { y: '6vh', scale: 1, opacity: 1 },
        { y: '28vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        descriptorRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(
        labelRef.current,
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
      className="relative w-full h-screen bg-[#05060B] overflow-hidden hex-grid"
    >
      {/* Hex grid overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-[#05060B] via-transparent to-[#05060B]" />

      {/* Title stack - left side on desktop, centered on mobile */}
      <div
        ref={titleTechRef}
        className="absolute left-1/2 md:left-[7vw] top-[14%] md:top-[18%] -translate-x-1/2 md:translate-x-0 z-20 text-center md:text-left"
        style={{ opacity: 0 }}
      >
        <h2 className="font-orbitron font-black text-[clamp(40px,7.5vw,120px)] text-[#F4F6FF] tracking-widest text-glow-violet">
          TECH
        </h2>
      </div>

      <div
        ref={titleArenaRef}
        className="absolute left-1/2 md:left-[7vw] top-[24%] md:top-[32%] -translate-x-1/2 md:translate-x-0 z-20 text-center md:text-left"
        style={{ opacity: 0 }}
      >
        <h2 className="font-orbitron font-black text-[clamp(40px,7.5vw,120px)] text-[#F4F6FF] tracking-widest text-glow-cyan">
          ARENA
        </h2>
      </div>

      {/* Drone image - professional flexbox centering */}
      <div className="absolute inset-0 flex items-center mt-96 justify-center z-10 pointer-events-none">
        <img
          ref={droneRef}
          src="/tech_drone.png"
          alt="Tech Drone"
          className="w-[80vw] md:w-[54vw] max-w-205 h-auto object-contain floating"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Descriptor - right side on desktop, bottom on mobile */}
      <div
        ref={descriptorRef}
        className="absolute left-1/2 md:left-[56vw] top-[72%] md:top-[26%] -translate-x-1/2 md:translate-x-0 w-[85vw] md:w-[38vw] z-20 text-center md:text-left"
        style={{ opacity: 0 }}
      >
        <p className="font-inter text-[clamp(12px,1.2vw,18px)] text-[#A7B0C8] leading-relaxed">
          Hackathons. AI builds. UI wars. Compete for glory and prizes in the ultimate
          battleground of innovation.
        </p>

        {/* Event categories */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mt-4 md:mt-6">
          <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16] border border-[#7B2BFF]/30 rounded-lg">
            <Code size={14} className="text-[#7B2BFF]" />
            <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Coding</span>
          </div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16] border border-[#00F0FF]/30 rounded-lg">
            <Cpu size={14} className="text-[#00F0FF]" />
            <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">AI/ML</span>
          </div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16] border border-[#FF2BD6]/30 rounded-lg">
            <Palette size={14} className="text-[#FF2BD6]" />
            <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Design</span>
          </div>
        </div>
      </div>

      {/* Sector label - bottom left */}
      <span
        ref={labelRef}
        className="absolute left-[4vw] md:left-[7vw] top-[88%] md:top-[86%] font-mono text-[9px] md:text-xs text-[#A7B0C8]/60 tracking-widest z-20 hidden md:block"
        style={{ opacity: 0 }}
      >
        SECTOR 01
      </span>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-[10vw] w-px h-32 bg-linear-to-b from-transparent via-[#7B2BFF]/50 to-transparent" />
      <div className="absolute bottom-1/4 left-[15vw] w-px h-24 bg-linear-to-b from-transparent via-[#00F0FF]/30 to-transparent" />
    </section>
  );
}