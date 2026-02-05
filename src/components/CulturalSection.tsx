import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Mic, Drama, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CulturalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLImageElement>(null);
  const descriptorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Generate particles on client-side only to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate random particles only on client
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
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
      gsap.set([titleRef.current, stageRef.current, descriptorRef.current, ctaRef.current, particlesRef.current], {
        opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0
      });
      return;
    }

    // Desktop: Full animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
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
        stageRef.current,
        { y: 50, scale: 0.9, opacity: 0 },
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
        descriptorRef.current,
        { y: 30, opacity: 0 },
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
        ctaRef.current,
        { y: 30, opacity: 0 },
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

      gsap.fromTo(
        particlesRef.current,
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#05060B] overflow-hidden"
    >
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }}>
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FF2BD6]/40 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              animation: `float-particle ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Title - top center */}
      <h2
        ref={titleRef}
        className="absolute left-1/2 top-[12%] md:top-[14%] -translate-x-1/2 font-orbitron font-black text-[clamp(28px,5vw,80px)] text-[#F4F6FF] tracking-[0.08em] md:tracking-[0.12em] text-glow-magenta z-20 whitespace-nowrap px-4"
        style={{ opacity: 0 }}
      >
        CULTURAL & FUN
      </h2>

      {/* Stage image - professional flexbox centering */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <img
          ref={stageRef}
          src="/cultural_stage.png"
          alt="Cultural Stage"
          className="w-[85vw] md:w-[56vw] max-w-210 h-auto object-contain rounded-xl overflow-hidden"
          style={{ opacity: 0, perspective: '1000px' }}
        />
      </div>

      {/* Descriptor - bottom center */}
      <div
        ref={descriptorRef}
        className="absolute left-1/2 top-[80%] md:top-[82%] -translate-x-1/2 max-w-[90vw] md:max-w-[44vw] text-center z-20 px-4 md:px-0"
        style={{ opacity: 0 }}
      >
        <p className="font-inter text-[clamp(12px,1.2vw,18px)] text-[#A7B0C8] leading-relaxed">
          Music. Dance. Drama. Open mic nights.
          <br />
          Unleash your creativity under the neon lights.
        </p>

        {/* Event categories */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4 md:mt-6">
          <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16]/80 border border-[#FF2BD6]/30 rounded-lg backdrop-blur-sm">
            <Music size={14} className="text-[#FF2BD6]" />
            <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Music</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16]/80 border border-[#7B2BFF]/30 rounded-lg backdrop-blur-sm">
            <Drama size={14} className="text-[#7B2BFF]" />
            <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Dance</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#0B0E16]/80 border border-[#00F0FF]/30 rounded-lg backdrop-blur-sm">
            <Mic size={14} className="text-[#00F0FF]" />
            <span className="font-mono text-[10px] md:text-xs text-[#A7B0C8]">Open Mic</span>
          </div>
        </div>
      </div>

      {/* Decorative stage lights */}
      <div className="absolute top-0 left-1/4 w-px h-24 md:h-40 bg-linear-to-b from-[#FF2BD6]/50 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-24 md:h-40 bg-linear-to-b from-[#7B2BFF]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 w-px h-20 md:h-32 bg-linear-to-b from-[#00F0FF]/30 to-transparent" />

      <style>{`
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
}