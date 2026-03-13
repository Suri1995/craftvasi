"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import CraftVasiLogo from "@/public/craftvasi-logo.png";

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
  className="fixed top-0 left-0 right-0 z-1000 py-4 transition-all duration-300 shadow-lg
             bg-[#f5ebeb]"
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
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

            {/* Desktop Nav + CTA */}
            <div className="flex gap-20 items-center">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className={`font-medium text-[20px] transition-colors ${
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

              {/* Desktop Phone CTA */}
              <div className="hidden md:block">
                <a
                  href="tel:+919573117830"
                  className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-300 text-[16px]"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91 9573117830</span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border mt-4 pt-4 bg-background">
            <nav className="flex flex-col gap-3 px-4 sm:px-6 lg:px-8">
              {/* Mobile Phone */}
              <a
                href="tel:+919573117830"
                className="flex items-center gap-2 font-semibold py-2 text-foreground hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 9573117830
              </a>

              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`font-medium transition-colors animate-slideInLeft ${
                      isActive
                        ? "text-accent"
                        : "text-foreground hover:text-accent"
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
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
