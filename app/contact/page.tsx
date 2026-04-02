"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-[28px] md:py-20 overflow-hidden bg-gradient-to-b from-[#050539] via-[#151547] to-[#2d2d5f]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-accent/10 rounded-full uppercase">
            <span className="text-accent font-semibold text-sm">
              Contact Us
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-300 mb-6 leading-tight">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear from you. Reach out to
            discuss your interior design needs.
          </p>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section
        className="py-[28px] md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--accent)/0.03) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                title: "Phone",
                content: "+91 9573117830",
                subtitle: "Mon–Sat, 9am–6pm",
                href: "tel:+919876543210",
                color: "accent",
              },
              {
                icon: Mail,
                title: "Email",
                content: "hello@craftvasi.com",
                subtitle: "We reply within 24hrs",
                href: "mailto:hello@craftvasi.com",
                color: "primary",
              },
              {
                icon: MapPin,
                title: "Location",
                content: "Hyderabad, India",
                subtitle: "B.N. Reddy Nagar",
                href: "#map",
                color: "accent",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              const isPrimary = item.color === "primary";
              return (
                <a
                  key={index}
                  href={item.href}
                  className={`group relative overflow-hidden rounded-3xl p-8 border transition-all duration-500
                    hover:-translate-y-2 hover:shadow-2xl text-center
                    ${
                      isPrimary
                        ? "bg-primary border-primary/20 hover:shadow-primary/20"
                        : "bg-white/55 backdrop-blur-sm border-accent/15 hover:border-accent/50 hover:shadow-accent/15 hover:bg-white/80"
                    }`}
                >
                  {/* Top line */}
                  <div
                    className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500
                    group-hover:left-0 group-hover:right-0
                    ${isPrimary ? "via-white/20 group-hover:via-white/40" : "via-accent/40 group-hover:via-accent"}`}
                  />

                  {/* Corner glow */}
                  <div
                    className={`absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-0
                    group-hover:opacity-100 transition-all duration-500
                    ${isPrimary ? "bg-white/10" : "bg-accent/15"}`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3
                    ${
                      isPrimary
                        ? "bg-white/10 border-white/20 group-hover:bg-accent group-hover:border-accent"
                        : "bg-accent/10 border-accent/20 group-hover:bg-primary group-hover:border-primary"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 transition-colors duration-300
                      ${isPrimary ? "text-white" : "text-accent group-hover:text-white"}`}
                    />
                  </div>

                  <h3
                    className={`text-lg font-heading font-bold mb-1 transition-colors duration-300
                    ${isPrimary ? "text-white" : "text-primary group-hover:text-accent"}`}
                  >
                    {item.title}
                  </h3>

                  <div
                    className={`w-8 h-1 rounded-full mx-auto mb-3 transition-all duration-500
                    group-hover:w-16
                    ${isPrimary ? "bg-accent/60 group-hover:bg-accent" : "bg-accent/40 group-hover:bg-primary"}`}
                  />

                  <p
                    className={`font-semibold mb-1 transition-colors duration-300
                    ${isPrimary ? "text-white" : "text-foreground/80 group-hover:text-primary"}`}
                  >
                    {item.content}
                  </p>
                  <p
                    className={`text-sm ${isPrimary ? "text-white/50" : "text-foreground/40"}`}
                  >
                    {item.subtitle}
                  </p>

                  {/* Bottom line */}
                  <div
                    className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500
                    group-hover:left-0 group-hover:right-0
                    ${isPrimary ? "via-white/10 group-hover:via-white/25" : "via-accent/20 group-hover:via-primary/40"}`}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Form + Side info ── */}
      <section className="py-[28px] md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Left side info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                  Send a Message
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 leading-tight">
                  Let's Start a{" "}
                  <span className="text-accent">Conversation</span>
                </h2>
                <div className="w-12 h-1 bg-accent/50 rounded-full mb-5" />
                <p className="text-foreground/60 leading-relaxed">
                  Fill out the form and our team will get back to you within 24
                  hours with a tailored response to your enquiry.
                </p>
              </div>

              {/* What to expect */}
              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Submit your enquiry",
                    desc: "Fill the form with your project details",
                  },
                  {
                    step: "02",
                    title: "We review & respond",
                    desc: "Our team replies within 24 hours",
                  },
                  {
                    step: "03",
                    title: "Free consultation",
                    desc: "We schedule a call to discuss your vision",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex gap-4 p-4 rounded-2xl border border-accent/10
                    hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                  >
                    <div
                      className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0
                      group-hover:bg-accent group-hover:border-accent transition-all duration-300"
                    >
                      <span className="text-xs font-bold text-accent group-hover:text-white transition-colors duration-300">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary text-sm group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </p>
                      <p className="text-foreground/50 text-xs mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div
                className="group relative bg-white/60 backdrop-blur-sm border border-accent/15 rounded-3xl p-8 md:p-10 overflow-hidden
                transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/8"
              >
                {/* Top line */}
                <div
                  className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent
                  group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500"
                />

                {/* Success message */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 text-sm">
                        Message sent successfully!
                      </p>
                      <p className="text-green-700 text-sm mt-0.5">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900 text-sm">
                        Something went wrong.
                      </p>
                      <p className="text-red-700 text-sm mt-0.5">
                        Please try again or contact us directly.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="group/field">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-primary mb-2"
                      >
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-background/60 border border-accent/15 rounded-2xl text-sm
                          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15
                          hover:border-accent/30 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-primary mb-2"
                      >
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-background/60 border border-accent/15 rounded-2xl text-sm
                          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15
                          hover:border-accent/30 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Phone + Subject row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-primary mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 bg-background/60 border border-accent/15 rounded-2xl text-sm
                          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15
                          hover:border-accent/30 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-primary mb-2"
                      >
                        Project Type <span className="text-accent">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background/60 border border-accent/15 rounded-2xl text-sm
                          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15
                          hover:border-accent/30 transition-all duration-300"
                      >
                        <option value="">Select type...</option>
                        <option value="residential">Residential Design</option>
                        <option value="commercial">Commercial Space</option>
                        <option value="renovation">Renovation</option>
                        <option value="consultation">Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project..."
                      rows={5}
                      className="w-full px-4 py-3 bg-background/60 border border-accent/15 rounded-2xl text-sm
                        focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15
                        hover:border-accent/30 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm
                      hover:bg-accent hover:shadow-lg hover:shadow-accent/25
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>

                {/* Bottom line */}
                <div
                  className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent
                  group-hover:left-0 group-hover:right-0 group-hover:via-accent/40 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section
        id="map"
        className="py-[28px] md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--accent)/0.03) 0%, hsl(var(--background)) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Find Us
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary mb-3">
              Visit <span className="text-accent">Us</span>
            </h2>
            <p className="text-foreground/60">
              Located in the heart of Hyderabad
            </p>
          </div>

          <div
            className="relative rounded-3xl overflow-hidden border border-white/10 h-96
  shadow-2xl shadow-black/20 hover:shadow-black/40 transition-all duration-500"
          >
            {/* Google Map Background */}
            <iframe
              src="https://www.google.com/maps?q=Nagarjuna%20Sagar%20Road%20Chaitanya%20Nagar%20BN%20Reddy%20Nagar%20Hastinapuram%20Hyderabad%20500079&output=embed"
              className="absolute inset-0 w-full h-full border-0 scale-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
              {/* Animated Rings */}
              <div className="relative flex items-center justify-center mb-6">
                <div
                  className="absolute w-32 h-32 rounded-full border-2 border-blue-500/40 animate-ping"
                  style={{ animationDuration: "3s" }}
                />
                <div
                  className="absolute w-24 h-24 rounded-full border border-green-500/40 animate-ping"
                  style={{ animationDuration: "2s", animationDelay: "0.5s" }}
                />
                <div
                  className="absolute w-20 h-20 rounded-full border border-yellow-400/30 animate-ping"
                  style={{ animationDuration: "2.5s", animationDelay: "0.8s" }}
                />

                {/* Pin */}
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
              </div>

              {/* Title */}
              <p className="text-blue-400 font-heading font-bold text-lg mb-1">
                B.N. Reddy Nagar
              </p>

              {/* Address */}
              <p className="text-white/90 text-sm text-center px-4 leading-relaxed">
                Nagarjuna Sagar Road, Chaitanya Nagar,
                <br />
                Above KFC, Hastinapuram, Hyderabad - 500079
              </p>

              {/* Button */}
              <a
                href="https://www.google.com/maps?q=Nagarjuna%20Sagar%20Road%20Chaitanya%20Nagar%20BN%20Reddy%20Nagar%20Hastinapuram%20Hyderabad%20500079"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 px-6 py-2.5 
      bg-blue-500 text-white rounded-2xl font-semibold text-sm
      hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30
      transition-all duration-300"
              >
                Open in Maps
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="py-[28px] md:py-20 relative overflow-hidden bg-gradient-to-br from-accent/5 via-background to-primary/5">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              FAQ
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary mb-3">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
            <p className="text-foreground/60">
              Everything you need to know before getting started
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How long does a typical project take?",
                a: "Project duration varies based on scope. Consultation takes 1–2 weeks, design phase 2–4 weeks, and execution 4–8 weeks depending on complexity.",
              },
              {
                q: "What is your design process?",
                a: "We follow a structured process: consultation, concept design, refinement, implementation, and completion — with your satisfaction guaranteed at every step.",
              },
              {
                q: "Do you provide 3D visualizations?",
                a: "Yes, we provide detailed 3D visualizations so you can see your design clearly before execution begins — no surprises.",
              },
              {
                q: "What is your warranty policy?",
                a: "We offer a 1-year warranty on all our work, covering materials and craftsmanship defects with full support.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`group relative bg-white/55 backdrop-blur-sm border rounded-3xl overflow-hidden
                  transition-all duration-400 cursor-pointer
                  ${
                    openFaq === index
                      ? "border-accent/50 shadow-lg shadow-accent/10"
                      : "border-accent/15 hover:border-accent/35 hover:bg-white/75"
                  }`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {/* Top line */}
                <div
                  className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500
                  ${openFaq === index ? "left-0 right-0 via-accent" : "via-accent/30 group-hover:left-0 group-hover:right-0 group-hover:via-accent/60"}`}
                />

                <div className="p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300
                      ${
                        openFaq === index
                          ? "bg-accent border-accent"
                          : "bg-accent/10 border-accent/20 group-hover:bg-accent/20"
                      }`}
                    >
                      <span
                        className={`text-xs font-bold transition-colors duration-300
                        ${openFaq === index ? "text-white" : "text-accent"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className={`font-semibold transition-colors duration-300
                      ${openFaq === index ? "text-accent" : "text-primary group-hover:text-accent"}`}
                    >
                      {faq.q}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${
                      openFaq === index
                        ? "bg-accent border-accent rotate-45"
                        : "bg-accent/10 border-accent/20 group-hover:bg-accent/20"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-colors duration-300 ${openFaq === index ? "text-white" : "text-accent"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-400
                  ${openFaq === index ? "max-h-48 pb-6" : "max-h-0"}`}
                >
                  <div className="px-6 pt-0">
                    <div className="pl-12">
                      <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-4" />
                      <p className="text-foreground/65 leading-relaxed text-sm">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom line when open */}
                {openFaq === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
