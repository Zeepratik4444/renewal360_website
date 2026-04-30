import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteUrl = "https://renewal360.in";
const sourceDir = path.join(root, "src", "content", "blog");
const outputDir = path.join(root, "public", "blog");

const posts = [
	{
		slug: "how-renewal360-works",
		source: "blog-7-how-renewal360-works.html",
		title:
			"How Renewal360 Works: The Renewal Automation Process Built to Prevent Silent Churn",
		description:
			"See how Renewal360 turns CRM data, renewal milestones, AI-drafted outreach, smart guards, and human approval into an action-first renewal workflow.",
		tags: ["How It Works", "Renewal Automation", "Customer Success"],
		readTime: "8 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "churnzero-alternative-growing-saas-teams",
		source: "blog-4-churnzero-alternative-growing-saas-teams.html",
		title: "ChurnZero Alternative for Growing SaaS Teams",
		description:
			"A practical guide for SaaS teams that need renewal automation, AI follow-up, and faster action without a heavy platform rollout.",
		tags: ["ChurnZero Alternative", "Customer Success", "Renewal Automation"],
		readTime: "8 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "totango-alternative-faster-renewal-automation",
		source: "blog-5-totango-alternative-faster-renewal-automation.html",
		title: "Totango Alternative for Faster Renewal Automation",
		description:
			"A focused comparison for teams that want AI-assisted renewal follow-up and action-first workflows without a broad platform rollout.",
		tags: ["Totango Alternative", "Renewal Automation", "SaaS Retention"],
		readTime: "8 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "what-is-renewal-automation",
		source: "blog-6-what-is-renewal-automation.html",
		title: "What is Renewal Automation? And Why Your CS Team Needs It",
		description:
			"A plain-English guide to renewal automation, why reminder emails are not enough, and how action-first workflows reduce churn risk.",
		tags: ["Renewal Automation", "Customer Success", "SaaS Churn"],
		readTime: "7 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "gainsight-vs-totango-vs-renewal360",
		source: "blog-3-gainsight-vs-totango-vs-renewal360.html",
		title:
			"Gainsight vs Totango vs Renewal360 - Which Renewal Automation Tool is Right for You?",
		description:
			"A buyer-focused comparison for SaaS teams deciding whether they need a broad customer success platform or a faster renewal automation engine.",
		tags: ["Comparison", "Gainsight Alternative", "Totango Alternative"],
		readTime: "9 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "how-to-automate-saas-renewal-emails",
		source: "blog-1-automate-saas-renewal-emails.html",
		title: "How to Automate SaaS Renewal Emails (Step-by-Step)",
		description:
			"A practical walkthrough of CRM sync, health scoring, branching sequences, AI drafts, reply detection, and human approval workflows.",
		tags: ["Automation", "Customer Success"],
		readTime: "8 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "why-saas-companies-lose-renewals",
		source: "blog-2-why-saas-companies-lose-renewals.html",
		title: "Why SaaS Companies Lose Renewals - And How AI Fixes It",
		description:
			"The five preventable process failures behind renewal churn, and how AI gives CS and RevOps teams earlier signals with better follow-through.",
		tags: ["Churn Prevention", "AI in CS", "RevOps"],
		readTime: "10 min read",
		publishedAt: "2026-04-30",
	},
];

function escapeHtml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function extractArticleHtml(html) {
	const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "";
	const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";

	return `${header}${main}`;
}

