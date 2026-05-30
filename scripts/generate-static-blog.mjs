import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteUrl = "https://renewal360.in";
const sourceDir = path.join(root, "src", "content", "blog");
const outputDir = path.join(root, "public", "blog");
const publicDir = path.join(root, "public");
const gtmId = process.env.VITE_GTM_ID;

const posts = [
	{
		slug: "how-renewal360-works",
		source: "blog-7-how-renewal360-works.html",
		title:
			"How Renewal360 Works: The Renewal Automation Process Built to Prevent Silent Churn",
		description:
			"See how Renewal360 turns CRM data, renewal milestones, AI-drafted outreach, smart guards, and human approval into an action-first renewal workflow.",
		tags: ["How It Works", "Renewal Automation", "Customer Success"],
		readTime: "8 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "churnzero-alternative-growing-saas-teams",
		source: "blog-4-churnzero-alternative-growing-saas-teams.html",
		title: "ChurnZero Alternative for Growing SaaS Teams",
		description:
			"A practical guide for SaaS teams that need renewal automation, AI follow-up, and faster action without a heavy platform rollout.",
		tags: ["ChurnZero Alternative", "Customer Success", "Renewal Automation"],
		readTime: "8 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "totango-alternative-faster-renewal-automation",
		source: "blog-5-totango-alternative-faster-renewal-automation.html",
		title: "Totango Alternative for Faster Renewal Automation",
		description:
			"A focused comparison for teams that want AI-assisted renewal follow-up and action-first workflows without a broad platform rollout.",
		tags: ["Totango Alternative", "Renewal Automation", "SaaS Retention"],
		readTime: "8 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "what-is-renewal-automation",
		source: "blog-6-what-is-renewal-automation.html",
		title: "What is Renewal Automation? And Why Your CS Team Needs It",
		description:
			"A plain-English guide to renewal automation, why reminder emails are not enough, and how action-first workflows reduce churn risk.",
		tags: ["Renewal Automation", "Customer Success", "SaaS Churn"],
		readTime: "7 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "gainsight-vs-totango-vs-renewal360",
		source: "blog-3-gainsight-vs-totango-vs-renewal360.html",
		title:
			"Gainsight vs Totango vs Renewal360 - Which Renewal Automation Tool is Right for You?",
		description:
			"A buyer-focused comparison for SaaS teams deciding whether they need a broad customer success platform or a faster renewal automation engine.",
		tags: ["Comparison", "Gainsight Alternative", "Totango Alternative"],
		readTime: "9 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "how-to-automate-saas-renewal-emails",
		source: "blog-1-automate-saas-renewal-emails.html",
		title: "How to Automate SaaS Renewal Emails (Step-by-Step)",
		description:
			"A practical walkthrough of CRM sync, health scoring, branching sequences, AI drafts, reply detection, and human approval workflows.",
		tags: ["Automation", "Customer Success"],
		readTime: "8 min read",
		publishedAt: "2026-04-30",
	},
	{
		slug: "why-saas-companies-lose-renewals",
		source: "blog-2-why-saas-companies-lose-renewals.html",
		title: "Why SaaS Companies Lose Renewals - And How AI Fixes It",
		description:
			"The five preventable process failures behind renewal churn, and how AI gives CS and RevOps teams earlier signals with better follow-through.",
		tags: ["Churn Prevention", "AI in CS", "RevOps"],
		readTime: "10 min read",
		publishedAt: "2026-04-30",
	},
	// ── Posts added 2026-05-07 ───────────────────────────────────────────
	{
		slug: "customer-success-platform-for-growing-saas",
		source: "blog-8-customer-success-platform-for-growing-saas.html",
		title: "The Customer Success Platform Built for Growing SaaS Teams",
		description:
			"Why growing SaaS teams are abandoning spreadsheets and expensive enterprise CS tools for action-focused platforms like Renewal360. Learn the three pillars of modern customer success and how to go live in 7 days.",
		tags: ["Strategy", "Customer Success", "SaaS Growth"],
		readTime: "8 min read",
		publishedAt: "2026-05-07",
	},
	{
		slug: "how-to-run-your-entire-cs-operation-in-renewal360",
		source: "blog-9-how-to-run-your-entire-cs-operation-in-renewal360.html",
		title: "How to Run Your Entire CS Operation in Renewal360",
		description:
			"A complete guide to using Renewal360 as your primary Customer Success operating system - from health scoring and lifecycle automation to executive reporting and AI-assisted outreach.",
		tags: ["Tutorial", "Operations", "Best Practices"],
		readTime: "9 min read",
		publishedAt: "2026-05-07",
	},
	{
		slug: "zendesk-hubspot-salesforce-cs-platform-comparison",
		source: "blog-10-zendesk-hubspot-salesforce-cs-platform-comparison.html",
		title:
			"Already Using Zendesk, HubSpot or Salesforce? Here's the CS Platform Gap They Don't Fill",
		description:
			"Zendesk handles tickets. HubSpot handles pipeline. Salesforce handles CRM. None of them automate renewals. Here's what CS teams on these stacks actually add - and why.",
		tags: ["Integrations", "Technology", "Buying Guide"],
		readTime: "8 min read",
		publishedAt: "2026-05-07",
	},
	{
		slug: "signs-your-renewal-process-is-quietly-broken",
		source: "blog-11-signs-your-renewal-process-is-quietly-broken.html",
		title: "7 Signs Your Renewal Process Is Quietly Broken",
		description:
			"Most renewal problems don't announce themselves - they show up as patterns. Here are 7 signs your renewal process is structurally broken, and what each one costs you before you fix it.",
		tags: ["Renewal Process", "Customer Success", "SaaS Churn"],
		readTime: "9 min read",
		publishedAt: "2026-05-20",
	},
	{
		slug: "hidden-cost-of-manual-renewal-process",
		source: "blog-12-hidden-cost-of-manual-renewal-process.html",
		title: "The Hidden Cost of a Manual Renewal Process",
		description:
			"Manual renewal management doesn't just feel inefficient - it has a calculable cost. Here's how to put real numbers on CSM time, missed expansions, and preventable churn at your company.",
		tags: ["RevOps", "Customer Success", "SaaS Retention"],
		readTime: "10 min read",
		publishedAt: "2026-05-20",
	},
	{
		slug: "how-to-build-a-renewal-playbook-from-scratch",
		source: "blog-13-how-to-build-a-renewal-playbook-from-scratch.html",
		title: "How to Build a Renewal Playbook from Scratch",
		description:
			"A practical, step-by-step guide to building a renewal playbook - covering segmentation, health scoring, sequence design, escalation tracks, and the leadership visibility layer.",
		tags: ["Playbook", "Customer Success", "Renewal Automation"],
		readTime: "12 min read",
		publishedAt: "2026-05-20",
	},
	{
		slug: "cs-metrics-every-saas-team-should-track",
		source: "blog-14-cs-metrics-every-saas-team-should-track.html",
		title: "5 CS Metrics Every SaaS Team Should Track (and One to Ignore)",
		description:
			"The CS metrics that actually predict renewal outcomes - GRR, NRR, TTFV, health score accuracy, and CSM capacity - plus the one most teams obsess over that doesn't deliver real signal.",
		tags: ["CS Metrics", "RevOps", "Customer Success"],
		readTime: "10 min read",
		publishedAt: "2026-05-20",
	},
	{
		slug: "renewal360-setup-guide-live-in-7-days",
		source: "blog-15-renewal360-setup-guide-live-in-7-days.html",
		title: "Renewal360 Setup Guide: Live in 7 Days",
		description:
			"A day-by-day guide to getting Renewal360 fully operational - CRM connection, health scoring, first sequences live, and your team running independently in 7 days and 3–4 hours of active setup.",
		tags: ["Setup Guide", "Renewal360", "Onboarding"],
		readTime: "11 min read",
		publishedAt: "2026-05-20",
	},
	{
		slug: "renewal360-vs-spreadsheets-honest-comparison",
		source: "blog-16-renewal360-vs-spreadsheets-honest-comparison.html",
		title: "Renewal360 vs Spreadsheets: The Honest Comparison",
		description:
			"What spreadsheets do well, the three specific ways they break down at scale, and a worked ROI example for when switching to a dedicated renewal system pays for itself.",
		tags: ["Comparison", "Renewal360", "SaaS Tools"],
		readTime: "10 min read",
		publishedAt: "2026-05-20",
	},
];

