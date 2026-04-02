"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Award, Users, Zap } from "lucide-react";
import Link from "next/link";

import AboutUsImg from "@/public/about-us-img.jpeg";
import CEO from "@/public/ceo-image.png"
import MD from "@/public/md-image.png"

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(
              entry.target as HTMLDivElement,
            );
            setVisibleSections((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 },
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="py-[28px] md:py-20 bg-gradient-to-b from-[#050539] via-[#151547] to-[#2d2d5f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/10 rounded-full uppercase">
              <span className="text-accent font-semibold text-sm">
                About Us
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl leading-[3.25rem] md:leading-[5.375rem] font-heading font-bold text-gray-300 mb-6 text-balance">
              Designing Your <span className="text-accent">Dreams</span>,
              Building Your <span className="text-accent">Future</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Excellence in every detail — Craftvasi Interior Studio &
              Construction transforms spaces into inspiring environments through
              creativity, precision, and sustainable design.
            </p>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-[28px] md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={(el) => {
              if (el) sectionsRef.current[0] = el;
            }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-reveal ${
              visibleSections.includes(0) ? "is-visible" : ""
            }`}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                About <span className="text-accent">Craftvasi</span>
              </h2>
              <div className="space-y-4 text-lg text-foreground/70 leading-relaxed">
                <p>
                  Since its establishment in 2019, Craftvasi Interior Studio &
                  Construction has been dedicated to crafting exceptional spaces
                  that seamlessly blend design and functionality. We specialize
                  in interior design, construction, and renovation services for
                  residential, commercial, and hospitality projects.
                </p>
                <p>
                  Our talented team of designers, architects, and builders work
                  collaboratively to transform spaces into unique, inspiring
                  environments tailored to the needs and desires of our clients.
                  We believe that every space has the potential to tell a story.
                </p>
                <p>
                  Our approach combines creative design with meticulous
                  craftsmanship to deliver spaces that are not only visually
                  striking but also practical and sustainable. We don't just
                  build — we build dreams, turning visions into reality, one
                  space at a time.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-accent hover:gap-4 transition-all font-semibold mt-8"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={AboutUsImg}
                alt="Craftvasi team collaborating on interior design projects"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-[28px] md:py-20 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Our Vision - accent themed */}
            <div
              ref={(el) => {
                if (el) sectionsRef.current[1] = el;
              }}
              className={`scroll-reveal ${visibleSections.includes(1) ? "is-visible" : ""}`}
            >
              <div
                className="group h-full relative bg-background/60 backdrop-blur-sm border border-accent/20 rounded-3xl p-10 md:p-14 overflow-hidden
          transition-all duration-500
          hover:border-accent/60
          hover:shadow-2xl hover:shadow-accent/20
          hover:bg-accent/5
          hover:-translate-y-1"
              >
                {/* Top accent line — expands on hover */}
                <div
                  className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent
            group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500"
                />

                {/* Corner glow on hover */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 bg-accent/0 rounded-full
            group-hover:bg-accent/10 transition-all duration-500 blur-2xl"
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8
            group-hover:bg-accent group-hover:border-accent group-hover:scale-110 group-hover:rotate-3
            transition-all duration-300"
                >
                  <svg
                    className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>

                {/* Main heading */}
                <h2
                  className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3 leading-tight
            group-hover:text-accent transition-colors duration-300"
                >
                  Our Vision
                </h2>

                {/* Sub heading */}
                <p
                  className="text-lg md:text-xl text-accent/70 font-semibold mb-6
            group-hover:text-accent transition-colors duration-300"
                >
                  Where We're Headed
                </p>

                {/* Animated underline */}
                <div
                  className="w-12 h-1 bg-accent/40 rounded-full mb-6
            group-hover:w-24 group-hover:bg-accent transition-all duration-500"
                />

                <p
                  className="text-lg text-foreground/70 leading-relaxed
            group-hover:text-foreground/90 transition-colors duration-300"
                >
                  To be a leader in the design and construction industry,
                  recognized for our creativity, craftsmanship, and commitment
                  to excellence. We aim to transform spaces into inspiring
                  environments that enhance the way people live, work, and
                  interact.
                </p>

                {/* Bottom line — expands on hover */}
                <div
                  className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent
            group-hover:left-0 group-hover:right-0 group-hover:via-accent/50 transition-all duration-500"
                />
              </div>
            </div>

            {/* Our Mission - primary themed */}
            <div
              ref={(el) => {
                if (el) sectionsRef.current[2] = el;
              }}
              className={`scroll-reveal ${visibleSections.includes(2) ? "is-visible" : ""}`}
            >
              <div
                className="group h-full relative bg-primary/5 border border-primary/20 rounded-3xl p-10 md:p-14 overflow-hidden
          transition-all duration-500
          hover:border-primary/60
          hover:shadow-2xl hover:shadow-primary/20
          hover:bg-primary/10
          hover:-translate-y-1"
              >
                {/* Top primary line — expands on hover */}
                <div
                  className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent
            group-hover:left-0 group-hover:right-0 group-hover:via-primary transition-all duration-500"
                />

                {/* Corner glow on hover */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 bg-primary/0 rounded-full
            group-hover:bg-primary/10 transition-all duration-500 blur-2xl"
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8
            group-hover:bg-primary group-hover:border-primary group-hover:scale-110 group-hover:rotate-3
            transition-all duration-300"
                >
                  <svg
                    className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300"
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

                {/* Main heading */}
                <h2
                  className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3 leading-tight
            group-hover:text-primary transition-colors duration-300"
                >
                  Our Mission
                </h2>

                {/* Sub heading */}
                <p
                  className="text-lg md:text-xl text-primary/60 font-semibold mb-6
            group-hover:text-primary transition-colors duration-300"
                >
                  What We Stand For
                </p>

                {/* Animated underline */}
                <div
                  className="w-12 h-1 bg-primary/40 rounded-full mb-6
            group-hover:w-24 group-hover:bg-primary transition-all duration-500"
                />

                <p
                  className="text-lg text-foreground/70 leading-relaxed
            group-hover:text-foreground/90 transition-colors duration-300"
                >
                  To deliver exceptional interior design and construction
                  services that exceed client expectations through creativity,
                  precision, and sustainable practices. We strive to provide
                  innovative, tailored solutions that reflect the unique needs
                  and dreams of our clients.
                </p>

                {/* Bottom line — expands on hover */}
                <div
                  className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent
            group-hover:left-0 group-hover:right-0 group-hover:via-primary/50 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section
        className="py-[28px] md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fdf4 100%)",
        }}
      >
        {/* Soft background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-white/60 backdrop-blur-sm">
              What Drives Us
            </span>
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
                title: "Integrity",
                description:
                  "Maintaining the highest standards of honesty and professionalism in every project and interaction.",
                icon: Award,
                number: "01",
              },
              {
                title: "Innovation",
                description:
                  "Embracing creativity and staying ahead of design trends to offer unique and effective solutions.",
                icon: Zap,
                number: "02",
              },
              {
                title: "Client-Centricity",
                description:
                  "Ensuring customer satisfaction is at the heart of every project and decision we make.",
                icon: Users,
                number: "03",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) sectionsRef.current[index + 3] = el;
                  }}
                  className={`scroll-reveal ${visibleSections.includes(index + 3) ? "is-visible" : ""}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className="group relative h-full bg-white/70 backdrop-blur-sm border border-accent/15 rounded-3xl p-8 md:p-10 overflow-hidden
              transition-all duration-500
              hover:-translate-y-2
              hover:border-accent/50
              hover:shadow-2xl hover:shadow-accent/10
              hover:bg-white/90"
                  >
                    {/* Top line expands on hover */}
                    <div
                      className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent
                group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500"
                    />

                    {/* Corner glow */}
                    <div
                      className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl bg-accent/0
                group-hover:bg-accent/15 transition-all duration-500"
                    />

                    {/* Background number */}
                    <span
                      className="absolute bottom-6 right-8 text-7xl font-bold select-none text-accent/5
                group-hover:text-accent/15 transition-all duration-500"
                    >
                      {value.number}
                    </span>

                    {/* Icon box */}
                    <div
                      className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8
                group-hover:bg-primary group-hover:border-primary group-hover:scale-110 group-hover:rotate-3
                transition-all duration-300"
                    >
                      <Icon className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl font-heading font-bold text-primary mb-3
                group-hover:text-accent transition-colors duration-300"
                    >
                      {value.title}
                    </h3>

                    {/* Animated underline */}
                    <div
                      className="w-10 h-1 bg-accent/40 rounded-full mb-5
                group-hover:w-20 group-hover:bg-accent transition-all duration-500"
                    />

                    {/* Description */}
                    <p
                      className="text-foreground/70 leading-relaxed
                group-hover:text-foreground/90 transition-colors duration-300"
                    >
                      {value.description}
                    </p>

                    {/* Bottom line expands on hover */}
                    <div
                      className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent
                group-hover:left-0 group-hover:right-0 group-hover:via-accent/40 transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section
        className="py-[28px] md:py-20 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, hsl(var(--accent)/0.08) 0%, hsl(var(--background)) 60%, hsl(var(--primary)/0.05) 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/8 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/8 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={(el) => {
              if (el) sectionsRef.current[6] = el;
            }}
            className={`scroll-reveal ${visibleSections.includes(6) ? "is-visible" : ""}`}
          >
            {/* Header */}
            <div className="mb-10 text-center">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-white/60 backdrop-blur-sm">
                Leadership
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mt-2">
                Message from Our Leadership
              </h2>
            </div>

            {/* Main Card */}
            <div
              className="group relative bg-white/60 backdrop-blur-md border border-accent/15 rounded-3xl p-10 md:p-14 overflow-hidden
        transition-all duration-500
        hover:border-accent/40
        hover:shadow-2xl hover:shadow-accent/10
        hover:bg-white/80"
            >
              {/* Top line expands on hover */}
              <div
                className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent
          group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500"
              />

              {/* Corner glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 bg-accent/0 rounded-full blur-2xl
          group-hover:bg-accent/15 transition-all duration-500"
              />

              {/* Large quote mark */}
              <div
                className="absolute top-6 left-8 text-9xl font-serif text-accent/10 leading-none select-none
          group-hover:text-accent/20 transition-all duration-500"
              >
                "
              </div>

              {/* Quote lines */}
              <div className="relative md:mt-10">
                {/* Vertical accent line */}
                <div
                  className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/60 via-accent/30 to-transparent rounded-full
            group-hover:from-accent group-hover:via-accent/50 transition-all duration-500"
                />

                <p
                  className="text-lg text-foreground/70 leading-relaxed mb-6
            group-hover:text-foreground/90 transition-colors duration-300"
                >
                  "Welcome to Craftvasi Interior Studio & Construction. Since
                  our establishment in 2019, we have remained dedicated to
                  transforming spaces and bringing our clients' visions to life
                  with creativity, precision, and quality craftsmanship. As a
                  company, we believe that great design is about more than
                  aesthetics; it's about creating environments that enhance the
                  way people live, work, and experience the world around them."
                </p>

                <p
                  className="text-lg text-foreground/70 leading-relaxed mb-8
            group-hover:text-foreground/90 transition-colors duration-300"
                >
                  "Our talented team of designers, architects, and builders
                  works collaboratively on every project to ensure it is
                  tailored to the unique needs and aspirations of our clients.
                  At Craftvasi, we pride ourselves on building lasting
                  relationships with our clients, founded on trust,
                  transparency, and exceptional service."
                </p>
              </div>

              {/* Divider */}
              <div
                className="h-px bg-gradient-to-r from-accent/30 via-accent/10 to-transparent mb-8
          group-hover:from-accent/50 transition-all duration-500"
              />

              {/* Author row */}
              <div className="flex items-center gap-5">
                {/* Avatar circle */}
                <div
                  className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0
  group-hover:bg-primary group-hover:border-primary group-hover:scale-105 transition-all duration-300"
                >
                  <svg
                    className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>

                <div>
                  <p
                    className="font-heading font-bold text-primary text-lg leading-tight
              group-hover:text-accent transition-colors duration-300"
                  >
                    Bhanuprakash Reddy Pothula
                  </p>
                  <p className="text-accent/80 group-hover:text-primary font-semibold text-sm mt-0.5">
                    CEO, Craftvasi Interior Studio & Construction
                  </p>
                </div>

                {/* Decorative dots */}
                <div className="ml-auto flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-2 h-2 rounded-full bg-accent/40" />
                  <div className="w-2 h-2 rounded-full bg-accent/60" />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
              </div>

              {/* Bottom line expands on hover */}
              <div
                className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent
          group-hover:left-0 group-hover:right-0 group-hover:via-accent/40 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section
        className="py-[28px] md:py-20 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, hsl(var(--accent)/0.08) 0%, hsl(var(--background)) 50%, hsl(var(--primary)/0.06) 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/6 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/6 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent/4 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
              Since 2019
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Our Journey & <span className="text-accent">Milestones</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Key moments that shaped our growth and defined who we are today
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Mobile vertical line */}
            <div
              className="absolute left-[27px] top-0 bottom-0 w-px md:hidden"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--accent)), hsl(var(--accent)/0.3), transparent)",
              }}
            />

            {/* Desktop SVG snake dashed line connecting icons */}
            <div
              className="hidden md:block absolute inset-0 pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 800 1200"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="snakeGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(var(--accent))"
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="50%"
                      stopColor="hsl(var(--accent))"
                      stopOpacity="0.5"
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(var(--accent))"
                      stopOpacity="0.1"
                    />
                  </linearGradient>
                </defs>
                {/* Snake path: center → right → center → left → center → right → center → left → center */}
                <path
                  d="
              M 400 100
              C 400 160, 580 160, 580 220
              C 580 280, 400 280, 400 340
              C 400 400, 220 400, 220 460
              C 220 520, 400 520, 400 580
              C 400 640, 580 640, 580 700
              C 580 760, 400 760, 400 820
              C 400 880, 220 880, 220 940
              C 220 1000, 400 1000, 400 1060
            "
                  stroke="url(#snakeGrad)"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            <div className="space-y-12 relative" style={{ zIndex: 1 }}>
              {[
                {
                  year: "2019",
                  title: "Foundation",
                  description:
                    "Craftvasi Interior Studio & Construction was established with a vision to deliver innovative and high-quality interior design and construction services.",
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
                        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                      />
                    </svg>
                  ),
                  align: "right",
                },
                {
                  year: "2021",
                  title: "Commercial Expansion",
                  description:
                    "The company ventured into commercial projects, offering specialized design and construction services for offices, retail spaces, and hospitality developments.",
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
                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                      />
                    </svg>
                  ),
                  align: "left",
                },
                {
                  year: "2022",
                  title: "Construction Sector Entry",
                  description:
                    "Craftvasi expanded its service offerings by officially entering the construction sector, providing comprehensive design and build solutions.",
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
                        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                      />
                    </svg>
                  ),
                  align: "right",
                },
                {
                  year: "2023",
                  title: "200+ Projects Milestone",
                  description:
                    "Successfully completed over 200+ projects, marking a significant milestone in our growth and reputation for excellence.",
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
                        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                      />
                    </svg>
                  ),
                  align: "left",
                },
                {
                  year: "2024",
                  title: "New Office & Team Growth",
                  description:
                    "Expanded operations with a new office and growing team in B.N. Reddy Nagar, Hyderabad, to better serve our valued clients.",
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
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                  ),
                  align: "right",
                },
              ].map((milestone, index) => {
                const isRight = milestone.align === "right";
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) sectionsRef.current[index + 7] = el;
                    }}
                    className={`scroll-reveal ${visibleSections.includes(index + 7) ? "is-visible" : ""}`}
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    <div
                      className={`group flex items-center gap-0 md:gap-8
                ${isRight ? "flex-row" : "flex-row md:flex-row-reverse"}`}
                    >
                      {/* Card */}
                      <div
                        className={`flex-1 relative bg-white/55 backdrop-blur-sm border border-accent/15 rounded-3xl p-7 overflow-hidden
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:border-accent/50
                  hover:shadow-2xl hover:shadow-accent/10
                  hover:bg-white/80
                  ml-10 md:ml-0`}
                      >
                        {/* Top line */}
                        <div
                          className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent
                    group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500"
                        />

                        {/* Corner glow */}
                        <div
                          className={`absolute -top-8 w-32 h-32 bg-accent/0 rounded-full blur-2xl
                    group-hover:bg-accent/15 transition-all duration-500
                    ${isRight ? "-right-8" : "-left-8"}`}
                        />

                        {/* Year badge + line */}
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest bg-accent/10 text-accent border border-accent/20
                      group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300"
                          >
                            {milestone.year}
                          </span>
                          <div
                            className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent
                      group-hover:from-accent/60 transition-all duration-500"
                          />
                        </div>

                        {/* Title */}
                        <h3
                          className="text-xl md:text-2xl font-heading font-bold text-primary mb-3
                    group-hover:text-accent transition-colors duration-300"
                        >
                          {milestone.title}
                        </h3>

                        {/* Animated underline */}
                        <div
                          className="w-8 h-1 bg-accent/40 rounded-full mb-4
                    group-hover:w-16 group-hover:bg-accent transition-all duration-500"
                        />

                        {/* Description */}
                        <p
                          className="text-foreground/65 leading-relaxed text-sm md:text-base
                    group-hover:text-foreground/90 transition-colors duration-300"
                        >
                          {milestone.description}
                        </p>

                        {/* Bottom line */}
                        <div
                          className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent
                    group-hover:left-0 group-hover:right-0 group-hover:via-accent/40 transition-all duration-500"
                        />
                      </div>

                      {/* Center icon node — desktop */}
                      <div className="hidden md:flex flex-col items-center flex-shrink-0 relative z-10">
                        {/* Pulse ring */}
                        <div className="absolute w-16 h-16 rounded-2xl border-2 border-accent/20 animate-ping opacity-30" />
                        <div
                          className="w-14 h-14 rounded-2xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center
                    group-hover:bg-primary group-hover:border-accent group-hover:scale-110 group-hover:rotate-6
                    transition-all duration-300 text-accent group-hover:text-white shadow-lg shadow-accent/10
                    group-hover:shadow-primary/30 relative z-10 backdrop-blur-sm"
                        >
                          {milestone.icon}
                        </div>
                      </div>

                      {/* Mobile icon */}
                      <div className="md:hidden absolute left-0 z-10">
                        <div
                          className="w-10 h-10 rounded-xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center
                    group-hover:bg-accent group-hover:border-accent
                    transition-all duration-300 text-accent group-hover:text-white"
                        >
                          {milestone.icon}
                        </div>
                      </div>

                      {/* Empty space for alternating layout */}
                      <div className="hidden md:block flex-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
          <section

      className="py-[28px] md:py-20 relative overflow-hidden"

      style={{

        background:

          "radial-gradient(ellipse at 50% 30%, hsl(var(--accent)/0.07) 0%, hsl(var(--background)) 55%, hsl(var(--primary)/0.05) 100%)",

      }}

    >

      {/* Decorative blobs */}

      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/6 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/6 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}

        <div className="text-center mb-20">

          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">

            Our People

          </span>

          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">

            Meet Our <span className="text-accent">Leadership</span>

          </h2>

          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">

            Visionary professionals leading Craftvasi

          </p>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto items-stretch">

          {[

            {

              name: "Bhanuprakash Reddy Pothula",

              role: "CEO",

              image: CEO, // Ensure this variable is imported or defined

              background: "Founder and visionary CEO of Craftvasi since 2019, Bhanuprakash has led 200+ projects across residential, commercial, and hospitality sectors. He combines creative passion with strategic thinking to craft spaces that elevate how people live and work.",

              tags: ["Founder", "Creative Vision", "Client Relations"],

            },

            {

              name: "Saibabu",

              role: "Managing Director",

              image: MD, // Ensure this variable is imported or defined

              background: "With 10+ years of experience, Saibabu is the operational backbone of Craftvasi. He oversees every phase from consulting to delivery, ensuring projects are completed on time, within budget, and to the highest standards of quality.",

              tags: ["Operations", "Strategy", "Delivery"],

            },

          ].map((leader, index) => (

            <div

              key={index}

              ref={(el) => {

                if (el) sectionsRef.current[index + 12] = el; // Ensure sectionsRef is defined in your component

              }}

              className={`scroll-reveal h-full ${visibleSections.includes(index + 12) ? "is-visible" : ""}`} // Ensure visibleSections is defined

              style={{ transitionDelay: `${index * 150}ms` }}

            >

              <div

                className="group relative bg-white/55 backdrop-blur-sm border border-accent/15 rounded-3xl overflow-hidden h-full flex flex-col

                  transition-all duration-500

                  hover:-translate-y-2

                  hover:border-primary/50

                  hover:shadow-2xl hover:shadow-primary/15

                  hover:bg-white/80"

              >

                {/* Top line expands on hover */}

                <div

                  className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent

                    group-hover:left-0 group-hover:right-0 group-hover:via-primary transition-all duration-500 z-10"

                />



                {/* Corner glow */}

                <div

                  className="absolute -top-10 -right-10 w-40 h-40 bg-accent/0 rounded-full blur-2xl

                    group-hover:bg-primary/15 transition-all duration-500"

                />



                {/* Avatar area - Height increased from h-56 to h-72 */}

                <div

                  className="relative h-72 flex-shrink-0 bg-gradient-to-br from-accent/10 via-accent/5 to-primary/10 flex items-center justify-center overflow-hidden

                    group-hover:from-primary/15 group-hover:via-primary/8 group-hover:to-accent/10 transition-all duration-500"

                >

                  {/* Background dot pattern */}

                  <div

                    className="absolute inset-0 opacity-10"

                    style={{

                      backgroundImage:

                        "radial-gradient(circle at 25% 25%, hsl(var(--accent)) 1px, transparent 1px), radial-gradient(circle at 75% 75%, hsl(var(--accent)) 1px, transparent 1px)",

                      backgroundSize: "30px 30px",

                    }}

                  />



                  {/* Decorative rings - Scaled up to avoid overlapping larger photo */}

                  <div

                    className="absolute w-48 h-48 rounded-full border-2 border-accent/10

                      group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500"

                  />

                  <div

                    className="absolute w-64 h-64 rounded-full border border-accent/5

                      group-hover:border-primary/15 group-hover:scale-110 transition-all duration-700"

                  />



                  {/* Floating particles */}

                  <div

                    className="absolute top-4 left-8 w-2 h-2 rounded-full bg-accent/30

                      group-hover:bg-primary/40 group-hover:-translate-y-2 transition-all duration-500"

                  />

                  <div

                    className="absolute top-8 right-12 w-1.5 h-1.5 rounded-full bg-accent/20

                      group-hover:bg-primary/30 group-hover:-translate-y-3 transition-all duration-700"

                  />

                  <div

                    className="absolute bottom-8 left-16 w-1 h-1 rounded-full bg-accent/25

                      group-hover:bg-primary/35 group-hover:-translate-y-1 transition-all duration-600"

                  />



                  {/* Avatar circle - Increased from w-28 h-28 to w-40 h-40 */}

                  <div

                    className="relative w-40 h-40 rounded-3xl bg-white/80 border-2 border-accent/20 flex items-center justify-center

                      group-hover:bg-primary group-hover:border-primary group-hover:scale-105 group-hover:rotate-2

                      transition-all duration-300 shadow-xl shadow-accent/10 group-hover:shadow-primary/30 z-10"

                  >

                    <Image

                      src={leader.image}

                      alt={leader.name}

                      className="w-full h-full object-cover rounded-3xl"

                    />

                  </div>



                  {/* Role badge floating on hover */}

                  <div

                    className="absolute bottom-6 left-1/2 -translate-x-1/2

                      opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0

                      transition-all duration-400 z-20"

                  >

                    <span className="px-4 py-1.5 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-lg whitespace-nowrap">

                      {leader.role}

                    </span>

                  </div>

                </div>



                {/* Content area */}

                <div className="p-8 relative flex flex-col flex-1">

                  {/* Name + role */}

                  <div className="mb-4">

                    <h3

                      className="text-xl md:text-2xl font-heading font-bold text-primary mb-1.5

                        group-hover:text-accent transition-colors duration-300"

                    >

                      {leader.name}

                    </h3>



                    {/* Role row — hidden on hover */}

                    <div

                      className="flex items-center gap-2

                        opacity-100 group-hover:opacity-0 group-hover:h-0 group-hover:mb-0 group-hover:overflow-hidden

                        transition-all duration-300"

                    >

                      <div className="w-2 h-2 rounded-full bg-accent transition-all duration-300" />

                      <p className="text-accent font-semibold text-sm tracking-wide">

                        {leader.role}

                      </p>

                    </div>

                  </div>



                  {/* Animated underline */}

                  <div

                    className="w-10 h-1 bg-accent/40 rounded-full mb-5

                      group-hover:w-20 group-hover:bg-primary transition-all duration-500"

                  />



                  {/* Description */}

                  <p

                    className="text-foreground/65 leading-relaxed text-sm mb-6 flex-1

                      group-hover:text-foreground/90 transition-colors duration-300"

                  >

                    {leader.background}

                  </p>



                  {/* Tags row — always at bottom */}

                  <div className="flex flex-wrap gap-2 pt-5 border-t border-accent/10 group-hover:border-primary/25 transition-colors duration-300 mt-auto">

                    {leader.tags.map((tag, i) => (

                      <span

                        key={i}

                        className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/8 text-accent border border-accent/15

                          group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/25

                          transition-all duration-300"

                        style={{ transitionDelay: `${i * 50}ms` }}

                      >

                        {tag}

                      </span>

                    ))}

                  </div>

                </div>



                {/* Bottom line expands on hover */}

                <div

                  className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent

                    group-hover:left-0 group-hover:right-0 group-hover:via-primary/50 transition-all duration-500"

                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

      {/* CTA Section */}
      <section className="py-[28px] md:py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create an environment that reflects your vision
            and enhances your lifestyle.
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
  );
}
