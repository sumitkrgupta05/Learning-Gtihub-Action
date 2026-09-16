const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");
const publicDir = path.join(__dirname, "..", "public");

// Ensure clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy all static files from public to dist
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
}

// Generate build metadata
const buildInfo = {
  buildTime: new Date().toISOString(),
  environment: process.env.NODE_ENV || "production",
  version: require("../package.json").version,
  commitSha: process.env.GITHUB_SHA || "local-build",
  branch: process.env.GITHUB_REF_NAME || "main",
};

// Write build-info.json into dist
fs.writeFileSync(
  path.join(distDir, "build-info.json"),
  JSON.stringify(buildInfo, null, 2),
  "utf8"
);

// Copy documentation HTML into dist for easy viewing
const docsHtml = path.join(__dirname, "..", "docs", "github-actions-guide.html");
if (fs.existsSync(docsHtml)) {
  fs.copyFileSync(docsHtml, path.join(distDir, "guide.html"));
}

console.log("✅ Build completed successfully!");
console.log(`📦 Artifacts generated in: ${distDir}`);
console.log(`⏱️ Build timestamp: ${buildInfo.buildTime}`);
