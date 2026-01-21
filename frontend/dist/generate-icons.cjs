const fs = require('fs');
const path = require('path');

// Icon sizes required by PWA manifest
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const iconsDir = path.join(__dirname, 'icons');

// Create a simple SVG icon template  
function createSvgIcon(size) {
  const padding = size * 0.15;
  const iconSize = size - padding * 2;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6"/>
      <stop offset="100%" style="stop-color:#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#bg)"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Arial, sans-serif" font-weight="bold" font-size="${size * 0.4}" fill="white">
    HR
  </text>
</svg>`;
}

// Generate icons
sizes.forEach(size => {
  const svgContent = createSvgIcon(size);
  const filename = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(filename, svgContent);
  console.log(`Created: icon-${size}x${size}.svg`);
});

console.log('\n✅ SVG icons created! To convert to PNG, use a tool like sharp or imagemagick.');
console.log('For now, update manifest.json to use SVG icons or provide PNG files.');
