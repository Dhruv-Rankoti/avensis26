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
        { y: '-30vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        stageRef.current,
        { y: '65vh', scale: 0.85, rotateX: 18, opacity: 0 },
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
        particlesRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.1
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
        stageRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '24vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
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
        particlesRef.current,
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
        className="absolute left-1/2 top-[14%] -translate-x-1/2 font-orbitron font-black text-[clamp(40px,5vw,80px)] text-[#F4F6FF] tracking-[0.12em] text-glow-magenta z-20 whitespace-nowrap"
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
          className="w-[56vw] max-w-210 h-auto object-contain rounded-xl overflow-hidden"
          style={{ opacity: 0, perspective: '1000px' }}
        />
      </div>

      {/* Descriptor - bottom center */}
      <div
        ref={descriptorRef}
        className="absolute left-1/2 top-[82%] -translate-x-1/2 max-w-[44vw] text-center z-20"
        style={{ opacity: 0 }}
      >
        <p className="font-inter text-[clamp(14px,1.2vw,18px)] text-[#A7B0C8] leading-relaxed">
          Music. Dance. Drama. Open mic nights.
          <br />
          Unleash your creativity under the neon lights.
        </p>

        {/* Event categories */}
        <div className="flex justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0B0E16]/80 border border-[#FF2BD6]/30 rounded-lg backdrop-blur-sm">
            <Music size={16} className="text-[#FF2BD6]" />
            <span className="font-mono text-xs text-[#A7B0C8]">Music</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0B0E16]/80 border border-[#7B2BFF]/30 rounded-lg backdrop-blur-sm">
            <Drama size={16} className="text-[#7B2BFF]" />
            <span className="font-mono text-xs text-[#A7B0C8]">Dance</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0B0E16]/80 border border-[#00F0FF]/30 rounded-lg backdrop-blur-sm">
            <Mic size={16} className="text-[#00F0FF]" />
            <span className="font-mono text-xs text-[#A7B0C8]">Open Mic</span>
          </div>
        </div>
      </div>

      {/* CTA - bottom */}
      <button
        ref={ctaRef}
        className="absolute left-1/2 top-[90%] -translate-x-1/2 cyber-button border-[#FF2BD6] z-20 group"
        style={{ opacity: 0 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles size={16} />
          See Cultural Events
        </span>
      </button>

      {/* Decorative stage lights */}
      <div className="absolute top-0 left-1/4 w-px h-40 bg-linear-to-b from-[#FF2BD6]/50 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-40 bg-linear-to-b from-[#7B2BFF]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 w-px h-32 bg-linear-to-b from-[#00F0FF]/30 to-transparent" />

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