'use client'

'use client'

import { useRef, useState, useEffect } from 'react'
import { ImageGallery } from '@/components/ui/carousel-circular-image-gallery'

/* ---------------- HERO ---------------- */

export function Hero() {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const totalAnimationTime = 9500
    const pauseTime = 3000

    const interval = setInterval(() => {
      setCycle(v => v + 1)
    }, totalAnimationTime + pauseTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageGallery />
      </div>

      <div className="absolute inset-0 z-10 bg-black/45" />

      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4">

        {/* Heading */}
        <h1
          key={cycle}
          className="mb-4 text-4xl md:text-6xl font-bold text-white leading-tight max-w-5xl"
        >
          <span className="word" style={{ '--delay': '0ms' } as any}>Designing</span>{' '}
          <span className="word" style={{ '--delay': '500ms' } as any}>Extraordinary</span>{' '}
          <span className="word" style={{ '--delay': '1000ms' } as any}>Spaces.</span>{' '}
          <span className="word" style={{ '--delay': '1500ms' } as any}>Crafting</span>{' '}
          <span className="word" style={{ '--delay': '2000ms' } as any}>Experiences</span>{' '}
          <span className="word" style={{ '--delay': '2500ms' } as any}>That</span>{' '}
          <span className="word" style={{ '--delay': '3000ms' } as any}>Last.</span>
        </h1>

        {/* Sub heading */}
        <p
          key={cycle + 100}
          className="mb-8 max-w-3xl text-lg md:text-xl text-white/90"
        >
          <span className="word" style={{ '--delay': '3800ms' } as any}>Craftvasi</span>{' '}
          <span className="word" style={{ '--delay': '4050ms' } as any}>Interior</span>{' '}
          <span className="word" style={{ '--delay': '4300ms' } as any}>Studio</span>{' '}
          <span className="word" style={{ '--delay': '4550ms' } as any}>&</span>{' '}
          <span className="word" style={{ '--delay': '4800ms' } as any}>Constructions</span>{' '}
          <span className="word" style={{ '--delay': '5050ms' } as any}>Pvt</span>{' '}
          <span className="word" style={{ '--delay': '5300ms' } as any}>Ltd</span>{' '}
          <span className="word" style={{ '--delay': '5550ms' } as any}>transforms</span>{' '}
          <span className="word" style={{ '--delay': '5800ms' } as any}>homes,</span>{' '}
          <span className="word" style={{ '--delay': '6050ms' } as any}>offices,</span>{' '}
          <span className="word" style={{ '--delay': '6300ms' } as any}>and</span>{' '}
          <span className="word" style={{ '--delay': '6550ms' } as any}>commercial</span>{' '}
          <span className="word" style={{ '--delay': '6800ms' } as any}>spaces</span>{' '}
          <span className="word" style={{ '--delay': '7050ms' } as any}>into</span>{' '}
          <span className="word" style={{ '--delay': '7300ms' } as any}>stunning</span>{' '}
          <span className="word" style={{ '--delay': '7550ms' } as any}>environments</span>{' '}
          <span className="word" style={{ '--delay': '7800ms' } as any}>with</span>{' '}
          <span className="word" style={{ '--delay': '8050ms' } as any}>thoughtful</span>{' '}
          <span className="word" style={{ '--delay': '8300ms' } as any}>design</span>{' '}
          <span className="word" style={{ '--delay': '8550ms' } as any}>and</span>{' '}
          <span className="word" style={{ '--delay': '8800ms' } as any}>flawless</span>{' '}
          <span className="word" style={{ '--delay': '9050ms' } as any}>execution.</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/projects"
            className="rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 hover:scale-105"
          >
            Start Your Interior Project
          </a>

          <a
            href="/contact"
            className="rounded-lg border-2 border-red-600 px-8 py-3 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            View Our Projects
          </a>
        </div>
      </div>

      <style jsx>{`
        .word {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px);
          animation: word-appear 1.2s ease forwards;
          animation-delay: var(--delay);
        }

        @keyframes word-appear {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(
              entry.target as HTMLDivElement
            )
            setVisibleCards(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.15 }
    )

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      id: 1,
      title: 'Home Interiors',
      link: '#home',
      image: '/home-interior-image.jpg',
    },
    {
      id: 2,
      title: 'Corporate Interiors',
      link: '#corporate',
      image: '/corporate-interior-image.jpg',
    },
    {
      id: 3,
      title: 'Modular Kitchen',
      link: '#kitchen',
      image: '/modern-kitchen-interior-image.jpg',
    },
    {
      id: 4,
      title: 'Bedrooms',
      link: '#bedrooms',
      image: '/bedroom-interior-image.jpg',
    },
    {
      id: 5,
      title: 'Constructions',
      link: '#construction',
      image: '/construction-interior-image.jpg',
    },
    {
      id: 6,
      title: 'Office Interiors',
      link: '#office',
      image: '/office-interior-image.jpg',
    },
  ]

  return (
    <section
      className="
        py-20 md:py-32
        bg-gradient-to-b
        from-[#1a1a3d]
        via-[#2d2d5f]
        to-black
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Our Services
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Interior and construction solutions crafted with balance, detail,
            and timeless design.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => {
                if (el) cardsRef.current[index] = el
              }}
              className={`
                group relative overflow-hidden rounded-2xl
                border border-white/10
                transition-all duration-700 ease-out
                h-64 flex items-end
                ${
                  visibleCards.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }
                hover:-translate-y-2
                hover:shadow-2xl hover:shadow-accent/10
              `}
              style={{
                backgroundImage: `url('${service.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transitionDelay: visibleCards.includes(index)
                  ? `${index * 80}ms`
                  : '0ms',
              }}
            >
              {/* Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/75
                  via-black/45
                  to-transparent
                  opacity-85
                  group-hover:opacity-95
                  transition-opacity duration-500
                "
              />

              {/* Content */}
              <div className="relative z-10 p-8 w-full">
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  {service.title}
                </h3>

                <a
                  href={service.link}
                  className="
                    inline-flex items-center text-accent font-semibold
                    relative
                    after:absolute after:left-0 after:-bottom-1
                    after:h-[2px] after:w-0 after:bg-accent
                    after:transition-all after:duration-300
                    hover:after:w-full
                  "
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyChoose() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = containerRef.current?.querySelectorAll('.why-item')
            children?.forEach((_, index) => {
              setVisibleItems(prev => [...new Set([...prev, index])])
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const reasons = [
    'Bespoke Designs, Tailored to Your Home',
    'Unwavering Quality in Every Detail',
    'Your Vision, Our Expertise, Perfectly Aligned',
    'Transparent Process, Stress-Free Transformation',
  ]

  const descriptions = [
    'We create personalized interiors that reflect your unique style while embracing contemporary trends.',
    'Our meticulous attention to materials and execution ensures your space is built to last.',
    'Our skilled team combines creativity with expertise to exceed your expectations.',
    'We provide seamless communication and professional integrity from concept to completion.',
  ]

  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={containerRef} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
              Why Craftvasi
            </h2>

            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`why-item scroll-reveal ${
                  visibleItems.includes(index) ? 'is-visible' : ''
                }`}
                style={{
                  transitionDelay: visibleItems.includes(index) ? `${index * 100}ms` : '0ms',
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-primary mb-2">
                      {reason}
                    </h3>
                    <p className="text-foreground/70">
                      {descriptions[index]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="bg-background p-8 rounded-lg border-l-4 border-accent">
              <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                We Remove the Biggest Risk
              </h3>
              <p className="text-lg text-foreground/70 mb-4">
                The fear that the finished project won't match the vision. True understanding comes from direct, emotional experience, not just viewing a file.
              </p>
              <p className="text-lg text-foreground/70">
                By building your space virtually before we lay the first foundation, we guarantee zero surprises, 100% confidence, and a final result that perfectly mirrors the immersion you felt.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Portfolio() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(
              entry.target as HTMLDivElement
            )
            setVisibleCards(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 }
    )

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      title: '3BHK Flat',
      category: 'Interior Project',
      description: 'Spacious Project in the closest to city.',
      image: '/interior-projects-image.jpg',
    },
    {
      title: 'Standalone G+4',
      category: 'Construction',
      description: 'Surrounded by lush green and superior neighbourhood.',
      image: '/standalone-building-image.png',
    },
    {
      title: 'Minimalistic Cafe',
      category: 'Commercial Interiors',
      description: 'Cafe situated in the bustling city of Hyderabad.',
      image: '/minimalist-cafe-image.jpg',
    },
    {
      title: 'Office Space',
      category: 'Office Interiors',
      description: 'Adobe for business owners and their team.',
      image: '/office-space-image.jpg',
    },
    {
      title: 'Grocery Store',
      category: 'Commercial Interiors',
      description: 'Grocery Store setup in a high-rise gated community.',
      image: '/grocery-store-image.jpg',
    },
  ]

  return (
    <section
      className="
        py-20 md:py-32
        bg-gradient-to-b
        from-[#1a1a3d]
        via-[#2d2d5f]
        to-[#dc143c]/10
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Our Recent Projects
          </h2>
          <p className="text-lg text-white/60">
            Projects thoughtfully brought to life
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => {
                if (el) cardsRef.current[index] = el
              }}
              className={`
                group relative overflow-hidden rounded-2xl
                border border-white/10
                transition-all duration-700 ease-out
                h-80
                ${
                  visibleCards.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }
                hover:-translate-y-2
                hover:shadow-2xl hover:shadow-black/40
              `}
              style={{
                backgroundImage: `url('${project.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transitionDelay: visibleCards.includes(index)
                  ? `${index * 80}ms`
                  : '0ms',
              }}
            >
              {/* Overlay */}
              <div
                className="border-2 border-accent
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/50
                  to-transparent
                  opacity-85
                  group-hover:opacity-95
                  transition-opacity duration-500
                "
              />

              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                  {/* <p className="text-accent font-extrabold text-sm uppercase tracking-wide">
                    {project.category}
                  </p> */}
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm">
                    {project.description}
                  </p>
                  <a
                    href="/projects"
                    className="
                      inline-flex items-center text-accent font-semibold
                      relative
                      after:absolute after:left-0 after:-bottom-1
                      after:h-[2px] after:w-0 after:bg-accent
                      after:transition-all after:duration-300
                      hover:after:w-full
                    "
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/projects"
            className="
              inline-block px-8 py-3
              bg-white/10 backdrop-blur-md
              text-white rounded-lg font-semibold
              hover:bg-white/20 hover:scale-105
              transition-all duration-300
            "
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="w-full py-14 bg-gradient-to-r from-[#1a1a3d] via-[#dc143c] to-[#1a1a3d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Center – Content (UNCHANGED TEXT) */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-3 max-w-3xl">
              Crafting Beautiful, Functional Spaces Tailored to Your Unique Style.
            </h2>
            <p className="text-primary-foreground/80 text-base max-w-2xl">
              Let's discuss your project and create something beautiful together
            </p>
          </div>

          {/* Right – Button */}
          <div className="flex-shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              Contact Now
              <span className="text-lg">→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
