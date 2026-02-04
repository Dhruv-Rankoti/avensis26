import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad2, Users, Trophy, Radio } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EsportsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftTagRef = useRef<HTMLDivElement>(null);
  const rightTagRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<HTMLImageElement>(null);
  const descriptorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const hudElementsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;

    // On mobile: no animations, just show content and pin
    if (isMobile) {
      // Make all elements visible immediately
      gsap.set([titleRef.current, leftTagRef.current, rightTagRef.current, controllerRef.current, descriptorRef.current, ctaRef.current, hudElementsRef.current], {
        opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0
      });

      // Just pin without scroll animation
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
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
        { y: '-35vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        leftTagRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        rightTagRef.current,
        { x: '12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        controllerRef.current,
        { y: '70vh', scale: 0.8, rotateX: 25, opacity: 0 },
        { y: 0, scale: 1, rotateX: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        descriptorRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

      scrollTl.fromTo(
        hudElementsRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        titleRef.current,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        leftTagRef.current,
        { x: 0, opacity: 1 },
        { x: '-8vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        rightTagRef.current,
        { x: 0, opacity: 1 },
        { x: '8vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        controllerRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '26vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        descriptorRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.78
      );

      scrollTl.fromTo(
        hudElementsRef.current,
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
      {/* HUD Background elements */}
      <div ref={hudElementsRef} className="absolute inset-0" style={{ opacity: 0 }}>
        {/* Corner brackets */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8 w-12 h-12 md:w-20 md:h-20 border-l-2 border-t-2 border-[#00F0FF]/40" />
        <div className="absolute top-4 md:top-8 right-4 md:right-8 w-12 h-12 md:w-20 md:h-20 border-r-2 border-t-2 border-[#00F0FF]/40" />
        <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 w-12 h-12 md:w-20 md:h-20 border-l-2 border-b-2 border-[#00F0FF]/40" />
        <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 w-12 h-12 md:w-20 md:h-20 border-r-2 border-b-2 border-[#00F0FF]/40" />

        {/* Crosshair center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
          <div className="absolute top-1/2 left-0 w-full h-px bg-[#00F0FF]/30" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-[#00F0FF]/30" />
        </div>

        {/* Scan lines */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,240,255,0.02)_50%)] bg-size-[100%_4px]" />
      </div>

      {/* Left tag */}
      <div
        ref={leftTagRef}
        className="absolute left-[4vw] md:left-[7vw] top-[10%] md:top-[12%] z-20 flex items-center gap-1.5 md:gap-2"
        style={{ opacity: 0 }}
      >
        <Radio size={12} className="text-[#FF2BD6] animate-pulse md:w-4 md:h-4" />
        <span className="font-mono text-[9px] md:text-xs text-[#FF2BD6] tracking-widest">
          LIVE LOBBY
        </span>
      </div>

      {/* Right tag */}
      <div
        ref={rightTagRef}
        className="absolute right-[4vw] md:right-[7vw] top-[10%] md:top-[12%] z-20 flex items-center gap-1.5 md:gap-2"
        style={{ opacity: 0 }}
      >
        <span className="font-mono text-[9px] md:text-xs text-[#00F0FF] tracking-widest">
          BGMI • VALORANT
        </span>
        <Gamepad2 size={12} className="text-[#00F0FF] md:w-4 md:h-4" />
      </div>

      {/* Title - center top */}
      <h2
        ref={titleRef}
        className="absolute left-1/2 top-[16%] md:top-[12%] -translate-x-1/2 font-orbitron font-black text-[clamp(32px,5.2vw,84px)] text-[#F4F6FF] tracking-[0.08em] md:tracking-[0.12em] text-glow-cyan z-20 whitespace-nowrap"
        style={{ opacity: 0 }}
      >
        ESPORTS ZONE
      </h2>

      {/* Controller image - professional flexbox centering */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <img
          ref={controllerRef}
          src="/esports_controller.png"
          alt="Gaming Controller"
          className="w-[80vw] md:w-[52vw] max-w-195 h-auto object-contain"
          style={{ opacity: 0, perspective: '1000px' }}
        />
      </div>

      {/* Descriptor - bottom center */}
      <div
        ref={descriptorRef}
        className="absolute left-1/2 top-[74%] md:top-[78%] -translate-x-1/2 max-w-[88vw] md:max-w-[46vw] text-center z-20 px-4 md:px-0"
        style={{ opacity: 0 }}
      >
        <p className="font-inter text-[clamp(12px,1.2vw,18px)] text-[#A7B0C8] leading-relaxed">
          Squad up. Clutch plays. Tournament brackets and live streams.
          <br className="hidden md:block" />
          The arena awaits champions.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4 md:mt-6">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Users size={14} className="text-[#7B2BFF]" />
            <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">128 Teams</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Trophy size={14} className="text-[#FFAA2B]" />
            <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">₹1L+ Prizes</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Radio size={14} className="text-[#FF2BD6]" />
            <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Live Stream</span>
          </div>
        </div>
      </div>

      {/* CTA - bottom center on mobile, bottom right on desktop */}
      <button
        ref={ctaRef}
        className="absolute left-1/2 md:left-auto right-auto md:right-[7vw] top-[90%] md:top-[86%] -translate-x-1/2 md:translate-x-0 cyber-button border-[#00F0FF] z-20 group text-sm md:text-base"
        style={{ opacity: 0 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Gamepad2 size={16} />
          Join the Lobby
        </span>
      </button>

      {/* Neon rim lighting effect */}
      <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-225 h-[60vh] bg-gradient-radial from-[#00F0FF]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
    </section>
  );
}