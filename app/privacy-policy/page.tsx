"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Eye, Lock, Database, Bell, UserCheck, Globe, Mail, Phone, ArrowRight, ChevronRight } from "lucide-react";

const sections = [
  {
    id: "information-we-collect",
    icon: Database,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you contact us, submit an enquiry, or engage with our services, we may collect personal information including your full name, email address, phone number, project address, and any other information you voluntarily provide through our contact forms or questionnaires.",
      },
      {
        subtitle: "Project & Design Preferences",
        text: "As part of our Interior Enquiry Questionnaire, we collect details about your project type, BHK configuration, room-wise requirements, design preferences, and service selections. This information is used solely to prepare tailored design proposals for your space.",
      },
      {
        subtitle: "Technical Information",
        text: "We may automatically collect certain technical data when you visit our website, including your IP address, browser type, device information, pages visited, time spent on pages, and referring URLs. This data is collected using standard web analytics tools to improve our website performance.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Service Delivery",
        text: "Your personal information is primarily used to respond to your enquiries, prepare customised interior design proposals, schedule consultations, manage ongoing projects, and communicate project updates and timelines.",
      },
      {
        subtitle: "Business Operations",
        text: "We use your information to process transactions, send administrative communications, provide customer support, maintain accurate project records, and ensure seamless end-to-end project execution from concept to handover.",
      },
      {
        subtitle: "Improvement & Communication",
        text: "With your consent, we may use your contact details to share relevant updates about our services, new design trends, project showcases, and promotional offers. You may opt out of marketing communications at any time by contacting us directly.",
      },
    ],
  },
  {
    id: "data-protection",
    icon: Lock,
    title: "Data Protection & Security",
    content: [
      {
        subtitle: "Security Measures",
        text: "Craftvasi implements appropriate technical and organisational security measures to protect your personal information against unauthorised access, accidental loss, alteration, or disclosure. Our systems are regularly reviewed and updated to maintain data security.",
      },
      {
        subtitle: "Data Retention",
        text: "We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Project-related data may be retained for up to 7 years for warranty and service purposes.",
      },
      {
        subtitle: "Third-Party Access",
        text: "We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers who assist us in operating our website and delivering our services, subject to strict confidentiality agreements.",
      },
    ],
  },
  {
    id: "cookies",
    icon: Globe,
    title: "Cookies & Tracking Technologies",
    content: [
      {
        subtitle: "Use of Cookies",
        text: "Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyse website traffic, and understand user behaviour. Cookies are small data files stored on your device that help us remember your preferences and improve our services.",
      },
      {
        subtitle: "Types of Cookies",
        text: "We use essential cookies required for website functionality, analytical cookies to understand how visitors interact with our site, and preference cookies to remember your settings. We do not use advertising or cross-site tracking cookies.",
      },
      {
        subtitle: "Managing Cookies",
        text: "You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. Most browsers allow you to refuse cookies or alert you when cookies are being sent.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Correction",
        text: "You have the right to request access to the personal information we hold about you. If any information is inaccurate or incomplete, you may request corrections. We will respond to such requests within a reasonable timeframe.",
      },
      {
        subtitle: "Deletion & Restriction",
        text: "You may request the deletion of your personal data where there is no legitimate reason for us to continue processing it. You also have the right to request that we restrict processing of your data in certain circumstances.",
      },
      {
        subtitle: "Data Portability",
        text: "Where applicable, you have the right to receive a copy of your personal data in a structured, commonly used, and machine-readable format, and to transfer that data to another organisation.",
      },
    ],
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Communications & Notifications",
    content: [
      {
        subtitle: "Project Communications",
        text: "We will contact you via your provided email address or phone number for project-related communications including consultation confirmations, design approvals, site visit scheduling, material selections, and project progress updates.",
      },
      {
        subtitle: "WhatsApp & SMS",
        text: "By providing your phone number, you consent to receiving project-related communications via WhatsApp or SMS. These messages are limited to relevant project information and service updates. You may opt out by informing our team.",
      },
      {
        subtitle: "Marketing Communications",
        text: "Promotional communications such as new service announcements, design inspiration, and seasonal offers are sent only with your explicit consent. You may withdraw consent at any time by clicking the unsubscribe link or contacting us directly.",
      },
    ],
  },
  {
    id: "third-party",
    icon: Shield,
    title: "Third-Party Links & Services",
    content: [
      {
        subtitle: "External Links",
        text: "Our website may contain links to third-party websites including Google Maps, social media platforms, and partner services. These external sites have their own privacy policies and we are not responsible for their practices. We encourage you to review their policies before sharing any personal information.",
      },
      {
        subtitle: "Analytics Services",
        text: "We may use third-party analytics services such as Google Analytics to help us understand website usage patterns. These services may collect information about your visits to our site in accordance with their own privacy policies.",
      },
      {
        subtitle: "Payment Processing",
        text: "Any financial transactions are processed through secure, industry-standard payment gateways. Craftvasi does not store or have access to your complete payment card information. All payment data is handled in accordance with PCI-DSS standards.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("information-we-collect");
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setActiveSection(id);
              setVisibleSections((prev) => [...new Set([...prev, id])]);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "-80px 0px -60% 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isScrolling]);

  const scrollToSection = (id: string) => {
    setIsScrolling(true);
    setActiveSection(id);

    const el = sectionRefs.current[id];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-[#050539] via-[#151547] to-[#2d2d5f]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Shield + Legal combined card */}
            <div className="relative inline-flex items-center gap-4 mb-8 px-6 py-4 bg-white/5 border border-accent/20 rounded-3xl backdrop-blur-sm">
              {/* Glowing shield */}
              <div className="relative flex items-center justify-center flex-shrink-0">
                <div className="absolute w-14 h-14 rounded-full bg-accent/15 animate-ping" style={{ animationDuration: "3s" }} />
                <div className="absolute w-12 h-12 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                <div className="w-10 h-10 rounded-2xl bg-accent/20 border border-accent/30 backdrop-blur-sm flex items-center justify-center relative z-10">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
              </div>
              {/* Divider */}
              <div className="w-px h-8 bg-accent/20" />
              {/* Legal text */}
              <span className="text-xs font-semibold tracking-widest uppercase text-accent">
                Legal
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight">
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              Craftvasi Interior Studio & Constructions Pvt Ltd is committed to protecting your privacy and ensuring the security of your personal information.
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                { label: "Effective Date", value: "January 1, 2024" },
                { label: "Last Updated", value: "April 1, 2026" },
                { label: "Jurisdiction", value: "Hyderabad, India" },
              ].map((item, i) => (
                <div key={i} className="text-center px-4 py-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <p className="text-xs text-white/40 font-medium mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-white/80">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(var(--accent)/0.04) 0%, hsl(var(--background)) 50%, hsl(var(--primary)/0.04) 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/4 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/4 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex gap-12 items-start">

            {/* ── Fixed Sidebar ── */}
            <aside className="hidden lg:block w-[280px] flex-shrink-0">
              <div className="sticky top-24 space-y-3">

                {/* Nav card */}
                <div className="relative bg-white/60 backdrop-blur-md border border-accent/15 rounded-3xl p-6 shadow-xl shadow-accent/5">
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                  <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" />
                    Contents
                  </p>

                  <nav className="space-y-1">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all duration-300
                            ${isActive
                              ? "bg-primary text-white shadow-lg shadow-primary/20"
                              : "text-foreground/60 hover:bg-accent/5 hover:text-accent"
                            }`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 transition-colors duration-300
                            ${isActive ? "text-accent" : "text-accent/50 group-hover:text-accent"}`} />
                          <span className="text-xs font-semibold leading-tight">{section.title}</span>
                          {isActive && (
                            <ChevronRight className="w-3 h-3 ml-auto text-accent flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </nav>

                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                </div>

                {/* Contact card */}
                <div className="relative bg-primary rounded-3xl p-5 overflow-hidden">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/5 rounded-full" />
                  <p className="text-xs font-bold text-white/60 uppercase tracking-wide mb-2">Questions?</p>
                  <p className="text-sm font-semibold text-white mb-4 leading-tight">Contact our team for privacy enquiries</p>
                  <a
                    href="mailto:hello@craftvasi.com"
                    className="group inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white transition-colors duration-300"
                  >
                    hello@craftvasi.com
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </a>
                </div>

              </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 min-w-0 space-y-8">

              {/* Intro card */}
              <div className="relative bg-white/60 backdrop-blur-sm border border-accent/15 rounded-3xl p-8 overflow-hidden">
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-primary mb-2">Our Commitment to Your Privacy</h2>
                    <p className="text-foreground/65 leading-relaxed text-sm">
                      This Privacy Policy describes how{" "}
                      <span className="font-semibold text-primary">Craftvasi Interior Studio & Constructions Pvt Ltd</span>{" "}
                      ("Craftvasi", "we", "us", or "our"), a company registered in Hyderabad, Telangana, India, collects, uses, stores, and protects your personal information when you visit our website at{" "}
                      <span className="text-accent font-semibold">craftvasi.com</span> or engage with our interior design and construction services. By using our website or services, you agree to the practices described in this policy.
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
              </div>

              {/* Policy Sections */}
              {sections.map((section, sIndex) => {
                const Icon = section.icon;
                const isVisible = visibleSections.includes(section.id);
                return (
                  <div
                    key={section.id}
                    data-id={section.id}
                    ref={(el) => { sectionRefs.current[section.id] = el; }}
                    className={`relative bg-white/60 backdrop-blur-sm border border-accent/15 rounded-3xl overflow-hidden
                      transition-all duration-700
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                      hover:border-accent/30 hover:shadow-xl hover:shadow-accent/8 group`}
                    style={{ transitionDelay: `${sIndex * 50}ms` }}
                  >
                    {/* Top line */}
                    <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent
                      group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500" />

                    {/* Corner glow */}
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/0 rounded-full blur-2xl
                      group-hover:bg-accent/10 transition-all duration-500" />

                    {/* Section header */}
                    <div className="flex items-center gap-4 p-8 pb-6 border-b border-accent/10">
                      <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0
                        group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                        <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-accent/50 tracking-widest uppercase block mb-1">
                          0{sIndex + 1}
                        </span>
                        <h2 className="text-xl md:text-2xl font-heading font-bold text-primary
                          group-hover:text-accent transition-colors duration-300">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    {/* Animated underline */}
                    <div className="mx-8 mt-4">
                      <div className="w-10 h-1 bg-accent/30 rounded-full
                        group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-8 pt-5 space-y-6">
                      {section.content.map((item, cIndex) => (
                        <div
                          key={cIndex}
                          className="group/item flex gap-4 p-4 rounded-2xl border border-accent/8
                            hover:border-accent/25 hover:bg-accent/3 transition-all duration-300"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center
                              group-hover/item:bg-accent group-hover/item:border-accent transition-all duration-300">
                              <span className="text-[10px] font-bold text-accent group-hover/item:text-white transition-colors duration-300">
                                {cIndex + 1}
                              </span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-primary mb-2
                              group-hover/item:text-accent transition-colors duration-300">
                              {item.subtitle}
                            </h3>
                            <p className="text-foreground/60 leading-relaxed text-sm">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom line */}
                    <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent
                      group-hover:left-0 group-hover:right-0 group-hover:via-accent/30 transition-all duration-500" />
                  </div>
                );
              })}

              {/* Children's Privacy */}
              <div className="relative bg-primary/5 border border-primary/15 rounded-3xl p-8 overflow-hidden group
                hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent
                  group-hover:left-0 group-hover:right-0 group-hover:via-primary transition-all duration-500" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0
                    group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <Shield className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      Children's Privacy
                    </h2>
                    <div className="w-10 h-1 bg-primary/40 rounded-full mb-4 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                    <p className="text-foreground/65 leading-relaxed text-sm">
                      Craftvasi's services are intended for adults and businesses. Our website is not directed at children under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information without parental consent, we will take steps to delete such information promptly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="relative bg-accent/5 border border-accent/15 rounded-3xl p-8 overflow-hidden group
                hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10 transition-all duration-500">
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent
                  group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0
                    group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                    <Bell className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                      Changes to This Policy
                    </h2>
                    <div className="w-10 h-1 bg-accent/40 rounded-full mb-4 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
                    <p className="text-foreground/65 leading-relaxed text-sm">
                      Craftvasi reserves the right to update or modify this Privacy Policy at any time. When we make significant changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of our website or services after any changes constitutes your acceptance of the updated policy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact for Privacy */}
              <div className="relative bg-primary rounded-3xl p-8 md:p-10 overflow-hidden group
                hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/5
                  group-hover:scale-125 transition-all duration-700" />
                <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5
                  group-hover:scale-125 transition-all duration-500" />
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent
                  group-hover:left-0 group-hover:right-0 group-hover:via-white/40 transition-all duration-500" />

                <div className="relative z-10">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10">
                    Privacy Enquiries
                  </span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                    Contact Our Privacy Team
                  </h2>
                  <div className="w-12 h-1 bg-accent rounded-full mb-5
                    group-hover:w-24 transition-all duration-500" />
                  <p className="text-white/60 leading-relaxed mb-8 max-w-xl">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us using the details below. We are committed to addressing your privacy concerns promptly and transparently.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: Mail, label: "Email", value: "hello@craftvasi.com", href: "mailto:hello@craftvasi.com" },
                      { icon: Phone, label: "Phone", value: "+91 9700707830", href: "tel:+919700707830" },
                      { icon: Globe, label: "Address", value: "B.N. Reddy Nagar, Hyderabad", href: "#" },
                    ].map((contact, i) => {
                      const Icon = contact.icon;
                      return (
                        <a key={i} href={contact.href}
                          className="group/card flex items-center gap-3 p-4 bg-white/10 border border-white/15 rounded-2xl
                            hover:bg-accent hover:border-accent transition-all duration-300">
                          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0
                            group-hover/card:bg-white/20 transition-all duration-300">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-white/40 font-medium">{contact.label}</p>
                            <p className="text-xs font-semibold text-white leading-tight mt-0.5">{contact.value}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent
                  group-hover:left-0 group-hover:right-0 group-hover:via-white/20 transition-all duration-500" />
              </div>

              {/* Governing Law */}
              <div className="relative bg-white/55 backdrop-blur-sm border border-accent/15 rounded-3xl p-6 text-center overflow-hidden
                hover:border-accent/30 transition-all duration-300">
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                <p className="text-xs text-foreground/40 leading-relaxed">
                  This Privacy Policy is governed by the laws of India, including the Information Technology Act, 2000, and the Information Technology (Amendment) Act, 2008. Any disputes arising from this policy shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                </p>
                <p className="text-xs text-foreground/30 mt-3">
                  © 2026 Craftvasi Interior Studio & Constructions Pvt Ltd. All rights reserved.
                </p>
              </div>

            </main>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}