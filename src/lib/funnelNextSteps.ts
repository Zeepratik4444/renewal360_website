import type { FunnelStage } from "@/lib/analytics";

export type BlogNextStep = {
	stage: FunnelStage;
	title: string;
	description: string;
	label: string;
	to: string;
};

export const BLOG_NEXT_STEPS: Record<string, BlogNextStep> = {
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
