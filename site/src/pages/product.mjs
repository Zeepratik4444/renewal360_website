import { readFileSync } from "node:fs";
import { site } from "../site.mjs";
import { ctaBand, esc } from "../layout.mjs";

const tour = JSON.parse(readFileSync(new URL("../data/tutorial.json", import.meta.url), "utf8"));
const DURATION = 307;
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const chapters = tour.chapters.filter((c) => c.id !== "outro");

const steps = [
  ["Connect or import", "Connect your CRM and inbox, or import a spreadsheet of renewals. Renewal360 builds your book of accounts with dates, value and owners."],
  ["It reads everything", "Every day it reads email, meetings, support tickets, product usage and the CRM, and keeps each account's picture current."],
  ["It finds what is missing", "Each renewal is checked for the things that decide it: value, champion, contacts, signer, pricing, process. Gaps become to-dos."],
  ["You approve the next step", "It drafts the email or proposes the move. Your team edits, approves or rejects. You decide how much runs on its own."],
];

const readiness = [
  ["Are they getting value?", "Usage, outcomes and what the customer says."],
  ["Is there a champion, and are they still answering?", "Named, engaged, and replying."],
  ["Do we know more than one person there?", "So one departure does not end the account."],
  ["Do we know who signs?", "The economic buyer, before the paperwork."],
  ["Is anything blocking this?", "Open issues, procurement, a stalled deal."],
  ["Has the money conversation happened?", "Pricing and terms, discussed in time."],
  ["Do we know how this renews?", "The process, and the next meeting booked."],
  ["Have we had a real business review lately?", "A strategic conversation, not just support."],
  ["Do they keep showing up?", "Meetings that happen, not ones that get moved."],
];

const tourSection = `<section class="section" id="tour">
  <div class="wrap">
    <div class="section-head reveal">
      <p class="eyebrow">Product tour</p>
      <h2>See Renewal360 on a real workspace, in five minutes.</h2>
      <p class="body-lg">Follow Oliver, a customer success manager, and Nayeem, who leads his team, through a working day on our Ganvix demo workspace: the Action Center, an at-risk account, Ask Nuva, Renewal Prep, the manager view and the automation settings.</p>
    </div>
    <figure class="video reveal">
      <video id="tour-video" controls preload="none" playsinline poster="/video/tutorial.jpg" width="1280" height="720">
        <source src="/video/tutorial.mp4" type="video/mp4">
        <a href="/video/tutorial.mp4">Download the product tour</a>
      </video>
      <figcaption>Renewal360 product tour, ${mmss(DURATION)}. Recorded from the real app.</figcaption>
    </figure>
    <ol class="chapters" aria-label="Chapters">${chapters.map((c) => `<li><a href="#tour" data-seek="${c.start}"><time datetime="PT${c.start}S">${mmss(c.start)}</time>${esc(c.title)}</a></li>`).join("")}</ol>
    <details class="transcript">
      <summary>Read the transcript</summary>
      ${tour.chapters.map((c) => `<h3>${esc(c.title)}</h3><p>${esc(c.text)}</p>`).join("")}
    </details>
  </div>
</section>`;

const body = `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">How it works</p>
    <h1>The renewal work, done every day. Your team makes the calls.</h1>
    <p class="lede">Renewal360 watches every account, finds what each renewal is missing, ranks where your time pays off, and prepares the next step for your approval.</p>
    <div class="actions center"><a class="btn" href="/contact">Start free trial</a><a class="btn btn-ghost" href="#tour">Watch the product tour</a></div>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap">
    <ol class="steps">${steps.map(([t, d], i) => `<li class="reveal"><span class="step-n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join("")}</ol>
  </div>
</section>
${tourSection}
<section class="section section-tint" id="readiness">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Renewal readiness</p>
      <h2>A score tells you to worry. A checklist tells you what to do.</h2>
      <p class="body-lg">Every renewal is checked against the questions that decide it. Each answer is backed by evidence from your tools: covered, at risk, a gap, or unknown when the evidence is not there yet.</p>
    </div>
    <div class="r-card reveal">
      <div class="r-head"><strong>What every renewal is checked for</strong></div>
      <ul class="r-list">${readiness.map(([q, d]) => `<li><span><b style="font-weight:600">${q}</b><br><span class="muted">${d}</span></span></li>`).join("")}</ul>
    </div>
  </div>
