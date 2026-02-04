import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const scheduleData = [
  {
    day: 'Day 1',
    date: 'February 12, 2026',
    events: [
      {
        time: '10:00',
        title: 'BGMI Tournament',
        location: 'MSIT classroom',
        type: 'gaming',
        description: 'Mobile gaming championship'
      },
      {
        time: '10:00',
        title: 'Tekken Tournament',
        location: 'MSI 1st Floor lab',
        type: 'gaming',
        description: 'Fighting game competition'
      },
      {
        time: '10:30',
        title: 'Hackathon',
        location: '1st floor MSIT, 06 auditorium',
        type: 'tech',
        description: '24-hour coding marathon'
      },
      {
        time: '11:00',
        title: 'UI/UX Design',
        location: 'Ground Floor 05.01',
        type: 'tech',
        description: 'User interface design competition'
      },
      {
        time: '11:00',
        title: 'Ace and Chaos',
        location: 'Ground',
        type: 'funactivity',
        description: 'Card game strategy event'
      },
      {
        time: '11:00',
        title: 'Mystery Murder',
        location: 'Classroom',
        type: 'funactivity',
        description: 'Interactive mystery solving game'
      },
      {
        time: '11:00',
        title: 'Hands off, Stand Still',
        location: 'Ground',
        type: 'funactivity',
        description: 'Patience and endurance challenge'
      },
      {
        time: '11:00',
        title: 'Stack Attack (Card Game)',
        location: 'Ground',
        type: 'funactivity',
        description: 'Fast-paced card stacking game'
      },
      {
        time: '11:00',
        title: 'Beat Bingo',
        location: 'Ground',
        type: 'funactivity',
        description: 'Musical bingo challenge'
      },
      {
        time: '11:00',
        title: 'Roborace',
        location: 'badminton court',
        type: 'robotics',
        description: 'Autonomous robot racing'
      },
      {
        time: '11:00',
        title: 'Robosoccer',
        location: 'badminton court',
        type: 'robotics',
        description: 'Robot soccer competition'
      },
      {
        time: '12:30',
        title: 'Pehchan',
        location: 'Auditorium',
        type: 'cultural',
        description: 'Cultural recognition event'
      },
      {
        time: 'Full Day',
        title: 'Senatus',
        location: 'MSIT Rooms + 406 Sem Hall',
        type: 'cultural',
        description: 'Senate simulation and debate'
      }
    ]
  },
  {
    day: 'Day 2',
    date: 'February 13, 2026',
    events: [
      {
        time: '10:00',
        title: 'Chess Tournament',
        location: 'MSIT classroom',
        type: 'gaming',
        description: 'Strategic chess competition'
      },
      {
        time: '10:00',
        title: 'Clash Royale Tournament',
        location: 'MSIT classroom',
        type: 'gaming',
        description: 'Mobile strategy game tournament'
      },
      {
        time: '10:00',
        title: 'Roboforge',
        location: 'Seminar hall',
        type: 'robotics',
        description: 'Robot building and battling'
      },
      {
        time: '11:00',
        title: 'AlgoQuest',
        location: '1st floor lab',
        type: 'tech',
        description: 'Algorithm programming challenge'
      },
      {
        time: '11:00',
        title: 'Catch The Flag',
        location: 'Ground Floor 05.01',
        type: 'tech',
        description: 'Cybersecurity CTF challenge'
      },
      {
        time: '11:00',
        title: 'Ace and Chaos',
        location: 'Ground',
        type: 'funactivity',
        description: 'Card game strategy event'
      },
      {
        time: '11:00',
        title: 'Mystery Murder',
        location: 'Classroom',
        type: 'funactivity',
        description: 'Interactive mystery solving game'
      },
      {
        time: '11:00',
        title: 'Hands off, Stand Still',
        location: 'Ground',
        type: 'funactivity',
        description: 'Patience and endurance challenge'
      },
      {
        time: '11:00',
        title: 'Stack Attack (Card Game)',
        location: 'Ground',
        type: 'funactivity',
        description: 'Fast-paced card stacking game'
      },
      {
        time: '11:00',
        title: 'Beat Bingo',
        location: 'Ground',
        type: 'funactivity',
        description: 'Musical bingo challenge'
      },
      {
        time: 'Full Day',
        title: 'Senatus',
        location: 'MSIT Rooms + 406 Sem Hall',
        type: 'cultural',
        description: 'Senate simulation and debate'
      },
      {
        time: 'All Day',
        title: 'Vibe Check',
        location: 'Msit Stage',
        type: 'cultural',
        description: 'Cultural vibe and energy showcase'
      }
    ]
  }
];

