import { Navigation } from "@/components/Navigation";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQPage() {
	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Frequently Asked Questions
					</h1>
					<p className="text-xl text-gray-600">
						Everything you need to know about Renewal360
					</p>
				</div>

				<Accordion type="single" collapsible className="space-y-4">
					<AccordionItem value="item-1" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							Is Renewal360 software or a service?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							Renewal360 is a managed service, not just software. We handle
							the AI infrastructure, email delivery, and operational details. You
							provide your renewal data, approve emails, and track results. Think
							of it as having a dedicated renewal automation specialist on your
							team.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-2" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							Do I have to approve every email before it's sent?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							Yes, human approval is built into our workflow. Every AI-generated
							email goes through your team for review before being sent to
							customers. You can edit the email, approve it as-is, or reject it.
							This ensures quality, maintains your brand voice, and gives you full
							control over customer communications.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-3" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							Which CRMs and tools do you integrate with?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							<p className="mb-3">
								We support the following data sources:
							</p>
							<ul className="list-disc list-inside space-y-2 mb-3">
								<li>Google Sheets (included in all plans)</li>
								<li>HubSpot (Growth and Scale plans)</li>
								<li>Salesforce (Scale plan)</li>
								<li>Pipedrive (Scale plan)</li>
							</ul>
							<p>
								The integration is simple: we connect to your data source, sync
								renewal information, and send approved emails through your
								existing email provider.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-4" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							How do you ensure data security?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							<p className="mb-3">
								We take data security seriously:
							</p>
							<ul className="list-disc list-inside space-y-2">
								<li>
									All data is encrypted in transit (TLS 1.3) and at rest (AES-256)
								</li>
								<li>Infrastructure hosted on SOC 2 compliant cloud providers</li>
								<li>
									We only access renewal-related data (customer names, emails,
									renewal dates, contract details)
								</li>
								<li>No data sharing with third parties</li>
								<li>Compliance with Indian data protection regulations</li>
								<li>Regular security audits and penetration testing</li>
							</ul>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-5" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							How long does setup take?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							Most teams are up and running within one week. The setup process
							involves:
							<ul className="list-decimal list-inside space-y-2 mt-3">
								<li>Connecting your data source (1-2 days)</li>
								<li>Configuring email templates and approval workflow (1-2 days)</li>
								<li>Training your team on the approval interface (1 day)</li>
								<li>Testing with a small batch of renewals (1-2 days)</li>
							</ul>
							<p className="mt-3">
								We provide onboarding support and a dedicated setup consultation
								with Growth and Scale plans.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-6" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							What if the AI generates a bad email?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							That's exactly why we require human approval. If an AI-generated
							email doesn't meet your standards, you can:
							<ul className="list-disc list-inside space-y-2 mt-3">
								<li>Edit it to fix any issues</li>
								<li>Reject it and provide feedback to improve future emails</li>
								<li>Write your own email from scratch</li>
							</ul>
							<p className="mt-3">
								Our AI learns from your edits and approvals over time, improving
								the quality of future email suggestions.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-7" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							Can I cancel anytime?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							Yes, all plans are month-to-month with no long-term contracts. You
							can cancel anytime with 30 days notice. We'll export your data and
							email history so you don't lose any information.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-8" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							How do you handle customer responses?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							Customer replies to renewal emails come directly to your team's
							inbox (we send from your email address). Our AI analyzes the
							response sentiment and suggests appropriate follow-ups, but your
							team handles the actual conversation. We're here to automate the
							outreach, not replace your customer relationships.
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-9" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							What's included in the 30-day pilot?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							The Pilot plan includes:
							<ul className="list-disc list-inside space-y-2 mt-3">
								<li>Full access to all core features</li>
								<li>Support for up to 25 active renewals</li>
								<li>AI-generated renewal reminder sequences</li>
								<li>Email approval workflow</li>
								<li>Google Sheets integration</li>
								<li>Weekly executive summaries</li>
								<li>Email support</li>
							</ul>
							<p className="mt-3">
								It's a full-featured plan designed to help you evaluate the
								service before committing to a larger plan.
							</p>
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value="item-10" className="border rounded-lg px-6">
						<AccordionTrigger className="text-left text-lg font-semibold">
							Will this work for my industry/product?
						</AccordionTrigger>
						<AccordionContent className="text-gray-600 text-base">
							Renewal360 works for any B2B SaaS product with subscription
							renewals. We've seen success across:
							<ul className="list-disc list-inside space-y-2 mt-3">
								<li>HR and recruiting software</li>
								<li>Marketing and sales tools</li>
								<li>Project management platforms</li>
								<li>Analytics and data tools</li>
								<li>Communication and collaboration software</li>
							</ul>
							<p className="mt-3">
								The AI adapts to your specific product and customer base. If you're
								unsure, start with a pilot to test it with a subset of your
								renewals.
							</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				<div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Still Have Questions?
					</h2>
					<p className="text-gray-600 mb-6">
						We're happy to answer any questions about how Renewal360 works
						and whether it's right for your team.
					</p>
				</div>
			</div>
		</div>
	);
}
