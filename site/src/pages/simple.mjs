import { readFileSync } from "node:fs";
import { site } from "../site.mjs";
import { ctaBand, esc } from "../layout.mjs";
import { faqs, faqList, faqSchema } from "./faq-data.mjs";

const about = {
  path: "/about",
  title: "About",
  seoTitle: "About Renewal360: Built by CS Practitioners | Renewal360",
  pageType: "AboutPage",
  description: "Renewal360 is built by Ganvix Technologies in Noida, India, by people who did customer success work and wanted renewals to stop depending on memory and spreadsheets.",
  schema: [{
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "More time for people",
    description: "A short film about what Renewal360 is for: letting AI handle the renewal work so customer success teams can spend their time with customers.",
    thumbnailUrl: `${site.url}/video/more-time-for-people.jpg`,
    contentUrl: `${site.url}/video/more-time-for-people.mp4`,
    uploadDate: "2026-11-18",
    duration: "PT1M36S",
    publisher: { "@id": `${site.url}/#organization` },
  }],
  body: `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">About</p>
    <h1>The best part of customer success has always been the people.</h1>
    <p class="lede">Renewal360 exists so CS teams can spend their time there, and let software handle the renewal busywork.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap narrow">
    <figure class="video reveal">
      <video controls preload="none" playsinline poster="/video/more-time-for-people.jpg" width="1280" height="720">
        <source src="/video/more-time-for-people.mp4" type="video/mp4">
        <a href="/video/more-time-for-people.mp4">Download the film</a>
      </video>
      <figcaption>More time for people, 1 minute 36 seconds.</figcaption>
    </figure>
  </div>
  <div class="wrap narrow prose-lg" style="margin-top:56px">
    <p>Renewal360 was started by people who had done customer success work at SaaS companies and kept hitting the same wall: manual renewal tracking ate the hours that should have gone into customer conversations.</p>
    <p>Every month went on spreadsheets, calendar reminders and near-identical renewal emails. Even then, renewals slipped through or got attention at the last minute. The tools on offer were either too complex, needing months of setup and an operations team, or too simple, little more than email templates.</p>
    <p>So we built the tool we wanted: one that reads everything a team already has, shows what each renewal is missing, does the follow-up work, and leaves every decision that matters with a person.</p>
  </div>
</section>
<section class="section section-tint">
  <div class="wrap">
    <div class="section-head reveal"><h2>What we hold ourselves to</h2></div>
    <div class="card-grid three">
      <article class="card reveal"><h3>Practical AI</h3><p>AI where it saves real time: reading the signals, drafting the routine work. People stay in charge of what goes out.</p></article>
      <article class="card reveal"><h3>Show the reasons</h3><p>A risk score you cannot question is a guess. Renewal360 always says why an account was flagged.</p></article>
      <article class="card reveal"><h3>No hype</h3><p>We do not promise to replace your CS team or double your renewal rate. We save your team time and make sure no renewal is left to memory.</p></article>
    </div>
  </div>
</section>
<section class="section">
  <div class="wrap narrow center reveal">
    <p class="eyebrow">The company</p>
    <h2><a href="${site.companyUrl}" style="color:inherit;text-decoration:none">${esc(site.company)}</a></h2>
    <p class="body-lg">Renewal360 is built by <a href="${site.companyUrl}">Ganvix</a>.</p>
    <p class="body-lg">${esc(site.address)}</p>
    <p class="body-lg"><a href="mailto:${site.email}">${site.email}</a></p>
  </div>
</section>
${ctaBand()}`,
};

const google = `<svg aria-hidden="true" viewBox="0 0 18 18" width="18" height="18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>`;