function stripTags(html) {
	return html
		.replace(/<script[\s\S]*?<\/script>/gi, "")
		.replace(/<style[\s\S]*?<\/style>/gi, "")
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function pageShell({ title, description, canonicalPath, body, schema }) {
	const canonicalUrl = `${siteUrl}${canonicalPath}`;
	const escapedTitle = escapeHtml(title);
	const escapedDescription = escapeHtml(description);

	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapedTitle}</title>
  <meta name="description" content="${escapedDescription}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Renewal360" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${escapedTitle}" />
  <meta property="og:description" content="${escapedDescription}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapedTitle}" />
  <meta name="twitter:description" content="${escapedDescription}" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #111827; background: #fff; }
    a { color: inherit; }
    .site-nav { border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; background: rgba(255,255,255,.96); backdrop-filter: blur(8px); z-index: 10; }
    .site-nav-inner { max-width: 72rem; margin: 0 auto; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .brand { color: #2563eb; font-weight: 800; font-size: 1.35rem; text-decoration: none; }
    .nav-links { display: flex; gap: 1.25rem; color: #4b5563; font-size: .95rem; }
    .nav-links a { text-decoration: none; }
    .nav-links a:hover { color: #2563eb; }
    header, main { max-width: 48rem; margin: 0 auto; padding-left: 1.5rem; padding-right: 1.5rem; }
    header { padding-top: 4rem; padding-bottom: 2.5rem; }
    main { padding-bottom: 5rem; }
    h1, h2, h3 { font-family: Georgia, "Times New Roman", serif; }
    h1 { font-size: clamp(2.3rem, 6vw, 3.6rem); line-height: 1.05; margin: 0 0 1.5rem; color: #111827; }
    h2 { font-size: 1.65rem; margin: 2.5rem 0 1rem; }
    h3 { font-size: 1.15rem; margin: 1.5rem 0 .5rem; }
    p { color: #374151; line-height: 1.8; margin: 0 0 1.25rem; }
    ul { list-style: none; padding: 0; margin: 0 0 1.25rem; }
    li { color: #374151; line-height: 1.7; padding: .3rem 0 .3rem 1.6rem; position: relative; }
    li::before { content: "->"; position: absolute; left: 0; color: #2563eb; font-weight: 700; }
    .text-blue-600 { color: #2563eb; }
    .text-gray-500 { color: #6b7280; }
    .text-gray-400 { color: #9ca3af; }
    .text-gray-900 { color: #111827; }
    .text-xl { font-size: 1.25rem; }
    .text-sm { font-size: .875rem; }
    .text-xs { font-size: .75rem; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .leading-relaxed { line-height: 1.7; }
    .leading-tight { line-height: 1.1; }
    .mb-5 { margin-bottom: 1.25rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mt-2 { margin-top: .5rem; }
    .mt-8 { margin-top: 2rem; }
    .pt-6 { padding-top: 1.5rem; }
    .border-t { border-top: 1px solid #e5e7eb; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .gap-4 { gap: 1rem; }
    .w-10 { width: 2.5rem; }
    .h-10 { height: 2.5rem; }
    .rounded-full { border-radius: 999px; }
    .bg-blue-100 { background: #dbeafe; }
    .text-blue-700 { color: #1d4ed8; }
    .justify-center { justify-content: center; }
    .tag { display: inline-block; background: #dbeafe; color: #1d4ed8; font-size: .75rem; font-weight: 700; padding: .25rem .75rem; border-radius: 999px; margin: 0 .5rem .5rem 0; }
    .step-card, .ai-fix { background: #f0f7ff; border-left: 4px solid #2563eb; border-radius: 0 .5rem .5rem 0; padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
    .step-num { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #2563eb; margin-bottom: .25rem; }
    .callout, .callout-dark { background: #111827; color: #fff; border-radius: .75rem; padding: 1.5rem 2rem; margin: 2rem 0; }
    .callout { background: #1e3a8a; }
    .callout p, .callout-dark p { color: #bfdbfe; margin: 0; }
    .reason-card { border: 1px solid #e5e7eb; border-radius: .75rem; padding: 1.5rem; margin: 1.25rem 0; position: relative; overflow: hidden; }
    .reason-card::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 4px; background: #ef4444; }
    .reason-card.amber::before { background: #f59e0b; }
    .reason-card.slate::before { background: #64748b; }
    .stat-row, .before-after { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0; }
    .before-after { grid-template-columns: repeat(2, 1fr); }
    .stat-box { text-align: center; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: .75rem; padding: 1.25rem .75rem; }
    .num { font-family: Georgia, "Times New Roman", serif; font-size: 1.75rem; font-weight: 700; color: #2563eb; }
    .label { font-size: .78rem; color: #6b7280; margin-top: .25rem; line-height: 1.4; }
    .timeline-row { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: flex-start; }
    .timeline-badge { width: 56px; height: 56px; flex: 0 0 auto; background: #2563eb; color: #fff; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: Georgia, "Times New Roman", serif; font-weight: 700; font-size: .85rem; text-align: center; line-height: 1.2; }
    .timeline-body h4 { margin: 0 0 .25rem; }
    .timeline-body p { margin: 0; color: #6b7280; font-size: .9rem; line-height: 1.6; }
    .comparison-table-wrap { overflow-x: auto; margin: 1.5rem 0 2rem; border: 1px solid #e5e7eb; border-radius: .75rem; }
    .comparison-table { width: 100%; min-width: 760px; border-collapse: collapse; font-size: .9rem; }
    .comparison-table th, .comparison-table td { border-bottom: 1px solid #e5e7eb; padding: .95rem; text-align: left; vertical-align: top; color: #374151; }
    .comparison-table th { background: #f8fafc; color: #111827; font-weight: 700; }
    .comparison-table tr:last-child td { border-bottom: 0; }
    .comparison-table td:first-child { font-weight: 700; color: #111827; }
    .blog-cta-link, .button { display: inline-flex; align-items: center; border-radius: .5rem; background: #2563eb; color: #fff; font-weight: 700; padding: .85rem 1.1rem; text-decoration: none; }
    .blog-cta-link:hover, .button:hover { background: #1d4ed8; }
    .post-grid { max-width: 72rem; margin: 0 auto; padding: 3rem 1.5rem 5rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
    .post-card { border: 1px solid #e5e7eb; border-radius: .75rem; padding: 1.5rem; text-decoration: none; display: block; }
    .post-card:hover { border-color: #bfdbfe; box-shadow: 0 18px 35px rgba(15, 23, 42, .08); }
    .post-card h2 { font-size: 1.25rem; margin: .75rem 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    @media (max-width: 780px) {
      .nav-links { display: none; }
      .stat-row, .before-after, .post-grid { grid-template-columns: 1fr; }
      header { padding-top: 3rem; }
    }
  </style>
</head>
<body>
  <nav class="site-nav">
    <div class="site-nav-inner">
      <a class="brand" href="/">Renewal360</a>
      <div class="nav-links">
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Request Demo</a>
      </div>
    </div>
  </nav>
  ${body}
</body>
</html>
`;
}

function renderPost(post) {
	const sourceHtml = fs.readFileSync(path.join(sourceDir, post.source), "utf8");
	const articleHtml = extractArticleHtml(sourceHtml);
	const canonicalPath = `/blog/${post.slug}`;
	const plainText = stripTags(articleHtml).slice(0, 4500);
	const schema = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		url: `${siteUrl}${canonicalPath}`,
		datePublished: post.publishedAt,
		dateModified: post.publishedAt,
		author: {
			"@type": "Organization",
			name: "Renewal360",
			url: siteUrl,
		},
		publisher: {
			"@type": "Organization",
			name: "Renewal360",
			url: siteUrl,
		},
		keywords: post.tags.join(", "),
		articleBody: plainText,
	};

	return pageShell({
		title: `${post.title} | Renewal360 Blog`,
		description: post.description,
		canonicalPath,
		body: articleHtml,
		schema,
	});
}

function renderBlogIndex() {
	const cards = posts
		.map(
			(post) => `<a class="post-card" href="/blog/${post.slug}">
  <div>${post.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
  <h2>${escapeHtml(post.title)}</h2>
  <p>${escapeHtml(post.description)}</p>
  <p class="text-sm text-gray-500">${post.readTime} - April 2026</p>
</a>`,
		)
		.join("\n");

	const body = `<header>
  <div class="mb-5"><span class="tag">Renewal360 Blog</span></div>
  <h1>Field notes for better SaaS renewals.</h1>
  <p class="text-xl text-gray-500 leading-relaxed">Practical playbooks for CS, RevOps, and founders who want fewer surprise churn conversations and a cleaner renewal operating rhythm.</p>
</header>
<main class="post-grid">${cards}</main>`;

	const schema = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: "Renewal360 Blog",
		description:
			"Practical guides on SaaS renewal automation, churn prevention, customer success workflows, and AI-powered retention.",
		url: `${siteUrl}/blog`,
		blogPost: posts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.title,
			url: `${siteUrl}/blog/${post.slug}`,
			datePublished: post.publishedAt,
		})),
	};

	return pageShell({
		title: "Blog - Renewal360",
		description:
			"Practical guides on SaaS renewal automation, churn prevention, customer success workflows, and AI-powered retention.",
		canonicalPath: "/blog",
		body,
		schema,
	});
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "index.html"), renderBlogIndex());

for (const post of posts) {
	const postDir = path.join(outputDir, post.slug);
	fs.mkdirSync(postDir, { recursive: true });
	fs.writeFileSync(path.join(postDir, "index.html"), renderPost(post));
}

console.log(`Generated ${posts.length + 1} static blog pages in public/blog`);
