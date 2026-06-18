import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	CheckCircle2, Clock, Target, TrendingUp, Mail,
	BarChart3, Shield, Zap, Users, Star, BookOpen, ArrowRight
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { PersonaCards } from "@/components/sections/PersonaCards";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { Pricing } from "@/components/sections/Pricing";
import { PlatformGlimpses } from "@/components/sections/PlatformGlimpses";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts } from "@/lib/blogPosts";
import { SiSalesforce, SiHubspot, SiSlack, SiGooglesheets, SiGooglecalendar, SiGmail } from "react-icons/si";

const TeamsIcon = () => (
	<svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M19.19 7.01C20.74 7.01 22 5.75 22 4.2S20.74 1.39 19.19 1.39 16.38 2.65 16.38 4.2s1.26 2.81 2.81 2.81z" fill="#7B83EB" />
		<path d="M15 7.5H23v7.5a4 4 0 01-4 4h0a4 4 0 01-4-4V7.5z" fill="#7B83EB" />
		<path d="M13.09 7.5H9.5v8.44A4.06 4.06 0 0013.56 20h0a4 4 0 003.44-1.94V11.5A4 4 0 0013.09 7.5z" fill="#5059C9" />
		<circle cx="10.44" cy="4.44" r="2.94" fill="#5059C9" />
		<path d="M2 8.5a5.5 5.5 0 1011 0 5.5 5.5 0 00-11 0z" fill="#7B83EB" />
		<path d="M1 17c0 2.76 2.24 5 5 5h6c2.76 0 5-2.24 5-5v-1H1v1z" fill="#7B83EB" />
		<path d="M12.5 8.5H1v8.5c0 2.76 2.24 5 5 5h6c2.76 0 5-2.24 5-5v-4a4.5 4.5 0 00-4.5-4.5z" fill="#5059C9" />
	</svg>
);

const OutlookIcon = () => (
	<svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14 2H7a1 1 0 00-1 1v4H2v10h4v4a1 1 0 001 1h14a1 1 0 001-1V8l-8-6z" fill="#0078D4" />
		<path d="M14 2v6h6L14 2z" fill="#A0C3FF" />
		<path d="M2 7h10v10H2V7z" fill="#0078D4" />
		<path d="M7.5 9.5a3 3 0 100 5 3 3 0 000-5z" fill="white" />
	</svg>
);

