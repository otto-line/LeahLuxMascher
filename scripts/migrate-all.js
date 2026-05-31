#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.join(__dirname, '..')

const client = createClient({
  projectId: 'ssrah1z8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// ─── CV Items ────────────────────────────────────────────────────────────────

const cvItems = [
  {
    title: 'EAVESDROP',
    year: 2026,
    description: 'Performance piece with Kahlil Visser, in collaboration with Everard Read',
    dates: '20 - 22 February 2026',
    location: 'Investec Cape Town Art Fair, CTICC',
  },
  {
    title: 'SO MANY PEOPLE IN THE NIGHT',
    year: 2026,
    description: 'Solo show / installation / drawings at Cubicle Everard Read alongside Kutti Collective, Mbulelo Lokoto, Kamva Matuis, Turning into Flowers and Aaron Philander',
    dates: '12 - 24 January 2026',
    location: 'CIRCA, Everard Read, Cape Town',
  },
  {
    title: "YOU'RE SO VAIN YOU PROBABLY THINK THIS GROUP SHOW IS ABOUT YOU",
    year: 2025,
    description: 'Group show showcasing an installation and poster design "LUX ROOM SHRINE" (2025)',
    dates: '20 December 2025 - 31 January 2026',
    location: '14 Tuin Plein Street, Gardens, Cape Town',
  },
  {
    title: 'GROUPSHOW FROM HELL',
    year: 2025,
    description: 'Group show showcasing a videowork titled "Fiery Sadness" (2023)',
    dates: '23 - 26 October 2025',
    location: '14 Tuin Plein Street, Gardens, Cape Town',
  },
  {
    title: 'FAMILIA',
    year: 2025,
    description: 'Group show showcasing a collage',
    dates: 'June 2025',
    location: 'Brutal, 48 Albert Road, Woodstock, Cape Town',
  },
  {
    title: 'FORGET ME NOT',
    year: 2025,
    description: 'Group show showcasing a woodcut',
    dates: '22 - 29 March 2025',
    location: 'Kalashnikov Gallery, 61 Loop St, Cape Town',
  },
  {
    title: 'GIRLS TOO',
    year: 2025,
    description: 'Group show showcasing a selection of photographs and light fixtures',
    dates: '13 - 27 February 2025',
    location: 'Lemkus Gallery, 28 St George\'s Mall, Cape Town',
  },
  {
    title: 'FOREVER LOVE',
    year: 2024,
    description: 'Multi-media art installation, graduate body of work for the Michaelis School of Fine Art BA (Hons) degree in Fine Art',
    dates: '6 December 2024',
    location: '31-37 Orange Street, Cape Town',
  },
  {
    title: 'NECKLACE',
    year: 2024,
    description: 'Solo interactive performance piece and installation',
    dates: '6 June 2024',
    location: 'Demo Projects, 79 Roeland Street, Cape Town',
  },
  {
    title: 'PIPE DREAMS',
    year: 2024,
    description: 'Group show showcasing a selection of photographs',
    dates: '21 March - 4 April 2024',
    location: 'Demo Projects, 79 Roeland Street, Cape Town',
  },
]

// ─── Projects ─────────────────────────────────────────────────────────────────

const projects = [
  {
    title: 'Studio',
    slug: 'studio',
    year: null,
    hoverImagePath: 'Images/STUDIO/ABSTRACT-FIRE.jpg',
  },
  {
    title: 'So Many People In The Night',
    slug: 'so-many-people-in-the-night',
    year: "'26",
    hoverImagePath: 'Images/hover/So-many-people-in-the-night.jpg',
  },
  {
    title: 'Eavesdrop',
    slug: 'eavesdrop',
    year: "'26",
    hoverImagePath: 'Images/EAVESDROP/E1.jpg',
  },
  {
    title: 'Lux Room Shrine',
    slug: 'shrine-hotspot',
    year: "'25",
    hoverImagePath: 'Images/hover/LUX-BEDROOM-SHRINE-A3-PRINT.png',
  },
  {
    title: 'Forever Love',
    slug: 'Forever-Love',
    year: "'24",
    hoverImagePath: 'Images/hover/Forever-love.jpg',
  },
  {
    title: 'Necklace',
    slug: 'necklace',
    year: "'24",
    hoverImagePath: 'Images/hover/Necklace.png',
  },
  {
    title: 'Pipe Dreams',
    slug: 'Pipe-Dreams',
    year: "'24",
    hoverImagePath: 'Images/PIPE-DREAMS/MARY-1.jpg',
  },
  {
    title: 'Fiery Sadness',
    slug: 'fiery-sadness',
    year: null,
    hoverImagePath: 'Images/FIERY-SADNESS/FS1.jpg',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function uploadImage(localPath) {
  const fullPath = path.join(ROOT, localPath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Image not found: ${localPath}`)
    return null
  }
  const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
    filename: path.basename(fullPath),
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

// ─── Migration ────────────────────────────────────────────────────────────────

async function migrateCVItems() {
  console.log('\n── Migrating CV items ──')
  const existing = await client.fetch(`*[_type == "cvItem"].title`)

  for (const item of cvItems) {
    if (existing.includes(item.title)) {
      console.log(`  skip  ${item.title} (already exists)`)
      continue
    }
    await client.create({ _type: 'cvItem', ...item })
    console.log(`  ✓     ${item.title}`)
  }
}

async function migrateProjects() {
  console.log('\n── Migrating projects ──')
  const existing = await client.fetch(`*[_type == "project"]{"slug": slug.current}`)
  const existingSlugs = existing.map(p => p.slug)

  for (const p of projects) {
    if (existingSlugs.includes(p.slug)) {
      console.log(`  skip  ${p.title} (already exists)`)
      continue
    }

    process.stdout.write(`  uploading hover image for ${p.title}... `)
    const hoverImage = await uploadImage(p.hoverImagePath)
    console.log(hoverImage ? 'done' : 'skipped')

    await client.create({
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      year: p.year || undefined,
      published: true,
      ...(hoverImage && { hoverImage }),
    })
    console.log(`  ✓     ${p.title}`)
  }
}

async function main() {
  console.log('🚀 Migrating all content to Sanity...')
  await migrateCVItems()
  await migrateProjects()
  console.log('\n✅ Done!')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