</section>
<section class="section" id="risk">
  <div class="wrap">
    <div class="section-head reveal">
      <p class="eyebrow">Risk, explained</p>
      <h2>See which accounts got worse since yesterday, and why.</h2>
      <p class="body-lg">Risk scores move as the evidence moves, and every account explains its own score in plain English: the customer is reviewing their tools, the tone turned negative, usage is low. Nothing changes quietly.</p>
    </div>
    <figure class="shot reveal">
      <img src="/img/product-account-risk.webp" width="1400" height="1211" loading="lazy" alt="Renewal360 risk analysis for one account: a 74.5 risk score with a plain-English explanation, key risk drivers, risk by factor, the score trend and a recommended next step">
      <figcaption>Risk analysis on one account: the score, the reasons, risk by factor and the suggested next step.</figcaption>
    </figure>
    <figure class="shot reveal" style="margin-top:28px">
      <img src="/img/product-risk.webp" width="1600" height="509" loading="lazy" alt="Renewal360 risk score movements: accounts that got worse or better, with score, change, risk level, days to renewal and ARR, next to a renewal calendar">
      <figcaption>Risk score movements and the renewal calendar, on our Ganvix demo workspace.</figcaption>
    </figure>
  </div>
</section>
<section class="section section-night" id="control">
  <div class="wrap">
    <div class="section-head reveal">
      <p class="eyebrow eyebrow-light">Approvals and automation</p>
      <h2>It writes. You approve. Nothing leaves until you say so.</h2>
      <p class="body-lg">Drafts wait in an approval queue where your team can edit, approve or reject them. When a routine step has earned your trust, you can let it go on its own, and take that back at any time.</p>
    </div>
    <div class="levels reveal">
      <div><h3><i></i>Human approval by default</h3><p>Every draft waits for someone on your team before it reaches a customer.</p></div>
      <div><h3><i></i>Extra care for key accounts</h3><p>Your most important accounts and anything about price or contract wording stay in human hands.</p></div>
      <div><h3><i></i>Pause at any time</h3><p>Stop outgoing email for one account, or for everyone, whenever you need to.</p></div>
    </div>
  </div>
</section>
<section class="section" id="playbook">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Renewal Prep and playbooks</p>
      <h2>Your renewal process, written down once and run for every account.</h2>
    </div>
    <div class="reveal">
      <p class="body-lg">Set the steps your team takes before a renewal: check-ins, the who-signs question, the business review, the notice-window reminder for auto-renewing contracts. For each step, choose whether Renewal360 reminds you, drafts it for you, or sends it once trusted.</p>
      <ul class="ticks">
        <li>Company and team playbooks, so each team can work its own way</li>
        <li>Separate handling for auto-renewing contracts</li>
        <li>Routine emails wait in Renewal Prep: waiting, scheduled, sent and stopped, always in view</li>
        <li>Customers are never asked the same question twice across contracts</li>
      </ul>
      <p class="more"><a href="/blog/how-to-build-a-renewal-playbook-from-scratch">How to build a renewal playbook &rarr;</a></p>
    </div>
  </div>
</section>
<section class="section section-tint" id="nuva">
  <div class="wrap split split-media">
    <div class="reveal">
      <p class="eyebrow">Ask Nuva</p>
      <h2>An assistant that already knows the account.</h2>
      <p class="body-lg">Nuva answers questions about any account or the whole book, with the facts and the activity behind them: how is this account doing, what changed this week, which renewals this quarter have no business review. It can draft a check-in for you, which waits for approval like everything else.</p>
    </div>
    <figure class="shot reveal" style="max-width:380px;justify-self:center">
      <img src="/img/product-nuva.webp" width="640" height="1080" loading="lazy" alt="Ask Nuva panel answering how Quarry Robotics is doing: value, renewal date, risk score, owner, next step, risk factors and recent activity, with suggested follow-up questions">
    </figure>
  </div>
