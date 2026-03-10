'use client'
import Image from 'next/image'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import CraftVasiLogo from "@/public/craftvasi-logo.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#1a1a3d] via-[#2d2d5f] to-[#1a1a3d] text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center">
                <Image
                  src={CraftVasiLogo}
                  alt="Craftvasi Logo"
                  width={120}
                  height={40}
                  priority
                  className="object-contain hover:opacity-90 transition-opacity"
                />
              </a>
            </div>
            {/* <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Transforming spaces into extraordinary experiences with premium interior design and construction.
            </p> */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-accent transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-accent transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold mb-4 uppercase text-sm tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home Interiors', href: '#home' },
                { label: 'Corporate Interiors', href: '#corporate' },
                { label: 'Constructions', href: '#construction' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-heading font-semibold mb-4 uppercase text-sm tracking-wide">
              Information
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '/about' },
                { label: "FAQ's", href: '/contact#faq' },
                { label: 'Careers', href: '#careers' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold mb-4 uppercase text-sm tracking-wide">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/services#kitchen" className="hover:text-accent transition-colors">Modular Kitchen</a></li>
              <li><a href="/services#living" className="hover:text-accent transition-colors">Living Room Space</a></li>
              <li><a href="/services#bedroom" className="hover:text-accent transition-colors">Bedrooms</a></li>
              <li><a href="/services#kids" className="hover:text-accent transition-colors">Kids Bedrooms</a></li>
              <li><a href="/services#vastu" className="hover:text-accent transition-colors">Vastu Consulting</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-heading font-semibold mb-4 uppercase text-sm tracking-wide">
              Contact Information
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <a href="tel:+919700707830" className="hover:text-accent transition-colors">
                  +91 9700707830
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@craftvasi.com" className="hover:text-accent transition-colors">
                  hello@craftvasi.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-sm text-primary-foreground/60 text-center">
            © 2024 Craftvasi. All rights reserved.
          </p>
        </div>
      </div>

      {/* Mobile Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-red-600 text-white border-t border-red-700 z-30">
        <div className="flex gap-2 p-3">
          <a
            href="tel:+919700707830"
            className="flex-1 py-2 px-3 bg-white text-red-600 rounded font-semibold text-center text-sm hover:bg-opacity-90 transition-all"
          >
            Call
          </a>
          <a
            href="https://wa.me/919700707830"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 bg-white text-red-600 rounded font-semibold text-center text-sm hover:bg-opacity-90 transition-all"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Footer spacer for mobile */}
      <div className="md:hidden h-16" />
    </footer>
  )
}
