import { site } from "../site.mjs";
import { ctaBand, esc } from "../layout.mjs";

// Plain definitions of renewal and customer success terms. [term, definition, optional "in Renewal360" note]
export const terms = [
  ["ARR at risk", "The annual recurring revenue tied to customers who show signs they may not renew. Teams track it to see how much revenue needs attention before upcoming renewal dates.", "Renewal360 shows revenue at risk live from your CRM and the account signals behind it."],
  ["Auto-renewal", "A contract clause that renews the subscription automatically at the end of its term unless the customer gives notice. Auto-renewing contracts still churn, usually through a cancellation notice sent inside the notice window.", "Auto-renewing contracts get their own playbook steps, timed around the notice window."],
  ["Champion", "The person inside a customer's company who actively supports your product and argues for it internally. Losing a champion, for example when they change jobs, is one of the most common reasons renewals fail.", "Renewal360 checks that each renewal has a confirmed champion who is still replying."],
  ["Churn", "When a customer stops paying, by cancelling or not renewing. Customer churn counts lost customers; revenue churn counts lost recurring revenue.", ""],
  ["Customer health score", "A single number or label that summarises how likely a customer is to stay, usually built from product usage, engagement, support issues and sentiment.", "Renewal360 splits health from urgency and writes out the reasons behind each score."],
  ["Economic buyer", "The person with the budget and authority to sign or approve the renewal. They are often not the day-to-day user, which is why teams try to identify them well before the renewal date.", ""],
  ["Executive business review (EBR or QBR)", "A meeting with senior customer stakeholders to review results, goals and the plan ahead. Called a QBR when held quarterly.", ""],
  ["Gross revenue retention (GRR)", "The share of recurring revenue kept from existing customers over a period, counting losses and downgrades but not expansion. It cannot exceed 100%.", ""],
  ["Multithreading", "Building relationships with several people at a customer rather than one. A multithreaded account survives the departure of any single contact.", ""],
  ["Net revenue retention (NRR)", "The share of recurring revenue kept from existing customers over a period, including expansion, minus churn and downgrades. Above 100% means existing customers are growing.", ""],
  ["Notice period", "The time before a contract ends by which a customer must say they will not renew. Missing it often means the contract renews automatically, so renewal conversations should start before it opens.", ""],
  ["Renewal automation", "Software that handles the repeatable parts of renewing customers: tracking dates, spotting risk, preparing outreach and reminding the owner, so people spend their time on the conversations.", "Read the full guide: what is renewal automation."],
  ["Renewal playbook", "A written, repeatable set of steps a team follows before each renewal, such as check-ins, confirming the signer, a business review and the commercial conversation, timed against the renewal date.", "Renewal360 runs your playbook for every account and lets you choose how each step runs."],
  ["Renewal readiness", "How prepared a renewal is: whether value is proven, a champion is engaged, the signer is known, pricing is agreed and the renewal process is clear. Gaps show where to act.", "Renewal360 checks every renewal for these and turns each gap into a next step."],
  ["Renewal rate", "The share of contracts or revenue up for renewal in a period that actually renewed.", ""],
];

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const links = { "Renewal automation": "/blog/what-is-renewal-automation", "Renewal playbook": "/blog/how-to-build-a-renewal-playbook-from-scratch" };

export default {
  path: "/glossary",
  title: "Renewal and customer success glossary",
  seoTitle: "Renewal and Customer Success Glossary | Renewal360",
  description: "Plain definitions of renewal and customer success terms: ARR at risk, auto-renewal, champion, economic buyer, GRR, NRR, notice period, renewal playbook and renewal readiness.",
  schema: [{
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${site.url}/glossary`,
    name: "Renewal and customer success glossary",
    hasDefinedTerm: terms.map(([t, d]) => ({ "@type": "DefinedTerm", "@id": `${site.url}/glossary#${slug(t)}`, name: t, description: d, inDefinedTermSet: `${site.url}/glossary` })),
  }],
  body: `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">Glossary</p>
    <h1>Renewal and customer success glossary</h1>
    <p class="lede">The terms CS and RevOps teams use around renewals, defined in plain English.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap narrow">
    <dl class="gloss">${terms.map(([t, d, note]) => `<div id="${slug(t)}"><dt>${esc(t)}</dt><dd class="definition" style="margin-top:8px;font-size:1rem">${esc(d)}</dd>${note ? `<dd>${links[t] ? `<a href="${links[t]}">${esc(note)}</a>` : esc(note)}</dd>` : ""}</div>`).join("")}</dl>
  </div>
</section>
${ctaBand()}`,
};
