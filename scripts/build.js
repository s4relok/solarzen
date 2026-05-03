const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const assetsDir = path.join(distDir, "assets");

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

function readText(filePath) {
  return fs.readFileSync(path.join(rootDir, filePath), "utf8");
}

function writeText(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function rewriteAssetPaths(content) {
  return content
    .replace(/(["'(])images\/sz\//g, "$1./assets/images/sz/")
    .replace(/(["'(])sounds\//g, "$1./assets/sounds/");
}

function rewriteScriptPaths(content) {
  return content.replace(/(["'])images\/sz\//g, "$1./assets/images/sz/");
}

function rewriteIndex(content) {
  return rewriteAssetPaths(content)
    .replace(/href="sz\.css"/g, 'href="./sz.css"')
    .replace(/src="js\//g, 'src="./assets/js/');
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(assetsDir, { recursive: true });

copyDir(path.join(rootDir, "images"), path.join(assetsDir, "images"));
copyDir(path.join(rootDir, "sounds"), path.join(assetsDir, "sounds"));

fs.mkdirSync(path.join(assetsDir, "js"), { recursive: true });
for (const fileName of fs.readdirSync(path.join(rootDir, "js"))) {
  const sourcePath = path.join(rootDir, "js", fileName);

  if (fileName === "jquery.cookie.js") {
    continue;
  }

  if (fs.statSync(sourcePath).isFile()) {
    writeText(
      path.join(assetsDir, "js", fileName),
      rewriteScriptPaths(fs.readFileSync(sourcePath, "utf8"))
    );
  }
}

writeText(path.join(distDir, "index.html"), rewriteIndex(readText("index.html")));
writeText(path.join(distDir, "sz.css"), rewriteAssetPaths(readText("sz.css")));
writeText(path.join(distDir, "style.css"), rewriteAssetPaths(readText("style.css")));

console.log("Built static game into dist/");
