# Store Listing: Currency Converter

Copy-paste text for Google Play and the Apple App Store. Character limits are noted in brackets.

## 1. Name

"Currency Converter" is generic and probably taken in both stores. Pick a distinctive name first, then use it everywhere (also update `appName` in `capacitor.config.json`).

Ideas (check availability in each store before committing):
- `RateSwap: Currency Converter`
- `CoinSwap Currency Converter`
- `Two-Way Currency Converter`

Limits: Google Play title 30 characters, Apple name 30 characters.

## 2. Short text

**Google Play short description [80]**
> Convert 160+ currencies fast. Type in either box. Works offline.

**Apple subtitle [30]**
> 160+ currencies, works offline

**Apple promotional text [170]**
> Type an amount in either box and see the other update instantly. Keep your favourite currencies in one list and convert them all at once.

## 3. Full description [4000]

```
Convert money between 160+ currencies in seconds.

TYPE IN EITHER BOX
Enter the amount you have, or the amount you want to get. Both boxes are editable, so you can convert forwards and backwards without swapping anything.

ALL YOUR CURRENCIES AT ONCE
Build a list of your favourite currencies. Type an amount in any row and every other row updates immediately. Pick a primary currency, and the app opens on it every time.

BUILT FOR EVERYDAY USE
- 160+ world currencies with flags
- Exchange rates updated daily
- Works offline with the last saved rates
- Quick amounts: 10, 50, 100, 500, 1000
- One-tap swap
- Remembers your last conversion and your favourite list
- Light and dark mode

NO ACCOUNT, NO CLUTTER
No sign-up. Your favourites stay on your device.

AD-FREE OPTION
The app is free with ads. Remove them any time with a single one-time purchase. No subscription. You can also earn 24 ad-free hours by sharing the app with a friend.

Rates are for information only and are not financial advice. Rates can differ from the rate your bank or card provider applies.
```

## 4. Keywords

**Apple keywords [100 characters, comma-separated, no spaces after commas]**
```
currency,converter,exchange,rate,forex,money,travel,usd,eur,gbp,calculator,fx,offline
```

**Google Play tags:** Finance, Tools, Travel (choose in the console).

## 5. Category and rating

| | Google Play | Apple |
|---|---|---|
| Category | Finance (or Tools) | Finance (or Utilities) |
| Content rating | Everyone | 4+ |
| Contains ads | Yes | n/a (declare ads in privacy answers) |
| In-app purchases | Yes (one product) | Yes (one product) |

## 6. In-app purchase

| Field | Value |
|---|---|
| Product ID | `remove_ads` |
| Type | Non-consumable / one-time (not a subscription) |
| Suggested price | $2.99 |
| Display name | Remove ads |
| Description | Remove all ads from the app with a one-time purchase. |
| RevenueCat | Attach the product to the `premium` entitlement and make it the current offering (lifetime package). |

## 7. What's new (first release)

> First release. Convert 160+ currencies, edit either amount, and keep a list of your favourites.

## 8. Privacy answers

The app collects no account data. Third-party SDKs do collect some data:

| Source | Data | Purpose |
|---|---|---|
| Google AdMob | Advertising ID, approximate location (from IP), device and ad interaction data | Advertising |
| RevenueCat | Anonymous app user ID, purchase history | Purchases |

**Google Play Data safety:** declare Advertising ID (shared, ads), Purchase history (collected, app functionality), and that data is encrypted in transit. Users cannot request deletion of data (no accounts).

**Apple privacy labels:** Identifiers (Device ID), not linked to the user's identity, used for third-party advertising. Purchases, used for app functionality. Because ads use the advertising ID, the app shows the App Tracking Transparency prompt (already added).

**Privacy policy URL:** https://mikhalevkonstantin.github.io/currency-converter/privacy.html. Before submitting, replace the placeholder contact email in `build.js` (the `privacy.html` text), and mention AdMob and RevenueCat explicitly.

## 9. Graphics (ready in `store/`)

| Asset | File | Status |
|---|---|---|
| Play icon 512×512 | `store/icon-512.png` | Ready |
| Play feature graphic 1024×500 | `store/feature-graphic-1024x500.png` | Ready |
| Play phone screenshots (1080×2400) | `store/screenshots/android/1-convert.png`, `2-my-currencies.png`, `3-share.png`, `4-dark-mode.png` | Ready (taken on an Android 36 emulator) |
| App Store icon 1024×1024 | generated into the iOS project | Ready |
| iPhone screenshots (6.9" 1320×2868 and 6.5" 1284×2778) | none | Missing. Needs an iOS simulator or an iPhone. |
| iPad screenshots | none | Only needed if the app supports iPad (it does by default; remove iPad in Xcode to skip). |

Suggested captions for screenshots:
1. Convert in either direction
2. All your currencies in one list
3. Share and remove ads
4. Light and dark mode

## 10. Before you submit

- [ ] Choose the final app name and update `capacitor.config.json` (`appName`, `appId`, e.g. `com.yourname.rateswap`). Re-run `npx cap sync`.
- [ ] `config.json`: real AdMob app IDs and banner IDs, `testMode: false`; RevenueCat public keys.
- [ ] Add `app-ads.txt` to your own domain (AdMob asks for it).
- [ ] Create the `remove_ads` product in Play Console and App Store Connect.
- [ ] Sign the apps: Android upload key and release AAB (`./gradlew bundleRelease`); iOS signing and an archive in Xcode.
- [ ] Contact email in the privacy policy; a real support URL (the GitHub Pages site works).
- [x] The listing and the in-app tagline both say "daily" because the free rates API updates once a day.
- [ ] Test purchase and restore with sandbox accounts.
