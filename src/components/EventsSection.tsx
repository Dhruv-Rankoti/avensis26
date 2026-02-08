import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, Gamepad2, Cpu, Music, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', label: 'All', icon: null },
  { id: 'tech', label: 'Tech', icon: Code },
  { id: 'gaming', label: 'Esports', icon: Gamepad2 },
  { id: 'robotics', label: 'Robotics', icon: Cpu },
  { id: 'funactivity', label: 'Fun & Activity', icon: Heart },
];

const events = [
  {
    id: 1,
    title: 'HackAvensis',
    description: 'Build innovative solutions to real-world problems in a 24 -hour hackathon.',
    category: 'tech',
    image: '/hackavensis.jpeg',
    // tags: ['AI/ML', 'Competition'],
    registerLink: 'https://unstop.com/hackathons/hackavensis-maharaja-surajmal-institute-of-technology-msit-new-delhi-1635937',
  },
  {
    id: 2,
    title: 'CodeCubicle',
    description: 'Solve algorithmic problems, optimize your code, and compete for the top spot.',
    category: 'tech',
    image: '/event_hackathon.jpg',
    // tags: ['Competition', '24 Hours'],
    registerLink: '#codecubicle',
  },
  {
    id: 3,
    title: 'Uxccelerate',
    description: 'Design competition for the next generation of digital experiences.',
    category: 'tech',
    image: '/UxCelebrate.jpeg',
    // tags: ['Design', 'Workshop'],
    registerLink: 'https://unstop.com/p/uxcelebrate-2026-msit-1636032',
  },
  {
    id: 4,  
    title: 'CTF',
    description: 'Test your cybersecurity skills, solve challenges, and capture the flag before your rivals.',
    category: 'tech',
    image: '/ctf.jpeg',
    // tags: ['CTF', '₹10K Prize'],
    registerLink: 'https://tinyurl.com/o-day-legion',
  },
  {
    id: 5,
    title: 'Robosoccer',
    description: 'Robotic soccer match where bots battle it out on the field.',
    category: 'robotics',
    image: '/robosoccer.jpeg',
    // tags: ['Robotics', 'Show'],
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfusGSvqwObmI_pquQn_5_8ubQ2kvuRH57TXgfldawQASIrPA/viewform',
  },
  {
    id: 6,
    title: 'Roborace',
    description: 'Autonomous robots race against each other in a thrilling test of speed and engineering.',
    category: 'robotics',
    image: '/roborace.jpeg',
    // tags: ['Music', 'Live'],
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdLU7-QOmOglTFu700QLXMpgx2gCmEbcN-IyOOt6Ko-2Uiqug/viewform',
  },
  {
    id: 7,
    title: 'Roboforge',
    description: 'Showcase your engineering skills by building and battling custom robots in a creative robotics challenge.',
    category: 'robotics',
    image: '/roboforge.jpeg',
    // tags: ['Special', 'Feb 14'],
    registerLink: 'https://docs.google.com/forms/d/e/1FAIpQLSdzEVq-3sE-BLL3MIbj-ewHXrl3DEx71_pEn9LywXQFJDQ3zQ/viewform',
  },
  {
    id: 8,
    title: 'Chess Tournament',
    description: 'Outsmart your opponents, plan your moves, and claim the checkmate.',
    category: 'gaming',
    image: '/chess.jpeg',
    // tags: ['Esports', 'Chess'],
    registerLink: 'https://forms.gle/2EqUH7Hnz6LLiK5x7',
  },
  {
    id: 9,
    title: 'Crown War',
    description: 'Build your deck, outsmart your opponent, and battle for the crown in real-time strategy duels.',
    category: 'gaming',
    image: '/clashroyale.jpeg',
    // tags: ['Esports', 'Racing'],
    registerLink: 'https://forms.gle/g43ugQ3UrJycky4r5',
  },
  {
    id: 10,
    title: 'KillFeast',
    description: 'Squad up and battle for glory in the ultimate mobile esports tournament.',
    category: 'gaming',
    image: '/bgmi.jpeg',
    // tags: ['Esports', 'Combat'],
    registerLink: 'https://forms.gle/vFcWCFNJF6Nvyy1YA',
  },
  {
    id: 11,
    title: 'Ace and Chaos',
    description: 'A high-energy card and strategy game event where luck and skill collide for chaotic fun.',
    category: 'funactivity',
    image: '/event_aceandchaos.jpg',
    // tags: ['Special', 'Feb 14'],
    registerLink: '#aceandchaos',
  },
  {
    id: 12,
    title: 'Murder Mystery',
    description: 'Unravel clues and solve the mystery in this thrilling whodunit experience.',
    category: 'funactivity',
    image: '/event_murdermystery.jpg',
    // tags: ['Special', 'Feb 14'],
    registerLink: '#murdermystery',
  },
  {
    id: 13,
    title: 'Hands off Standstill',
    description: 'Test your patience and precision—keep your hands off and see who stands still the longest.',
    category: 'funactivity',
    image: '/event_handsoffstandstill.jpg',
    // tags: ['Special', 'Feb 14'],
    registerLink: '#handsoffstandstill',
  },
  {
    id: 14,
    title: 'Cup Challenge',
    description: 'Compete in a fast-paced cup stacking challenge—speed and accuracy win the day.',
    category: 'funactivity',
    image: '/event_cupchallenge.jpg',
    // tags: ['Special', 'Feb 14'],
    registerLink: '#cupchallenge',
  },
];

