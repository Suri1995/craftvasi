"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import CraftVasiLogo from "@/public/craftvasi-logo.png";

// ── Inline SVG Social Icons (no extra dependency needed) ──
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/craftvasi",
    Icon: FacebookIcon,
    hoverColor: "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white",
    hoverShadow: "hover:shadow-[#1877F2]/30",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/craftvasi_interiors/",
    Icon: InstagramIcon,
    hoverColor: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#E1306C] hover:to-[#F77737] hover:border-transparent hover:text-white",
    hoverShadow: "hover:shadow-[#E1306C]/30",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@craftvasi",
    Icon: YoutubeIcon,
    hoverColor: "hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white",
    hoverShadow: "hover:shadow-[#FF0000]/30",
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[1000] py-4 transition-all duration-300 shadow-lg bg-[#f5ebeb]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── Logo ── */}
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center">
                <Image
                  src={CraftVasiLogo}
                  alt="Craftvasi Logo"
                  width={160}
                  height={40}
                  priority
                  className="object-contain hover:opacity-90 transition-opacity"
                />
              </a>
            </div>

            {/* ── Desktop Nav + CTA + Socials ── */}
            <div className="flex items-center gap-6">

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`font-medium text-[1.25rem] transition-colors ${
                        isActive
                          ? "text-red-500"
                          : "text-[#1a1a3d] hover:text-red-400"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              {/* ── Desktop Phone CTA ── */}
              <div className="hidden md:block">
                <a
                  href="tel:+919700707830"
                  className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-300 text-[1rem]"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91 9700707830</span>
                </a>
              </div>

              {/* ── Desktop Social Icons ── */}
              <div className="hidden md:flex items-center gap-2">
                {/* Thin vertical divider */}
                <div className="w-px h-8 bg-[#1a1a3d]/15 mr-1" />

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
                      border border-[#1a1a3d]/15
                      bg-white/70 backdrop-blur-sm
                      text-[#1a1a3d]/60
                      shadow-sm
                      transition-all duration-300
                      hover:-translate-y-0.5 hover:scale-110 hover:shadow-lg
                      ${hoverColor} ${hoverShadow}
                    `}
                  >
                    {/* Subtle shine sweep on hover */}
                    <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <span className="absolute -top-4 -left-4 w-8 h-16 bg-white/20 rotate-12 translate-x-[-150%] group-hover:translate-x-[350%] transition-transform duration-500 ease-in-out" />
                    </span>
                    <Icon className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Mobile Menu Button ── */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border mt-4 pt-4 bg-background">
            <nav className="flex flex-col gap-3 px-4 sm:px-6 lg:px-8">
              {/* Mobile Phone */}
              <a
                href="tel:+919700707830"
                className="flex items-center gap-2 font-semibold py-2 text-foreground hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 9700707830
              </a>

              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`font-medium transition-colors animate-slideInLeft ${
                      isActive ? "text-accent" : "text-foreground hover:text-accent"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}

              <a
                href="/contact"
                className="mt-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold text-center hover:scale-105 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Now
              </a>

              {/* ── Mobile Social Icons ── */}
              <div className="flex items-center gap-3 pt-3 pb-1 border-t border-border mt-1">
                <span className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">Follow us</span>
                <div className="flex items-center gap-2">
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
                        border border-foreground/10
                        bg-background text-foreground/50
                        shadow-sm transition-all duration-300
                        hover:-translate-y-0.5 hover:scale-110 hover:shadow-lg
                        ${hoverColor} ${hoverShadow}
                      `}
                    >
                      <Icon className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}