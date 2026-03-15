#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'ssrah1z8'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function generateMenu() {
  console.log('Generating menu.json...')

  const query = `*[_type == "project" && published == true] | order(year desc) {
    title,
    slug,
    year,
    "href": slug.current + ".html",
    hoverImage
  }`

  try {
    const projects = await client.fetch(query)
    const menuData = {
      projects: projects.map(p => ({
        title: p.title,
        href: p.href,
        year: p.year || null,
        hoverImage: p.hoverImage || null,
        spacerAfter: false,
      })),
    }

    fs.writeFileSync(
      path.join(__dirname, '../menu.json'),
      JSON.stringify(menuData, null, 2)
    )
    console.log(`✓ Generated menu.json with ${projects.length} projects`)
  } catch (error) {
    console.error('Error generating menu:', error.message)
  }
}

async function generateCV() {
  console.log('Generating cv.json...')

  const query = `*[_type == "cvItem"] | order(year desc) {
    title,
    year,
    description,
    dates,
    location
  }`

  try {
    const cvItems = await client.fetch(query)
    const cvData = { cv: cvItems }

    fs.writeFileSync(
      path.join(__dirname, '../cv.json'),
      JSON.stringify(cvData, null, 2)
    )
    console.log(`✓ Generated cv.json with ${cvItems.length} items`)
  } catch (error) {
    console.error('Error generating CV:', error.message)
  }
}

async function generateTheme() {
  console.log('Generating theme.css...')

  const query = `*[_type == "siteSettings"][0]`

  try {
    const settings = await client.fetch(query)

    if (!settings) {
      console.warn('⚠ No site settings found, using defaults')
      return
    }

    const {colors = {}, fonts = {}, spacing = {}, grid = {}} = settings

    const css = `/* Auto-generated theme from Sanity */
:root {
  /* Colors */
  --color-primary-red: ${colors.primaryRed || '#dc0202'};
  --color-text: ${colors.textColor || '#da0000'};
  --color-background: ${colors.backgroundColor || 'white'};
  --color-accent: ${colors.accentColor || '#eb80ff'};

  /* Fonts */
  --font-size-body: ${fonts.bodyFontSize || 1.2}em;
  --font-size-heading: ${fonts.headingFontSize || 2}em;
  --font-size-menu: ${fonts.menuFontSize || 1.4}em;

  /* Spacing */
  --spacing-padding: ${spacing.padding || 20}px;
  --spacing-gap: ${spacing.imageGap || 10}px;
  --spacing-margin-top: ${spacing.marginTop || 3}em;

  /* Grid */
  --grid-columns: ${grid.defaultColumns || 3};
  --grid-columns-mobile: ${grid.mobileColumns || 2};
}

p {
  font-size: var(--font-size-body);
  color: var(--color-text);
}

.menu-container {
  background-color: var(--color-primary-red);
}

.image-grid {
  gap: var(--spacing-gap);
  margin-top: var(--spacing-margin-top);
}

.grid {
  grid-gap: var(--spacing-gap);
}
`

    fs.writeFileSync(
      path.join(__dirname, '../theme.css'),
      css
    )
    console.log('✓ Generated theme.css')
  } catch (error) {
    console.error('Error generating theme:', error.message)
  }
}

async function generateProjects() {
  console.log('Generating project HTML files...')

  const query = `*[_type == "project" && published == true] {
    title,
    slug,
    description,
    fullDescription,
    images,
    gridColumns,
    year
  }`

  try {
    const projects = await client.fetch(query)

    for (const project of projects) {
      const html = generateProjectHTML(project)
      const filename = path.join(__dirname, `../${project.slug.current}.html`)

      fs.writeFileSync(filename, html)
    }

    console.log(`✓ Generated ${projects.length} project HTML files`)
  } catch (error) {
    console.error('Error generating projects:', error.message)
  }
}

function generateProjectHTML(project) {
  const imageGrid = project.images?.map(img => {
    const src = img.source === 'local' ? img.localPath : img.sanityImage?.asset?.url
    const alt = img.alt || 'Project image'
    return `            <div><img loading="lazy" src="${src}" alt="${alt}"></div>`
  }).join('\n') || ''

  const description = project.fullDescription
    ?.map(block => {
      if (block._type === 'block') {
        return `<p>${block.children?.map(c => c.text).join('')}</p>`
      }
      return ''
    })
    .join('\n') || ''

  const gridColumns = project.gridColumns || 3

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="projects-style.css">
    <link rel="stylesheet" href="theme.css">
    <style>
        h2, h3, h4, h1 { text-transform: uppercase; }
        .image-grid {
            display: grid;
            grid-template-columns: repeat(${gridColumns}, 1fr);
            gap: var(--spacing-gap);
            margin-top: var(--spacing-margin-top);
        }
        @media (max-width: 480px) {
            .image-grid { grid-template-columns: repeat(var(--grid-columns-mobile), 1fr); }
        }
    </style>
</head>
<body>
    <div class="project-container">
        <h1 class="project-title">${project.title}</h1>
        <div class="project-description">
            ${description}
        </div>
        <div class="image-grid">
            ${imageGrid}
        </div>
    </div>
</body>
</html>`
}

async function main() {
  console.log('🚀 Starting static generation from Sanity...\n')

  await generateMenu()
  await generateCV()
  await generateTheme()
  await generateProjects()

  console.log('\n✅ Generation complete!')
}

main().catch(console.error)
