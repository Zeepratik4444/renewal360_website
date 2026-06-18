import { Navigation } from "@/components/Navigation";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import executiveSummaryDashboard from "@/assets/dashboard-summary.png";
import { useSEO } from "@/hooks/useSEO";
import { SiSalesforce, SiHubspot, SiZendesk, SiGmail, SiSlack } from "react-icons/si";
import { WhoThisIsFor } from "@/components/FunnelCTA";
import { trackCtaClick } from "@/lib/analytics";
import { AnswerBlock, FactBox, PageFAQ } from "@/components/AeoGeoBlocks";

/* ── Reusable check list ── */
function CheckList({ items, color = "text-blue-600" }: { items: string[]; color?: string }) {
	return (
		<ul className="space-y-3">
			{items.map((item) => (
				<li key={item} className="flex items-start gap-3">
					<CheckCircle2 className={`h-5 w-5 mt-0.5 flex-shrink-0 ${color}`} />
					<span className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: item }} />
				</li>
			))}
		</ul>
	);
}

/* ── Mock UI card ── */
function MockCard({ children, bg = "bg-blue-50" }: { children: React.ReactNode; bg?: string }) {
	return (
		<div className={`${bg} rounded-2xl p-6 border border-white/60 shadow-sm`}>
			{children}
		</div>
	);
}