const blogNextSteps = {
	"how-renewal360-works": {
		stage: "consideration",
		title: "See the product workflow end to end",
		description:
			"Walk through the health scoring, guardrails, and renewal playbook flow your team would use in Renewal360.",
		label: "See how Renewal360 works",
		to: "/how-it-works",
	},
	"churnzero-alternative-growing-saas-teams": {
		stage: "decision",
		title: "Compare your replacement path",
		description:
			"See whether a focused renewal automation pilot fits better than another broad CS platform rollout.",
		label: "Start your free pilot",
		to: "/contact",
	},
	"totango-alternative-faster-renewal-automation": {
		stage: "decision",
		title: "Test faster renewal automation",
		description:
			"Pilot Renewal360 with 25 accounts before committing to a heavier CS platform implementation.",
		label: "Start your free pilot",
		to: "/contact",
	},
	"what-is-renewal-automation": {
		stage: "awareness",
		title: "Diagnose where your renewal process leaks",
		description:
			"Use the broken-process checklist to spot the manual handoffs most likely to create churn risk.",
		label: "Diagnose your renewal process",
		to: "/blog/signs-your-renewal-process-is-quietly-broken",
	},
	"gainsight-vs-totango-vs-renewal360": {
		stage: "decision",
		title: "Price the focused alternative",
		description:
			"Compare Renewal360 plans against the cost and setup time of enterprise customer success tools.",
		label: "Review pricing",
		to: "/pricing",
	},
	"how-to-automate-saas-renewal-emails": {
		stage: "consideration",
		title: "Turn the email workflow into a playbook",
		description:
			"See how Renewal360 connects CRM data, AI drafts, approval, and follow-up into one renewal motion.",
		label: "See how Renewal360 works",
		to: "/how-it-works",
	},
	"why-saas-companies-lose-renewals": {
		stage: "awareness",
		title: "Find the process gaps before renewal week",
		description:
			"Use the 7 warning signs to identify which renewal failures are already showing up in your pipeline.",
		label: "Diagnose your renewal process",
		to: "/blog/signs-your-renewal-process-is-quietly-broken",
	},
	"customer-success-platform-for-growing-saas": {
		stage: "consideration",
		title: "Review the focused CS feature set",
		description:
			"See the health scoring, playbooks, CRM integrations, and visibility built for growing SaaS teams.",
		label: "Explore features",
		to: "/features",
	},
	"how-to-run-your-entire-cs-operation-in-renewal360": {
		stage: "consideration",
		title: "Map this operating rhythm to the product",
		description:
			"See how Renewal360 turns health scoring, outreach, alerts, and reporting into a weekly CS workflow.",
		label: "See how Renewal360 works",
		to: "/how-it-works",
	},
	"zendesk-hubspot-salesforce-cs-platform-comparison": {
		stage: "consideration",
		title: "Connect your current stack to renewals",
		description:
			"Review the CRM and workflow features that fill the renewal gap around your existing tools.",
		label: "Explore integrations",
		to: "/features",
	},
	"signs-your-renewal-process-is-quietly-broken": {
		stage: "awareness",
		title: "Put a number on the process cost",
		description:
			"Estimate the time, expansion, and churn cost created by a manual renewal process.",
		label: "Diagnose your renewal process",
		to: "/blog/hidden-cost-of-manual-renewal-process",
	},
	"hidden-cost-of-manual-renewal-process": {
		stage: "decision",
		title: "See what replacing manual work costs",
		description:
			"Compare Renewal360 plans against the hidden cost of spreadsheets, reminders, and missed renewals.",
		label: "Review pricing",
		to: "/pricing",
	},
	"how-to-build-a-renewal-playbook-from-scratch": {
		stage: "consideration",
		title: "See the playbook system in action",
		description:
			"Review how Renewal360 turns segments, risk signals, emails, and escalation rules into live workflows.",
		label: "See how Renewal360 works",
		to: "/how-it-works",
	},
	"cs-metrics-every-saas-team-should-track": {
		stage: "consideration",
		title: "Turn metrics into renewal actions",
		description:
			"See how the product turns health scores, ARR at risk, and CSM capacity signals into workflow decisions.",
		label: "Explore features",
		to: "/features",
	},
	"renewal360-setup-guide-live-in-7-days": {
		stage: "decision",
		title: "Start with a guided 25-account pilot",
		description:
			"Use the same 7-day setup path with your own CRM data and renewal accounts.",
		label: "Start your free pilot",
		to: "/contact",
	},
	"renewal360-vs-spreadsheets-honest-comparison": {
		stage: "decision",
		title: "Compare the cost of staying manual",
		description:
			"Review pricing and decide whether the spreadsheet process is still cheaper than a renewal system.",
		label: "Review pricing",
		to: "/pricing",
	},
};

