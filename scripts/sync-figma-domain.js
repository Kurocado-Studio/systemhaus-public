import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const domainRoot = path.join(repoRoot, 'packages/tokens/src/domain');
const sourceTokensPath = path.join(
  repoRoot,
  'packages/tokens/src/lib/figma/tokens.json',
);
const skippedTopLevelKeys = new Set(['$metadata', '$themes']);
const figmaPathExtensionKey = 'systemhaus.figma.path';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

function toPathSegments(key) {
  return key.split('/').filter(Boolean);
}

function ensureEmptyDirectory(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  fs.mkdirSync(dirPath, { recursive: true });
}

function withFigmaPathMetadata(value, figmaPath) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`Expected object value for "${figmaPath}"`);
  }

  const existingExtensions =
    value.$extensions &&
    typeof value.$extensions === 'object' &&
    !Array.isArray(value.$extensions)
      ? value.$extensions
      : {};

  return {
    $extensions: {
      ...existingExtensions,
      [figmaPathExtensionKey]: figmaPath,
    },
    ...value,
  };
}

function writeTopLevelNode(topLevelKey, value) {
  const segments = toPathSegments(topLevelKey);
  const fileName = segments.at(-1);

  if (!fileName) {
    throw new Error(`Invalid top-level key "${topLevelKey}"`);
  }

  const parentDir = path.join(domainRoot, ...segments.slice(0, -1));
  writeJson(
    path.join(parentDir, `${fileName}.json`),
    withFigmaPathMetadata(value, topLevelKey),
  );
}

function main() {
  if (!fs.existsSync(sourceTokensPath)) {
    throw new Error(`Source tokens file does not exist: "${sourceTokensPath}"`);
  }

  const tokenTree = readJson(sourceTokensPath);

  ensureEmptyDirectory(domainRoot);

  for (const [topLevelKey, value] of Object.entries(tokenTree)) {
    if (skippedTopLevelKeys.has(topLevelKey)) {
      continue;
    }

    writeTopLevelNode(topLevelKey, value);
  }

  console.log(
    `Synced domain tree from "${sourceTokensPath}" to "${domainRoot}"`,
  );
}

main();