/* ── Inline FAQ Accordion ── */
function FAQItem({ q, a }: { q: string; a: string }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="border border-gray-200 rounded-lg overflow-hidden">
			<button
				className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
				onClick={() => setOpen(!open)}
			>
				<span>{q}</span>
				<span className={`ml-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>↓</span>
			</button>
			{open && (
				<div className="px-6 pb-5 text-gray-600 leading-relaxed text-sm">
					{a}
				</div>
			)}
		</div>
	);
}

export function HomePage() {
	useSEO({
		title: "Renewal360 — Enterprise CS Platform for AI-Powered Renewal Management",
		description: "Renewal360 gives enterprise CS teams AI risk scoring, autonomous inbound email handling, and playbook automation to protect ARR at scale — without the complexity of Gainsight.",
	});

	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			{/* ── HERO ── */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					{/* Competitive badge */}
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-8 border border-blue-200">
						<span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse inline-block"></span>
						The Customer Success platform built for growing enterprise SaaS teams
					</div>

					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
						The CS platform that
						<br />
						<span className="text-blue-600">actually prevents churn.</span>
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
						AI spots which accounts are at risk 90 days before the renewal. Autonomous email handling manages the inbox. Your CSMs focus on the relationships that actually move the number.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
						<Link to="/contact">
							<Button size="lg" className="text-lg px-8">
								Start Free Pilot - 25 accounts, no credit card
							</Button>
						</Link>
						<Link to="/how-it-works">
							<Button size="lg" variant="outline" className="text-lg px-8">
								See how it works
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* ── PERSONAS ── */}
			<PersonaCards />

			{/* ── PROBLEM ── */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-widest mb-4">
							The Current Reality
						</span>
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Renewals fail for entirely preventable reasons.
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							The data from thousands of SaaS companies tells the same story - and most teams are repeating the same costly mistakes.
						</p>
					</div>

					{/* Stats row */}
					<div className="grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
						{[
							{ num: "58%", label: "Median first-year renewal rate — failed activation and missed signals are the #1 cause" },
							{ num: "20–30%", label: "Of customers signal churn intent weeks before they say anything — most teams miss it" },
							{ num: "30–35%", label: "Potential profit increase from just 5% better retention (Bain & Company)" },
						].map((s) => (
							<div key={s.num} className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm">
								<div className="text-2xl font-bold text-blue-600 mb-2">{s.num}</div>
								<div className="text-xs text-gray-500 leading-tight">{s.label}</div>
							</div>
						))}
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<Card className="border-l-4 border-l-red-500">
							<CardHeader>
								<Clock className="h-10 w-10 text-red-500 mb-2" />
								<CardTitle>Up to 5 Hours Wasted Weekly</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									CSMs spend 4–5 hours a week just identifying who to email, drafting personalised notes, and updating spreadsheets - time not spent saving accounts.
								</p>
							</CardContent>
						</Card>
						<Card className="border-l-4 border-l-amber-500">
							<CardHeader>
								<Target className="h-10 w-10 text-amber-500 mb-2" />
								<CardTitle>Missed Risk Signals</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									By the time CSMs notice product usage dropping, the customer has already decided to churn. Teams are reactive by default, not proactive by design.
								</p>
							</CardContent>
						</Card>
						<Card className="border-l-4 border-l-slate-400">
							<CardHeader>
								<BarChart3 className="h-10 w-10 text-slate-500 mb-2" />
								<CardTitle>Zero Executive Visibility</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Leadership relies on weekly hand-crafted updates. Churn surprises the board because there's no single source of truth for ARR at risk.
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="mt-12 text-center max-w-2xl mx-auto">
						<p className="text-xl font-semibold text-gray-900">You don't need to hire 3 more CSMs.</p>
						<p className="text-gray-600 mt-2">
							You need a smarter platform. Renewal360 gives your existing team AI-powered foresight and automated outreach - so no account ever goes quiet again.
						</p>
					</div>
				</div>
			</section>

			{/* ── HOW IT WORKS (Preview) ── */}
			<section className="py-16 bg-blue-50" id="how-it-works">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
						From connection to renewal in 5 steps.
					</h2>
					<div className="flex flex-wrap justify-center gap-4 mb-8">
						{[
							"1. Connect CRM",
							"2. Smart Monitoring",
							"3. AI Drafts",
							"4. Enrollment Guards",
							"5. Executive Tracking"
						].map((step, i) => (
							<div key={i} className="bg-white px-5 py-3 rounded-full shadow-sm font-semibold text-gray-700 border border-blue-100 flex items-center gap-3">
								<span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">{i + 1}</span>
								{step}
							</div>
						))}
					</div>
					<Link to="/how-it-works">
						<Button variant="outline" size="lg" className="border-blue-200 hover:bg-blue-50">
							See how it works under the hood →
						</Button>
					</Link>
				</div>
			</section>

			{/* ── PLATFORM GLIMPSES ── */}
			<PlatformGlimpses />

			{/* ── FEATURES (Preview) ── */}
			<section className="py-16 bg-white" id="features">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Everything you need. Nothing you don't.
						</h2>
					</div>
					<div className="grid md:grid-cols-2 gap-6 mb-10">
						{[
							{ icon: <Target className="h-6 w-6 text-blue-600" />, name: "Know which accounts are at risk 90 days out — not 9", desc: "AI-powered risk scoring across usage, sentiment, support health, and engagement recency surfaces deteriorating accounts before they tell you. Your team acts early instead of reacting late." },
							{ icon: <Mail className="h-6 w-6 text-blue-600" />, name: "AI handles the inbox. Your CSMs handle the relationships.", desc: "Support and TAM agents read every inbound customer email, draft responses from your knowledge base, and auto-send high-confidence replies — escalating to your CSM only when human judgement is needed." },
							{ icon: <BookOpen className="h-6 w-6 text-blue-600" />, name: "Your best playbooks outlive your best rep.", desc: "Journey builder, sequence templates, org-level knowledge base, and NPS surveys mean your CS motion is documented, automated, and consistent — regardless of who's on the account." },
							{ icon: <BarChart3 className="h-6 w-6 text-blue-600" />, name: "ARR clarity your board will actually trust.", desc: "Real-time ARR-at-risk forecasting, per-CSM performance, renewal pipeline, and churn exposure — always live from the source, never hand-crafted in a spreadsheet the night before." },
						].map((f) => (
							<Card key={f.name} className="hover:-translate-y-1 transition-transform duration-200">
								<CardHeader>
									<div className="flex items-center gap-3 mb-1">
										{f.icon}
										<CardTitle className="text-base">{f.name}</CardTitle>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600 text-sm">{f.desc}</p>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="text-center">
						<Link to="/features">
							<Button variant="outline" size="lg" className="border-blue-200 hover:bg-blue-50">
								Explore all features & comparison →
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* ── INTEGRATIONS ── */}
			<section className="py-16 bg-gray-900 text-white" id="integrations">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Plugs into the tools your team already uses.
					</h2>
					<p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
						Connect your CRM, email, and communication tools in minutes - not months.
					</p>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
						{[
							{ name: "Salesforce", icon: <SiSalesforce className="w-8 h-8 text-[#00A1E0]" /> },
							{ name: "HubSpot", icon: <SiHubspot className="w-8 h-8 text-[#FF7A59]" /> },
							{ name: "Slack", icon: <SiSlack className="w-8 h-8 text-white" /> },
							{ name: "Microsoft Teams", icon: <TeamsIcon /> },
							{ name: "Google Sheets", icon: <SiGooglesheets className="w-8 h-8 text-[#34A853]" /> },
							{ name: "Google Calendar", icon: <SiGooglecalendar className="w-8 h-8 text-[#4285F4]" /> },
							{ name: "Gmail", icon: <SiGmail className="w-8 h-8 text-[#EA4335]" /> },
							{ name: "Outlook", icon: <OutlookIcon /> },
						].map((tool) => (
							<div key={tool.name} className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center flex flex-col items-center justify-center">
								<div className="text-3xl mb-3">{tool.icon}</div>
								<div className="font-semibold text-white">{tool.name}</div>
							</div>
						))}
					</div>
					<div className="mt-8">
						<span className="inline-block px-4 py-2 rounded-full border border-gray-700 text-gray-400 text-sm font-medium">
							+ Many more
						</span>
					</div>
				</div>
			</section>



			{/* ── ROI CALCULATOR ── */}
			<RoiCalculator />

			{/* ── PRICING ── */}
			<Pricing />

			{/* ── BLOG ── */}
			<section className="py-16 bg-blue-50" id="blog">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10">
						<div>
							<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-blue-700 text-xs font-semibold uppercase tracking-widest mb-4 border border-blue-100">
								<BookOpen className="h-4 w-4" />
								Blog
							</span>
							<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Renewal playbooks for modern SaaS teams.
							</h2>
							<p className="text-lg text-gray-600 max-w-2xl">
								Learn how to automate renewal outreach, catch churn risk earlier,
								and give leadership a clearer view of revenue at risk.
							</p>
						</div>
						<Link to="/blog">
							<Button variant="outline" size="lg" className="bg-white border-blue-200 hover:bg-blue-50">
								View all posts
							</Button>
						</Link>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{blogPosts.map((post) => (
							<Link
								key={post.slug}
								to="/blog/$slug"
								params={{ slug: post.slug }}
								className="group block h-full"
							>
								<Card className="h-full bg-white transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
									<CardContent className="p-6">
										<div className="flex flex-wrap gap-2 mb-5">
											{post.tags.map((tag) => (
												<span
													key={tag}
													className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
												>
													{tag}
												</span>
											))}
										</div>
										<h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
											{post.title}
										</h3>
										<p className="text-gray-600 text-sm leading-relaxed mb-6">
											{post.summary}
										</p>
										<div className="flex items-center justify-between text-sm">
											<span className="text-gray-500">
												{post.readTime} - {post.publishedAt}
											</span>
											<span className="inline-flex items-center gap-2 font-semibold text-blue-600">
												Read
												<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
											</span>
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* ── TESTIMONIALS ── */}
			<section className="py-16 bg-white" id="testimonials">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Loved by modern revenue teams.
						</h2>
					</div>
					<div className="grid md:grid-cols-3 gap-8">
						{[
							{ quote: "Renewal360 is the missing link. We couldn't justify the price tag of legacy enterprise platforms, but doing it manually in Salesforce was a disaster. This hits the perfect sweet spot.", author: "Priya Patel", role: "VP Revenue Operations", initials: "PP" },
							{ quote: "My CSMs used to spend 5 hours a week just figuring out who to email. Now they log in, approve the AI drafts, and spend that time actually speaking to customers.", author: "Sarah Jenkins", role: "Director of Customer Success", initials: "SJ" },
							{ quote: "Before this, churn was always a surprise at end of quarter. Now I look at the dashboard and see exactly what ARR is at risk 90 days out. Game-changer.", author: "Raj Sharma", role: "Chief Executive Officer", initials: "RS" },
						].map((t) => (
							<Card key={t.author} className="bg-gray-50">
								<CardContent className="pt-6">
									<p className="text-gray-700 italic mb-6">"{t.quote}"</p>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
											{t.initials}
										</div>
										<div>
											<div className="font-semibold text-sm text-gray-900">{t.author}</div>
											<div className="text-xs text-gray-500">{t.role}</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>



			{/* ── FINAL CTA ── */}
			<section className="py-20 bg-gray-900 text-white">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-5xl font-bold mb-6">
						Your next renewal shouldn't depend on<br />someone's manual effort to follow up.
					</h2>
					<p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
						Start your free pilot. 25 accounts. No credit card. Up and running in a week.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
						<Link to="/contact">
							<Button size="lg" className="text-lg px-10 bg-blue-500 hover:bg-blue-600 border-none">
								Start Free Pilot →
							</Button>
						</Link>
						<Button size="lg" variant="outline" className="text-lg px-10 border-white/30 text-white hover:bg-white/10 bg-transparent">
							Talk to a human first
						</Button>
					</div>
					<div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
						{["No credit card required", "Cancel anytime", "Setup support included", "Your data stays yours"].map((t) => (
							<span key={t} className="flex items-center gap-1.5">
								<span className="text-green-500">✓</span> {t}
							</span>
						))}
					</div>
				</div>
			</section>

		</div>
	);
}
