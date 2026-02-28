import { Link, useNavigate } from "@tanstack/react-router";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, HelpCircle, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { CheckoutModal } from "./CheckoutModal";

// Razorpay types for TypeScript
declare global {
	interface Window {
		Razorpay: any;
	}
}
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

type Currency = "INR" | "USD" | "EUR" | "GBP";

interface PricingTier {
	name: string;
	monthlyPrice: string;
	yearlyPrice: string;
	description: string;
	features: string[];
	cta: string;
	ctaLink: string;
	highlight?: boolean;
	highlightText?: string;
}

const PRICING_DATA: Record<Currency, PricingTier[]> = {
	INR: [
		{
			name: "Free",
			monthlyPrice: "₹0",
			yearlyPrice: "₹0",
			description: "Perfect for individuals just starting out",
			features: [
				"25 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Objection Handling",
				"CRM Integration",
				"Advanced Follow-Ups",
				"Executive Summaries",
				"Reporting Dashboard",
				"Dedicated Success Manager",
				"Priority Slack Support",
				"API Access",
				"Onboarding Consultation",
			],
			cta: "Start for Free",
			ctaLink: "/contact",
		},
		{
			name: "Starter",
			monthlyPrice: "₹49,000",
			yearlyPrice: "₹39,000",
			description: "For small teams scaling up",
			features: [
				"200 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Basic Objection Handling",
				"HubSpot CRM Integration",
				"Weekly Executive Summaries",
			],
			cta: "Get Started",
			ctaLink: "/contact",
		},
		{
			name: "Growth",
			monthlyPrice: "₹99,000",
			yearlyPrice: "₹79,000",
			description: "For growing companies",
			features: [
				"1,000 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Smart AI Objection Handling",
				"HubSpot + 1 CRM Integration",
				"Advanced Follow-Ups",
				"Advanced Executive Summaries",
				"Reporting Dashboard",
				"Onboarding Consultation",
			],
			cta: "Get Started",
			ctaLink: "/contact",
			highlight: true,
			highlightText: "Most Popular",
		},
		{
			name: "Scale",
			monthlyPrice: "₹1,79,000",
			yearlyPrice: "₹1,49,000",
			description: "For large enterprises",
			features: [
				"Unlimited Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Smart AI Objection Handling",
				"Multi-CRM Integration",
				"Advanced Follow-Ups",
				"Custom Executive Summaries",
				"Custom Reporting Dashboard",
				"Dedicated Success Manager",
				"Priority Slack Support",
				"API Access",
				"Onboarding Consultation",
			],
			cta: "Contact Sales",
			ctaLink: "/contact",
		},
	],
	USD: [
		{
			name: "Free",
			monthlyPrice: "$0",
			yearlyPrice: "$0",
			description: "Perfect for individuals just starting out",
			features: [
				"25 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Objection Handling",
				"CRM Integration",
				"Advanced Follow-Ups",
				"Executive Summaries",
				"Reporting Dashboard",
				"Dedicated Success Manager",
				"Priority Slack Support",
				"API Access",
				"Onboarding Consultation",
			],
			cta: "Start for Free",
			ctaLink: "/contact",
			highlight: false,
		},
		{
			name: "Starter",
			monthlyPrice: "$499",
			yearlyPrice: "$399",
			description: "For small teams scaling up",
			features: [
				"200 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Basic Objection Handling",
				"HubSpot CRM Integration",
				"Weekly Executive Summaries",
			],
			cta: "Get Started",
			ctaLink: "/contact",
		},
		{
			name: "Growth",
			monthlyPrice: "$999",
			yearlyPrice: "$799",
			description: "For growing companies",
			features: [
				"1,000 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Smart AI Objection Handling",
				"HubSpot + 1 CRM Integration",
				"Advanced Follow-Ups",
				"Advanced Executive Summaries",
				"Reporting Dashboard",
				"Onboarding Consultation",
			],
			cta: "Get Started",
			ctaLink: "/contact",
			highlight: true,
			highlightText: "Most Popular",
		},
		{
			name: "Scale",
			monthlyPrice: "$1,799",
			yearlyPrice: "$1,499",
			description: "For large enterprises",
			features: [
				"Unlimited Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Smart AI Objection Handling",
				"Multi-CRM Integration",
				"Advanced Follow-Ups",
				"Custom Executive Summaries",
				"Custom Reporting Dashboard",
				"Dedicated Success Manager",
				"Priority Slack Support",
				"API Access",
				"Onboarding Consultation",
			],
			cta: "Contact Sales",
			ctaLink: "/contact",
		},
	],
	EUR: [
		{
			name: "Free",
			monthlyPrice: "€0",
			yearlyPrice: "€0",
			description: "Perfect for individuals just starting out",
			features: [
				"25 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Objection Handling",
				"CRM Integration",
				"Advanced Follow-Ups",
				"Executive Summaries",
				"Reporting Dashboard",
				"Dedicated Success Manager",
				"Priority Slack Support",
				"API Access",
				"Onboarding Consultation",
			],
			cta: "Start for Free",
			ctaLink: "/contact",
		},
		{
			name: "Starter",
			monthlyPrice: "€449",
			yearlyPrice: "€359",
			description: "For small teams scaling up",
			features: [
				"200 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Basic Objection Handling",
				"HubSpot CRM Integration",
				"Weekly Executive Summaries",
			],
			cta: "Get Started",
			ctaLink: "/contact",
		},
		{
			name: "Growth",
			monthlyPrice: "€899",
			yearlyPrice: "€719",
			description: "For growing companies",
			features: [
				"1,000 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Smart AI Objection Handling",
				"HubSpot + 1 CRM Integration",
				"Advanced Follow-Ups",
				"Advanced Executive Summaries",
				"Reporting Dashboard",
				"Onboarding Consultation",
			],
			cta: "Get Started",
			ctaLink: "/contact",
			highlight: true,
			highlightText: "Most Popular",
		},
		{
			name: "Scale",
			monthlyPrice: "€1,599",
			yearlyPrice: "€1,279",
			description: "For large enterprises",
			features: [
				"Unlimited Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Smart AI Objection Handling",
				"Multi-CRM Integration",
				"Advanced Follow-Ups",
				"Custom Executive Summaries",
				"Custom Reporting Dashboard",
				"Dedicated Success Manager",
				"Priority Slack Support",
				"API Access",
				"Onboarding Consultation",
			],
			cta: "Contact Sales",
			ctaLink: "/contact",
		},
	],
	GBP: [
		{
			name: "Free",
			monthlyPrice: "£0",
			yearlyPrice: "£0",
			description: "Perfect for individuals just starting out",
			features: [
				"25 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Objection Handling",
				"CRM Integration",
				"Advanced Follow-Ups",
				"Executive Summaries",
				"Reporting Dashboard",
				"Dedicated Success Manager",
				"Priority Slack Support",
				"API Access",
				"Onboarding Consultation",
			],
			cta: "Start for Free",
			ctaLink: "/contact",
		},
		{
			name: "Starter",
			monthlyPrice: "£399",
			yearlyPrice: "£319",
			description: "For small teams scaling up",
			features: [
				"200 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Basic Objection Handling",
				"HubSpot CRM Integration",
				"Weekly Executive Summaries",
			],
			cta: "Get Started",
			ctaLink: "/contact",
		},
		{
			name: "Growth",
			monthlyPrice: "£799",
			yearlyPrice: "£639",
			description: "For growing companies",
			features: [
				"1,000 Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Smart AI Objection Handling",
				"HubSpot + 1 CRM Integration",
				"Advanced Follow-Ups",
				"Advanced Executive Summaries",
				"Reporting Dashboard",
				"Onboarding Consultation",
			],
			cta: "Get Started",
			ctaLink: "/contact",
			highlight: true,
			highlightText: "Most Popular",
		},
		{
			name: "Scale",
			monthlyPrice: "£1,499",
			yearlyPrice: "£1,199",
			description: "For large enterprises",
			features: [
				"Unlimited Active Accounts",
				"AI Renewal Sequences",
				"Email Approval Workflow",
				"Smart AI Objection Handling",
				"Multi-CRM Integration",
				"Advanced Follow-Ups",
				"Custom Executive Summaries",
				"Custom Reporting Dashboard",
				"Dedicated Success Manager",
				"Priority Slack Support",
				"API Access",
				"Onboarding Consultation",
			],
			cta: "Contact Sales",
			ctaLink: "/contact",
		},
	],
};

