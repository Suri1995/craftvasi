'use client'

import React, { useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Card {
  id: number
  src: string
  alt: string
  title: string
  description: string
  link: string
}

export default function CardStack() {
  const initialCards: Card[] = [
    {
      id: 1,
      src: '/home-interior-image.jpg',
      alt: 'Home Interior Design',
      title: 'Home Interior Design',
      description:
        'Complete interior solutions for villas, apartments, and independent houses including living rooms, kitchens, bedrooms, wardrobes, and lighting.',
      link: '#home-interior-design',
    },
    {
      id: 2,
      src: '/modern-kitchen-interior-image.jpg',
      alt: 'Modular Kitchen Design',
      title: 'Modular Kitchen Design',
      description:
        'Modern modular kitchens designed for efficiency, beauty, and durability using premium materials and fittings.',
      link: '#modular-kitchen-design',
    },
    {
      id: 3,
      src: '/bedroom-interior-image.jpg',
      alt: 'Custom Furniture Manufacturing',
      title: 'Custom Furniture Manufacturing',
      description:
        'Craftvasi manufactures bespoke furniture including wardrobes, TV units, beds, sofas, dining tables, and storage solutions.',
      link: '#custom-furniture-manufacturing',
    },
    {
      id: 4,
      src: '/office-interior-image.jpg',
      alt: 'Office Interior Solutions',
      title: 'Office Interior Solutions',
      description:
        'Professional office interiors including workstations, cabins, meeting rooms, reception areas, and collaborative spaces.',
      link: '#office-interior-solutions',
    },
    {
      id: 5,
      src: '/corporate-interior-image.jpg',
      alt: 'Retail & Commercial Interiors',
      title: 'Retail & Commercial Interiors',
      description:
        'Retail showrooms, display racks, glass showcases, counters, and brand-oriented interior design.',
      link: '#retail-commercial-interiors',
    },
    {
      id: 6,
      src: '/construction-interior-image.jpg',
      alt: 'Construction & Turnkey Projects',
      title: 'Construction & Turnkey Projects',
      description:
        'Complete design + construction solutions including renovation, remodeling, and new building interiors.',
      link: '#construction-turnkey-projects',
    },
  ]

  const [cards, setCards] = useState<Card[]>(initialCards)
  const [dragDirection, setDragDirection] = useState<'up' | 'down' | null>(null)
  const [showInfo, setShowInfo] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const dragY = useMotionValue(0)
  const rotateX = useTransform(dragY, [-200, 0, 200], [10, 0, -10])

  const offsetMobile = 4
  const offsetDesktop = 8
  const scaleStep = 0.05
  const dimStep = 0.12
  const stiff = 170
  const damp = 26
  const borderRadius = 20
  const swipeThreshold = 50

  const spring = {
    type: 'spring' as const,
    stiffness: stiff,
    damping: damp,
  }

  const moveToEnd = () => {
    setCards(prev => [...prev.slice(1), prev[0]])
    setCurrentIndex(prev => (prev + 1) % initialCards.length)
  }

  const moveToStart = () => {
    setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)])
    setCurrentIndex(prev => (prev - 1 + initialCards.length) % initialCards.length)
  }

  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.y
    const offsetY = info.offset.y

    if (Math.abs(offsetY) > swipeThreshold || Math.abs(velocity) > 500) {
      if (offsetY < 0 || velocity < 0) {
        setDragDirection('up')
        setTimeout(() => {
          moveToEnd()
          setDragDirection(null)
        }, 150)
      } else {
        setDragDirection('down')
        setTimeout(() => {
          moveToStart()
          setDragDirection(null)
        }, 150)
      }
    }

    dragY.set(0)
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-visible">
      <div className="mb-6 flex items-center justify-center gap-2 md:mb-8">
        {initialCards.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex % initialCards.length
                ? 'w-8 bg-[#E52B2B]'
                : 'w-1.5 bg-white/30'
            }`}
            whileHover={{ scale: 1.15 }}
          />
        ))}
      </div>

      <div className="relative flex w-full items-center justify-center md:gap-6">
        {/* Left button desktop only */}
        <motion.button
          onClick={moveToStart}
          className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:flex lg:h-14 lg:w-14"
          whileHover={{ scale: 1.08, x: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous service"
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        <div
          className="relative mx-auto w-full"
          style={{
            height: 'clamp(260px, 40vh, 420px)',
            maxWidth: 'min(92vw, 820px)',
            aspectRatio: '16 / 9',
          }}
        >
          <div className="relative h-full w-full overflow-visible">
            <ul className="relative m-0 h-full w-full p-0">
              <AnimatePresence>
                {cards.map(({ id, src, alt, title, description, link }, i) => {
                  const isFront = i === 0
                  const brightness = Math.max(0.35, 1 - i * dimStep)
                  const baseZ = cards.length - i

                  return (
                    <motion.li
                      key={id}
                      className="absolute h-full w-full list-none overflow-hidden border border-white/10 bg-black/20"
                      style={{
                        borderRadius: `${borderRadius}px`,
                        cursor: isFront ? 'grab' : 'auto',
                        touchAction: 'none',
                        boxShadow: isFront
                          ? '0 25px 50px rgba(0, 0, 0, 0.45)'
                          : '0 15px 30px rgba(0, 0, 0, 0.24)',
                        rotateX: isFront ? rotateX : 0,
                        transformPerspective: 1000,
                      }}
                      animate={{
                        top: `${i * (typeof window !== 'undefined' && window.innerWidth < 768 ? -offsetMobile : -offsetDesktop)}%`,
                        scale: 1 - i * scaleStep,
                        filter: `brightness(${brightness})`,
                        zIndex: baseZ,
                        opacity: dragDirection && isFront ? 0 : 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.85,
                        transition: { duration: 0.2 },
                      }}
                      transition={spring}
                      drag={isFront ? 'y' : false}
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={0.7}
                      onDrag={(_, info) => {
                        if (isFront) dragY.set(info.offset.y)
                      }}
                      onDragEnd={handleDragEnd}
                      whileDrag={
                        isFront
                          ? {
                              zIndex: cards.length + 1,
                              cursor: 'grabbing',
                              scale: 1.03,
                            }
                          : {}
                      }
                      onHoverStart={() => isFront && setShowInfo(true)}
                      onHoverEnd={() => setShowInfo(false)}
                    >
                      <img
                        src={src}
                        alt={alt}
                        className="pointer-events-none h-full w-full select-none object-cover"
                        draggable={false}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                      <motion.div
                        className="absolute inset-x-0 bottom-0 p-4 md:p-6 lg:p-8"
                        initial={false}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{ duration: 0.25 }}
                      >
                        <h3 className="mb-2 text-lg font-bold text-[#1B2A6B] [text-shadow:0_0_6px_rgba(255,255,255,0.6),0_0_12px_rgba(255,255,255,0.4)] md:mb-3 md:text-2xl lg:text-3xl">
                          {title}
                        </h3>

                        <motion.p
                          className="mb-3 line-clamp-3 text-xs leading-5 text-white/80 sm:text-sm sm:leading-6 md:mb-5 md:text-base md:leading-7"
                          initial={false}
                          animate={{
                            opacity: isFront && showInfo ? 1 : 0.95,
                            y: 0,
                          }}
                        >
                          {description}
                        </motion.p>

                        <a
                          href={link}
                          className="inline-flex items-center text-sm font-semibold text-[#E52B2B] transition hover:text-red-400 md:text-base"
                        >
                          Learn More →
                        </a>
                      </motion.div>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* Right button desktop only */}
        <motion.button
          onClick={moveToEnd}
          className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 md:flex lg:h-14 lg:w-14"
          whileHover={{ scale: 1.08, x: 2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next service"
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Mobile buttons */}
      <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
        <motion.button
          onClick={moveToStart}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous service"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>

        <motion.button
          onClick={moveToEnd}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next service"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  )
}