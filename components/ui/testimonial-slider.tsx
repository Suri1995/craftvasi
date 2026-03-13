'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

interface Testimonial {
  id: number
  quote: string
  name: string
  role: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Craftvasi designed our home beautifully. Their team handled everything professionally from design to execution.',
    name: 'Ramesh Kumar',
    role: 'Home Interior Client',
  },
  {
    id: 2,
    quote:
      'Their custom furniture quality is excellent. Highly recommended for home interiors.',
    name: 'Sneha Reddy',
    role: 'Residential Client',
  },
  {
    id: 3,
    quote:
      'The entire journey was smooth and transparent. The final outcome matched exactly what was promised.',
    name: 'Anil Sharma',
    role: 'Villa Project Client',
  },
  {
    id: 4,
    quote:
      'From planning to handover, the Craftvasi team was responsive, creative, and committed to quality.',
    name: 'Priya Verma',
    role: 'Office Interior Client',
  },
  {
    id: 5,
    quote:
      'They understood our taste perfectly and transformed the space into something elegant and functional.',
    name: 'Kavya Nair',
    role: 'Apartment Interior Client',
  },
]

const getVisibleCount = (width: number): number => {
  if (width >= 1280) return 3
  if (width >= 768) return 2
  return 1
}

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const [direction, setDirection] = useState(1)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const newWidth = window.innerWidth
      setWindowWidth(newWidth)

      const newVisibleCount = getVisibleCount(newWidth)
      const maxIndexForNewWidth = Math.max(0, testimonials.length - newVisibleCount)

      setCurrentIndex(prev => Math.min(prev, maxIndexForNewWidth))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    autoPlayRef.current = setInterval(() => {
      const visibleCount = getVisibleCount(windowWidth)
      const maxIndex = testimonials.length - visibleCount

      setCurrentIndex(prev => {
        if (prev >= maxIndex) {
          setDirection(-1)
          return Math.max(prev - 1, 0)
        }

        if (prev <= 0) {
          setDirection(1)
          return Math.min(prev + 1, maxIndex)
        }

        return prev + direction
      })
    }, 4000)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlaying, windowWidth, direction])

  useEffect(() => {
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  const visibleCount = getVisibleCount(windowWidth)
  const maxIndex = Math.max(0, testimonials.length - visibleCount)
  const canGoNext = currentIndex < maxIndex
  const canGoPrev = currentIndex > 0

  const pauseAutoPlayTemporarily = () => {
    setIsAutoPlaying(false)

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }

    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true)
    }, 8000)
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  const goNext = () => {
    if (!canGoNext) return
    setDirection(1)
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
    pauseAutoPlayTemporarily()
  }

  const goPrev = () => {
    if (!canGoPrev) return
    setDirection(-1)
    setCurrentIndex(prev => Math.max(prev - 1, 0))
    pauseAutoPlayTemporarily()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    pauseAutoPlayTemporarily()
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-4 py-8 backdrop-blur-sm sm:px-6 md:px-8 md:py-10">
      <div className="relative mb-8 flex justify-center md:mb-4 md:justify-end">
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={goPrev}
            disabled={!canGoPrev}
            className={`rounded-full p-2 transition-all duration-300 ${
              canGoPrev
                ? 'bg-[#E52B2B] text-white hover:bg-[#f14747]'
                : 'cursor-not-allowed bg-white/10 text-white/40'
            }`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
            disabled={!canGoNext}
            className={`rounded-full p-2 transition-all duration-300 ${
              canGoNext
                ? 'bg-[#E52B2B] text-white hover:bg-[#e35a5a]'
                : 'cursor-not-allowed bg-white/10 text-white/40'
            }`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
          transition={{ type: 'spring', stiffness: 70, damping: 20 }}
        >
          {testimonials.map(testimonial => (
            <motion.div
              key={testimonial.id}
              className={`w-full flex-shrink-0 p-2 ${
                visibleCount === 3
                  ? 'xl:w-1/3'
                  : visibleCount === 2
                  ? 'md:w-1/2'
                  : 'w-full'
              }`}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              style={{ cursor: 'grab' }}
              whileTap={{ scale: 0.98, cursor: 'grabbing' }}
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1028]/80 p-6 shadow-lg shadow-black/20">
                <div className="pointer-events-none absolute left-1 top-1 opacity-10">
                  <Quote className="h-10 w-10 text-[#E52B2B] md:h-12 md:w-12" />
                </div>

                <div className="relative z-10 mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-[#E52B2B] text-[#E52B2B]"
                    />
                  ))}
                </div>

                <p className="relative z-10 mb-6 text-sm leading-7 text-white/80 md:text-base">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="mt-auto border-t border-white/10 pt-4">
                  <h4 className="text-base font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex justify-center">
        {Array.from({ length: testimonials.length - visibleCount + 1 }, (_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative mx-1"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Go to testimonial ${index + 1}`}
          >
            <motion.div
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? 'bg-[#E52B2B]' : 'bg-white/30'
              }`}
              animate={{ scale: index === currentIndex ? [1, 1.2, 1] : 1 }}
              transition={{
                duration: 1.5,
                repeat: index === currentIndex ? Infinity : 0,
                repeatDelay: 1,
              }}
            />
            {index === currentIndex && (
              <motion.div
                className="absolute inset-0 rounded-full bg-[#E52B2B]/30"
                animate={{ scale: [1, 1.9], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}