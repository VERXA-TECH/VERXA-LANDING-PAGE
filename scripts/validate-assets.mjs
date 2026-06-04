import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const assetsSource = fs.readFileSync(
  path.join(root, 'src/lib/assets.ts'),
  'utf8',
)

/** PNG size budgets for hero assets served directly from /public. */
const HERO_PNG_LIMITS_KB = {
  'images/hero-bg-mobile.png': 400,
  'images/hero-bg-desktop.png': 1400,
  'images/phone-mockup-mobile.png': 550,
  'images/phone-mockup-desktop.png': 900,
}

const fontPaths = [
  '/fonts/HeuvelGrotesk-Regular.woff2',
  '/fonts/HeuvelGrotesk-Medium.woff2',
]

const paths = [
  ...new Set([
    ...fontPaths,
    ...[...assetsSource.matchAll(/["'](\/(?:images|icons)\/[^"']+)["']/g)].map((match) => match[1]),
  ]),
]

const missing = paths.filter((assetPath) => {
  const filePath = path.join(publicDir, assetPath.slice(1))
  return !fs.existsSync(filePath)
})

if (missing.length > 0) {
  console.error('Missing public assets:')
  missing.forEach((assetPath) => console.error(`  - ${assetPath}`))
  process.exit(1)
}

const oversized = Object.entries(HERO_PNG_LIMITS_KB).flatMap(([relativePath, limitKb]) => {
  const filePath = path.join(publicDir, relativePath)

  if (!fs.existsSync(filePath)) {
    return []
  }

  const sizeKb = fs.statSync(filePath).size / 1024
  if (sizeKb <= limitKb) {
    console.log(`${relativePath}: ${sizeKb.toFixed(1)} KB (limit ${limitKb} KB) OK`)
    return []
  }

  console.error(`${relativePath}: ${sizeKb.toFixed(1)} KB (limit ${limitKb} KB) OVER LIMIT`)
  return [relativePath]
})

if (oversized.length > 0) {
  console.error('One or more hero PNGs exceeded size limits.')
  process.exit(1)
}

console.log(`Verified ${paths.length} assets in public/`)