</section>
<section class="section" id="managers">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">For CS leaders</p>
      <h2>The whole book at a glance, and where to step in first.</h2>
    </div>
    <div class="reveal">
      <p class="body-lg">The executive summary shows total value, revenue at risk, renewal rate and accounts that have gone quiet. This quarter's renewals are split by risk, the urgency chart places each at-risk account by how close it is to renewal, and the gaps view shows what is missing across every renewal, sorted by the money at stake.</p>
      <ul class="ticks">
        <li>Revenue at risk, live from the source, not a spreadsheet built the night before</li>
        <li>Gaps across the book, so coaching goes where it matters most</li>
        <li>Alerts to Slack, with quiet hours set by managers</li>
      </ul>
    </div>
  </div>
  <div class="wrap" style="margin-top:48px">
    <figure class="shot reveal">
      <img src="/img/product-exec.webp" width="1600" height="760" loading="lazy" alt="Renewal360 executive summary: total ARR, at-risk revenue, renewal rate, average deal size and silent accounts, the quarter's renewals split by risk, and a renewal urgency chart of at-risk accounts">
      <figcaption>The executive summary for a CS leader, on our Ganvix demo workspace.</figcaption>
    </figure>
  </div>
</section>
<section class="section section-tint" id="questions">
  <div class="wrap narrow">
    <div class="section-head reveal"><p class="eyebrow">Straight answers</p><h2>How Renewal360 handles renewal risk</h2></div>
    <div class="qa">
      <div><h3>How do you identify at-risk accounts before the renewal conversation starts?</h3><p class="answer">Look for what is missing, not just what went wrong. Renewal360 checks every renewal for a live champion, a second contact, a known signer, proof of value and an agreed price, and watches for silence, negative replies, falling usage and open issues, months before the date.</p></div>
      <div><h3>Why do customer success teams miss renewal risks until it is too late?</h3><p>Because the signals sit in different tools, and a quiet account looks healthy. A champion leaving shows up in email, falling usage in analytics, an open issue in the support desk. Unless something reads all of them for every account, the first clear signal is the cancellation.</p></div>
      <div><h3>How can teams create renewal-risk segments?</h3><p>Group renewals by risk level and time left, then by the main gap: no champion, no signer, no recent business review, pricing not agreed. Each segment gets its own next step. Renewal360 builds these groups automatically and shows them by money at stake.</p></div>
      <div><h3>Can AI draft renewal emails and require CSM approval before sending?</h3><p>Yes. That is how Renewal360 works by default: every draft waits in an approval queue, and nothing reaches a customer until someone on your team approves it.</p></div>
    </div>
  </div>
</section>
${ctaBand()}`;

export default {
  path: "/product",
  title: "How Renewal360 works",
  seoTitle: "How Renewal360 Works: Renewal Risk to Approved Action",
  description: "How Renewal360 works: it reads your CRM, inbox, tickets and usage, checks each renewal for what is missing, explains risk, and drafts outreach your team approves.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Renewal360 product tour",
      description: "A five-minute tour of Renewal360 recorded from the real app: the Action Center, an at-risk account, Ask Nuva, Renewal Prep, the manager view, the gaps view and automation rules.",
      thumbnailUrl: `${site.url}/video/tutorial.jpg`,
      contentUrl: `${site.url}/video/tutorial.mp4`,
      uploadDate: "2026-11-18",
      duration: `PT${Math.floor(DURATION / 60)}M${DURATION % 60}S`,
      publisher: { "@id": `${site.url}/#organization` },
      transcript: tour.chapters.map((c) => c.text).join(" "),
      hasPart: chapters.map((c, i) => ({
        "@type": "Clip",
        name: c.title,
        startOffset: c.start,
        endOffset: (chapters[i + 1] || { start: DURATION }).start,
        url: `${site.url}/product#t=${c.start}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How Renewal360 works",
      step: steps.map(([t, d], i) => ({ "@type": "HowToStep", position: i + 1, name: t, text: d })),
    },
  ],
  body,
};
