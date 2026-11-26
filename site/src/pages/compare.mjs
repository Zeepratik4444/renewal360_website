import { site } from "../site.mjs";
import { ctaBand, esc } from "../layout.mjs";

const cards = [
  { href: "/compare/gainsight-alternatives", tag: "Gainsight", t: "Gainsight alternatives", d: "Six options for teams that find Gainsight too heavy for their size, and how to choose between them." },
  { href: "/blog/gainsight-vs-totango-vs-renewal360", tag: "Gainsight and Totango", t: "Gainsight vs Totango vs Renewal360", d: "Three platforms side by side: who each one is built for, setup effort, and where renewals fit." },
  { href: "/blog/totango-alternative-faster-renewal-automation", tag: "Totango", t: "Totango alternative", d: "When a renewal-focused tool fits better than a modular CS suite." },
  { href: "/blog/churnzero-alternative-growing-saas-teams", tag: "ChurnZero", t: "ChurnZero alternative", d: "For growing teams that want renewal follow-up done for them, not just flagged." },
  { href: "/blog/renewal360-vs-spreadsheets-honest-comparison", tag: "Spreadsheets", t: "Renewal360 vs spreadsheets", d: "An honest look at when a spreadsheet is enough and when it starts costing renewals." },
  { href: "/blog/zendesk-hubspot-salesforce-cs-platform-comparison", tag: "Zendesk, HubSpot, Salesforce", t: "Support and CRM data in renewals", d: "How Zendesk, HubSpot and Salesforce data fit together for a CS team, and what each misses on renewals." },
];

const rows = [
  ["Main job", "Renewals: find what is missing, do the follow-up", "Full customer success suite", "Customer success platform", "Record keeping"],
  ["Typical team", "Growing SaaS CS teams", "Large CS orgs with CS operations staff", "Mid-market CS teams", "Very small teams"],
  ["Time to first value", "Same day with a CSV; days with a CRM", "Usually a planned implementation project", "Weeks, depending on setup", "Immediate, then manual"],
  ["Who keeps it running", "The CS team", "Usually a dedicated admin", "A CS ops owner", "Whoever remembers"],
  ["Drafts the outreach for you", "Yes, with approval", "Varies by product and add-ons", "Templates and plays", "No"],
  ["Shows what each renewal is missing", "Yes, as a checklist with evidence", "Through configured scorecards", "Through health scores", "Only if someone types it"],
  ["Published pricing", "Yes, from free", "Quote-based", "Usually quote-based", "Free"],
];

