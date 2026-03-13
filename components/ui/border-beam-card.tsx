'use client'

import type { ReactNode } from 'react'

type BorderBeamCardProps = {
  children: ReactNode
  className?: string
}

export function BorderBeamCard({
  children,
  className = '',
}: BorderBeamCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] p-[1px] ${className}`}
    >
      {/* animated border beam */}
      <div className="absolute inset-0 rounded-[28px]">
        <div className="absolute inset-[-120%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(255,255,255,0.15)_320deg,rgba(239,68,68,0.95)_340deg,rgba(255,255,255,0.6)_350deg,transparent_360deg)]" />
      </div>

      {/* soft glow */}
      <div className="absolute inset-0 rounded-[28px] opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_30%)]" />

      {/* mask layer to keep beam only on border */}
      <div className="absolute inset-[1px] rounded-[27px] bg-[#0c1020]" />

      {/* inner card */}
      <div className="relative z-10 rounded-[27px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-4 md:p-7 backdrop-blur-xl transition duration-500 group-hover:border-white/15">
        {children}
      </div>
    </div>
  )
}