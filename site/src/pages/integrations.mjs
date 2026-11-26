import { site } from "../site.mjs";
import { ctaBand, esc } from "../layout.mjs";

// Only connectors the product has today. "plan" mirrors the pricing table.
export const tools = [
  {
    slug: "salesforce",
    desc: "Connect Salesforce to Renewal360 to build your renewal book from accounts, contracts and contacts, flag stalled deals, and check every renewal for a champion and signer.",
    name: "Salesforce",
    kind: "CRM",
    plan: "Scale plan",
    short: "Accounts, contracts, renewal dates, value and contacts from Salesforce, kept in sync.",
    reads: ["Accounts and their owners", "Contracts, renewal dates and contract value", "Opportunities and deal stage", "Contacts and their roles"],
    does: [
      "Builds your renewal book from Salesforce, so nobody re-types renewal dates or values.",
      "Notices when a deal stalls at a stage, and flags it with the days left until renewal.",
      "Checks the contact list for a champion, a second contact and the person who signs.",
    ],
    setup: "An admin connects Salesforce once for the whole company from the app's settings. Renewal360 then keeps accounts and renewals in step with Salesforce.",
  },
  {
    slug: "hubspot",
    desc: "Connect HubSpot to Renewal360 to turn companies and deals into a renewal book, flag deals that stop moving, and see CRM data next to email, tickets and product usage.",
    name: "HubSpot",
    kind: "CRM",
    plan: "SMB plan and above",
    short: "Companies, deals, renewal dates and contacts from HubSpot CRM.",
    reads: ["Companies and owners", "Deals, renewal dates and amounts", "Deal stage and activity", "Contacts and associations"],
    does: [
      "Turns HubSpot companies and deals into a renewal book with dates, value and owner.",
      "Flags renewals whose deal has stopped moving, and accounts with only one known contact.",
      "Puts the CRM record next to email, meetings, tickets and usage on one account page.",
    ],
    setup: "An admin connects HubSpot once for the company from the app's settings.",
  },
  {
    slug: "google-workspace",
    desc: "Connect Gmail and Google Calendar to Renewal360 to spot customers going quiet, surface replies waiting on you, and send approved renewal emails from your own inbox.",
    name: "Google Workspace",
    kind: "Email and calendar",
    plan: "",
    short: "Gmail and Google Calendar: customer emails, meetings, and sending approved emails from your own inbox.",
    reads: ["Email threads with your customers' contacts", "Replies, silence and the tone of recent messages", "Renewal-related meetings on your calendar", "Your free and busy times, to offer meeting slots"],
    does: [
      "Notices when a customer goes quiet, a champion stops replying or the tone turns negative.",
      "Puts customers waiting for a reply at the top of your list.",
      "Sends the emails you approve from your own Gmail, so replies come back to you.",
    ],
    setup: "Each person connects their own Google account, or an admin connects a company account. You choose how much past email to import before you sign in. Details of the Google permissions are in the privacy policy.",
  },
  {
    slug: "microsoft-365",
    desc: "Connect Outlook mail and calendar to Renewal360 to spot accounts going quiet, surface replies that need an answer, and send approved renewal emails from your own mailbox.",
    name: "Microsoft 365",
    kind: "Email and calendar",
    plan: "",
    short: "Outlook mail and calendar: customer emails, meetings, and sending approved emails from your own mailbox.",
    reads: ["Outlook email threads with your customers' contacts", "Replies, silence and the tone of recent messages", "Renewal-related meetings on your calendar", "Your free and busy times, to offer meeting slots"],
    does: [
      "Spots accounts going quiet and replies that need an answer.",
      "Adds Microsoft Teams links to renewal meetings you ask it to create.",
      "Sends the emails you approve from your own Outlook mailbox.",
    ],
    setup: "Each person connects their own Microsoft account, or an admin connects a company account. The Microsoft Graph permissions are listed in the privacy policy.",
  },
  {
    slug: "zendesk",
    desc: "Connect Zendesk to Renewal360 so open and escalated support tickets count as renewal risk, and every renewal call starts with the customer's unresolved issues in view.",
    name: "Zendesk",
    kind: "Support desk",
    plan: "",
    short: "Support tickets as renewal signals: open issues, escalations and unhappy customers before the renewal.",
    reads: ["Tickets for each customer account", "Open, pending and escalated issues", "How long issues have been open"],
    does: [
      "Raises renewal risk when serious tickets are open close to the renewal date.",
      "Shows unresolved issues on the account page, so you never walk into a renewal call blind.",
      "Lets you answer \"is anything blocking this renewal?\" with evidence, not memory.",
    ],
    setup: "An admin connects Zendesk once for the company from the app's settings.",
  },
  {
    slug: "amplitude",
    desc: "Connect Amplitude to Renewal360 so falling product usage flags an account months before its renewal date, and value conversations rest on real usage, not guesses.",
    name: "Amplitude",
    kind: "Product analytics",
    plan: "",
    short: "Product usage per account, so falling usage shows up before the renewal does.",
    reads: ["Usage per customer account", "Changes in usage over time"],
    does: [
      "Flags accounts whose usage is dropping, one of the earliest signs a customer may not renew.",
      "Helps answer \"are they getting value?\" with real usage, not a feeling.",
    ],
    setup: "An admin connects Amplitude for the company. Accounts are matched to your customers in Renewal360.",
  },
  {
    slug: "slack",
    desc: "Connect Slack to Renewal360 to get alerts when an account becomes high risk or a renewal needs attention, in the channels your customer success team already reads.",
    name: "Slack",
    kind: "Alerts",
    plan: "SMB plan and above",
    short: "At-risk alerts and renewal notifications in the Slack channels and messages your team already reads.",
    reads: ["Nothing from your workspace's conversations; Slack is used to deliver alerts"],
    does: [
      "Sends alerts when an account becomes high risk or a renewal needs attention.",
      "Lets managers choose which alerts their team gets, and when.",
    ],
    setup: "An admin connects Slack for the company and picks where alerts go.",
  },
  {
    slug: "csv-import",
    desc: "Import renewals into Renewal360 from a CSV file and start the same day: accounts, renewal dates, values, owners and contacts, with every row checked for problems.",
    name: "CSV import",
    kind: "Import",
    plan: "Every plan",
    short: "Start from a spreadsheet: import your renewals and contacts from a CSV file in minutes.",
    reads: ["Accounts, renewal dates and values from your spreadsheet", "Owners and contacts"],
    does: [
      "Gets you started the same day, without connecting a CRM first.",
      "Checks every row and tells you which columns or values need fixing.",
    ],
    setup: "Download your renewals sheet as CSV and upload it from the app. Large files import in the background.",
  },
];

