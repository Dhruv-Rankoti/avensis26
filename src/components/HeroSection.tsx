import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Robot entrance
      tl.fromTo(
        robotRef.current,
        { y: '18vh', scale: 0.92, opacity: 0 },
        { y: '12vh', scale: 1, opacity: 1, duration: 0.9 },
        0.2
      );

      // Title character animation
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.02 },
          0.3
        );
      }

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.6
      );

      // Microcopy
      tl.fromTo(
        microcopyRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        0.7
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5 },
        0.8
      );

      // Waves
      tl.fromTo(
        wavesRef.current,
        { opacity: 0 },
        { opacity: 0.25, duration: 0.8 },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation - Desktop only
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth < 768;
    
    // On mobile: no scroll animations, no pinning
    if (isMobile) return;

    // Desktop: Full scroll-driven animations
    const ctx = gsap.context(() => {
      // Title exit animation on scroll down
      gsap.fromTo(
        titleRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -40,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'bottom center',
            end: 'bottom top',
            scrub: 1,
            markers: false,
          },
        }
      );

      // Tagline exit animation
      gsap.fromTo(
        taglineRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -30,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'bottom center',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Robot exit animation
      gsap.fromTo(
        robotRef.current,
        { opacity: 1, y: 0, scale: 1 },
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'bottom center',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Microcopy exit animation
      gsap.fromTo(
        microcopyRef.current,
        { opacity: 1, x: 0 },
        {
          opacity: 0,
          x: -30,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'bottom center',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // CTA exit animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 1, x: 0 },
        {
          opacity: 0,
          x: 30,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'bottom center',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Waves fade out
      gsap.fromTo(
        wavesRef.current,
        { opacity: 0.25 },
        {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'bottom center',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const titleText = "AVENSIS'26";

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#05060B] overflow-hidden"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80" />
      
      {/* Signal waves */}
      <div
        ref={wavesRef}
        className="absolute inset-0 overflow-hidden opacity-0"
      >
        <svg
          className="absolute w-[200%] h-full signal-wave"
          viewBox="0 0 2000 800"
          preserveAspectRatio="none"
        >
          <path
            d="M0 400 Q 250 200, 500 400 T 1000 400 T 1500 400 T 2000 400"
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="2"
            opacity="0.3"
          />
          <path
            d="M0 450 Q 250 250, 500 450 T 1000 450 T 1500 450 T 2000 450"
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="1.5"
            opacity="0.2"
          />
          <path
            d="M0 350 Q 250 150, 500 350 T 1000 350 T 1500 350 T 2000 350"
            fill="none"
            stroke="url(#waveGradient)"
            strokeWidth="1"
            opacity="0.15"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7B2BFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00F0FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#7B2BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Robot image - professional flexbox centering */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <img
          ref={robotRef}
          src="/hero_robot.png"
          alt="Futuristic Robot"
          className="w-[85vw] md:w-[62vw] max-w-225 h-auto object-contain floating"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Title */}
      <h1
        ref={titleRef}
        className="absolute left-1/2 top-[14%] md:top-[14%] -translate-x-1/2 font-orbitron font-black text-[clamp(32px,6.2vw,96px)] text-[#F4F6FF] text-glow-violet tracking-[0.08em] md:tracking-[0.12em] z-20 whitespace-nowrap"
      >
        {titleText.split('').map((char, i) => (
          <span key={i} className="char inline-block" style={{ opacity: 0 }}>
            {char}
          </span>
        ))}
      </h1>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="absolute left-1/2 top-[28%] md:top-[28%] -translate-x-1/2 font-inter font-medium text-[clamp(11px,1.4vw,20px)] text-[#A7B0C8] tracking-[0.15em] md:tracking-[0.3em] uppercase z-20"
        style={{ opacity: 0 }}
      >
        Enter the Future
      </p>

      {/* Microcopy */}
      <div
        ref={microcopyRef}
        className="absolute left-1/2 md:left-[6vw] top-[68%] md:top-[62%] -translate-x-1/2 md:translate-x-0 max-w-[85vw] md:max-w-[28vw] text-center md:text-left z-20"
        style={{ opacity: 0 }}
      >
        <p className="font-mono text-[10px] md:text-xs text-[#A7B0C8] leading-relaxed">
          <span className="text-[#7B2BFF]">{'>'}</span> Two days of tech, competition, and culture.
          <br />
          <span className="text-[#00F0FF]">{'>'}</span> Feb 12–13, 2026
        </p>
      </div>

      {/* CTA Button */}
      <button
        ref={ctaRef}
        className="absolute left-1/2 md:left-auto right-auto md:right-[6vw] top-[78%] md:top-[62%] -translate-x-1/2 md:translate-x-0 cyber-button z-20 group text-sm md:text-base"
        style={{ opacity: 0 }}
        onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="relative z-10 flex items-center gap-2">
          Explore Events
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </button>

      {/* Decorative corner elements */}
      <div className="absolute top-16 md:top-20 left-3 md:left-6 w-10 h-10 md:w-16 md:h-16 border-l-2 border-t-2 border-[#7B2BFF]/30" />
      <div className="absolute top-16 md:top-20 right-3 md:right-6 w-10 h-10 md:w-16 md:h-16 border-r-2 border-t-2 border-[#7B2BFF]/30" />
      <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 w-10 h-10 md:w-16 md:h-16 border-l-2 border-b-2 border-[#7B2BFF]/30" />
      <div className="absolute bottom-3 md:bottom-6 right-3 md:right-6 w-10 h-10 md:w-16 md:h-16 border-r-2 border-b-2 border-[#7B2BFF]/30" />
    </section>
  );
}