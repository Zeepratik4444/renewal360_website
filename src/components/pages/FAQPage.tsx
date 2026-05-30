import { Navigation } from "@/components/Navigation";
import { FAQItem } from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useSEO } from "@/hooks/useSEO";

export function FAQPage() {
	useSEO({
		title: "FAQ — Renewal360 Setup, Integrations & Pricing Questions",
		description: "Answers to Renewal360 setup, CRM integration, pricing, security, and renewal automation questions for SaaS teams comparing Gainsight, Totango, or spreadsheets.",
	});

	const faqs = [
		{ q: "Is Renewal360 a software or a managed service?", a: "It's a powerful AI platform that combines the depth of enterprise software with the ease of a managed service. We handle the AI infrastructure, email delivery, and operational details. You provide your renewal data, approve actions, and track results." },
		{ q: "Do I have to approve every email the AI writes?", a: "Yes - and that's intentional. Every email goes through your team before reaching a customer. You can edit, approve, or reject any email. Once you're comfortable, you can configure auto-send for lower-risk segments." },
		{ q: "How long does setup take?", a: "About 7 days: Connect data (1–2 days) → Configure templates (1–2 days) → Team training (1 day) → Test batch (1–2 days). Our onboarding team handles the heavy lifting." },
		{ q: "What happens to my data if I cancel?", a: "We export all your data and email history in a standard format. No lock-in - your data is always yours. You receive a full export within 5 business days." },
		{ q: "Does it work for my industry?", a: "Yes. Renewal360 works for HR software, marketing tools, project management platforms, analytics products, and communication tools. The AI adapts to your specific product and customer base." },
		{ q: "How is this different from just using our CRM?", a: "Your CRM organises data - it doesn't act on it. Renewal360 reads your CRM data and automatically generates outreach, surfaces at-risk accounts, and tracks whether your renewal emails are working." },
		{ q: "Is our data secure?", a: "Yes. We're built on SOC 2-ready infrastructure with TLS 1.3 + AES-256 encryption. We only parse fields necessary for renewal conversations and never use your data to train base AI models." },
	];

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
			<Navigation />

			<div className="flex-grow py-20">
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Frequently Asked Questions
						</h1>
						<p className="text-xl text-gray-600">
							Every question we hear from CSMs and RevOps leaders evaluating Renewal360.
						</p>
					</div>

					<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 sm:p-6 mb-12">
						<div className="space-y-2">
							{faqs.map((faq, i) => (
								<FAQItem key={i} question={faq.q} answer={faq.a} />
							))}
						</div>
					</div>

					<div className="text-center bg-blue-50 rounded-2xl p-8 border border-blue-100">
						<h3 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h3>
						<p className="text-gray-600 mb-6">Our team is ready to provide the answers you need.</p>
						<Link to="/contact">
							<Button size="lg" className="bg-blue-600 hover:bg-blue-700">
								Contact Support
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