export function FeaturesPage() {
	useSEO({
		title: "Features — Health Scoring, Playbooks & CRM Integrations | Renewal360",
		description: "Explore Renewal360 features for growing SaaS teams: account health scoring, renewal playbooks, CRM integrations, and executive visibility without Gainsight complexity.",
	});

	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			{/* Hero */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-20 text-center px-6">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Built on the 20% of features that protect 80% of your ARR.
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Every feature below exists in the live product - not on a roadmap. Here's exactly how
						Renewal360 works under the hood.
					</p>
				</div>
			</section>

			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
				<WhoThisIsFor
					items={[
						"SaaS teams with renewal risk hidden across CRM, inbox, and spreadsheets",
						"CS teams that need playbooks without a long enterprise rollout",
						"Leaders who want ARR-at-risk visibility before customers churn",
					]}
				/>
				<div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
					<AnswerBlock
						question="What does Renewal360 do?"
						answer="Renewal360 helps growing SaaS teams prevent missed renewals by combining account health scoring, AI-drafted renewal outreach, human approval workflows, CRM integrations, and executive ARR-at-risk visibility in one renewal operating system."
						facts={[
							"Health scoring for renewal risk",
							"Human-approved AI renewal emails",
							"CRM, email, and Slack workflow support",
						]}
					/>
					<FactBox
						title="Quote-ready product facts"
						facts={[
							"Renewal360 is built for SaaS renewal automation.",
							"The product supports Salesforce, HubSpot, Google Sheets, email, and Slack workflows.",
							"Teams can start with a 25-account pilot.",
							"The guided setup target is 7 days.",
						]}
					/>
				</div>

				{/* ── 1. 5-Factor Risk Scoring ── */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold uppercase tracking-widest mb-4">
							Risk Intelligence
						</span>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							5-Factor AI Risk Scoring - with dynamic weights
						</h2>
						<p className="text-gray-600 mb-6 leading-relaxed">
							Most tools flag an account as "at risk" simply because no one emailed in 30 days. That's a false positive factory. Renewal360 scores every account across five independent factors - and the weight of each factor shifts automatically as the renewal date approaches.
						</p>
						<CheckList
							color="text-red-500"
							items={[
								"<strong>Engagement Health</strong> - activity recency, frequency, and no-reply decay",
								"<strong>Sentiment & Value Realisation</strong> - LLM-scored ROI signals and relationship quality from email history",
								"<strong>Relationship Depth</strong> - contact breadth, exec access, champion stability, QBR recency",
								"<strong>Financial Health</strong> - invoice payment history, overdue invoices, late payment patterns",
								"<strong>Renewal Momentum</strong> - timeline pressure + explicit renewal commitment signals",
							]}
						/>
						<p className="text-sm text-gray-500 mt-5 italic">
							At T-90+ days: Engagement carries 38% weight. At T-7 days: Momentum carries 45% weight.
							The model adapts - so a quiet-but-healthy account isn't flagged as a crisis.
						</p>
						<div className="mt-4">
							<Link
								to="/blog/$slug"
								params={{ slug: "customer-success-platform-for-growing-saas" }}
								className="text-blue-600 font-semibold hover:underline text-sm inline-flex items-center gap-1"
							>
								Learn more: The CS platform built for growing SaaS &rarr;
							</Link>
						</div>
					</div>
					<MockCard bg="bg-red-50">
						<div className="text-sm font-semibold text-gray-700 mb-4">Health Score Breakdown</div>
						{[
							{ label: "Engagement Health", score: 82, note: "Last contact 4 days ago", bar: "bg-green-500" },
							{ label: "Sentiment & Value", score: 91, note: "ROI confirmed in last QBR", bar: "bg-green-500" },
							{ label: "Relationship Depth", score: 74, note: "Exec sponsor engaged", bar: "bg-yellow-400" },
							{ label: "Financial Health", score: 100, note: "All invoices paid on time", bar: "bg-green-500" },
							{ label: "Renewal Momentum", score: 58, note: "No verbal commit yet (T-28)", bar: "bg-orange-400" },
						].map(({ label, score, note, bar }) => (
							<div key={label} className="mb-4">
								<div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
									<span>{label}</span>
									<span>{score}/100</span>
								</div>
								<div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
									<div className={`h-full ${bar} rounded-full`} style={{ width: `${score}%` }} />
								</div>
								<div className="text-xs text-gray-400">{note}</div>
							</div>
						))}
						<div className="mt-4 border-t pt-4 flex justify-between items-center">
							<span className="text-sm font-bold text-gray-800">Overall: 83/100</span>
							<span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold">Medium Risk</span>
						</div>
					</MockCard>
				</div>

				{/* ── 2. Smart Milestone Sequences ── */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<MockCard bg="bg-blue-50">
						<div className="text-sm font-semibold text-gray-700 mb-4">Renewal Sequence - Acme Corp (Annual)</div>
						{[
							{ days: "T-91 days", type: "Early Check-in", status: "Sent ✓", color: "border-green-400 bg-green-50" },
							{ days: "T-60 days", type: "Renewal Discussion", status: "Sent ✓", color: "border-green-400 bg-green-50" },
							{ days: "T-30 days", type: "Renewal Reminder", status: "Pending approval", color: "border-blue-400 bg-blue-50" },
							{ days: "T-7 days", type: "Urgent Reminder", status: "Scheduled", color: "border-gray-200 bg-white" },
						].map(({ days, type, status, color }) => (
							<div key={days} className={`flex items-center justify-between p-3 rounded-lg border ${color} mb-2 text-sm`}>
								<div>
									<div className="font-semibold text-gray-800">{type}</div>
									<div className="text-xs text-gray-500">{days}</div>
								</div>
								<span className="text-xs text-gray-600">{status}</span>
							</div>
						))}
						<div className="text-xs text-gray-400 mt-3 text-center">Monthly accounts get proportionally timed sequences - not the same fixed dates</div>
					</MockCard>
					<div>
						<span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest mb-4">
							Email Sequences
						</span>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Smart milestone sequences - proportional to each account's term
						</h2>
						<p className="text-gray-600 mb-6 leading-relaxed">
							Fixed day counts ("email at T-60, T-30, T-7") don't work for monthly accounts. Renewal360 fires outreach at proportional milestones - 25%, 16%, 8%, and 2% of the contract term remaining - so every account gets appropriately timed outreach regardless of billing cycle.
						</p>
						<CheckList items={[
							"Four email types: check-in, renewal discussion, renewal reminder, urgent reminder",
							"Sequences pause automatically when a customer replies - no awkward follow-ups mid-conversation",
							"High-value at-risk accounts trigger an Escalate decision, creating a CSM task instead of sending automation",
							"Sequence analytics track open rates, reply rates, and step-level performance per template",
						]} />
						<div className="mt-4">
							<Link
								to="/blog/$slug"
								params={{ slug: "what-is-renewal-automation" }}
								className="text-blue-600 font-semibold hover:underline text-sm inline-flex items-center gap-1"
							>
								Learn more: What is renewal automation? &rarr;
							</Link>
						</div>
					</div>
				</div>

				{/* ── 3. Visual Sequence Builder ── */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-widest mb-4">
							Sequence Builder
						</span>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Visual drag-and-drop sequence builder with branching logic
						</h2>
						<p className="text-gray-600 mb-6 leading-relaxed">
							Build your own renewal playbooks without touching code. The pipeline editor supports four step types and branches based on real customer signals - not just time delays.
						</p>
						<CheckList color="text-purple-600" items={[
							"<strong>Step types:</strong> Email, CSM Task, Slack DM, In-App Alert",
							"<strong>Branch conditions:</strong> Customer replied, No reply after delay, Email opened, Link clicked, Risk changed to High, ARR above threshold",
							"Clone and customise templates - or start from a pre-built library",
							"Variable injection with @-mention custom fields (e.g. {{account_name}}, {{arr}}, {{renewal_date}})",
						]} />
					</div>
					<MockCard bg="bg-purple-50">
						<div className="text-sm font-semibold text-gray-700 mb-4">Sequence Flow Builder</div>
						<div className="space-y-2">
							{[
								{ icon: "✉️", label: "Email - Renewal Discussion", sub: "Day 0", color: "border-blue-300" },
								{ icon: "↓", label: "", sub: "Wait 5 days", color: "border-transparent", small: true },
								{ icon: "🔀", label: "Branch: Customer replied?", sub: "Condition", color: "border-purple-300" },
							].map((s, i) =>
								s.small ? (
									<div key={i} className="text-center text-xs text-gray-400 py-1">{s.sub}</div>
								) : (
									<div key={i} className={`flex items-center gap-3 p-3 bg-white rounded-lg border ${s.color} text-sm`}>
										<span className="text-lg">{s.icon}</span>
										<div>
											<div className="font-medium text-gray-800">{s.label}</div>
											<div className="text-xs text-gray-400">{s.sub}</div>
										</div>
									</div>
								)
							)}
							<div className="grid grid-cols-2 gap-2 mt-1">
								<div className="p-3 bg-green-50 border border-green-300 rounded-lg text-xs">
									<div className="font-semibold text-green-700 mb-1">✓ Yes - replied</div>
									<div className="text-gray-600">Pause sequence → CSM task created</div>
								</div>
								<div className="p-3 bg-orange-50 border border-orange-300 rounded-lg text-xs">
									<div className="font-semibold text-orange-700 mb-1">✗ No reply</div>
									<div className="text-gray-600">Send Renewal Reminder email</div>
								</div>
							</div>
						</div>
					</MockCard>
				</div>

				{/* ── 4. Human Approval Queue ── */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<MockCard bg="bg-teal-50">
						<div className="text-sm font-semibold text-gray-700 mb-4">Email Approval Queue</div>
						{[
							{
								account: "Acme Corp", arr: "$85K", type: "Renewal Reminder", risk: "High",
								riskColor: "bg-red-100 text-red-700",
								preview: "Hi Sarah, your contract renews in 28 days. Given your team's strong usage of the reporting module...",
								actions: [
									{ label: "Send", cls: "bg-blue-600 text-white" },
									{ label: "Edit", cls: "bg-gray-100 text-gray-700" },
									{ label: "Skip", cls: "bg-gray-100 text-gray-500" },
								],
							},
							{
								account: "StartupXYZ", arr: "$28K", type: "Check-in", risk: "Medium",
								riskColor: "bg-yellow-100 text-yellow-700",
								preview: "Hi Jordan, just checking in as your renewal comes up next quarter. Happy to schedule a quick call...",
								actions: [
									{ label: "Send", cls: "bg-blue-600 text-white" },
									{ label: "Edit", cls: "bg-gray-100 text-gray-700" },
									{ label: "Skip", cls: "bg-gray-100 text-gray-500" },
								],
							},
						].map(({ account, arr, type, risk, riskColor, preview, actions }) => (
							<div key={account} className="bg-white rounded-xl p-4 mb-3 border border-gray-100">
								<div className="flex justify-between items-start mb-2">
									<div>
										<div className="font-semibold text-sm text-gray-800">{account} · {arr} ARR</div>
										<div className="text-xs text-gray-500">{type}</div>
									</div>
									<span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${riskColor}`}>{risk}</span>
								</div>
								<p className="text-xs text-gray-600 italic mb-3 line-clamp-2">"{preview}"</p>
								<div className="flex gap-2">
									{actions.map(({ label, cls }) => (
										<button key={label} className={`text-xs px-3 py-1.5 rounded-lg font-semibold ${cls}`}>{label}</button>
									))}
								</div>
							</div>
						))}
					</MockCard>
					<div>
						<span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-widest mb-4">
							Approval Workflow
						</span>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							AI drafts every email. Humans decide what goes out.
						</h2>
						<p className="text-gray-600 mb-6 leading-relaxed">
							Every pending email lands in your team's approval queue with full context - account ARR, risk level, and the AI-generated draft. One click to send, edit, or skip. High-value at-risk accounts trigger an Escalate decision that creates a CSM task and cancels the automation.
						</p>
						<CheckList color="text-teal-600" items={[
							"Four decisions per step: <strong>Send, Skip, Pause, Escalate</strong>",
							"Escalation creates a CSM task and pauses automation - so your team handles high-stakes accounts directly",
							"Sequence pauses automatically when a customer reply is detected via IMAP monitoring",
							"Full audit trail - every decision (by whom, when, what action) is logged",
						]} />
					</div>
				</div>

				{/* ── 5. NPS Surveys ── */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold uppercase tracking-widest mb-4">
							NPS Surveys
						</span>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Direct customer sentiment - not just inferred from email activity
						</h2>
						<p className="text-gray-600 mb-6 leading-relaxed">
							A customer who hasn't emailed in 45 days isn't necessarily unhappy - they might have just signed a 3-year deal. NPS surveys give you direct satisfaction data that feeds directly into the risk score, eliminating the false positives that waste your team's time.
						</p>
						<CheckList color="text-yellow-600" items={[
							"Auto-triggered at T-45 days before renewal, 7 days post-onboarding, and after support ticket resolution",
							"Promoter scores (9–10) reduce risk level and add positive health signal",
							"Detractor scores (0–6) immediately flag the account and alert the assigned CSM",
							"Survey builder with custom templates - build once, deploy across all accounts",
						]} />
					</div>
					<MockCard bg="bg-yellow-50">
						<div className="text-sm font-semibold text-gray-700 mb-4">Customer Satisfaction - TechCorp</div>
						<div className="bg-white rounded-xl p-5 border border-yellow-100 mb-3">
							<div className="flex items-center gap-4 mb-3">
								<div className="text-4xl font-extrabold text-green-600">9</div>
								<div>
									<div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">NPS Score</div>
									<div className="text-sm font-bold text-green-600">⭐ Promoter</div>
									<div className="text-xs text-gray-400">Received Feb 10, 2026</div>
								</div>
							</div>
							<p className="text-xs text-gray-600 italic border-l-2 border-green-300 pl-3">
								"Love the platform. Support team is incredibly responsive and the AI emails have saved us hours every week."
							</p>
							<div className="mt-3 p-2 bg-green-50 rounded-lg text-xs text-green-700 font-medium">
								↑ Health score boosted · Risk level: Low ✅
							</div>
						</div>
						<div className="bg-white rounded-xl p-5 border border-red-100">
							<div className="flex items-center gap-4 mb-3">
								<div className="text-4xl font-extrabold text-red-500">4</div>
								<div>
									<div className="text-xs text-gray-500 uppercase tracking-widest font-semibold">NPS Score</div>
									<div className="text-sm font-bold text-red-500">⚠️ Detractor</div>
									<div className="text-xs text-gray-400">Received Feb 8, 2026</div>
								</div>
							</div>
							<p className="text-xs text-gray-600 italic border-l-2 border-red-300 pl-3">
								"Onboarding was rough and we still haven't connected to our Salesforce."
							</p>
							<div className="mt-3 p-2 bg-red-50 rounded-lg text-xs text-red-700 font-medium">
								🔔 CSM alerted · Escalation task created
							</div>
						</div>
					</MockCard>
				</div>

				{/* ── 6. Executive Dashboard ── */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<img
						src={executiveSummaryDashboard}
						alt="Executive Revenue Dashboard"
						className="w-full h-auto rounded-2xl shadow-lg"
					/>
					<div>
						<span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold uppercase tracking-widest mb-4">
							Executive Dashboard
						</span>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							See revenue at risk - not just renewal counts
						</h2>
						<p className="text-gray-600 mb-6 leading-relaxed">
							"25 renewals at High Risk" means nothing to a CFO. The executive dashboard translates risk into ARR - so leadership can see exactly how much revenue is at stake, who's responsible for it, and what's been done.
						</p>
						<CheckList color="text-orange-500" items={[
							"Revenue pipeline broken down by High / Medium / Healthy with dollar values and account counts",
							"6-month renewal forecast - see ARR at risk per upcoming month",
							"CSM leaderboard by ARR saved, response rate, and accounts managed",
							"KPI cards: Total ARR, 90/60/30-day pipeline, weighted health score distribution",
						]} />
					</div>
				</div>

				{/* ── 7. Integrations ── */}
				<div className="grid md:grid-cols-2 gap-12 items-center">
					<div>
						<span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-widest mb-4">
							Integrations
						</span>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">
							Connects to your CRM, inbox, and Slack - in hours, not months
						</h2>
						<p className="text-gray-600 mb-6 leading-relaxed">
							Renewal360 reads from and writes back to the tools you already use. No ripping and replacing your stack - and no manual data entry.
						</p>
						<CheckList color="text-indigo-600" items={[
							"<strong>Salesforce</strong> - bi-directional opportunity sync (Scale plan)",
							"<strong>HubSpot</strong> - deal and contact sync, renewal date pull (Growth+)",
							"<strong>Zendesk</strong> - support ticket volume feeds into the Financial Health factor",
							"<strong>IMAP Email Monitoring</strong> - reads incoming replies to detect sentiment and auto-pause sequences",
							"<strong>Slack</strong> - at-risk alerts, daily digest, and slash-command account summaries",
							"<strong>Google Sheets</strong> - simple CSV-style import for teams not on a CRM (all plans)",
						]} />
					</div>
					<MockCard bg="bg-indigo-50">
						<div className="text-sm font-semibold text-gray-700 mb-4">Integrations Hub</div>
						<div className="space-y-3">
							{[
								{ icon: <SiSalesforce className="w-6 h-6 text-[#00A1E0]" />, name: "Salesforce", status: "Connected", statusCls: "text-green-600 bg-green-50", detail: "Last synced 4 min ago · 312 accounts" },
								{ icon: <SiHubspot className="w-6 h-6 text-[#FF7A59]" />, name: "HubSpot", status: "Connected", statusCls: "text-green-600 bg-green-50", detail: "Last synced 12 min ago · 187 deals" },
								{ icon: <SiZendesk className="w-6 h-6 text-[#03363D]" />, name: "Zendesk", status: "Connected", statusCls: "text-green-600 bg-green-50", detail: "Ticket volume feeding into risk scores" },
								{ icon: <SiGmail className="w-6 h-6 text-[#EA4335]" />, name: "Gmail (IMAP)", status: "Monitoring", statusCls: "text-blue-600 bg-blue-50", detail: "Watching inbox · 3 replies detected today" },
								{ icon: <SiSlack className="w-6 h-6 text-[#E01E5A]" />, name: "Slack", status: "Active", statusCls: "text-green-600 bg-green-50", detail: "#cs-alerts · daily digest at 9am" },
							].map(({ icon, name, status, statusCls, detail }) => (
								<div key={name} className="bg-white rounded-xl p-3 flex items-center gap-3 border border-white/60">
									<div className="flex-shrink-0 flex items-center justify-center w-8 h-8">{icon}</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2">
											<span className="font-semibold text-sm text-gray-800">{name}</span>
											<span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusCls}`}>{status}</span>
										</div>
										<div className="text-xs text-gray-400 truncate">{detail}</div>
									</div>
								</div>
							))}
						</div>
					</MockCard>
				</div>

				{/* ── Comparison table ── */}
				<div>
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold text-gray-900 mb-3">
							Feature comparison
						</h2>
						<p className="text-gray-600">How Renewal360 stacks up against the enterprise incumbents.</p>
					</div>
					<div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
						<table className="w-full text-left border-collapse min-w-[640px]">
							<thead>
								<tr className="bg-gray-50 border-b border-gray-200">
									<th className="p-5 text-sm font-semibold text-gray-500 w-1/3">Feature</th>
									<th className="p-5 text-sm font-bold text-blue-600 bg-blue-50/60 w-1/3">Renewal360</th>
									<th className="p-5 text-sm font-semibold text-gray-500 w-1/3">Traditional Enterprise Software</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-100">
								{[
									["5-Factor AI Risk Scoring", "✓ Dynamic weights", "✓ Complex setup required"],
									["AI Email Drafting", "✓ Built-in (Gemini)", "Add-on, extra cost"],
									["Human Approval Workflow", "✓ Every email", "✗"],
									["Visual Sequence Builder", "✓ Branching logic", "✓ Playbook builder"],
									["NPS Survey System", "✓ Built-in", "✓"],
									["Revenue at Risk Dashboard", "✓ Built-in", "✓"],
									["IMAP Email Monitoring", "✓ Auto-pause on reply", "✗"],
									["Salesforce / HubSpot Sync", "✓ Bi-directional", "✓"],
									["Slack Alerts", "✓ Built-in", "✓"],
									["Setup time", "7 days", "3–6 months"],
									["Cost / year", "From $5,988", "$30K–$150K"],
								].map(([feature, r360, enterprise]) => (
									<tr key={feature}>
										<td className="p-5 text-sm font-medium text-gray-800">{feature}</td>
										<td className="p-5 bg-blue-50/30 text-sm font-semibold text-green-700">{r360}</td>
										<td className="p-5 text-sm text-gray-500">{enterprise}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-5">
					{[
						{
							title: "Guided setup",
							desc: "Import accounts, map renewal fields, and configure your first workflow in 7 days.",
						},
						{
							title: "CRM-first workflow",
							desc: "Keep Salesforce, HubSpot, or Sheets as the source of truth while Renewal360 runs the renewal motion.",
						},
						{
							title: "Clear replacement path",
							desc: "Graduate from spreadsheets or simplify a heavy CS platform without losing executive visibility.",
						},
					].map(({ title, desc }) => (
						<div key={title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
							<h2 className="text-base font-bold text-gray-900">{title}</h2>
							<p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>
						</div>
					))}
				</div>
				<PageFAQ
					title="Feature questions buyers ask"
					items={[
						{
							question: "What are Renewal360's core features?",
							answer:
								"Renewal360's core features are account health scoring, renewal playbooks, AI-drafted outreach, human approval queues, CRM and email integrations, Slack alerts, and ARR-at-risk dashboards.",
						},
						{
							question: "Does Renewal360 replace a CRM?",
							answer:
								"No. Renewal360 is designed to work around your CRM or spreadsheet source of truth and add the renewal workflow layer that turns account data into actions.",
						},
						{
							question: "How is Renewal360 different from enterprise CS platforms?",
							answer:
								"Renewal360 focuses on renewal execution for growing SaaS teams, with faster setup and fewer enterprise platform layers than broad tools like Gainsight or Totango.",
						},
					]}
				/>

				{/* ── CTA ── */}
				<div className="bg-gray-900 rounded-2xl p-12 text-center text-white relative overflow-hidden">
					<div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
					<h2 className="text-3xl font-bold mb-4">See it with your own accounts.</h2>
					<p className="text-gray-300 mb-8 max-w-xl mx-auto">
						Free pilot - 25 accounts, no credit card, up and running in 7 days.
						Our onboarding team handles the setup.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/contact">
							<Button
								size="lg"
								className="text-lg px-8 bg-blue-500 hover:bg-blue-600 border-none"
								onClick={() =>
									trackCtaClick({
										cta_text: "Start Free Pilot",
										cta_location: "features_bottom_cta",
										funnel_stage: "decision",
										target_url: "/contact",
									})
								}
							>
								Start Free Pilot →
							</Button>
						</Link>
						<Link to="/pricing">
							<Button
								size="lg"
								variant="outline"
								className="text-lg px-8 border-white/30 text-white hover:bg-white/10 bg-transparent"
								onClick={() =>
									trackCtaClick({
										cta_text: "View pricing",
										cta_location: "features_bottom_cta",
										funnel_stage: "consideration",
										target_url: "/pricing",
									})
								}
							>
								View pricing
							</Button>
						</Link>
						<Link to="/glimpses">
							<Button size="lg" variant="outline" className="text-lg px-8 border-white/30 text-white hover:bg-white/10 bg-transparent">
								View Glimpses
							</Button>
						</Link>
					</div>
				</div>

			</div>
		</div>
	);
}

