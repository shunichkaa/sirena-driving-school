import fs from "node:fs";
import path from "node:path";

const workspaceRoot = process.cwd();
const publicDir = path.join(workspaceRoot, "public");
const siteDataPath = path.join(workspaceRoot, "src/shared/config/site-data.ts");
const siteMediaPath = path.join(workspaceRoot, "src/shared/config/site-media.ts");

const extractQuoted = (text, pattern) => {
  const match = text.match(pattern);
  if (!match) return [];
  return [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]);
};

const siteDataText = fs.readFileSync(siteDataPath, "utf8");
const siteMediaText = fs.readFileSync(siteMediaPath, "utf8");

const documentFileNames = [
  ...extractQuoted(siteDataText, /const documentFiles = {([\s\S]*?)} as const;/),
  ...extractQuoted(siteDataText, /documents:\s*\[([\s\S]*?)\],\n\s*footerDocLinks:/),
];

const mediaPaths = [...siteMediaText.matchAll(/src:\s*"([^"]+)"/g)].map((item) => item[1]);

const staticPaths = [
  ...documentFileNames.map((name) => `/docs/${name}`),
  ...mediaPaths,
  "/docs/QR.png",
  "/logo-sirena.png",
  "/favicon-48x48.png",
  "/favicon.svg",
];

const uniquePaths = [...new Set(staticPaths)];
const missing = uniquePaths.filter((assetPath) => {
  const relativePath = assetPath.replace(/^\//, "");
  return !fs.existsSync(path.join(publicDir, relativePath));
});

if (missing.length > 0) {
  console.error("Missing required project assets:");
  missing.forEach((assetPath) => console.error(`- ${assetPath}`));
  process.exit(1);
}

console.log(`Assets check passed: ${uniquePaths.length} files`);
