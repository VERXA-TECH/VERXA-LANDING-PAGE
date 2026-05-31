import Image from 'next/image'

type SectionBackgroundImageProps = {
  src: string
  alt?: string
  priority?: boolean
  className?: string
  imageClassName?: string
}

/** Full-bleed section background via next/image (optimized, with color fallback). */
export function SectionBackgroundImage({
  src,
  alt = '',
  priority = false,
  className = '',
  imageClassName = 'object-cover object-center',
}: SectionBackgroundImageProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className={imageClassName}
      />
    </div>
  )
}
