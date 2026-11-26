import { readFileSync } from "node:fs";
import { site } from "../site.mjs";
import { ctaBand, esc, trialHref } from "../layout.mjs";
import { faqList, faqSchema, homeFaqs } from "./faq-data.mjs";
import { tools } from "./integrations.mjs";

// Example account from the Ganvix demo workspace (the same one used in the product tour).
const checks = [
  ["Value demonstrated", "ok", "Covered"],
  ["Champion confirmed", "gap", "Gap"],
  ["More than one contact", "risk", "At risk"],
  ["Who signs is known", "ok", "Covered"],
  ["Pricing agreed", "unk", "Unknown"],
];

const hero = `<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Renewal software for SaaS customer success</p>
      <h1>Let AI handle the renewal work. <em>You keep the customer.</em></h1>
      <p class="lede">Renewal360 reads your CRM, inbox, meetings, support tickets and product usage, shows what each renewal is missing, and drafts the next step. Nothing reaches a customer until your team approves it.</p>
      <div class="actions">
        <a class="btn" href="${trialHref}">Start free trial</a>
        <a class="btn btn-ghost" href="#overview">Watch the 30-second overview</a>
      </div>
      <p class="hero-note">Free for 25 accounts. Every new sign-up gets 7 days of the full Scale plan. No credit card.</p>
    </div>
    <div class="stage" role="img" aria-label="Example: a renewal checklist with one gap, and an email drafted to close it, waiting for approval">
      <div class="r-card">
        <div class="r-head"><strong>Quarry Robotics</strong><span>renews in 16 days · $130k</span></div>
        <ul class="r-list">${checks.map(([t, c, l]) => `<li><span>${t}</span><span class="st ${c}">${l}</span></li>`).join("")}</ul>
      </div>
      <div class="a-card">
        <div class="a-top"><span>Drafted by <b>Nuva</b></span><span>Waiting for approval</span></div>
        <p class="subj">Quick question before your renewal</p>
        <p class="body">Hi Priya, now that Daniel has moved on, could we set up 20 minutes to walk through how your team uses the platform and what you need next year?</p>
        <div class="a-actions"><span>Edit</span><span>Reject</span><span class="go">Approve</span></div>
      </div>
    </div>
  </div>
</section>`;

const toolsStrip = `<section class="tools">
  <div class="wrap">
    <p>Works with the tools your team already uses</p>
    <ul class="tool-list">${tools.map((t) => `<li><a href="/integrations/${t.slug}">${t.name}</a></li>`).join("")}</ul>
  </div>
</section>`;

const whatIs = `<section class="section section-tight what-is">
  <div class="wrap narrow center reveal">
    <h2>What is Renewal360?</h2>
    <p class="definition">Renewal360 is renewal software for SaaS customer success teams. It connects to the CRM, email, calendar, support desk and product analytics a company already uses, checks every upcoming renewal for what is missing, ranks the accounts that need attention, and drafts the outreach for a person to approve. Its assistant, Nuva, answers questions about any account in plain English.</p>
  </div>
</section>`;

const overview = `<section class="section section-tight" id="overview">
  <div class="wrap narrow">
    <figure class="video reveal">
      <video controls preload="none" playsinline poster="/video/overview-30s.jpg" width="1280" height="720">
        <source src="/video/overview-30s.mp4" type="video/mp4">
        <a href="/video/overview-30s.mp4">Download the 30-second overview</a>
      </video>
      <figcaption>Renewal360 in 30 seconds. Want the full walk-through? <a href="/product#tour">Watch the 5-minute product tour</a>.</figcaption>
    </figure>
  </div>
</section>`;

