// Builds the static site into dist/. No dependencies: node scripts/build.mjs
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
// SITE_OUT lets a release build go to its own folder while `npm run dev` owns dist/.
const DIST = process.env.SITE_OUT ? join(ROOT, process.env.SITE_OUT) : join(ROOT, "dist");

export async function build() {
  const bust = `?t=${Date.now()}`; // fresh modules on every rebuild in dev
  const imp = (p) => import(pathToFileURL(join(ROOT, p)).href + bust);
  const { page, mdPath } = await imp("src/layout.mjs");
  const { site } = await imp("src/site.mjs");

  const pages = [
    (await imp("src/pages/home.mjs")).default,
    (await imp("src/pages/product.mjs")).default,
    (await imp("src/pages/pricing.mjs")).default,
    ...(await imp("src/pages/compare.mjs")).default,
    ...(await imp("src/pages/integrations.mjs")).default,
    (await imp("src/pages/glossary.mjs")).default,
    ...(await imp("src/pages/simple.mjs")).default,
    ...(await imp("src/pages/blog.mjs")).default,
  ];
  const posts = JSON.parse(readFileSync(join(ROOT, "src/blog/posts.json"), "utf8"));

  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });
  if (existsSync(join(ROOT, "public"))) cpSync(join(ROOT, "public"), DIST, { recursive: true });
  cpSync(join(ROOT, "src/assets"), join(DIST, "assets"), { recursive: true });
  // One stylesheet: base + components.
  const css = readFileSync(join(ROOT, "src/assets/styles.css"), "utf8") + readFileSync(join(ROOT, "src/assets/components.css"), "utf8");
  writeFileSync(join(DIST, "assets/styles.css"), css);
  rmSync(join(DIST, "assets/components.css"));

  const v = createHash("sha1")
    .update(css)
    .update(readFileSync(join(ROOT, "src/assets/site.js")))
    .digest("hex")
    .slice(0, 8);

  const longDash = /[–—]/;
  for (const p of pages) {
    const html = page({ ...p, v });
    const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
    if (longDash.test(text)) throw new Error(`Long dash on ${p.path}. Use "-", a comma or a full stop.`);
    const out = p.path === "/" ? join(DIST, "index.html")
      : p.path === "/404" ? join(DIST, "404.html")
      : join(DIST, p.path.slice(1), "index.html");
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
  }

  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const post = posts.find((x) => p.path === `/blog/${x.slug}`);
      return `  <url><loc>${site.url}${p.path === "/" ? "/" : p.path}</loc><lastmod>${post ? (post.modified || post.date) : today}</lastmod></url>`;
    });
  writeFileSync(join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
  // AI crawlers are named one by one: search/answer bots get cited pages,
  // training bots are allowed too (public marketing content).
  const aiSearch = ["OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-CloudVertexBot", "DuckAssistBot", "MistralAI-User"];
  const aiTrain = ["GPTBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Applebot-Extended", "cohere-ai", "meta-externalagent", "Amazonbot", "CCBot", "Bytespider"];
  writeFileSync(join(DIST, "robots.txt"), [
    "User-agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Content-Usage: train-ai=y",
    "Allow: /",
    "Disallow: /404.html",
    "Disallow: /set-password",
    "Disallow: /payment-success",
    "",
    "# AI search and answer crawlers",
    ...aiSearch.flatMap((b) => [`User-agent: ${b}`, "Allow: /", ""]),
    "# AI training crawlers",
    ...aiTrain.flatMap((b) => [`User-agent: ${b}`, "Allow: /", ""]),
    `Sitemap: ${site.url}/sitemap.xml`,
    "",
  ].join("\n"));

  const { faqs } = await imp("src/pages/faq-data.mjs");
  const seo = JSON.parse(readFileSync(join(ROOT, "src/blog/seo.json"), "utf8"));
  const abs = (p) => `${site.url}${p.path === "/" ? "/" : p.path}`;
  const mainPages = pages.filter((p) => !p.noindex && !p.path.startsWith("/blog/"));
  const tools = "Salesforce, HubSpot, Google Workspace (Gmail and Calendar), Microsoft 365 (Outlook mail and calendar), Zendesk, Amplitude and Slack, plus CSV import";
  const about = [
    `Renewal360 is renewal software for SaaS customer success teams, made by ${site.company} (${site.companyUrl}, Noida, India). It connects to the tools a company already uses (${tools}), checks every upcoming renewal for what is missing, ranks the accounts that need attention, and drafts the next step for a person to approve.`,
    `Each renewal is checked against the questions that decide it: is the customer getting value, is there an engaged champion, is more than one person known, is the signer known, is anything blocking it, has pricing been discussed, is the renewal process clear, has there been a recent business review, and do meetings happen. Each answer is backed by evidence from the connected tools. Risk scores come with plain-English reasons.`,
    `By default nothing reaches a customer until someone on the team approves it. Teams choose how much runs on its own: do it yourself, one click approval, or routine steps that run on their own once trusted. Key accounts stay in human hands, and outgoing email can be paused for one account or everyone. The in-app assistant, Nuva, answers questions about any account and drafts check-ins for approval.`,
  ];
  writeFileSync(join(DIST, "llms.txt"), [
    `# Renewal360`,
    ``,
    `> ${site.tagline} Renewal360 finds which SaaS renewals are at risk and what each one is missing, then drafts the next step for the team to approve.`,
    ``,
    `## About`,
    ...about.flatMap((a) => [a, ""]),
    `## Pages`,
    ...mainPages.map((p) => `- [${p.title}](${abs(p)}): ${p.description}`),
    ``,
    `## Product`,
    `- Renewal readiness: every renewal checked for what is missing, with evidence`,
    `- Risk scores with reasons, and daily risk movements`,
    `- AI-drafted outreach in an approval queue; automation only when earned`,
    `- Renewal Prep and playbooks: company and team steps, auto-renewing contracts handled separately`,
    `- Nuva: in-app assistant for account questions and draft check-ins`,
    `- Manager view: revenue at risk, renewals by risk, gaps across the book`,
    `- Integrations: ${tools}`,
    `- Pricing: Free (25 accounts), SMB $199/month (200 accounts), Growth $599/month (1,000 accounts), Scale $999/month (unlimited); 20% off yearly; every new sign-up gets 7 days of Scale. ${site.url}/pricing`,
    ``,
    `## Blog`,
    ...posts.map((x) => `- [${x.title}](${site.url}/blog/${x.slug}): ${seo[x.slug]?.description || x.summary}`),
    ``,
    `## Contact`,
    `Start a free trial: ${site.url}/contact. Email: ${site.email}. Sign in: ${site.appUrl}/.`,
    ``,
    `## For AI Systems`,
    `Preferred name: "Renewal360" (renewal360.in), renewal software for SaaS customer success teams by ${site.company}. The in-app assistant is called Nuva.`,
    `This content may be used to answer questions about Renewal360, SaaS renewals, renewal automation and customer success. Full text: ${site.url}/llms-full.txt`,
    ``,
  ].join("\n"));

  // llms-full.txt: every page's text, for deep reads.
  const text = (html) => html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, "")
    .replace(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (m, href, inner) => {
      const label = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (!label || href.startsWith("#")) return label;
      const url = href.startsWith("/") ? site.url + href : href;
      // Cards wrap headings and paragraphs: keep their structure, put the link after.
      return /<(h[1-6]|p|span)[\s>]/.test(inner) ? `${inner}<p>Link: ${url}</p>` : `[${label}](${url})`;
    })
    .replace(/<\/(p|h[1-6]|li|dt|dd|summary|div|section|tr)>/g, "\n")
    .replace(/<(h[1-6])[^>]*>/g, (m, h) => "\n" + "#".repeat(Math.min(+h[1] + 1, 6)) + " ")
    .replace(/<li[^>]*>/g, "- ")
    .replace(/<summary[^>]*>/g, "**").replace(/<\/summary>/g, "**\n")
    .replace(/<span class="step-n">\d+<\/span>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&rarr;/g, "->").replace(/&larr;/g, "<-").replace(/&copy;/g, "(c)").replace(/&nbsp;/g, " ").replace(/&ldquo;|&rdquo;/g, "\"").replace(/&rsquo;|&lsquo;/g, "'")
    .split("\n").map((l) => l.trim()).filter((l) => l && l !== "-").join("\n");
  const full = [
    `# Renewal360 - Full Context`,
    ``,
    `> ${site.tagline}`,
    ``,
    `## Overview`,
    ...about.flatMap((a) => [a, ""]),
    `## Frequently asked questions`,
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    `## Pages (full text)`,
    ...pages.filter((p) => !p.noindex && p.path !== "/terms").flatMap((p) => [
      ``, `### ${p.title} - ${abs(p)}`, ``, text(p.body).replace(/^#+ /gm, (m) => m.length < 4 ? "#### " : m),
    ]),
    ``,
    `## Legal`,
    `- Terms of Service and Privacy Policy: ${site.url}/terms`,
    ``,
    `## Sitemap`,
    `${site.url}/sitemap.xml`,
    ``,
  ].join("\n");
  if (/[–—]/.test(full)) throw new Error("Long dash in llms-full.txt");
  writeFileSync(join(DIST, "llms-full.txt"), full);

  // Markdown twin of every indexable page (agents read these; see mdPath in layout.mjs).
  for (const p of pages.filter((x) => !x.noindex)) {
    const post = posts.find((x) => p.path === `/blog/${x.slug}`);
    const md = [
      `# ${p.title}`,
      ``,
      `> Source: ${abs(p)}`,
      `> Updated: ${post ? (post.modified || post.date) : today}`,
      `> Summary: ${p.description}`,
      ``,
      text(p.body.replace(/<h1[\s\S]*?<\/h1>/, "")).replace(/^(#+) /gm, (m, h) => "#".repeat(Math.max(2, h.length - 1)) + " ").replace(/\n(?!- )/g, "\n\n"),
      ``,
      `---`,
      `Renewal360 (${site.url}) by ${site.company}. Start a free trial: ${site.url}/contact`,
      ``,
    ].join("\n");
    if (/[–—]/.test(md)) throw new Error(`Long dash in ${mdPath(p.path)}`);
    writeFileSync(join(DIST, mdPath(p.path).slice(1)), md);
  }

  // IndexNow key (Bing, Yandex and others): the file must be served at the site root.
  if (site.indexNowKey) writeFileSync(join(DIST, `${site.indexNowKey}.txt`), site.indexNowKey);

  // Search snippet checks: warn, do not fail.
  for (const p of pages.filter((x) => !x.noindex)) {
    const t = p.seoTitle || (p.path === "/" ? p.title : `${p.title} | Renewal360`.length <= 60 ? `${p.title} | Renewal360` : p.title);
    if (t.length < 30 || t.length > 60) console.warn(`title ${t.length} chars: ${p.path}`);
    if (p.description.length < 140 || p.description.length > 178) console.warn(`description ${p.description.length} chars: ${p.path}`);
  }

  return pages.length;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const n = await build();
  console.log(`Built ${n} pages into ${process.env.SITE_OUT || "dist"}/`);
}
