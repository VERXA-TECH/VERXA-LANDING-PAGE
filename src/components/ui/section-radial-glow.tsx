/** Desktop landing vignette — Figma frame 1512px, top 740, horizontal bleed ±64px. */
const RADIAL_GLOW = {
  top: 740,
  width: 1640,
  height: 361,
  borderRadius: 1640,
  blur: 61.98346710205078,
} as const

export function SectionRadialGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 z-[1] -translate-x-1/2"
      style={{
        top: RADIAL_GLOW.top,
        width: RADIAL_GLOW.width,
        height: RADIAL_GLOW.height,
        borderRadius: RADIAL_GLOW.borderRadius,
        background: `radial-gradient(50% 50% at 50% 50%, var(--color-radial-glow-start) 0%, var(--color-radial-glow-end) 100%)`,
        filter: `blur(${RADIAL_GLOW.blur}px)`,
      }}
    />
  )
}
