const fs = require('fs');
const path = require('path');

const JSON_FILE = './projects.json';
const OUTPUT_FILE = './generated-artwork.html';

function generateHTML() {
  try {
    // Read the JSON file
    const data = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

    // Generate HTML for each artwork
    let html = '';

    data.artworks.forEach((artwork, index) => {
      // Format dimensions: combine array into "inches (cm)" format
      const dimensions = artwork.dimensions
        ? `${artwork.dimensions[0]} (${artwork.dimensions[1]})`
        : '';

      // Format title with year
      const titleWithYear = `${artwork.title.toUpperCase()}, ${artwork.year}`;

      // Format medium in uppercase
      const medium = artwork.medium ? artwork.medium.toUpperCase() : '';

      // Format price (empty if null)
      const price = artwork.price || '';

      // Generate the HTML
      html += `
<div class="work-box" id="${artwork.code || ''}">
    <div> ${index + 1} </div>
    <div> <img loading="lazy" width="200" src="${artwork.image_url || ''}" alt="${artwork.title}"> </div>
    <div class="work-text-box">
        <h4> LEAH LUX MASCHER</h4>
        <p class="title">${titleWithYear} </p>
        <p class="medium">${medium}</p>
        <p class="dimensions"> ${dimensions}</p>
        <div><p class="price">${price}</p></div>
    </div>
</div>
`;
    });

    // Write the HTML to a file
    fs.writeFileSync(OUTPUT_FILE, html);

    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ✓ HTML regenerated (${data.artworks.length} artworks)`);
  } catch (error) {
    console.error('Error generating HTML:', error.message);
  }
}

// Generate HTML initially
console.log('Starting artwork HTML generator...');
generateHTML();

// Watch for changes to the JSON file
fs.watch(JSON_FILE, (eventType, filename) => {
  if (eventType === 'change') {
    console.log(`\nDetected change in ${JSON_FILE}...`);
    // Small delay to ensure file write is complete
    setTimeout(generateHTML, 100);
  }
});

console.log(`\nWatching ${JSON_FILE} for changes...`);
console.log('Press Ctrl+C to stop.\n');
