import { ArrowRight, CalendarClock, ClipboardList, Handshake, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type State = "covered" | "at_risk" | "gap";

/**
 * The nine questions Renewal360 answers for every renewal, with the labels the product itself uses.
 * The states and next steps below are an example, not a customer's data.
 */
const CONDITIONS: { label: string; state: State; note?: string; step?: string; status?: string }[] = [
	{ label: "Value demonstrated", state: "covered" },
	{
		label: "Champion confirmed",
		state: "gap",
		note: "The champion has left and no replacement is named.",
		step: "Email the new contact",
		status: "Draft waiting for approval",
	},
	{ label: "Multithreaded", state: "at_risk", step: "Executive introduction requested" },
	{ label: "Economic buyer known", state: "covered" },
	{ label: "No blockers", state: "covered" },
	{ label: "Commercials agreed", state: "covered" },
	{ label: "Renewal process confirmed", state: "at_risk", step: "Business review proposed" },
	{ label: "Strategic conversation held", state: "covered" },
	{ label: "Meetings reliable", state: "covered" },
];

const STATE: Record<State, { label: string; dot: string; text: string }> = {
	covered: { label: "Covered", dot: "bg-emerald-500", text: "text-emerald-700" },
	at_risk: { label: "At risk", dot: "bg-amber-500", text: "text-amber-700" },
	gap: { label: "Gap", dot: "bg-rose-500", text: "text-rose-700" },
};

/** The moves it can make for a gap. All four exist in the product's own catalogue of actions. */
const MOVES = [
	{ icon: <Mail className="h-4 w-4" />, text: "Emails the right contact" },
	{ icon: <CalendarClock className="h-4 w-4" />, text: "Proposes a business review" },
	{ icon: <Handshake className="h-4 w-4" />, text: "Asks an executive for an introduction" },
	{ icon: <ClipboardList className="h-4 w-4" />, text: "Puts a task on the owner's list" },
];

function ReadinessPanel() {
	const covered = CONDITIONS.filter((c) => c.state === "covered").length;
	return (
		<div className="rounded-2xl border border-border bg-background shadow-[0_32px_64px_-36px_rgb(47_71_214/0.38),0_12px_28px_-18px_rgb(11_13_20/0.2)]">
			<div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
				<div>
					<p className="text-sm font-semibold text-foreground">Renewal readiness</p>
					<p className="mt-0.5 text-xs text-muted-foreground">Example account</p>
				</div>
				<div className="text-right">
					<p className="text-sm font-semibold text-foreground">
						{covered} of {CONDITIONS.length} covered
					</p>
					<div className="mt-2 flex justify-end gap-1">
						{CONDITIONS.map((c) => (
							<span key={c.label} className={cn("h-1.5 w-4 rounded-full", STATE[c.state].dot)} />
						))}
					</div>
				</div>
			</div>

			<ul className="divide-y divide-border">
				{CONDITIONS.map((c) => {
					const open = c.state !== "covered";
					return (
						<li key={c.label} className={cn("px-5 py-3 sm:px-6", c.state === "gap" && "bg-brand-soft/40 py-4")}>
							<div className="flex items-center gap-3">
								<span className={cn("h-2 w-2 shrink-0 rounded-full", STATE[c.state].dot)} />
								<span className={cn("flex-1 text-sm", open ? "font-semibold text-foreground" : "text-muted-foreground")}>
									{c.label}
								</span>
								<span className={cn("text-xs font-semibold", STATE[c.state].text)}>{STATE[c.state].label}</span>
							</div>
							{c.note ? <p className="mt-1.5 pl-5 text-xs leading-relaxed text-muted-foreground">{c.note}</p> : null}
							{c.step ? (
								<div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 pl-5 text-xs">
									<ArrowRight aria-hidden className="h-3.5 w-3.5 text-brand" />
									<span className="font-semibold text-brand-deep">{c.step}</span>
									{c.status ? (
										<span className="rounded-full border border-border bg-background px-2 py-0.5 font-medium text-muted-foreground">
											{c.status}
										</span>
									) : null}
								</div>
							) : null}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

/** Selling point: it works out what each renewal is missing, then takes the next step for it. */
export function ReadinessShowcase() {
	return (
		<section className="border-t border-border bg-card py-24 sm:py-32" id="readiness">
			<div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8">
				<Reveal>
					<p className="eyebrow">Renewal readiness</p>
					<h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
						Finds what's missing in every renewal. <span className="brand-gradient-text">Then acts on it.</span>
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-muted-foreground">
						A risk score only tells you to worry. Renewal360 checks each renewal against nine questions, shows you which
						ones are not covered, and takes the next step for each.
					</p>
					<ul className="mt-9 grid gap-3 sm:grid-cols-2">
						{MOVES.map((m) => (
							<li key={m.text} className="flex items-center gap-3 text-sm font-medium text-foreground">
								<span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-deep">{m.icon}</span>
								{m.text}
							</li>
						))}
					</ul>
				</Reveal>

				<Reveal delay={120}>
					{/* A drawn example of the readiness panel, described once for screen readers. */}
					<p className="sr-only">
						Example: a renewal with six of nine questions covered. "Champion confirmed" is a gap, so an email to the new
						contact has been drafted and is waiting for approval. Two more questions are at risk, each with its own next step.
					</p>
					<div aria-hidden>
						<ReadinessPanel />
					</div>
				</Reveal>
			</div>
		</section>
	);
}
