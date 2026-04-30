import automateEmailsHtml from "@/content/blog/blog-1-automate-saas-renewal-emails.html?raw";
import loseRenewalsHtml from "@/content/blog/blog-2-why-saas-companies-lose-renewals.html?raw";
import comparisonHtml from "@/content/blog/blog-3-gainsight-vs-totango-vs-renewal360.html?raw";
import churnZeroAlternativeHtml from "@/content/blog/blog-4-churnzero-alternative-growing-saas-teams.html?raw";
import totangoAlternativeHtml from "@/content/blog/blog-5-totango-alternative-faster-renewal-automation.html?raw";
import renewalAutomationHtml from "@/content/blog/blog-6-what-is-renewal-automation.html?raw";
import howRenewal360WorksHtml from "@/content/blog/blog-7-how-renewal360-works.html?raw";

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
		title:
			"Gainsight vs Totango vs Renewal360 - Which Renewal Automation Tool is Right for You?",
		summary:
			"A buyer-focused comparison for SaaS teams deciding whether they need a broad customer success platform or a faster renewal automation engine.",
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
];
