import { esc } from "../layout.mjs";

// Answer first, then detail. Only claims the product and the terms back today.
export const faqs = [
  {
    q: "What is Renewal360?",
    a: "Renewal360 is renewal software for SaaS customer success teams. It reads your CRM, inbox, calendar, support tickets and product usage, shows which renewals are at risk and what is missing from each one, and drafts the next step for your team to approve.",
  },
  {
    q: "Who is Renewal360 for?",
    a: "Customer success, account management and RevOps teams at growing SaaS companies that manage recurring renewals. It suits teams moving off spreadsheets and CRM reminders, and teams that find enterprise CS platforms too heavy or too expensive for their size.",
  },
  {
    q: "How does Renewal360 spot renewal risk early?",
    a: "It watches the signals that usually show up months before a customer leaves: an account going quiet, a champion who stops replying, a negative turn in tone, falling product usage, open support issues and a deal that has stalled. Each account gets a risk score with the reasons written out in plain English, so you know why it was flagged.",
  },
  {
    q: "Which tool identifies at-risk accounts before the renewal conversation starts?",
    a: "Renewal360 is built for exactly that. Instead of a single health number, it checks each renewal for what is missing, such as a confirmed champion, a known signer, proof of value or an agreed price, and tells you what to do about each gap well before the renewal date.",
  },
  {
    q: "Does the AI send emails to customers on its own?",
    a: "Not unless you choose to let it. By default every email Renewal360 drafts waits in an approval queue where your team can edit, approve or reject it. You can let routine steps run on their own once they have earned your trust, take that back at any time, keep key accounts in human hands, and pause outgoing email for one account or for everyone.",
  },
  {
    q: "What is Nuva?",
    a: "Nuva is the assistant inside Renewal360. Ask it how an account is doing and it answers with the facts: value, renewal date, risk, owner, next step and the activity behind them. It can also draft a check-in email, which waits for your approval like everything else.",
  },
  {
    q: "Which tools does Renewal360 connect to?",
    a: "Salesforce and HubSpot for accounts and contracts, Google Workspace (Gmail and Calendar) and Microsoft 365 (Outlook mail and calendar) for email and meetings, Zendesk for support tickets, Amplitude for product usage, and Slack for alerts. You can also import renewals from a CSV file.",
  },
  {
    q: "How long does setup take?",
    a: "You can start the same day: connect your CRM and inbox, or import a spreadsheet of your renewals, and your Action Center fills in. Paid plans include an onboarding consultation to set up your playbook and first renewal steps.",
  },
  {
    q: "How much does Renewal360 cost?",
    a: "There is a free plan for 25 accounts. Paid plans are SMB at $199 a month for 200 accounts, Growth at $599 a month for 1,000 accounts and Scale at $999 a month with unlimited accounts. Paying yearly saves 20%. The pricing page shows prices in your local currency: rupees in India, pounds in the UK and euros in the euro area.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. The Free plan covers 25 accounts with no time limit, and every new sign-up gets 7 days of the full Scale plan. No credit card is needed to start.",
  },
  {
    q: "How is Renewal360 different from our CRM?",
    a: "Your CRM stores the record. Renewal360 acts on it: it reads the CRM together with your email, meetings, support tickets and usage, finds the accounts that need attention, explains why, and drafts the outreach. It is an action layer on top of your system of record, not a replacement for it.",
  },
  {
    q: "How is Renewal360 different from Gainsight, Totango or ChurnZero?",
    a: "Those are broad customer success suites built for large teams with dedicated operations staff. Renewal360 focuses on renewals: it is quick to set up, priced for growing teams, and does the renewal follow-up work itself with your approval. See the side-by-side comparisons on our compare page.",
  },
  {
    q: "Is our data used to train AI models?",
    a: "No. We have not built, and do not run, any process that uses your customer data to train or fine-tune our own AI models. AI processing runs on Google Cloud Vertex AI, as described in our privacy policy.",
  },
  {
    q: "Where is our data stored and how is it protected?",
    a: "Data is stored on Google Cloud Platform, encrypted at rest (AES-256) and in transit (TLS 1.2 or later), with role-based access and audit logging of administrative and data access events. Details are in the privacy policy.",
  },
  {
    q: "What happens to our data if we cancel?",
    a: "Your access ends when the subscription ends. We keep your data for up to 30 days in case you come back, then delete it permanently unless the law requires us to keep it.",
  },
];

const pick = (qs) => qs.map((q) => faqs.find((f) => f.q === q));

export const homeFaqs = pick([
  "What is Renewal360?",
  "Which tool identifies at-risk accounts before the renewal conversation starts?",
  "Does the AI send emails to customers on its own?",
  "Which tools does Renewal360 connect to?",
  "Is there a free trial?",
  "How is Renewal360 different from Gainsight, Totango or ChurnZero?",
]);

export const pricingFaqs = pick([
  "How much does Renewal360 cost?",
  "Is there a free trial?",
  "How long does setup take?",
  "What happens to our data if we cancel?",
]);

export const faqList = (list) => `<div class="faq">${list
  .map((f) => `<details class="faq-item"><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
  .join("")}</div>`;

export const faqSchema = (list) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
