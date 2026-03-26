'use client'

import React from "react"

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CombinedContactForm } from '@/components/combined-contact-form'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#f0f4f8] to-white pt-24 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? We'd love to hear from you. Reach out to
              discuss your interior design needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            {[
              {
                icon: Phone,
                title: 'Phone',
                content: '+91 XXXXX XXXXX',
                href: 'tel:+919876543210',
              },
              {
                icon: Mail,
                title: 'Email',
                content: 'hello@craftvasi.com',
                href: 'mailto:hello@craftvasi.com',
              },
              {
                icon: MapPin,
                title: 'Location',
                content: 'Hyderabad, India',
                href: 'https://maps.google.com',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-8 bg-secondary rounded-lg border border-border hover:border-accent transition-all hover:scale-105 group text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70">{item.content}</p>
                </a>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-secondary rounded-lg border border-border">
              <CombinedContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f0f4f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Visit Us
            </h2>
            <p className="text-lg text-foreground/60">
              Located in the heart of Hyderabad
            </p>
          </div>

          <div className="rounded-lg overflow-hidden border border-border h-96 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-accent mx-auto mb-4" />
              <p className="text-foreground/60">
                Map view would be displayed here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Questionnaire Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#f0f4f8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How long does a typical project take?',
                a: 'Project duration varies based on scope. Consultation takes 1-2 weeks, design phase 2-4 weeks, and execution 4-8 weeks.',
              },
              {
                q: 'What is your design process?',
                a: 'We follow a structured process: consultation, concept design, refinement, implementation, and completion with your satisfaction guaranteed.',
              },
              {
                q: 'Do you provide 3D visualizations?',
                a: 'Yes, we provide detailed 3D visualizations so you can see your design before execution begins.',
              },
              {
                q: 'What is your warranty policy?',
                a: 'We offer a 1-year warranty on all our work, covering materials and craftsmanship defects.',
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group p-6 bg-secondary rounded-lg border border-border hover:border-accent transition-all cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-primary">
                  {faq.q}
                  <span className="text-accent group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-foreground/70 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
