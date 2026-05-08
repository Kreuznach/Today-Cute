import { readFile, writeFile, access } from 'fs/promises';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const missing = [
  'node_modules/@apps-in-toss/ait-format/dist/index.mjs',
  'node_modules/@jridgewell/gen-mapping/dist/gen-mapping.mjs',
  'node_modules/@jridgewell/remapping/dist/remapping.mjs',
  'node_modules/@jridgewell/source-map/dist/source-map.mjs',
  'node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs',
  'node_modules/magic-string/dist/magic-string.es.mjs',
  'node_modules/pathe/dist/utils.mjs',
  'node_modules/@shopify/semaphore/index.mjs',
  'node_modules/@react-spring/animated/dist/react-spring_animated.modern.mjs',
  'node_modules/@react-spring/core/dist/react-spring_core.modern.mjs',
  'node_modules/@react-spring/rafz/dist/react-spring_rafz.modern.mjs',
  'node_modules/@react-spring/shared/dist/react-spring_shared.modern.mjs',
  'node_modules/@apps-in-toss/plugin-compat/node_modules/y18n/index.mjs',
  'node_modules/@apps-in-toss/web-framework/node_modules/y18n/index.mjs',
  'node_modules/@react-native/codegen/node_modules/y18n/index.mjs',
  'node_modules/@react-native/community-cli-plugin/node_modules/y18n/index.mjs',
  'node_modules/@react-native-community/cli/node_modules/y18n/index.mjs',
  'node_modules/jest-cli/node_modules/y18n/index.mjs',
  'node_modules/metro/node_modules/y18n/index.mjs',
];

async function getExports(cjsPath) {
  try {
    const content = await readFile(cjsPath, 'utf8');
    const m = content.match(/0 &&\s*\(module\.exports\s*=\s*\{([^}]+)\}/);
    if (m) return m[1].split(',').map(s => s.trim()).filter(Boolean);
  } catch {}
  return [];
}

async function fix(relPath) {
  const fullPath = join(__dirname, relPath);
  const base = fullPath.replace(/\.mjs$/, '');

  for (const ext of ['.cjs', '.js']) {
    const cjsPath = base + ext;
    try {
      await access(cjsPath);
      const relImport = './' + basename(base) + ext;
      const exports = await getExports(cjsPath);
      const lines = [
        "// ESM shim - auto-generated",
        "import { createRequire } from 'module';",
        "const _require = createRequire(import.meta.url);",
        "const _mod = _require('" + relImport + "');",
        "export default _mod;",
      ];
      if (exports.length > 0) {
        lines.push('export const { ' + exports.join(', ') + ' } = _mod;');
      }
      await writeFile(fullPath, lines.join('\n') + '\n');
      console.log('Fixed: ' + relPath + ' (from ' + ext + ')');
      return;
    } catch {}
  }
  console.log('Could not fix (no CJS found): ' + relPath);
}

for (const p of missing) {
  await fix(p);
}
console.log('Done.');
