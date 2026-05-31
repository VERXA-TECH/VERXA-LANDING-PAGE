import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = path.join(root, 'public', 'images')

/** @type {Array<{ input: string; output: string; webp: sharp.WebpOptions }>} */
const TARGETS = [
  {
    input: 'hero-bg-mobile.png',
    output: 'hero-bg-mobile.webp',
    webp: { quality: 78, effort: 6 },
  },
  {
    input: 'hero-bg-desktop.png',
    output: 'hero-bg-desktop.webp',
    webp: { quality: 75, effort: 6 },
  },
  {
    input: 'phone-mockup-mobile.png',
    output: 'phone-mockup-mobile.webp',
    webp: { quality: 75, effort: 6, alphaQuality: 70 },
  },
  {
    input: 'phone-mockup-desktop.png',
    output: 'phone-mockup-desktop.webp',
    webp: { quality: 75, effort: 6, alphaQuality: 70 },
  },
]

const LIMITS_KB = {
  'hero-bg-mobile.webp': 200,
  'hero-bg-desktop.webp': 400,
  'phone-mockup-mobile.webp': 80,
  'phone-mockup-desktop.webp': 120,
}

let failed = false

for (const { input, output, webp } of TARGETS) {
  const inputPath = path.join(imagesDir, input)
  const outputPath = path.join(imagesDir, output)

  if (!fs.existsSync(inputPath)) {
    console.warn(`Skipping ${input} (source not found — using existing ${output})`)
    continue
  }

  await sharp(inputPath).webp(webp).toFile(outputPath)

  const sizeKb = fs.statSync(outputPath).size / 1024
  const limit = LIMITS_KB[output]
  const ok = sizeKb <= limit
  console.log(
    `${output}: ${sizeKb.toFixed(1)} KB (limit ${limit} KB) ${ok ? 'OK' : 'OVER LIMIT'}`,
  )
  if (!ok) failed = true
}

if (failed) {
  console.error('One or more hero images exceeded size limits.')
  process.exit(1)
}

console.log('Hero image compression complete.')