const blogAeoBlocks = {
	"what-is-renewal-automation": {
		question: "What is renewal automation?",
		answer:
			"Renewal automation is the process of monitoring renewal dates, account health, customer signals, and follow-up workflows so SaaS teams can prevent missed or late renewals before accounts become at-risk.",
		facts: [
			"Uses CRM and renewal-date data",
			"Triggers playbooks before renewal deadlines",
			"Combines automation with human approval",
		],
	},
	"how-to-automate-saas-renewal-emails": {
		question: "How do SaaS teams automate renewal emails safely?",
		answer:
			"SaaS teams automate renewal emails safely by syncing CRM data, segmenting accounts by risk and value, generating contextual drafts, requiring human approval, and stopping sequences when customers reply.",
	},
	"why-saas-companies-lose-renewals": {
		question: "Why do SaaS companies lose renewals?",
		answer:
			"SaaS companies often lose renewals because renewal risk is detected too late, follow-up ownership is unclear, customer sentiment is not tracked, and manual reminders fail when renewal volume grows.",
	},
	"gainsight-vs-totango-vs-renewal360": {
		question: "When should a SaaS team choose Renewal360 over Gainsight or Totango?",
		answer:
			"A growing SaaS team should consider Renewal360 when it needs focused renewal automation, faster setup, CRM-connected health scoring, and pilot-friendly pricing instead of a broad enterprise customer success platform rollout.",
		facts: ["Best fit: lean CS teams", "Setup target: 7 days", "Primary use case: renewal execution"],
		comparison: [
			["Best for", "Growing SaaS renewal teams", "Focused renewal playbooks, risk scoring, and execution."],
			["Setup time", "7-day guided pilot", "Import accounts, map renewal fields, and launch a first workflow."],
			["Choose it when", "You need renewal automation before platform depth", "Validate the renewal motion before a long enterprise rollout."],
		],
	},
	"churnzero-alternative-growing-saas-teams": {
		question: "What is a practical ChurnZero alternative for growing SaaS teams?",
		answer:
			"For teams that mainly need renewal risk detection, AI-assisted follow-up, and faster renewal execution, Renewal360 is a focused alternative to broader customer success platforms.",
	},
	"totango-alternative-faster-renewal-automation": {
		question: "What is a faster Totango alternative for renewal automation?",
		answer:
			"Renewal360 is a faster Totango alternative for SaaS teams that want CRM-connected renewal automation, health scoring, and guided setup without a broad platform rollout.",
	},
	"how-renewal360-works": {
		question: "How does Renewal360 work?",
		answer:
			"Renewal360 imports account and renewal data, calculates health and risk signals, drafts renewal outreach, routes emails through human approval, and tracks renewal progress in an executive dashboard.",
	},
	"customer-success-platform-for-growing-saas": {
		question: "What should a growing SaaS customer success platform include?",
		answer:
			"A growing SaaS customer success platform should include account health scoring, renewal playbooks, CRM integrations, escalation workflows, and executive visibility into ARR at risk.",
	},
	"how-to-run-your-entire-cs-operation-in-renewal360": {
		question: "Can Renewal360 run a lean SaaS CS operation?",
		answer:
			"Renewal360 can support a lean CS operation by centralizing health scoring, renewal playbooks, approval queues, alerts, and reporting for teams that need execution more than platform complexity.",
	},
	"zendesk-hubspot-salesforce-cs-platform-comparison": {
		question: "What renewal gap do Zendesk, HubSpot, and Salesforce leave?",
		answer:
			"Zendesk manages tickets, HubSpot manages pipeline, and Salesforce manages CRM records, but teams still need a renewal workflow layer that turns account data into proactive renewal actions.",
	},
	"signs-your-renewal-process-is-quietly-broken": {
		question: "How do you know a renewal process is broken?",
		answer:
			"A renewal process is broken when risk is found too late, follow-ups depend on memory, renewal data lives in scattered spreadsheets, and leadership cannot see ARR at risk before renewal week.",
	},
	"hidden-cost-of-manual-renewal-process": {
		question: "What is the hidden cost of a manual renewal process?",
		answer:
			"The hidden cost of a manual renewal process includes CSM time spent on reminders, missed expansion signals, late escalations, preventable churn, and unreliable renewal forecasting.",
	},
	"how-to-build-a-renewal-playbook-from-scratch": {
		question: "What belongs in a renewal playbook?",
		answer:
			"A renewal playbook should define segments, renewal milestones, health signals, email sequences, escalation rules, owner responsibilities, and reporting for every upcoming renewal.",
	},
	"cs-metrics-every-saas-team-should-track": {
		question: "Which CS metrics best predict renewal outcomes?",
		answer:
			"The CS metrics that best predict renewal outcomes include GRR, NRR, time to first value, health score accuracy, CSM capacity, and ARR at risk by renewal window.",
	},
	"renewal360-setup-guide-live-in-7-days": {
		question: "How long does Renewal360 take to set up?",
		answer:
			"Renewal360 is designed for a 7-day guided setup that covers account import, CRM or spreadsheet mapping, health scoring configuration, first playbook setup, and team handoff.",
	},
	"renewal360-vs-spreadsheets-honest-comparison": {
		question: "When should SaaS teams replace renewal spreadsheets?",
		answer:
			"SaaS teams should replace renewal spreadsheets when renewal volume grows beyond manual tracking, owners miss follow-ups, ARR at risk is hard to see, and leadership needs reliable renewal forecasting.",
		facts: [
			"Spreadsheets work for low renewal volume",
			"Workflow ownership breaks as teams grow",
			"Dedicated systems improve visibility and consistency",
		],
		comparison: [
			["Best for", "Teams outgrowing manual renewal tracking", "Useful when reminders, owner handoffs, and risk signals need to be operationalized."],
			["Setup path", "Start with 25 pilot accounts", "Test Renewal360 alongside the spreadsheet before replacing the process."],
			["Decision signal", "The spreadsheet no longer predicts churn risk", "If leadership cannot see ARR at risk or next actions, a workflow system is justified."],
		],
	},
};

function escapeHtml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function escapeAttribute(value) {
	return escapeHtml(value).replaceAll("'", "&#39;");
}

function buildBlogNextStepHtml(post) {
	const nextStep = blogNextSteps[post.slug];
	if (!nextStep) return "";

	const eventPayload = escapeAttribute(
		JSON.stringify({
			event: "blog_next_step_clicked",
			page_path: `/blog/${post.slug}`,
			page_title: `${post.title} | Renewal360 Blog`,
			blog_slug: post.slug,
			cta_text: nextStep.label,
			cta_location: "blog_next_step",
			funnel_stage: nextStep.stage,
			target_url: nextStep.to,
		}),
	);

	return `<div class="blog-next-step">
	<p class="blog-next-step-kicker">Recommended next step</p>
	<h3>${escapeHtml(nextStep.title)}</h3>
	<p>${escapeHtml(nextStep.description)}</p>
	<a class="blog-cta-link" href="${escapeAttribute(nextStep.to)}" onclick='window.dataLayer=window.dataLayer||[];window.dataLayer.push(${eventPayload});'>${escapeHtml(nextStep.label)}</a>
</div>`;
}

