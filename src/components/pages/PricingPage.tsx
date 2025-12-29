import { Link } from "@tanstack/react-router";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export function PricingPage() {
	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Simple, Transparent Pricing
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Choose the plan that fits your renewal volume. All prices in Indian
						Rupees. No hidden fees.
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					<Card className="border-2 border-green-400 hover:border-green-500 transition-colors relative">
						<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
							<span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
								7-Day Free Trial
							</span>
						</div>
						<CardHeader>
							<CardTitle className="text-2xl">Free</CardTitle>
							<div className="mt-4">
								<span className="text-4xl font-bold">₹0</span>
								<span className="text-gray-600">/7 days</span>
							</div>
							<p className="text-sm text-gray-600 mt-2">
								Try all premium features free
							</p>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3 mb-6">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										<strong>7 days free access</strong>
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Unlimited active renewals
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										All premium features included
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Multi-CRM support
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Custom email templates
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Dedicated success manager
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Priority Slack/chat support
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">Custom reporting</span>
								</li>
							</ul>
							<Link to="/contact">
								<Button className="w-full bg-green-600 hover:bg-green-700">
									Start Free Trial
								</Button>
							</Link>
							<p className="text-xs text-gray-500 mt-3 text-center">
								No credit card required. Must upgrade to paid plan after 7 days.
							</p>
						</CardContent>
					</Card>

					<Card className="border-2 hover:border-blue-300 transition-colors">
						<CardHeader>
							<CardTitle className="text-2xl">Pilot</CardTitle>
							<div className="mt-4">
								<span className="text-4xl font-bold">₹25,000</span>
								<span className="text-gray-600">/month</span>
							</div>
							<p className="text-sm text-gray-600 mt-2">
								Perfect for trying Renewal360
							</p>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3 mb-6">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">Up to 200 active renewals</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										AI renewal reminder sequences
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">Email approval workflow</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Google Sheets integration
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">Weekly executive summaries</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">Email support</span>
								</li>
							</ul>
							<Link to="/contact">
								<Button className="w-full">Start Pilot</Button>
							</Link>
						</CardContent>
					</Card>

					<Card className="border-2 border-blue-600 relative">
						<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
							<span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
								Most Popular
							</span>
						</div>
						<CardHeader>
							<CardTitle className="text-2xl">Growth</CardTitle>
							<div className="mt-4">
								<span className="text-4xl font-bold">₹50,000</span>
								<span className="text-gray-600">/month</span>
							</div>
							<p className="text-sm text-gray-600 mt-2">
								For growing SaaS companies
							</p>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3 mb-6">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Up to 1000 active renewals
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Everything in Pilot, plus:
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Smart objection handling
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">CRM integration (HubSpot)</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Advanced follow-up automation
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">Priority email support</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">Onboarding consultation</span>
								</li>
							</ul>
							<Link to="/contact">
								<Button className="w-full">Get Started</Button>
							</Link>
						</CardContent>
					</Card>

					<Card className="border-2 hover:border-blue-300 transition-colors">
						<CardHeader>
							<CardTitle className="text-2xl">Scale</CardTitle>
							<div className="mt-4">
								<span className="text-4xl font-bold">₹75,000</span>
								<span className="text-gray-600">/month</span>
							</div>
							<p className="text-sm text-gray-600 mt-2">
								For established SaaS businesses
							</p>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3 mb-6">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Unlimited active renewals
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Everything in Growth, plus:
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Multi-CRM support (Salesforce, Pipedrive)
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Custom email templates
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Dedicated success manager
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Priority Slack/chat support
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">Custom reporting</span>
								</li>
							</ul>
							<Link to="/contact">
								<Button className="w-full">Contact Sales</Button>
							</Link>
						</CardContent>
					</Card>
				</div>

				<div className="bg-blue-50 rounded-lg p-8 text-center mb-16">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						No Hidden Fees. Ever.
					</h2>
					<p className="text-lg text-gray-600 mb-6">
						All plans include full access to core features. No setup fees, no per-user
						charges, no surprise costs.
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
						Start with a 7-Day Free Trial
					</h2>
					<p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
						Not sure which plan is right? Begin with our 7-day free trial and experience
						all premium features. No credit card required. After the trial, choose the plan
						that fits your needs.
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
