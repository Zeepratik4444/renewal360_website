import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, RefreshCw, MessageSquare, FileText, Database, CheckCircle2 } from "lucide-react";

export function FeaturesPage() {
	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Powerful Features for Renewal Automation
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Everything you need to automate renewal follow-ups while maintaining
						control and quality
					</p>
				</div>

				<div className="space-y-16">
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<Mail className="h-12 w-12 text-blue-600 mb-4" />
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								AI Renewal Reminders
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								Intelligent email sequences triggered at optimal intervals
								before renewal dates
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										<strong>T-60 Days:</strong> Initial renewal discussion with
										value recap
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										<strong>T-30 Days:</strong> Reminder with next steps and
										pricing
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										<strong>T-7 Days:</strong> Urgency message with renewal
										options
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										<strong>T-1 Day:</strong> Final reminder before contract
										expires
									</span>
								</li>
							</ul>
						</div>
						<Card className="bg-blue-50">
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div className="bg-white p-4 rounded border-l-4 border-blue-600">
										<div className="text-sm text-gray-500 mb-1">
											AI-Generated Email Preview
										</div>
										<div className="font-medium mb-2">
											Subject: Your [Product] renewal is coming up
										</div>
										<div className="text-sm text-gray-700">
											Hi [Name], your annual subscription renews in 30 days. Over
											the past year, you've [achievement]. Let's discuss renewal
											options...
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid md:grid-cols-2 gap-8 items-center">
						<Card className="bg-green-50 md:order-2">
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div className="bg-white p-4 rounded border-l-4 border-green-600">
										<div className="text-sm text-gray-500 mb-1">
											Automatic Response
										</div>
										<div className="font-medium mb-2">Customer: "Too expensive"</div>
										<div className="text-sm text-gray-700 mb-3">
											AI suggests: "I understand budget is important. Let me show
											you the ROI you've achieved..."
										</div>
										<div className="flex gap-2">
											<button className="px-3 py-1 bg-green-600 text-white text-sm rounded">
												Approve
											</button>
											<button className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded">
												Edit
											</button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
						<div className="md:order-1">
							<RefreshCw className="h-12 w-12 text-green-600 mb-4" />
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Smart Follow-up Automation
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								AI monitors responses and automatically suggests follow-ups based
								on customer sentiment and engagement
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Detects no-response and triggers gentle nudges
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Adjusts timing based on previous engagement patterns
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Escalates to team members when needed
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<MessageSquare className="h-12 w-12 text-purple-600 mb-4" />
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Objection Handling
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								AI analyzes customer responses and suggests appropriate responses
								to common objections
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Price objections with ROI calculations
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Feature requests with product roadmap updates
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Timing concerns with flexible options
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Competitive comparisons with differentiators
									</span>
								</li>
							</ul>
						</div>
						<Card className="bg-purple-50">
							<CardContent className="pt-6">
								<div className="space-y-3">
									<div className="bg-white p-3 rounded">
										<div className="font-medium text-sm mb-1">
											Objection: "Price too high"
										</div>
										<div className="text-xs text-gray-600">
											Response: Show ROI, offer discount
										</div>
									</div>
									<div className="bg-white p-3 rounded">
										<div className="font-medium text-sm mb-1">
											Objection: "Need more features"
										</div>
										<div className="text-xs text-gray-600">
											Response: Share roadmap, current value
										</div>
									</div>
									<div className="bg-white p-3 rounded">
										<div className="font-medium text-sm mb-1">
											Objection: "Evaluating alternatives"
										</div>
										<div className="text-xs text-gray-600">
											Response: Competitive advantages, case studies
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid md:grid-cols-2 gap-8 items-center">
						<Card className="bg-orange-50 md:order-2">
							<CardContent className="pt-6">
								<div className="bg-white p-4 rounded">
									<div className="text-sm font-semibold mb-3">
										Weekly Executive Summary
									</div>
									<div className="space-y-2 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-600">Renewals Due (30d):</span>
											<span className="font-semibold">24</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">At Risk:</span>
											<span className="font-semibold text-red-600">3</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">On Track:</span>
											<span className="font-semibold text-green-600">18</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Pending Response:</span>
											<span className="font-semibold text-yellow-600">3</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
						<div className="md:order-1">
							<FileText className="h-12 w-12 text-orange-600 mb-4" />
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Executive Summaries
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								Automated weekly reports for leadership with renewal pipeline
								health and risk factors
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Upcoming renewals with status breakdown
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										At-risk accounts requiring attention
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Response rates and engagement metrics
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Key trends and insights
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<Database className="h-12 w-12 text-indigo-600 mb-4" />
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								CRM & Google Sheets Integration
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								Seamlessly connect with your existing tools - no complex setup
								required
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Google Sheets for simple tracking
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										HubSpot, Salesforce, Pipedrive support
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Automatic data sync and updates
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Two-way communication tracking
									</span>
								</li>
							</ul>
						</div>
						<Card className="bg-indigo-50">
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div className="bg-white p-4 rounded">
										<div className="text-sm font-semibold mb-3">
											Supported Data Sources
										</div>
										<div className="grid grid-cols-2 gap-3 text-sm">
											<div className="flex items-center gap-2">
												<CheckCircle2 className="h-4 w-4 text-indigo-600" />
												<span>Google Sheets</span>
											</div>
											<div className="flex items-center gap-2">
												<CheckCircle2 className="h-4 w-4 text-indigo-600" />
												<span>HubSpot</span>
											</div>
											<div className="flex items-center gap-2">
												<CheckCircle2 className="h-4 w-4 text-indigo-600" />
												<span>Salesforce</span>
											</div>
											<div className="flex items-center gap-2">
												<CheckCircle2 className="h-4 w-4 text-indigo-600" />
												<span>Pipedrive</span>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid md:grid-cols-2 gap-8 items-center">
						<Card className="bg-teal-50 md:order-2">
							<CardContent className="pt-6">
								<div className="bg-white p-4 rounded">
									<div className="text-sm font-semibold mb-3">
										Email Approval Workflow
									</div>
									<div className="space-y-3">
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
												1
											</div>
											<span className="text-sm">AI generates email draft</span>
										</div>
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
												2
											</div>
											<span className="text-sm">Team reviews and edits</span>
										</div>
										<div className="flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold">
												3
											</div>
											<span className="text-sm">Approval sends email</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
						<div className="md:order-1">
							<CheckCircle2 className="h-12 w-12 text-teal-600 mb-4" />
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Human Approval Workflow
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								Maintain full control with human oversight before any email is
								sent to customers
							</p>
							<ul className="space-y-3">
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Review all AI-generated emails before sending
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Edit and customize messages as needed
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Set approval rules and escalations
									</span>
								</li>
								<li className="flex items-start gap-3">
									<CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
									<span className="text-gray-700">
										Ensure brand voice and accuracy
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
