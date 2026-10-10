# Target Audience Analysis

**Caveat:** this is reasoning from how currency converters are used, not measured data. Nothing here comes from your analytics (there are none yet). Treat each segment as a hypothesis, and validate with the tests in section 6.

## 1. Who actually uses a currency converter

The job is always the same: "I need to know what this amount is in another currency, right now." What differs is the situation and how much money is at stake.

| # | Segment | Situation | Frequency | Money at stake | Monetization value |
|---|---|---|---|---|---|
| 1 | **Travellers** | Pricing meals, hotels and taxis abroad; checking card or cash exchange | Intense for a week, then dormant | Low per use | Medium: travel cards, eSIM, insurance |
| 2 | **Online shoppers** | Comparing an AliExpress, Temu or foreign-shop price to home price | Occasional | Low to medium | Low: mostly ads |
| 3 | **Expats and migrants sending money home** | Checking the rate before a transfer, and which service gives more | Weekly or monthly, for years | **High** (hundreds per transfer) | **Highest**: remittance affiliates pay per signup |
| 4 | **Freelancers and remote workers** | Invoicing or getting paid in USD/EUR/GBP while living elsewhere | Weekly | Medium to high | High: payout and business-account affiliates |
| 5 | **Small importers and sellers** | Quoting and checking supplier prices | Daily | High | Medium: B2B tools, but they need history and charts |
| 6 | **Students abroad** | Tuition, rent, family transfers | Monthly | Medium | Medium to high: student banking and transfers |
| 7 | **Forex and crypto hobbyists** | Watching a pair, chart-looking | Daily | Varies | Low for this app; they use trading apps |
| 8 | **Casual and curious** | A one-off search ("how much is 50 euro in dollars") | Once | None | Ads only |

**Best fit for this app today:** segments 1, 2 and 8 (quick, simple, free) bring the traffic. Segments 3, 4 and 6 are where the money is, because they move real money repeatedly. The strategy is to attract the first group with SEO and convert the second with transfer offers.

## 2. What they want (ranked by how often it decides whether they keep an app)

1. **Speed.** The answer should be on screen in under 2 seconds, with no sign-up. The app does this.
2. **Trustworthy numbers.** People know that Google's rate and their bank's rate differ. They want to know which rate this is (mid-market, daily-updated) and what the real cost will be. *Gap:* the app shows only the mid-market rate and says nothing about fees.
3. **No annoyances.** The most common complaint about converter apps is ads covering the input, pop-ups, and forced upgrades. Banner ads at the bottom plus a cheap one-time "remove ads" is the accepted compromise. The app does this.
4. **Works offline.** Travellers are often on airplane mode or have no roaming data. The app caches the last rates. It does.
5. **My currencies on one screen.** Frequent users convert between the same 2 to 4 currencies. The "My currencies" list with a primary currency does this well.
6. **Convert either way.** "What do I get for 100?" and "how much do I need for a result of 500?" are both common. Two-way editable boxes handle both.
7. **Current rate plus trend.** Senders and freelancers wait for a better rate. They want to see 7-day, 30-day and 1-year charts. *Gap.*
8. **Alerts.** "Tell me when USD to PHP passes 58." Highly valued by senders. *Gap.* This is the natural subscription feature.
9. **A way to act.** After seeing the rate, senders want to send the money. The affiliate card covers this, but it is generic.
10. **Own language and local format.** A large share of users want the app in their own language and with their own number and currency format. *Gap:* English only for now.

## 3. What they dislike (and what to avoid)

- Interstitial ads, auto-playing video ads, or ads right under the amount field.
- Needing an account or email to convert.
- Stale rates with no timestamp (the app shows "Updated ..." so this is handled).
- Slow loads on weak networks (the site is tiny and static, which helps).
- Fake "best rate" claims. For a money app, trust matters more than a small click-through boost. Keep the "Sponsored link" label and the disclaimer.

## 4. Where the audience is (and what that means for the product)

- **Search traffic ("USD to EUR") is the main web source.** Intent is short and practical: popular pairs dominate, and mobile is likely the majority of visits.
- **High-value corridors.** Remittance-heavy pairs (for example USD to MXN, PHP, INR, NGN, and EUR or GBP to PLN, RON, INR) attract the audience with the most money to move. The site generates pages for only 20 currencies. Several of the most valuable corridors are missing: PHP, PLN, UAH, THB, VND, NGN, KES, EGP, PKR, BDT, IDR, MYR, COP, ARS, RON, CZK, HUF, ILS.
- **Travel season spikes.** Summer and December holidays produce traffic peaks for traveller pairs.
- **Language.** English pages cover only part of the demand. Translating at least the titles and descriptions of top pairs (Spanish, German, French, Portuguese, Polish, Turkish) would open large markets with less competition.

## 5. What this means for the app (prioritised)

| Priority | Change | Serves | Effort |
|---|---|---|---|
| 1 | Add 20 to 30 more currencies to the SEO pages, starting with remittance corridors | Segments 3, 4, 6 | Low (edit one list in `build.js`) |
| 2 | Corridor-specific affiliate copy ("Sending USD to Philippines? Compare ...") instead of one generic card | Segment 3 | Low to medium |
| 3 | "Real cost" helper: user enters the rate or fee their bank charges, the app shows the difference from the mid-market rate | Segments 3, 4 | Medium. This is the trust-building feature. |
| 4 | Rate history chart (7 days, 30 days, 1 year) | Segments 3, 4, 5, 7 | Medium (needs a history source) |
| 5 | Rate alerts (push notification) as the **subscription** feature | Segments 3, 4 | Higher (push, backend or scheduled checks) |
| 6 | Localisation: Spanish, German, French, Portuguese first | All | Medium |
| 7 | Home-screen widget with the user's primary pair | Segments 1, 3, 4 | Medium (native work) |

## 6. How to test these hypotheses cheaply

1. **Add privacy-friendly analytics** (Plausible, or GA with consent) to the website. After 2 to 4 weeks, check: top pairs, mobile share, countries, bounce rate. The top pairs directly show which segment you are attracting.
2. **A/B test the affiliate card** on the 5 highest-traffic pairs: generic wording vs corridor wording. Measure click rate.
3. **Add a one-question prompt in the app** after the 5th conversion ("What do you mostly use this for? Travel / Shopping / Sending money / Work"). This gives you real segment data in the first weeks.
4. **Check store search terms** (Play Console and App Store Connect show them) to see what people type to find the app.
5. **Read competitors' reviews** (1 to 3 stars) for the top 3 converter apps in each store. The complaints are a free feature list.

## 7. One-sentence positioning

*The fastest, cleanest currency converter: type in either box, keep your currencies in one list, no sign-up, and it works offline.*

Add a second line once you build the "real cost" helper: *and see what your bank is really charging you.*
