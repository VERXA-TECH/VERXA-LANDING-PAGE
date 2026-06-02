/** Desktop hero top vignette — Figma 1512px frame. */
const HERO_CONIC_GLOW = {
  top: -1764,
  left: 212,
  width: 2126.201,
  height: 2375.163,
  rotate: 42.837,
  blur: 30.78380584716797,
  fill: `conic-gradient(from 180deg at 44.27% -0.89%, var(--color-holly-700) 0deg, rgba(0, 30, 23, 0.25) 16.93223163485527deg, rgba(0, 30, 23, 0.20) 30.456137359142303deg, rgba(0, 30, 23, 0.00) 41.38300359249115deg, rgba(0, 30, 23, 0.20) 348.76823902130127deg, rgba(0, 30, 23, 0.80) 353.2610249519348deg, rgba(0, 30, 23, 0.50) 360deg)`,
} as const

export function HeroConicGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-[1] hidden lg:block"
      style={{
        top: HERO_CONIC_GLOW.top,
        left: HERO_CONIC_GLOW.left,
        width: HERO_CONIC_GLOW.width,
        height: HERO_CONIC_GLOW.height,
        background: HERO_CONIC_GLOW.fill,
        transform: `rotate(${HERO_CONIC_GLOW.rotate}deg)`,
        mixBlendMode: "plus-lighter",
        filter: `blur(${HERO_CONIC_GLOW.blur}px)`,
      }}
    />
  )
}
