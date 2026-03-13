'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { ImageGallery } from '@/components/ui/carousel-circular-image-gallery'
import { GradientDots } from '@/components/ui/gradient-dots'
import CardStack from "@/components/ui/card-stack"
import { BorderBeamCard } from '@/components/ui/border-beam-card'

import RedTick from "@/public/red-circle-tick-icon.png"
import TestimonialSlider from './ui/testimonial-slider'
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
    <section className="relative w-full max-h-[90vh] overflow-x-hidden overflow-y-hidden">
      <div className="absolute inset-0 z-0 w-full overflow-hidden">
        <ImageGallery />
      </div>

      <div className="absolute inset-0 z-10 bg-black/45" />

      <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center px-4 text-center">
        <h1
          key={cycle}
          className="mb-4 max-w-5xl text-4xl font-bold leading-tight text-white md:text-6xl"
        >
          <span
  className="word text-[#1B2A6B] [text-shadow:0_0_6px_rgba(255,255,255,0.6),0_0_12px_rgba(255,255,255,0.4)]"
  style={{ '--delay': '0ms' } as any}
>
  Designing
</span>{' '}
          <span className="word" style={{ '--delay': '500ms' } as any}>Extraordinary</span>{' '}
          <span className="word text-[#1B2A6B] [text-shadow:0_0_6px_rgba(255,255,255,0.6),0_0_12px_rgba(255,255,255,0.4)]" style={{ '--delay': '1000ms' } as any}>Spaces.</span>{' '}
          <span className="word text-[#E52B2B] [text-shadow:0_0_6px_rgba(255,255,255,0.6),0_0_12px_rgba(255,255,255,0.4)]" style={{ '--delay': '1500ms' } as any}>Crafting</span>{' '}
          <span className="word" style={{ '--delay': '2000ms' } as any}>Experiences</span>{' '}
          <span className="word" style={{ '--delay': '2500ms' } as any}>That</span>{' '}
          <span className="word text-[#E52B2B] [text-shadow:0_0_6px_rgba(255,255,255,0.6),0_0_12px_rgba(255,255,255,0.4)]" style={{ '--delay': '3000ms' } as any}>Last.</span>
        </h1>

        <p
          key={cycle + 100}
          className="mb-8 max-w-3xl text-lg text-white/90 md:text-xl"
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

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/projects"
            className="rounded-lg bg-[#E52B2B] px-8 py-3 font-semibold text-white transition hover:scale-105"
          >
            Start Your Interior Project
          </a>

          <a
            href="/contact"
            className="rounded-lg bg-[#1B2A6B] px-8 py-3 font-semibold text-white transition hover:scale-105"
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
          max-width: 100%;
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

/* ---------------- ABOUT ---------------- */

