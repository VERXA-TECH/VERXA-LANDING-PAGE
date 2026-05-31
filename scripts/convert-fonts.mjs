import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ttf2woff2 from 'ttf2woff2'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const fontsDir = path.join(root, 'public', 'fonts')

const faces = ['HeuvelGrotesk-Regular', 'HeuvelGrotesk-Medium']

for (const name of faces) {
  const ttfPath = path.join(fontsDir, `${name}.ttf`)
  const woff2Path = path.join(fontsDir, `${name}.woff2`)

  if (!fs.existsSync(ttfPath)) {
    console.error(`Missing source font: ${ttfPath}`)
    process.exit(1)
  }

  const woff2 = ttf2woff2(fs.readFileSync(ttfPath))
  fs.writeFileSync(woff2Path, woff2)
  console.log(`Wrote ${path.relative(root, woff2Path)} (${woff2.length} bytes)`)
}