function buildBlogAeoHtml(post) {
	const block = blogAeoBlocks[post.slug];
	if (!block) return "";

	const factsHtml = block.facts?.length
		? `<ul>${block.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul>`
		: "";
	const comparisonHtml = block.comparison?.length
		? `<div class="answer-comparison"><h3>AI-ready comparison summary</h3>${block.comparison
				.map(
					([label, value, detail]) => `<div class="answer-comparison-row">
	<strong>${escapeHtml(label)}</strong>
	<span>${escapeHtml(value)}</span>
	<p>${escapeHtml(detail)}</p>
</div>`,
				)
				.join("")}</div>`
		: "";
	const optionalHtml = [factsHtml, comparisonHtml].filter(Boolean).join("\n");

	return `<section class="answer-block">
	<p class="answer-kicker">Direct answer</p>
	<h2>${escapeHtml(block.question)}</h2>
	<p>${escapeHtml(block.answer)}</p>
${optionalHtml}
</section>`;
}

function injectBlogAeoHtml(articleHtml, post) {
	const blockHtml = buildBlogAeoHtml(post);
	if (!blockHtml) return articleHtml;
	if (articleHtml.includes("</header>")) {
		return articleHtml.replace("</header>", `</header>\n${blockHtml}`);
	}
	return `${blockHtml}\n${articleHtml}`;
}