const contact = {
  path: "/contact",
  title: "Start your free trial",
  seoTitle: "Start a Free Renewal360 Trial or Talk to Us | Renewal360",
  pageType: "ContactPage",
  description: "Start a free Renewal360 trial with your work email or Google account: 25 accounts free, 7 days of the full Scale plan, no credit card. Or talk to a person first.",
  body: `<section class="section contact">
  <div class="wrap split contact-grid">
    <div>
      <p class="eyebrow">Free trial</p>
      <h1>Start your Renewal360 trial.</h1>
      <p class="lede">Free for 25 accounts, with 7 days of the full Scale plan for every new sign-up. No credit card.</p>
      <form class="form card" id="trial-form" novalidate style="margin-top:32px">
        <h2>Create your workspace</h2>
        <p class="lead">We will email you a link to set your password.</p>
        <div class="field"><label for="t-email">Work email</label><input id="t-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required></div>
        <div class="field"><label for="t-company">Company</label><input id="t-company" name="company" autocomplete="organization" required></div>
        <label class="check"><input type="checkbox" id="t-terms" name="terms"> <span>I agree to the <a href="/terms" target="_blank" rel="noopener">Terms of Service</a> and <a href="/terms#privacy" target="_blank" rel="noopener">Privacy Policy</a>.</span></label>
        <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn btn-block" type="submit">Start free trial</button>
        <div class="or">or</div>
        <a class="btn btn-block btn-google" id="google-signup" href="#" aria-disabled="true">${google} Start with Google</a>
        <p class="form-note" role="status" aria-live="polite"></p>
      </form>
    </div>
    <div class="side-stack">
      <div class="card">
        <h2>What happens next</h2>
        <ol class="next-steps">
          <li><div><b>Set your password</b><p>Open the link in your email and choose a password.</p></div></li>
          <li><div><b>Bring in your renewals</b><p>Connect your CRM and inbox, or import a spreadsheet.</p></div></li>
          <li><div><b>Start your day in the Action Center</b><p>See which renewals need attention and what each is missing, with drafts ready to approve.</p></div></li>
        </ol>
      </div>
      <form class="form card" id="talk-form" novalidate>
        <h2 id="talk">Talk to us</h2>
        <p class="lead">Rather speak to a person first? We reply within one business day.</p>
        <div class="field"><label for="k-name">Your name</label><input id="k-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="k-email">Work email</label><input id="k-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="k-company">Company</label><input id="k-company" name="company" autocomplete="organization" required></div>
        <div class="field"><label for="k-phone">Phone <span class="opt">Optional</span></label><input id="k-phone" name="phone" type="tel" autocomplete="tel"></div>
        <div class="field"><label for="k-msg">What would you like to talk about? <span class="opt">Optional</span></label><textarea id="k-msg" name="message" rows="3"></textarea></div>
        <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="btn btn-ghost btn-block" type="submit">Talk to us</button>
        <p class="form-note" role="status" aria-live="polite"></p>
        <p class="muted">Or email <a href="mailto:${site.email}">${site.email}</a>.</p>
      </form>
    </div>
  </div>
</section>`,
};

const faq = {
  path: "/faq",
  title: "Frequently asked questions",
  seoTitle: "Renewal360 FAQ: Setup, AI, Integrations and Pricing",
  description: "Answers about Renewal360: how it spots renewal risk, whether the AI sends emails on its own, which tools connect, setup time, pricing, the free trial and data protection.",
  schema: [faqSchema(faqs)],
  body: `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">FAQ</p>
    <h1>Frequently asked questions</h1>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap narrow">${faqList(faqs)}</div>
</section>
${ctaBand("Still have a question?", "Ask us directly. We would rather tell you honestly whether Renewal360 fits than oversell it.")}`,
};

const security = {
  path: "/security",
  title: "Security and data",
  seoTitle: "Renewal360 Security: Approvals, Access and Your Data",
  description: "How Renewal360 protects your data and your customers: human approval before anything is sent, pause controls, role-based access, encryption, audit logs and no model training.",
  body: `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">Security</p>
    <h1>Built so nothing reaches your customers without you.</h1>
    <p class="lede">Renewal360 writes to your customers on your behalf, so control comes first: what it may send, who can see what, and what happens to your data.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap">
    <h2 style="margin-bottom:28px">Control over what is sent</h2>
    <dl class="def-grid">
      <div><dt>Approval by default</dt><dd>Every email drafted by Renewal360 waits for a person on your team to edit, approve or reject it.</dd></div>
      <div><dt>Automation only when earned</dt><dd>Routine steps can go out on their own only after you allow it, and you can take that back at any time.</dd></div>
      <div><dt>Key accounts stay human</dt><dd>Your most important accounts, and anything about price or contract wording, stay in human hands.</dd></div>
      <div><dt>Pause switch</dt><dd>Stop outgoing email for a single account or for the whole company at once.</dd></div>
      <div><dt>Sent from your own mailbox</dt><dd>Approved emails go out from the sender's own Gmail or Outlook, so replies come back to them.</dd></div>
      <div><dt>Limits per customer</dt><dd>Admins set how many automatic emails a customer can receive, so nobody is over-contacted.</dd></div>
    </dl>
  </div>
  <div class="wrap" style="margin-top:72px">
    <h2 style="margin-bottom:28px">Access and data</h2>
    <dl class="def-grid">
      <div><dt>Roles and permissions</dt><dd>Admins, managers and CSMs see and do different things. Managers see their own teams.</dd></div>
      <div><dt>Sign-in</dt><dd>Sign in with email and password or with Google, with two-step verification available.</dd></div>
      <div><dt>Encryption</dt><dd>Data is encrypted at rest (AES-256) and in transit (TLS 1.2 or later), on Google Cloud Platform.</dd></div>
      <div><dt>Audit logging</dt><dd>Administrative and data access events are logged.</dd></div>
      <div><dt>No model training</dt><dd>We have not built, and do not run, any process that uses your customer data to train or fine-tune our own AI models.</dd></div>
      <div><dt>Retention and deletion</dt><dd>After a subscription ends, data is kept for up to 30 days in case you return, then deleted unless the law requires otherwise.</dd></div>
    </dl>
    <p class="body-lg" style="margin-top:40px">The full details, including which Google and Microsoft permissions are requested and why, are in our <a href="/terms#privacy">privacy policy</a>. Security questions: <a href="mailto:${site.email}">${site.email}</a>.</p>
  </div>
</section>
${ctaBand()}`,
};

