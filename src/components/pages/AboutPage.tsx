import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Zap } from "lucide-react";

export function AboutPage() {
	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Built by Customer Success Practitioners
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Renewal360 was created by CS professionals who understand the
						renewal grind firsthand
					</p>
				</div>

				<div className="max-w-4xl mx-auto mb-16">
					<Card className="bg-blue-50">
						<CardContent className="pt-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-6">
								The Founder's Story
							</h2>
							<div className="space-y-4 text-lg text-gray-700">
								<p>
									After spending five years in Customer Success roles at multiple
									SaaS companies, I experienced the same frustration repeatedly:
									manual renewal tracking was eating up valuable time that should
									have been spent on strategic customer conversations.
								</p>
								<p>
									Every month, I'd spend 10+ hours managing spreadsheets, setting
									calendar reminders, and drafting similar renewal emails. Despite
									my best efforts, renewals would occasionally slip through the
									cracks or get addressed at the last minute.
								</p>
								<p>
									I looked for tools to automate this workflow, but everything I
									found was either too complex (requiring months of setup and
									dedicated ops resources) or too simple (just basic email
									templates without intelligence).
								</p>
								<p>
									That's when I decided to build Renewal360: a service that
									combines AI automation with human oversight, designed
									specifically for lean SaaS teams who need renewal automation
									without the operational overhead.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="mb-16">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
						Our Approach
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<Card>
							<CardContent className="pt-6">
								<Target className="h-12 w-12 text-blue-600 mb-4" />
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									Practical AI
								</h3>
								<p className="text-gray-600">
									We use AI where it adds real value: generating contextual
									emails and handling routine follow-ups. We keep humans in the
									loop for quality and control.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<Users className="h-12 w-12 text-blue-600 mb-4" />
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									CS-First Mindset
								</h3>
								<p className="text-gray-600">
									Every feature is designed by people who've done CS work. We
									understand the real pain points and build solutions that
									actually fit into your workflow.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="pt-6">
								<Zap className="h-12 w-12 text-blue-600 mb-4" />
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									Fast Value
								</h3>
								<p className="text-gray-600">
									No six-month implementation cycles. Get value in your first
									week with simple setup and immediate time savings on renewal
									follow-ups.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="mb-16">
					<h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
						Why We're Different
					</h2>
					<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
						<Card className="bg-gray-50">
							<CardContent className="pt-6">
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									Not Software
								</h3>
								<p className="text-gray-600">
									Renewal360 is a service, not just software. We handle the
									AI, the email infrastructure, and the operational details. You
									just approve emails and track results.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-gray-50">
							<CardContent className="pt-6">
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									No Hype
								</h3>
								<p className="text-gray-600">
									We're not promising to replace your CS team or magically boost
									renewal rates by 50%. We save you time on manual work and
									ensure consistent follow-ups. That's it.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-gray-50">
							<CardContent className="pt-6">
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									Built for India
								</h3>
								<p className="text-gray-600">
									Transparent pricing in INR, data stored in compliance with
									Indian regulations, and support during Indian business hours.
								</p>
							</CardContent>
						</Card>

						<Card className="bg-gray-50">
							<CardContent className="pt-6">
								<h3 className="text-xl font-bold text-gray-900 mb-3">
									Small Team Focus
								</h3>
								<p className="text-gray-600">
									Designed for SaaS companies with 1-5 person CS teams who need
									automation without enterprise complexity or enterprise pricing.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="bg-blue-600 rounded-lg p-12 text-center text-white">
					<h2 className="text-3xl font-bold mb-4">
						Let's Talk About Your Renewal Process
					</h2>
					<p className="text-xl mb-8 text-blue-100">
						We'd love to understand your challenges and see if Renewal360 is
						a good fit
					</p>
				</div>
			</div>
		</div>
	);
}
