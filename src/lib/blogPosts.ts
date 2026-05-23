import automateEmailsHtml from "@/content/blog/blog-1-automate-saas-renewal-emails.html?raw";
import loseRenewalsHtml from "@/content/blog/blog-2-why-saas-companies-lose-renewals.html?raw";
import comparisonHtml from "@/content/blog/blog-3-gainsight-vs-totango-vs-renewal360.html?raw";
import churnZeroAlternativeHtml from "@/content/blog/blog-4-churnzero-alternative-growing-saas-teams.html?raw";
import totangoAlternativeHtml from "@/content/blog/blog-5-totango-alternative-faster-renewal-automation.html?raw";
import renewalAutomationHtml from "@/content/blog/blog-6-what-is-renewal-automation.html?raw";
import howRenewal360WorksHtml from "@/content/blog/blog-7-how-renewal360-works.html?raw";
import customerSuccessPlatformHtml from "@/content/blog/blog-8-customer-success-platform-for-growing-saas.html?raw";
import runCsOperationHtml from "@/content/blog/blog-9-how-to-run-your-entire-cs-operation-in-renewal360.html?raw";
import integrationsComparisonHtml from "@/content/blog/blog-10-zendesk-hubspot-salesforce-cs-platform-comparison.html?raw";
import renewalProcessBrokenHtml from "@/content/blog/blog-11-signs-your-renewal-process-is-quietly-broken.html?raw";
import hiddenCostManualHtml from "@/content/blog/blog-12-hidden-cost-of-manual-renewal-process.html?raw";
import renewalPlaybookHtml from "@/content/blog/blog-13-how-to-build-a-renewal-playbook-from-scratch.html?raw";
import csMetricsHtml from "@/content/blog/blog-14-cs-metrics-every-saas-team-should-track.html?raw";
import setupGuideHtml from "@/content/blog/blog-15-renewal360-setup-guide-live-in-7-days.html?raw";
import vsSpreadsheetHtml from "@/content/blog/blog-16-renewal360-vs-spreadsheets-honest-comparison.html?raw";

export type BlogPost = {
	slug: string;
	title: string;
	summary: string;
	tags: string[];
	readTime: string;
	publishedAt: string;
	accent: string;
	contentHtml: string;
};

