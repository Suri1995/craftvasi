'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from 'lucide-react'
import CraftVasiLogo from "@/public/craftvasi-logo.png";

// ── Inline SVG Social Icons ──
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/craftvasi",
    Icon: FacebookIcon,
    hoverColor: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
    hoverShadow: "hover:shadow-[#1877F2]/40",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/craftvasi_interiors/",
    Icon: InstagramIcon,
    hoverColor: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] hover:border-transparent hover:text-white",
    hoverShadow: "hover:shadow-[#E1306C]/40",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@craftvasi",
    Icon: YoutubeIcon,
    hoverColor: "hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white",
    hoverShadow: "hover:shadow-[#FF0000]/40",
  },
]

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-gradient-to-r from-[#1a1a3d]/50 via-[#2d2d5f]/50 to-[#1a1a3d]/50 text-primary-foreground">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* ── Brand + Socials ── */}
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

          {/* Social Icons — same style as Header */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/40 mr-1 hidden sm:inline">
              Follow us
            </span>
            <div className="w-px h-5 bg-primary-foreground/15 mr-1 hidden sm:block" />
            {socialLinks.map(({ label, href, Icon, hoverColor, hoverShadow }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`
                  group relative w-9 h-9 rounded-xl
                  flex items-center justify-center
                  border border-primary-foreground/20
                  bg-white/10 backdrop-blur-sm
                  text-primary-foreground/70
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:scale-110 hover:shadow-lg
                  ${hoverColor} ${hoverShadow}
                `}
              >
                {/* Shine sweep */}
                <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <span className="absolute -top-4 -left-4 w-8 h-16 bg-white/20 rotate-12 translate-x-[-150%] group-hover:translate-x-[350%] transition-transform duration-500 ease-in-out" />
                </span>
                <Icon className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              </a>
            ))}
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

        {/* ── Bottom ── */}
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
function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-4 uppercase text-sm">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map((l, i) => (
          <li key={i}>
            <a href={l.href} className="hover:text-accent">{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* Mobile Accordion */
function MobileSection({ title, open, toggle, children }: {
  title: string
  open: boolean
  toggle: () => void
  children: React.ReactNode
}) {
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