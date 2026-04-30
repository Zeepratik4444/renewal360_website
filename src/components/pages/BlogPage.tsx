import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarDays, Clock } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts } from "@/lib/blogPosts";

export function BlogPage() {
	useSEO({
		title: "Blog - Renewal360",
		description:
			"Practical guides on SaaS renewal automation, churn prevention, customer success workflows, and AI-powered retention.",
	});

	return (
		<div className="min-h-screen bg-white">
			<Navigation />

			<section className="bg-gradient-to-b from-blue-50 to-white py-16">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 border border-blue-200">
						<BookOpen className="h-4 w-4" />
						Renewal360 Blog
					</div>
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
						Field notes for better SaaS renewals.
					</h1>
					<p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
						Practical playbooks for CS, RevOps, and founders who want fewer
						surprise churn conversations and a cleaner renewal operating rhythm.
					</p>
				</div>
			</section>

			<section className="py-14">
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid gap-6">
						{blogPosts.map((post) => (
							<Link
								key={post.slug}
								to="/blog/$slug"
								params={{ slug: post.slug }}
								className="group block"
							>
								<Card className="overflow-hidden border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
									<CardContent className="p-6 md:p-8">
										<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
											<div className="max-w-3xl">
												<div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
													<span className="inline-flex items-center gap-1.5">
														<CalendarDays className="h-4 w-4" />
														{post.publishedAt}
													</span>
													<span className="inline-flex items-center gap-1.5">
														<Clock className="h-4 w-4" />
														{post.readTime}
													</span>
												</div>
												<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
													{post.title}
												</h2>
												<p className="text-gray-600 leading-relaxed mb-5">
													{post.summary}
												</p>
												<div className="flex flex-wrap gap-2">
													{post.tags.map((tag) => (
														<span
															key={tag}
															className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
														>
															{tag}
														</span>
													))}
												</div>
											</div>
											<div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 md:pt-2">
												Read article
												<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
											</div>
										</div>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>

					<div className="mt-12 rounded-xl bg-gray-900 px-6 py-8 text-center text-white">
						<h2 className="text-2xl font-bold mb-3">
							Want to fix your renewal process faster?
						</h2>
						<p className="text-gray-300 mb-6 max-w-2xl mx-auto">
							Renewal360 can help your team move from spreadsheet follow-ups to
							AI-assisted renewal outreach in about a week.
						</p>
						<Link to="/contact">
							<Button className="bg-blue-500 hover:bg-blue-600">
								Start a free pilot
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
