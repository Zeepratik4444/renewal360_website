import { Navigation } from "@/components/Navigation";
import { Zap, Target, Mail, Shield, BarChart3 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { WhoThisIsFor } from "@/components/FunnelCTA";
import { trackCtaClick } from "@/lib/analytics";
import { AnswerBlock, FactBox, PageFAQ } from "@/components/AeoGeoBlocks";

export function HowItWorksPage() {
	useSEO({
		title: "How Renewal360 Works — From Health Score to Closed Renewal | Renewal360",
		description: "See how Renewal360 turns CRM data into health scores, AI-drafted renewal playbooks, and closed renewals for SaaS teams outgrowing spreadsheets or Totango.",
	});

	const steps = [
		{
			step: "01",
			title: "You connect your CRM and email",
			story: "Link Salesforce, HubSpot, or Google Sheets. Renewal360 imports your accounts, ARR values, renewal dates, and contact details. Our onboarding team configures everything - you don't touch a single API key.",
			detail: "Setup takes 1–2 days. Your CRM stays the source of truth.",
			icon: <Zap className="h-6 w-6 text-white" />,
			color: "bg-blue-600",
		},
		{
			step: "02",
			title: "The Smart Pipeline starts monitoring",
			story: "As each renewal approaches, the pipeline triggers at key milestones - 90, 60, 30, and 7 days before the renewal date. It evaluates every account against risk level, ARR value, customer sentiment, and engagement history to decide the right action at the right time.",
			detail: "No account slips through. Every milestone is tracked automatically.",
			icon: <Target className="h-6 w-6 text-white" />,
			color: "bg-indigo-600",
		},
		{
			step: "03",
			title: "AI drafts personalised emails using Renewal Copilot",
			story: "For each triggered account, the Renewal Copilot - an AI agent analyses risk signals, recent engagement, and account context to draft a personalised email. High-risk accounts get empathetic, proactive messaging. Healthy accounts get celebratory, retention-focused outreach. Every draft is grounded in real data - never fabricated.",
			detail: "Supports A/B testing, conditional branching, and tone customisation per sequence.",
			icon: <Mail className="h-6 w-6 text-white" />,
			color: "bg-violet-600",
		},
		{
			step: "04",
			title: "7 smart guards protect your brand",
			story: "Before any email is sent, the Enrollment Engine runs 7 intelligent checks: Does the customer's risk level match? Is their ARR above the threshold? Is today a blackout day? Did the customer recently reply? Is this a high-value account that needs a human touch? If any guard triggers, the system pauses, skips, or escalates - automatically creating a task for your CSM with full context.",
			detail: "You approve every email. Nothing sends without your team's sign-off.",
			icon: <Shield className="h-6 w-6 text-white" />,
			color: "bg-emerald-600",
		},
		{
			step: "05",
			title: "Track, optimise, and report - in real time",
			story: "Your executive dashboard shows live ARR at risk, renewal pipeline by milestone, team performance, and which accounts responded or need escalation. NPS surveys capture customer sentiment at key moments. Notifications reach your team via email, Slack, or in-app alerts - wherever they work.",
			detail: "Leadership gets a single source of truth. No more end-of-quarter surprises.",
			icon: <BarChart3 className="h-6 w-6 text-white" />,
			color: "bg-blue-600",
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
			<Navigation />

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Here's what happens after you connect your data.
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Behind the scenes, Renewal360's AI engine continuously monitors every account, crafts intelligent outreach, and escalates at-risk revenue - so your team focuses only on what matters.
					</p>
				</div>
				<div className="mb-16">
					<WhoThisIsFor
						items={[
							"Teams ready to move from manual reminders to monitored renewal workflows",
							"CS and RevOps leaders who need CRM-connected health scoring",
							"SaaS operators who want guided setup instead of a long implementation",
						]}
					/>
				</div>
				<div className="mb-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
					<AnswerBlock
						question="How does Renewal360 work?"
						answer="Renewal360 works by importing CRM or spreadsheet renewal data, calculating account health and renewal risk, drafting outreach with AI, routing messages through human approval, and showing leadership which accounts and ARR need attention."
						facts={[
							"Connect CRM or import accounts",
							"Score risk before renewal deadlines",
							"Approve every customer-facing email",
						]}
					/>
					<FactBox
						title="Setup facts"
						facts={[
							"Typical pilot setup target is 7 days.",
							"Teams can begin with 25 pilot accounts.",
							"Renewal360 keeps the CRM or spreadsheet as the source of truth.",
							"Human approval is part of the workflow before outreach is sent.",
						]}
					/>
				</div>

				<div className="relative max-w-3xl mx-auto">
					{/* Vertical connector line */}
					<div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block" />

					{steps.map((s, i) => (
						<div key={s.step} className={`relative flex gap-6 ${i < 4 ? "mb-10" : ""}`}>
							{/* Step circle */}
							<div className={`shrink-0 w-12 h-12 rounded-full ${s.color} flex items-center justify-center z-10 shadow-lg mt-1`}>
								{s.icon}
							</div>
							{/* Content card */}
							<div className="bg-white rounded-xl shadow-sm border border-blue-100 p-8 flex-1">
								<div className="flex items-center gap-3 mb-3">
									<span className="text-sm font-bold text-blue-500 font-mono tracking-wide">STEP {s.step}</span>
								</div>
								<h3 className="font-bold text-2xl text-gray-900 mb-3">{s.title}</h3>
								<p className="text-gray-600 text-base leading-relaxed mb-4">{s.story}</p>
								<div className="bg-blue-50 rounded-lg px-4 py-3 inline-block border border-blue-100">
									<p className="text-sm font-semibold text-blue-700">{s.detail}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="mt-14 grid md:grid-cols-3 gap-5">
					{[
						{
							title: "Setup time",
							desc: "Most pilots go live in 7 days with 3-4 hours of active setup from your team.",
						},
						{
							title: "Integrations",
							desc: "Connect CRM, inbox, and Slack so renewal data stays where your team already works.",
						},
						{
							title: "Replacement path",
							desc: "Start with 25 accounts, then move spreadsheet or enterprise-tool workflows into Renewal360.",
						},
					].map(({ title, desc }) => (
						<div key={title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
							<h2 className="text-base font-bold text-gray-900">{title}</h2>
							<p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>
						</div>
					))}
				</div>
				<div className="mt-14">
					<PageFAQ
						title="How-it-works questions buyers ask"
						items={[
							{
								question: "Does Renewal360 send emails automatically?",
								answer:
									"Renewal360 can draft and schedule renewal outreach, but the workflow is built around human approval so teams can review, edit, skip, pause, or escalate before customer-facing messages go out.",
							},
							{
								question: "What data does Renewal360 need to start?",
								answer:
									"Renewal360 needs account names, renewal dates, ARR or contract value, owner information, and contact data from a CRM or spreadsheet to start a pilot workflow.",
							},
							{
								question: "How fast can a team see the first renewal workflow?",
								answer:
									"The product is designed for a 7-day guided setup path that gets the first renewal workflow live with a limited pilot account set.",
							},
						]}
					/>
				</div>

				<div className="mt-16 text-center max-w-2xl mx-auto">
					<p className="text-gray-500 italic text-base leading-relaxed bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
						"Renewal360 doesn't just send emails - it thinks about each account the way your best CSM would. It just does it for every account, every milestone, simultaneously."
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/contact">
							<Button
								size="lg"
								className="text-lg px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
								onClick={() =>
									trackCtaClick({
										cta_text: "Start Free Pilot",
										cta_location: "how_it_works_bottom_cta",
										funnel_stage: "decision",
										target_url: "/contact",
									})
								}
							>
								Start Free Pilot →
							</Button>
						</Link>
						<Link to="/glimpses">
							<Button
								size="lg"
								variant="outline"
								className="text-lg px-8 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white shadow-sm"
								onClick={() =>
									trackCtaClick({
										cta_text: "View Glimpses",
										cta_location: "how_it_works_bottom_cta",
										funnel_stage: "consideration",
										target_url: "/glimpses",
									})
								}
							>
								View Glimpses
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
