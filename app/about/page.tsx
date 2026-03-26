'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Award, Users, Zap } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(
              entry.target as HTMLDivElement
            )
            setVisibleSections((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/10 rounded-full">
              <span className="text-accent font-semibold text-sm">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-primary mb-6 text-balance">
              Designing Your Dreams, Building Your <span className="text-accent">Future</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Excellence in every detail — Craftvasi Interior Studio & Construction transforms spaces into inspiring environments through creativity, precision, and sustainable design.
            </p>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={(el) => {
              if (el) sectionsRef.current[0] = el
            }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-reveal ${
              visibleSections.includes(0) ? 'is-visible' : ''
            }`}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                About <span className="text-accent">Craftvasi</span>
              </h2>
              <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
                <p>
                  Since its establishment in 2019, Craftvasi Interior Studio & Construction has been dedicated to crafting exceptional spaces that seamlessly blend design and functionality. We specialize in interior design, construction, and renovation services for residential, commercial, and hospitality projects.
                </p>
                <p>
                  Our talented team of designers, architects, and builders work collaboratively to transform spaces into unique, inspiring environments tailored to the needs and desires of our clients. We believe that every space has the potential to tell a story.
                </p>
                <p>
                  Our approach combines creative design with meticulous craftsmanship to deliver spaces that are not only visually striking but also practical and sustainable. We don't just build — we build dreams, turning visions into reality, one space at a time.
                </p>
              </div>
              <Link href="/services" className="inline-flex items-center gap-2 text-accent hover:gap-4 transition-all font-semibold mt-8">
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-hero.jpg"
                alt="Craftvasi team collaborating on interior design projects"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              ref={(el) => {
                if (el) sectionsRef.current[1] = el
              }}
              className={`scroll-reveal ${
                visibleSections.includes(1) ? 'is-visible' : ''
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
                Our Vision
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                To be a leader in the design and construction industry, recognized for our creativity, craftsmanship, and commitment to excellence. We aim to transform spaces into inspiring environments that enhance the way people live, work, and interact.
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) sectionsRef.current[2] = el
              }}
              className={`scroll-reveal ${
                visibleSections.includes(2) ? 'is-visible' : ''
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                To deliver exceptional interior design and construction services that exceed client expectations through creativity, precision, and sustainable practices. We strive to provide innovative, tailored solutions that reflect the unique needs and dreams of our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Guiding principles that drive our excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Integrity',
                description: 'Maintaining the highest standards of honesty and professionalism in every project and interaction.',
                icon: Award,
              },
              {
                title: 'Innovation',
                description: 'Embracing creativity and staying ahead of design trends to offer unique and effective solutions.',
                icon: Zap,
              },
              {
                title: 'Client-Centricity',
                description: 'Ensuring customer satisfaction is at the heart of every project and decision we make.',
                icon: Users,
              },
            ].map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) sectionsRef.current[index + 3] = el
                  }}
                  className={`p-8 bg-secondary rounded-xl border border-border hover:border-accent transition-all scroll-reveal ${
                    visibleSections.includes(index + 3) ? 'is-visible' : ''
                  }`}
                >
                  <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={(el) => {
              if (el) sectionsRef.current[6] = el
            }}
            className={`scroll-reveal ${
              visibleSections.includes(6) ? 'is-visible' : ''
            }`}
          >
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-6">
                <span className="text-accent font-semibold text-sm">Leadership</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-8">
                Message from Our Leadership
              </h2>
            </div>

            <div className="bg-secondary rounded-xl p-10 md:p-12 border border-border">
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                "Welcome to Craftvasi Interior Studio & Construction. Since our establishment in 2019, we have remained dedicated to transforming spaces and bringing our clients' visions to life with creativity, precision, and quality craftsmanship. As a company, we believe that great design is about more than aesthetics; it's about creating environments that enhance the way people live, work, and experience the world around them."
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                "Our talented team of designers, architects, and builders works collaboratively on every project to ensure it is tailored to the unique needs and aspirations of our clients. At Craftvasi, we pride ourselves on building lasting relationships with our clients, founded on trust, transparency, and exceptional service."
              </p>
              <div className="border-t border-border pt-6">
                <p className="font-heading font-bold text-primary text-lg">
                  Bhanuprakash Reddy Pothula
                </p>
                <p className="text-accent font-semibold">
                  CEO, Craftvasi Interior Studio & Construction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Our Journey & <span className="text-accent">Milestones</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Key moments that shaped our growth
            </p>
          </div>

          <div className="space-y-8 max-w-3xl">
            {[
              {
                year: '2019',
                title: 'Foundation',
                description: 'Craftvasi Interior Studio & Construction was established with a vision to deliver innovative and high-quality interior design and construction services.',
              },
              {
                year: '2021',
                title: 'Commercial Expansion',
                description: 'The company ventured into commercial projects, offering specialized design and construction services for offices, retail spaces, and hospitality developments.',
              },
              {
                year: '2022',
                title: 'Construction Sector Entry',
                description: 'Craftvasi expanded its service offerings by officially entering the construction sector, providing comprehensive design and build solutions.',
              },
              {
                year: '2023',
                title: '200+ Projects Milestone',
                description: 'Successfully completed over 200+ projects, marking a significant milestone in our growth and reputation.',
              },
              {
                year: '2024',
                title: 'New Office & Team Growth',
                description: 'Expanded operations with a new office and growing team in B.N. Reddy Nagar, Hyderabad, to better serve clients.',
              },
            ].map((milestone, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) sectionsRef.current[index + 7] = el
                }}
                className={`flex gap-6 scroll-reveal ${
                  visibleSections.includes(index + 7) ? 'is-visible' : ''
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-heading font-bold text-lg">{milestone.year.slice(-2)}</span>
                  </div>
                  {index < 4 && (
                    <div className="w-1 h-16 bg-accent/30 mt-2"></div>
                  )}
                </div>
                <div className="pt-1 pb-8">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                    {milestone.year}: {milestone.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-secondary to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Meet Our <span className="text-accent">Leadership</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Visionary professionals leading Craftvasi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              {
                name: 'Bhanuprakash Reddy Pothula',
                role: 'CEO',
                background: 'Visionary leader with a passion for transforming spaces and building lasting client relationships.',
              },
              {
                name: 'Saibabu',
                role: 'Managing Director',
                background: 'With over 10 years of experience, Saibabu demonstrates exceptional leadership and commitment to excellence in every project. Involved in every step from consulting to delivery.',
              },
            ].map((leader, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) sectionsRef.current[index + 12] = el
                }}
                className={`bg-background rounded-xl p-8 border border-border hover:border-accent transition-all scroll-reveal ${
                  visibleSections.includes(index + 12) ? 'is-visible' : ''
                }`}
              >
                <div className="w-full h-64 rounded-lg bg-secondary mb-6 flex items-center justify-center border border-border">
                  <Users className="w-16 h-16 text-muted-foreground/50" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-1">
                  {leader.name}
                </h3>
                <p className="text-accent font-semibold mb-4">{leader.role}</p>
                <p className="text-foreground/70 leading-relaxed">
                  {leader.background}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create an environment that reflects your vision and enhances your lifestyle.
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
              View Our Projects
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
