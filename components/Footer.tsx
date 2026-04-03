'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
} from 'lucide-react'
import CraftVasiLogo from "@/public/craftvasi-logo.png";

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-gradient-to-r from-[#1a1a3d]/50 via-[#2d2d5f]/50 to-[#1a1a3d]/50 text-primary-foreground">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Brand (Common for all devices) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">

          <a href="/" className="flex items-center">
            <Image
              src={CraftVasiLogo}
              alt="Craftvasi Logo"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </a>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" className="hover:text-accent">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-accent">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-accent">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:grid grid-cols-5 gap-8 mb-8">

          <FooterColumn title="Navigation" links={[
            { label: 'Home Interiors', href: '#home' },
            { label: 'Corporate Interiors', href: '#corporate' },
            { label: 'Constructions', href: '#construction' },
            { label: 'Contact', href: '/contact' },
            { label: 'Policy', href: '/privacy-policy' },
          ]} />

          <FooterColumn title="Information" links={[
            { label: 'About', href: '/about' },
            { label: "FAQ's", href: '/contact#faq' },
            { label: 'Blogs', href: '/blog' },
          ]} />

          <FooterColumn title="Our Services" links={[
            { label: 'Modular Kitchen', href: '/services#kitchen' },
            { label: 'Living Room Space', href: '/services#living' },
            { label: 'Bedrooms', href: '/services#bedroom' },
            { label: 'Kids Bedrooms', href: '/services#kids' },
            { label: 'Vastu Consulting', href: '/services#vastu' },
          ]} />

          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="flex gap-2 items-center"><Phone size={16}/> +91 9700707830</p>
              <p className="flex gap-2 items-center"><Mail size={16}/> craftvasi@gmail.com</p>
              <p className="flex gap-2 items-center"><MapPin size={16}/> Hyderabad</p>
            </div>
          </div>

        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">

          <MobileSection title="Navigation" open={openSection === 'nav'} toggle={() => toggleSection('nav')}>
            {[
              { label: 'Home Interiors', href: '#home' },
              { label: 'Corporate Interiors', href: '#corporate' },
              { label: 'Constructions', href: '#construction' },
              { label: 'Contact', href: '/contact' },
              { label: 'Policy', href: '/privacy-policy' },
            ].map((link, i) => (
              <a key={i} href={link.href} className="block py-1 text-sm hover:text-accent">
                {link.label}
              </a>
            ))}
          </MobileSection>

          <MobileSection title="Information" open={openSection === 'info'} toggle={() => toggleSection('info')}>
            {[
              { label: 'About', href: '/about' },
              { label: "FAQ's", href: '/contact#faq' },
              { label: 'Blogs', href: '/blog' },
            ].map((link, i) => (
              <a key={i} href={link.href} className="block py-1 text-sm hover:text-accent">
                {link.label}
              </a>
            ))}
          </MobileSection>

          <MobileSection title="Services" open={openSection === 'services'} toggle={() => toggleSection('services')}>
            {[
              { label: 'Modular Kitchen', href: '/services#kitchen' },
              { label: 'Living Room Space', href: '/services#living' },
              { label: 'Bedrooms', href: '/services#bedroom' },
              { label: 'Kids Bedrooms', href: '/services#kids' },
              { label: 'Vastu Consulting', href: '/services#vastu' },
            ].map((link, i) => (
              <a key={i} href={link.href} className="block py-1 text-sm hover:text-accent">
                {link.label}
              </a>
            ))}
          </MobileSection>

          <MobileSection title="Contact" open={openSection === 'contact'} toggle={() => toggleSection('contact')}>
            <p className="flex gap-2 items-center"><Phone size={16}/> +91 9700707830</p>
            <p className="flex gap-2 items-center mt-2"><Mail size={16}/> craftvasi@gmail.com</p>
            <p className="flex gap-2 items-center mt-2"><MapPin size={16}/> Hyderabad</p>
          </MobileSection>

        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-6 mt-8 text-center text-sm">
          <p>© 2026 Craftvasi. All rights reserved.</p>
          <p className="mt-1">
            Developed by{' '}
            <a href="https://sellute.com/" target="_blank" className="underline font-semibold">
              Sellute Business Solutions
            </a>
          </p>
        </div>
      </div>

      {/* ================= MOBILE CTA ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-red-600 text-white border-t border-red-700 z-30">
        <div className="flex gap-2 p-3">
          <a href="tel:+919700707830" className="flex-1 py-2 bg-white text-red-600 rounded text-center font-semibold text-sm">
            Call
          </a>
          <a href="https://wa.me/919700707830" target="_blank" className="flex-1 py-2 bg-white text-red-600 rounded text-center font-semibold text-sm">
            WhatsApp
          </a>
        </div>
      </div>

      {/* Spacer */}
      <div className="md:hidden h-16" />

    </footer>
  )
}

/* Desktop Column */
function FooterColumn({ title, links }: any) {
  return (
    <div>
      <h4 className="font-semibold mb-4 uppercase text-sm">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((l: any, i: number) => (
          <li key={i}>
            <a href={l.href} className="hover:text-accent">{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Mobile Accordion */
function MobileSection({ title, open, toggle, children }: any) {
  return (
    <div className="border-b border-white/20 pb-2">
      <button onClick={toggle} className="w-full flex justify-between items-center py-3">
        <span className="font-semibold">{title}</span>
        <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60' : 'max-h-0'}`}>
        <div className="pb-2">{children}</div>
      </div>
    </div>
  )
}