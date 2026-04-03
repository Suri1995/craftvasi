"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  Building2,
  ShoppingCart,
  Sofa,
  Hammer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

import CustomizedHomeFurniture from "@/public/customized-home-furniture.jpg"
import OfficeFurniture from "@/public/office-furniture-solutions.jpg"
import RetailStore from "@/public/retail-store-furniture.jpg"
import FurnishingDecors from "@/public/furnishing-decors.jpg"
import ConstructionRenovation from "@/public/construction-renovation.jpg"

export default function ServicesPage() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(
              entry.target as HTMLDivElement,
            );
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: "home-furniture",
      title: "Home Furniture Design & Customization",
      description:
        "Personalized furniture pieces for every room in your home, designed to reflect your personality and optimize comfort.",
      icon: Home,
      subservices: [
        {
          name: "Living Room Solutions",
          desc: "Luxurious sofas, coffee tables, entertainment units, and accent pieces",
        },
        {
          name: "Bedroom Essentials",
          desc: "Customized beds, wardrobes, nightstands, and dressing tables",
        },
        {
          name: "Kitchen & Dining",
          desc: "Modular kitchens, dining tables, chairs, and storage cabinets",
        },
        {
          name: "Outdoor & Balcony",
          desc: "Stylish outdoor seating, tables, and decor pieces",
        },
      ],
      image: CustomizedHomeFurniture,
    },
    {
      id: "office-furniture",
      title: "Office Furniture Solutions",
      description:
        "Ergonomic and functional office spaces that promote productivity, professionalism, and employee well-being.",
      icon: Building2,
      subservices: [
        {
          name: "Workstations",
          desc: "Modular and adjustable work desks for optimal space and comfort",
        },
        {
          name: "Seating Solutions",
          desc: "Ergonomic chairs for executives, staff, and conference rooms",
        },
        {
          name: "Storage Units",
          desc: "Filing cabinets, bookshelves, and lockers for organized spaces",
        },
        {
          name: "Meeting Rooms & Lounges",
          desc: "Sleek conference tables, lounge furniture, and reception desks",
        },
      ],
      image: OfficeFurniture,
    },
    {
      id: "retail-furniture",
      title: "Retail Store Furniture & Displays",
      description:
        "Custom retail solutions designed to enhance customer experience and maximize product visibility.",
      icon: ShoppingCart,
      subservices: [
        {
          name: "Display Units",
          desc: "Custom shelving, racks, and showcases for various retail sectors",
        },
        {
          name: "Point-of-Sale Counters",
          desc: "Stylish and functional cash counters and checkout areas",
        },
        {
          name: "Seating & Decor",
          desc: "Aesthetic furniture to create inviting customer spaces",
        },
        {
          name: "Brand-Themed Interiors",
          desc: "Designs that align with your brand identity and target audience",
        },
      ],
      image: RetailStore,
    },
    {
      id: "furnishings-decor",
      title: "Furnishings & Decor",
      description:
        "Complete your interiors with elegant furnishings and decor that complement your design aesthetic.",
      icon: Sofa,
      subservices: [
        {
          name: "Soft Furnishings",
          desc: "Curtains, blinds, cushions, rugs, and upholstery customized to your style",
        },
        {
          name: "Lighting Solutions",
          desc: "Ambient, task, and accent lighting that sets the perfect mood",
        },
        {
          name: "Wall Decor",
          desc: "Artistic wall panels, wallpapers, and paintings for character",
        },
        {
          name: "Accessories",
          desc: "Handpicked decor items like vases, clocks, and mirrors",
        },
      ],
      image: FurnishingDecors,
    },
    {
      id: "construction",
      title: "Construction & Renovation Services",
      description:
        "End-to-end construction and remodeling solutions from conceptualization to execution.",
      icon: Hammer,
      subservices: [
        {
          name: "New Constructions",
          desc: "Residential and commercial building with modern architecture focus",
        },
        {
          name: "Renovations",
          desc: "Upgrading outdated spaces to contemporary designs",
        },
        {
          name: "Space Optimization",
          desc: "Smart layouts and structural modifications for better utilization",
        },
        {
          name: "Turnkey Projects",
          desc: "From conceptualization to execution, we handle it all",
        },
      ],
      image: ConstructionRenovation,
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Initial Consultation",
      description:
        "We get to know you and understand your needs, preferences, goals, budget, and timeline for the project.",
    },
    {
      step: "02",
      title: "Conceptualization & Design",
      description:
        "Our designers craft initial concepts with mood boards, sketches, layouts, and material recommendations.",
    },
    {
      step: "03",
      title: "3D Visualization & Refinement",
      description:
        "High-quality 3D renderings help you preview the design and allow us to fine-tune details based on feedback.",
    },
    {
      step: "04",
      title: "Final Design Approval",
      description:
        "We present the final design plan with layout, materials, colors, and get your formal approval.",
    },
    {
      step: "05",
      title: "Project Scheduling & Procurement",
      description:
        "We schedule timelines, procure materials, and select contractors ensuring quality standards.",
    },
    {
      step: "06",
      title: "Execution & Construction",
      description:
        "Our team handles installation, construction, and all aspects with continuous quality monitoring.",
    },
    {
      step: "07",
      title: "Quality Checks & Supervision",
      description:
        "Regular quality checks ensure every element meets standards and the project stays on schedule.",
    },
    {
      step: "08",
      title: "Final Walkthrough & Handover",
      description:
        "We conduct final walkthrough, inspect every detail, and only complete once you're satisfied.",
    },
    {
      step: "09",
      title: "Post-Completion Support",
      description:
        "We offer ongoing support to ensure everything functions as planned and are here for adjustments.",
    },
  ];

  const currentService = services[currentServiceIndex];
  const Icon = currentService.icon;

  const handlePrevious = () => {
    setCurrentServiceIndex((prev) =>
      prev === 0 ? services.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentServiceIndex((prev) =>
      prev === services.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="py-[28px] md:py-20 bg-gradient-to-b from-[#050539] via-[#151547] to-[#2d2d5f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/10 rounded-full uppercase">
              <span className="text-accent font-semibold text-sm">
                Our Services
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-300 mb-6 text-balance">
              Comprehensive Design & Construction{" "}
              <span className="text-accent">Solutions</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              From home interiors to commercial spaces, we provide innovative
              and tailored solutions that reflect your unique needs and dreams
              while maintaining the highest standards of quality and
              craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section
  className="py-[28px] md:py-20 relative overflow-hidden"
  style={{
    background:
      "radial-gradient(ellipse at 40% 50%, hsl(var(--accent)/0.07) 0%, hsl(var(--background)) 55%, hsl(var(--primary)/0.05) 100%)",
  }}
>
  {/* Decorative blobs */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

      {/* Content */}
      <div className="order-2 lg:order-1 relative">
        {/* Service counter badge */}
        <div className="flex items-center gap-4 mb-8">
          <div className="group/icon w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0
            hover:bg-accent hover:border-accent transition-all duration-300 cursor-default">
            <Icon className="w-8 h-8 text-accent group-hover/icon:text-white transition-colors duration-300" />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/8 border border-accent/15 rounded-full mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-accent font-semibold text-xs tracking-widest uppercase">
                Service {currentServiceIndex + 1} of {services.length}
              </span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 leading-tight">
          {currentService.title}
        </h2>

        {/* Animated underline */}
        <div className="w-16 h-1 bg-accent/50 rounded-full mb-6" />

        {/* Description */}
        <p className="text-lg text-foreground/70 leading-relaxed mb-8">
          {currentService.description}
        </p>

        {/* What We Offer */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-4 bg-accent rounded-full" />
            <p className="text-sm font-bold text-primary tracking-wide uppercase">
              What We Offer
            </p>
          </div>

          <div className="space-y-3">
            {currentService.subservices.map((sub, subIndex) => (
              <div
                key={subIndex}
                className="group/item flex gap-4 p-3 rounded-2xl border border-transparent
                  hover:border-accent/20 hover:bg-accent/5 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center flex-shrink-0
                  group-hover/item:bg-accent group-hover/item:border-accent transition-all duration-300 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-accent group-hover/item:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm group-hover/item:text-accent transition-colors duration-300">
                    {sub.name}
                  </p>
                  <p className="text-foreground/60 text-sm mt-0.5">{sub.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/contact"
          className="group/btn inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-2xl
            bg-accent/10 border border-accent/20 text-accent
            hover:bg-primary hover:border-primary hover:text-white
            transition-all duration-300"
        >
          Get Started
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Image + Mobile Nav */}
      <div className="order-1 lg:order-2 relative">

        {/* Decorative frame */}
        <div className="absolute -top-3 -right-3 w-full h-full rounded-3xl border border-accent/15 pointer-events-none z-0 hidden md:block" />
        <div className="absolute -top-1.5 -right-1.5 w-full h-full rounded-3xl border border-accent/8 pointer-events-none z-0 hidden md:block" />

        {/* Image */}
        <div className="relative h-80 md:h-[500px] rounded-3xl overflow-hidden border border-accent/20
          shadow-2xl shadow-accent/10 z-10
          hover:shadow-primary/15 hover:border-primary/30 transition-all duration-500 group">
          <Image
            src={currentService.image}
            alt={currentService.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent
            group-hover:from-primary/30 transition-all duration-500" />

          {/* Floating service title on image */}
          <div className="absolute bottom-5 left-5 right-5">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/40
              group-hover:bg-white/90 transition-all duration-300">
              <p className="text-xs font-bold tracking-widest uppercase text-accent mb-0.5">
                Currently Viewing
              </p>
              <p className="text-sm font-heading font-bold text-primary truncate">
                {currentService.title}
              </p>
            </div>
          </div>
        </div>

        {/* Corner accent dot */}
        <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-accent/40 blur-sm z-0" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-accent z-0" />

        {/* ── Mobile Carousel Navigation — below image, mobile only ── */}
        <div className="flex lg:hidden items-center justify-center gap-6 mt-6">
          <button
            onClick={handlePrevious}
            className="group/nav w-11 h-11 rounded-2xl border border-accent/20 bg-accent/5
              hover:bg-primary hover:border-primary
              flex items-center justify-center transition-all duration-300"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-5 h-5 text-accent group-hover/nav:text-white transition-colors duration-300" />
          </button>

          <div className="flex items-center gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentServiceIndex(index)}
                className={`h-2 rounded-full transition-all duration-300
                  ${index === currentServiceIndex
                    ? "bg-accent w-8 shadow-sm shadow-accent/40"
                    : "bg-accent/20 w-2 hover:bg-accent/50 hover:w-4"
                  }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="group/nav w-11 h-11 rounded-2xl border border-accent/20 bg-accent/5
              hover:bg-primary hover:border-primary
              flex items-center justify-center transition-all duration-300"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5 text-accent group-hover/nav:text-white transition-colors duration-300" />
          </button>
        </div>

      </div>
    </div>

    {/* ── Desktop Carousel Navigation — below full grid, desktop only ── */}
    <div className="hidden lg:flex items-center justify-center gap-6 mt-10">
      <button
        onClick={handlePrevious}
        className="group/nav w-11 h-11 rounded-2xl border border-accent/20 bg-accent/5
          hover:bg-primary hover:border-primary
          flex items-center justify-center transition-all duration-300"
        aria-label="Previous service"
      >
        <ChevronLeft className="w-5 h-5 text-accent group-hover/nav:text-white transition-colors duration-300" />
      </button>

      <div className="flex items-center gap-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentServiceIndex(index)}
            className={`h-2 rounded-full transition-all duration-300
              ${index === currentServiceIndex
                ? "bg-accent w-8 shadow-sm shadow-accent/40"
                : "bg-accent/20 w-2 hover:bg-accent/50 hover:w-4"
              }`}
            aria-label={`Go to service ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        className="group/nav w-11 h-11 rounded-2xl border border-accent/20 bg-accent/5
          hover:bg-primary hover:border-primary
          flex items-center justify-center transition-all duration-300"
        aria-label="Next service"
      >
        <ChevronRight className="w-5 h-5 text-accent group-hover/nav:text-white transition-colors duration-300" />
      </button>
    </div>

  </div>
</section>

      {/* Process Section */}
      <section className="py-[28px] md:py-20 relative overflow-hidden bg-gradient-to-br from-accent/5 via-background to-primary/5">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Our Proven <span className="text-accent">Process</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              From initial consultation to post-completion support, we follow a
              structured and client-focused approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((process, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index + services.length] = el;
                }}
                className={`scroll-reveal ${visibleCards.includes(index + services.length) ? "is-visible" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="group relative h-full bg-white/55 backdrop-blur-sm border border-accent/15 rounded-3xl p-8 overflow-hidden
            transition-all duration-500
            hover:-translate-y-2
            hover:border-primary/50
            hover:shadow-2xl hover:shadow-primary/15
            hover:bg-white/80"
                >
                  {/* Top line expands on hover */}
                  <div
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-primary transition-all duration-500"
                  />

                  {/* Corner glow */}
                  <div
                    className="absolute -top-8 -right-8 w-28 h-28 bg-accent/0 rounded-full blur-2xl
              group-hover:bg-primary/15 transition-all duration-500"
                  />

                  {/* Large background step number */}
                  <span
                    className="absolute bottom-4 right-6 text-8xl font-bold select-none text-accent/5
              group-hover:text-primary/10 transition-all duration-500"
                  >
                    {process.step}
                  </span>

                  {/* Step badge + connector */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0
                group-hover:bg-primary group-hover:border-primary group-hover:scale-110 group-hover:rotate-3
                transition-all duration-300"
                    >
                      <span className="text-xl font-heading font-bold text-accent group-hover:text-white transition-colors duration-300">
                        {process.step}
                      </span>
                    </div>

                    {/* Connector dots */}
                    <div className="flex gap-1 flex-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full bg-accent/15
                      group-hover:bg-primary/30 transition-all duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-heading font-bold text-primary mb-3
              group-hover:text-accent transition-colors duration-300"
                  >
                    {process.title}
                  </h3>

                  {/* Animated underline */}
                  <div
                    className="w-8 h-1 bg-accent/40 rounded-full mb-4
              group-hover:w-16 group-hover:bg-primary transition-all duration-500"
                  />

                  {/* Description */}
                  <p
                    className="text-foreground/65 leading-relaxed text-sm
              group-hover:text-foreground/90 transition-colors duration-300"
                  >
                    {process.description}
                  </p>

                  {/* Bottom line expands on hover */}
                  <div
                    className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-primary/40 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary)/0.04) 0%, hsl(var(--background)) 50%, hsl(var(--accent)/0.06) 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
              Why Us
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Why Choose <span className="text-accent">Craftvasi</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Excellence in every detail, from consultation to completion
            </p>
          </div>

          {/* Unique layout — large feature + grid */}
          <div className="space-y-6">
            {/* Top row — 1 large + 2 small */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large featured card */}
              <div
                ref={(el) => {
                  if (el)
                    cardsRef.current[
                      0 + services.length + processSteps.length
                    ] = el;
                }}
                className={`scroll-reveal md:col-span-2 ${visibleCards.includes(0 + services.length + processSteps.length) ? "is-visible" : ""}`}
                style={{ transitionDelay: "0ms" }}
              >
                <div
                  className="group relative h-full min-h-[220px] bg-primary rounded-3xl p-8 md:p-10 overflow-hidden
            transition-all duration-500
            hover:-translate-y-1
            hover:shadow-2xl hover:shadow-primary/30"
                >
                  {/* Animated background circle */}
                  <div
                    className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/5
              group-hover:scale-125 group-hover:bg-white/8 transition-all duration-700"
                  />
                  <div
                    className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5
              group-hover:scale-125 transition-all duration-500"
                  />

                  {/* Top line */}
                  <div
                    className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-white/40 transition-all duration-500"
                  />

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6
              group-hover:bg-accent group-hover:border-accent group-hover:scale-110 group-hover:rotate-3
              transition-all duration-300"
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 relative z-10">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                        Expert Team
                      </h3>
                      <div
                        className="w-10 h-1 bg-accent rounded-full mb-4
                  group-hover:w-20 transition-all duration-500"
                      />
                      <p
                        className="text-white/70 leading-relaxed max-w-md
                  group-hover:text-white/90 transition-colors duration-300"
                      >
                        10+ years of experience with 200+ completed projects
                        across residential, commercial, and hospitality sectors.
                      </p>
                    </div>

                    {/* Big stat */}
                    <div className="flex-shrink-0 text-right">
                      <p
                        className="text-5xl md:text-6xl font-heading font-bold text-white/20
                  group-hover:text-white/30 transition-all duration-500"
                      >
                        200+
                      </p>
                      <p className="text-xs text-white/50 tracking-widest uppercase">
                        Projects
                      </p>
                    </div>
                  </div>

                  {/* Bottom line */}
                  <div
                    className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-white/25 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Small card 1 */}
              <div
                ref={(el) => {
                  if (el)
                    cardsRef.current[
                      1 + services.length + processSteps.length
                    ] = el;
                }}
                className={`scroll-reveal ${visibleCards.includes(1 + services.length + processSteps.length) ? "is-visible" : ""}`}
                style={{ transitionDelay: "80ms" }}
              >
                <div
                  className="group relative h-full min-h-[220px] bg-white/55 backdrop-blur-sm border border-accent/15 rounded-3xl p-8 overflow-hidden
            transition-all duration-500
            hover:-translate-y-1
            hover:border-accent/50
            hover:shadow-2xl hover:shadow-accent/15
            hover:bg-white/80"
                >
                  <div
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500"
                  />
                  <div
                    className="absolute -top-8 -right-8 w-28 h-28 bg-accent/0 rounded-full blur-2xl
              group-hover:bg-accent/20 transition-all duration-500"
                  />

                  <div
                    className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6
              group-hover:bg-accent group-hover:border-accent group-hover:scale-110 group-hover:rotate-3
              transition-all duration-300 text-accent group-hover:text-white"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>

                  <h3
                    className="text-xl font-heading font-bold text-primary mb-2
              group-hover:text-accent transition-colors duration-300"
                  >
                    Client-Centric Approach
                  </h3>
                  <div
                    className="w-8 h-1 bg-accent/40 rounded-full mb-3
              group-hover:w-16 group-hover:bg-accent transition-all duration-500"
                  />
                  <p
                    className="text-foreground/65 text-sm leading-relaxed
              group-hover:text-foreground/90 transition-colors duration-300"
                  >
                    Your vision is our priority. Transparent communication,
                    every step.
                  </p>

                  <div
                    className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-accent/40 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Middle row — 3 equal cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Quality Craftsmanship",
                  description:
                    "Meticulous attention to detail and premium materials ensure beautiful and functional spaces.",
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  ),
                  refIndex: 2,
                  delay: "160ms",
                },
                {
                  title: "On-Time & On-Budget",
                  description:
                    "We manage projects efficiently to deliver results within agreed timelines and budgets.",
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  refIndex: 3,
                  delay: "240ms",
                },
                {
                  title: "Innovative Design",
                  description:
                    "We stay ahead of trends and incorporate the latest technologies and sustainable practices.",
                  icon: (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                      />
                    </svg>
                  ),
                  refIndex: 4,
                  delay: "320ms",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    if (el)
                      cardsRef.current[
                        item.refIndex + services.length + processSteps.length
                      ] = el;
                  }}
                  className={`scroll-reveal ${visibleCards.includes(item.refIndex + services.length + processSteps.length) ? "is-visible" : ""}`}
                  style={{ transitionDelay: item.delay }}
                >
                  <div
                    className="group relative h-full bg-white/55 backdrop-blur-sm border border-accent/15 rounded-3xl p-8 overflow-hidden
              transition-all duration-500
              hover:-translate-y-1
              hover:border-primary/50
              hover:shadow-2xl hover:shadow-primary/15
              hover:bg-white/80"
                  >
                    <div
                      className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent
                group-hover:left-0 group-hover:right-0 group-hover:via-primary transition-all duration-500"
                    />
                    <div
                      className="absolute -top-8 -right-8 w-24 h-24 bg-accent/0 rounded-full blur-2xl
                group-hover:bg-primary/15 transition-all duration-500"
                    />

                    <div
                      className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6
                group-hover:bg-primary group-hover:border-primary group-hover:scale-110 group-hover:rotate-3
                transition-all duration-300 text-accent group-hover:text-white"
                    >
                      {item.icon}
                    </div>

                    <h3
                      className="text-xl font-heading font-bold text-primary mb-2
                group-hover:text-accent transition-colors duration-300"
                    >
                      {item.title}
                    </h3>
                    <div
                      className="w-8 h-1 bg-accent/40 rounded-full mb-3
                group-hover:w-16 group-hover:bg-primary transition-all duration-500"
                    />
                    <p
                      className="text-foreground/65 text-sm leading-relaxed
                group-hover:text-foreground/90 transition-colors duration-300"
                    >
                      {item.description}
                    </p>

                    <div
                      className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent
                group-hover:left-0 group-hover:right-0 group-hover:via-primary/40 transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row — 2 small + 1 large accent */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Small card */}
              <div
                ref={(el) => {
                  if (el)
                    cardsRef.current[
                      5 + services.length + processSteps.length
                    ] = el;
                }}
                className={`scroll-reveal ${visibleCards.includes(5 + services.length + processSteps.length) ? "is-visible" : ""}`}
                style={{ transitionDelay: "400ms" }}
              >
                <div
                  className="group relative h-full min-h-[220px] bg-white/55 backdrop-blur-sm border border-accent/15 rounded-3xl p-8 overflow-hidden
            transition-all duration-500
            hover:-translate-y-1
            hover:border-accent/50
            hover:shadow-2xl hover:shadow-accent/15
            hover:bg-white/80"
                >
                  <div
                    className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500"
                  />
                  <div
                    className="absolute -top-8 -right-8 w-28 h-28 bg-accent/0 rounded-full blur-2xl
              group-hover:bg-accent/20 transition-all duration-500"
                  />

                  <div
                    className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6
              group-hover:bg-accent group-hover:border-accent group-hover:scale-110 group-hover:rotate-3
              transition-all duration-300 text-accent group-hover:text-white"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                      />
                    </svg>
                  </div>

                  <h3
                    className="text-xl font-heading font-bold text-primary mb-2
              group-hover:text-accent transition-colors duration-300"
                  >
                    End-to-End Solutions
                  </h3>
                  <div
                    className="w-8 h-1 bg-accent/40 rounded-full mb-3
              group-hover:w-16 group-hover:bg-accent transition-all duration-500"
                  />
                  <p
                    className="text-foreground/65 text-sm leading-relaxed
              group-hover:text-foreground/90 transition-colors duration-300"
                  >
                    From conceptualization to execution and post-completion
                    support.
                  </p>

                  <div
                    className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-accent/40 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Large accent CTA card */}
              <div
                className="md:col-span-2"
                style={{ transitionDelay: "480ms" }}
              >
                <div
                  className="group relative h-full min-h-[220px] bg-accent rounded-3xl p-8 md:p-10 overflow-hidden
            transition-all duration-500
            hover:-translate-y-1
            hover:shadow-2xl hover:shadow-accent/40"
                >
                  {/* Animated background circles */}
                  <div
                    className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-white/5
              group-hover:scale-125 transition-all duration-700"
                  />
                  <div
                    className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-white/5
              group-hover:scale-125 transition-all duration-500"
                  />

                  <div
                    className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-white/50 transition-all duration-500"
                  />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 h-full">
                    <div>
                      <span className="inline-block text-xs font-bold tracking-widest uppercase text-white/60 mb-3 px-3 py-1 rounded-full border border-white/20 bg-white/10">
                        Ready to Start?
                      </span>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                        Let's Build Something <br />
                        <span className="text-white/70">
                          Extraordinary Together
                        </span>
                      </h3>
                      <div
                        className="w-10 h-1 bg-white/40 rounded-full
                  group-hover:w-24 group-hover:bg-white transition-all duration-500"
                      />
                    </div>

                    <div className="flex-shrink-0">
                      <Link
                        href="/contact"
                        className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-white text-accent font-bold rounded-2xl
                    hover:bg-primary hover:text-white
                    transition-all duration-300 shadow-lg shadow-black/10"
                      >
                        Get Started
                        <div
                          className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center
                    group-hover/btn:bg-white/20 transition-all duration-300"
                        >
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent
              group-hover:left-0 group-hover:right-0 group-hover:via-white/25 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
