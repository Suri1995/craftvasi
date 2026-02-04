'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface ImageData {
  title: string
  url: string
}

const images: ImageData[] = [
  { title: 'Artistic Living Spaces', url: '/images/hero-artistic-living.jpg' },
  { title: 'Modern Kitchen Design', url: '/images/hero-kitchen.jpg' },
  { title: 'Luxury Bedroom', url: '/images/hero-bedroom.jpg' },
  { title: 'Professional Office', url: '/images/hero-office.jpg' },
  { title: 'Commercial Space', url: '/images/hero-commercial.jpg' },
  { title: 'Contemporary Interior', url: '/images/project-bhk.jpg' },
]

export function ImageGallery() {
  const [opened, setOpened] = useState(0)
  const [inPlace, setInPlace] = useState(0)
  const [gsapReady, setGsapReady] = useState(false)
  const autoplayTimer = useRef<number | null>(null)

  useEffect(() => {
    if (window.gsap && window.MotionPathPlugin) {
      window.gsap.registerPlugin(window.MotionPathPlugin)
      setGsapReady(true)
      return
    }

    const gsapScript = document.createElement('script')
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
    gsapScript.onload = () => {
      const motionPathScript = document.createElement('script')
      motionPathScript.src =
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js'
      motionPathScript.onload = () => {
        window.gsap.registerPlugin(window.MotionPathPlugin)
        setGsapReady(true)
      }
      document.body.appendChild(motionPathScript)
    }
    document.body.appendChild(gsapScript)
  }, [])

  const onSelect = useCallback((index: number) => {
    setOpened(index)
  }, [])

  const onInPlace = useCallback((index: number) => {
    setInPlace(index)
  }, [])

  const next = useCallback(() => {
    setOpened((i) => (i + 1) % images.length)
  }, [])

  useEffect(() => {
    if (!gsapReady) return

    if (autoplayTimer.current) clearInterval(autoplayTimer.current)

    autoplayTimer.current = window.setInterval(next, 4500)

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current)
    }
  }, [gsapReady, next])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {gsapReady &&
        images.map((image, i) => (
          <div
            key={image.url}
            className="absolute inset-0"
            style={{ zIndex: inPlace === i ? 5 : 1 }}
          >
            <GalleryImage
              id={i}
              total={images.length}
              url={image.url}
              open={opened === i}
              inPlace={inPlace === i}
              onInPlace={onInPlace}
            />
          </div>
        ))}

      <div className="absolute inset-0 z-20 flex items-end justify-center pb-28">
        <Tabs images={images} onSelect={onSelect} />
      </div>
    </div>
  )
}

interface GalleryImageProps {
  url: string
  open: boolean
  inPlace: boolean
  id: number
  total: number
  onInPlace: (id: number) => void
}

function GalleryImage({ url, open, inPlace, id, onInPlace, total }: GalleryImageProps) {
  const clip = useRef<SVGCircleElement>(null)

  const gap = 14
  const r = 8
  const width = 1200
  const height = 1200
  const bigSize = Math.sqrt(width * width + height * height)

  const posSmall = () => ({
    cx: width / 2 - (total * (r * 2 + gap) - gap) / 2 + id * (r * 2 + gap),
    cy: height - 120,
    r,
  })

  const posCenter = () => ({
    cx: width / 2,
    cy: height / 2,
    r: r * 8,
  })

  const posEnd = () => ({
    cx: width / 2,
    cy: height / 2,
    r: bigSize,
  })

  useEffect(() => {
    const gsap = window.gsap
    if (!gsap || !clip.current) return

    if (open) {
      gsap
        .timeline()
        .set(clip.current, posSmall())
        .to(clip.current, { ...posCenter(), duration: 0.35 })
        .to(clip.current, {
          ...posEnd(),
          duration: 0.6,
          onComplete: () => onInPlace(id),
        })
    } else if (inPlace) {
      gsap
        .timeline()
        .set(clip.current, posEnd())
        .to(clip.current, { ...posCenter(), duration: 0.4 })
        .to(clip.current, { ...posSmall(), duration: 0.5, ease: 'power3.out' })
    }
  }, [open, inPlace, id, onInPlace, total])

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <clipPath id={`clip_${id}`}>
          <circle ref={clip} />
        </clipPath>
      </defs>
      <image
        href={url}
        width={width}
        height={height}
        clipPath={`url(#clip_${id})`}
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  )
}

interface TabsProps {
  images: ImageData[]
  onSelect: (index: number) => void
}

function Tabs({ images, onSelect }: TabsProps) {
  const gap = 14
  const r = 8
  const width = 1200
  const height = 1200

  const x = (i: number) =>
    width / 2 - (images.length * (r * 2 + gap) - gap) / 2 + i * (r * 2 + gap)

  return (
    <div className="relative z-20 mt-6 flex justify-center">
  <svg
    viewBox={`0 0 ${width} ${height}`}
    className="w-[280px] h-[40px]"
  >
    {images.map((img, i) => (
      <circle
        key={img.url}
        cx={x(i)}
        cy={height / 2}
        r={r + 3}
        stroke="white"
        strokeWidth="2"
        fill="rgba(255,255,255,0.35)"
        className="cursor-pointer hover:fill-white transition"
        onClick={() => onSelect(i)}
      />
    ))}
  </svg>
</div>
  )
}