const hub = {
  path: "/compare",
  title: "Compare Renewal360",
  seoTitle: "Renewal360 vs Gainsight, Totango, ChurnZero, Spreadsheets",
  pageType: "CollectionPage",
  description: "Compare Renewal360 with Gainsight, Totango, ChurnZero and spreadsheets: who each is built for, setup effort, pricing, and how each handles renewal risk and follow-up.",
  schema: [{
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Renewal360 comparisons",
    itemListElement: cards.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.t, url: site.url + c.href })),
  }],
  body: `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">Compare</p>
    <h1>Renewal360 compared with Gainsight, Totango, ChurnZero and spreadsheets</h1>
    <p class="lede">Every tool here is good at something. The right one depends on your team's size, who will run it, and whether you need a full CS suite or help winning renewals.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap narrow">
    <p class="answer">Short answer: choose an enterprise CS suite such as Gainsight if you have a large team and a dedicated admin to configure it. Choose Renewal360 if you are a growing SaaS team that wants every renewal checked for gaps and the follow-up drafted for you, set up in days, at a published price.</p>
  </div>
  <div class="wrap" style="margin-top:48px">
    <div class="cmp-wrap reveal">
      <table class="cmp left">
        <thead><tr><th scope="col"></th><th scope="col">Renewal360</th><th scope="col">Enterprise CS suites (for example Gainsight)</th><th scope="col">CS platforms (for example Totango, ChurnZero)</th><th scope="col">Spreadsheet or CRM reminders</th></tr></thead>
        <tbody>${rows.map(([k, ...v]) => `<tr><td><b>${esc(k)}</b></td>${v.map((x) => `<td>${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
    <p class="muted" style="margin-top:12px">General categories, not a review of any one product's current features. Check each vendor for details.</p>
  </div>
</section>
<section class="section section-tint">
  <div class="wrap">
    <div class="section-head reveal"><h2>Detailed comparisons</h2></div>
    <div class="card-grid three">${cards.map((c) => `<a class="post-card reveal cmp-card" href="${c.href}"><span class="post-tag">${esc(c.tag)}</span><h3>${esc(c.t)}</h3><p>${esc(c.d)}</p></a>`).join("")}</div>
  </div>
</section>
${ctaBand("See it on your own renewals.", "Import a spreadsheet and compare for yourself. Free for 25 accounts, with 7 days of the full Scale plan.")}`,
};

const alts = [
  { n: "Renewal360", best: "Growing SaaS teams that want renewals checked for gaps and the follow-up drafted for them", d: "Focused on renewals rather than the whole customer lifecycle. It reads your CRM, inbox, meetings, support tickets and usage, shows what each renewal is missing, and drafts the next step for approval. Published pricing starts with a free plan.", url: "/" },
  { n: "ChurnZero", best: "Mid-market subscription businesses that want usage-driven plays and in-app messages", d: "A customer success platform built around product usage, health scores and automated plays, with ways to reach users inside your product." },
  { n: "Totango", best: "Teams that want a modular CS platform with ready-made templates", d: "A customer success platform with goal-based, modular building blocks for onboarding, adoption and renewal programmes. Totango combined with Catalyst in 2024." },
  { n: "Vitally", best: "B2B SaaS teams that want a collaborative CS workspace", d: "A customer success platform that pairs health scores and automation with shared docs, projects and notes for the team." },
  { n: "Planhat", best: "Teams that want a flexible customer data platform", d: "A customer platform with a configurable data model for revenue, usage and relationship data, used by many European SaaS companies." },
  { n: "Custify", best: "Smaller SaaS teams that want a lighter CS tool", d: "Customer success software aimed at SMB and mid-market SaaS, with lifecycle automation and quicker setup than enterprise suites." },
];

const qa = [
  ["Why do teams look for Gainsight alternatives?", "Most often cost and effort, rather than missing features. Gainsight is a deep, configurable platform, which suits large CS organisations with an admin to run it. Smaller teams often find they pay for, and maintain, far more than they use."],
  ["What should a growing team look for instead?", "Fast setup from the tools you already have, a clear view of which renewals are at risk and why, help doing the follow-up rather than only flagging it, and pricing you can see before a sales call."],
  ["Is Renewal360 a full replacement for Gainsight?", "For teams whose main need is protecting renewals, yes. If you rely on broad programmes such as digital customer journeys, community or deep in-product engagement, a full suite may still fit better."],
  ["How hard is it to switch?", "With Renewal360 you can start from a CSV export of your renewals the same day, then connect your CRM and inbox. Run it alongside your current tool for a renewal cycle before deciding."],
];

const gainsight = {
  path: "/compare/gainsight-alternatives",
  title: "Gainsight alternatives",
  seoTitle: "Gainsight Alternatives for Growing SaaS Teams (2026)",
  pageType: "WebPage",
  description: "The best Gainsight alternatives for growing SaaS teams in 2026: Renewal360, ChurnZero, Totango, Vitally, Planhat and Custify, with who each one fits and how to choose.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Gainsight alternatives",
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: alts.length,
      itemListElement: alts.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.n })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ],
  body: `<section class="page-hero">
  <div class="wrap narrow">
    <p class="eyebrow"><a href="/compare">Compare</a> · Gainsight</p>
    <h1>Gainsight alternatives for growing SaaS teams</h1>
    <p class="lede">Gainsight is one of the most complete customer success platforms. It is also built for large teams. If yours is smaller, here are six alternatives, who each one suits, and how to choose.</p>
    <p class="muted" style="margin-top:14px">Updated 26 November 2026. Written by the Renewal360 team, so we have listed ourselves first; the others are described as fairly as we can.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap narrow">
    <p class="answer">The best Gainsight alternative depends on your main need. For protecting renewals with a small team, Renewal360. For usage-driven plays and in-app messages, ChurnZero. For a modular CS programme, Totango. For a collaborative CS workspace, Vitally. For a flexible customer data model, Planhat. For a lighter, quicker tool, Custify.</p>
  </div>
  <div class="wrap narrow" style="margin-top:48px">
    ${alts.map((a, i) => `<article class="reveal" style="padding:28px 0;border-top:1px solid var(--line)">
      <h2 style="font-size:1.5rem">${i + 1}. ${esc(a.n)}</h2>
      <p class="verdict"><b>Best for:</b> ${esc(a.best)}</p>
      <p class="body-lg" style="margin-top:10px">${esc(a.d)}</p>
      ${a.url ? `<p class="more" style="margin-top:12px"><a href="/product">See how Renewal360 works &rarr;</a></p>` : ""}
    </article>`).join("")}
  </div>
</section>
<section class="section section-tint">
  <div class="wrap narrow">
    <div class="section-head reveal"><h2>How to choose</h2></div>
    <div class="cmp-wrap reveal">
      <table class="cmp left">
        <thead><tr><th scope="col">If your main need is...</th><th scope="col">Look at</th></tr></thead>
        <tbody>
          <tr><td>Winning renewals with a small team, and doing the follow-up</td><td>Renewal360</td></tr>
          <tr><td>Usage-driven plays and in-app messages</td><td>ChurnZero</td></tr>
          <tr><td>A modular programme across the customer lifecycle</td><td>Totango</td></tr>
          <tr><td>A shared workspace for the CS team</td><td>Vitally</td></tr>
          <tr><td>A flexible data model across many data sources</td><td>Planhat</td></tr>
          <tr><td>A lighter tool for a small CS team</td><td>Custify</td></tr>
          <tr><td>Everything, at enterprise scale, with an admin to run it</td><td>Gainsight</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap narrow">
    <div class="section-head reveal"><h2>Questions about leaving Gainsight</h2></div>
    <div class="qa">${qa.map(([q, a]) => `<div><h3>${esc(q)}</h3><p>${esc(a)}</p></div>`).join("")}</div>
    <p class="more"><a href="/blog/gainsight-vs-totango-vs-renewal360">Read: Gainsight vs Totango vs Renewal360 &rarr;</a></p>
  </div>
</section>
${ctaBand("Try the renewal-focused alternative.", "Import your renewals from a CSV and see what each one is missing. Free for 25 accounts.")}`,
};

export default [hub, gainsight];