const problem = `<section class="section">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">The problem</p>
      <h2>Renewals are rarely lost at the end. They are lost in the quiet months before.</h2>
    </div>
    <div class="problem-list reveal">
      <div><h3>The signals are scattered</h3><p>A champion leaves, usage slides, a support ticket sits open. Each signal lives in a different tool, and nobody is watching all of them for every account.</p></div>
      <div><h3>Silence looks like health</h3><p>No complaints is not the same as a happy customer. Without the full picture, a quiet account looks fine until the "we've decided to go another way" email.</p></div>
      <div><h3>Follow-up depends on memory</h3><p>Who signs, has pricing been agreed, when was the last real business review? In a spreadsheet, those questions get answered three weeks before the date, if at all.</p></div>
    </div>
  </div>
</section>`;

const pillars = [
  { t: "Spots risk early", d: "Reads email, meetings, tickets, usage and the CRM every day, and flags the accounts that are drifting, with the reasons written out.", i: `<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>` },
  { t: "Shows what is missing", d: "Checks each renewal for a champion, a second contact, a known signer, proof of value and an agreed price. A gap is a to-do, not a guess.", i: `<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h9"/>` },
  { t: "Drafts the next step", d: "Writes the email, proposes the business review or asks for an executive introduction, then waits for your OK.", i: `<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/>` },
  { t: "Keeps managers in the loop", d: "One view of the whole book: revenue at risk, renewals by risk this quarter, and the gaps that need coaching first.", i: `<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>` },
];

const pillarSection = `<section class="section section-tint">
  <div class="wrap">
    <div class="section-head reveal">
      <p class="eyebrow">What it does</p>
      <h2>Finds what every renewal is missing. Then acts on it.</h2>
    </div>
    <div class="card-grid four">
      ${pillars.map((p) => `<article class="card reveal"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${p.i}</svg><h3>${p.t}</h3><p>${p.d}</p></article>`).join("")}
    </div>
  </div>
</section>`;

const actionCenter = `<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <p class="eyebrow">Inside the product</p>
      <h2>Every day starts with one list.</h2>
      <p class="body-lg">The Action Center puts your pipeline, revenue at risk and today's to-dos on one screen: customers waiting for a reply, one-click decisions, and the calls and tasks that matter most, each with the days left until renewal.</p>
    </div>
    <figure class="shot reveal">
      <img src="/img/product-todo.webp" width="1600" height="532" loading="lazy" alt="Renewal360 Action Center: pipeline ARR, at-risk ARR, the to-do list split into customers waiting, decide and do, with days to renewal for each account">
      <figcaption>The Action Center, shown on our Ganvix demo workspace.</figcaption>
    </figure>
    <p class="more reveal"><a href="/product">See how it works &rarr;</a></p>
  </div>
</section>`;

const control = `<section class="section section-night">
  <div class="wrap">
    <div class="section-head reveal">
      <p class="eyebrow eyebrow-light">You stay in control</p>
      <h2>You choose how much it does.</h2>
      <p class="body-lg">Start with everything prepared and nothing sent. Let routine work run on its own only when it has earned your trust, and take that back whenever you like.</p>
    </div>
    <div class="levels reveal">
      <div><h3><i></i>Do it yourself</h3><p>Everything is prepared for you: the reasons, the gaps and the suggested move. You make it.</p></div>
      <div><h3><i></i>One click</h3><p>Drafts wait in an approval queue. Edit, approve or reject each one before a customer sees it.</p></div>
      <div><h3><i></i>On its own</h3><p>Routine steps that have earned your trust go out by themselves. Key accounts always stay in human hands.</p></div>
    </div>
  </div>
</section>`;

const nuva = `<section class="section">
  <div class="wrap split split-media">
    <div class="reveal">
      <p class="eyebrow">Ask Nuva</p>
      <h2>Ask about any account. Get the facts in seconds.</h2>
      <p class="body-lg">Nuva knows which account you are looking at. Ask how it is doing and you get the value, renewal date, risk, owner and next step, followed by the activity behind them. Ask it to draft a check-in, and it waits for your approval like everything else.</p>
    </div>
    <div class="r-card reveal" aria-label="Example question to Nuva and its answer">
      <div class="r-head"><strong>Ask Nuva</strong><span>Quarry Robotics</span></div>
      <p style="font-weight:600;margin-top:6px">How is this account doing?</p>
      <p class="body-lg" style="font-size:0.95rem;margin-top:10px">$130k, renews in 16 days, high risk. The proposal has been with the customer for 15 days and their latest reply was negative: they are reviewing their tools. Next step: a short call to understand the review and meet the people who decide.</p>
    </div>
  </div>
</section>`;

