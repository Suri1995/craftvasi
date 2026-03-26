'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, CheckCircle2, Home, Building2, ShoppingCart, Sofa, Hammer, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
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
      id: 'home-furniture',
      title: 'Home Furniture Design & Customization',
      description: 'Personalized furniture pieces for every room in your home, designed to reflect your personality and optimize comfort.',
      icon: Home,
      subservices: [
        { name: 'Living Room Solutions', desc: 'Luxurious sofas, coffee tables, entertainment units, and accent pieces' },
        { name: 'Bedroom Essentials', desc: 'Customized beds, wardrobes, nightstands, and dressing tables' },
        { name: 'Kitchen & Dining', desc: 'Modular kitchens, dining tables, chairs, and storage cabinets' },
        { name: 'Outdoor & Balcony', desc: 'Stylish outdoor seating, tables, and decor pieces' },
      ],
      image: '/images/service-home-furniture.jpg',
    },
    {
      id: 'office-furniture',
      title: 'Office Furniture Solutions',
      description: 'Ergonomic and functional office spaces that promote productivity, professionalism, and employee well-being.',
      icon: Building2,
      subservices: [
        { name: 'Workstations', desc: 'Modular and adjustable work desks for optimal space and comfort' },
        { name: 'Seating Solutions', desc: 'Ergonomic chairs for executives, staff, and conference rooms' },
        { name: 'Storage Units', desc: 'Filing cabinets, bookshelves, and lockers for organized spaces' },
        { name: 'Meeting Rooms & Lounges', desc: 'Sleek conference tables, lounge furniture, and reception desks' },
      ],
      image: '/images/service-office.jpg',
    },
    {
      id: 'retail-furniture',
      title: 'Retail Store Furniture & Displays',
      description: 'Custom retail solutions designed to enhance customer experience and maximize product visibility.',
      icon: ShoppingCart,
      subservices: [
        { name: 'Display Units', desc: 'Custom shelving, racks, and showcases for various retail sectors' },
        { name: 'Point-of-Sale Counters', desc: 'Stylish and functional cash counters and checkout areas' },
        { name: 'Seating & Decor', desc: 'Aesthetic furniture to create inviting customer spaces' },
        { name: 'Brand-Themed Interiors', desc: 'Designs that align with your brand identity and target audience' },
      ],
      image: '/images/service-retail.jpg',
    },
    {
      id: 'furnishings-decor',
      title: 'Furnishings & Decor',
      description: 'Complete your interiors with elegant furnishings and decor that complement your design aesthetic.',
      icon: Sofa,
      subservices: [
        { name: 'Soft Furnishings', desc: 'Curtains, blinds, cushions, rugs, and upholstery customized to your style' },
        { name: 'Lighting Solutions', desc: 'Ambient, task, and accent lighting that sets the perfect mood' },
        { name: 'Wall Decor', desc: 'Artistic wall panels, wallpapers, and paintings for character' },
        { name: 'Accessories', desc: 'Handpicked decor items like vases, clocks, and mirrors' },
      ],
      image: '/images/service-decor.jpg',
    },
    {
      id: 'construction',
      title: 'Construction & Renovation Services',
      description: 'End-to-end construction and remodeling solutions from conceptualization to execution.',
      icon: Hammer,
      subservices: [
        { name: 'New Constructions', desc: 'Residential and commercial building with modern architecture focus' },
        { name: 'Renovations', desc: 'Upgrading outdated spaces to contemporary designs' },
        { name: 'Space Optimization', desc: 'Smart layouts and structural modifications for better utilization' },
        { name: 'Turnkey Projects', desc: 'From conceptualization to execution, we handle it all' },
      ],
      image: '/images/service-construction.jpg',
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Initial Consultation',
      description: 'We get to know you and understand your needs, preferences, goals, budget, and timeline for the project.',
    },
    {
      step: '02',
      title: 'Conceptualization & Design',
      description: 'Our designers craft initial concepts with mood boards, sketches, layouts, and material recommendations.',
    },
    {
      step: '03',
      title: '3D Visualization & Refinement',
      description: 'High-quality 3D renderings help you preview the design and allow us to fine-tune details based on feedback.',
    },
    {
      step: '04',
      title: 'Final Design Approval',
      description: 'We present the final design plan with layout, materials, colors, and get your formal approval.',
    },
    {
      step: '05',
      title: 'Project Scheduling & Procurement',
      description: 'We schedule timelines, procure materials, and select contractors ensuring quality standards.',
    },
    {
      step: '06',
      title: 'Execution & Construction',
      description: 'Our team handles installation, construction, and all aspects with continuous quality monitoring.',
    },
    {
      step: '07',
      title: 'Quality Checks & Supervision',
      description: 'Regular quality checks ensure every element meets standards and the project stays on schedule.',
    },
    {
      step: '08',
      title: 'Final Walkthrough & Handover',
      description: 'We conduct final walkthrough, inspect every detail, and only complete once you\'re satisfied.',
    },
    {
      step: '09',
      title: 'Post-Completion Support',
      description: 'We offer ongoing support to ensure everything functions as planned and are here for adjustments.',
    },
  ]

  const currentService = services[currentServiceIndex]
  const Icon = currentService.icon

  const handlePrevious = () => {
    setCurrentServiceIndex((prev) =>
      prev === 0 ? services.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentServiceIndex((prev) =>
      prev === services.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/10 rounded-full">
              <span className="text-accent font-semibold text-sm">Our Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary mb-6 text-balance">
              Comprehensive Design & Construction <span className="text-accent">Solutions</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              From home interiors to commercial spaces, we provide innovative and tailored solutions that reflect your unique needs and dreams while maintaining the highest standards of quality and craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="order-2 lg:order-1">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 bg-accent/10 rounded-full mb-2">
                      <span className="text-accent font-semibold text-xs">Service {currentServiceIndex + 1} of {services.length}</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                  {currentService.title}
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                  {currentService.description}
                </p>

                <div className="mb-8">
                  <p className="text-sm font-semibold text-primary mb-4">What We Offer:</p>
                  <div className="space-y-3">
                    {currentService.subservices.map((sub, subIndex) => (
                      <div key={subIndex} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">{sub.name}</p>
                          <p className="text-foreground/60 text-sm">{sub.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 text-accent hover:gap-4 transition-all font-semibold px-6 py-3 bg-accent/10 rounded-lg hover:bg-accent/20"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2 relative h-80 md:h-[500px] rounded-xl overflow-hidden border border-border group">
                <Image
                  src={currentService.image}
                  alt={currentService.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                onClick={handlePrevious}
                className="p-2 md:p-3 rounded-lg border border-border hover:border-accent hover:bg-accent/10 transition-all"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Dot Indicators */}
              <div className="flex gap-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentServiceIndex(index)}
                    className={`h-2 rounded-full transition-all ${index === currentServiceIndex
                        ? 'bg-accent w-8'
                        : 'bg-border w-2 hover:bg-accent/50'
                      }`}
                    aria-label={`Go to service ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2 md:p-3 rounded-lg border border-border hover:border-accent hover:bg-accent/10 transition-all"
                aria-label="Next service"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Our Proven <span className="text-accent">Process</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              From initial consultation to post-completion support, we follow a structured and client-focused approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((process, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index + services.length] = el
                }}
                className={`p-8 bg-background rounded-xl border border-border hover:border-accent transition-all scroll-reveal ${visibleCards.includes(index + services.length)
                    ? 'is-visible'
                    : ''
                  }`}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-heading font-bold text-accent">{process.step}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  {process.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Why Choose <span className="text-accent">Craftvasi</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Excellence in every detail, from consultation to completion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Expert Team',
                description: '10+ years of experience with 200+ completed projects across residential, commercial, and hospitality sectors.',
              },
              {
                title: 'Client-Centric Approach',
                description: 'Your vision is our priority. We ensure transparent communication and exceed expectations on every project.',
              },
              {
                title: 'Quality Craftsmanship',
                description: 'Meticulous attention to detail and premium materials ensure spaces that are beautiful and functional.',
              },
              {
                title: 'On-Time & On-Budget',
                description: 'We manage projects efficiently to deliver results within agreed timelines and budgets.',
              },
              {
                title: 'Innovative Design',
                description: 'We stay ahead of design trends and incorporate latest technologies and sustainable practices.',
              },
              {
                title: 'End-to-End Solutions',
                description: 'From conceptualization to execution and post-completion support, we handle everything for you.',
              },
            ].map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index + services.length + processSteps.length] = el
                }}
                className={`p-8 bg-secondary rounded-xl border border-border hover:border-accent transition-all scroll-reveal ${visibleCards.includes(index + services.length + processSteps.length)
                    ? 'is-visible'
                    : ''
                  }`}
              >
                <CheckCircle2 className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-heading font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create an environment that reflects your vision and enhances your lifestyle or business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300"
            >
              Start Your Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