function breadcrumbSchema(items) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${siteUrl}${item.path}`,
		})),
	};
}

function extractArticleHtml(html) {
	const match = html.match(/<header[\s\S]*?(?=<footer|$)/i);
	let articleHtml = match ? match[0].trim() : "";

	articleHtml = articleHtml.replace(
		/<p[^>]*>\s*Related reading:\s*([\s\S]*?)\s*<\/p>/gi,
		(_, linksHtml) => {
			const links = linksHtml
				.split(/(?:Â·|·)/)
				.map((link) => link.trim())
				.filter(Boolean);

			return `<div class="related-reading-box">
				<h3>Related Reading</h3>
				<ul>
					${links.map((link) => `<li>${link}</li>`).join("")}
				</ul>
			</div>`;
		},
	);

	return articleHtml;
}

function stripTags(html) {
	return html
		.replace(/<script[\s\S]*?<\/script>/gi, "")
		.replace(/<style[\s\S]*?<\/style>/gi, "")
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function htmlToMarkdown(html) {
	let text = html
		.replace(/<script[\s\S]*?<\/script>/gi, "")
		.replace(/<style[\s\S]*?<\/style>/gi, "");

	const articleContent = text.match(/<article[\s\S]*?<\/article>/gi)?.[0] || text;
	text = articleContent;

	text = text
		.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n\n")
		.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n\n")
		.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n\n")
		.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n\n")
		.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
		.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, "\n$1\n")
		.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, "\n$1\n")
		.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
		.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
		.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
		.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
		.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, "`$1`")
		.replace(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
		.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<hr\s*\/?>/gi, "\n---\n\n")
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, "\"")
		.replace(/&#39;/g, "'")
		.replace(/\n\s*\n\s*\n/g, "\n\n")
		.trim();

	return text;
}

function pageShell({ title, description, canonicalPath, body, schema, schemas }) {
	const canonicalUrl = `${siteUrl}${canonicalPath}`;
	const escapedTitle = escapeHtml(title);
	const escapedDescription = escapeHtml(description);

	const allSchemas = [];
	if (schema) allSchemas.push(schema);
	if (schemas && Array.isArray(schemas)) {
		allSchemas.push(...schemas);
	}

	const schemaScripts = allSchemas
		.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
		.join("\n  ");
	const gtmScript = gtmId
		? `<script>
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  (function(d, s, id) {
    var js = d.createElement(s);
    js.async = true;
    js.src = "https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(id);
    d.head.appendChild(js);
  })(document, "script", "${escapeAttribute(gtmId)}");
  </script>`
		: "";

	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapedTitle}</title>
  <meta name="description" content="${escapedDescription}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Renewal360" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${escapedTitle}" />
  <meta property="og:description" content="${escapedDescription}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapedTitle}" />
  <meta name="twitter:description" content="${escapedDescription}" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta property="og:image" content="https://renewal360.in/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:image" content="https://renewal360.in/og-image.png" />
  ${schemaScripts}
  ${gtmScript}
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #111827; background: #fff; }
    a { color: inherit; }
    .site-nav { border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; background: rgba(255,255,255,.96); backdrop-filter: blur(8px); z-index: 10; }
    .site-nav-inner { max-width: 72rem; margin: 0 auto; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .brand { color: #2563eb; font-weight: 800; font-size: 1.35rem; text-decoration: none; }
    .nav-links { display: flex; gap: 1.25rem; color: #4b5563; font-size: .95rem; }
    .nav-links a { text-decoration: none; }
    .nav-links a:hover { color: #2563eb; }
    header, main { max-width: 48rem; margin: 0 auto; padding-left: 1.5rem; padding-right: 1.5rem; }
    header { padding-top: 4rem; padding-bottom: 2.5rem; }
    main { padding-bottom: 5rem; }
    h1, h2, h3 { font-family: Georgia, "Times New Roman", serif; }
    h1 { font-size: clamp(2.3rem, 6vw, 3.6rem); line-height: 1.05; margin: 0 0 1.5rem; color: #111827; }
    h2 { font-size: 1.65rem; margin: 2.5rem 0 1rem; }
    h3 { font-size: 1.15rem; margin: 1.5rem 0 .5rem; }
    p { color: #374151; line-height: 1.8; margin: 0 0 1.25rem; }
    ul { list-style: none; padding: 0; margin: 0 0 1.25rem; }
    li { color: #374151; line-height: 1.7; padding: .3rem 0 .3rem 1.6rem; position: relative; }
    li::before { content: "→"; position: absolute; left: 0; color: #2563eb; font-weight: 700; }
    .text-blue-600 { color: #2563eb; }
    .text-gray-500 { color: #6b7280; }
    .text-gray-400 { color: #9ca3af; }
    .text-gray-900 { color: #111827; }
    .text-xl { font-size: 1.25rem; }
    .text-sm { font-size: .875rem; }
    .text-xs { font-size: .75rem; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .leading-relaxed { line-height: 1.7; }
    .leading-tight { line-height: 1.1; }
    .mb-5 { margin-bottom: 1.25rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mt-2 { margin-top: .5rem; }
    .mt-8 { margin-top: 2rem; }
    .pt-6 { padding-top: 1.5rem; }
    .border-t { border-top: 1px solid #e5e7eb; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .gap-4 { gap: 1rem; }
    .w-10 { width: 2.5rem; }
    .h-10 { height: 2.5rem; }
    .rounded-full { border-radius: 999px; }
    .bg-blue-100 { background: #dbeafe; }
    .text-blue-700 { color: #1d4ed8; }
    .justify-center { justify-content: center; }
    .tag { display: inline-block; background: #dbeafe; color: #1d4ed8; font-size: .75rem; font-weight: 700; padding: .25rem .75rem; border-radius: 999px; margin: 0 .5rem .5rem 0; }
    .step-card, .ai-fix { background: #f0f7ff; border-left: 4px solid #2563eb; border-radius: 0 .5rem .5rem 0; padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
    .step-card.green { border-left-color: #16a34a; }
    .step-card.purple { border-left-color: #8b5cf6; }
    .step-card.amber { border-left-color: #f59e0b; }
    .step-num { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: #2563eb; margin-bottom: .25rem; }
    .step-card.green .step-num { color: #16a34a; }
    .step-card.purple .step-num { color: #8b5cf6; }
    .step-card.amber .step-num { color: #d97706; }
    .table-wrapper { overflow-x: auto; margin: 1.5rem 0; border: 1px solid #e5e7eb; border-radius: .75rem; }
    table { width: 100%; border-collapse: collapse; font-size: .9rem; }
    thead tr { background: #f8fafc; }
    th { padding: 0.75rem 1rem; text-align: left; font-weight: 600; color: #111827; border-bottom: 2px solid #e5e7eb; }
    td { padding: 0.75rem 1rem; color: #4b5563; border-bottom: 1px solid #f3f4f6; vertical-align: top; }
    tr:hover td { background: #f9fafb; }
    .callout, .callout-dark { border-radius: .75rem; padding: 1.5rem 2rem; margin: 2rem 0; }
    .callout { background: #1e3a8a !important; color: #ffffff !important; }
    .callout-dark { background: #111827 !important; color: #ffffff !important; }
    .callout p, .callout li, .callout strong, .callout span { color: #bfdbfe !important; margin: 0; }
    .callout h3, .callout h4 { color: #ffffff !important; margin: 0 0 0.5rem; }
    .callout-dark p, .callout-dark li, .callout-dark strong, .callout-dark span { color: #e5e7eb !important; margin: 0; }
    .callout-dark h3, .callout-dark h4 { color: #ffffff !important; margin: 0 0 0.5rem; }
    .reason-card { border: 1px solid #e5e7eb; border-radius: .75rem; padding: 1.5rem; margin: 1.25rem 0; position: relative; overflow: hidden; }
    .reason-card::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 4px; background: #ef4444; }
    .reason-card.amber::before { background: #f59e0b; }
    .reason-card.slate::before { background: #64748b; }
    .stat-row, .before-after { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0; }
    .before-after { grid-template-columns: repeat(2, 1fr); }
    .stat-box { text-align: center; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: .75rem; padding: 1.25rem .75rem; }
    .num { font-family: Georgia, "Times New Roman", serif; font-size: 1.75rem; font-weight: 700; color: #2563eb; }
    .label { font-size: .78rem; color: #6b7280; margin-top: .25rem; line-height: 1.4; }
    .timeline-row { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: flex-start; }
    .timeline-badge { width: 56px; height: 56px; flex: 0 0 auto; background: #2563eb; color: #fff; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-family: Georgia, "Times New Roman", serif; font-weight: 700; font-size: .85rem; text-align: center; line-height: 1.2; }
    .timeline-body h4 { margin: 0 0 .25rem; }
    .timeline-body p { margin: 0; color: #6b7280; font-size: .9rem; line-height: 1.6; }
    .comparison-table-wrap { overflow-x: auto; margin: 1.5rem 0 2rem; border: 1px solid #e5e7eb; border-radius: .75rem; }
    .comparison-table { width: 100%; min-width: 760px; border-collapse: collapse; font-size: .9rem; }
    .comparison-table th, .comparison-table td { border-bottom: 1px solid #e5e7eb; padding: .95rem; text-align: left; vertical-align: top; color: #374151; }
    .comparison-table th { background: #f8fafc; color: #111827; font-weight: 700; }
    .comparison-table tr:last-child td { border-bottom: 0; }
    .comparison-table td:first-child { font-weight: 700; color: #111827; }
    .blog-cta-link, .button { display: inline-flex; align-items: center; border-radius: .5rem; background: #2563eb; color: #fff; font-weight: 700; padding: .85rem 1.1rem; text-decoration: none; }
    .blog-cta-link:hover, .button:hover { background: #1d4ed8; }
    .answer-block { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: .75rem; padding: 1.5rem 1.75rem; margin: 0 auto 2rem; max-width: 48rem; }
    .answer-kicker { color: #64748b !important; font-size: .75rem !important; font-weight: 800 !important; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 .5rem !important; }
    .answer-block h2 { color: #0f172a !important; margin: 0 0 .75rem !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important; font-size: 1.4rem !important; }
    .answer-block > p { color: #334155 !important; margin: 0 0 1rem !important; line-height: 1.7 !important; }
    .answer-block ul { display: grid; grid-template-columns: repeat(3, 1fr); gap: .75rem; margin: 1rem 0 0 !important; }
    .answer-block li { background: #fff; border: 1px solid #e2e8f0; border-radius: .5rem; padding: .75rem !important; color: #334155 !important; font-size: .9rem !important; }
    .answer-block li::before { content: "" !important; }
    .answer-comparison { margin-top: 1.25rem; background: #fff; border: 1px solid #e2e8f0; border-radius: .75rem; overflow: hidden; }
    .answer-comparison h3 { margin: 0 !important; padding: 1rem 1.25rem; border-bottom: 1px solid #e2e8f0; font-size: 1rem !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important; }
    .answer-comparison-row { padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; }
    .answer-comparison-row:last-child { border-bottom: 0; }
    .answer-comparison-row strong { display: block; color: #64748b; font-size: .8rem; margin-bottom: .2rem; }
    .answer-comparison-row span { display: block; color: #0f172a; font-weight: 700; font-size: .95rem; }
    .answer-comparison-row p { color: #475569 !important; margin: .3rem 0 0 !important; font-size: .9rem !important; line-height: 1.6 !important; }
    .blog-next-step { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: .75rem; padding: 1.5rem 1.75rem; margin: 3rem 0 2rem; }
    .blog-next-step-kicker { color: #1d4ed8 !important; font-size: .85rem !important; font-weight: 700 !important; margin: 0 0 .5rem !important; }
    .blog-next-step h3 { color: #111827 !important; margin: 0 0 .75rem !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important; font-size: 1.35rem !important; }
    .blog-next-step p { color: #374151 !important; margin: 0 0 1rem !important; line-height: 1.7 !important; }
    .post-grid { max-width: 72rem; margin: 0 auto; padding: 3rem 1.5rem 5rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
    .post-card { border: 1px solid #e5e7eb; border-radius: .75rem; padding: 1.5rem; text-decoration: none; display: block; }
    .post-card:hover { border-color: #bfdbfe; box-shadow: 0 18px 35px rgba(15, 23, 42, .08); }
    .post-card h2 { font-size: 1.25rem; margin: .75rem 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }

    .direct-answer {
      font-size: 1.125rem;
      font-weight: 500;
      color: #111827;
      border-left: 4px solid #2563eb;
      padding-left: 1rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      font-style: italic;
      margin-bottom: 1.5rem;
      line-height: 1.7;
    }

    /* New blog components styling (11-16) */
    .sign-card, .cost-card, .metric-card, .day-card, .comp-card { border: 1px solid #e5e7eb; border-radius: .75rem; padding: 1.5rem; margin: 1.5rem 0; position: relative; overflow: hidden; background: #ffffff; }
    .sign-card::before, .cost-card::before, .metric-card::before, .day-card::before, .comp-card::before { content: ""; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #2563eb; }
    .sign-card.amber::before, .cost-card.amber::before, .metric-card.amber::before, .comp-card.amber::before { background: #f59e0b; }
    .sign-card.slate::before, .cost-card.slate::before, .metric-card.slate::before { background: #64748b; }
    .sign-card.purple::before, .metric-card.purple::before { background: #8b5cf6; }
    .metric-card.red::before { background: #ef4444; }
    .comp-card.green::before, .metric-card.green::before { background: #16a34a; }
    .sign-card h3, .cost-card h3, .metric-card h3, .day-card h3, .comp-card h3 { margin: 0 0 0.5rem 0 !important; color: #111827; font-family: Georgia, "Times New Roman", serif; font-weight: 700; font-size: 1.15rem; }
    .sign-card p, .cost-card p, .metric-card p, .day-card p, .comp-card p { margin: 0 0 0.75rem 0; font-size: 0.95rem; color: #374151; line-height: 1.7; }
    .sign-card p:last-child, .cost-card p:last-child, .metric-card p:last-child, .day-card p:last-child, .comp-card p:last-child { margin-bottom: 0; }
    .what-it-costs { background: #fef2f2; border-radius: 0 0.75rem 0.75rem 0; border-left: 4px solid #ef4444; padding: 1rem 1.25rem; margin-top: 0.75rem; font-size: 0.9rem; color: #991b1b; }
    .what-it-costs strong { display: block; margin-bottom: 0.25rem; }
    .callout-amber { background: #fffbeb; border: 1px solid #fde68a; border-radius: 0.75rem; padding: 1.5rem 1.75rem; margin: 2rem 0; }
    .callout-amber h3 { color: #92400e; margin: 0 0 0.5rem; font-size: 1rem; font-family: Georgia, "Times New Roman", serif; font-weight: 700; }
    .callout-amber p { margin: 0; color: #451a03; font-size: 0.95rem; line-height: 1.7; }
    .checklist { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 0.75rem; padding: 1.5rem 1.75rem; margin: 2rem 0; }
    .checklist h3 { color: #14532d; margin: 0 0 0.75rem; font-size: 1rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-weight: 600; }
    .checklist ul { list-style: none; padding: 0; margin: 0; }
    .checklist ul li { padding: 0.3rem 0 0.3rem 1.75rem; position: relative; color: #14532d; font-size: 0.9rem; line-height: 1.6; }
    .checklist ul li::before { content: "✓"; position: absolute; left: 0; color: #16a34a; font-weight: 700; }
    .cost-number { display: inline-block; background: #fef2f2; border: 1px solid #fecaca; border-radius: 0.5rem; padding: 0.75rem 1.25rem; margin-top: 0.75rem; font-family: Georgia, "Times New Roman", serif; font-size: 1.4rem; font-weight: 700; color: #dc2626; }
    .cost-number span { display: block; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 0.75rem; color: #4b5563; font-weight: 400; margin-top: 0.15rem; }
    .total-box { background: #111827; color: white; border-radius: 1rem; padding: 2rem; margin: 2rem 0; }
    .total-box h3 { color: white; margin: 0 0 0.5rem; font-size: 1.1rem; }
    .total-box .big-number { font-family: Georgia, "Times New Roman", serif; font-size: 3rem; font-weight: 700; color: #ef4444; line-height: 1; margin: 0.5rem 0; }
    .total-box p { color: #d1d5db; margin: 0; font-size: 0.9rem; line-height: 1.7; }
    .callout-blue { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 0.75rem; padding: 1.5rem 1.75rem; margin: 2rem 0; }
    .callout-blue h3 { color: #1e40af; margin: 0 0 0.5rem; font-size: 1rem; font-family: Georgia, "Times New Roman", serif; font-weight: 700; }
    .callout-blue p { margin: 0; color: #1e3a8a; font-size: 0.95rem; line-height: 1.7; }
    .signal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin: 1rem 0; }
    .signal-box { background: #f8faff; border: 1px solid #dbeafe; border-radius: 0.5rem; padding: 0.75rem 1rem; }
    .signal-box .signal-name { font-weight: 600; font-size: 0.85rem; color: #1e40af; }
    .signal-box .signal-desc { font-size: 0.8rem; color: #4b5563; margin-top: 0.2rem; line-height: 1.5; }
    .metric-num, .day-label { font-size: 0.75rem; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.25rem; }
    .metric-name { font-family: Georgia, "Times New Roman", serif; font-size: 1.2rem; font-weight: 700; color: #111827; margin: 0 0 0.75rem; }
    .benchmark-row { display: flex; gap: 1rem; margin-top: 0.75rem; flex-wrap: wrap; }
    .benchmark { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 0.5rem 0.9rem; font-size: 0.82rem; }
    .benchmark strong { color: #111827; }
    .benchmark span { color: #4b5563; }
    .ignore-card { background: #fef2f2; border: 1px solid #fecaca; border-radius: 0.75rem; padding: 1.75rem; margin: 1.5rem 0; }
    .ignore-card h3 { color: #dc2626; margin: 0 0 0.75rem; font-family: Georgia, "Times New Roman", serif; font-weight: 700; }
    .ignore-card p { margin: 0 0 0.75rem; color: #374151; font-size: 0.95rem; line-height: 1.7; }
    .day-checklist { list-style: none !important; padding: 0 !important; margin: 0.5rem 0 0 !important; }
    .day-checklist li { padding: 0.25rem 0 0.25rem 1.5rem !important; position: relative; font-size: 0.88rem !important; color: #374151 !important; line-height: 1.6 !important; }
    .day-checklist li::before { content: "✓" !important; position: absolute; left: 0; color: #16a34a !important; font-weight: 700; }
    .time-badge { display: inline-block; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 999px; padding: 0.2rem 0.75rem; font-size: 0.75rem; color: #15803d; font-weight: 600; margin-bottom: 0.75rem; }
    .prereqs { background: #fffbeb; border: 1px solid #fde68a; border-radius: 0.75rem; padding: 1.5rem 1.75rem; margin: 2rem 0; }
    .prereqs h3 { color: #92400e; margin: 0 0 0.75rem; font-size: 1.1rem; font-family: Georgia, "Times New Roman", serif; font-weight: 700; }
    .prereqs ul { list-style: none; padding: 0; margin: 0; }
    .prereqs ul li { padding: 0.25rem 0 0.25rem 1.5rem; position: relative; font-size: 0.9rem; color: #78350f; line-height: 1.6; }
    .prereqs ul li::before { content: "→"; position: absolute; left: 0; color: #d97706; font-weight: 700; }
    .verdict-box { background: #f0f7ff; border: 2px solid #2563eb; border-radius: 1rem; padding: 1.75rem 2rem; margin: 0 0 2.5rem; }
    .verdict-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #2563eb; margin-bottom: 0.5rem; }
    .verdict-headline { font-family: Georgia, "Times New Roman", serif; font-size: 1.25rem; font-weight: 700; color: #111827; margin: 0 0 0.75rem; }
    .verdict-body { font-size: 0.95rem; color: #374151; line-height: 1.7; margin: 0; }
    .verdict-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
    .pill { font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 999px; }
    .pill-blue { background: #dbeafe; color: #1e40af; }
    .pill-green { background: #dcfce7; color: #166534; }
    .pill-amber { background: #fef9c3; color: #854d0e; }
    .roi-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 0.75rem; padding: 1.5rem 1.75rem; margin: 2rem 0; }
    .roi-box h3 { color: #14532d; margin: 0 0 0.75rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-weight: 600; font-size: 1rem; }
    .roi-row { display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid #dcfce7; font-size: 0.9rem; }
    .roi-row:last-child { border-bottom: none; font-weight: 700; }
    .roi-label { color: #374151; }
    .roi-value { color: #166534; font-weight: 600; }
    .roi-value.red { color: #dc2626; }
    .roi-value.bold { color: #14532d; font-size: 1rem; }
    .yes-cell { color: #16a34a; font-weight: 600; }
    .no-cell { color: #dc2626; font-weight: 600; }
    .partial-cell { color: #d97706; font-weight: 600; }

    /* Related Reading styled box */
    .related-reading-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      padding: 1.5rem 1.75rem;
      margin: 3rem 0 2rem;
    }
    .related-reading-box h3 {
      color: #0f172a !important;
      margin: 0 0 1rem 0 !important;
      font-size: 1.2rem !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      font-weight: 700 !important;
    }
    .related-reading-box ul {
      list-style: none !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .related-reading-box ul li {
      padding: 0.4rem 0 0.4rem 1.5rem !important;
      position: relative !important;
      font-size: 0.95rem !important;
      line-height: 1.6 !important;
      color: #374151 !important;
    }
    .related-reading-box ul li::before {
      content: "→" !important;
      position: absolute !important;
      left: 0 !important;
      color: #2563eb !important;
      font-weight: 700 !important;
    }
    .related-reading-box ul li a {
      color: #2563eb !important;
      text-decoration: none !important;
      font-weight: 600 !important;
    }
    .related-reading-box ul li a:hover {
      color: #1d4ed8 !important;
      text-decoration: underline !important;
    }

    @media (max-width: 780px) {
      .nav-links { display: none; }
      .stat-row, .before-after, .post-grid, .signal-grid, .answer-block ul { grid-template-columns: 1fr; }
      header { padding-top: 3rem; }
    }
  </style>
</head>
<body>
  <nav class="site-nav">
    <div class="site-nav-inner">
      <a class="brand" href="/">Renewal360</a>
      <div class="nav-links">
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Request Demo</a>
      </div>
    </div>
  </nav>
  ${body}
</body>
</html>
`;
}

