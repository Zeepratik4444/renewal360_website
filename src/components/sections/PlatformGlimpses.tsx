import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, TrendingUp, UserCog } from "lucide-react";
import dashboardSummary from "@/assets/dashboard-summary.png";
import renewalDetail from "@/assets/renewaldetail.png";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

/** A screenshot in a quiet window frame. */
function Shot({ src, alt }: { src: string; alt: string }) {
	return (
		<div className="shot-frame">
			<div className="shot-frame-bar" aria-hidden>
				<i />
				<i />
				<i />
			</div>
			<img
				src={src}
				alt={alt}
				loading="lazy"
				width={1825}
				height={800}
				className="block h-auto w-full"
				onError={(e) => (e.currentTarget.style.display = "none")}
			/>
		</div>
	);
}

export function PlatformGlimpses() {
	return (
		<section className="border-t border-border py-24 sm:py-32" id="glimpses">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<Reveal className="max-w-3xl">
					<p className="eyebrow">Platform Glimpses</p>
					<h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
						Actionable insights, <span className="brand-gradient-text">at the highest level.</span>
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-muted-foreground">
						Move from a high-level view down to the micro-interactions. Renewal360 gives you the exact tools to manage your portfolio at scale, and dig deep into individual customer relationships.
					</p>
				</Reveal>

				<div className="mt-20 space-y-28 sm:space-y-36">
					{/* Glimpse 1: Executive Summary */}
					<div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
						<Reveal>
							<div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand-deep">
								<TrendingUp className="h-5 w-5" />
							</div>
							<h3 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">Immediate Action, Zero Ambiguity</h3>
							<p className="mt-4 text-lg leading-relaxed text-muted-foreground">
								See exactly how much ARR is at risk today. The Executive Summary translates abstract health scores into bottom-line dollar values, showing you immediate and urgent actions that your team needs to take to save revenue.
							</p>
							<ul className="mt-8 space-y-3">
								{["Track Total ARR vs. At Risk Revenue", "Automatically flag 'Silent Accounts'", "Visual ARR waterfalls for this quarter"].map((t) => (
									<li key={t} className="flex items-start gap-3 font-medium text-foreground">
										<Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand" /> {t}
									</li>
								))}
							</ul>
						</Reveal>
						<Reveal delay={120}>
							<Shot src={dashboardSummary} alt="Executive Summary Dashboard" />
						</Reveal>
					</div>

					{/* Glimpse 2: Renewal Detail */}
					<div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
						<Reveal delay={120} className="order-2 lg:order-1">
							<Shot src={renewalDetail} alt="Renewal Detail View" />
						</Reveal>
						<Reveal className="order-1 lg:order-2">
							<div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand-deep">
								<UserCog className="h-5 w-5" />
							</div>
							<h3 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">Deep Dive into Account Health</h3>
							<p className="mt-4 text-lg leading-relaxed text-muted-foreground">
								Click into any account to see the full context: AI-generated activity summaries, Support Ticket Health, and a weighted 5-factor risk breakdown (Engagement Health, Sentiment & Value Realisation, Relationship Depth, Financial Health, and Renewal Momentum).
							</p>
							<ul className="mt-8 space-y-3">
								{["5-Factor Risk score with dynamic weights", "Analyze ROI signals and Support Traps", "Automated Ghosting and Stakeholder Drift detection"].map((t) => (
									<li key={t} className="flex items-start gap-3 font-medium text-foreground">
										<Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand" /> {t}
									</li>
								))}
							</ul>
						</Reveal>
					</div>
				</div>

				{/* CTA to specialized page */}
				<Reveal className="mt-24 flex flex-col items-start gap-5 rounded-2xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-lg font-medium text-foreground">Want to see the executive dashboards, forecasts, and more?</p>
					<Button asChild variant="gradient" size="lg">
						<Link to="/glimpses">
							View more
							<ArrowRight aria-hidden />
						</Link>
					</Button>
				</Reveal>
			</div>
		</section>
	);
}
