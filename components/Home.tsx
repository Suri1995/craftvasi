'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { ImageGallery } from '@/components/ui/carousel-circular-image-gallery'

export function Hero() {
  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* Fullscreen Background Gallery */}
      <div className="absolute inset-0 z-0">
        <ImageGallery />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/45" />

      {/* Centered Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
        {/* Heading — animated word by word */}
        <h1 className="mb-4 text-4xl md:text-6xl font-bold text-white leading-tight">
          <span className="word" style={{ '--delay': '0ms' } as any}>Crafting</span>{' '}
          <span className="word" style={{ '--delay': '750ms' } as any}>Beautiful,</span>{' '}
          <span className="word" style={{ '--delay': '1500ms' } as any}>Functional</span>{' '}
          <span className="word" style={{ '--delay': '2250ms' } as any}>Spaces</span>
        </h1>

        {/* Subtext */}
        <p className="mb-8 max-w-2xl text-lg md:text-xl text-white/90">
          <span className="word" style={{ '--delay': '3000ms' } as any}>Explore</span>{' '}
          <span className="word" style={{ '--delay': '3375ms' } as any}>our</span>{' '}
          <span className="word" style={{ '--delay': '3750ms' } as any}>portfolio</span>{' '}
          <span className="word" style={{ '--delay': '4125ms' } as any}>of</span>{' '}
          <span className="word" style={{ '--delay': '4500ms' } as any}>exceptional</span>{' '}
          <span className="word" style={{ '--delay': '4875ms' } as any}>interior</span>{' '}
          <span className="word" style={{ '--delay': '5250ms' } as any}>design</span>{' '}
          <span className="word" style={{ '--delay': '5625ms' } as any}>and</span>{' '}
          <span className="word" style={{ '--delay': '6000ms' } as any}>construction</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/projects"
            className="rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:scale-105"
          >
            View All Projects
          </a>

          <a
            href="/contact"
            className="rounded-lg border-2 border-yellow-500 px-8 py-3 font-semibold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
          >
            Contact Now
          </a>
        </div>
      </div>

      {/* CSS animation */}
      <style jsx>{`
        .word {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px);
          animation: word-appear 5s ease-in-out var(--delay) infinite;
        }

        @keyframes word-appear {
          0%, 25% {
            opacity: 0;
            transform: translateY(20px);
          }
          50% {
            opacity: 1;
            transform: translateY(0);
          }
          75%, 100% {
            opacity: 0;
            transform: translateY(-20px);
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
            const index = cardsRef.current.indexOf(entry.target as HTMLDivElement)
            setVisibleCards(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const services = [
    { id: 1, title: 'Home Interiors', icon: '🏠', link: '#home' },
    { id: 2, title: 'Corporate Interiors', icon: '🏢', link: '#corporate' },
    { id: 3, title: 'Modular Kitchen', icon: '🍳', link: '#kitchen' },
    { id: 4, title: 'Bedrooms', icon: '🛏️', link: '#bedrooms' },
    { id: 5, title: 'Constructions', icon: '🏗️', link: '#construction' },
    { id: 6, title: 'Office Interiors', icon: '💼', link: '#office' },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
            Our Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => {
                if (el) cardsRef.current[index] = el
              }}
              className={`group relative overflow-hidden rounded-lg border border-border hover:border-accent transition-all duration-300 h-64 flex items-end scroll-reveal ${
                visibleCards.includes(index) ? 'is-visible' : ''
              }`}
              style={{
                transitionDelay: visibleCards.includes(index) ? `${index * 50}ms` : '0ms',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="relative z-10 p-8 w-full">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-2">
                  {service.title}
                </h3>
                <a
                  href={service.link}
                  className="inline-flex items-center text-accent font-semibold hover:gap-2 transition-all"
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
            const index = cardsRef.current.indexOf(entry.target as HTMLDivElement)
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
      image: '/images/project-bhk.jpg',
    },
    {
      title: 'Standalone G+4',
      category: 'Construction',
      description: 'Surrounded by lush green and superior neighbourhood.',
      image: '/images/project-building.jpg',
    },
    {
      title: 'Minimalistic Cafe',
      category: 'Commercial Interiors',
      description: 'Cafe situated in the bustling city of hyderabad.',
      image: '/images/project-cafe.jpg',
    },
    {
      title: 'Office Space',
      category: 'Office Interiors',
      description: 'Adobe for business owners and their team',
      image: '/images/project-office.jpg',
    },
    {
      title: 'Grocery Store',
      category: 'Commercial Interiors',
      description: 'Grocery Store Setup in a high rise gated community.',
      image: '/images/project-grocery.jpg',
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Our Recent Projects
          </h2>
          <p className="text-xl text-foreground/60">Projects Brought to Life</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => {
                if (el) cardsRef.current[index] = el
              }}
              className={`group relative overflow-hidden rounded-lg border border-border hover:border-accent transition-all duration-300 h-80 scroll-reveal ${
                visibleCards.includes(index) ? 'is-visible' : ''
              }`}
              style={{
                transitionDelay: visibleCards.includes(index) ? `${index * 50}ms` : '0ms',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                <div>
                  <p className="text-accent font-semibold text-sm uppercase tracking-wide">
                    {project.category}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-primary-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-primary-foreground/80 mb-4 text-sm">
                    {project.description}
                  </p>
                  <a
                    href="/projects"
                    className="inline-flex items-center text-accent font-semibold hover:gap-1 transition-all"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/projects"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
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
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-accent blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
          Crafting Beautiful, Functional Spaces Tailored to Your Unique Style.
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Let's discuss your project and create something beautiful together
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          Contact Now
        </a>
      </div>
    </section>
  )
}
