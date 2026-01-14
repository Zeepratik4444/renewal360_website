import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Target, TrendingUp, Mail, Calendar, BarChart3 } from "lucide-react";
import { Navigation } from "@/components/Navigation";

export function HomePage() {
	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			{/* Hero Section */}
			<section className="bg-gradient-to-b from-blue-50 to-white py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
						Stop Chasing Renewals.
						<br />
						<span className="text-blue-600">Let AI Handle It.</span>
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
						Renewal360 automates your SaaS renewal follow-ups with AI-powered
						emails, saving CS teams 10+ hours per month while ensuring zero renewals
						slip through the cracks.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/contact">
							<Button size="lg" className="text-lg px-8">
								Request a 7-Day Pilot
							</Button>
						</Link>
						<Link to="/how-it-works">
							<Button size="lg" variant="outline" className="text-lg px-8">
								See How It Works
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Problem Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Manual Renewals Are Costing You Time and Revenue
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							SaaS founders and CS teams waste hours on repetitive renewal tasks
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<Card>
							<CardHeader>
								<Clock className="h-10 w-10 text-red-500 mb-2" />
								<CardTitle>Time Drain</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Manually tracking renewal dates and sending follow-ups consumes
									10+ hours per month per team member
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Target className="h-10 w-10 text-red-500 mb-2" />
								<CardTitle>Missed Follow-ups</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Inconsistent timing and forgotten reminders lead to last-minute
									panic or lost renewals
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<BarChart3 className="h-10 w-10 text-red-500 mb-2" />
								<CardTitle>No Visibility</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Leadership lacks real-time insight into renewal pipeline health
									and risk factors
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Solution Section */}
			<section className="py-16 bg-blue-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Automated Renewal Follow-ups That Actually Work
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Renewal360 combines AI intelligence with human oversight
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div>
							<div className="space-y-6">
								<div className="flex items-start gap-4">
									<CheckCircle2 className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold text-lg mb-2">
											AI-Powered Email Sequences
										</h3>
										<p className="text-gray-600">
											Contextual renewal reminders at T-60, T-30, T-7, and T-1 days
											with intelligent objection handling
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<CheckCircle2 className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold text-lg mb-2">
											Human-in-the-Loop Approval
										</h3>
										<p className="text-gray-600">
											Review and approve AI-generated emails before they send,
											ensuring brand voice and accuracy
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4">
									<CheckCircle2 className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold text-lg mb-2">
											Seamless Integration
										</h3>
										<p className="text-gray-600">
											Works with Google Sheets and major CRMs - no complex setup
											required
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-white p-8 rounded-lg shadow-lg">
							<div className="space-y-4">
								<div className="border-l-4 border-blue-600 pl-4 py-2">
									<div className="text-sm text-gray-500">T-60 Days</div>
									<div className="font-medium">Initial renewal discussion email</div>
								</div>
								<div className="border-l-4 border-blue-500 pl-4 py-2">
									<div className="text-sm text-gray-500">T-30 Days</div>
									<div className="font-medium">Value reminder and next steps</div>
								</div>
								<div className="border-l-4 border-blue-400 pl-4 py-2">
									<div className="text-sm text-gray-500">T-7 Days</div>
									<div className="font-medium">Urgency follow-up with options</div>
								</div>
								<div className="border-l-4 border-blue-300 pl-4 py-2">
									<div className="text-sm text-gray-500">T-1 Day</div>
									<div className="font-medium">Final reminder before renewal</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Real Outcomes for SaaS Teams
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<Card className="border-2 border-blue-100">
							<CardHeader>
								<div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
								<CardTitle>Hours Saved Per Month</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Per CS team member on manual renewal tracking and follow-up
									emails
								</p>
							</CardContent>
						</Card>

						<Card className="border-2 border-blue-100">
							<CardHeader>
								<div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
								<CardTitle>Consistent Follow-ups</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Every renewal gets timely reminders - no more missed
									opportunities or last-minute scrambles
								</p>
							</CardContent>
						</Card>

						<Card className="border-2 border-blue-100">
							<CardHeader>
								<div className="text-4xl font-bold text-blue-600 mb-2">
									<TrendingUp className="inline h-10 w-10" />
								</div>
								<CardTitle>Leadership Visibility</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600">
									Real-time executive summaries on renewal health and risk
									factors
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Use Cases Section */}
			<section className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Built for SaaS Teams
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<Card>
							<CardHeader>
								<Mail className="h-10 w-10 text-blue-600 mb-2" />
								<CardTitle>CS Teams</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 mb-4">
									Focus on high-value customer conversations instead of chasing
									renewal dates
								</p>
								<ul className="space-y-2 text-sm text-gray-600">
									<li className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
										<span>Automated reminder sequences</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
										<span>Smart objection responses</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
										<span>Email approval workflow</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Target className="h-10 w-10 text-blue-600 mb-2" />
								<CardTitle>SaaS Founders</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 mb-4">
									Scale renewal processes without hiring more CS staff
								</p>
								<ul className="space-y-2 text-sm text-gray-600">
									<li className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
										<span>Reduce CS operational burden</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
										<span>Improve renewal predictability</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
										<span>Quick 30-day pilot setup</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<Calendar className="h-10 w-10 text-blue-600 mb-2" />
								<CardTitle>Revenue Leaders</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-gray-600 mb-4">
									Get clear visibility into renewal pipeline health
								</p>
								<ul className="space-y-2 text-sm text-gray-600">
									<li className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
										<span>Executive renewal summaries</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
										<span>Risk factor identification</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
										<span>Renewal forecast tracking</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Social Proof Section */}
			<section className="py-16 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Trusted by SaaS Teams
						</h2>
						<p className="text-lg text-gray-600">
							Testimonials and case studies coming soon
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						<Card className="bg-blue-50">
							<CardContent className="pt-6">
								<p className="text-gray-700 italic mb-4">
									"Renewal360 saved our CS team countless hours on manual
									follow-ups. We can now focus on strategic customer
									conversations while the AI handles the routine reminders."
								</p>
								<div className="font-semibold text-gray-900">
									Sachin Kumar
								</div>
								<div className="text-sm text-gray-600">
									CS Leader, Skilify Learning
								</div>
							</CardContent>
						</Card>

						<Card className="bg-blue-50">
							<CardContent className="pt-6">
								<p className="text-gray-700 italic mb-4">
									"As a founder, I needed renewal automation that didn't require
									a dedicated operations person. Renewal360 delivered
									exactly that."
								</p>
								<div className="font-semibold text-gray-900">
									Priya Sharma
								</div>
								<div className="text-sm text-gray-600">
									Founder, HealthMantra
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-blue-600 text-white">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Ready to Automate Your Renewals?
					</h2>
					<p className="text-xl mb-8 text-blue-100">
						Start with a 7-day pilot and see the impact on your CS team's
						productivity
					</p>
					<Link to="/contact">
						<Button size="lg" variant="secondary" className="text-lg px-8">
							Request Your Pilot Today
						</Button>
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-gray-300 py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid md:grid-cols-4 gap-8 mb-8">
						<div>
							<h3 className="text-white font-semibold mb-4">Renewal360</h3>
							<p className="text-sm">
								AI-powered renewal automation for SaaS teams
							</p>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-4">Product</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<Link to="/features" className="hover:text-white">
										Features
									</Link>
								</li>
								<li>
									<Link to="/pricing" className="hover:text-white">
										Pricing
									</Link>
								</li>
								<li>
									<Link to="/how-it-works" className="hover:text-white">
										How It Works
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-4">Company</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<Link to="/about" className="hover:text-white">
										About
									</Link>
								</li>
								<li>
									<Link to="/faq" className="hover:text-white">
										FAQ
									</Link>
								</li>
								<li>
									<Link to="/contact" className="hover:text-white">
										Contact
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="text-white font-semibold mb-4">Connect</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<a href="#" className="hover:text-white">
										LinkedIn
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white">
										Twitter
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 pt-8 text-sm text-center">
						<p>&copy; 2024 Renewal360. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
