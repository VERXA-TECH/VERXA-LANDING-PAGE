import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const assetsSource = fs.readFileSync(
  path.join(root, 'src/lib/assets.ts'),
  'utf8',
)

const paths = [
  ...new Set(
    [...assetsSource.matchAll(/["'](\/(?:images|icons)\/[^"']+)["']/g)].map((match) => match[1]),
  ),
]

const missing = paths.filter((assetPath) => {
  const filePath = path.join(root, 'public', assetPath.slice(1))
  return !fs.existsSync(filePath)
})

if (missing.length > 0) {
  console.error('Missing public assets:')
  missing.forEach((assetPath) => console.error(`  - ${assetPath}`))
  process.exit(1)
}

console.log(`Verified ${paths.length} assets in public/`)
