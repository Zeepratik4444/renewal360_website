import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Sparkles, Mail, BarChart3 } from "lucide-react";

export function HowItWorksPage() {
	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						How Renewal360 Works
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Four simple steps to automate your renewal follow-ups
					</p>
				</div>

				<div className="space-y-16">
					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 font-bold text-2xl mb-6">
								1
							</div>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Add Your Renewal Data
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								Connect your existing Google Sheet or CRM with renewal dates, customer
								details, and contract information. Our system syncs automatically.
							</p>
							<ul className="space-y-3 text-gray-700">
								<li className="flex items-start gap-3">
									<Upload className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span>
										Import from Google Sheets, HubSpot, Salesforce, or Pipedrive
									</span>
								</li>
								<li className="flex items-start gap-3">
									<Upload className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span>Required fields: Customer name, email, renewal date</span>
								</li>
								<li className="flex items-start gap-3">
									<Upload className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span>Optional: Contract value, product details, notes</span>
								</li>
							</ul>
						</div>
						<Card className="bg-blue-50">
							<CardContent className="pt-6">
								<div className="bg-white p-6 rounded">
									<div className="text-sm font-semibold mb-4 text-gray-900">
										Sample Renewal Data
									</div>
									<div className="space-y-3 text-sm">
										<div className="grid grid-cols-2 gap-2 pb-2 border-b">
											<span className="font-semibold">Field</span>
											<span className="font-semibold">Example</span>
										</div>
										<div className="grid grid-cols-2 gap-2">
											<span className="text-gray-600">Customer</span>
											<span>Acme Corp</span>
										</div>
										<div className="grid grid-cols-2 gap-2">
											<span className="text-gray-600">Email</span>
											<span>john@acme.com</span>
										</div>
										<div className="grid grid-cols-2 gap-2">
											<span className="text-gray-600">Renewal Date</span>
											<span>Mar 15, 2025</span>
										</div>
										<div className="grid grid-cols-2 gap-2">
											<span className="text-gray-600">Plan</span>
											<span>Annual Pro</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<Card className="bg-purple-50 md:order-2">
							<CardContent className="pt-6">
								<div className="bg-white p-6 rounded">
									<div className="text-sm font-semibold mb-4 text-gray-900">
										AI Email Generation
									</div>
									<div className="space-y-4">
										<div className="border-l-4 border-purple-600 pl-4">
											<div className="text-xs text-gray-500 mb-1">
												Analyzing customer data...
											</div>
											<div className="text-sm text-gray-700">
												Customer: Acme Corp
												<br />
												Last interaction: 2 weeks ago
												<br />
												Usage level: High
												<br />
												Renewal: 30 days
											</div>
										</div>
										<div className="border-l-4 border-purple-400 pl-4">
											<div className="text-xs text-gray-500 mb-1">
												Generating personalized email...
											</div>
											<div className="text-sm text-gray-700">
												"Hi John, your Pro plan has been instrumental in helping
												Acme achieve..."
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
						<div className="md:order-1">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 font-bold text-2xl mb-6">
								2
							</div>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								AI Generates Personalized Emails
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								Our AI analyzes customer data, usage patterns, and renewal timing to
								create contextual, personalized renewal reminder emails.
							</p>
							<ul className="space-y-3 text-gray-700">
								<li className="flex items-start gap-3">
									<Sparkles className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
									<span>
										T-60, T-30, T-7, and T-1 day sequences automatically triggered
									</span>
								</li>
								<li className="flex items-start gap-3">
									<Sparkles className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
									<span>Personalization based on customer history and behavior</span>
								</li>
								<li className="flex items-start gap-3">
									<Sparkles className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
									<span>Smart objection handling for common responses</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 font-bold text-2xl mb-6">
								3
							</div>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Review and Approve Emails
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								Your team reviews AI-generated emails before they're sent. Edit,
								approve, or reject each message to ensure quality and brand voice.
							</p>
							<ul className="space-y-3 text-gray-700">
								<li className="flex items-start gap-3">
									<Mail className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span>Human-in-the-loop approval for every email</span>
								</li>
								<li className="flex items-start gap-3">
									<Mail className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span>Edit subject lines, body text, or timing</span>
								</li>
								<li className="flex items-start gap-3">
									<Mail className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span>Set approval workflows and delegation rules</span>
								</li>
							</ul>
						</div>
						<Card className="bg-green-50">
							<CardContent className="pt-6">
								<div className="bg-white p-6 rounded">
									<div className="text-sm font-semibold mb-4 text-gray-900">
										Email Approval Interface
									</div>
									<div className="space-y-4">
										<div className="border rounded p-3 bg-gray-50">
											<div className="text-xs text-gray-500 mb-2">
												To: john@acme.com
											</div>
											<div className="text-sm font-semibold mb-2">
												Subject: Your renewal is coming up
											</div>
											<div className="text-xs text-gray-700 mb-3">
												Hi John, your Pro plan renewal is 30 days away...
											</div>
											<div className="flex gap-2">
												<button className="px-4 py-2 bg-green-600 text-white text-sm rounded">
													Approve & Send
												</button>
												<button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded">
													Edit
												</button>
												<button className="px-4 py-2 bg-red-100 text-red-700 text-sm rounded">
													Reject
												</button>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<Card className="bg-orange-50 md:order-2">
							<CardContent className="pt-6">
								<div className="bg-white p-6 rounded">
									<div className="text-sm font-semibold mb-4 text-gray-900">
										Renewal Dashboard
									</div>
									<div className="space-y-3">
										<div className="flex justify-between items-center pb-2 border-b">
											<span className="text-sm font-semibold">Status</span>
											<span className="text-sm font-semibold">Count</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">
												✓ Renewed
											</span>
											<span className="text-sm font-semibold text-green-600">
												18
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">
												→ In Progress
											</span>
											<span className="text-sm font-semibold text-blue-600">
												12
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">
												⚠ At Risk
											</span>
											<span className="text-sm font-semibold text-red-600">
												3
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600">
												⏳ Upcoming
											</span>
											<span className="text-sm font-semibold text-gray-600">
												45
											</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
						<div className="md:order-1">
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 font-bold text-2xl mb-6">
								4
							</div>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Track and Gain Visibility
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								Monitor renewal pipeline health with real-time dashboards and
								executive summaries. Identify at-risk accounts and take action.
							</p>
							<ul className="space-y-3 text-gray-700">
								<li className="flex items-start gap-3">
									<BarChart3 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
									<span>Real-time renewal pipeline dashboard</span>
								</li>
								<li className="flex items-start gap-3">
									<BarChart3 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
									<span>Weekly executive summaries with risk factors</span>
								</li>
								<li className="flex items-start gap-3">
									<BarChart3 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
									<span>Track email open rates and customer responses</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-16 bg-blue-600 rounded-lg p-12 text-center text-white">
					<h2 className="text-3xl font-bold mb-4">
						Ready to See It in Action?
					</h2>
					<p className="text-xl mb-8 text-blue-100">
						Schedule a demo to see how Renewal360 can transform your renewal
						process
					</p>
				</div>
			</div>
		</div>
	);
}