const ADD_ONS: Record<Currency, string> = {
	INR: "₹35,000 / month",
	USD: "$349 / month",
	EUR: "€299 / month",
	GBP: "£299 / month",
};

export function PricingPage() {
	const [currency, setCurrency] = useState<Currency>("USD"); // Default to USD
	const [isAnnual, setIsAnnual] = useState(false);
	const [selectedTier, setSelectedTier] = useState<{ name: string, price: string } | null>(null);
	const navigate = useNavigate();

	// Removed handlePayment as we use CheckoutModal for public flow
	// Public checkout handled by CheckoutModal

	useEffect(() => {
		const detectLocation = async () => {
			try {
				console.log("Detecting location for pricing...");
				// Try fetching IP location data
				const response = await fetch("https://ipapi.co/json/");
				if (!response.ok) throw new Error("IP API request failed");
				const data = await response.json();
				console.log("IP API Response:", data);

				const apiCurrency = data.currency; // e.g. "INR", "USD", "EUR", "GBP"

				if (apiCurrency === "INR") {
					setCurrency("INR");
				} else if (apiCurrency === "GBP") {
					setCurrency("GBP");
				} else if (apiCurrency === "EUR") {
					setCurrency("EUR");
				} else {
					// Fallback: check country/continent if currency is not standard
					const country = data.country_code;
					if (data.continent_code === "EU" || ["DE", "FR", "IT", "ES", "NL"].includes(country)) {
						setCurrency("EUR");
					} else {
						setCurrency("USD");
					}
				}
			} catch (ipError) {
				console.warn("IP geolocation failed, falling back to timezone:", ipError);
				// Fallback to timezone detection
				try {
					const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
					console.log("Detected Timezone:", timeZone);
					if (timeZone.startsWith("Asia/Kolkata") || timeZone.startsWith("Asia/Calcutta")) {
						setCurrency("INR");
					} else if (timeZone.startsWith("Europe/London") || timeZone === "GMT" || timeZone === "BST") {
						setCurrency("GBP");
					} else if (timeZone.startsWith("Europe/")) {
						setCurrency("EUR");
					} else {
						setCurrency("USD"); // Default
					}
				} catch (tzError) {
					console.error("Timezone detection failed:", tzError);
					setCurrency("USD");
				}
			}
		};

		detectLocation();
	}, []);

	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Simple, Transparent Pricing
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Choose the plan that fits your renewal volume. No hidden fees.
					</p>
				</div>

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

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{PRICING_DATA[currency].map((tier) => (
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
									<span className="text-4xl font-bold">
										{isAnnual ? tier.yearlyPrice : tier.monthlyPrice}
									</span>
									<span className="text-gray-600 text-sm font-medium">
										{tier.name === "Free" ? "/forever" : isAnnual ? "/month (billed annually)" : "/month"}
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
								{/* Free and Scale (Contact Sales) → link to /contact; Starter/Growth → Razorpay checkout */}
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
											onClick={() => {
												setSelectedTier({
													name: tier.name,
													price: isAnnual ? tier.yearlyPrice : tier.monthlyPrice
												});
											}}
										>
											{tier.cta}
										</Button>
									</div>
								)}
							</CardContent>
						</Card>
					))}
				</div>

				<div className="bg-blue-50 rounded-lg p-8 text-center mb-16 max-w-2xl mx-auto border border-blue-100">
					<h2 className="text-lg font-semibold text-blue-900 mb-2">
						Need more capacity?
					</h2>
					<p className="text-blue-700 flex items-center justify-center gap-2">
						Add 500 Accounts for{" "}
						<span className="font-bold text-blue-900">{ADD_ONS[currency]}</span>
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

				{/* Checkout Modal */}
				{
					selectedTier && (
						<CheckoutModal
							isOpen={!!selectedTier}
							onClose={() => setSelectedTier(null)}
							plan={selectedTier.name}
							billingCycle={isAnnual ? "yearly" : "monthly"}
							currency={currency}
							price={selectedTier.price}
						/>
					)
				}

				<div className="bg-gray-50 rounded-lg p-8 text-center mb-16">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						No Hidden Fees. Ever.
					</h2>
					<p className="text-lg text-gray-600 mb-6">
						All plans include full access to stated features. No setup fees, no
						per-user charges, no surprise costs.
					</p>
					<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
						<div className="flex items-start gap-3">
							<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
							<div>
								<div className="font-semibold text-gray-900">
									Cancel Anytime
								</div>
								<div className="text-sm text-gray-600">
									No long-term contracts
								</div>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
							<div>
								<div className="font-semibold text-gray-900">
									Data Security
								</div>
								<div className="text-sm text-gray-600">
									SOC 2 compliant infrastructure
								</div>
							</div>
						</div>
						<div className="flex items-start gap-3">
							<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
							<div>
								<div className="font-semibold text-gray-900">
									Easy Onboarding
								</div>
								<div className="text-sm text-gray-600">
									Setup in under 1 week
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Start for Free
					</h2>
					<p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
						Not sure which plan is right? Begin with our Free tier and
						experience the power of renewal automation. No credit card required.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/contact">
							<Button
								size="lg"
								className="text-lg px-8 bg-green-600 hover:bg-green-700"
							>
								Start Free Account
							</Button>
						</Link>
						<Link to="/contact">
							<Button size="lg" variant="outline" className="text-lg px-8">
								Request a Demo
							</Button>
						</Link>
					</div>
				</div>
			</div >
		</div >
	);
}
