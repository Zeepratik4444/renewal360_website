import { Link } from "@tanstack/react-router";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, HelpCircle, Check, Minus } from "lucide-react";
import { useState } from "react";
import { CheckoutModal } from "./CheckoutModal";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePricing } from "@/hooks/usePricing";
import { FEATURE_COMPARISON } from "@/lib/pricing";
import { useSEO } from "@/hooks/useSEO";

// Razorpay types
declare global {
	interface Window {
		Razorpay: any;
	}
}

/** Render a comparison cell value with appropriate styling */
function ComparisonCell({ value, isGrowth }: { value: string; isGrowth?: boolean }) {
	if (value === "✓") {
		return (
			<span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${isGrowth ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}>
				<Check className="h-4 w-4" />
			</span>
		);
	}
	if (value === "—") {
		return (
			<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-400">
				<Minus className="h-4 w-4" />
			</span>
		);
	}
	return <span className={`text-sm font-medium ${isGrowth ? "text-blue-700" : "text-gray-700"}`}>{value}</span>;
}

export function PricingPage() {
	const { currency, isAnnual, setIsAnnual, plans, addOn, getPrice } = usePricing();
	useSEO({
		title: "Pricing - Renewal360",
		description: "Simple, transparent pricing. Every signup gets 7 days of full Scale access.",
	});

	const [selectedTier, setSelectedTier] = useState<{
		name: string;
		price: string;
	} | null>(null);

	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Simple, Transparent Pricing
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
						Every signup gets <strong>7 days of full Scale access</strong> — then
						choose the plan that fits your renewal volume. No hidden fees.
					</p>
					<span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full">
						Unlimited seats at every tier — no per-user charges
					</span>
				</div>

				{/* Billing toggle only — currency is auto-detected */}
				<div className="flex justify-center mb-12">
					<Tabs
						defaultValue="monthly"
						value={isAnnual ? "yearly" : "monthly"}
						onValueChange={(val) => setIsAnnual(val === "yearly")}
						className="w-[400px]"
					>
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="monthly">Monthly</TabsTrigger>
							<TabsTrigger value="yearly">
								Yearly
								<span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
									Save 20%
								</span>
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				{/* Plan cards */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{plans.map((tier) => (
						<Card
							key={tier.name}
							className={`border-2 transition-colors relative flex flex-col h-full ${tier.highlight
								? "border-blue-600 hover:border-blue-700 shadow-lg"
								: "hover:border-blue-300"
								}`}
						>
							{tier.highlight && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
										{tier.highlightText}
									</span>
								</div>
							)}

							<CardHeader>
								<CardTitle className="text-2xl">{tier.name}</CardTitle>
								<div className="mt-4">
									<span className="text-4xl font-bold">{getPrice(tier)}</span>
									<span className="text-gray-600 text-sm font-medium">
										{tier.name === "Free"
											? "/forever"
											: isAnnual
												? "/month (billed annually)"
												: "/month"}
									</span>
								</div>
								<p className="text-sm text-gray-600 mt-2">{tier.description}</p>
							</CardHeader>

							<CardContent className="flex flex-col flex-1">
								<ul className="space-y-3 mb-6 flex-1">
									{tier.features.map((feature, index) => (
										<li key={index} className="flex items-start gap-3">
											<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
											<span className="text-gray-700 text-sm">{feature}</span>
										</li>
									))}
								</ul>

								{/* Free and Scale → /contact; SMB/Growth → Razorpay */}
								{tier.name === "Free" || tier.name === "Scale" ? (
									<Link to={tier.ctaLink} className="mt-auto">
										<Button
											className={`w-full ${tier.name === "Free"
												? "bg-green-600 hover:bg-green-700"
												: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
												}`}
											variant={tier.name === "Free" ? "default" : "outline"}
										>
											{tier.cta}
										</Button>
									</Link>
								) : (
									<div className="mt-auto">
										<Button
											className={`w-full ${tier.highlight
												? "bg-blue-600 hover:bg-blue-700"
												: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold"
												}`}
											variant={tier.highlight ? "default" : "outline"}
											onClick={() =>
												setSelectedTier({ name: tier.name, price: getPrice(tier) })
											}
										>
											{tier.cta}
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>

				{/* Supportive validation links */}
				<div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm text-gray-600 mb-12 py-4 bg-gray-50/50 rounded-xl border border-gray-100 max-w-4xl mx-auto">
					<div className="flex items-center gap-2">
						<span className="text-gray-500">Comparing options?</span>
						<Link to="/blog/$slug" params={{ slug: "gainsight-vs-totango-vs-renewal360" }} className="text-blue-600 font-semibold hover:underline">
							Read Gainsight vs Totango vs Renewal360 &rarr;
						</Link>
					</div>
					<span className="hidden md:inline text-gray-300">|</span>
					<div className="flex items-center gap-2">
						<span className="text-gray-500">Wondering about setup?</span>
						<Link to="/blog/$slug" params={{ slug: "renewal360-setup-guide-live-in-7-days" }} className="text-blue-600 font-semibold hover:underline">
							See our 7-Day Setup Guide &rarr;
						</Link>
					</div>
				</div>

				{/* Add-on block */}
				<div className="bg-blue-50 rounded-lg p-8 text-center mb-16 max-w-2xl mx-auto border border-blue-100">
					<h2 className="text-lg font-semibold text-blue-900 mb-2">
						Need more capacity?
					</h2>
					<p className="text-blue-700 flex items-center justify-center gap-2">
						Add 500 Accounts for{" "}
						<span className="font-bold text-blue-900">{addOn}</span>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<HelpCircle className="h-4 w-4 text-blue-500 cursor-help" />
								</TooltipTrigger>
								<TooltipContent>
									<p>Add-on packs can be purchased with any paid plan</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</p>
				</div>

				{/* Checkout modal */}
				{selectedTier && (
					<CheckoutModal
						isOpen={!!selectedTier}
						onClose={() => setSelectedTier(null)}
						plan={selectedTier.name}
						billingCycle={isAnnual ? "yearly" : "monthly"}
						currency={currency}
						price={selectedTier.price}
					/>
				)}

				{/* ── Feature Comparison Table ────────────────────────────── */}
				<div className="mb-16">
					<div className="text-center mb-10">
						<h2 className="text-3xl font-bold text-gray-900 mb-3">
							Compare Plans in Detail
						</h2>
						<p className="text-gray-600 text-lg">
							See exactly what's included at each tier
						</p>
					</div>

					<div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
						<table className="w-full text-left">
							{/* Table header — plan names */}
							<thead>
								<tr className="bg-gray-50 border-b border-gray-200">
									<th className="py-4 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider w-[280px] min-w-[200px]">
										Feature
									</th>
									<th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
										Free
									</th>
									<th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
										SMB
									</th>
									<th className="py-4 px-4 text-center text-sm font-semibold text-blue-700 uppercase tracking-wider bg-blue-50/50">
										Growth ⭐
									</th>
									<th className="py-4 px-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider">
										Scale
									</th>
								</tr>
							</thead>
							<tbody>
								{FEATURE_COMPARISON.map((section) => (
									<>
										{/* Category header row */}
										<tr key={`cat-${section.category}`} className="bg-gray-50/70">
											<td
												colSpan={5}
												className="py-3 px-6 text-sm font-bold text-gray-800 uppercase tracking-wide border-t border-gray-200"
											>
												{section.category}
											</td>
										</tr>
										{/* Feature rows */}
										{section.rows.map((row) => (
											<tr
												key={row.feature}
												className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors"
											>
												<td className="py-3.5 px-6 text-sm text-gray-700">
													{row.feature}
												</td>
												<td className="py-3.5 px-4 text-center">
													<ComparisonCell value={row.free} />
												</td>
												<td className="py-3.5 px-4 text-center">
													<ComparisonCell value={row.smb} />
												</td>
												<td className="py-3.5 px-4 text-center bg-blue-50/30">
													<ComparisonCell value={row.growth} isGrowth />
												</td>
												<td className="py-3.5 px-4 text-center">
													<ComparisonCell value={row.scale} />
												</td>
											</tr>
										))}
									</>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* No hidden fees */}
				<div className="bg-gray-50 rounded-lg p-8 text-center mb-16">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						No Hidden Fees. Ever.
					</h2>
					<p className="text-lg text-gray-600 mb-6">
						All plans include full access to stated features. No setup fees, no
						per-user charges, no surprise costs.
					</p>
					<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
						{[
							{ title: "Cancel Anytime", desc: "No long-term contracts" },
							{ title: "Unlimited Seats", desc: "Invite your whole team — no per-user charges" },
							{ title: "7-Day Scale Trial", desc: "Experience every feature before you commit" },
						].map(({ title, desc }) => (
							<div key={title} className="flex items-start gap-3">
								<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
								<div>
									<div className="font-semibold text-gray-900">{title}</div>
									<div className="text-sm text-gray-600">{desc}</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Bottom CTA */}
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Start with 7 Days of Scale</h2>
					<p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
						Every new signup gets instant access to all Scale features for 7 days.
						No credit card required. Experience the full power of renewal intelligence
						before you choose a plan.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/contact">
							<Button size="lg" className="text-lg px-8 bg-green-600 hover:bg-green-700">
								Start Free Trial
							</Button>
						</Link>
						<Link to="/contact">
							<Button size="lg" variant="outline" className="text-lg px-8">
								Request a Demo
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}