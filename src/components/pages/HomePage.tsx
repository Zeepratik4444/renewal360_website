import { Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, BookOpen, Check, Clock, Mail, Target } from "lucide-react";
import { SiGmail, SiGooglecalendar, SiGooglesheets, SiHubspot, SiSalesforce, SiSlack } from "react-icons/si";
import { RevenueChart } from "@/components/hero/RevenueChart";
import { Navigation } from "@/components/Navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ApprovalControl } from "@/components/sections/ApprovalControl";
import { PersonaCards } from "@/components/sections/PersonaCards";
import { PlatformGlimpses } from "@/components/sections/PlatformGlimpses";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { ReadinessShowcase } from "@/components/sections/ReadinessShowcase";
import { Pricing } from "@/components/sections/Pricing";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts } from "@/lib/blogPosts";

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

/** The shared page container: the same width as the Ganvix site, with the same gutters on every section. */
const WRAP = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

/** A section opener: small label, large tight heading, optional lead. */
function SectionHead({
	eyebrow,
	title,
	lead,
	className = "",
}: {
	eyebrow: string;
	title: React.ReactNode;
	lead?: React.ReactNode;
	className?: string;
}) {
	return (
		<Reveal className={`max-w-3xl ${className}`}>
			<p className="eyebrow">{eyebrow}</p>
			<h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h2>
			{lead ? <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{lead}</p> : null}
		</Reveal>
	);
}

