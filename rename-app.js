const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const newName = process.argv[2];
const newBundleId = process.argv[3];

if (!newName || !newBundleId) {
  console.log('Usage: npm run rename "New App Name" "com.newapp.bundleid"');
  console.log('Example: npm run rename "My App" "com.mycompany.myapp"');
  process.exit(1);
}

const configPath = path.join(__dirname, 'app.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

config.expo.name = newName;
config.expo.slug = newName.toLowerCase().replace(/\s+/g, '-');
config.expo.scheme = newName.toLowerCase().replace(/\s+/g, '');
config.expo.ios.bundleIdentifier = newBundleId;
config.expo.android.package = newBundleId;

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
console.log(`✓ Updated app.json: ${newName} (${newBundleId})`);

const pkgPath = path.join(__dirname, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.name = newName.toLowerCase().replace(/\s+/g, '-');
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log(`✓ Updated package.json: ${pkg.name}`);

console.log('\nRegenerating native folders...');
execSync('npx expo prebuild --clean', { stdio: 'inherit' });

console.log('\n✅ Rename complete! Run npm install to finish setup.');