const hub = {
  path: "/integrations",
  title: "Integrations",
  seoTitle: "Renewal360 Integrations: CRM, Email, Support, Usage",
  pageType: "CollectionPage",
  description: "Renewal360 connects to Salesforce, HubSpot, Google Workspace, Microsoft 365, Zendesk, Amplitude and Slack, or starts from a CSV, to see every renewal signal in one place.",
  schema: [{
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Renewal360 integrations",
    itemListElement: tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: `${site.url}/integrations/${t.slug}` })),
  }],
  body: `<section class="page-hero">
  <div class="wrap narrow center">
    <p class="eyebrow">Integrations</p>
    <h1>Every renewal signal, from the tools you already use.</h1>
    <p class="lede">Renewals are lost in the gaps between tools: the CRM has the date, the inbox has the silence, the support desk has the open issue. Renewal360 reads them together.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="wrap card-grid three">
    ${tools.map((t) => `<a class="post-card reveal" href="/integrations/${t.slug}"><span class="post-tag">${esc(t.kind)}</span><h2>${esc(t.name)}</h2><p>${esc(t.short)}</p>${t.plan ? `<span class="post-meta">${esc(t.plan)}</span>` : ""}</a>`).join("")}
  </div>
</section>
${ctaBand("Start with a spreadsheet, connect the rest later.", "Import a CSV and see your renewals today. Connect your CRM and inbox when you are ready.")}`,
};

const toolPages = tools.map((t) => ({
  path: `/integrations/${t.slug}`,
  title: `${t.name} integration`,
  seoTitle: `${t.name} Integration for Renewals | Renewal360`.length <= 60 ? `${t.name} Integration for Renewals | Renewal360` : `${t.name} Integration | Renewal360`,
  description: t.desc,
  body: `<section class="page-hero">
  <div class="wrap narrow">
    <p class="eyebrow"><a href="/integrations">Integrations</a> · ${esc(t.kind)}</p>
    <h1>Renewal360 and ${esc(t.name)}</h1>
    <p class="lede">${esc(t.short)}</p>
    ${t.plan ? `<p class="muted" style="margin-top:14px">Available on: ${esc(t.plan)}.</p>` : ""}
  </div>
</section>
<section class="section section-tight">
  <div class="wrap split">
    <div>
      <h2>What Renewal360 reads</h2>
      <ul class="ticks">${t.reads.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
    </div>
    <div>
      <h2>What it does with it</h2>
      <ul class="ticks">${t.does.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
    </div>
  </div>
  <div class="wrap narrow" style="margin-top:56px">
    <h2>How to connect</h2>
    <p class="body-lg" style="margin-top:14px">${esc(t.setup)}</p>
    <p class="more"><a href="/integrations">All integrations &rarr;</a> · <a href="/security">How we protect your data &rarr;</a></p>
  </div>
</section>
${ctaBand()}`,
}));

export default [hub, ...toolPages];
