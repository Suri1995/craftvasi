'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-accent mb-4">
              Craftvasi
            </h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Transforming spaces into extraordinary experiences with premium interior design and construction.
            </p>
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
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
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
              <li><Link href="/services#kitchen" className="hover:text-accent transition-colors">Modular Kitchen</Link></li>
              <li><Link href="/services#living" className="hover:text-accent transition-colors">Living Room Space</Link></li>
              <li><Link href="/services#bedroom" className="hover:text-accent transition-colors">Bedrooms</Link></li>
              <li><Link href="/services#kids" className="hover:text-accent transition-colors">Kids Bedrooms</Link></li>
              <li><Link href="/services#vastu" className="hover:text-accent transition-colors">Vastu Consulting</Link></li>
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-accent text-accent-foreground border-t border-accent/20 z-30">
        <div className="flex gap-2 p-3">
          <a
            href="tel:+919700707830"
            className="flex-1 py-2 px-3 bg-accent-foreground text-accent rounded font-semibold text-center text-sm hover:bg-opacity-90 transition-all"
          >
            Call
          </a>
          <a
            href="https://wa.me/919700707830"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 bg-accent-foreground text-accent rounded font-semibold text-center text-sm hover:bg-opacity-90 transition-all"
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
