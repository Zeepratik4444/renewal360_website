import { Check, Lock, Mail, PenLine, Power, ShieldCheck, Star, X } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Assurances about sending, kept at the level of what a customer gets. Deliberately no thresholds,
 * numbers or rules: how the product decides these things is not for a public page.
 */
const SAFEGUARDS = [
	{
		icon: <Lock className="h-5 w-5" />,
		title: "Human approval by default",
		body: "Every draft waits for someone on your team to approve it before it reaches a customer.",
	},
	{
		icon: <ShieldCheck className="h-5 w-5" />,
		title: "Automation on your terms",
		body: "Nothing is sent on its own unless you choose to allow it, and you can take that back whenever you like.",
	},
	{
		icon: <Star className="h-5 w-5" />,
		title: "Extra care for key accounts",
		body: "Your most important accounts always get a person's eye before anything goes out.",
	},
	{
		icon: <Power className="h-5 w-5" />,
		title: "Pause at any time",
		body: "You can stop outgoing email for a single account, or for everyone, whenever you need to.",
	},
];

/** A drawn draft in the approval queue. No real message, so no invented customer words. */
function DraftCard() {
	const bar = "h-2 rounded-full bg-foreground/10";
	return (
		<div className="rounded-2xl border border-border bg-background shadow-[0_32px_64px_-36px_rgb(47_71_214/0.38),0_12px_28px_-18px_rgb(11_13_20/0.2)]">
			<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 border-b border-border px-5 py-4 sm:px-6">
				<div className="flex items-center gap-3">
					<span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-brand-deep">
						<Mail className="h-4 w-4" />
					</span>
					<div>
						<p className="text-sm font-semibold text-foreground">Renewal email</p>
						<p className="whitespace-nowrap text-xs text-muted-foreground">Drafted by Renewal360</p>
					</div>
				</div>
				<span className="whitespace-nowrap rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-deep">
					Waiting for approval
				</span>
			</div>

			<div className="space-y-3 px-5 py-6 sm:px-6">
				<div className={`${bar} w-2/5`} />
				<div className={`${bar} w-full`} />
				<div className={`${bar} w-11/12`} />
				<div className={`${bar} w-4/5`} />
				<div className={`${bar} w-3/5`} />
			</div>

			<div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-4 sm:gap-3 sm:px-6">
				<span className="brand-gradient-bg inline-flex h-10 items-center gap-2 rounded-lg px-3.5 text-sm font-semibold text-white sm:px-4">
					<Check className="h-4 w-4" /> Approve
				</span>
				<span className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3.5 text-sm font-semibold text-foreground sm:px-4">
					<PenLine className="h-4 w-4" /> Edit
				</span>
				<span className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3.5 text-sm font-semibold text-muted-foreground sm:px-4">
					<X className="h-4 w-4" /> Reject
				</span>
			</div>
		</div>
	);
}

/** Selling point: it writes, you approve. Told as a control story, in the same white style as the page. */
export function ApprovalControl() {
	return (
		<section className="border-t border-border" id="approval">
			<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
				<div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
					<Reveal>
						<p className="eyebrow flex items-center gap-2">
							<ShieldCheck aria-hidden className="h-4 w-4" />
							You stay in control
						</p>
						<h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
							It writes. You approve. <span className="brand-gradient-text">Nothing leaves until you say so.</span>
						</h2>
						<p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
							Renewal360 drafts the outreach for each renewal and places it in an approval queue, where your team can
							edit, approve or reject it before a customer sees it.
						</p>
					</Reveal>

					<Reveal delay={120}>
						<p className="sr-only">Example: a drafted renewal email waiting in the approval queue, with Approve, Edit and Reject.</p>
						<div aria-hidden>
							<DraftCard />
						</div>
					</Reveal>
				</div>

				<ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
					{SAFEGUARDS.map((s, i) => (
						<Reveal as="li" key={s.title} delay={i * 80} className="bg-background p-7">
							<span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand-deep">{s.icon}</span>
							<h3 className="mt-6 text-lg font-semibold leading-snug tracking-tight text-foreground">{s.title}</h3>
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
						</Reveal>
					))}
				</ul>
			</div>
		</section>
	);
}
