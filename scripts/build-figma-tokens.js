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
const outputPath = path.join(
  repoRoot,
  'packages/tokens/src/infrastructure/figma/tokens.json',
);
const metadataKeys = ['$metadata', '$themes'];
const figmaPathExtensionKey = 'systemhaus.figma.path';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

function walkJsonFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  let entries;

  try {
    entries = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === 'object' && error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }

  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkJsonFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(entryPath);
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}

function getFigmaPathFromFile(filePath, value) {
  const extensions = value?.$extensions;
  const figmaPath =
    extensions &&
    typeof extensions === 'object' &&
    !Array.isArray(extensions) &&
    typeof extensions[figmaPathExtensionKey] === 'string'
      ? extensions[figmaPathExtensionKey]
      : null;

  if (!figmaPath) {
    throw new Error(
      `Missing "${figmaPathExtensionKey}" metadata in "${path.relative(repoRoot, filePath)}"`,
    );
  }

  return figmaPath;
}

function getExpectedFigmaPathFromFilePath(filePath) {
  const relativePath = path.relative(domainRoot, filePath);
  const parsedPath = path.parse(relativePath);
  return [
    ...parsedPath.dir.split(path.sep).filter(Boolean),
    parsedPath.name,
  ].join('/');
}

function assertFigmaPathMatchesFilePath(filePath, figmaPath) {
  const expectedPath = getExpectedFigmaPathFromFilePath(filePath);

  if (figmaPath !== expectedPath) {
    throw new Error(
      [
        `Figma path drift detected in "${path.relative(repoRoot, filePath)}".`,
        `Expected "${expectedPath}" from the file location,`,
        `but found "${figmaPath}" in "${figmaPathExtensionKey}".`,
      ].join(' '),
    );
  }
}

function buildTokenObject() {
  const base = fs.existsSync(sourceTokensPath)
    ? readJson(sourceTokensPath)
    : {};
  const output = {};

  for (const metadataKey of metadataKeys) {
    if (metadataKey in base) {
      output[metadataKey] = base[metadataKey];
    }
  }

  const jsonFiles = walkJsonFiles(domainRoot);

  for (const filePath of jsonFiles) {
    const fileValue = readJson(filePath);
    const tokenKey = getFigmaPathFromFile(filePath, fileValue);
    assertFigmaPathMatchesFilePath(filePath, tokenKey);
    output[tokenKey] = fileValue;
  }

  return output;
}

function main() {
  if (!fs.existsSync(domainRoot)) {
    throw new Error(`Domain root does not exist: "${domainRoot}"`);
  }

  if (!fs.existsSync(sourceTokensPath)) {
    throw new Error(`Source tokens file does not exist: "${sourceTokensPath}"`);
  }

  const tokenObject = buildTokenObject();
  writeJson(outputPath, tokenObject);

  console.log(`Built Figma tokens from "${domainRoot}"`);
  console.log(`Wrote artifact to "${outputPath}"`);
}

main();