const legalHtml = readFileSync(new URL("../legal/terms.html", import.meta.url), "utf8");
const toc = [...legalHtml.matchAll(/<h([23]) id="([^"]+)">([^<]+)<\/h\1>/g)]
  .map(([, lvl, id, t]) => lvl === "2" ? `<li style="margin-top:12px"><a href="#${id}"><b>${t.trim()}</b></a></li>` : `<li><a href="#${id}">${t.trim()}</a></li>`)
  .join("");
const terms = {
  path: "/terms",
  title: "Terms of Service and Privacy Policy",
  seoTitle: "Terms of Service and Privacy Policy | Renewal360",
  description: "Terms of Service and Privacy Policy for Renewal360, run by Ganvix Technologies Pvt Ltd: accounts, AI output, Google and Microsoft data, security and your rights.",
  body: `<section class="page-hero legal-hero">
  <div class="wrap narrow">
    <p class="eyebrow">Legal</p>
    <h1>Terms of Service and Privacy Policy</h1>
    <p class="muted">${esc(site.company)}, ${esc(site.address)}. Last updated 6 September 2026.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap legal-grid">
    <nav class="legal-toc" aria-label="Sections"><ol>${toc}</ol></nav>
    <article class="prose legal">${legalHtml}</article>
  </div>
</section>`,
};

const setPassword = {
  path: "/set-password",
  title: "Set your password",
  description: "Set the password for your Renewal360 account.",
  noindex: true,
  body: `<section class="section contact">
  <div class="wrap" style="max-width:520px">
    <form class="form card" id="password-form" novalidate>
      <h1 style="font-size:1.8rem">Set your password</h1>
      <div class="fields" style="display:grid;gap:18px">
        <div class="field"><label for="p1">New password</label><input id="p1" name="password" type="password" autocomplete="new-password" minlength="8" required></div>
        <div class="field"><label for="p2">Confirm password</label><input id="p2" name="confirm" type="password" autocomplete="new-password" required></div>
        <button class="btn btn-block" type="submit">Set password</button>
      </div>
      <p class="form-note" role="status" aria-live="polite"></p>
      <a class="btn btn-block" id="pw-signin" href="${site.appUrl}/" hidden>Sign in</a>
    </form>
  </div>
</section>`,
};

const paymentSuccess = {
  path: "/payment-success",
  title: "Payment received",
  description: "Your Renewal360 payment was received.",
  noindex: true,
  body: `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">Thank you</p>
    <h1>Payment received.</h1>
    <p class="lede">Your plan is active. A receipt is on its way to your email.</p>
    <div class="actions center"><a class="btn" href="${site.appUrl}/">Go to Renewal360</a></div>
  </div>
</section>`,
};

const notFound = {
  path: "/404",
  title: "Page not found",
  description: "This page does not exist.",
  noindex: true,
  body: `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">404</p>
    <h1>We could not find that page.</h1>
    <p class="lede">It may have moved when we rebuilt the site.</p>
    <div class="actions center"><a class="btn" href="/">Go to the home page</a><a class="btn btn-ghost" href="/blog">Read the blog</a></div>
  </div>
</section>`,
};

export default [about, contact, faq, security, terms, setPassword, paymentSuccess, notFound];
