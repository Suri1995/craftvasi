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
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

// ── Questionnaire Steps ──
const questionnaireSteps = [
  {
    id: "project_category",
    section: "Project Details",
    question: "What type of project are you looking for?",
    type: "single",
    options: [
      "Residential Design",
      "Commercial Space",
      "Renovation",
      "Consultation",
      "Other",
    ],
  },
  {
    id: "project_type",
    section: "Client Details",
    question: "What is your Project Type?",
    type: "single",
    options: ["Apartment", "Villa", "Independent House"],
  },
  {
    id: "bhk_type",
    section: "Client Details",
    question: "What is your BHK Type?",
    type: "single",
    options: ["1BHK", "2BHK", "3BHK", "4BHK", "Others"],
  },
  {
    id: "living_room",
    section: "Living Room",
    question: "What do you need for your Living Room?",
    type: "multi",
    options: [
      "False Ceiling",
      "TV Unit",
      "Hall Partition",
      "Wall Panelling",
      "Shoe Rack",
      "Puja Unit",
      "Puja Door",
      "Bedroom Doors",
      "Main Door Panelling",
      "Wallpaper / Paint",
      "Curtains / Blinds",
      "Lighting",
    ],
  },
  {
    id: "master_bedroom",
    section: "Master Bedroom",
    question: "What do you need for your Master Bedroom?",
    type: "multi",
    options: [
      "False Ceiling",
      "Wardrobe",
      "Bed with Storage",
      "Dressing Table",
      "Study Table",
      "TV Unit",
      "Wallpaper / Paint",
      "Curtains / Blinds",
      "Lighting",
    ],
  },
  {
    id: "children_bedroom",
    section: "Children's Bedroom",
    question: "What do you need for your Children's Bedroom?",
    type: "multi",
    options: [
      "False Ceiling",
      "Wardrobe",
      "Bed with Storage",
      "Dressing Table",
      "Study Table",
      "TV Unit",
      "Wallpaper / Paint",
      "Curtains / Blinds",
      "Lighting",
    ],
  },
  {
    id: "guest_bedroom",
    section: "Guest Bedroom",
    question: "What do you need for your Guest Bedroom?",
    type: "multi",
    options: [
      "False Ceiling",
      "Wardrobe",
      "Bed with Storage",
      "Dressing Table",
      "Study Table",
      "TV Unit",
      "Wallpaper / Paint",
      "Curtains / Blinds",
      "Lighting",
    ],
  },
  {
    id: "kitchen_dining",
    section: "Kitchen & Dining",
    question: "What do you need for your Kitchen & Dining area?",
    type: "multi",
    options: [
      "Modular Kitchen (Base + Wall Units)",
      "Pantry / Tall Unit",
      "Kitchen Accessories (Pullouts, Rolling Shutter, Corner Unit, Basket Systems)",
      "Dining Table Unit / Storage",
      "Chimney",
      "Sink",
      "Counter Top",
      "Back Splash",
    ],
  },
  {
    id: "bathrooms",
    section: "Bathrooms",
    question: "What do you need for your Bathrooms?",
    type: "multi",
    options: [
      "Vanity Unit",
      "Mirror with Storage",
      "False Ceiling with Lighting",
    ],
  },
  {
    id: "furnishings",
    section: "Furnishings & Décor",
    question: "What Furnishings & Décor do you need?",
    type: "multi",
    options: [
      "Curtains (Sheer + Main)",
      "Window Blinds (Zebra / Roller / Roman)",
      "Wallpapers / Wall Textures",
      "Sofas (Custom Design)",
    ],
  },
  {
    id: "electrical",
    section: "Electrical & Lighting",
    question: "What Electrical & Lighting do you need?",
    type: "multi",
    options: [
      "Panel Lights",
      "LED Strip Lights with Aluminium Profile",
      "SMPS for Strip Lights",
      "Decorative Lights / Chandeliers",
      "Smart Home Automation",
    ],
  },
  {
    id: "painting",
    section: "Painting",
    question: "What Painting services do you need?",
    type: "multi",
    options: [
      "Premium Emulsion Walls",
      "Ceiling with Primer + Putty + Emulsion",
      "PU Polish",
    ],
  },
  {
    id: "additional",
    section: "Additional Services",
    question: "Any Additional Services required?",
    type: "multi",
    options: [
      "Invisible Grill (Balcony / Windows)",
      "AC Copper Piping Installation",
      "Smart Home Automation",
    ],
  },
];

