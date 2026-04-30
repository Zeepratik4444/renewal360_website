import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { blogPosts } from "@/lib/blogPosts";

type BlogPostPageProps = {
	slug: string;
};

function extractArticleHtml(html: string) {
	const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "";
	const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";

	return `${header}${main}`;
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
	const post = blogPosts.find((item) => item.slug === slug);

	useSEO({
		title: post
			? `${post.title} | Renewal360 Blog`
			: "Blog article not found - Renewal360",
		description: post
			? post.summary
			: "The requested Renewal360 blog article could not be found.",
	});

	if (!post) {
		return (
			<div className="min-h-screen bg-white">
				<Navigation />
				<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">
						Article not found
					</h1>
					<p className="text-gray-600 mb-8">
						The article may have moved, or the URL may be incorrect.
					</p>
					<Link to="/blog">
						<Button>Back to blog</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<Navigation />
			<div className="max-w-3xl mx-auto px-6 pt-8">
				<Link
					to="/blog"
					className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to blog
				</Link>
			</div>
			<div
				className="blog-article-shell"
				dangerouslySetInnerHTML={{
					__html: extractArticleHtml(post.contentHtml),
				}}
			/>
		</div>
	);
}