export function HomePage() {
	useSEO({
		title: "Renewal360 | Enterprise CS Platform for AI-Powered Renewal Management",
		description: "Renewal360 gives enterprise CS teams AI risk scoring, AI-drafted outreach your team approves, and playbook automation to protect ARR at scale - without the complexity of Gainsight.",
	});

	return (
		<div className="min-h-screen bg-background">
			<Navigation />

			{/* ── HERO ── */}
			<section className="relative overflow-hidden">
				<div aria-hidden className="hero-glow absolute inset-0" />
				<div aria-hidden className="dot-grid absolute inset-x-0 top-0 h-[34rem]" />

				<div className={`${WRAP} relative pb-14 pt-12 sm:pb-16 sm:pt-16 lg:pt-20 xl:pb-24`}>
					<div className="relative z-10">
					<div>
						<h1 className="max-w-4xl text-5xl leading-[1.03] text-foreground sm:text-6xl lg:text-7xl">
							The CS platform that
							<br />
							<span className="brand-gradient-text">actually prevents churn.</span>
						</h1>
					</div>

					<div>
						<p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
							AI spots which accounts are at risk 90 days before the renewal. It drafts the right outreach for each one, and nothing is sent until your team approves it. Your CSMs focus on the relationships that actually move the number.
						</p>
					</div>

					<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
						<Button asChild variant="gradient" size="lg" className="h-auto whitespace-normal py-3.5 text-center sm:h-12 sm:whitespace-nowrap sm:py-2">
							<Link to="/contact">
								Start Free Pilot - 25 accounts, no credit card
								<ArrowRight aria-hidden />
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link to="/how-it-works">See how it works</Link>
						</Button>
					</div>
					</div>

					{/* Revenue, climbing: a strip under the buttons on small screens, a panel beside the headline on wide ones. */}
					<RevenueChart className="relative mt-10 h-56 sm:h-72 lg:h-80 xl:absolute xl:inset-y-0 xl:right-0 xl:mt-0 xl:h-auto xl:w-[52%]" />
				</div>
				{/* The glow dissolves into the page instead of stopping at the section's edge. */}
				<div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-background xl:h-24" />
			</section>

			{/* ── THE PRODUCT ── */}
			<ProductShowcase />

			{/* ── SELLING POINT: what is missing, and the action taken ── */}
			<ReadinessShowcase />

			{/* ── SELLING POINT: it writes, you approve ── */}
			<ApprovalControl />

			{/* ── PERSONAS ── */}
			<PersonaCards />

			{/* ── PROBLEM ── */}
			<section className="border-t border-border py-24 sm:py-32">
				<div className={WRAP}>
					<SectionHead
						eyebrow="The Current Reality"
						title="Renewals fail for entirely preventable reasons."
						lead="The data from thousands of SaaS companies tells the same story - and most teams are repeating the same costly mistakes."
					/>

					{/* Stats row */}
					<div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
						{[
							{ num: "58%", label: "Median first-year renewal rate - failed activation and missed signals are the #1 cause" },
							{ num: "20–30%", label: "Of customers signal churn intent weeks before they say anything - most teams miss it" },
							{ num: "30–35%", label: "Potential profit increase from just 5% better retention (Bain & Company)" },
						].map((s, i) => (
							<Reveal key={s.num} delay={i * 90} className="bg-background p-8">
								<div className="brand-gradient-text text-5xl font-semibold tracking-tight">{s.num}</div>
								<p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.label}</p>
							</Reveal>
						))}
					</div>

					<div className="mt-6 grid gap-6 md:grid-cols-3">
						{[
							{
								icon: <Clock className="h-5 w-5" />,
								title: "Up to 5 Hours Wasted Weekly",
								body: "CSMs spend 4–5 hours a week just identifying who to email, drafting personalised notes, and updating spreadsheets - time not spent saving accounts.",
							},
							{
								icon: <Target className="h-5 w-5" />,
								title: "Missed Risk Signals",
								body: "By the time CSMs notice product usage dropping, the customer has already decided to churn. Teams are reactive by default, not proactive by design.",
							},
							{
								icon: <BarChart3 className="h-5 w-5" />,
								title: "Zero Executive Visibility",
								body: "Leadership relies on weekly hand-crafted updates. Churn surprises the board because there's no single source of truth for ARR at risk.",
							},
						].map((c, i) => (
							<Reveal key={c.title} delay={i * 90} className="rounded-2xl border border-border bg-card p-7">
								<div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand-deep">{c.icon}</div>
								<h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">{c.title}</h3>
								<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
							</Reveal>
						))}
					</div>

					<Reveal className="mt-16 max-w-2xl">
						<p className="text-2xl font-semibold tracking-tight text-foreground">You don't need to hire 3 more CSMs.</p>
						<p className="mt-3 text-lg leading-relaxed text-muted-foreground">
							You need a smarter platform. Renewal360 gives your existing team AI-powered foresight and automated outreach - so no account ever goes quiet again.
						</p>
					</Reveal>
				</div>
			</section>

			{/* ── HOW IT WORKS (Preview) ── */}
			<section className="border-t border-border bg-card py-24 sm:py-32" id="how-it-works">
				<div className={WRAP}>
					<SectionHead eyebrow="How it works" title="From connection to renewal in 5 steps." />

					<ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
						<div aria-hidden className="absolute left-0 right-0 top-[1.35rem] hidden h-px bg-border lg:block" />
						{["Connect CRM", "Smart Monitoring", "AI Drafts", "Enrollment Guards", "Executive Tracking"].map((step, i) => (
							<Reveal as="li" key={step} delay={i * 80} className="relative">
								<span className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-background text-sm font-semibold text-brand-deep">
									{i + 1}
								</span>
								<p className="mt-5 text-lg font-semibold tracking-tight text-foreground">{step}</p>
							</Reveal>
						))}
					</ol>

					<Reveal className="mt-14">
						<Button asChild variant="outline" size="lg">
							<Link to="/how-it-works">
								See how it works under the hood
								<ArrowRight aria-hidden />
							</Link>
						</Button>
					</Reveal>
				</div>
			</section>

			{/* ── PLATFORM GLIMPSES ── */}
			<PlatformGlimpses />

			{/* ── FEATURES (Preview) ── */}
			<section className="border-t border-border bg-card py-24 sm:py-32" id="features">
				<div className={WRAP}>
					<SectionHead eyebrow="Features" title="Everything you need. Nothing you don't." />

					<div className="mt-14 grid gap-6 md:grid-cols-2">
						{[
							{ icon: <Target className="h-5 w-5" />, name: "Know which accounts are at risk 90 days out - not 9", desc: "AI-powered risk scoring across usage, sentiment, support health, and engagement recency surfaces deteriorating accounts before they tell you. Your team acts early instead of reacting late." },
							{ icon: <Mail className="h-5 w-5" />, name: "AI drafts the outreach. Your CSMs approve it.", desc: "Renewal360 writes the next message for each account from its history and your sequence templates, then places it in an approval queue. Your CSM can edit, approve or reject it, and nothing reaches a customer until a person says so." },
							{ icon: <BookOpen className="h-5 w-5" />, name: "Your best playbooks outlive your best rep.", desc: "Journey builder, sequence templates, org-level knowledge base, and NPS surveys mean your CS motion is documented, automated, and consistent - regardless of who's on the account." },
							{ icon: <BarChart3 className="h-5 w-5" />, name: "ARR clarity your board will actually trust.", desc: "Real-time ARR-at-risk forecasting, per-CSM performance, renewal pipeline, and churn exposure - always live from the source, never hand-crafted in a spreadsheet the night before." },
						].map((f, i) => (
							<Reveal
								key={f.name}
								delay={(i % 2) * 90}
								className="group rounded-2xl border border-border bg-background p-8 transition-colors duration-300 hover:border-brand/40"
							>
								<div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand-deep transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
									{f.icon}
								</div>
								<h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-foreground">{f.name}</h3>
								<p className="mt-3 leading-relaxed text-muted-foreground">{f.desc}</p>
							</Reveal>
						))}
					</div>

					<Reveal className="mt-12">
						<Button asChild variant="outline" size="lg">
							<Link to="/features">
								Explore all features & comparison
								<ArrowRight aria-hidden />
							</Link>
						</Button>
					</Reveal>
				</div>
			</section>

			{/* ── INTEGRATIONS ── */}
			<section className="border-t border-border py-24 sm:py-32" id="integrations">
				<div className={WRAP}>
					<SectionHead
						eyebrow="Integrations"
						title="Plugs into the tools your team already uses."
						lead="Connect your CRM, email, and communication tools in minutes - not months."
					/>
					<div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
						{[
							{ name: "Salesforce", icon: <SiSalesforce className="h-8 w-8 text-[#00A1E0]" /> },
							{ name: "HubSpot", icon: <SiHubspot className="h-8 w-8 text-[#FF7A59]" /> },
							{ name: "Slack", icon: <SiSlack className="h-8 w-8 text-[#4A154B]" /> },
							{ name: "Microsoft Teams", icon: <TeamsIcon /> },
							{ name: "Google Sheets", icon: <SiGooglesheets className="h-8 w-8 text-[#34A853]" /> },
							{ name: "Google Calendar", icon: <SiGooglecalendar className="h-8 w-8 text-[#4285F4]" /> },
							{ name: "Gmail", icon: <SiGmail className="h-8 w-8 text-[#EA4335]" /> },
							{ name: "Outlook", icon: <OutlookIcon /> },
						].map((tool, i) => (
							<Reveal
								key={tool.name}
								delay={(i % 4) * 60}
								className="flex flex-col items-center justify-center gap-4 bg-background px-4 py-10 text-center transition-colors hover:bg-card"
							>
								{tool.icon}
								<div className="text-sm font-medium text-foreground">{tool.name}</div>
							</Reveal>
						))}
					</div>
					<p className="mt-8 text-sm text-muted-foreground">+ Many more</p>
				</div>
			</section>

			{/* ── PRICING ── */}
			<Pricing />

			{/* ── BLOG ── */}
			<section className="border-t border-border py-24 sm:py-32" id="blog">
				<div className={WRAP}>
					<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
						<SectionHead
							eyebrow="Blog"
							title="Renewal playbooks for modern SaaS teams."
							lead="Learn how to automate renewal outreach, catch churn risk earlier, and give leadership a clearer view of revenue at risk."
						/>
						<Reveal>
							<Button asChild variant="outline" size="lg">
								<Link to="/blog">View all posts</Link>
							</Button>
						</Reveal>
					</div>

					<div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{blogPosts.map((post, i) => (
							<Reveal key={post.slug} delay={(i % 3) * 80} className="h-full">
								<Link
									to="/blog/$slug"
									params={{ slug: post.slug }}
									className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-colors duration-300 hover:border-brand/40"
								>
									<div className="mb-5 flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<span key={tag} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-deep">
												{tag}
											</span>
										))}
									</div>
									<h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand-deep">
										{post.title}
									</h3>
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
									<div className="mt-auto flex items-center justify-between pt-8 text-sm">
										<span className="text-muted-foreground">
											{post.readTime} - {post.publishedAt}
										</span>
										<span className="inline-flex items-center gap-2 font-semibold text-brand-deep">
											Read
											<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
										</span>
									</div>
								</Link>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* ── TESTIMONIALS ── */}
			<section className="border-t border-border bg-card py-24 sm:py-32" id="testimonials">
				<div className={WRAP}>
					<SectionHead eyebrow="Customers" title="Loved by modern revenue teams." />
					<div className="mt-14 grid gap-6 md:grid-cols-3">
						{[
							{ quote: "Renewal360 is the missing link. We couldn't justify the price tag of legacy enterprise platforms, but doing it manually in Salesforce was a disaster. This hits the perfect sweet spot.", author: "Priya Patel", role: "VP Revenue Operations", initials: "PP" },
							{ quote: "My CSMs used to spend 5 hours a week just figuring out who to email. Now they log in, approve the AI drafts, and spend that time actually speaking to customers.", author: "Sarah Jenkins", role: "Director of Customer Success", initials: "SJ" },
							{ quote: "Before this, churn was always a surprise at end of quarter. Now I look at the dashboard and see exactly what ARR is at risk 90 days out. Game-changer.", author: "Raj Sharma", role: "Chief Executive Officer", initials: "RS" },
						].map((t, i) => (
							<Reveal key={t.author} delay={i * 90} className="flex flex-col rounded-2xl border border-border bg-background p-8">
								<p className="text-lg leading-relaxed text-foreground">"{t.quote}"</p>
								<div className="mt-auto flex items-center gap-3 pt-8">
									<div className="grid h-10 w-10 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand-deep">
										{t.initials}
									</div>
									<div>
										<div className="text-sm font-semibold text-foreground">{t.author}</div>
										<div className="text-xs text-muted-foreground">{t.role}</div>
									</div>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* ── FINAL CTA ── */}
			<section className="ink relative overflow-hidden">
				<div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_20%,rgb(58_88_240/0.28),transparent_70%),radial-gradient(45%_60%_at_10%_100%,rgb(106_47_208/0.22),transparent_70%)]" />
				<Reveal className={`${WRAP} relative py-28 sm:py-36`}>
					<h2 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
						Your next renewal shouldn't depend on
						<br className="hidden sm:block" /> someone's manual effort to follow up.
					</h2>
					<p className="mt-6 max-w-xl text-lg text-muted-foreground">
						Start your free pilot. 25 accounts. No credit card. Up and running in a week.
					</p>
					<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
						<Button asChild variant="gradient" size="lg">
							<Link to="/contact">
								Start Free Pilot
								<ArrowRight aria-hidden />
							</Link>
						</Button>
						<Button asChild variant="outline" size="lg" className="bg-transparent">
							<Link to="/contact">Talk to a human first</Link>
						</Button>
					</div>
					<ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
						{["No credit card required", "Cancel anytime", "Setup support included", "Your data stays yours"].map((t) => (
							<li key={t} className="flex items-center gap-2">
								<Check aria-hidden className="h-4 w-4 text-brand-glow" /> {t}
							</li>
						))}
					</ul>
				</Reveal>
			</section>
		</div>
	);
}
