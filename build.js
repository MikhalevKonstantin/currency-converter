// Static site generator: node build.js  ->  dist/
// SITE_URL=https://yourdomain.com node build.js
const fs = require('fs');
const path = require('path');

const SITE = (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '');
const CODES = ['USD','EUR','GBP','JPY','CAD','AUD','CHF','CNY','INR','MXN','BRL','KRW','SEK','NOK','NZD','SGD','HKD','TRY','ZAR','AED'];
const AMOUNTS = [1, 5, 10, 50, 100, 500, 1000];
const OUT = path.join(__dirname, 'dist');
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
if (process.env.SITE_URL) CONFIG.share.url = SITE;
// Only public client-side IDs belong in config.json (no secrets).
const tpl = fs.readFileSync(path.join(__dirname, 'src/template.html'), 'utf8');
const names = new Intl.DisplayNames('en', { type: 'currency' });
const name = c => names.of(c);
const fmt = (n, c) => new Intl.NumberFormat('en', { style: 'currency', currency: c, maximumFractionDigits: 2 }).format(n);
const slug = (a, b) => `${a.toLowerCase()}-to-${b.toLowerCase()}`;

async function getRates() {
  try {
    const j = await (await fetch('https://open.er-api.com/v6/latest/USD')).json();
    if (j.result === 'success') return j.rates;
  } catch {}
  console.warn('! Could not fetch rates; static snapshot text will be omitted.');
  return null;
}

function page({ title, desc, h1, canonical, preset, seo, root }) {
  return tpl
    .replace(/{{TITLE}}/g, title).replace(/{{DESC}}/g, desc).replace(/{{H1}}/g, h1)
    .replace(/{{CANONICAL}}/g, canonical).replace(/{{ROOT}}/g, root)
    .replace(/{{CONFIG}}/g, JSON.stringify(CONFIG))
    .replace(/{{PRESET}}/g, JSON.stringify(preset || null))
    .replace(/{{SEO}}/g, seo);
}

function write(rel, content) {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
}

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  const rates = await getRates();
  const urls = ['/'];

  // pair pages
  for (const a of CODES) for (const b of CODES) {
    if (a === b) continue;
    const url = `/convert/${slug(a, b)}/`;
    urls.push(url);
    let seo = `<div class="card"><h2 id="seo-h">Convert ${name(a)} to ${name(b)}</h2>`;
    if (rates) {
      const r = rates[b] / rates[a];
      seo += `<p id="seo-p">The ${a} to ${b} exchange rate is about <b>${r.toFixed(4)}</b> (1 ${a} = ${r.toFixed(4)} ${b}). `
           + `Use the converter above for the live rate.</p><table id="seo-table">`
           + AMOUNTS.map(x => `<tr><td>${fmt(x, a)}</td><td>${fmt(x * r, b)}</td></tr>`).join('') + `</table>`;
    } else seo += `<p id="seo-p">Use the converter above to convert ${a} to ${b} at the latest exchange rate.</p>`;
    const others = CODES.filter(c => c !== a && c !== b).slice(0, 6)
      .map(c => `<a href="../${slug(a, c)}/">${a} to ${c}</a>`).join('');
    seo += `<p class="sub links">More: ${others}</p></div>`;
    write(`convert/${slug(a, b)}/index.html`, page({
      title: `${a} to ${b} – Convert ${name(a)} to ${name(b)} | Live Rate`,
      desc: `Convert ${a} to ${b} with the live exchange rate. Free ${name(a)} to ${name(b)} converter with a quick amount table.`,
      h1: `${a} to ${b} Converter`, canonical: SITE + url, preset: { from: a, to: b }, seo, root: '../../',
    }));
  }

  // home with links to popular pairs
  const links = CODES.slice(0, 8).flatMap(a => CODES.slice(0, 8).filter(b => b !== a).map(b => `<a href="convert/${slug(a, b)}/">${a} to ${b}</a>`)).join('');
  write('index.html', page({
    title: 'Currency Converter – Live Exchange Rates for 160+ Currencies',
    desc: 'Free currency converter with live exchange rates for 160+ currencies. Fast, simple, works offline.',
    h1: 'Currency Converter', canonical: SITE + '/', preset: null, root: '',
    seo: `<div class="card"><h2>Popular conversions</h2><p class="sub links">${links}</p></div>`,
  }));

  // privacy policy (edit contact + ad provider details before applying to AdSense)
  write('privacy.html', `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Privacy Policy</title>
<body style="font-family:system-ui;max-width:640px;margin:24px auto;padding:0 16px;line-height:1.6">
<h1>Privacy Policy</h1>
<p>This app converts currencies using public exchange rate data. It does not require an account and stores only your last selected currencies and cached rates in your browser.</p>
<p>Third-party advertising partners (such as Google AdSense) may use cookies to show ads. You can opt out of personalized advertising in your Google ad settings. Some links on this site are affiliate links: we may earn a commission at no extra cost to you.</p>
<p>Rates are for information only and are not financial advice. Contact: <i>your-email@example.com</i></p></body>`);

  write('manifest.webmanifest', JSON.stringify({
    name: 'Currency Converter', short_name: 'Converter', start_url: './', display: 'standalone',
    background_color: '#f5f7fb', theme_color: '#2563eb',
    icons: [{ src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' }, { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }));
  write('icon.svg', fs.readFileSync(path.join(__dirname, 'assets/icon.svg'), 'utf8'));
  write('icon-512.png', fs.readFileSync(path.join(__dirname, 'store/icon-512.png')));
  write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    + urls.map(u => `<url><loc>${SITE}${u}</loc></url>`).join('\n') + `\n</urlset>\n`);

  console.log(`Built ${urls.length} pages into dist/`);
})();