export default function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(e => e.category === activeCategory);

  const getInitialCount = () => {
    const width = window.innerWidth;
    if (width >= 1024) return 10;
    if (width >= 640) return 6;
    return 4;
  };

  useEffect(() => {
    const handleResize = () => setVisibleCount(getInitialCount());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayedEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = visibleCount < filteredEvents.length;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Filters animation
      if (filtersRef.current) {
        const pills = filtersRef.current.querySelectorAll('button');
        gsap.fromTo(
          pills,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            scrollTrigger: {
              trigger: filtersRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.event-card');
        gsap.fromTo(
          cards,
          { y: 40, scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [filteredEvents]);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative w-full bg-[#05060B] py-12 md:py-20 lg:py-32 circuit-bg"
    >
      <div className="w-full px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-6 md:mb-10">
          <h2 className="font-orbitron font-black text-[clamp(32px,4vw,64px)] text-[#F4F6FF] tracking-widest text-glow-violet mb-2 md:mb-4">
            EVENTS
          </h2>
          <p className="font-inter text-[#A7B0C8] text-base md:text-lg">
            Pick your battlefield.
          </p>
        </div>

        {/* Category filters */}
        <div ref={filtersRef} className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(getInitialCount());
                }}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full font-mono text-xs md:text-sm tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#7B2BFF] text-white border-glow'
                    : 'bg-[#0B0E16] text-[#A7B0C8] border border-white/10 hover:border-[#7B2BFF]/50'
                }`}
              >
                {Icon && <Icon size={14} />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Events grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
        >
          {displayedEvents.map((event) => (
            <div
              key={event.id}
              className="event-card cyber-card group relative"
            >
              {/* Image */}
              <div className="relative aspect-9/16 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#05060B] via-transparent to-transparent" />
                
                {/* Tags */}
                {/* <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 flex gap-1.5 md:gap-2 z-20">
                  {event.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-1.5 md:px-2 py-0.5 md:py-1 bg-[#0B0E16]/90 backdrop-blur-sm rounded text-[9px] md:text-[10px] font-mono text-[#A7B0C8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div> */}
                {/* Overlay moved to bottom, pointer-events-none */}
                <div className="absolute inset-0 bg-linear-to-t from-[#05060B] via-transparent to-transparent pointer-events-none z-0" />
              </div>

              {/* Content */}
              <div className="p-4 md:p-5 z-20 relative">
                <h3 className="font-orbitron font-bold text-base md:text-lg text-[#F4F6FF] mb-2 group-hover:text-[#7B2BFF] transition-colors">
                  {event.title}
                </h3>
                <p className="font-inter text-xs md:text-sm text-[#A7B0C8] leading-relaxed mb-3 line-clamp-2">
                  {event.description}
                </p>
                <a
                  href={event.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#7B2BFF] to-[#9D4EDD] text-white text-xs font-mono font-bold rounded-md hover:from-[#9D4EDD] hover:to-[#7B2BFF] transition-all duration-300 border border-[#7B2BFF]/50 hover:border-[#9D4EDD] hover:shadow-[0_0_15px_rgba(123,43,255,0.5)]"
                >
                  <span>REGISTER</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8 md:mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + getInitialCount())}
              className="cyber-button group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Load More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
