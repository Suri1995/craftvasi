"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { X, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imagesRef.current.indexOf(
              entry.target as HTMLDivElement,
            );
            setVisibleImages((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 },
    );
    imagesRef.current.forEach((img) => {
      if (img) observer.observe(img);
    });
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "Modern Apartment Interior",
      category: "Residential",
      image: "/modern-apartment-interior.jpg",
      description:
        "Complete interior of a 1200 sq ft apartment with modern aesthetics and smart storage solutions.",
    },
    {
      id: 2,
      title: "Corporate Office Design",
      category: "Commercial",
      image: "/images/project-office.jpg",
      description:
        "Open-concept office layout with collaborative spaces and executive areas.",
    },
    {
      id: 3,
      title: "Luxury Villa Interior",
      category: "Residential",
      image: "/luxury-villa-interior.jpg",
      description:
        "High-end villa design featuring premium materials and sophisticated styling.",
    },
    {
      id: 4,
      title: "Retail Store Fitout",
      category: "Commercial",
      image: "/images/project-grocery.jpg",
      description:
        "Modern retail space with customer-focused layout and brand integration.",
    },
    {
      id: 5,
      title: "Cafe Interior",
      category: "Commercial",
      image: "/images/project-cafe.jpg",
      description:
        "Minimalistic cafe with ambient lighting and cozy seating arrangements.",
    },
    {
      id: 6,
      title: "Restaurant Interior",
      category: "Commercial",
      image: "/images/project-cafe.jpg",
      description: "Stylish dining space with optimal flow and cozy ambiance.",
    },
    {
      id: 7,
      title: "Kitchen Interior",
      category: "Residential",
      image: "/images/hero-kitchen.jpg",
      description:
        "Modern kitchen with smart appliances and efficient workflow.",
    },
    {
      id: 8,
      title: "Building Construction",
      category: "Commercial",
      image: "/images/project-building.jpg",
      description:
        "Multi-story building with contemporary architecture and green spaces.",
    },
    {
      id: 9,
      title: "Master Bedroom Suite",
      category: "Residential",
      image: "master-bedroom-interior.jpg",
      description:
        "Luxurious bedroom with walk-in closet and spa-like bathroom.",
    },
  ];

  const categories = ["All", "Residential", "Commercial"];
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* ── Hero ── */}
      <section className="relative py-[28px] md:py-20 overflow-hidden bg-gradient-to-b from-[#050539] via-[#151547] to-[#2d2d5f]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/10 rounded-full uppercase">
              <span className="text-accent font-semibold text-sm">
                Our Portfolio
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-300 mb-6 leading-tight">
              Our <span className="text-accent">Projects</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-10">
              Explore our portfolio of completed projects showcasing our design
              expertise and craftsmanship
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { value: "200+", label: "Projects Completed" },
                { value: "10+", label: "Years Experience" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-heading font-bold text-accent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-100 font-medium mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our PortFolio Section */}
      <section className="relative bg-background">

        {/* Decorative Background Blobs */}
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 items-start">

            {/* ── Sidebar Filter ── */}
            <aside className="lg:sticky lg:top-24 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-2">
                  Our Projects
                </h2>
                <div className="w-12 h-1 bg-accent rounded-full mb-6" />
                {/* <p className="text-sm text-foreground/60 leading-relaxed">
                  Explore our curated selection of residential and commercial
                  masterpieces.
                </p> */}
              </div>
              <div className="flex flex-row lg:flex-col flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 text-left border

                    ${
                      activeCategory === category
                        ? "bg-primary text-white shadow-lg shadow-primary/20 border-primary scale-105 z-10"
                        : "bg-white/50 backdrop-blur-sm border-accent/10 text-foreground/60 hover:border-accent/40 hover:text-accent"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Desktop Helper Text */}
              {/* <div className="hidden lg:block pt-8 border-t border-accent/10">
                <span className="text-[10px] uppercase tracking-widest font-bold text-accent/50">
                  Crafting Excellence Since 2019
                </span>
              </div> */}
            </aside>

            {/* ── Projects Grid ── */}
            <main>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
                {filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    ref={(el) => {
                      if (el && imagesRef.current)
                        imagesRef.current[index] = el;
                    }}
                    onClick={() => setSelectedProject(project.id)}
                    style={{ transitionDelay: `${index * 60}ms` }}
                    className={`group cursor-pointer scroll-reveal ${
                      visibleImages.includes(index) ? "is-visible" : ""
                    } ${index % 3 === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}
                  >
                    <div
                      className={`relative bg-accent/5 rounded-[2rem] overflow-hidden border border-accent/15
                    transition-all duration-500
                    hover:-translate-y-2
                    hover:border-accent/50
                    hover:shadow-2xl hover:shadow-accent/15
                    ${
                      index % 3 === 0
                        ? "h-[500px] md:h-[600px]"
                        : "h-72 md:h-80"
                    }`}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500" />

                      {/* Category badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-1.5 bg-primary/90 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold tracking-widest uppercase group-hover:bg-accent transition-all duration-300">
                          {project.category}
                        </span>
                      </div>

                      {/* Arrow icon */}
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-accent/30 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                        <h3 className="text-white text-xl md:text-2xl font-heading font-bold mb-2 leading-tight">
                          {project.title}
                        </h3>

                        <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-24 overflow-hidden">
                          {project.description}
                        </p>
                      </div>
                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500" />
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {selectedProject !== null && selectedProjectData && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-background border border-accent/20 rounded-3xl max-w-2xl w-full max-h-[70vh] overflow-y-auto shadow-2xl shadow-accent/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top line */}
            <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-accent/10 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
              <div>
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-1 px-3 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                  {selectedProjectData.category}
                </span>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-primary mt-1">
                  {selectedProjectData.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-2xl border border-accent/20 bg-accent/5 flex items-center justify-center
                  hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-accent/10">
                <Image
                  src={selectedProjectData.image || "/images/project-bhk.jpg"}
                  alt={selectedProjectData.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>

              {/* Description */}
              <div className="bg-accent/5 border border-accent/15 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-primary tracking-wide uppercase mb-2 flex items-center gap-2">
                  <div className="w-1 h-4 bg-accent rounded-full" />
                  Project Details
                </h3>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {selectedProjectData.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Duration", value: "4-6 Weeks" },
                  { label: "Team Size", value: "5-8 Professionals" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group/stat p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-accent/15
                    hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                  >
                    <p className="text-xs text-foreground/50 font-medium mb-1 uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className="font-heading font-bold text-primary group-hover/stat:text-accent transition-colors duration-300">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="group/btn flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-semibold
                    hover:bg-accent hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
                >
                  Request Similar Design
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 px-6 py-3 border border-accent/20 rounded-2xl font-semibold text-foreground/70
                    hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-primary">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/2 rounded-full blur-3xl pointer-events-none" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-5 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm">
            Let's Work Together
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Inspired by <br />
            <span className="text-accent">Our Work?</span>
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's create something equally beautiful for your space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white rounded-2xl font-bold text-lg
                hover:bg-white hover:text-primary transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-white/20"
            >
              Start Your Project
              <div
                className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center
                group-hover:bg-primary/10 transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-2xl font-semibold text-lg
                hover:border-accent hover:text-accent transition-all duration-300 backdrop-blur-sm"
            >
              Learn About Us
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
