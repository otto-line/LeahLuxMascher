# Client Guide: Managing Your Portfolio with Sanity Studio

This guide is for managing your portfolio content without technical knowledge.

## Accessing Sanity Studio

1. Go to: **https://sanity.io/manage** (or the URL provided)
2. Log in with your Sanity account
3. Select project "Leah Lux Mascher"
4. You're in the Studio!

---

## Managing Projects

### Add a New Project

1. Click **"Project"** in left sidebar
2. Click **"Create" → "Project"**
3. Fill in:
   - **Title**: Name of your project (e.g., "Summer Exhibition")
   - **Slug**: Auto-fills from title (URL-friendly)
   - **Year**: Optional (e.g., '26, '25, '24)
   - **Description**: 1-2 sentence summary
   - **Full Description**: Detailed description. Use formatting buttons for bold, italic, etc.
   - **Images**: Click "Add image" → Choose source:
     - **Sanity**: Upload images directly (recommended)
     - **Local**: Link to existing path (e.g., `Images/folder/image.jpg`)
   - **Hover Image**: Path to preview thumbnail (e.g., `Images/hover/MyProject.jpg`)
   - **Grid Columns**: 2 or 3 columns for image layout
   - **Published**: Toggle ON to show on website

4. Click **"Publish"** (blue button bottom right)

### Edit Existing Project

1. Click **"Project"** in sidebar
2. Click project name to open
3. Make changes
4. Click **"Publish"**

### Hide Project (Without Deleting)

1. Open project
2. Toggle **"Published"** OFF
3. Click **"Publish"**
4. Project disappears from website but data is saved

### Delete Project

1. Open project
2. Click ⋯ (three dots) → **"Delete"**
3. Confirm

---

## Managing CV / Exhibition History

### Add Exhibition

1. Click **"CV Item"** in sidebar
2. Click **"Create" → "CV Item"**
3. Fill in:
   - **Title**: Name of exhibition/event
   - **Year**: 2026, 2025, etc.
   - **Description**: What you showed or your role
   - **Dates**: "20 - 22 February 2026"
   - **Location**: Venue name and address
4. Click **"Publish"**

### Edit CV Entry

1. Click **"CV Item"** in sidebar
2. Click entry to edit
3. Make changes
4. Click **"Publish"**

---

## Customizing Design

### Change Colors

1. Click **"Site Settings"** in sidebar
2. Scroll to **"Colors"**
3. Change:
   - **Primary Red**: Main brand color
   - **Text Color**: Text color throughout
   - **Background Color**: Page background
   - **Accent Color**: Secondary/highlight color
4. Click **"Publish"**

### Change Font Sizes

1. Click **"Site Settings"**
2. Scroll to **"Fonts"**
3. Adjust:
   - **Body Font Size**: Regular text (default: 1.2)
   - **Heading Font Size**: Titles (default: 2)
   - **Menu Font Size**: Navigation text (default: 1.4)
4. Click **"Publish"**

### Change Spacing

1. Click **"Site Settings"**
2. Scroll to **"Spacing"**
3. Adjust:
   - **Padding**: Space around content
   - **Image Gap**: Space between images
   - **Margin Top**: Space above content sections
4. Click **"Publish"**

### Change Image Grid Layout

1. Click **"Site Settings"**
2. Scroll to **"Grid"**
3. Set:
   - **Default Columns**: Desktop layout (2 or 3)
   - **Mobile Columns**: Phone layout (usually 2)
4. You can also set columns per-project (in Project settings)
5. Click **"Publish"**

### Edit About Page Text

1. Click **"Site Settings"**
2. Scroll to **"About Content"**
3. Click in text box
4. Type/edit your bio
5. Use formatting buttons for bold, italic, links, etc.
6. Click **"Publish"**

---

## Best Practices

### Image Tips
- **Sanity Upload**: Best for new images, no file management needed
- **Local Paths**: Good for existing images already organized
- **File names**: Use hyphens not spaces (e.g., `my-photo.jpg` not `my photo.jpg`)
- **Formats**: JPG for photos, PNG for graphics
- **Alt Text**: Always add (helps accessibility & SEO)

### Text Tips
- **Titles**: Keep concise (appears in menu)
- **Descriptions**: 1-2 sentences for summary
- **Full Descriptions**: Can be longer, use formatting
- **Use formatting**: Bold important text, use headers for sections

### Color Tips
- Use hex codes (e.g., `#dc0202` for red)
- Or standard colors (e.g., `white`, `black`)
- Test on mobile to ensure readability

### Organization
- Keep project titles consistent
- Use same date format (e.g., "20 - 22 February 2026")
- Group related exhibitions together (add before/after)

---

## Seeing Your Changes

After you make changes in Sanity Studio:

1. Changes **auto-generate** if GitHub Actions is enabled
2. Website updates within 5-10 minutes
3. If auto-generation is off, someone needs to run generation script

### Manual Update (if needed)
If changes don't appear after 10 minutes, ask your developer to run:
```bash
npm run generate
git push
```

---

## Common Questions

**Q: Can I reorder projects?**
A: Not directly in Sanity, but you can set years or add custom order fields. For now, contact your developer.

**Q: Can I upload large images?**
A: Yes, Sanity compresses them automatically. But 20MB+ files may take longer.

**Q: What if I accidentally delete something?**
A: Sanity keeps history. Ask your developer to restore from backups.

**Q: Can I schedule posts?**
A: Currently no, but we can add this feature if needed.

**Q: How do I add a link in text?**
A: Select text → Click link icon → Paste URL

**Q: Can I have different layouts for different projects?**
A: Yes! Each project has its own grid column setting.

---

## Getting Help

If something isn't working:

1. Check this guide
2. Refresh your browser (Ctrl+R or Cmd+R)
3. Try logging out and back in
4. Contact your developer with:
   - What you were trying to do
   - What happened (error message, etc.)
   - Screenshot if helpful

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Publish | Cmd/Ctrl + S |
| Search | Cmd/Ctrl + K |
| Close panel | Esc |
| Bold text | Cmd/Ctrl + B |
| Italic text | Cmd/Ctrl + I |

---

## File Limits

- **Image size**: Up to 50MB (auto-compressed)
- **Text fields**: Unlimited
- **Images per project**: Unlimited
- **Projects**: Unlimited
- **CV entries**: Unlimited

---

That's it! You can now manage your entire portfolio without touching any code. 🎨

Need more help? Ask your developer!