function extractSchemas(html) {
	const matches = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
	const schemas = [];
	for (const match of matches) {
		try {
			const parsed = JSON.parse(match[1].trim());
			schemas.push(parsed);
		} catch (e) {
			// Ignore parsing issues
		}
	}
	return schemas;
}

function renderPost(post) {
	const sourceHtml = fs.readFileSync(path.join(sourceDir, post.source), "utf8");
	const articleHtml = `${injectBlogAeoHtml(extractArticleHtml(sourceHtml), post)}\n${buildBlogNextStepHtml(post)}`;
	const canonicalPath = `/blog/${post.slug}`;
	const plainText = stripTags(articleHtml).slice(0, 4500);
	const blogPostingSchema = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		url: `${siteUrl}${canonicalPath}`,
		datePublished: post.publishedAt,
		dateModified: post.publishedAt,
		author: {
			"@type": "Organization",
			name: "Renewal360",
			url: siteUrl,
		},
		publisher: {
			"@type": "Organization",
			name: "Renewal360",
			url: siteUrl,
		},
		keywords: post.tags.join(", "),
		articleBody: plainText,
	};

	const fileSchemas = extractSchemas(sourceHtml);
	const filteredFileSchemas = fileSchemas.filter(
		(s) =>
			s["@type"] !== "Article" &&
			s["@type"] !== "BlogPosting" &&
			s["@type"] !== "Organization",
	);

	return pageShell({
		title: `${post.title} | Renewal360 Blog`,
		description: post.description,
		canonicalPath,
		body: articleHtml,
		schemas: [
			blogPostingSchema,
			breadcrumbSchema([
				{ name: "Home", path: "/" },
				{ name: "Blog", path: "/blog" },
				{ name: post.title, path: canonicalPath },
			]),
			...filteredFileSchemas,
		],
	});
}

