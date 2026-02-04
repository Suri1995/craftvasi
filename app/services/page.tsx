'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(
              entry.target as HTMLDivElement
            )
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      id: 'residential',
      title: 'Residential Design',
      description:
        'Create your dream home with personalized interior design that reflects your style and meets your lifestyle needs.',
      benefits: [
        'Custom space planning',
        'Material selection guidance',
        '3D visualization',
        'Furniture recommendations',
        'Color and lighting design',
      ],
      icon: '🏡',
      image: '/images/service-residential.jpg',
    },
    {
      id: 'commercial',
      title: 'Commercial Spaces',
      description:
        'Professional office and retail environments that enhance productivity and create lasting impressions on clients.',
      benefits: [
        'Workplace design',
        'Retail layout optimization',
        'Brand integration',
        'Ergonomic planning',
        'Modern aesthetics',
      ],
      icon: '🏢',
      image: '/images/service-commercial.jpg',
    },
    {
      id: 'renovation',
      title: 'Renovation & Remodeling',
      description:
        'Transform your existing spaces with contemporary updates, improved functionality, and modern design trends.',
      benefits: [
        'Space reconfiguration',
        'Material upgrades',
        'Smart storage solutions',
        'Accessibility improvements',
        'Energy efficiency',
      ],
      icon: '🔨',
      image: '/images/service-residential.jpg',
    },
    {
      id: 'consultation',
      title: 'Design Consultation',
      description:
        'Expert guidance on design decisions, style preferences, and best practices for your project.',
      benefits: [
        'Initial site assessment',
        'Budget planning',
        'Timeline estimation',
        'Material recommendations',
        'Design strategy',
      ],
      icon: '💡',
    },
  ]

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background pt-24 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Comprehensive interior design and construction solutions tailored
              to your unique needs and vision
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el
                }}
                className={`group relative overflow-hidden rounded-lg border border-border hover:border-accent transition-all duration-300 hover:shadow-lg scroll-reveal bg-secondary ${
                  visibleCards.includes(index) ? 'is-visible' : ''
                }`}
                id={service.id}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-4xl">{service.icon}</div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-primary">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-primary mb-3">
                      What's Included:
                    </p>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, bIndex) => (
                        <li
                          key={bIndex}
                          className="flex items-start gap-2 text-sm text-foreground/70"
                        >
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-accent hover:gap-4 transition-all font-semibold text-sm group-hover:text-primary"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Our Process
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              From consultation to completion, we follow a structured approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'Understand your vision, requirements, and budget',
              },
              {
                step: '02',
                title: 'Concept Design',
                description: 'Create initial design concepts and 3D visualizations',
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Execute design with quality materials and craftsmanship',
              },
              {
                step: '04',
                title: 'Completion',
                description: 'Final touches and handover of your dream space',
              },
            ].map((process, index) => (
              <div
                key={index}
                className="relative"
              >
                <div
                  className={`p-6 bg-background rounded-lg border border-border hover:border-accent transition-all scroll-reveal ${
                    visibleCards.includes(index + services.length)
                      ? 'is-visible'
                      : ''
                  }`}
                  ref={(el) => {
                    if (el) cardsRef.current[index + services.length] = el
                  }}
                >
                  <div className="text-4xl font-heading font-bold text-accent mb-2">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">
                    {process.title}
                  </h3>
                  <p className="text-foreground/70 text-sm">
                    {process.description}
                  </p>
                </div>

                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project and get a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Link>
            <Link
              href="/projects"
              className="inline-block px-8 py-4 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
