# Renewal360 website: SEO, AEO and GEO rebuild plan

Written 26 Nov 2026. Branch `static-site`, new site in `site/`. Owner: Pratik.

## 1. Where we start (measured, not guessed)

Search Console, property `sc-domain:renewal360.in`, 27 Apr to 24 Nov 2026:

| Measure | Value |
|---|---|
| Clicks | 33 |
| Impressions | 13,300 |
| Average click rate | 0.2% |
| Average position | 23.3 (page 3) |
| Queries | 365 |
| Pages indexed | 22 (6 not indexed: redirects, noindex, one canonical) |

- The homepage takes 25 of the 33 clicks, almost all from people already looking for us.
- The core pages are close to invisible: /features 105 impressions, /pricing 22, /faq 13. Their HTML body is an empty `<div id="app">`, so search engines and AI crawlers read nothing.
- Half of all impressions (6,838) land on one post, the Zendesk vs HubSpot vs Salesforce comparison, at position 28.5, from people comparing helpdesks. They are not renewal buyers.
- Four posts never earned an impression in 16 months.
- The seo-geo audit tool scores the site 57/100 (thren.in: 77). AEO scores 0/10 and E-E-A-T 2/10.
- copilot.renewal360.in returns 502 today, so every trial and checkout form is dead until the app is back.

## 2. Goal

Get Renewal360 named and linked when a CS or RevOps lead asks Google, ChatGPT, Perplexity or Gemini about renewal automation, renewal playbooks, spotting churn risk before a renewal, or alternatives to Gainsight, Totango and ChurnZero.

How we will know (Search Console, same property, compared with the baseline above):

| Check | Week 4 | Week 8 | Week 12 |
|---|---|---|---|
| Core pages getting impressions (home, product, pricing, compare) | all indexed | each 100+/month | each 300+/month |
| Average position, competitor-alternative queries | under 18 | under 12 | page 1 for 3+ queries |
| Average position, "renewal playbook" and "renewal automation" | under 15 | under 10 | page 1 |
| Monthly clicks (excluding brand) | 10 | 30 | 75 |
| Brand query "renew 360" / "renewal360" | position 1 | position 1 | position 1 |

These are targets, not promises. Rankings depend on Google and on competitors.

## 3. Targets (from the query data)

| # | Cluster | Evidence | Page that owns it |
|---|---|---|---|
| 1 | Gainsight, Totango, ChurnZero alternatives | about 2,400 impressions, positions 13 to 27 | New `/compare` hub + new `/compare/gainsight-alternatives`; refreshed posts `totango-alternative-faster-renewal-automation`, `churnzero-alternative-growing-saas-teams`, `gainsight-vs-totango-vs-renewal360` |
| 2 | Renewal playbook | "saas renewal playbook" 257, "renewal playbook" 123; post at 17.5 | Refreshed `how-to-build-a-renewal-playbook-from-scratch`, tied to the product's playbook |
| 3 | Renewal automation | "renewal automation" 99 at 13.8; post 997 impressions at 15.2 | Refreshed `what-is-renewal-automation`, linked from /product |
| 4 | Spotting risk before the renewal (AI-style questions) | "what platform identifies at-risk accounts before renewal" 157, "why do CS teams miss renewal risks" 168, "renewal-risk segments" at 2.6 | Answer-first FAQ blocks on /product, /faq and the refreshed posts |
| 5 | Zendesk (useful angle only) | 6,838 impressions, wrong audience | Reframe the comparison post around support tickets as a renewal signal; `/integrations/zendesk` |
| 6 | Brand | "renew 360" at 4.9, misspellings | Readable homepage, Organization schema, off-site profiles |