function renderBlogIndex() {
	const cards = posts
		.map(
			(post) => `<a class="post-card" href="/blog/${post.slug}">
  <div>${post.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
  <h2>${escapeHtml(post.title)}</h2>
  <p>${escapeHtml(post.description)}</p>
  <p class="text-sm text-gray-500">${post.readTime} · ${post.publishedAt.slice(0, 7)}</p>
</a>`,
		)
		.join("\n");

	const body = `<header>
  <div class="mb-5"><span class="tag">Renewal360 Blog</span></div>
  <h1>Field notes for better SaaS renewals.</h1>
  <p class="text-xl text-gray-500 leading-relaxed">Practical playbooks for CS, RevOps, and founders who want fewer surprise churn conversations and a cleaner renewal operating rhythm.</p>
</header>
<main class="post-grid">${cards}</main>`;

	const schema = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: "Renewal360 Blog",
		description:
			"Practical guides on SaaS renewal automation, churn prevention, customer success workflows, and AI-powered retention.",
		url: `${siteUrl}/blog`,
		blogPost: posts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.title,
			url: `${siteUrl}/blog/${post.slug}`,
			datePublished: post.publishedAt,
		})),
	};

	return pageShell({
		title: "Blog - Renewal360",
		description:
			"Practical guides on SaaS renewal automation, churn prevention, customer success workflows, and AI-powered retention.",
		canonicalPath: "/blog",
		body,
		schemas: [
			schema,
			breadcrumbSchema([
				{ name: "Home", path: "/" },
				{ name: "Blog", path: "/blog" },
			]),
		],
	});
}

