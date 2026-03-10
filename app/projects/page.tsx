'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { X } from 'lucide-react'
import Link from 'next/link'

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [visibleImages, setVisibleImages] = useState<number[]>([])
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imagesRef.current.indexOf(
              entry.target as HTMLDivElement
            )
            setVisibleImages((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    imagesRef.current.forEach((img) => {
      if (img) observer.observe(img)
    })

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      id: 1,
      title: 'Modern Apartment Renovation',
      category: 'Residential',
      image: '/images/project-bhk.jpg',
      description:
        'Complete renovation of a 1200 sq ft apartment with modern aesthetics and smart storage solutions.',
    },
    {
      id: 2,
      title: 'Corporate Office Design',
      category: 'Commercial',
      image: '/images/project-office.jpg',
      description:
        'Open-concept office layout with collaborative spaces and executive areas.',
    },
    {
      id: 3,
      title: 'Luxury Villa Interior',
      category: 'Residential',
      image: '/images/project-bhk.jpg',
      description:
        'High-end villa design featuring premium materials and sophisticated styling.',
    },
    {
      id: 4,
      title: 'Retail Store Fitout',
      category: 'Commercial',
      image: '/images/project-grocery.jpg',
      description:
        'Modern retail space with customer-focused layout and brand integration.',
    },
    {
      id: 5,
      title: 'Cafe Interior',
      category: 'Commercial',
      image: '/images/project-cafe.jpg',
      description:
        'Minimalistic cafe with ambient lighting and cozy seating arrangements.',
    },
    {
      id: 6,
      title: 'Restaurant Interior',
      category: 'Commercial',
      image: '/images/project-cafe.jpg',
      description:
        'Stylish dining space with optimal flow and cozy ambiance.',
    },
    {
      id: 7,
      title: 'Kitchen Renovation',
      category: 'Residential',
      image: '/images/hero-kitchen.jpg',
      description:
        'Modern kitchen with smart appliances and efficient workflow.',
    },
    {
      id: 8,
      title: 'Building Construction',
      category: 'Commercial',
      image: '/images/project-building.jpg',
      description:
        'Multi-story building with contemporary architecture and green spaces.',
    },
    {
      id: 9,
      title: 'Master Bedroom Suite',
      category: 'Residential',
      image: '😴',
      description:
        'Luxurious bedroom with walk-in closet and spa-like bathroom.',
    },
  ]

  const categories = ['All', 'Residential', 'Commercial']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#f0f4f8] to-white pt-24 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
              Our <span className="text-accent">Projects</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of completed projects showcasing our design
              expertise and craftsmanship
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-secondary text-foreground border border-border hover:border-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  if (el) imagesRef.current[index] = el
                }}
                onClick={() => setSelectedProject(project.id)}
                className={`group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300 scroll-reveal ${
                  visibleImages.includes(index) ? 'is-visible' : ''
                } ${index % 3 === 0 ? 'lg:row-span-2' : ''}`}
              >
                <div className="relative h-96 md:h-80 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Project Info Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-accent text-sm font-semibold mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-white text-xl font-heading font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject !== null && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-background rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto animate-fadeUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background">
              <div>
                <p className="text-accent text-sm font-semibold">
                  {projects.find((p) => p.id === selectedProject)?.category}
                </p>
                <h2 className="text-2xl font-heading font-bold text-primary">
                  {projects.find((p) => p.id === selectedProject)?.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={projects.find((p) => p.id === selectedProject)?.image || '/images/project-bhk.jpg'}
                  alt={projects.find((p) => p.id === selectedProject)?.title || 'Project'}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-heading font-bold text-primary mb-3">
                  Project Details
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {projects.find((p) => p.id === selectedProject)?.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <p className="text-sm text-foreground/60 mb-1">Duration</p>
                  <p className="font-semibold text-primary">4-6 Weeks</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg border border-border">
                  <p className="text-sm text-foreground/60 mb-1">Team Size</p>
                  <p className="font-semibold text-primary">5-8 Professionals</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:scale-105 transition-all text-center"
                >
                  Request Similar Design
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 px-6 py-3 border border-border rounded-lg font-semibold hover:bg-secondary transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1a1a3d] to-[#2d2d5f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Inspired by Our Work?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's create something equally beautiful for your space.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Start Your Project
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
