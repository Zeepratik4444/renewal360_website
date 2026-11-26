// Tell Bing (which feeds ChatGPT search and Copilot), Yandex and other IndexNow
// engines that pages changed. Run after a release, once the key file is live:
//   node scripts/indexnow.mjs            # every URL in the live sitemap
//   node scripts/indexnow.mjs /product   # only these paths
import { site } from "../src/site.mjs";

const host = new URL(site.url).host;
const key = site.indexNowKey;
if (!key) throw new Error("Set indexNowKey in src/site.mjs");

const keyUrl = `${site.url}/${key}.txt`;
const live = await fetch(keyUrl).then((r) => (r.ok ? r.text() : ""));
if (live.trim() !== key) throw new Error(`Key file not live at ${keyUrl}. Release first.`);

let urls = process.argv.slice(2).map((p) => site.url + (p.startsWith("/") ? p : `/${p}`));
if (!urls.length) {
  const xml = await fetch(`${site.url}/sitemap.xml`).then((r) => r.text());
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: keyUrl, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 300) console.log(await res.text());