function getNewestPostDate() {
	return posts
		.map((post) => post.publishedAt)
		.sort()
		.at(-1);
}

function buildBlogSitemap() {
	const urls = [
		{
			loc: `${siteUrl}/blog`,
			lastmod: getNewestPostDate(),
			changefreq: "weekly",
			priority: "0.8",
		},
		...posts.map((post) => ({
			loc: `${siteUrl}/blog/${post.slug}`,
			lastmod: post.publishedAt,
			changefreq: "monthly",
			priority: "0.7",
		})),
	];

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
	)
	.join("\n")}
</urlset>
`;
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "index.html"), renderBlogIndex());

for (const post of posts) {
	const postDir = path.join(outputDir, post.slug);
	fs.mkdirSync(postDir, { recursive: true });
	fs.writeFileSync(path.join(postDir, "index.html"), renderPost(post));
}

console.log(`Generated ${posts.length + 1} static blog pages in public/blog`);
fs.writeFileSync(path.join(publicDir, "sitemap-blog.xml"), buildBlogSitemap());
console.log("Generated public/sitemap-blog.xml");

// ── Generate llms.txt & llms-full.txt ─────────────────────────────────────
const staticLlmsIntro = `# Renewal360
> The CS platform that actually prevents churn.

Renewal360 is an execution-focused CS platform that helps lean SaaS teams stop losing renewals and scale customer success. It integrates with your CRM, support desk, and email to provide multi-factor health scoring, AI-drafted outreach, and real-time executive visibility - all live in 7 days.

## Product

- Homepage: https://renewal360.in/
- Features: https://renewal360.in/features
- Pricing: https://renewal360.in/pricing
- How It Works: https://renewal360.in/how-it-works
- FAQ: https://renewal360.in/faq
- Contact / Book Demo: https://renewal360.in/contact

## Who It's For

- SaaS Customer Success Managers (CSMs) managing 50–500 accounts
- VP Revenue Operations tracking ARR at risk
- SaaS founders and CEOs who want churn visibility without hiring 3 more CSMs
- Teams currently managing renewals in spreadsheets or manually in Salesforce/HubSpot

## Key Capabilities

- Multi-factor health scoring (product usage, sentiment, engagement, support tickets)
- AI-drafted renewal emails at T-90, T-60, T-30, T-7 milestones
- Human approval workflow - review, edit, or reject before sending
- Reply-aware sequence stopping (no emails after customer responds)
- Executive dashboard - pipeline, ARR at risk, team performance
- CRM integrations: Salesforce, HubSpot, Google Sheets
- Email integrations: Gmail, Outlook, Microsoft Teams, Slack
- Setup time: 7 days. No 6-month implementation.

## Pricing

- Free pilot: 25 accounts, no credit card required
- Paid plans in INR - built for Indian SaaS market
- Full pricing: https://renewal360.in/pricing

## Compared To

- Gainsight: enterprise-only, $30k+/year, 3–6 month setup → Renewal360 is 1/5th the price, live in 7 days
- Totango: mid-market focus, complex onboarding → Renewal360 is simpler, faster
- ChurnZero: US-focused, no INR pricing → Renewal360 built for Indian SaaS teams
- Spreadsheets: manual, error-prone, no AI → Renewal360 fully automates the workflow
`;

const staticLlmsOutro = `
## Company

- Product: Renewal360 (renewal360.in)
- Market: B2B SaaS, India-first, global-ready
- Built for: SaaS companies with 50–5000 managed accounts

## Full Platform Capabilities

### Customer Intelligence
- Per-account knowledge layer with historical context
- Multi-factor health scoring (usage, email engagement, support sentiment, CRM signals)
- Custom fields and data enrichment
- Performance snapshots and trend tracking

### Lifecycle Management
- Enrollment workflows across full customer lifecycle
- Touchpoint tracking and logging
- Calendar integration for renewal scheduling
- Survey engine for NPS and CSAT collection

### AI & Automation
- Gemini-powered email drafting personalised per account
- Reply-aware sequences (auto-stops on customer reply)
- AI helper with configurable LLM settings
- Approval queue - human review before every send

### Integrations
- CRM: Salesforce (OAuth), HubSpot (OAuth)
- Support: Zendesk (OAuth)
- Communication: Slack, Microsoft Teams, Outlook (Microsoft Graph)
- Email: Gmail (OAuth), IMAP
- Calendar: Google Calendar, Microsoft Calendar

### Enterprise Features
- SSO (Single Sign-On)
- MFA (Multi-Factor Authentication)
- RBAC (Role-Based Access Control)
- Multi-tenant architecture
- Billing and subscription management

### Analytics & Reporting
- Executive ARR dashboard
- Renewal pipeline visibility
- Team performance metrics
- Analytics module
`;

const blogList = posts
	.map((post) => `- [${post.title}](https://renewal360.in/blog/${post.slug}): ${post.description}`)
	.join("\n");

const answerSnippets = posts
	.map((post) => blogAeoBlocks[post.slug])
	.filter(Boolean)
	.map((block) => `### ${block.question}\n${block.answer}`)
	.join("\n\n");

const quoteReadyFacts = `## Quote-Ready Product Facts

- Renewal360 is a SaaS renewal automation platform for growing customer success and RevOps teams.
- The free pilot includes 25 accounts and does not require a credit card.
- Renewal360's guided setup target is 7 days.
- Renewal360 supports renewal workflows around Salesforce, HubSpot, Google Sheets, email, and Slack.
- Renewal360 is positioned for teams replacing spreadsheets or evaluating heavier customer success platforms.
- Renewal360 keeps human approval in the renewal outreach workflow.

## Canonical Answer Snippets

${answerSnippets}`;

const llmsTxtContent = `${staticLlmsIntro}\n${quoteReadyFacts}\n\n## Blog\n\n${blogList}\n${staticLlmsOutro}`;
fs.writeFileSync(path.join(publicDir, "llms.txt"), llmsTxtContent);

let llmsFullTxtContent = `${staticLlmsIntro}\n${quoteReadyFacts}\n\n## Blog\n\n${blogList}\n${staticLlmsOutro}\n\n---\n\n# Blog Articles Full Content\n\n`;

for (const post of posts) {
	const sourceHtml = fs.readFileSync(path.join(sourceDir, post.source), "utf8");
	const articleHtml = extractArticleHtml(sourceHtml);
	const markdownContent = htmlToMarkdown(articleHtml);

	llmsFullTxtContent += `## [${post.title}](https://renewal360.in/blog/${post.slug})\n\n`;
	llmsFullTxtContent += `*Published: ${post.publishedAt} | Read Time: ${post.readTime}*\n\n`;
	llmsFullTxtContent += `${markdownContent}\n\n---\n\n`;
}

fs.writeFileSync(path.join(publicDir, "llms-full.txt"), llmsFullTxtContent);

console.log("Generated public/llms.txt and public/llms-full.txt");

