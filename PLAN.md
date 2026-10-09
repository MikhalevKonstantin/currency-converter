# Currency Converter: Plan

## What exists
- `src/template.html`: the app (single file). `build.js` turns it into `dist/`: home page, 380 SEO pages (`/convert/usd-to-eur/` etc. for 20 currencies), sitemap.xml, robots.txt, privacy.html.
- Mobile: Capacitor wraps `dist/` into iOS and Android apps (`capacitor.config.json`, `package.json`).
- Original description: single-file web app. Live rates for 160+ currencies from the free open.er-api.com endpoint (no key, attribution in footer).
- Features: swap button, popular conversions table, dark mode, 1-hour rate cache, offline fallback, shareable pair links (`#USD-EUR`).
- Placeholders for an affiliate card and an ad slot.

## Monetization

### Phase 1: free for everyone (launch)
- **Affiliate**: "Sending money abroad?" card linking to a transfer service (Wise, Remitly, Revolut). Highest value per click because the visitor is about to move money.
- **Display ads**: AdSense or similar, after approval (needs live site, privacy policy, some content).

### Phase 2: optional paid tier, once there is traffic
Subscription or one-time purchase? Recommendation:

| Product | Model | Why |
|---|---|---|
| Website | **Neither.** Free + ads + affiliate | Search visitors will not pay for something Google already does free. A paywall kills traffic. |
| Mobile app (Pro) | **One-time "remove ads" (~$2-5)**, optionally a cheap lifetime option | Converters are a utility with low willingness to pay. Users resent subscriptions for simple tools. |
| Pro with ongoing cost (rate alerts, push notifications, history, paid rates API) | **Subscription (~$1-2/mo or ~$10/yr)** | A subscription is justified only when you have recurring costs and recurring value. |

Rule of thumb: sell a one-time purchase for features that cost nothing to run (ad-free, themes, widgets). Use a subscription for anything that costs you money each month (alerts, premium data).

## Roadmap
1. [x] Generate static SEO pages per pair (USD→EUR, GBP→USD, ...), each with unique title, description and short text. Add sitemap.xml.
2. [ ] Deploy (Cloudflare Pages or Netlify) and buy a domain.
3. [~] Privacy policy (draft generated; add your contact email) and cookie consent (required for AdSense and the EU).
4. [ ] Replace affiliate link with a real referral link; apply to AdSense.
5. [ ] Track traffic (Plausible or Google Analytics) and see which pairs convert.
6. [ ] Mobile app (Capacitor) with an ad-free one-time purchase; add rate alerts as a subscription if users ask.

## Expectations
- Crowded niche. Meaningful income depends on search traffic, which takes months.
- Rough guide: 10k visits/month is tens of dollars from ads; affiliate signups can add more.
- Rates are informational only. Keep the disclaimer.

## Commands
```bash
SITE_URL=https://yourdomain.com node build.js   # build the website into dist/
npm install                                      # once, for mobile
npx cap add android && npx cap add ios           # once (iOS needs a Mac with Xcode)
npm run app:android                              # sync + open Android Studio
npm run app:ios                                  # sync + open Xcode
```

## Mobile store checklist
- Change `appId` in `capacitor.config.json` to your own (e.g. `com.yourname.converter`).
- Accounts: Google Play ($25 one-time), Apple Developer ($99/year).
- Ads in the app use AdMob (not AdSense); the "remove ads" purchase uses in-app purchase (e.g. RevenueCat). Add these before release.
- Apple rejects thin web wrappers: add offline support, an app icon, widgets or alerts to be safe.
- Host the privacy policy at a public URL; both stores require it.
