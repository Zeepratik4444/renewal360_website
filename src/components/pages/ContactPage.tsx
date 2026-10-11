import { Navigation } from "@/components/Navigation";
import { PageGlow } from "@/components/PageGlow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSEO } from "@/hooks/useSEO";
import { WhoThisIsFor } from "@/components/FunnelCTA";
import { trackEvent } from "@/lib/analytics";
import { getAdClick } from "@/lib/adClick";
import { AnswerBlock, FactBox } from "@/components/AeoGeoBlocks";

export function ContactPage() {
	useSEO({
		title: "Contact Renewal360 - Start Your SaaS Renewal Automation Pilot",
		description: "Talk to Renewal360 about renewal automation for growing SaaS teams replacing spreadsheets or evaluating Gainsight and Totango alternatives.",
	});

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
	// Starting a trial asks only for a work email and a company. Anything
	// longer belongs in "Talk to us", which reaches a person instead.
	const [formData, setFormData] = useState({
		companyName: "",
		emailAddress: "",
	});
	const [talk, setTalk] = useState({
		name: "",
		email: "",
		company: "",
		phone: "",
		message: "",
	});
	const [talkStatus, setTalkStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
	const [talkMessage, setTalkMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
	const [submitMessage, setSubmitMessage] = useState<string>("");
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [hasStartedForm, setHasStartedForm] = useState(false);

	const trackFormStarted = () => {
		if (hasStartedForm) return;
		setHasStartedForm(true);
		trackEvent("form_started", {
			form_type: "pilot_request",
			funnel_stage: "decision",
			cta_location: "contact_form",
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("idle");
		setSubmitMessage(""); // Clear previous message

		try {
			const response = await fetch(`${API_BASE_URL}/api/request-demo`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					company_name: formData.companyName,
					email_address: formData.emailAddress,
					// Recorded on the account the trial creates, so the app
					// doesn't ask again on first sign-in.
					accepted_terms: acceptTerms,
					ad_click: getAdClick(),
				}),
			});

			const data = await response.json(); // Parse response to get message

			if (!response.ok) {
				throw new Error(data.message || "Form submission failed"); // Use message from backend if available
			}

			setSubmitStatus("success");
			setSubmitMessage(data.message); // Set the dynamic message
			trackEvent("form_submitted", {
				form_type: "pilot_request",
				funnel_stage: "decision",
				cta_location: "contact_form",
			});
			setFormData({
				companyName: "",
				emailAddress: "",
			});
		} catch (error) {
			console.error("Form submission error:", error);
			setSubmitStatus("error");
			setSubmitMessage(error instanceof Error ? error.message : "An unknown error occurred."); // Set error message
		} finally {
			setIsSubmitting(false);
		}
	};

	// "Start with Google": no form at all. Only reachable with the terms
	// ticked; the app records that acceptance on the account it creates.
	const googleSignupUrl = () => {
		const params = new URLSearchParams({ terms: "1" });
		const ad = getAdClick();
		if (ad) params.set("li_fat_id", ad.li_fat_id);
		return `${API_BASE_URL}/api/auth/sso/google/signup?${params.toString()}`;
	};

	const handleTalk = async (e: React.FormEvent) => {
		e.preventDefault();
		setTalkStatus("sending");
		try {
			const response = await fetch(`${API_BASE_URL}/api/talk-to-us`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					company_name: talk.company,
					contact_person_name: talk.name,
					email_address: talk.email,
					phone_number: talk.phone || null,
					message: talk.message || null,
				}),
			});
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || data.detail || "Couldn't send that.");
			setTalkStatus("sent");
			setTalkMessage(data.message);
			trackEvent("form_submitted", {
				form_type: "talk_to_us",
				funnel_stage: "decision",
				cta_location: "contact_page",
			});
		} catch (error) {
			setTalkStatus("error");
			setTalkMessage(error instanceof Error ? error.message : "Couldn't send that.");
		}
	};

	return (
		<div className="relative isolate min-h-screen bg-background">
			<Navigation />
			<PageGlow />

			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="mb-10 max-w-3xl">
					<p className="eyebrow mb-4">Contact</p>
					<h1 className="text-5xl tracking-tight text-foreground sm:text-6xl mb-4">
						Start your Renewal360 pilot
					</h1>
					<p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
						Test renewal automation with 25 accounts, no credit card, and guided setup
						from a team that understands SaaS renewal workflows.
					</p>
				</div>
				<div className="mb-12 max-w-5xl mx-auto">
					<WhoThisIsFor
						items={[
							"SaaS teams managing 25+ upcoming renewals",
							"CS teams replacing spreadsheets or manual CRM follow-up",
							"Leaders who need renewal visibility before quarter end",
						]}
					/>
				</div>
				<div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
					<AnswerBlock
						question="What is included in a Renewal360 pilot?"
						answer="A Renewal360 pilot lets a SaaS team test renewal automation with 25 accounts, no credit card, guided CRM or spreadsheet import, and a first renewal workflow configured around its actual renewal process."
						facts={[
							"25 pilot accounts",
							"No credit card required",
							"Guided setup for the first workflow",
						]}
					/>
					<FactBox
						title="Pilot fit signals"
						facts={[
							"You manage recurring SaaS renewals.",
							"Renewal follow-up is tracked in spreadsheets, CRM notes, or memory.",
							"Leadership needs visibility into ARR at risk.",
							"You want a focused pilot before a broad platform rollout.",
						]}
					/>
				</div>

				<div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
					<div>
						<Card>
							<CardHeader>
								<CardTitle className="text-2xl">
									Start your free pilot
								</CardTitle>
							</CardHeader>
							<CardContent>
								<form
									onSubmit={handleSubmit}
									onFocusCapture={trackFormStarted}
									className="space-y-6"
								>
									<div className="space-y-2">
										<Label htmlFor="emailAddress">
											Work email <span className="text-red-500">*</span>
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
										<Label htmlFor="companyName">
											Company <span className="text-red-500">*</span>
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

									<div className="flex items-start gap-3">
										<input
											type="checkbox"
											id="acceptTerms"
											checked={acceptTerms}
											onChange={(e) => setAcceptTerms(e.target.checked)}
											className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
										/>
										<label htmlFor="acceptTerms" className="text-sm text-gray-600 cursor-pointer">
											I agree to the{" "}
											<Link to="/terms" target="_blank" className="text-blue-600 hover:underline font-medium">Terms of Service & Privacy Policy</Link>
											<span className="text-red-500 ml-0.5">*</span>
										</label>
									</div>

									<Button
										type="submit"
										size="lg"
										className="w-full"
										disabled={isSubmitting || !acceptTerms}
									>
										{isSubmitting ? "Submitting..." : "Start Free Pilot"}
									</Button>

									<div className="flex items-center gap-3 text-xs text-gray-400">
										<span className="h-px flex-1 bg-gray-200" />or<span className="h-px flex-1 bg-gray-200" />
									</div>

									<a
										href={acceptTerms ? googleSignupUrl() : undefined}
										aria-disabled={!acceptTerms}
										onClick={(e) => {
											if (!acceptTerms) {
												e.preventDefault();
												return;
											}
											trackEvent("cta_clicked", {
												cta_text: "Start with Google",
												cta_location: "contact_form",
												funnel_stage: "decision",
											});
										}}
										className={`flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium ${
											acceptTerms
												? "border-gray-300 text-gray-800 hover:bg-gray-50"
												: "cursor-not-allowed border-gray-200 text-gray-400"
										}`}
									>
										<svg aria-hidden="true" viewBox="0 0 18 18" className="h-4 w-4">
											<path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
											<path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
											<path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z" />
											<path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
										</svg>
										Start with Google
									</a>
									{!acceptTerms && (
										<p className="text-center text-xs text-gray-500">Tick the terms above to continue with Google.</p>
									)}
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
												We review your renewal setup
											</div>
											<div className="text-sm text-gray-600">
												We look at your account count, CRM, renewal volume, and
												current follow-up process.
											</div>
										</div>
									</div>

									<div className="flex gap-4">
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
											2
										</div>
										<div>
											<div className="font-semibold text-gray-900">
												You start a 25-account pilot
											</div>
											<div className="text-sm text-gray-600">
												No credit card required. Use real renewal data with guided
												setup from our team.
											</div>
										</div>
									</div>

									<div className="flex gap-4">
										<div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
											3
										</div>
										<div>
											<div className="font-semibold text-gray-900">
												Your first workflow goes live
											</div>
											<div className="text-sm text-gray-600">
												Connect your CRM or import a spreadsheet, then launch your
												first renewal playbook.
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Talk to us</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-sm text-gray-600">
									Rather speak to a person first? Tell us a little and we'll reply within one business day.
								</p>
								{talkStatus === "sent" ? (
									<div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
										{talkMessage}
									</div>
								) : (
									<form onSubmit={handleTalk} className="space-y-3">
										<Input required placeholder="Your name" value={talk.name}
											onChange={(e) => setTalk({ ...talk, name: e.target.value })} />
										<Input required type="email" placeholder="Work email" value={talk.email}
											onChange={(e) => setTalk({ ...talk, email: e.target.value })} />
										<Input required placeholder="Company" value={talk.company}
											onChange={(e) => setTalk({ ...talk, company: e.target.value })} />
										<Input type="tel" placeholder="Phone (optional)" value={talk.phone}
											onChange={(e) => setTalk({ ...talk, phone: e.target.value })} />
										<Textarea rows={3} placeholder="What would you like to talk about? (optional)" value={talk.message}
											onChange={(e) => setTalk({ ...talk, message: e.target.value })} />
										{talkStatus === "error" && (
											<div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">{talkMessage}</div>
										)}
										<Button type="submit" variant="outline" className="w-full" disabled={talkStatus === "sending"}>
											{talkStatus === "sending" ? "Sending..." : "Talk to us"}
										</Button>
									</form>
								)}
								<div className="flex items-start gap-3 pt-2">
									<Mail className="h-5 w-5 text-blue-600 mt-0.5" />
									<div className="text-sm text-gray-600">hello@renewal360.in</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-gray-50">
							<CardContent className="pt-6">
								<h3 className="font-semibold text-gray-900 mb-3">
									Pilot includes
								</h3>
								<ul className="space-y-3 text-sm text-gray-600">
									{[
										"25 accounts included",
										"No credit card required",
										"Guided CRM or spreadsheet import",
										"First renewal sequence configured",
										"Fit check around CRM, account count, and renewal volume",
									].map((item) => (
										<li key={item} className="flex items-start gap-2">
											<CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
											<span>{item}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
