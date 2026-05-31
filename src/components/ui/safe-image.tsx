'use client'

import Image, { type ImageProps } from 'next/image'
import { useState, type ReactNode } from 'react'

type SafeImageProps = ImageProps & {
  fallback?: ReactNode
}

/** next/image wrapper that hides broken assets instead of showing the browser broken icon. */
export function SafeImage({ fallback = null, onError, ...props }: SafeImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return fallback
  }

  return (
    <Image
      {...props}
      onError={(event) => {
        setHasError(true)
        onError?.(event)
      }}
    />
  )
}
