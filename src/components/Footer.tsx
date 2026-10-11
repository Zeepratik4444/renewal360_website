import { Link } from "@tanstack/react-router";

const PRODUCT = [
	["Features", "/features"],
	["Glimpses", "/glimpses"],
	["Pricing", "/pricing"],
	["How It Works", "/how-it-works"],
];

const COMPANY = [
	["Blog", "/blog"],
	["About", "/about"],
	["FAQ", "/faq"],
	["Contact", "/contact"],
	["Terms", "/terms"],
];

function Column({ title, links }: { title: string; links: string[][] }) {
	return (
		<div>
			<h4 className="eyebrow !text-muted-foreground mb-4 !font-semibold">{title}</h4>
			<ul className="space-y-3 text-sm">
				{links.map(([label, to]) => (
					<li key={label}>
						<Link to={to as string} className="link-u pb-0.5 text-foreground/80 transition-colors hover:text-foreground">
							{label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export function Footer() {
	return (
		<footer className="ink mt-auto border-t border-border print:hidden">
			<div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
				<div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
					<div>
						<div className="flex items-center gap-2.5">
							<img src="/brand-logo.png" alt="" className="h-8 w-8 object-contain" />
							<span className="text-lg font-semibold tracking-tight text-foreground">Renewal360</span>
						</div>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
							AI-powered renewal automation for SaaS teams. Spot the at-risk accounts early, draft the outreach, and
							keep every renewal in view.
						</p>
					</div>
					<Column title="Product" links={PRODUCT} />
					<Column title="Company" links={COMPANY} />
					<div>
						<h4 className="eyebrow !text-muted-foreground mb-4 !font-semibold">Connect</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<a
									href="https://www.linkedin.com/company/renewal360"
									target="_blank"
									rel="noopener noreferrer"
									className="link-u pb-0.5 text-foreground/80 transition-colors hover:text-foreground"
								>
									LinkedIn
								</a>
							</li>
							<li>
								<a href="#" className="link-u pb-0.5 text-foreground/80 transition-colors hover:text-foreground">
									Twitter / X
								</a>
							</li>
							<li className="pt-3">
								<p className="mb-1 text-muted-foreground">Reach us at</p>
								<a
									href="mailto:hello@renewal360.in"
									className="link-u pb-0.5 text-base font-medium text-brand-glow"
								>
									hello@renewal360.in
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
					<p>© 2026 Renewal360. All rights reserved.</p>
					<p>
						Operated by{" "}
						<a href="https://ganvix.in" target="_blank" rel="noopener noreferrer" className="link-u pb-0.5 text-foreground/80 hover:text-foreground">
							Ganvix Technologies Pvt Ltd
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
