// Local preview: builds, serves dist/ and rebuilds when src/ or public/ change.
//   node scripts/dev.mjs [port]
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync, watch } from "node:fs";
import { extname, join, normalize } from "node:path";
import { build } from "./build.mjs";

const ROOT = join(import.meta.dirname, "..");
const DIST = join(ROOT, "dist");
const PORT = Number(process.argv[2] || 4321);
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8", ".md": "text/markdown; charset=utf-8", ".woff2": "font/woff2", ".json": "application/json", ".webmanifest": "application/manifest+json",
};

let building = build().then((n) => console.log(`Built ${n} pages`));
let timer;
for (const dir of ["src", "public"]) {
  if (!existsSync(join(ROOT, dir))) continue;
  watch(join(ROOT, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      building = build().then((n) => console.log(`Rebuilt ${n} pages`)).catch((e) => console.error(e.message));
    }, 120);
  });
}

createServer(async (req, res) => {
  await building.catch(() => {});
  let path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^[\\/]+/, "");
  let file = join(DIST, path);
  if (!file.startsWith(DIST)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  const found = existsSync(file);
  if (!found) file = join(DIST, "404.html");
  const type = TYPES[extname(file)] || "application/octet-stream";
  const data = readFileSync(file);
  // Byte ranges, like nginx: browsers need them to seek in video.
  const range = found && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || "");
  if (range) {
    const start = range[1] ? Number(range[1]) : data.length - Number(range[2]);
    const end = range[1] && range[2] ? Math.min(Number(range[2]), data.length - 1) : data.length - 1;
    res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${end}/${data.length}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1, "Cache-Control": "no-store" });
    return res.end(data.subarray(start, end + 1));
  }
  res.writeHead(found ? 200 : 404, { "Content-Type": type, "Accept-Ranges": "bytes", "Cache-Control": "no-store" });
  res.end(data);
}).listen(PORT, () => console.log(`Renewal360 site on http://localhost:${PORT}`));
