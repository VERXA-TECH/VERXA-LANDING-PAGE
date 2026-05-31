'use client'

import { useState } from 'react'

type HeroIconProps = {
  src: string
  width: number
  height?: number
  className?: string
}

/** SVG assets — native img so fills render reliably (Next/Image can drop SVGs). */
export function HeroIcon({ src, width, height, className = '' }: HeroIconProps) {
  const [hasError, setHasError] = useState(false)
  const h = height ?? width

  if (hasError) {
    return (
      <span
        aria-hidden
        className={`inline-block shrink-0 rounded-full bg-[var(--color-holly-600)] ${className}`}
        style={{ width, height: h }}
      />
    )
  }

  return (
    <img
      src={src}
      alt=""
      width={width}
      height={h}
      className={`block shrink-0 ${className}`}
      draggable={false}
      onError={() => setHasError(true)}
    />
  )
}
