type HeroIconProps = {
  src: string
  width: number
  height?: number
  className?: string
}

/** SVG assets — use native img so fills render reliably (Next/Image can drop SVGs). */
export function HeroIcon({ src, width, height, className = '' }: HeroIconProps) {
  const h = height ?? width
  return (
    <img
      src={src}
      alt=""
      width={width}
      height={h}
      className={`block shrink-0 ${className}`}
      draggable={false}
    />
  )
}
