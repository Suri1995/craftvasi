'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight } from 'lucide-react'
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
      <section className="bg-gradient-to-b from-secondary to-background pt-24 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
              About <span className="text-accent">Craftvasi</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              A premier interior design studio dedicated to creating beautiful,
              functional spaces that reflect your unique lifestyle and
              aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
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
              <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-accent font-semibold text-sm">
                  Our Story
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                From Vision to <span className="text-accent">Reality</span>
              </h2>
              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
                Founded in 2009, Craftvasi began with a simple mission: to create
                interior spaces that inspire and delight. What started as a small
                studio has grown into a trusted name in Hyderabad's interior design
                industry.
              </p>
              <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                Over 15 years, we've completed 500+ projects, each one a testament
                to our commitment to <span className="text-accent font-semibold">excellence, innovation,
                and client satisfaction</span>. Our team of passionate designers and
                architects work collaboratively to bring your dreams to life.
              </p>
              <Link href="/services" className="inline-flex items-center gap-2 text-accent hover:gap-4 transition-all font-semibold">
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative h-96 md:h-[500px]">
              <Image
                src="/images/about-team.jpg"
                alt="Craftvasi team collaborating"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Guiding principles that shape everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description:
                  'We stay ahead of design trends, blending creativity with functionality to deliver spaces that are both beautiful and practical.',
              },
              {
                title: 'Sustainability',
                description:
                  'Environmental responsibility is at the core of our work. We use eco-friendly materials and sustainable practices.',
              },
              {
                title: 'Integrity',
                description:
                  'Transparent communication, honest pricing, and unwavering commitment to quality are our foundation.',
              },
            ].map((value, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) sectionsRef.current[index + 1] = el
                }}
                className={`p-8 bg-background rounded-lg border border-border hover:border-accent transition-all scroll-reveal ${
                  visibleSections.includes(index + 1) ? 'is-visible' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <span className="text-2xl text-accent font-bold">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Talented professionals dedicated to your project success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Lead Designer',
                expertise: 'Residential & Commercial Design',
                image: '/images/about-team.jpg',
              },
              {
                name: 'Rajesh Kumar',
                role: 'Project Manager',
                expertise: 'Construction & Project Delivery',
                image: '/images/about-process.jpg',
              },
              {
                name: 'Anjali Patel',
                role: 'Interior Architect',
                expertise: 'Space Planning & 3D Visualization',
                image: '/images/about-team.jpg',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-secondary border-2 border-border group-hover:border-accent transition-all group-hover:scale-105 overflow-hidden relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-semibold mb-2">{member.role}</p>
                <p className="text-foreground/70">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Ready to work with us? Get in touch to discuss your next project.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
