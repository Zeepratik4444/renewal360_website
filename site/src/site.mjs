// Site-wide settings. Change these, then rebuild.
export const site = {
  name: "Renewal360",
  url: "https://renewal360.in",
  // The app: trial sign-up, Google sign-up, "talk to us", sign-in and set-password all go here.
  appUrl: "https://copilot.renewal360.in",
  email: "hello@ganvix.in",
  company: "Ganvix Technologies Pvt Ltd",
  // The company behind Renewal360.
  companyUrl: "https://ganvix.in",
  address: "B-128, Sector 2, Noida, Uttar Pradesh, India",
  tagline: "Let AI handle the renewal work, so you can focus on the customer.",
  description:
    "Renewal360 is renewal software for SaaS customer success teams. It reads your CRM, inbox and support tools, shows what is missing from each renewal, and drafts the next step for your team to approve.",
  postalAddress: {
    streetAddress: "B-128, Sector 2",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  knowsAbout: [
    "SaaS renewal management",
    "Renewal automation",
    "Customer success operations",
    "Churn risk detection",
    "Renewal playbooks",
    "ARR at risk",
  ],
  // Official profiles (LinkedIn, X, G2, Capterra, Crunchbase, Product Hunt, Wikidata...).
  // Only real, live profiles. Feeds Organization.sameAs.
  sameAs: [],
  // IndexNow key: build writes /<key>.txt; scripts/indexnow.mjs pings Bing and others after a release.
  indexNowKey: "35e2c7660373a61eeee79eab5fff4105",
};

export const nav = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/compare", label: "Compare" },
  { href: "/integrations", label: "Integrations" },
  { href: "/blog", label: "Blog" },
];