export default function ContactPage() {
  // ── Contact form state ──
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "error">("idle");

  // ── Questionnaire state ──
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [questionnaireComplete, setQuestionnaireComplete] = useState(false);
  const [isSubmittingQ, setIsSubmittingQ] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormData({ name: "", email: "", phone: "", message: "" });
      setShowQuestionnaire(true);
      setCurrentStep(0);
      setAnswers({});
      setQuestionnaireComplete(false);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Questionnaire handlers ──
  const currentQ = questionnaireSteps[currentStep];

  const toggleOption = (option: string) => {
    const current = answers[currentQ.id] || [];
    if (currentQ.type === "single") {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: [option] }));
    } else {
      if (current.includes(option)) {
        setAnswers((prev) => ({
          ...prev,
          [currentQ.id]: current.filter((o) => o !== option),
        }));
      } else {
        setAnswers((prev) => ({
          ...prev,
          [currentQ.id]: [...current, option],
        }));
      }
    }
  };

  const isSelected = (option: string) =>
    (answers[currentQ.id] || []).includes(option);

  const canProceed = (answers[currentQ.id] || []).length > 0;

  const handleNext = () => {
    if (currentStep < questionnaireSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleQuestionnaireSubmit = async () => {
    setIsSubmittingQ(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmittingQ(false);
    setQuestionnaireComplete(true);
  };

  const progress = ((currentStep + 1) / questionnaireSteps.length) * 100;

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
            <span className="text-accent font-semibold text-sm">Contact Us</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-300 mb-6 leading-tight">
            Get in <span className="text-accent">Touch</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? We'd love to hear from you. Reach out to discuss your interior design needs.
          </p>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section
        className="py-[28px] md:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--accent)/0.03) 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: "Phone", content: "+91 9573117830", subtitle: "Mon–Sat, 9am–6pm", href: "tel:+919573117830", color: "accent" },
              { icon: Mail, title: "Email", content: "hello@craftvasi.com", subtitle: "We reply within 24hrs", href: "mailto:hello@craftvasi.com", color: "primary" },
              { icon: MapPin, title: "Location", content: "Hyderabad, India", subtitle: "B.N. Reddy Nagar", href: "#map", color: "accent" },
            ].map((item, index) => {
              const Icon = item.icon;
              const isPrimary = item.color === "primary";
              return (
                <a key={index} href={item.href}
                  className={`group relative overflow-hidden rounded-3xl p-8 border transition-all duration-500
                    hover:-translate-y-2 hover:shadow-2xl text-center
                    ${isPrimary
                      ? "bg-primary border-primary/20 hover:shadow-primary/20"
                      : "bg-white/55 backdrop-blur-sm border-accent/15 hover:border-accent/50 hover:shadow-accent/15 hover:bg-white/80"
                    }`}
                >
                  <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500
                    group-hover:left-0 group-hover:right-0
                    ${isPrimary ? "via-white/20 group-hover:via-white/40" : "via-accent/40 group-hover:via-accent"}`} />
                  <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full blur-2xl opacity-0
                    group-hover:opacity-100 transition-all duration-500
                    ${isPrimary ? "bg-white/10" : "bg-accent/15"}`} />
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border transition-all duration-300
                    group-hover:scale-110 group-hover:rotate-3
                    ${isPrimary
                      ? "bg-white/10 border-white/20 group-hover:bg-accent group-hover:border-accent"
                      : "bg-accent/10 border-accent/20 group-hover:bg-primary group-hover:border-primary"
                    }`}>
                    <Icon className={`w-7 h-7 transition-colors duration-300
                      ${isPrimary ? "text-white" : "text-accent group-hover:text-white"}`} />
                  </div>
                  <h3 className={`text-lg font-heading font-bold mb-1 transition-colors duration-300
                    ${isPrimary ? "text-white" : "text-primary group-hover:text-accent"}`}>
                    {item.title}
                  </h3>
                  <div className={`w-8 h-1 rounded-full mx-auto mb-3 transition-all duration-500
                    group-hover:w-16
                    ${isPrimary ? "bg-accent/60 group-hover:bg-accent" : "bg-accent/40 group-hover:bg-primary"}`} />
                  <p className={`font-semibold mb-1 transition-colors duration-300
                    ${isPrimary ? "text-white" : "text-foreground/80 group-hover:text-primary"}`}>
                    {item.content}
                  </p>
                  <p className={`text-sm ${isPrimary ? "text-white/50" : "text-foreground/40"}`}>
                    {item.subtitle}
                  </p>
                  <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500
                    group-hover:left-0 group-hover:right-0
                    ${isPrimary ? "via-white/10 group-hover:via-white/25" : "via-accent/20 group-hover:via-primary/40"}`} />
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
                  {showQuestionnaire ? "Interior Questionnaire" : "Send a Message"}
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 leading-tight">
                  {showQuestionnaire
                    ? <><span className="text-accent">Requirements</span> Form</>
                    : <>Let's Start a <span className="text-accent">Conversation</span></>
                  }
                </h2>
                <div className="w-12 h-1 bg-accent/50 rounded-full mb-5" />
                <p className="text-foreground/60 leading-relaxed">
                  {showQuestionnaire
                    ? "Answer each question about your room-wise requirements. This helps us prepare a tailored design proposal for your space."
                    : "Fill out the form and our team will get back to you within 24 hours. After submitting, you'll complete a quick interior requirements questionnaire."
                  }
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {(showQuestionnaire
                  ? [
                      { step: "01", title: "Answer each question", desc: "Select your room-wise requirements" },
                      { step: "02", title: "Multiple choice", desc: "Pick all options that apply to your space" },
                      { step: "03", title: "Submit & done", desc: "We'll prepare your tailored proposal" },
                    ]
                  : [
                      { step: "01", title: "Submit your enquiry", desc: "Fill the form with your project details" },
                      { step: "02", title: "Complete questionnaire", desc: "Answer quick room-wise requirements" },
                      { step: "03", title: "Free consultation", desc: "We schedule a call to discuss your vision" },
                    ]
                ).map((item, i) => (
                  <div key={i} className="group flex gap-4 p-4 rounded-2xl border border-accent/10
                    hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0
                      group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                      <span className="text-xs font-bold text-accent group-hover:text-white transition-colors duration-300">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary text-sm group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </p>
                      <p className="text-foreground/50 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress indicator when questionnaire is active */}
              {showQuestionnaire && !questionnaireComplete && (
                <div className="p-5 bg-accent/5 border border-accent/15 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-primary uppercase tracking-wide">Progress</p>
                    <p className="text-xs font-bold text-accent">{Math.round(progress)}% Complete</p>
                  </div>
                  <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-foreground/40 mt-2">
                    Step {currentStep + 1} of {questionnaireSteps.length} — {currentQ.section}
                  </p>
                </div>
              )}
            </div>

            {/* Right side — Form OR Questionnaire */}
            <div className="lg:col-span-3">

              {/* ── CONTACT FORM ── */}
              {!showQuestionnaire && (
                <div className="group relative bg-white/60 backdrop-blur-sm border border-accent/15 rounded-3xl p-8 md:p-10 overflow-hidden
                  transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/8">
                  <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent
                    group-hover:left-0 group-hover:right-0 group-hover:via-accent transition-all duration-500" />

                  {submitStatus === "error" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900 text-sm">Something went wrong.</p>
                        <p className="text-red-700 text-sm mt-0.5">Please try again or contact us directly.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                          Full Name <span className="text-accent">*</span>
                        </label>
                        <input type="text" id="name" name="name" value={formData.name}
                          onChange={handleChange} required placeholder="Your name"
                          className="w-full px-4 py-3 bg-background/60 border border-accent/15 rounded-2xl text-sm
                            focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15
                            hover:border-accent/30 transition-all duration-300" />
                      </div>
                      <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                        Phone Number <span className="text-accent">*</span>
                      </label>
                      <input type="tel" id="phone" name="phone" value={formData.phone}
                        onChange={handleChange} required placeholder="+91 XXXXX XXXXX"
                        className="w-full px-4 py-3 bg-background/60 border border-accent/15 rounded-2xl text-sm
                          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15
                          hover:border-accent/30 transition-all duration-300" />
                    </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                          Email Address <span className="text-accent">*</span>
                        </label>
                        <input type="email" id="email" name="email" value={formData.email}
                          onChange={handleChange} required placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-background/60 border border-accent/15 rounded-2xl text-sm
                            focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15
                            hover:border-accent/30 transition-all duration-300" />
                      </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                        Message <span className="text-accent">*</span>
                      </label>
                      <textarea id="message" name="message" value={formData.message}
                        onChange={handleChange} required
                        placeholder="Tell us about your project..." rows={5}
                        className="w-full px-4 py-3 bg-background/60 border border-accent/15 rounded-2xl text-sm
                          focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15
                          hover:border-accent/30 transition-all duration-300 resize-none" />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className="group/btn w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm
                        hover:bg-accent hover:shadow-lg hover:shadow-accent/25
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-300 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Interior Enquiry Questionnaire
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent
                    group-hover:left-0 group-hover:right-0 group-hover:via-accent/40 transition-all duration-500" />
                </div>
              )}

              {/* ── QUESTIONNAIRE ── */}
              {showQuestionnaire && !questionnaireComplete && (
                <div className="relative bg-white/60 backdrop-blur-sm border border-accent/20 rounded-3xl overflow-hidden shadow-xl shadow-accent/8">

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

                  {/* Progress bar at top */}
                  <div className="w-full h-1.5 bg-accent/10">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Question header */}
                  <div className="px-8 pt-7 pb-4 border-b border-accent/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                        {currentQ.section}
                      </span>
                      <span className="text-xs font-semibold text-foreground/40">
                        {currentStep + 1} / {questionnaireSteps.length}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-primary mt-3">
                      {currentQ.question}
                    </h3>
                    <p className="text-sm text-foreground/40 mt-1">
                      {currentQ.type === "single" ? "Select one option" : "Select all that apply"}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="px-8 py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {currentQ.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => toggleOption(option)}
                          className={`group/opt relative flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-300
                            ${isSelected(option)
                              ? "bg-primary border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                              : "bg-white/50 border-accent/15 hover:border-accent/40 hover:bg-accent/5"
                            }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
                            ${isSelected(option)
                              ? "border-white bg-accent"
                              : "border-accent/30 group-hover/opt:border-accent"
                            }`}>
                            {isSelected(option) && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span className={`text-sm font-semibold transition-colors duration-300
                            ${isSelected(option) ? "text-white" : "text-foreground/70 group-hover/opt:text-primary"}`}>
                            {option}
                          </span>
                          {isSelected(option) && (
                            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-4">
                      <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className="group/back flex items-center gap-2 px-5 py-3 rounded-2xl border border-accent/20 text-foreground/60 font-semibold text-sm
                          hover:border-accent/50 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed
                          transition-all duration-300"
                      >
                        <ArrowLeft className="w-4 h-4 group-hover/back:-translate-x-0.5 transition-transform duration-300" />
                        Back
                      </button>

                      {/* Step dots */}
                      <div className="flex gap-1 flex-wrap justify-center">
                        {questionnaireSteps.map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300
                              ${i === currentStep ? "w-5 bg-accent" : i < currentStep ? "w-2.5 bg-accent/40" : "w-2.5 bg-accent/15"}`}
                          />
                        ))}
                      </div>

                      {currentStep < questionnaireSteps.length - 1 ? (
                        <button
                          onClick={handleNext}
                          disabled={!canProceed}
                          className="group/next flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm
                            hover:bg-accent hover:shadow-lg hover:shadow-accent/25
                            disabled:opacity-40 disabled:cursor-not-allowed
                            transition-all duration-300"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 group-hover/next:translate-x-0.5 transition-transform duration-300" />
                        </button>
                      ) : (
                        <button
                          onClick={handleQuestionnaireSubmit}
                          disabled={!canProceed || isSubmittingQ}
                          className="group/submit flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-white font-bold text-sm
                            hover:bg-primary hover:shadow-lg hover:shadow-primary/25
                            disabled:opacity-40 disabled:cursor-not-allowed
                            transition-all duration-300"
                        >
                          {isSubmittingQ ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Submit
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                </div>
              )}

              {/* ── THANK YOU SCREEN ── */}
              {showQuestionnaire && questionnaireComplete && (
                <div className="relative bg-white/60 backdrop-blur-sm border border-accent/20 rounded-3xl p-8 md:p-10 overflow-hidden text-center shadow-xl shadow-accent/10">

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

                  {/* Animated success illustration */}
                  <div className="relative flex items-center justify-center mb-10 h-48">
                    {/* Outer ping rings */}
                    <div className="absolute w-44 h-44 rounded-full border-2 border-accent/10 animate-ping"
                      style={{ animationDuration: "3s" }} />
                    <div className="absolute w-36 h-36 rounded-full border border-accent/15 animate-ping"
                      style={{ animationDuration: "2.2s", animationDelay: "0.3s" }} />
                    <div className="absolute w-28 h-28 rounded-full border border-accent/20 animate-ping"
                      style={{ animationDuration: "2.8s", animationDelay: "0.6s" }} />

                    {/* Rotating dashed ring */}
                    <div className="absolute w-36 h-36 rounded-full border-2 border-dashed border-accent/30"
                      style={{ animation: "spin 8s linear infinite" }} />

                    {/* Center gradient icon */}
                    <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-2xl shadow-accent/30 z-10">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>

                    {/* Floating bouncing dots */}
                    <div className="absolute top-4 right-10 w-3 h-3 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0s" }} />
                    <div className="absolute bottom-6 left-8 w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.3s" }} />
                    <div className="absolute top-10 left-12 w-2 h-2 rounded-full bg-accent/60 animate-bounce" style={{ animationDelay: "0.6s" }} />
                    <div className="absolute bottom-4 right-12 w-3 h-3 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="absolute top-6 left-6 w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0.5s" }} />
                    <div className="absolute bottom-8 right-6 w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.8s" }} />
                  </div>

                  {/* Badge */}
                  <span className="inline-block text-xs font-bold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                    Questionnaire Submitted ✓
                  </span>

                  {/* Heading */}
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2 mt-2">
                    Thank You! 🎉
                  </h2>
                  <p className="text-lg font-semibold text-accent mb-3">
                    We've received your requirements
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full mx-auto mb-6" />

                  <p className="text-foreground/60 leading-relaxed max-w-md mx-auto mb-8">
                    Your interior enquiry questionnaire has been successfully submitted. Our team at{" "}
                    <span className="font-semibold text-primary">Craftvasi</span> will review your requirements and get back to you within{" "}
                    <span className="font-semibold text-accent">24 hours</span> with a tailored consultation.
                  </p>

                  {/* Summary cards */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                    {[
                      { label: "Project Category", value: answers["project_category"]?.[0] || "—" },
                      { label: "Project Type", value: answers["project_type"]?.[0] || "—" },
                      { label: "BHK Type", value: answers["bhk_type"]?.[0] || "—" },
                      { label: "Sections Filled", value: `${Object.keys(answers).length} / ${questionnaireSteps.length}` },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-accent/5 border border-accent/15 rounded-2xl">
                        <p className="text-xs text-foreground/40 uppercase tracking-wide font-semibold mb-1">{item.label}</p>
                        <p className="font-heading font-bold text-primary text-sm">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* What's next */}
                  <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 mb-8 text-left">
                    <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">What happens next?</p>
                    <div className="space-y-3">
                      {[
                        { text: "Our team reviews your requirements", icon: "01" },
                        { text: "We prepare a customised design proposal", icon: "02" },
                        { text: "Schedule a free consultation call", icon: "03" },
                      ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[10px] font-bold">{step.icon}</span>
                          </div>
                          <p className="text-sm text-foreground/65">{step.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reset button */}
                  <button
                    onClick={() => {
                      setShowQuestionnaire(false);
                      setQuestionnaireComplete(false);
                      setCurrentStep(0);
                      setAnswers({});
                    }}
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold
                      hover:bg-accent hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
                  >
                    Back to Contact
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </button>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section id="map" className="py-[28px] md:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(var(--accent)/0.03) 0%, hsl(var(--background)) 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Find Us
            </span>
            <h2 className="text-4xl font-heading font-bold text-primary mb-3">
              Visit <span className="text-accent">Us</span>
            </h2>
            <p className="text-foreground/60">Located in the heart of Hyderabad</p>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 h-96 shadow-2xl shadow-black/20 hover:shadow-black/40 transition-all duration-500">
            <iframe
              src="https://www.google.com/maps?q=Nagarjuna%20Sagar%20Road%20Chaitanya%20Nagar%20BN%20Reddy%20Nagar%20Hastinapuram%20Hyderabad%20500079&output=embed"
              className="absolute inset-0 w-full h-full border-0 scale-110"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute w-32 h-32 rounded-full border-2 border-blue-500/40 animate-ping" style={{ animationDuration: "3s" }} />
                <div className="absolute w-24 h-24 rounded-full border border-green-500/40 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                <div className="absolute w-20 h-20 rounded-full border border-yellow-400/30 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.8s" }} />
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <p className="text-blue-400 font-heading font-bold text-lg mb-1">B.N. Reddy Nagar</p>
              <p className="text-white/90 text-sm text-center px-4 leading-relaxed">
                Nagarjuna Sagar Road, Chaitanya Nagar,<br />
                Above KFC, Hastinapuram, Hyderabad - 500079
              </p>
              <a href="https://www.google.com/maps?q=Nagarjuna%20Sagar%20Road%20Chaitanya%20Nagar%20BN%20Reddy%20Nagar%20Hastinapuram%20Hyderabad%20500079"
                target="_blank" rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-2xl font-semibold text-sm
                  hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
                Open in Maps
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-[28px] md:py-20 relative overflow-hidden bg-gradient-to-br from-accent/5 via-background to-primary/5">
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
            <p className="text-foreground/60">Everything you need to know before getting started</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "How long does a typical project take?", a: "Project duration varies based on scope. Consultation takes 1–2 weeks, design phase 2–4 weeks, and execution 4–8 weeks depending on complexity." },
              { q: "What is your design process?", a: "We follow a structured process: consultation, concept design, refinement, implementation, and completion — with your satisfaction guaranteed at every step." },
              { q: "Do you provide 3D visualizations?", a: "Yes, we provide detailed 3D visualizations so you can see your design clearly before execution begins — no surprises." },
              { q: "What is your warranty policy?", a: "We offer a 1-year warranty on all our work, covering materials and craftsmanship defects with full support." },
            ].map((faq, index) => (
              <div key={index}
                className={`group relative bg-white/55 backdrop-blur-sm border rounded-3xl overflow-hidden
                  transition-all duration-300 cursor-pointer
                  ${openFaq === index
                    ? "border-accent/50 shadow-lg shadow-accent/10"
                    : "border-accent/15 hover:border-accent/35 hover:bg-white/75"
                  }`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-500
                  ${openFaq === index ? "left-0 right-0 via-accent" : "via-accent/30 group-hover:left-0 group-hover:right-0 group-hover:via-accent/60"}`} />
                <div className="p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300
                      ${openFaq === index ? "bg-accent border-accent" : "bg-accent/10 border-accent/20 group-hover:bg-accent/20"}`}>
                      <span className={`text-xs font-bold transition-colors duration-300
                        ${openFaq === index ? "text-white" : "text-accent"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className={`font-semibold transition-colors duration-300
                      ${openFaq === index ? "text-accent" : "text-primary group-hover:text-accent"}`}>
                      {faq.q}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${openFaq === index ? "bg-accent border-accent rotate-45" : "bg-accent/10 border-accent/20 group-hover:bg-accent/20"}`}>
                    <svg className={`w-3.5 h-3.5 transition-colors duration-300 ${openFaq === index ? "text-white" : "text-accent"}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-48 pb-6" : "max-h-0"}`}>
                  <div className="px-6 pt-0">
                    <div className="pl-12">
                      <div className="h-px bg-gradient-to-r from-accent/30 to-transparent mb-4" />
                      <p className="text-foreground/65 leading-relaxed text-sm">{faq.a}</p>
                    </div>
                  </div>
                </div>
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