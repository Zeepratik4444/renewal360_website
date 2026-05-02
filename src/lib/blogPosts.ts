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
		title:
			"How Renewal360 Works: The CS Platform Built for SaaS Retention",
		summary:
			"See how Renewal360 works as a full CS platform—from health scoring and lifecycle management to AI-drafted renewal outreach and enterprise integrations.",
		tags: ["How It Works", "CS Platform", "Customer Success"],
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
		title:
			"Gainsight vs Totango vs Renewal360 - Which CS Platform is Right for You?",
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
			"Why growing SaaS teams are moving away from spreadsheets and complex enterprise tools toward action-focused CS platforms like Renewal360.",
		tags: ["Strategy", "Customer Success", "SaaS Growth"],
		readTime: "8 min read",
		publishedAt: "April 2026",
		accent: "blue",
		contentHtml: customerSuccessPlatformHtml,
	},
	{
		slug: "how-to-run-your-entire-cs-operation-in-renewal360",
		title: "How to Run Your Entire CS Operation in Renewal360",
		summary:
			"A guide to using Renewal360 as your primary Customer Success operating system, from health scoring to lifecycle automation.",
		tags: ["Tutorial", "Operations", "Best Practices"],
		readTime: "9 min read",
		publishedAt: "April 2026",
		accent: "blue",
		contentHtml: runCsOperationHtml,
	},
	{
		slug: "zendesk-hubspot-salesforce-cs-platform-comparison",
		title: "Zendesk, HubSpot, & Salesforce: Choosing the Right CS Platform Integration",
		summary:
			"How to choose a Customer Success platform based on your existing CRM and support stack. Why deep integrations are the secret to preventing churn.",
		tags: ["Integrations", "Technology", "Buying Guide"],
		readTime: "8 min read",
		publishedAt: "April 2026",
		accent: "blue",
		contentHtml: integrationsComparisonHtml,
	},
];