const typeColors = {
  tech: '#7B2BFF',
  gaming: '#00F0FF',
  robotics: '#FF2BD6',
  cultural: '#FFAA2B',
  funactivity: '#00F0FF'
};

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [activeDay, setActiveDay] = useState(0);

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

      // Tabs animation
      if (tabsRef.current) {
        const tabs = tabsRef.current.querySelectorAll('button');
        gsap.fromTo(
          tabs,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Timeline animation
      if (contentRef.current) {
        const timelineItems = contentRef.current.querySelectorAll('.timeline-item');
        gsap.fromTo(
          timelineItems,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [activeDay]);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative w-full bg-[#05060B] py-20 lg:py-32 overflow-x-hidden"
      style={{ maxWidth: '100vw' }}
    >
      {/* Circuit pattern background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10h20M10 0v20" stroke="#7B2BFF" strokeWidth="0.5" fill="none"/>
              <circle cx="10" cy="10" r="1" fill="#7B2BFF"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      <div className="relative w-full max-w-[100vw] px-4 sm:px-6 lg:px-12 box-border overflow-x-hidden">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h2 className="font-orbitron font-black text-[clamp(36px,4vw,64px)] text-[#F4F6FF] tracking-widest text-glow-violet mb-4">
            SCHEDULE
          </h2>
          <p className="font-inter text-[#A7B0C8] text-lg">
            Your roadmap to the future.
          </p>
        </div>

        {/* Day Tabs */}
        <div ref={tabsRef} className="flex gap-4 mb-12">
          {scheduleData.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`cyber-button ${
                activeDay === index ? 'active' : ''
              } flex items-center gap-3`}
            >
              <Calendar size={16} />
              <div className="text-left">
                <div className="font-orbitron font-bold text-sm">{day.day}</div>
                <div className="font-mono text-xs opacity-75">{day.date}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div ref={contentRef} className="relative overflow-x-hidden">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-linear-to-b from-[#7B2BFF] via-[#00F0FF] to-[#7B2BFF] opacity-30 pointer-events-none" style={{ maxHeight: '100%' }} />
          
          <div className="space-y-6 max-w-full">
            {scheduleData[activeDay].events
              .sort((a, b) => {
                // Convert time to comparable format
                const timeA = a.time === 'Full Day' ? '24:00' : a.time === 'All Day' ? '25:00' : a.time;
                const timeB = b.time === 'Full Day' ? '24:00' : b.time === 'All Day' ? '25:00' : b.time;
                return timeA.localeCompare(timeB);
              })
              .map((event, index) => (
              <div
                key={index}
                className="timeline-item relative flex items-start gap-6 group"
              >
                {/* Time marker */}
                <div className="relative shrink-0">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-current pulse-glow"
                    style={{ color: typeColors[event.type as keyof typeof typeColors] }}
                  />
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-[#F4F6FF] bg-[#0B0E16] px-2 py-1 rounded">
                    {event.time}
                  </div>
                </div>

                {/* Event card */}
                <div className="flex-1 cyber-card p-6 group-hover:border-glow-cyan transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <h3 
                      className="font-orbitron font-bold text-lg mb-1"
                      style={{ color: typeColors[event.type as keyof typeof typeColors] }}
                    >
                      {event.title}
                    </h3>
                    <div 
                      className="px-2 py-1 rounded text-xs font-mono uppercase tracking-wider"
                      style={{ 
                        backgroundColor: `${typeColors[event.type as keyof typeof typeColors]}20`,
                        color: typeColors[event.type as keyof typeof typeColors]
                      }}
                    >
                      {event.type}
                    </div>
                  </div>
                  
                  <p className="text-[#A7B0C8] text-sm mb-3 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-[#A7B0C8]">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {event.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}