// Generates app icon, splash and store graphics from SVG: node scripts/make-art.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const out = p => path.join(__dirname, '..', p);

const grad = `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f5bea"/><stop offset="1" stop-color="#6d4aff"/></linearGradient>
<filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#0b1020" flood-opacity=".35"/></filter></defs>`;
const font = `font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="800"`;

// Two overlapping coins ($ and €) with swap arrows, drawn in a 1024 box centred on (512,512)
const coins = `
<g filter="url(#s)">
  <circle cx="365" cy="380" r="200" fill="#ffffff"/>
  <text x="365" y="455" font-size="230" text-anchor="middle" fill="#2f5bea" ${font}>$</text>
</g>
<g filter="url(#s)">
  <circle cx="655" cy="490" r="200" fill="#ffd166"/>
  <text x="655" y="565" font-size="230" text-anchor="middle" fill="#3b2a00" ${font}>€</text>
</g>
<g fill="none" stroke="#ffffff" stroke-width="28" stroke-linecap="round" stroke-linejoin="round">
  <path d="M330 745 H700 M655 705 L700 745 L655 785"/>
  <path d="M694 835 H324 M369 795 L324 835 L369 875"/>
</g>`;

const wrap = (inner, bg = true) => `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">${grad}${bg ? '<rect width="1024" height="1024" fill="url(#g)"/>' : ''}${inner}</svg>`;
// Adaptive-icon foreground: keep art inside the central safe zone
const foreground = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">${grad}<g transform="translate(512 512) scale(.8) translate(-512 -512)">${coins}</g></svg>`;

fs.writeFileSync(out('assets/icon.svg'), wrap(coins));
async function png(svg, file, size) {
  const img = sharp(Buffer.from(svg), { density: 144 });
  await (size ? img.resize(size.w, size.h) : img).png().toFile(out(file));
  console.log('wrote', file);
}

(async () => {
  await png(wrap(coins), 'assets/icon-only.png');
  await png(foreground, 'assets/icon-foreground.png');
  await png(`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024">${grad}<rect width="1024" height="1024" fill="url(#g)"/></svg>`, 'assets/icon-background.png');

  const splash = dark => `<svg xmlns="http://www.w3.org/2000/svg" width="2732" height="2732" viewBox="0 0 2732 2732">${grad}<rect width="2732" height="2732" fill="${dark ? '#0b1020' : '#f3f5fb'}"/>
    <g transform="translate(1366 1250) scale(.9) translate(-512 -512)"><rect x="0" y="0" width="1024" height="1024" rx="230" fill="url(#g)"/>${coins}</g>
    <text x="1366" y="1900" font-size="130" text-anchor="middle" fill="${dark ? '#eef1fb' : '#0f1b3d'}" ${font}>Currency Converter</text></svg>`;
  await png(splash(false), 'assets/splash.png');
  await png(splash(true), 'assets/splash-dark.png');

  // Store graphics
  await png(wrap(coins), 'store/icon-512.png', { w: 512, h: 512 });
  const feature = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500">${grad}<rect width="1024" height="500" fill="url(#g)"/>
    <g transform="translate(760 250) scale(.46) translate(-512 -512)">${coins}</g>
    <text x="64" y="215" font-size="74" fill="#fff" ${font}>Currency</text>
    <text x="64" y="300" font-size="74" fill="#fff" ${font}>Converter</text>
    <text x="64" y="365" font-size="30" fill="#e3e8ff" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">Live rates · 160+ currencies · Works offline</text></svg>`;
  await png(feature, 'store/feature-graphic-1024x500.png', { w: 1024, h: 500 });
})();