const compare = `<section class="section section-tint">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Switching?</p>
      <h2>Coming from Gainsight, Totango, ChurnZero or a spreadsheet?</h2>
    </div>
    <div class="reveal">
      <p class="body-lg">Big CS suites are built for large teams with operations staff. Spreadsheets depend on someone remembering. Renewal360 sits in between: focused on renewals, quick to set up and priced for growing teams.</p>
      <p class="more"><a href="/compare">See the side-by-side comparisons &rarr;</a></p>
    </div>
  </div>
</section>`;

const faq = `<section class="section">
  <div class="wrap narrow">
    <div class="section-head reveal"><p class="eyebrow">Questions</p><h2>Common questions</h2></div>
    ${faqList(homeFaqs)}
    <p class="more"><a href="/faq">More questions &rarr;</a></p>
  </div>
</section>`;

const posts = JSON.parse(readFileSync(new URL("../blog/posts.json", import.meta.url), "utf8"));
const featured = ["how-to-build-a-renewal-playbook-from-scratch", "what-is-renewal-automation", "signs-your-renewal-process-is-quietly-broken"]
  .map((s) => posts.find((p) => p.slug === s));
const fromBlog = `<section class="section section-tint">
  <div class="wrap">
    <div class="section-head section-head-row reveal">
      <div><p class="eyebrow">From the blog</p><h2>Guides for renewal and CS teams</h2></div>
      <a class="btn btn-ghost" href="/blog">All posts</a>
    </div>
    <div class="post-grid">${featured.map((p) => `<a class="post-card reveal" href="/blog/${p.slug}"><span class="post-tag">${esc(p.tags[0])}</span><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><span class="post-meta">${esc(p.readTime)}</span></a>`).join("")}</div>
  </div>
</section>`;

export default {
  path: "/",
  title: "Renewal360: AI renewal software for SaaS customer success teams",
  seoTitle: "Renewal360: AI Renewal Software for SaaS CS Teams",
  description: "Renewal360 finds which SaaS renewals are at risk and what each one is missing, then drafts the next step for your team to approve. Free for 25 accounts. Start today.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Renewal360",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Customer success and renewal management",
      operatingSystem: "Web",
      url: site.url,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
      offers: [
        { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", url: `${site.url}/pricing` },
        { "@type": "Offer", name: "SMB", price: "199", priceCurrency: "USD", url: `${site.url}/pricing` },
        { "@type": "Offer", name: "Growth", price: "599", priceCurrency: "USD", url: `${site.url}/pricing` },
        { "@type": "Offer", name: "Scale", price: "999", priceCurrency: "USD", url: `${site.url}/pricing` },
      ],
      featureList: ["Renewal risk scoring with reasons", "Renewal readiness gaps", "AI-drafted outreach with human approval", "Renewal playbooks", "Nuva assistant", "Manager view of revenue at risk"],
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Renewal360 in 30 seconds",
      description: "A short overview of Renewal360: it reads your accounts every day, spots the ones drifting, prepares the next step, and lets you choose how much it does on its own.",
      thumbnailUrl: `${site.url}/video/overview-30s.jpg`,
      contentUrl: `${site.url}/video/overview-30s.mp4`,
      uploadDate: "2026-11-18",
      duration: "PT30S",
      publisher: { "@id": `${site.url}/#organization` },
    },
    faqSchema(homeFaqs),
  ],
  body: [hero, toolsStrip, whatIs, overview, problem, pillarSection, actionCenter, control, nuva, compare, faq, fromBlog, ctaBand()].join("\n"),
};