export function AboutCraftvasi() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-black via-[#11112a] to-[#1a1a3d] py-14 md:py-24"
    >
      <GradientDots
        duration={20}
        colorCycleDuration={8}
        dotSize={10}
        spacing={18}
        backgroundColor="rgba(8,8,16,0.92)"
        className="opacity-50"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/35" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_28%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:gap-10">
          <div
            className={`lg:col-span-4 transition-all text-center duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="mb-4 text-4xl font-bold leading-tight text-[#E52B2B] md:text-5xl">
              About Craftvasi
            </h2>
          </div>

          <div
            className={`lg:col-span-8 transition-all duration-700 delay-150 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-10">
              <p className="mb-6 text-base leading-8 text-white/80 md:text-lg">
                Craftvasi Interior Studio &amp; Constructions Pvt Ltd is a Hyderabad-based
                design and build company specializing in{' '}
                <span className="font-semibold text-white">
                  premium interiors, customized furniture, and turnkey construction solutions
                </span>.
              </p>

              <p className="mb-6 text-base leading-8 text-white/80 md:text-lg">
                Founded in <span className="font-semibold text-white">2019</span>, Craftvasi has
                successfully delivered{' '}
                <span className="font-semibold text-white">
                  200+ residential and commercial projects
                </span>
                , helping clients transform their spaces into elegant, functional, and inspiring
                environments.
              </p>

              <p className="mb-6 text-base leading-8 text-white/80 md:text-lg">
                Our team of designers, project engineers, and craftsmen work together to deliver{' '}
                <span className="font-semibold text-white">
                  complete end-to-end interior solutions
                </span>{' '}
                — from concept design and 3D visualization to manufacturing and installation.
              </p>

              <p className="mb-8 text-base leading-8 text-white/80 md:text-lg">
                At Craftvasi, we believe every space should reflect the personality, lifestyle,
                and aspirations of the people who use it.
              </p>

              <div className="border-l-4 border-[#E52B2B] pl-5">
                <p className="text-2xl font-bold leading-relaxed text-white md:text-3xl">
                  We don’t just design spaces.
                  <br />
                  We craft experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export function Services() {
  return (
    <section
      className="
        overflow-x-hidden
        bg-gradient-to-b
        from-[#0c0c26]
        via-[#2d2d5f]
        to-[#3c3c51]
        py-10 md:py-20
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-4xl font-bold text-[#E52B2B] md:text-5xl">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/60">
            Interior and construction solutions crafted with balance, detail, and timeless design.
          </p>
        </div>

        <div className="md:mt-20">
          <CardStack />
        </div>
      </div>
    </section>
  )
}

export function OurProcess() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = containerRef.current?.querySelectorAll('.process-step')
            children?.forEach((_, index) => {
              setVisibleSteps(prev => [...new Set([...prev, index])])
            })
          }
        })
      },
      { threshold: 0.15 }
    )

    if (containerRef.current) observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      title: 'Consultation & Requirement Discussion',
      description:
        'We begin by understanding your vision, lifestyle, functional needs, and project expectations in detail.',
    },
    {
      title: 'Concept Design & Space Planning',
      description:
        'Our team creates thoughtful layouts and planning strategies that balance aesthetics, flow, and usability.',
    },
    {
      title: '3D Design & Material Selection',
      description:
        'We develop realistic 3D visualizations and help you finalize finishes, textures, colors, and materials.',
    },
    {
      title: 'Quotation & Project Planning',
      description:
        'A clear project scope, transparent quotation, timelines, and execution roadmap are prepared before work begins.',
    },
    {
      title: 'Manufacturing & Site Execution',
      description:
        'Custom production and on-site implementation are carried out with close coordination and professional supervision.',
    },
    {
      title: 'Quality Check & Final Handover',
      description:
        'Every detail is reviewed carefully before final delivery to ensure the finished space meets our quality standards.',
    },
  ]

  return (
    <section className="overflow-x-hidden bg-gradient-to-b from-[#050539] via-[#151547] to-[#2d2d5f] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-[#E52B2B] md:text-5xl">
            Our Process
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-white/60 leading-relaxed">
            A seamless journey from consultation to final handover, designed to make every project clear, collaborative, and efficient.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`process-step transition-all duration-700 ease-out ${
                visibleSteps.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <BorderBeamCard>
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <h3 className="mb-4 text-xl font-semibold leading-snug text-white md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-7 text-white/70 md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </BorderBeamCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyChooseCraftvasi() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = containerRef.current?.querySelectorAll('.why-choose-item')
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
    '200+ Successful Projects',
    'Experienced Designers & Engineers',
    'Customized Interior Solutions',
    'Premium Quality Materials',
    'Transparent Pricing',
    'On-Time Project Delivery',
    'Complete End-to-End Execution',
  ]

  return (
    <section className="overflow-x-hidden bg-gradient-to-b from-[#3e3e88] via-[#1a1a3d] to-[#121238] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-[#E52B2B] md:text-5xl">
            Why Choose Craftvasi
          </h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/60">
            Trusted expertise, premium execution, and a seamless process that brings your vision to life.
          </p>
        </div>

        <div
          ref={containerRef}
          className="flex flex-col md:flex-row flex-wrap gap-6 justify-center items-center"
        >
          {reasons.map((reason, index) => (
            <div
              key={reason}
              className={`why-choose-item transition-all duration-700 ease-out ${
                visibleItems.includes(index)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#E52B2B]/40 hover:bg-white/10">
                <div className="flex items-center gap-3 ">
                  
                    <Image 
                    src={RedTick}
                    alt="Red Tick Icon"
                    width={24}
                    height={24}
                    />

                  <h3 className="text-lg font-semibold leading-snug text-white md:text-xl">
                    {reason}
                  </h3>
                </div>
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
    <section className="overflow-x-hidden bg-secondary py-8 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-[#E52B2B] md:text-5xl">
            Why Craftvasi
          </h2>
        </div>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div ref={containerRef} className="space-y-6">
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
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                    <svg className="h-4 w-4 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-heading font-semibold text-primary">
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
            <div className="rounded-lg border-l-4 border-accent bg-background p-8">
              <h3 className="mb-4 text-2xl font-heading font-bold text-primary">
                We Remove the Biggest Risk
              </h3>
              <p className="mb-4 text-lg text-foreground/70">
                The fear that the finished project won't match the vision. True understanding comes from direct, emotional experience, not just viewing a file.
              </p>
              <p className="text-lg text-foreground/70">
                By building your space virtually before we lay the first foundation, we guarantee zero surprises, 100% confidence, and a final result that perfectly mirrors the immersion you felt.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Get Free Design Consultation
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
        overflow-x-hidden
        py-8 md:py-20
        bg-gradient-to-b
        from-[#1a1a3d]
        via-[#2d2d5f]
        to-[#dc143c]/10
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-heading font-bold text-[#E52B2B] md:text-5xl">
            Our Recent Projects
          </h2>
          <p className="text-lg text-white/60">
            Projects thoughtfully brought to life
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => {
                if (el) cardsRef.current[index] = el
              }}
              className={`
                group relative h-80 overflow-hidden rounded-2xl
                border border-white/10
                transition-all duration-700 ease-out
                ${
                  visibleCards.includes(index)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
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
              <div
                className="
                  absolute inset-0 border-2 border-accent
                  bg-gradient-to-t
                  from-black/80
                  via-black/50
                  to-transparent
                  opacity-85
                  transition-opacity duration-500
                  group-hover:opacity-95
                "
              />

              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div />

                <div>
                  <h3 className="mb-2 text-2xl font-heading font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-white/80">
                    {project.description}
                  </p>
                  <a
                    href="/projects"
                    className="
                      relative inline-flex items-center font-semibold text-accent
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

        <div className="mt-12 text-center">
          <a
            href="/projects"
            className="
              inline-block rounded-lg
              bg-[#1a1a3d] px-8 py-3 font-semibold
              text-white backdrop-blur-md
              transition-all duration-300
              hover:scale-105
            "
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}

export function ClientTestimonials() {
  return (
    <section className="overflow-x-hidden bg-gradient-to-b from-[#0c0c26] via-[#151547] to-[#1a1a3d] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-[#E52B2B] md:text-5xl">
            Client Testimonials
          </h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/60">
            Hear what our clients say about their experience working with Craftvasi.
          </p>
        </div>

        <TestimonialSlider />
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="w-full overflow-x-hidden bg-gradient-to-r from-[#1a1a3d] via-[#dc143c] to-[#1a1a3d] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <h2 className="max-w-3xl text-2xl font-heading font-bold text-primary-foreground md:text-3xl">
              Let Craftvasi design interiors that reflect your style and elevate your lifestyle.
            </h2>
          </div>

          <div className="flex-shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground transition-transform hover:scale-105"
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