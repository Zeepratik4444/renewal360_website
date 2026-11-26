import { site, nav } from "./site.mjs";

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const logo = `<a class="logo" href="/" aria-label="Renewal360 home"><img src="/img/logo-64.png" width="30" height="30" alt=""><span>Renewal360</span></a>`;

export const trialHref = "/contact";

function header(path) {
  const links = nav
    .map((l) => {
      const on = path === l.href || path.startsWith(l.href + "/");
      return `<a href="${l.href}"${on ? ' aria-current="page"' : ""}>${l.label}</a>`;
    })
    .join("");
  return `<header class="site-header">
  <div class="wrap header-row">
    ${logo}
    <nav class="main-nav" aria-label="Main">${links}</nav>
    <div class="header-cta">
      <a class="link-quiet" href="${site.appUrl}/">Sign in</a>
      <a class="btn btn-sm" href="${trialHref}">Start free trial</a>
    </div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
      <span></span><span></span>
    </button>
  </div>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile" hidden>
    ${links}
    <a href="/about">About</a>
    <a href="${site.appUrl}/">Sign in</a>
    <a class="btn" href="${trialHref}">Start free trial</a>
  </nav>
</header>`;
}

function footer(path = "/", noindex = false) {
  const y = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="wrap footer-grid five">
    <div class="footer-brand">
      ${logo}
      <p>${esc(site.tagline)}</p>
      <p>A product of <a href="${site.companyUrl}">Ganvix</a>.</p>
    </div>
    <div>
      <h2>Product</h2>
      <a href="/product">How it works</a>
      <a href="/product#tour">Product tour video</a>
      <a href="/pricing">Pricing</a>
      <a href="/integrations">Integrations</a>
      <a href="/security">Security</a>
      <a href="/faq">FAQ</a>
    </div>
    <div>
      <h2>Compare</h2>
      <a href="/compare">All comparisons</a>
      <a href="/compare/gainsight-alternatives">Gainsight alternatives</a>
      <a href="/blog/totango-alternative-faster-renewal-automation">Totango alternative</a>
      <a href="/blog/churnzero-alternative-growing-saas-teams">ChurnZero alternative</a>
      <a href="/blog/renewal360-vs-spreadsheets-honest-comparison">Spreadsheets</a>
    </div>
    <div>
      <h2>Company</h2>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
      <a href="/glossary">Glossary</a>
      <a href="/contact">Contact</a>
      <a href="${site.companyUrl}">Ganvix</a>
      <a href="mailto:${site.email}">${site.email}</a>
    </div>
    <div>
      <h2>Legal</h2>
      <a href="/terms">Terms of Service</a>
      <a href="/terms#privacy">Privacy Policy</a>
    </div>
  </div>
  <div class="wrap footer-base">
    <span>&copy; ${y} <a class="md-link" href="${site.companyUrl}">${esc(site.company)}</a></span>
    <span>Made in India${noindex ? "" : ` · <a class="md-link" href="${mdPath(path)}">Markdown version</a>`}</span>
  </div>
</footer>`;
}

export function ctaBand(
  title = "Your next renewal shouldn't depend on someone remembering to follow up.",
  text = "Start free with 25 accounts. Every new sign-up also gets 7 days of the full Scale plan, no credit card.",
) {
  return `<section class="cta-band">
  <div class="wrap cta-inner reveal">
    <h2>${title}</h2>
    <p>${text}</p>
    <div class="actions">
      <a class="btn btn-light" href="${trialHref}">Start free trial</a>
      <a class="btn btn-ghost-light" href="/product#tour">Watch the product tour</a>
    </div>
  </div>
</section>`;
}

const ORG_ID = `${site.url}/#organization`;

export const organization = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Renewal360",
  url: site.url,
  logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 512, height: 512 },
  description: site.description,
  email: site.email,
  slogan: site.tagline,
  knowsAbout: site.knowsAbout,
  ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  parentOrganization: {
    "@type": "Organization",
    name: site.company,
    url: site.companyUrl,
    address: { "@type": "PostalAddress", ...site.postalAddress },
  },
});

const CRUMB = {
  integrations: "Integrations", compare: "Compare", glossary: "Glossary", product: "Product", pricing: "Pricing",
  security: "Security", about: "About", contact: "Contact", faq: "FAQ", blog: "Blog", terms: "Terms of Service",
};

function breadcrumb(path, title) {
  const parts = path.split("/").filter(Boolean);
  const items = [{ name: "Home", item: `${site.url}/` }];
  parts.forEach((seg, i) => {
    const last = i === parts.length - 1;
    items.push({ name: last && !CRUMB[seg] ? title : CRUMB[seg] || seg, item: `${site.url}/${parts.slice(0, i + 1).join("/")}` });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, item: x.item })),
  };
}

// Markdown copy of every page, for AI agents: /product -> /product.md, / -> /index.md
export const mdPath = (path) => (path === "/" ? "/index.md" : `${path}.md`);

export function page({ path, title, seoTitle, description, body, schema = [], pageType = "WebPage", v = "1", noindex = false, ogImage, head = "" }) {
  const url = site.url + (path === "/" ? "/" : path);
  const withBrand = `${title} | Renewal360`;
  const fullTitle = seoTitle || (path === "/" ? title : withBrand.length <= 60 ? withBrand : title);
  const image = ogImage || `${site.url}/og-image.png`;
  const webPage = {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: fullTitle,
    description,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", "@id": `${site.url}/#website`, name: "Renewal360", url: site.url },
    publisher: { "@id": ORG_ID },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".lede", ".definition", ".answer"] },
  };
  const ld = noindex ? [organization()] : [
    organization(),
    ...(path === "/" ? [{ "@context": "https://schema.org", "@type": "WebSite", "@id": `${site.url}/#website`, name: "Renewal360", url: site.url, publisher: { "@id": ORG_ID }, inLanguage: "en" }] : []),
    webPage,
    ...(path === "/" ? [] : [breadcrumb(path, title)]),
    ...schema,
  ];
  return `<!doctype html>
<html lang="en" data-api="${site.appUrl}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : ""}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Renewal360">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta name="author" content="Renewal360">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_US">
<meta property="og:image" content="${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Renewal360: renewal software for SaaS customer success teams">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${image}">
<meta name="theme-color" content="#f7f8fc">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="llms-txt" href="${site.url}/llms.txt" type="text/plain">
${noindex ? "" : `<link rel="alternate" type="text/markdown" href="${site.url}${mdPath(path)}" title="Markdown version">`}
<link rel="sitemap" href="${site.url}/sitemap.xml" type="application/xml">
<link rel="preload" href="/assets/fonts/geist-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/styles.css?v=${v}">
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x).replace(/</g, "\\u003c")}</script>`).join("\n")}
${head}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(path)}
<main id="main">
${body}
</main>
${footer(path, noindex)}
<script src="/assets/site.js?v=${v}" defer></script>
</body>
</html>
`;
}
