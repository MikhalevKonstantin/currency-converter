# Currency Converter: Summary

One codebase, two products: a **website** (SEO traffic, ads + affiliate) and **iOS/Android apps** (Capacitor wrapper of the same site, AdMob + paid "remove ads").

## Features (both)
- Live rates for 160+ currencies (open.er-api.com, no key), cached 1 hour, works offline with saved rates.
- Swap button, dark mode, shareable pair links (`#USD-EUR`).
- **My currencies**: several favourites with editable amounts; type in any row and all others update. Star = primary currency.
- Remembers favourites, primary, last pair and last amount (browser/app storage).
- Share button.

## Website
- `node build.js` builds `dist/`: home page + 380 SEO pages (`/convert/usd-to-eur/`, 20 currencies), `sitemap.xml`, `robots.txt`, `privacy.html`.
- Income: affiliate card ("Sending money abroad?") + display ads slot (AdSense after approval).
- Free for visitors, no paywall.

## Mobile apps
- Capacitor wraps `dist/`. Android project created (`android/`); iOS needs `npx cap add ios` on a Mac with Xcode.
- **Ads**: AdMob adaptive banner at the bottom, with EU consent form (UMP) and iOS tracking prompt. Uses Google **test IDs** until you set real ones in `config.json` and turn `testMode` off.
- **Remove ads**: one-time purchase through RevenueCat (entitlement `premium`), with Restore purchases. Hides banner, web ad slot and affiliate card.
- **Share bonus**: sharing via the system share sheet gives 24 hours ad-free (once per day, saved up to 7 days).
  - This is honor-based: it rewards sharing, it does not verify that a friend installed the app. Real referral rewards need a backend or a service like Branch.

## Files
| File | Purpose |
|---|---|
| `src/template.html` | The app (UI, favourites, ads, purchase, share) |
| `build.js` | Generates the website into `dist/` |
| `config.json` | AdMob IDs, RevenueCat keys, share text/bonus (public IDs only) |
| `scripts/native-setup.js` | Writes AdMob app IDs into AndroidManifest / Info.plist |
| `capacitor.config.json`, `package.json` | Mobile setup and scripts |
| `PLAN.md` | Monetization strategy and roadmap |

## Before going live
1. `config.json`: real AdMob app and banner IDs, `testMode: false`, RevenueCat public keys, `share.url`.
2. RevenueCat: create a non-consumable (lifetime) product in App Store Connect and Google Play, attach it to the `premium` entitlement and the current offering.
3. Change `appId` in `capacitor.config.json`.
4. Website: `SITE_URL=https://yourdomain.com node build.js`, deploy, add affiliate link and contact email in privacy policy.
5. Build and test on real devices with test ads and sandbox purchases.

## Status
- **Web**: builds (381 pages), tested in a browser: pair pages, favourites, cookie consent banner (Accept/Decline, remembered), favicon and web manifest.
- **Android**: debug APK built with JDK 21 and tested on an emulator (Android 36): app runs, AdMob test banner requests are sent (emulator returned no fill), share sheet opens, Remove ads card shows (disabled until RevenueCat keys are added).
- **iOS**: project created (Swift Package Manager), AdMob ID and tracking text added to Info.plist, builds for the iOS Simulator SDK. Not run: no iOS simulator runtime is installed on this Mac.
- **Not tested anywhere**: real purchases (needs store products and RevenueCat keys), real ads, share bonus after a completed share.

## How to build
```bash
JAVA_HOME=$(/usr/libexec/java_home -v 21) npm run app:sync   # build site, sync to android + ios
cd android && ./gradlew assembleDebug                         # APK in android/app/build/outputs/apk/debug/
npm run app:ios                                               # opens Xcode (Run on a simulator or device)
```
