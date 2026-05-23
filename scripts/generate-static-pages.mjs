/**
 * generate-static-pages.mjs
 *
 * Runs as `postbuild` (after `vite build`).
 *
 * Problem it solves:
 *   Vite produces a single dist/index.html that carries homepage metadata
 *   (title, canonical, OG tags). Every core SPA route that nginx falls back
 *   to via `try_files $uri $uri/ /index.html` therefore serves homepage head
 *   to Google and social crawlers — regardless of the actual route.
 *
 * What it does:
 *   1. Reads dist/index.html to extract the built <body> and hashed asset tags
 *      (the CSS <link> and module <script> filenames change on every build).
 *   2. For each core page, writes dist/{route}/index.html with the correct
 *      page-specific <head> metadata + the same SPA body.
 *   3. nginx's existing `try_files $uri $uri/ /index.html` rule will serve
 *      these files directly — no nginx config changes needed.
 *
 * Result:
 *   - Google and social unfurlers see the correct title, description,
 *     canonical URL, and Open Graph tags for every core route.
 *   - The SPA bundle still loads and hydrates normally (React takes over
 *     #app as usual, useSEO continues to work for client-side navigation).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const siteUrl = "https://renewal360.in";

// ── Core pages to generate ─────────────────────────────────────────────────
const pages = [
    {
        route: "features",
        title: "Features - Renewal360",
        description:
            "Built on the 20% of features that protect 80% of your ARR. Here's exactly how Renewal360 works under the hood.",
    },
    {
        route: "pricing",
        title: "Pricing - Renewal360",
        description:
            "Simple, transparent pricing. Every signup gets 7 days of full Scale access.",
    },
    {
        route: "how-it-works",
        title: "How It Works - Renewal360",
        description:
            "Behind the scenes, Renewal360's AI engine continuously monitors every account, crafts intelligent outreach, and escalates at-risk revenue.",
    },
    {
        route: "faq",
        title: "FAQ - Renewal360",
        description:
            "Frequently asked questions about Renewal360 — setup, integrations, pricing, and how the AI renewal automation works.",
    },
    {
        route: "about",
        title: "About Us - Renewal360",
        description:
            "Built by Customer Success practitioners who understand the renewal grind firsthand.",
    },
    {
        route: "contact",
        title: "Contact Us - Renewal360",
        description:
            "Request a trial. Let's discuss how Renewal360 can help automate your renewal process.",
    },
];

// ── Parse dist/index.html ──────────────────────────────────────────────────

const baseHtmlPath = path.join(distDir, "index.html");
if (!fs.existsSync(baseHtmlPath)) {
    console.error(
        "ERROR: dist/index.html not found. Run `vite build` before this script.",
    );
    process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, "utf8");

// Extract hashed asset tags: the CSS <link> and module <script> injected by Vite.
// These change on every build so we read them from the built file rather than
// hardcoding the hash.
const cssLinkMatch = baseHtml.match(
    /<link\s+rel="stylesheet"\s+crossorigin\s+href="[^"]+\.css"[^>]*>/,
);
const moduleScriptMatch = baseHtml.match(
    /<script\s+type="module"\s+crossorigin\s+src="[^"]+\.js"[^>]*><\/script>/,
);

if (!cssLinkMatch || !moduleScriptMatch) {
    console.error(
        "ERROR: Could not find hashed CSS/JS asset tags in dist/index.html.",
    );
    process.exit(1);
}

const cssLinkTag = cssLinkMatch[0];
const moduleScriptTag = moduleScriptMatch[0];

// Extract <body> content (everything between <body> and </body>).
// This contains #app div plus deferred third-party scripts (Razorpay, Freshworks).
const bodyMatch = baseHtml.match(/<body>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
    console.error("ERROR: Could not parse <body> from dist/index.html.");
    process.exit(1);
}
const bodyContent = bodyMatch[1];

// ── Shared JSON-LD schema (SoftwareApplication) ────────────────────────────
// Same as homepage — reinforces product identity on all key pages.
const softwareSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Renewal360",
    url: siteUrl,
    description:
        "The Customer Success platform built for SaaS teams who can't afford Gainsight. Automate workflows, health scoring, and get executive-level visibility.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
    },
    publisher: {
        "@type": "Organization",
        name: "Renewal360",
        url: siteUrl,
    },
});

// ── HTML builder ───────────────────────────────────────────────────────────

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function buildPageHtml({ route, title, description }) {
    const canonicalUrl = `${siteUrl}/${route}`;
    const escapedTitle = escapeHtml(title);
    const escapedDescription = escapeHtml(description);

    return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- ===================== PRIMARY SEO ===================== -->
  <title>${escapedTitle}</title>
  <meta name="description" content="${escapedDescription}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- ===================== OPEN GRAPH ===================== -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Renewal360" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${escapedTitle}" />
  <meta property="og:description" content="${escapedDescription}" />
  <meta property="og:image" content="${siteUrl}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Renewal360 - AI-Powered SaaS Renewal Automation Dashboard" />
  <meta property="og:locale" content="en_IN" />

  <!-- ===================== TWITTER CARD ===================== -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapedTitle}" />
  <meta name="twitter:description" content="${escapedDescription}" />
  <meta name="twitter:image" content="${siteUrl}/og-image.png" />
  <meta name="twitter:image:alt" content="Renewal360 Dashboard Preview" />

  <!-- ===================== ICONS & PWA ===================== -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#1d4ed8" />

  <!-- ===================== STRUCTURED DATA (JSON-LD) ===================== -->
  <script type="application/ld+json">
  ${softwareSchema}
  </script>

  <!-- ===================== PERFORMANCE HINTS ===================== -->
  <link rel="preconnect" href="https://checkout.razorpay.com" />
  <link rel="preconnect" href="https://in.fw-cdn.com" />
  <link rel="dns-prefetch" href="https://in.fw-cdn.com" />

  <!-- ===================== VITE BUILD ASSETS ===================== -->
  ${moduleScriptTag}
  ${cssLinkTag}
</head>

<body>${bodyContent}</body>

</html>
`;
}

// ── Write output files ─────────────────────────────────────────────────────

let count = 0;
for (const page of pages) {
    const outDir = path.join(distDir, page.route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), buildPageHtml(page));
    count++;
    console.log(`  ✓ dist/${page.route}/index.html`);
}

console.log(`\nGenerated ${count} static page shells in dist/`);
console.log(
    "Each file carries correct per-page title, description, canonical, and OG tags.",
);
