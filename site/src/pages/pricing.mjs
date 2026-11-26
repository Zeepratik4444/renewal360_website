import { site } from "../site.mjs";
import { ctaBand, esc, trialHref } from "../layout.mjs";
import { faqList, faqSchema, pricingFaqs } from "./faq-data.mjs";

// Same plans and prices as the previous site (src/lib/pricing.ts). Yearly = per month, billed yearly.
const P = {
  USD: { Free: ["$0", "$0"], SMB: ["$199", "$159"], Growth: ["$599", "$479"], Scale: ["$999", "$799"] },
  INR: { Free: ["₹0", "₹0"], SMB: ["₹12,000", "₹9,600"], Growth: ["₹49,000", "₹39,200"], Scale: ["₹99,000", "₹79,200"] },
  EUR: { Free: ["€0", "€0"], SMB: ["€179", "€143"], Growth: ["€549", "€439"], Scale: ["€929", "€743"] },
  GBP: { Free: ["£0", "£0"], SMB: ["£159", "£127"], Growth: ["£499", "£399"], Scale: ["£829", "£663"] },
};
const ADDON = { USD: "$349 / month", INR: "₹35,000 / month", EUR: "€299 / month", GBP: "£299 / month" };
const LOCALE = { USD: "en-US", INR: "en-IN", EUR: "en-IE", GBP: "en-GB" };
const yearTotal = (cur, s) => new Intl.NumberFormat(LOCALE[cur], { style: "currency", currency: cur, maximumFractionDigits: 0 })
  .format(Number(s.replace(/[^\d.]/g, "")) * 12);

const plans = [
  { name: "Free", for: "For a CSM running a first cohort", features: ["25 active accounts", "AI renewal sequences and email workflows", "Basic health scoring", "CSV import"], cta: "Start free" },
  { name: "SMB", for: "For 2 to 5 person CS teams at early-stage SaaS", features: ["200 active accounts", "Smart AI objection handling", "HubSpot and Slack integration", "Onboarding consultation"], cta: "Start free trial" },
  { name: "Growth", for: "For mid-market teams that need churn intelligence", features: ["1,000 active accounts", "Revenue at risk dashboard and NPS surveys", "Weighted health scoring (5 factors)", "Reporting dashboard and team leaderboard"], cta: "Start free trial", hl: "Most popular" },
  { name: "Scale", for: "For large CS teams that want a dedicated partner", features: ["Unlimited active accounts", "Salesforce and Pipedrive integration", "Dedicated success manager", "Priority Slack support and custom reports"], cta: "Talk to us", href: "/contact#talk" },
];

const table = [
  ["Core usage", [["Active accounts", "25", "200", "1,000", "Unlimited"]]],
  ["AI and automation", [
    ["AI renewal sequences", "y", "y", "y", "y"],
    ["Email approval workflow", "y", "y", "y", "y"],
    ["Objection handling AI", "Basic", "Smart AI", "Smart AI", "Smart AI"],
    ["Advanced follow-ups", "n", "y", "y", "y"],
  ]],
  ["Risk intelligence", [
    ["Basic health scoring", "y", "y", "y", "y"],
    ["Weighted health scoring (5 factors)", "n", "n", "y", "y"],
    ["NPS survey system", "n", "n", "y", "y"],
    ["Revenue at risk dashboard", "n", "n", "y", "y"],
    ["At-risk alerts", "n", "y", "y", "y"],
  ]],
  ["Integrations", [
    ["CSV import", "y", "y", "y", "y"],
    ["Google Sheets", "n", "y", "y", "y"],
    ["HubSpot CRM", "n", "y", "y", "y"],
    ["Slack alerts", "n", "y", "y", "y"],
    ["Salesforce", "n", "n", "n", "y"],
    ["Pipedrive", "n", "n", "n", "y"],
  ]],
  ["Reporting and summaries", [
    ["Executive summary", "Weekly (basic)", "Weekly", "Advanced", "Custom"],
    ["Reporting dashboard", "n", "n", "y", "Custom"],
    ["Team performance leaderboard", "n", "n", "y", "y"],
  ]],
  ["Support and onboarding", [
    ["Email support", "y", "y", "y", "y"],
    ["Onboarding consultation", "n", "y", "y", "y"],
    ["Priority Slack support", "n", "n", "n", "y"],
    ["Dedicated success manager", "n", "n", "n", "y"],
  ]],
];

