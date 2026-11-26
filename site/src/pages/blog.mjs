import { existsSync, readFileSync } from "node:fs";
import { site } from "../site.mjs";
import { ctaBand, esc } from "../layout.mjs";

const posts = JSON.parse(readFileSync(new URL("../blog/posts.json", import.meta.url), "utf8"));
const seo = JSON.parse(readFileSync(new URL("../blog/seo.json", import.meta.url), "utf8"));

const fmt = (d) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const card = (p) => `<a class="post-card reveal" href="/blog/${p.slug}">
  <span class="post-tag">${esc(p.tags[0] || "Article")}</span>
  <h3>${esc(p.title)}</h3>
  <p>${esc(p.summary)}</p>
  <span class="post-meta">${fmt(p.date)} · ${esc(p.readTime)}</span>
</a>`;

const index = {
  path: "/blog",
  title: "Blog",
  seoTitle: "Renewal360 Blog: Renewals, Churn and CS Operations",
  pageType: "CollectionPage",
  description: "Guides for SaaS customer success and RevOps teams: renewal playbooks, renewal automation, spotting churn risk early, CS metrics and honest comparisons of CS platforms.",
  schema: [{
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/blog/${p.slug}`, name: p.title })),
  }],
  body: `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">Blog</p>
    <h1>Guides for renewal and customer success teams</h1>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap post-grid">${posts.map(card).join("")}</div>
</section>`,
};

// Related posts: share a tag first, then newest.
const related = (p) => posts
  .filter((x) => x.slug !== p.slug)
  .map((x) => ({ x, s: x.tags.filter((t) => p.tags.includes(t)).length }))
  .sort((a, b) => b.s - a.s || b.x.date.localeCompare(a.x.date))
  .slice(0, 3)
  .map((r) => r.x);

const plain = (s) => s.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&rarr;/g, "->").replace(/\s+/g, " ").trim();

// A post's <section class="post-faq"> (h3 question, p answer) becomes FAQPage markup.
function faqOf(html) {
  const sec = /<section class="post-faq">([\s\S]*?)<\/section>/.exec(html);
  if (!sec) return null;
  const items = [...sec[1].matchAll(/<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)].map(([, q, a]) => ({
    "@type": "Question", name: plain(q), acceptedAnswer: { "@type": "Answer", text: plain(a) },
  }));
  return items.length ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items } : null;
}

const postPages = posts.map((p) => {
  const html = readFileSync(new URL(`../blog/posts/${p.slug}.html`, import.meta.url), "utf8");
  const cssFile = new URL(`../blog/styles/${p.slug}.css`, import.meta.url);
  const css = existsSync(cssFile) ? readFileSync(cssFile, "utf8") : "";
  const faq = faqOf(html);
  return {
    path: `/blog/${p.slug}`,
    title: p.title,
    seoTitle: seo[p.slug]?.title,
    description: seo[p.slug]?.description || p.summary,
    head: css ? `<style>${css}</style>` : "",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: p.title,
        description: seo[p.slug]?.description || p.summary,
        datePublished: p.date,
        dateModified: p.modified || p.date,
        image: `${site.url}/og-image.png`,
        keywords: p.tags.join(", "),
        author: { "@type": "Organization", name: "Renewal360", url: site.url },
        publisher: { "@id": `${site.url}/#organization` },
        mainEntityOfPage: `${site.url}/blog/${p.slug}`,
      },
      ...(faq ? [faq] : []),
    ],
    body: `<article class="post">
  <header class="post-head wrap narrow">
    <a class="back" href="/blog">&larr; All posts</a>
    <div class="post-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
    <h1>${esc(p.title)}</h1>
    <p class="lede">${esc(p.summary)}</p>
    <p class="post-meta">By the Renewal360 team · ${fmt(p.date)}${p.modified && p.modified !== p.date ? ` · Updated ${fmt(p.modified)}` : ""} · ${esc(p.readTime)}</p>
  </header>
  <div class="wrap narrow prose">${html}</div>
</article>
<section class="section section-tint">
  <div class="wrap">
    <div class="section-head"><h2>Keep reading</h2></div>
    <div class="post-grid">${related(p).map(card).join("")}</div>
  </div>
</section>
${ctaBand()}`,
  };
});

export const blogPosts = posts;
export default [index, ...postPages];
