import { Check, Settings, TrendingUp, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const PERSONAS = [
	{
		icon: <Users className="h-6 w-6" />,
		role: "For Customer Success",
		quote: "Never write another renewal email from scratch.",
		points: ["AI drafts tailored context per account", "Human-in-the-loop email approval", "Stop chasing clients internally"],
	},
	{
		icon: <Settings className="h-6 w-6" />,
		role: "For RevOps",
		quote: "7-day deployment. Syncs via API. Zero workflow disruption.",
		points: [
			"Native CRM integrations off the shelf",
			"No custom coding or IT resources required",
			"SOC 2-ready data security compliance",
		],
	},
	{
		icon: <TrendingUp className="h-6 w-6" />,
		role: "For Executives",
		quote: "Know exactly what ARR is at risk 90 days out.",
		points: ["Real-time renewal pipeline visibility", "Predictable revenue forecasting", "Direct impact on NRR targets"],
	},
];

export function PersonaCards() {
	return (
		<section className="border-t border-border py-24 sm:py-32">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<Reveal className="max-w-3xl">
					<p className="eyebrow">Who it is for</p>
					<h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
						One platform. Built for the entire revenue team.
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-muted-foreground">
						Renewal360 unites your client-facing reps, operational backbone, and strategic leadership around a single source of truth.
					</p>
				</Reveal>

				<div className="mt-14 grid gap-6 md:grid-cols-3">
					{PERSONAS.map((p, i) => (
						<Reveal
							key={p.role}
							delay={i * 90}
							className="group flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors duration-300 hover:border-brand/40"
						>
							<div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand-deep transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
								{p.icon}
							</div>
							<p className="eyebrow mt-8">{p.role}</p>
							<h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-foreground">"{p.quote}"</h3>
							<ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
								{p.points.map((point) => (
									<li key={point} className="flex items-start gap-3">
										<Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
										<span>{point}</span>
									</li>
								))}
							</ul>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
