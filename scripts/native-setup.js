// Adds the AdMob app IDs to the native projects (run after `npx cap add android|ios`; safe to re-run).
const fs = require('fs');
const path = require('path');
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8')).admob;

const manifest = path.join(__dirname, '../android/app/src/main/AndroidManifest.xml');
if (fs.existsSync(manifest)) {
  let x = fs.readFileSync(manifest, 'utf8');
  x = x.replace(/\s*<meta-data android:name="com\.google\.android\.gms\.ads\.APPLICATION_ID"[^>]*\/>/, '');
  x = x.replace(/(<application[^>]*>)/, `$1\n        <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${cfg.androidAppId}"/>`);
  fs.writeFileSync(manifest, x);
  console.log('Android: AdMob app ID set');
} else console.log('Android project not found (run: npx cap add android)');

const plist = path.join(__dirname, '../ios/App/App/Info.plist');
if (fs.existsSync(plist)) {
  let x = fs.readFileSync(plist, 'utf8');
  for (const k of ['GADApplicationIdentifier', 'NSUserTrackingUsageDescription'])
    x = x.replace(new RegExp(`\\s*<key>${k}</key>\\s*<string>[^<]*</string>`), '');
  x = x.replace(/<\/dict>\s*<\/plist>/, `\t<key>GADApplicationIdentifier</key>\n\t<string>${cfg.iosAppId}</string>\n\t<key>NSUserTrackingUsageDescription</key>\n\t<string>This lets us show ads that are more relevant to you. You can say no and still use the app.</string>\n</dict>\n</plist>`);
  fs.writeFileSync(plist, x);
  console.log('iOS: AdMob app ID + tracking text set');
} else console.log('iOS project not found (run: npx cap add ios)');