Skipped on purpose: "metrics.cs" (another company's brand), Reward360, generic "zendesk vs hubspot" head terms.

## 4. Site structure

| URL | Status | Notes |
|---|---|---|
| `/` | rebuilt | Hero, what Renewal360 is (definition), problem, readiness, approvals, Nuva, integrations strip, FAQ, blog |
| `/product` | new | Replaces /features, /how-it-works, /glimpses (301 redirects) |
| `/pricing` | rebuilt | Same plans and prices as today, all four currencies, yearly toggle, comparison table, FAQ |
| `/compare` | new | Hub: Renewal360 vs Gainsight, Totango, ChurnZero, spreadsheets (ItemList) |
| `/compare/gainsight-alternatives` | new | Owns "gainsight alternatives / competitors" |
| `/integrations` + `/integrations/<tool>` | new | Only connectors that exist: Salesforce, HubSpot, Gmail, Outlook, Google Calendar, Zendesk, Amplitude, Slack, CSV import |
| `/security` | new | Approvals, pause controls, sign-in, data use, export and deletion |
| `/glossary` | new | DefinedTermSet: ARR at risk, GRR, NRR, notice period, auto-renewal, economic buyer, champion, renewal readiness... |
| `/faq`, `/about`, `/contact` | rebuilt | Contact keeps "Start trial" (email + company, Google sign-up) and "Talk to us" |
| `/blog`, `/blog/<slug>` | ported | **Every existing slug kept exactly.** Content refreshed in phases 2 to 4 |
| `/terms`, `/privacy` | ported | Text unchanged; legal review is the user's |
| `/payment-success`, `/set-password` | kept | App flows, noindex |

Every page: static HTML readable without JavaScript, one H1, canonical, Open Graph, page-type schema, BreadcrumbList, FAQPage where there are questions, a Markdown twin (`/x.md`), and an entry in sitemap.xml, llms.txt and llms-full.txt.

## 5. Content rules

1. Only claims the product backs today. No made-up numbers, customers or reviews. Testimonials stay off until real customers agree to be quoted by name.
2. Benefits, not internal mechanics: no thresholds, counts or decision rules from the app.
3. The AI is called **Nuva**. The product is Renewal360 (not "Renewal Copilot").
4. No long dashes anywhere (the build fails on them).
5. Answer first: each question heading gets a one or two sentence direct answer, then detail.
6. Comparisons are fair: say where each competitor is strong, and where Renewal360 is the better fit.
7. Prices exactly as on the current site.

## 6. Phases

| Phase | What | Status |
|---|---|---|
| 0 | Audit, Search Console access for the service account on `sc-domain:renewal360.in` | done 26 Nov |
| 1 | Static site foundation: build, layout, styles, home, product, pricing, contact, about, faq, security, legal, 404, blog port, robots, sitemap, llms, Markdown twins; product tour + overview + brand film videos from the reels (real Ganvix workspace); nginx config | done 26 Nov (branch `static-site`, not deployed) |
| 2 | Compare hub and Gainsight alternatives page (done); competitor tables made neutral (done); full rewrite of the three competitor posts | in progress |
| 3 | Glossary and integrations hub + 8 connector pages (done); refresh playbook + renewal automation posts, Zendesk reframe | in progress |
| 4 | Refresh or merge the four zero-impression posts and the rest of the blog | later |
| 5 | Launch: local checks (score, no-JS, links), deploy with the user's OK, nginx redirects, sitemap resubmit, IndexNow, URL inspection | with OK |
| 6 | Off-site entity: LinkedIn page, G2, Capterra, Crunchbase, Product Hunt, then `sameAs` | needs the user's accounts |
| 7 | Measure at weeks 2, 4, 8, 12 against section 2; refresh what slips | ongoing |

## 7. Open items

- The app (copilot.renewal360.in) must be back before launch, or trial and checkout forms fail.
- The pricing table still lists Google Sheets and Pipedrive; the app has no connector for either. Kept as decided in October, but no integration pages are made for them.
- Security wording that cannot be verified from the product (for example "SOC 2-ready", AES-256 at rest, data region) is left off until confirmed.
- Legal pages are ported as they are; review is the user's.
