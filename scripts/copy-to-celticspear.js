const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const projectsDir = path.resolve(rootDir, "..");
const targetDir = path.join(projectsDir, "celticspear.com", "hobby", "solarzen");
const dryRun = process.argv.includes("--dry-run");

function copyDir(source, target) {
  fs.mkdirSync(target, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function assertInside(parent, child) {
  const relative = path.relative(parent, child);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${child} is outside ${parent}`);
  }
}

if (!fs.existsSync(path.join(distDir, "index.html"))) {
  throw new Error("dist/index.html not found. Run npm run build first.");
}

assertInside(path.join(projectsDir, "celticspear.com", "hobby"), targetDir);

if (dryRun) {
  console.log(`Would copy ${distDir} to ${targetDir}`);
  process.exit(0);
}

fs.rmSync(targetDir, { recursive: true, force: true });
copyDir(distDir, targetDir);

console.log(`Copied dist/ to ${targetDir}`);
