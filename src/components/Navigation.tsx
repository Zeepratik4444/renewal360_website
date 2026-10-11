import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Always visible in the bar. */
const NAV_LINKS = [
	{ to: "/", label: "Home" },
	{ to: "/features", label: "Features" },
	{ to: "/pricing", label: "Pricing" },
	{ to: "/how-it-works", label: "How It Works" },
];

/** Tucked behind "More" so the bar stays short. */
const MORE_LINKS = [
	{ to: "/blog", label: "Blog", hint: "Playbooks for renewal teams" },
	{ to: "/about", label: "About", hint: "Who builds Renewal360" },
	{ to: "/faq", label: "FAQ", hint: "Answers before you ask" },
	{ to: "/glimpses", label: "Glimpses", hint: "A look inside the product" },
];

/** TanStack marks the current page's link with data-status="active". */
const ACTIVE = "data-[status=active]:bg-accent data-[status=active]:text-foreground";

const PILL =
	"rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 hover:text-foreground";

function Wordmark() {
	return (
		<Link
			to="/"
			className="flex shrink-0 items-center gap-2.5 font-semibold tracking-tight text-foreground"
			aria-label="Renewal360 home"
		>
			<img src="/brand-logo.png" alt="" className="h-8 w-8 shrink-0 object-contain" />
			<span className="text-lg">Renewal360</span>
		</Link>
	);
}

/**
 * "More" dropdown. A disclosure button, not an ARIA menu: it opens on click (and on hover with a mouse),
 * closes on Escape, on a click elsewhere, when focus leaves it, and when you navigate. While closed its
 * links are hidden and unfocusable.
 */
function MoreMenu({ pathname }: { pathname: string }) {
	const [open, setOpen] = useState(false);
	const root = useRef<HTMLDivElement>(null);
	const button = useRef<HTMLButtonElement>(null);
	const inSection = MORE_LINKS.some((l) => pathname === l.to || pathname.startsWith(`${l.to}/`));

	useEffect(() => setOpen(false), [pathname]);

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent) => {
			if (!root.current?.contains(e.target as Node)) setOpen(false);
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpen(false);
				button.current?.focus();
			}
		};
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<div
			ref={root}
			className="relative"
			onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
			onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
			onBlur={(e) => {
				if (!root.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
			}}
		>
			<button
				ref={button}
				type="button"
				aria-expanded={open}
				aria-controls="more-menu"
				onClick={() => setOpen((v) => !v)}
				className={cn(
					PILL,
					"inline-flex cursor-pointer items-center gap-1.5",
					inSection ? "bg-accent text-foreground" : "text-muted-foreground",
					open && "text-foreground",
				)}
			>
				More
				<ChevronDown
					aria-hidden
					className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
				/>
			</button>

			{/* The wrapper's top padding bridges the gap to the button, so moving the mouse down never closes it. */}
			<div
				id="more-menu"
				inert={!open}
				className={cn(
					"absolute right-0 top-full z-10 w-72 pt-3 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
					open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
				)}
			>
				<div className="rounded-2xl border border-border bg-background p-2 shadow-[0_24px_60px_-24px_rgb(11_13_20/0.35)]">
					{MORE_LINKS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className="block rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-accent data-[status=active]:bg-accent"
						>
							<span className="block text-sm font-medium text-foreground">{link.label}</span>
							<span className="mt-0.5 block text-xs text-muted-foreground">{link.hint}</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}

/**
 * Floating glass "island" nav, kept in the page flow (every page renders its own) so nothing underneath
 * needs extra top padding. It sticks to the top while you scroll. Desktop: one centred pill. Mobile: the
 * pill holds the logo and a menu button that opens a panel beneath it.
 */
export function Navigation() {
	const [open, setOpen] = useState(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	useEffect(() => setOpen(false), [pathname]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const trackDemo = (location: string) =>
		trackCtaClick({
			cta_text: "Request Demo",
			cta_location: location,
			funnel_stage: "decision",
			target_url: "/contact",
		});

	return (
		<header className="sticky top-0 z-50 px-4 pb-2 pt-4 print:hidden">
			<div className="mx-auto flex w-full max-w-md items-center justify-between rounded-full border border-border bg-background/85 py-2 pl-4 pr-2 backdrop-blur-xl lg:w-max lg:max-w-none lg:gap-8">
				<Wordmark />

				<nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className={cn(PILL, "text-muted-foreground", ACTIVE)}
							activeOptions={{ exact: link.to === "/" }}
						>
							{link.label}
						</Link>
					))}
					<MoreMenu pathname={pathname} />
				</nav>

				<Button asChild variant="gradient" size="sm" className="hidden rounded-full lg:inline-flex">
					<Link to="/contact" onClick={() => trackDemo("site_navigation")}>
						Request Demo
					</Link>
				</Button>

				<button
					type="button"
					className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-foreground lg:hidden"
					onClick={() => setOpen((v) => !v)}
					aria-label={open ? "Close navigation menu" : "Open navigation menu"}
					aria-expanded={open}
					aria-controls="mobile-menu"
				>
					{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
				</button>
			</div>

			<div
				id="mobile-menu"
				inert={!open}
				className={cn(
					"absolute inset-x-4 top-full mx-auto -mt-0 max-w-md overflow-hidden rounded-3xl border border-border bg-background/95 backdrop-blur-xl transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
					open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
				)}
			>
				<nav aria-label="Mobile" className="flex flex-col p-3">
					{NAV_LINKS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent data-[status=active]:bg-accent"
							activeOptions={{ exact: link.to === "/" }}
						>
							{link.label}
						</Link>
					))}
					<p className="eyebrow px-4 pb-1 pt-4 !text-muted-foreground">More</p>
					{MORE_LINKS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							className="rounded-xl px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[status=active]:bg-accent data-[status=active]:text-foreground"
						>
							{link.label}
						</Link>
					))}
					<Button asChild variant="gradient" size="lg" className="mt-3 w-full">
						<Link to="/contact" onClick={() => trackDemo("mobile_navigation")}>
							Request Demo
						</Link>
					</Button>
				</nav>
			</div>
		</header>
	);
}
