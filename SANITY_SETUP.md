# Sanity Studio Setup Guide

This guide will help you set up Sanity CMS to manage your portfolio website content.

## Prerequisites

- **Node.js** (v18+) - [Install](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Sanity Account** (you already have this)

## Step 1: Install Node.js

If you don't have Node.js, install it from [nodejs.org](https://nodejs.org/). Choose the LTS (Long Term Support) version.

Verify installation:
```bash
node --version
npm --version
```

## Step 2: Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Sanity API token:
   - Go to [Sanity Studio Dashboard](https://manage.sanity.io/)
   - Select your project (ssrah1z8)
   - Go to API > Tokens
   - Create a new token with read/write access
   - Paste it in `.env` as `SANITY_API_TOKEN`

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Start Sanity Studio

Launch the local Sanity Studio:
```bash
npm run dev
```

This will open at `http://localhost:3333`

## Step 5: Populate Content

In Sanity Studio, add your content:

### Projects
1. Click "Project" in the sidebar
2. Add a new document for each project:
   - **Title**: Project name
   - **Slug**: Auto-generated URL slug
   - **Year**: e.g., '26, '25, '24
   - **Description**: Short description
   - **Full Description**: Detailed description with formatting
   - **Images**: Upload or link images (Sanity or local paths)
   - **Hover Image**: Path to menu preview image
   - **Grid Columns**: 2 or 3 (default: 3)
   - **Published**: Toggle to show/hide

### CV Items
1. Click "CV Item" in the sidebar
2. Add entries with:
   - **Title**: Event/exhibition name
   - **Year**: 2026, 2025, etc.
   - **Description**: What was shown/your role
   - **Dates**: e.g., "20 - 22 February 2026"
   - **Location**: Venue details

### Site Settings
1. Click "Site Settings" in the sidebar
2. Customize:
   - **Colors**: Primary red, text color, background, accent
   - **Fonts**: Body, heading, menu font sizes
   - **Spacing**: Padding, image gaps, margins
   - **Grid**: Default and mobile column counts
   - **About Content**: Your bio/about text

## Step 6: Generate Static Files

After adding content in Sanity, run:

```bash
npm run generate
```

This creates/updates:
- `menu.json` - Project list
- `cv.json` - CV items
- `theme.css` - Customized styles
- `*.html` - Project pages

## Step 7: Deploy to GitHub Pages

1. Commit the generated files:
   ```bash
   git add menu.json cv.json theme.css *.html
   git commit -m "Update from Sanity"
   git push
   ```

2. GitHub Actions will automatically run on push (optional - set up secrets first)

## Automated Deployment (GitHub Actions)

To enable automatic generation on GitHub:

1. Go to your GitHub repo → Settings → Secrets and variables
2. Add: `SANITY_PROJECT_ID` = `ssrah1z8`
3. The workflow `.github/workflows/generate-from-sanity.yml` will:
   - Run daily at midnight
   - Generate files from Sanity
   - Auto-commit changes

## Important Notes

### Image Management
You can manage images two ways:

1. **Sanity Upload** - Upload images directly in Sanity Studio
2. **Local Files** - Link to existing images in `/Images/` folders
   - Example local path: `Images/FOREVER-LOVE/FL1.jpg`

### Grid Columns
Each project can have different grid layouts:
- Set in Sanity: 2 for two columns, 3 for three columns
- Mobile automatically uses fewer columns (configurable in Site Settings)

### CSS Customization
All CSS values are editable in Site Settings:
- Colors apply globally
- Font sizes affect all text
- Grid columns control image layout
- Changes auto-generate in `theme.css`

## Troubleshooting

### Dependencies won't install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Changes not updating
Make sure you ran:
```bash
npm run generate
```

### API token errors
Verify your token in `.env` has read/write permissions in Sanity dashboard

## File Structure

```
/
├── sanity.config.ts           # Sanity configuration
├── sanity/
│   └── schemaTypes/           # Your data schemas
│       ├── project.ts
│       ├── cvItem.ts
│       └── siteSettings.ts
├── scripts/
│   └── generate.js            # Generates static files
├── menu.json                  # Auto-generated from Sanity
├── cv.json                    # Auto-generated from Sanity
├── theme.css                  # Auto-generated from Sanity
└── *.html                     # Static pages
```

## Next Steps

1. ✅ Install Node.js
2. ✅ Create `.env` with API token
3. ✅ Run `npm install`
4. ✅ Run `npm run dev` to open Sanity Studio
5. ✅ Add your projects, CV, and settings
6. ✅ Run `npm run generate`
7. ✅ Commit and push to GitHub

Your client can now manage all content through Sanity Studio! 🎉
