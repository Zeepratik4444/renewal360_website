/**
 * generate-static-pages.mjs
 *
 * Runs as `postbuild` (after `vite build`).
 *
 * Problem it solves:
 *   Vite produces a single dist/index.html that carries homepage metadata
 *   (title, canonical, OG tags). Every core SPA route that nginx falls back
 *   to via `try_files $uri $uri/ /index.html` therefore serves homepage head
 *   to Google and social crawlers - regardless of the actual route.
 *
 * What it does:
 *   1. Reads dist/index.html to extract the built <body> and hashed asset tags
 *      (the CSS <link> and module <script> filenames change on every build).
 *   2. For each core page, writes dist/{route}/index.html with the correct
 *      page-specific <head> metadata + the same SPA body.
 *   3. nginx's `try_files $uri $uri/index.html /index.html` rule will serve
 *      these files directly without trailing slash redirect loops.
 *      (Avoid `try_files $uri $uri/ /index.html` which redirects directory
 *      paths and loops if there's a trailing-slash removal rewrite rule).
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
const publicDir = path.join(root, "public");
const siteUrl = "https://renewal360.in";
const currentContentLastmod = "2026-05-30";

// ── Core pages to generate ─────────────────────────────────────────────────
const pages = [
    {
        route: "",
        title: "Renewal360 | Enterprise CS Platform for AI-Powered Renewal Management",
        description:
            "Renewal360 helps growing SaaS teams protect ARR at scale without the complexity of Gainsight.",
    },
    {
        route: "features",
        title: "Features - Health Scoring, Playbooks & CRM Integrations | Renewal360",
        description:
            "Explore Renewal360 features for growing SaaS teams: account health scoring, renewal playbooks, CRM integrations, and executive visibility without Gainsight complexity.",
    },
    {
        route: "pricing",
        title: "Pricing - Renewal Automation Built for Growing SaaS Teams | Renewal360",
        description:
            "See Renewal360 pricing for growing SaaS teams that need renewal automation, health scoring, and CRM-integrated playbooks without Gainsight-level cost or setup.",
    },
    {
        route: "how-it-works",
        title: "How Renewal360 Works - From Health Score to Closed Renewal | Renewal360",
        description:
            "See how Renewal360 turns CRM data into health scores, AI-drafted renewal playbooks, and closed renewals for SaaS teams outgrowing spreadsheets or Totango.",
    },
    {
        route: "faq",
        title: "FAQ - Renewal360 Setup, Integrations & Pricing Questions",
        description:
            "Answers to Renewal360 setup, CRM integration, pricing, security, and renewal automation questions for SaaS teams comparing Gainsight, Totango, or spreadsheets.",
    },
    {
        route: "about",
        title: "About Renewal360 - Built for SaaS Teams That Outgrew Spreadsheets",
        description:
            "Meet Renewal360, built for SaaS customer success teams that outgrew spreadsheets and need renewal automation without enterprise CS platform overhead.",
    },
    {
        route: "contact",
        title: "Contact Renewal360 - Start Your SaaS Renewal Automation Pilot",
        description:
            "Talk to Renewal360 about renewal automation for growing SaaS teams replacing spreadsheets or evaluating Gainsight and Totango alternatives.",
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
// Same as homepage - reinforces product identity on all key pages.
const softwareSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Renewal360",
    url: siteUrl,
    description:
        "Enterprise CS Platform for AI-Powered Renewal Management. Protect ARR at scale without the complexity of Gainsight.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    audience: {
        "@type": "Audience",
        audienceType: "Growing SaaS customer success and RevOps teams",
    },
    featureList: [
        "Account health scoring",
        "Renewal playbooks",
        "AI-drafted renewal outreach",
        "Human approval workflow",
        "CRM and spreadsheet import",
        "ARR-at-risk dashboard",
    ],
    keywords:
        "renewal automation, SaaS renewals, customer success platform, renewal playbooks, ARR at risk",
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

function canonicalPath(route) {
    return route ? `/${route}` : "/";
}

function breadcrumbSchema(page) {
    const items = [{ name: "Home", path: "/" }];
    if (page.route) {
        items.push({
            name: page.title.split(" | ")[0],
            path: canonicalPath(page.route),
        });
    }

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${siteUrl}${item.path}`,
        })),
    };
}

function organizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Renewal360",
        url: siteUrl,
        logo: `${siteUrl}/brand-logo.png`,
        knowsAbout: [
            "SaaS renewal automation",
            "Customer success operations",
            "Renewal playbooks",
            "ARR at risk",
            "CRM-integrated customer success workflows",
        ],
    };
}

function websiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Renewal360",
        url: siteUrl,
    };
}

function pricingSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Renewal360",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: `${siteUrl}/pricing`,
        offers: {
            "@type": "OfferCatalog",
            name: "Renewal360 Plans",
            itemListElement: [
                {
                    "@type": "Offer",
                    name: "Free Pilot",
                    price: "0",
                    priceCurrency: "INR",
                    url: `${siteUrl}/contact`,
                },
                {
                    "@type": "Offer",
                    name: "SMB",
                    priceCurrency: "INR",
                    url: `${siteUrl}/pricing`,
                },
                {
                    "@type": "Offer",
                    name: "Growth",
                    priceCurrency: "INR",
                    url: `${siteUrl}/pricing`,
                },
            ],
        },
    };
}

const pageFaqs = {
    pricing: [
        {
            question: "Is Renewal360 free to try?",
            answer:
                "Yes. Renewal360 offers a free pilot for 25 accounts with no credit card required, so a team can validate renewal workflows before choosing a paid plan.",
        },
        {
            question: "Who is Renewal360 pricing built for?",
            answer:
                "Renewal360 pricing is built for growing SaaS teams that manage recurring renewals and need automation, health scoring, CRM integrations, and renewal visibility without enterprise CS platform overhead.",
        },
        {
            question: "Does Renewal360 charge per user?",
            answer:
                "No. Renewal360 plans include unlimited seats, which makes it easier for CS, RevOps, founders, and leadership to work from the same renewal view.",
        },
    ],
    features: [
        {
            question: "What are Renewal360's core features?",
            answer:
                "Renewal360's core features are account health scoring, renewal playbooks, AI-drafted outreach, human approval queues, CRM and email integrations, Slack alerts, and ARR-at-risk dashboards.",
        },
        {
            question: "Does Renewal360 replace a CRM?",
            answer:
                "No. Renewal360 is designed to work around your CRM or spreadsheet source of truth and add the renewal workflow layer that turns account data into actions.",
        },
        {
            question: "How is Renewal360 different from enterprise CS platforms?",
            answer:
                "Renewal360 focuses on renewal execution for growing SaaS teams, with faster setup and fewer enterprise platform layers than broad tools like Gainsight or Totango.",
        },
    ],
    "how-it-works": [
        {
            question: "Does Renewal360 send emails automatically?",
            answer:
                "Renewal360 can draft and schedule renewal outreach, but the workflow is built around human approval so teams can review, edit, skip, pause, or escalate before customer-facing messages go out.",
        },
        {
            question: "What data does Renewal360 need to start?",
            answer:
                "Renewal360 needs account names, renewal dates, ARR or contract value, owner information, and contact data from a CRM or spreadsheet to start a pilot workflow.",
        },
        {
            question: "How fast can a team see the first renewal workflow?",
            answer:
                "The product is designed for a 7-day guided setup path that gets the first renewal workflow live with a limited pilot account set.",
        },
    ],
    faq: [
        {
            question: "How quickly can Renewal360 go live?",
            answer:
                "Most teams can start a guided pilot in 7 days after connecting CRM data or importing a spreadsheet.",
        },
        {
            question: "Does Renewal360 integrate with Salesforce and HubSpot?",
            answer:
                "Renewal360 supports CRM-connected renewal workflows, including Salesforce, HubSpot, and spreadsheet-based imports for teams not yet ready for a full CRM setup.",
        },
        {
            question: "Is a credit card required for the pilot?",
            answer:
                "No. The free pilot is designed for 25 accounts and does not require a credit card.",
        },
    ],
};

function faqSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };
}

function buildSchemaScripts(page) {
    const schemas = [JSON.parse(softwareSchema), breadcrumbSchema(page)];

    if (page.route === "") {
        schemas.push(organizationSchema(), websiteSchema());
    }
    if (page.route === "pricing") {
        schemas.push(pricingSchema());
    }
    if (pageFaqs[page.route]) {
        schemas.push(faqSchema(pageFaqs[page.route]));
    }

    return schemas
        .map(
            (schema) => `<script type="application/ld+json">
  ${JSON.stringify(schema)}
  </script>`,
        )
        .join("\n  ");
}

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
    const schemaScripts = buildSchemaScripts({ route, title, description });

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
  ${schemaScripts}

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

function pageSitemapMetadata(page) {
    const defaults = {
        lastmod: currentContentLastmod,
        changefreq:
            page.route === "" || page.route === "pricing" || page.route === "contact"
                ? "weekly"
                : "monthly",
        priority:
            page.route === ""
                ? "1.0"
                : page.route === "pricing" || page.route === "contact"
                    ? "0.9"
                    : page.route === "features"
                        ? "0.85"
                        : "0.75",
    };

    return { ...defaults, ...page };
}

function buildPagesSitemap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
    .map(pageSitemapMetadata)
    .map(
        (page) => `  <url>
    <loc>${siteUrl}${canonicalPath(page.route)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("\n")}
</urlset>
`;
}

function readNewestLastmodFromSitemap(filePath, fallback) {
    if (!fs.existsSync(filePath)) return fallback;
    const matches = [
        ...fs.readFileSync(filePath, "utf8").matchAll(/<lastmod>(.*?)<\/lastmod>/g),
    ];
    return matches.map((match) => match[1]).sort().at(-1) || fallback;
}

function buildSitemapIndex() {
    const pagesLastmod = pages
        .map(pageSitemapMetadata)
        .map((page) => page.lastmod)
        .sort()
        .at(-1);
    const blogLastmod = readNewestLastmodFromSitemap(
        path.join(publicDir, "sitemap-blog.xml"),
        currentContentLastmod,
    );

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-pages.xml</loc>
    <lastmod>${pagesLastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${siteUrl}/sitemap-blog.xml</loc>
    <lastmod>${blogLastmod}</lastmod>
  </sitemap>
</sitemapindex>
`;
}

// ── Write output files ─────────────────────────────────────────────────────

let count = 0;
for (const page of pages) {
    const outDir = path.join(distDir, page.route);
    const outputPath = page.route ? `dist/${page.route}/index.html` : "dist/index.html";
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), buildPageHtml(page));
    count++;
    console.log(`  ✓ ${outputPath}`);
}

const pagesSitemap = buildPagesSitemap();
const sitemapIndex = buildSitemapIndex();
fs.writeFileSync(path.join(publicDir, "sitemap-pages.xml"), pagesSitemap);
fs.writeFileSync(path.join(distDir, "sitemap-pages.xml"), pagesSitemap);
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapIndex);
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapIndex);

console.log(`\nGenerated ${count} static page shells in dist/`);
console.log(
    "Each file carries correct per-page title, description, canonical, OG tags, and JSON-LD schema.",
);
console.log("Generated sitemap.xml and sitemap-pages.xml from page/blog metadata.");