const cell = (v) => v === "y" ? `<span class="y" aria-label="Included">✓</span>` : v === "n" ? `<span class="n" aria-label="Not included">-</span>` : esc(v);

const priceData = {
  plans: Object.fromEntries(Object.entries(P).map(([cur, ps]) => [cur, Object.fromEntries(Object.entries(ps).map(([n, [m, y]]) => [n, { m, y, yt: yearTotal(cur, y) }]))])),
  addon: ADDON,
};

const body = `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">Pricing</p>
    <h1>Simple pricing for growing CS teams</h1>
    <p class="lede">Start free with 25 accounts. Every new sign-up gets 7 days of the full Scale plan. No credit card, no setup fees, no per-user charges.</p>
  </div>
</section>
<section class="section section-tight" style="padding-top:24px">
  <div class="wrap">
    <div class="price-controls" hidden>
      <div class="seg" role="group" aria-label="Billing">
        <button type="button" data-cycle="monthly" aria-pressed="true">Monthly</button>
        <button type="button" data-cycle="yearly" aria-pressed="false">Yearly <span class="save">save 20%</span></button>
      </div>
    </div>
    <div class="plans" id="plans">
      ${plans.map((p) => `<article class="plan${p.hl ? " hl" : ""}" data-plan="${p.name}">
        ${p.hl ? `<span class="badge">${p.hl}</span>` : ""}
        <h2>${p.name}</h2>
        <p class="amount">${P.USD[p.name][0]}</p>
        <p class="per">${p.name === "Free" ? "free forever" : "per month"}</p>
        <p class="for">${esc(p.for)}</p>
        <ul class="ticks">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <a class="btn${p.hl ? "" : " btn-ghost"}" href="${p.href || trialHref}">${p.cta}</a>
      </article>`).join("")}
    </div>
    <p class="muted center" style="margin-top:22px">Prices are per month, shown in your local currency. Paying yearly saves 20%. Need more room? Add 500 accounts for <span id="addon-price">${ADDON.USD}</span> on any paid plan.</p>
    <script type="application/json" id="price-data">${JSON.stringify(priceData)}</script>
  </div>
</section>
<section class="section section-tint">
  <div class="wrap">
    <div class="section-head reveal"><h2>Compare plans in detail</h2></div>
    <div class="cmp-wrap reveal">
      <table class="cmp">
        <thead><tr><th scope="col">Feature</th>${plans.map((p) => `<th scope="col">${p.name}</th>`).join("")}</tr></thead>
        <tbody>${table.map(([cat, rows]) => `<tr class="cat"><td colspan="5">${cat}</td></tr>${rows.map(([f, ...v]) => `<tr><td>${esc(f)}</td>${v.map((x) => `<td>${cell(x)}</td>`).join("")}</tr>`).join("")}`).join("")}</tbody>
      </table>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap narrow">
    <div class="section-head reveal"><p class="eyebrow">Questions</p><h2>Pricing questions</h2></div>
    ${faqList(pricingFaqs)}
    <p class="more"><a href="/compare">How does this compare with Gainsight, Totango and ChurnZero? &rarr;</a></p>
  </div>
</section>
${ctaBand("Start with 7 days of the full Scale plan.", "Every new sign-up gets every Scale feature for 7 days. No credit card. Then keep the plan that fits, or stay on Free for 25 accounts.")}`;

export default {
  path: "/pricing",
  title: "Pricing",
  seoTitle: "Renewal360 Pricing: Free Plan, SMB, Growth and Scale",
  description: "Renewal360 pricing: free for 25 accounts, SMB $199, Growth $599 and Scale $999 a month, 20% off yearly. Every new sign-up gets 7 days of Scale, no credit card needed.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Renewal360",
      description: site.description,
      brand: { "@type": "Brand", name: "Renewal360" },
      url: `${site.url}/pricing`,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "999",
        offerCount: 4,
        offers: plans.map((p) => ({ "@type": "Offer", name: p.name, price: P.USD[p.name][0].replace("$", ""), priceCurrency: "USD", url: `${site.url}/pricing`, availability: "https://schema.org/InStock" })),
      },
    },
    faqSchema(pricingFaqs),
  ],
  body,
};
