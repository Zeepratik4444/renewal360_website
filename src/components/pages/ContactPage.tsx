import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mail } from "lucide-react";

export function ContactPage() {
	const [formData, setFormData] = useState({
		companyName: "",
		contactPersonName: "",
		emailAddress: "",
		phoneNumber: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
	const [submitMessage, setSubmitMessage] = useState<string>(""); // New state for dynamic message

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("idle");
		setSubmitMessage(""); // Clear previous message

		try {
			const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
			const response = await fetch(`${API_BASE_URL}/api/request-demo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					company_name: formData.companyName,
					contact_person_name: formData.contactPersonName,
					email_address: formData.emailAddress,
					phone_number: formData.phoneNumber || null,
					message: formData.message || null,
				}),
			});

			const data = await response.json(); // Parse response to get message

			if (!response.ok) {
				throw new Error(data.message || "Form submission failed"); // Use message from backend if available
			}

			setSubmitStatus("success");
			setSubmitMessage(data.message); // Set the dynamic message
			setFormData({
				companyName: "",
				contactPersonName: "",
				emailAddress: "",
				phoneNumber: "",
				message: "",
			});
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmitStatus("error");
			setSubmitMessage(error instanceof Error ? error.message : "An unknown error occurred."); // Set error message
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Request a Trial
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Let's discuss how Renewal360 can help automate your renewal
						process. Start with a 7-day pilot.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
					<div>
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">
									Schedule Your Trial
								</CardTitle>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="space-y-2">
										<Label htmlFor="companyName">
											Company Name <span className="text-red-500">*</span>
										</Label>
										<Input
											id="companyName"
											type="text"
											required
											value={formData.companyName}
											onChange={(e) =>
												setFormData({ ...formData, companyName: e.target.value })
											}
											placeholder="Your company name"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="contactPersonName">
											Your Name <span className="text-red-500">*</span>
										</Label>
										<Input
											id="contactPersonName"
											type="text"
											required
											value={formData.contactPersonName}
											onChange={(e) =>
												setFormData({
													...formData,
													contactPersonName: e.target.value,
												})
											}
											placeholder="Your full name"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="emailAddress">
											Email Address <span className="text-red-500">*</span>
										</Label>
										<Input
											id="emailAddress"
											type="email"
											required
											value={formData.emailAddress}
											onChange={(e) =>
												setFormData({ ...formData, emailAddress: e.target.value })
											}
											placeholder="you@company.com"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="phoneNumber">
											Phone Number (Optional)
										</Label>
										<Input
											id="phoneNumber"
											type="tel"
											value={formData.phoneNumber}
											onChange={(e) =>
												setFormData({ ...formData, phoneNumber: e.target.value })
											}
											placeholder="Your phone number"
										/>
									</div>


									<div className="space-y-2">
										<Label htmlFor="message">
											Tell Us About Your Renewal Process (Optional)
										</Label>
										<Textarea
											id="message"
											value={formData.message}
											onChange={(e) =>
												setFormData({ ...formData, message: e.target.value })
											}
											placeholder="How many renewals do you manage? What challenges are you facing?"
											rows={4}
										/>
									</div>

									{submitStatus === "success" && (
										<div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
											{submitMessage}
										</div>
									)}

									{submitStatus === "error" && (
										<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
											{submitMessage}
										</div>
									)}

									<Button
										type="submit"
										size="lg"
										className="w-full"
										disabled={isSubmitting}
									>
										{isSubmitting ? "Submitting..." : "Request Trial"}
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>

					<div className="space-y-8">
						<Card className="bg-blue-50">
							<CardContent className="pt-6">
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									What Happens Next?
								</h3>
								<div className="space-y-4">
									<div className="flex gap-4">
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
											1
										</div>
										<div>
											<div className="font-semibold text-gray-900">
												We'll Review Your Needs
											</div>
											<div className="text-sm text-gray-600">
												We'll analyze your renewal volume and process to ensure
												Renewal360 is a good fit
											</div>
										</div>
									</div>

									<div className="flex gap-4">
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
											2
										</div>
										<div>
											<div className="font-semibold text-gray-900">
												Start Your Free Trial
											</div>
											<div className="text-sm text-gray-600">
												7-day full access to test with your actual renewal data
											</div>
										</div>
									</div>

									<div className="flex gap-4">
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
											3
										</div>
										<div>
											<div className="font-semibold text-gray-900">
												Start Your Trial
											</div>
											<div className="text-sm text-gray-600">
												Get instant access to your trial account and import your renewals
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Get in Touch</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start gap-3">
									<Mail className="h-5 w-5 text-blue-600 mt-0.5" />
									<div>
										<div className="font-semibold text-gray-900">Email</div>
										<div className="text-sm text-gray-600">
											hello@renewal360.in
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-gray-50">
							<CardContent className="pt-6">
								<h3 className="font-semibold text-gray-900 mb-3">
									Perfect For:
								</h3>
								<ul className="space-y-2 text-sm text-gray-600">
									<li>✓ SaaS companies with 25+ annual renewals</li>
									<li>✓ CS teams of 1-5 people</li>
									<li>✓ Founders wearing the CS hat</li>
									<li>✓ Teams spending 10+ hours/month on renewal follow-ups</li>
									<li>✓ Companies looking to scale without hiring</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}