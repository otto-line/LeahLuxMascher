const fs = require('fs');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('./projects.json', 'utf8'));

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
fs.writeFileSync('./generated-artwork.html', html);

console.log('HTML generated successfully! Check generated-artwork.html');
console.log(`Generated ${data.artworks.length} artwork entries.`);
