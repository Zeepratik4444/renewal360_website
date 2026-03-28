import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import dashboardSummary from "@/assets/dashboard-summary.png";
import dashboardRisk from "@/assets/dashboard-risk.png";
import dashboardForecast from "@/assets/dashboard-forecast.png";
import actionCenter from "@/assets/actioncenter.png";
import renewalList from "@/assets/renewallist.png";
import renewalDetail from "@/assets/renewaldetail.png";
import aiHelper from "@/assets/aihelper.PNG";
import sequenceBuilder from "@/assets/sequencebuilder.PNG";
import { CheckCircle2, TrendingUp, PieChart, Activity, ListFilter, UserCog, MessageSquare, Mail, Maximize2, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

function ExpandableImage({ src, alt, containerClassName = "" }: { src: string; alt: string; containerClassName?: string }) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div 
				className={`relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-gray-50 flex min-h-[300px] items-center justify-center text-gray-400 cursor-pointer group hover:shadow-2xl hover:border-blue-200 transition-all duration-300 ${containerClassName}`}
				onClick={() => setIsOpen(true)}
			>
				<img src={src} alt={alt} className="w-full h-auto object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
				<div className="absolute bottom-4 right-4 bg-gray-900/80 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-900 border border-white/10 shadow-lg transform translate-y-2 group-hover:translate-y-0">
					<Maximize2 className="h-5 w-5 text-white" />
				</div>
			</div>
			{isOpen && (
				<div 
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8 animate-in fade-in duration-200" 
					onClick={() => setIsOpen(false)}
				>
					<div className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center">
						<button 
							className="absolute top-4 right-0 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors backdrop-blur-md z-[101]"
							onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
						>
							<X className="h-6 w-6" />
						</button>
						<img 
							src={src} 
							alt={alt} 
							className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10" 
							onClick={(e) => e.stopPropagation()} 
						/>
					</div>
				</div>
			)}
		</>
	);
}

