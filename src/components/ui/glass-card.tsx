import type { ReactNode, CSSProperties } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function GlassCard({ children, className = '', style }: GlassCardProps) {
  return (
    <div
      className={`border-solid border-[var(--color-glass-border)] bg-[#18261A] ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
