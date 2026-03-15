# Implementation Steps for Sanity Integration

Follow these steps in order to set up your portfolio website with Sanity CMS.

## Phase 1: Installation & Setup (One-time)

### 1.1 Install Node.js
- Download and install from https://nodejs.org/ (LTS version)
- Verify: `node --version` and `npm --version`

### 1.2 Create `.env` File
```bash
cp .env.example .env
```

### 1.3 Get Sanity API Token
1. Go to https://manage.sanity.io/
2. Select project "ssrah1z8"
3. Navigate to: API → Tokens
4. Click "Add API Token"
5. Name it "Website Generator"
6. Set to Editor permissions
7. Copy the token
8. Paste into `.env`:
   ```
   SANITY_API_TOKEN=your_copied_token_here
   ```

### 1.4 Initialize Sanity Studio
Run this command (it will create the studio structure):
```bash
npm create sanity@latest -- --project ssrah1z8 --dataset production --template clean
```

When prompted:
- Use TypeScript: **Yes**
- Package name: Press Enter
- Install dependencies: **Yes**

### 1.5 Move Schema Files
The command above creates a `/sanity` folder. Move the schemas I created:
1. Copy `/sanity/schemaTypes/project.ts` → your new `sanity/schemaTypes/`
2. Copy `/sanity/schemaTypes/cvItem.ts` → your new `sanity/schemaTypes/`
3. Copy `/sanity/schemaTypes/siteSettings.ts` → your new `sanity/schemaTypes/`
4. Update `/sanity/schemaTypes/index.ts` to import all three

### 1.6 Install Generation Dependencies
```bash
npm install @sanity/client
```

### 1.7 Start Sanity Studio
```bash
npm run dev
```
This opens Sanity Studio at `http://localhost:3333`

---

## Phase 2: Content Population

### 2.1 Create Site Settings
1. In Sanity Studio (left sidebar), click **Site Settings**
2. Create a new document with:
   - **Colors**: Update your brand colors
   - **Fonts**: Font sizes (body: 1.2, heading: 2, menu: 1.4)
   - **Spacing**: Gaps and padding
   - **Grid**: Default columns: 3, Mobile: 2
   - **About Content**: Your bio text
3. Click Publish

### 2.2 Migrate Existing Projects
For each project in your portfolio (Studio, So Many People, Eavesdrop, etc.):

1. Click **Project** in sidebar
2. Click "Create Project"
3. Fill in:
   - **Title**: "Studio" (or project name)
   - **Slug**: Auto-generates from title
   - **Year**: "'26" or "'25" or leave empty
   - **Description**: 1-2 sentence summary
   - **Full Description**: Detailed text (can be formatted)
   - **Images**:
     - Click "Add image"
     - Choose source: Sanity or Local
     - If Local: Enter path like `Images/FOREVER-LOVE/FL1.jpg`
     - If Sanity: Upload image directly
   - **Hover Image**: Path like `Images/hover/Project.jpg`
   - **Grid Columns**: 2 or 3 (check existing pages)
4. Publish

### 2.3 Migrate CV Items
For each CV entry:

1. Click **CV Item** in sidebar
2. Click "Create CV Item"
3. Fill in:
   - **Title**: Event/exhibition name
   - **Year**: 2026, 2025, etc.
   - **Description**: "Group show showcasing..."
   - **Dates**: "20 - 22 February 2026"
   - **Location**: Venue address
4. Publish

---

## Phase 3: Generate Static Files

### 3.1 Generate from Current Content
Once you've populated Sanity with content:
```bash
npm run generate
```

This creates/updates:
- `menu.json` - Updated project list
- `cv.json` - Updated CV items
- `theme.css` - New file with your styles
- `*.html` - New project pages from templates

### 3.2 Test Locally
1. Open `index.html` in your browser
2. Check that:
   - Menu loads projects from new `menu.json`
   - CV page displays from new `cv.json`
   - Colors/fonts match Site Settings
   - Project pages load correctly

---

## Phase 4: Deploy to GitHub

### 4.1 Commit Changes
```bash
git add .
git commit -m "feat: add Sanity integration"
git push
```

### 4.2 Update HTML Files to Load from Generated Files
The existing `index.html` already loads from `menu.json` and `cv.html` loads from `cv.json`, so they'll automatically use the new generated content.

### 4.3 Link theme.css in HTML Headers
Update any project files or main style links to include:
```html
<link rel="stylesheet" href="theme.css">
```

---

## Phase 5: Enable Auto-Generation (Optional)

To automatically generate files when Sanity content changes:

### 5.1 Set GitHub Secrets
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add:
   - Name: `SANITY_PROJECT_ID`
   - Value: `ssrah1z8`
4. Add another secret:
   - Name: `SANITY_API_TOKEN`
   - Value: Your token from `.env`

### 5.2 Workflow Runs
The workflow in `.github/workflows/generate-from-sanity.yml` will:
- Run daily at midnight UTC
- Run when you manually trigger it in GitHub Actions
- Auto-commit changes back to main branch

---

## Daily Workflow for Your Client

Once set up, your client can:

### To Update Projects
1. Go to Sanity Studio (you provide the URL)
2. Click "Project"
3. Click a project to edit or create new one
4. Change title, description, add/remove images
5. Click "Publish"
6. Changes auto-generate (if GitHub Actions enabled) or you run `npm run generate`

### To Update CV
1. Click "CV Item"
2. Edit entries or add new ones
3. Publish
4. Changes auto-generate

### To Customize Design
1. Click "Site Settings"
2. Change colors, fonts, spacing, grid layout
3. Publish
4. Changes auto-generate in `theme.css`

---

## File Reference

After setup, you'll have:

```
LEAH/
├── sanity.config.ts              # Sanity config
├── sanity/
│   ├── schemaTypes/              # Your schemas
│   │   ├── project.ts
│   │   ├── cvItem.ts
│   │   └── siteSettings.ts
│   └── studio/                   # Sanity Studio files
├── scripts/
│   └── generate.js               # Generation script
├── .github/workflows/
│   └── generate-from-sanity.yml  # Auto-deployment
├── menu.json                     # Generated - projects list
├── cv.json                       # Generated - CV items
├── theme.css                     # Generated - custom styles
├── package.json                  # Updated with dependencies
├── .env                          # Your secrets (git ignored)
└── ... (existing HTML files)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm: command not found` | Install Node.js from nodejs.org |
| `Cannot find module '@sanity/client'` | Run `npm install @sanity/client` |
| `API token invalid` | Check token in `.env`, regenerate if needed |
| Files not generating | Run `npm run generate` manually, check for errors |
| Images not showing | Verify paths are correct (e.g., `Images/FOREVER-LOVE/FL1.jpg`) |
| Menu not updating | Restart local dev server or regenerate |

---

## Summary

✅ Install Node.js
✅ Create `.env` with API token
✅ Run Sanity initialization command
✅ Move schema files to `/sanity/schemaTypes/`
✅ Start Sanity Studio (`npm run dev`)
✅ Populate projects, CV, and settings
✅ Run `npm run generate`
✅ Test locally
✅ Commit and push to GitHub
✅ (Optional) Set up GitHub Actions for auto-deployment

You're done! Your client can now manage all content through Sanity. 🎉
