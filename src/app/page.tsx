'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/src/components/shared/Navigation';
import HeroSection from '@/src/components/HeroSection';
import TechArenaSection from '@/src/components/TechArenaSection';
import EsportsSection from '@/src/components/EsportsSection';
import RoboRaceSection from '@/src/components/RoboRaceSection';
import CulturalSection from '@/src/components/CulturalSection';
import ConfessionSection from '@/src/components/ConfessionSection';
import EventsSection from '@/src/components/EventsSection';
import ScheduleSection from '@/src/components/ScheduleSection';
import SponsorsSection from '@/src/components/SponsorsSection';
import FooterSection from '@/src/components/shared/FooterSection';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ScrollTrigger: any;

    // Dynamically import ScrollTrigger to avoid SSR issues
    import('gsap/ScrollTrigger').then((module) => {
      ScrollTrigger = module.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Wait for all sections to mount before setting up global snap
      const timer = setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        
        // Skip scroll snap on mobile - natural scroll
        if (isMobile) return;

        // Desktop only: Apply scroll snap
        const pinned = ScrollTrigger.getAll()
          .filter((st: any) => st.vars.pin)
          .sort((a: any, b: any) => a.start - b.start);
        
        const maxScroll = ScrollTrigger.maxScroll(window);
        
        if (!maxScroll || pinned.length === 0) return;

        const pinnedRanges = pinned.map((st: any) => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              const inPinned = pinnedRanges.some(
                (r: any) => value >= r.start - 0.15 && value <= r.end + 0.15
              );
              if (!inPinned) return value;

              const target = pinnedRanges.reduce(
                (closest: number, r: any) =>
                  Math.abs(r.center - value) < Math.abs(closest - value)
                    ? r.center
                    : closest,
                pinnedRanges[0]?.center ?? 0
              );
              return target;
            },
            duration: { min: 0.4, max: 0.8 },
            delay: 0,
            ease: 'power3.inOut',
          },
        });
      }, 800);

      return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach((st: any) => st.kill());
      };
    });

    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((st: any) => st.kill());
      }
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-[#05060B] min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Scanline effect */}
      <div className="scanline" />
      
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <div className="relative z-10">
          <HeroSection />
        </div>        
        <div className="relative z-20">
          <TechArenaSection />
        </div>        
        <div className="relative z-30">
          <EsportsSection />
        </div>        
        <div className="relative z-40">
          <RoboRaceSection />
        </div>        
        <div className="relative z-50">
          <CulturalSection />
        </div>        
        <div className="relative z-60">
          <ConfessionSection />
        </div>
        
        {/* Flowing sections */}
        <EventsSection />
        <ScheduleSection />
        <SponsorsSection />
        <FooterSection />
      </main>
    </div>
  );
}