export const blogPosts: BlogPost[] = [
	{
		slug: "how-renewal360-works",
		// Title matches the pre-rendered static HTML served to Google
		title:
			"How Renewal360 Works: The Renewal Automation Process Built to Prevent Silent Churn",
		summary:
			"See how Renewal360 turns CRM data, renewal milestones, AI-drafted outreach, smart guards, and human approval into an action-first renewal workflow.",
		tags: ["How It Works", "Renewal Automation", "Customer Success"],
		readTime: "8 min read",
		publishedAt: "April 2026",
		accent: "blue",
		contentHtml: howRenewal360WorksHtml,
	},
	{
		slug: "churnzero-alternative-growing-saas-teams",
		title: "ChurnZero Alternative for Growing SaaS Teams",
		summary:
			"A practical guide for SaaS teams that need renewal automation, AI follow-up, and faster action without a heavy platform rollout.",
		tags: ["ChurnZero Alternative", "Customer Success", "Renewal Automation"],
		readTime: "8 min read",
		publishedAt: "April 2026",
		accent: "blue",
		contentHtml: churnZeroAlternativeHtml,
	},
	{
		slug: "totango-alternative-faster-renewal-automation",
		title: "Totango Alternative for Faster Renewal Automation",
		summary:
			"A focused comparison for teams that want AI-assisted renewal follow-up and action-first workflows without a broad platform rollout.",
		tags: ["Totango Alternative", "Renewal Automation", "SaaS Retention"],
		readTime: "8 min read",
		publishedAt: "April 2026",
		accent: "blue",
		contentHtml: totangoAlternativeHtml,
	},
	{
		slug: "what-is-renewal-automation",
		title: "What is Renewal Automation? And Why Your CS Team Needs It",
		summary:
			"A plain-English guide to renewal automation, why reminder emails are not enough, and how action-first workflows reduce churn risk.",
		tags: ["Renewal Automation", "Customer Success", "SaaS Churn"],
		readTime: "7 min read",
		publishedAt: "April 2026",
		accent: "blue",
		contentHtml: renewalAutomationHtml,
	},
	{
		slug: "gainsight-vs-totango-vs-renewal360",
		// Title matches the pre-rendered static HTML served to Google
		title:
			"Gainsight vs Totango vs Renewal360 - Which Renewal Automation Tool is Right for You?",
		summary:
			"A buyer-focused comparison for SaaS teams deciding whether they need a broad enterprise platform or an execution-focused CS engine.",
		tags: ["Comparison", "Gainsight Alternative", "Totango Alternative"],
		readTime: "9 min read",
		publishedAt: "April 2026",
		accent: "blue",
		contentHtml: comparisonHtml,
	},
	{
		slug: "how-to-automate-saas-renewal-emails",
		title: "How to Automate SaaS Renewal Emails (Step-by-Step)",
		summary:
			"A practical walkthrough of CRM sync, health scoring, branching sequences, AI drafts, reply detection, and human approval workflows.",
		tags: ["Automation", "Customer Success"],
		readTime: "8 min read",
		publishedAt: "April 2026",
		accent: "blue",
		contentHtml: automateEmailsHtml,
	},
	{
		slug: "why-saas-companies-lose-renewals",
		title: "Why SaaS Companies Lose Renewals - And How AI Fixes It",
		summary:
			"The five preventable process failures behind renewal churn, and how AI gives CS and RevOps teams earlier signals with better follow-through.",
		tags: ["Churn Prevention", "AI in CS", "RevOps"],
		readTime: "10 min read",
		publishedAt: "April 2026",
		accent: "slate",
		contentHtml: loseRenewalsHtml,
	},
	{
		slug: "customer-success-platform-for-growing-saas",
		title: "The Customer Success Platform Built for Growing SaaS Teams",
		summary:
			"Why growing SaaS teams are abandoning spreadsheets and expensive enterprise CS tools for action-focused platforms like Renewal360. Learn the three pillars of modern customer success and how to go live in 7 days.",
		tags: ["Strategy", "Customer Success", "SaaS Growth"],
		readTime: "8 min read",
		publishedAt: "May 2026",
		accent: "blue",
		contentHtml: customerSuccessPlatformHtml,
	},
	{
		slug: "how-to-run-your-entire-cs-operation-in-renewal360",
		title: "How to Run Your Entire CS Operation in Renewal360",
		summary:
			"A complete guide to using Renewal360 as your primary Customer Success operating system — from health scoring and lifecycle automation to executive reporting and AI-assisted outreach.",
		tags: ["Tutorial", "Operations", "Best Practices"],
		readTime: "9 min read",
		publishedAt: "May 2026",
		accent: "blue",
		contentHtml: runCsOperationHtml,
	},
	{
		slug: "zendesk-hubspot-salesforce-cs-platform-comparison",
		// Title matches the pre-rendered static HTML served to Google
		title:
			"Already Using Zendesk, HubSpot or Salesforce? Here's the CS Platform Gap They Don't Fill",
		summary:
			"Zendesk handles tickets. HubSpot handles pipeline. Salesforce handles CRM. None of them automate renewals. Here's what CS teams on these stacks actually add — and why.",
		tags: ["Integrations", "Technology", "Buying Guide"],
		readTime: "8 min read",
		publishedAt: "May 2026",
		accent: "blue",
		contentHtml: integrationsComparisonHtml,
	},
	{
		slug: "signs-your-renewal-process-is-quietly-broken",
		title: "7 Signs Your Renewal Process Is Quietly Broken",
		summary:
			"Most renewal problems don't announce themselves — they show up as patterns. Here are 7 signs your renewal process is structurally broken, and what each one costs you before you fix it.",
		tags: ["Renewal Process", "Customer Success", "SaaS Churn"],
		readTime: "9 min read",
		publishedAt: "May 2026",
		accent: "blue",
		contentHtml: renewalProcessBrokenHtml,
	},
	{
		slug: "hidden-cost-of-manual-renewal-process",
		title: "The Hidden Cost of a Manual Renewal Process",
		summary:
			"Manual renewal management doesn't just feel inefficient — it has a calculable cost. Here's how to put real numbers on CSM time, missed expansions, and preventable churn at your company.",
		tags: ["RevOps", "Customer Success", "SaaS Retention"],
		readTime: "10 min read",
		publishedAt: "May 2026",
		accent: "blue",
		contentHtml: hiddenCostManualHtml,
	},
	{
		slug: "how-to-build-a-renewal-playbook-from-scratch",
		title: "How to Build a Renewal Playbook from Scratch",
		summary:
			"A practical, step-by-step guide to building a renewal playbook — covering segmentation, health scoring, sequence design, escalation tracks, and the leadership visibility layer.",
		tags: ["Playbook", "Customer Success", "Renewal Automation"],
		readTime: "12 min read",
		publishedAt: "May 2026",
		accent: "blue",
		contentHtml: renewalPlaybookHtml,
	},
	{
		slug: "cs-metrics-every-saas-team-should-track",
		title: "5 CS Metrics Every SaaS Team Should Track (and One to Ignore)",
		summary:
			"The CS metrics that actually predict renewal outcomes — GRR, NRR, TTFV, health score accuracy, and CSM capacity — plus the one most teams obsess over that doesn't deliver real signal.",
		tags: ["CS Metrics", "RevOps", "Customer Success"],
		readTime: "10 min read",
		publishedAt: "May 2026",
		accent: "blue",
		contentHtml: csMetricsHtml,
	},
	{
		slug: "renewal360-setup-guide-live-in-7-days",
		title: "Renewal360 Setup Guide: Live in 7 Days",
		summary:
			"A day-by-day guide to getting Renewal360 fully operational — CRM connection, health scoring, first sequences live, and your team running independently in 7 days and 3–4 hours of active setup.",
		tags: ["Setup Guide", "Renewal360", "Onboarding"],
		readTime: "11 min read",
		publishedAt: "May 2026",
		accent: "blue",
		contentHtml: setupGuideHtml,
	},
	{
		slug: "renewal360-vs-spreadsheets-honest-comparison",
		title: "Renewal360 vs Spreadsheets: The Honest Comparison",
		summary:
			"What spreadsheets do well, the three specific ways they break down at scale, and a worked ROI example for when switching to a dedicated renewal system pays for itself.",
		tags: ["Comparison", "Renewal360", "SaaS Tools"],
		readTime: "10 min read",
		publishedAt: "May 2026",
		accent: "blue",
		contentHtml: vsSpreadsheetHtml,
	},
];