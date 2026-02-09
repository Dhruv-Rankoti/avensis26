import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Star } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const sponsorTiers = [
  {
    name: 'Title Partner',
    icon: Award,
    color: '#FFAA2B',
    sponsors: [
      { name: 'Saras.ai', logo: '/sponsors/sarasai.png' },
    ],
  },
  {
    name: 'Associate',
    icon: Star,
    color: '#00F0FF',
    sponsors: [
      { name: 'AbhiBus', logo: '/sponsors/abhibus.png' },
      { name: 'Unstop', logo: '/sponsors/unstop.png' },
    ],
  },
];

export default function SponsorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Tiers animation
      if (tiersRef.current) {
        const tiers = tiersRef.current.querySelectorAll('.sponsor-tier');
        tiers.forEach((tier, index) => {
          const logos = tier.querySelectorAll('.sponsor-logo');
          
          gsap.fromTo(
            tier.querySelector('.tier-header'),
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: tier,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          gsap.fromTo(
            logos,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.05,
              delay: index * 0.1 + 0.2,
              scrollTrigger: {
                trigger: tier,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative w-full bg-[#05060B] py-12 md:py-20 lg:py-32"
    >
      <div className="w-full px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2
            ref={titleRef}
            className="font-orbitron font-black text-[clamp(32px,4vw,64px)] text-[#F4F6FF] tracking-widest text-glow-violet mb-2 md:mb-4"
          >
            SPONSORS
          </h2>
          <p className="font-inter text-[#A7B0C8] text-base md:text-lg">
            Powered by industry leaders
          </p>
        </div>

        {/* Sponsor tiers */}
        <div ref={tiersRef} className="space-y-12 md:space-y-16">
          {sponsorTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div key={tier.name} className="sponsor-tier">
                {/* Tier header */}
                <div className="tier-header flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
                  <Icon size={18} style={{ color: tier.color }} className="md:w-5 md:h-5" />
                  <span
                    className="font-mono text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </span>
                  <div
                    className="w-12 md:w-16 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }}
                  />
                </div>

                {/* Sponsor logos */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {tier.sponsors.map((sponsor) => {
                    const isTitle = tier.name === 'Title Partner';
                    return (
                      <div
                        key={sponsor.name}
                        className={`sponsor-logo group relative ${isTitle ? 'w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64' : 'w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40'} bg-[#0B0E16] border border-white/10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[#7B2BFF]/50 hover:-translate-y-1`}
                      >
                        {/* Glow effect */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            boxShadow: `0 0 30px ${tier.color}20`,
                          }}
                        />
                        
                        {/* Logo content */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                          {sponsor.logo ? (
                            <Image
                              src={sponsor.logo}
                              alt={sponsor.name}
                              fill
                              className="object-contain p-4"
                            />
                          ) : (
                            <>
                              <p className="font-mono text-[10px] md:text-xs text-[#A7B0C8] mt-1 md:mt-2">
                                {sponsor.name}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Become a sponsor CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="font-inter text-[#A7B0C8] mb-4 md:mb-6 text-sm md:text-base">
            Want to sponsor AVENSIS'26?
          </p>
          <a href="mailto:avensis@msit.in" className="cyber-button text-sm md:text-base inline-block">
            <span className="relative z-10">Become a Sponsor</span>
          </a>
        </div>
      </div>
    </section>
  );
}