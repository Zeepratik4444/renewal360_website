export type BlogAnswerBlock = {
	question: string;
	answer: string;
	facts?: string[];
	comparison?: Array<{
		label: string;
		value: string;
		detail: string;
	}>;
};

export const BLOG_ANSWER_BLOCKS: Record<string, BlogAnswerBlock> = {
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
		facts: [
			"CRM data stays the source of truth",
			"AI drafts should be reviewed before sending",
			"Reply detection prevents awkward follow-ups",
		],
	},
	"why-saas-companies-lose-renewals": {
		question: "Why do SaaS companies lose renewals?",
		answer:
			"SaaS companies often lose renewals because renewal risk is detected too late, follow-up ownership is unclear, customer sentiment is not tracked, and manual reminders fail when renewal volume grows.",
		facts: [
			"Late risk detection creates surprise churn",
			"Manual reminders break at scale",
			"CS and RevOps need shared visibility",
		],
	},
	"gainsight-vs-totango-vs-renewal360": {
		question: "When should a SaaS team choose Renewal360 over Gainsight or Totango?",
		answer:
			"A growing SaaS team should consider Renewal360 when it needs focused renewal automation, faster setup, CRM-connected health scoring, and pilot-friendly pricing instead of a broad enterprise customer success platform rollout.",
		facts: [
			"Best fit: lean CS teams",
			"Setup target: 7 days",
			"Primary use case: renewal execution",
		],
		comparison: [
			{
				label: "Best for",
				value: "Growing SaaS renewal teams",
				detail:
					"Renewal360 focuses on renewal playbooks, risk scoring, and execution instead of broad enterprise CS operations.",
			},
			{
				label: "Setup time",
				value: "7-day guided pilot",
				detail:
					"The pilot is built around importing accounts, mapping renewal fields, and launching a first workflow quickly.",
			},
			{
				label: "Choose it when",
				value: "You need renewal automation before platform depth",
				detail:
					"Teams that are not ready for a long enterprise rollout can validate the renewal workflow first.",
			},
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
			{
				label: "Best for",
				value: "Teams outgrowing manual renewal tracking",
				detail:
					"Renewal360 becomes useful when reminders, owner handoffs, and risk signals need to be operationalized.",
			},
			{
				label: "Setup path",
				value: "Start with 25 pilot accounts",
				detail:
					"Teams can test Renewal360 alongside the spreadsheet before replacing the process.",
			},
			{
				label: "Decision signal",
				value: "The spreadsheet no longer predicts churn risk",
				detail:
					"If leadership cannot see ARR at risk or next actions, a workflow system is justified.",
			},
		],
	},
};