export function GlimpsesPage() {
	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<section className="py-24 bg-white" id="glimpses">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-20">
						<Badge className="mb-4 text-blue-700 bg-blue-100 hover:bg-blue-200">Platform Glimpses</Badge>
						<h1
							className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
							style={{ fontFamily: "'Syne', sans-serif" }}
						>
							Executive visibility, <span className="text-blue-600">finally</span>.
						</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Stop relying on spreadsheets. Renewal360 gives leadership and CSMs a real-time, unified platform to identify risk, prioritize actions, and confidently forecast renewals.
						</p>
					</div>

					<div className="space-y-32">
						{/* Glimpse 1: Executive Summary */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div>
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
										<TrendingUp className="text-blue-600 h-5 w-5" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900">Immediate Action, Zero Ambiguity</h2>
								</div>
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									See exactly how much ARR is at risk today. The Executive Summary translates abstract health scores into bottom-line dollar values, showing you immediate and urgent actions that your team needs to take to save revenue.
								</p>
								<ul className="space-y-3">
									{["Track Total ARR vs. At Risk Revenue", "Automatically flag 'Silent Accounts'", "Visual ARR waterfalls for this quarter"].map((t) => (
										<li key={t} className="flex items-start gap-3 text-gray-700 font-medium">
											<CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> {t}
										</li>
									))}
								</ul>
							</div>
							<ExpandableImage src={dashboardSummary} alt="Executive Summary Dashboard" />
						</div>

						{/* Glimpse 2: Risk Analysis */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<ExpandableImage src={dashboardRisk} alt="Risk by Plan Tier and Portfolio Health" containerClassName="order-2 md:order-1" />
							<div className="order-1 md:order-2">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
										<PieChart className="text-amber-600 h-5 w-5" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900">Drill down into Portfolio Health</h2>
								</div>
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									Not all risk is equal. Segment your high, medium, and low risk accounts by subscription tier and analyze their average risk scores. Effortlessly see where your biggest vulnerabilities lie.
								</p>
								<ul className="space-y-3">
									{["Real-time count of High / Medium / Low risk", "Risk distribution by Annual vs Multi-year", "Visual doughnut charts for quick absorption"].map((t) => (
										<li key={t} className="flex items-start gap-3 text-gray-700 font-medium">
											<CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> {t}
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Glimpse 3: Forecast */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div>
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
										<TrendingUp className="text-purple-600 h-5 w-5" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900">Tactical 6-Month Forecasting</h2>
								</div>
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									Predict your upcoming renewal volume weeks in advance. The Tactical Forecast shows exactly which accounts are coming due and their associated risk level, so you aren't fighting fires at the end of the month.
								</p>
								<ul className="space-y-3">
									{["Look ahead up to 6 months", "Color-coded volume charts for renewal dates", "Differentiate between Safe Revenue and At Risk"].map((t) => (
										<li key={t} className="flex items-start gap-3 text-gray-700 font-medium">
											<CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> {t}
										</li>
									))}
								</ul>
							</div>
							<ExpandableImage src={dashboardForecast} alt="Tactical Forecast Dashboard" />
						</div>

						{/* Glimpse 4: Renewal List */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div>
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
										<ListFilter className="text-blue-600 h-5 w-5" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900">Your Renewal Command Center</h2>
								</div>
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									Manage all your upcoming renewals in one unified view. Filter by risk level, milestone, or CSM. See exactly which accounts have automated sequences running and which require immediate manual intervention.
								</p>
								<ul className="space-y-3">
									{["Track renewal momentum across your entire portfolio", "See active AI email sequences at a glance", "Filter by high-risk, upcoming, or passed renewals"].map((t) => (
										<li key={t} className="flex items-start gap-3 text-gray-700 font-medium">
											<CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> {t}
										</li>
									))}
								</ul>
							</div>
							<ExpandableImage src={renewalList} alt="Renewal List View" />
						</div>

						{/* Glimpse 5: Renewal Detail */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<ExpandableImage src={renewalDetail} alt="Renewal Detail View" containerClassName="order-2 md:order-1" />
							<div className="order-1 md:order-2">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
										<UserCog className="text-indigo-600 h-5 w-5" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900">Deep Dive into Account Health</h2>
								</div>
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									Click into any account to see the full context: AI-generated activity summaries, Support Ticket Health, and a weighted 3-factor risk breakdown (Engagement, Sentiment, and Timeline Pressure).
								</p>
								<ul className="space-y-3">
									{["3-Factor Risk score (Engagement, Sentiment, Timeline)", "Analyze ROI signals and Support Traps", "Automated Ghosting and Stakeholder Drift detection"].map((t) => (
										<li key={t} className="flex items-start gap-3 text-gray-700 font-medium">
											<CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> {t}
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Glimpse 6: Action Center */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<ExpandableImage src={actionCenter} alt="Action Center Workflow" containerClassName="order-2 md:order-1" />
							<div className="order-1 md:order-2">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
										<Activity className="text-green-600 h-5 w-5" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900">Sequence Queue & Action Center</h2>
								</div>
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									Every AI-drafted email lands in the queue before it's sent. Preview the fully rendered message with live customer data, override the subject or body, force-send immediately, or skip entirely — you're always in control.
								</p>
								<ul className="space-y-3">
									{["Preview AI-rendered emails with live customer data", "Override, Send Now, or Skip any pending step", "Bulk campaign triggers with one-click enrollment"].map((t) => (
										<li key={t} className="flex items-start gap-3 text-gray-700 font-medium">
											<CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> {t}
										</li>
									))}
								</ul>
							</div>
						</div>

						{/* Glimpse 7: AI Copilot Chat */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div>
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
										<MessageSquare className="text-violet-600 h-5 w-5" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900">AI Copilot — Your CS Co-pilot</h2>
								</div>
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									An agentic AI assistant with 16+ tool calls wired to your live data. Ask it to draft an email, create a task, run a risk analysis, or search your portfolio — all through natural conversation. Every write action requires your explicit approval via confirmation cards.
								</p>
								<ul className="space-y-3">
									{["Natural language search, inspection, and analysis", "Draft emails, log touchpoints, and create tasks via chat", "Confirmation cards for every write action — nothing runs unreviewed"].map((t) => (
										<li key={t} className="flex items-start gap-3 text-gray-700 font-medium">
											<CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> {t}
										</li>
									))}
								</ul>
							</div>
							<ExpandableImage src={aiHelper} alt="AI Copilot Chat Interface" />
						</div>

						{/* Glimpse 8: Email Sequence Builder */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<ExpandableImage src={sequenceBuilder} alt="Email Sequence Builder" containerClassName="order-2 md:order-1" />
							<div className="order-1 md:order-2">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
										<Mail className="text-emerald-600 h-5 w-5" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900">Email Sequence Builder</h2>
								</div>
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									Design multi-step automated email campaigns with a visual drag-and-drop builder. Clone from pre-built templates, target by renewal cohort, and track open rates and funnel analytics — all without leaving the platform.
								</p>
								<ul className="space-y-3">
									{["Clone from templates or build custom sequences", "Cohort-based enrollment (90-day, 60-day, 30-day)", "Per-step funnel analytics and open rate tracking"].map((t) => (
										<li key={t} className="flex items-start gap-3 text-gray-700 font-medium">
											<CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> {t}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── FOOTER ── */}
			<footer className="bg-gray-900 text-gray-400 border-t border-gray-800 py-10 mt-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div>
							<h3 className="text-white font-semibold mb-3">Renewal360</h3>
							<p className="text-sm">AI-powered renewal automation for SaaS teams.</p>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-3">Product</h4>
							<ul className="space-y-2 text-sm">
								{[["Features", "/features"], ["Glimpses", "/glimpses"], ["Pricing", "/pricing"], ["How It Works", "/how-it-works"]].map(([label, to]) => (
									<li key={label}><Link to={to as string} className="hover:text-white transition-colors">{label}</Link></li>
								))}
							</ul>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-3">Company</h4>
							<ul className="space-y-2 text-sm">
								{[["About", "/about"], ["FAQ", "/faq"], ["Contact", "/contact"], ["Terms", "/terms"]].map(([label, to]) => (
									<li key={label}><Link to={to as string} className="hover:text-white transition-colors">{label}</Link></li>
								))}
							</ul>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-3">Connect</h4>
							<ul className="space-y-2 text-sm">
								<li><a href="#" className="hover:text-white">LinkedIn</a></li>
								<li><a href="#" className="hover:text-white">Twitter / X</a></li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 pt-6 text-sm text-center">
						<p>© {new Date().getFullYear()} Renewal360. All rights reserved. · SOC 2 Ready · Built on Gemini 2.0 AI</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
