import { useEffect } from "react";

const BASE_URL = "https://renewal360.in";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

interface SEOProps {
	title: string;
	description: string;
	/** Absolute path for this page, e.g. "/pricing" — defaults to current pathname */
	canonicalPath?: string;
	/** Override og:image for a specific page (optional) */
	ogImage?: string;
}

export function useSEO({ title, description, canonicalPath, ogImage }: SEOProps) {
	useEffect(() => {
		const path = canonicalPath ?? window.location.pathname;
		const canonicalUrl = `${BASE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
		const imageUrl = ogImage ?? DEFAULT_OG_IMAGE;

		// ─── <title> ───────────────────────────────────────────────
		document.title = title;

		// ─── Helper: upsert <meta> tags ────────────────────────────
		const setMeta = (attr: string, key: string, content: string) => {
			let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
			if (!el) {
				el = document.createElement("meta");
				el.setAttribute(attr, key);
				document.head.appendChild(el);
			}
			el.setAttribute("content", content);
		};

		// ─── Helper: upsert <link> tags ────────────────────────────
		const setLink = (rel: string, href: string) => {
			let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
			if (!el) {
				el = document.createElement("link");
				el.setAttribute("rel", rel);
				document.head.appendChild(el);
			}
			el.setAttribute("href", href);
		};

		// ─── Standard SEO ──────────────────────────────────────────
		setMeta("name", "description", description);
		setLink("canonical", canonicalUrl);

		// ─── Open Graph ────────────────────────────────────────────
		setMeta("property", "og:title", title);
		setMeta("property", "og:description", description);
		setMeta("property", "og:url", canonicalUrl);
		setMeta("property", "og:image", imageUrl);
		setMeta("property", "og:image:width", "1200");
		setMeta("property", "og:image:height", "630");
		setMeta("property", "og:image:alt", title);
		setMeta("property", "og:type", "website");
		setMeta("property", "og:site_name", "Renewal360");

		// ─── Twitter Card ──────────────────────────────────────────
		setMeta("name", "twitter:title", title);
		setMeta("name", "twitter:description", description);
		setMeta("name", "twitter:image", imageUrl);
		setMeta("name", "twitter:image:alt", title);
		setMeta("name", "twitter:card", "summary_large_image");

		// ─── Cleanup: restore homepage defaults on unmount ─────────
		return () => {
			const defaultTitle = "Renewal360 - AI-Powered SaaS Renewal Automation";
			const defaultDesc =
				"AI-powered renewal automation for SaaS teams. Save 10+ hours per month with automated renewal reminders, smart follow-ups, and executive visibility. Start your 30-day pilot today.";
			const defaultUrl = `${BASE_URL}/`;

			document.title = defaultTitle;
			setMeta("name", "description", defaultDesc);
			setLink("canonical", defaultUrl);
			setMeta("property", "og:title", defaultTitle);
			setMeta("property", "og:description", defaultDesc);
			setMeta("property", "og:url", defaultUrl);
			setMeta("property", "og:image", DEFAULT_OG_IMAGE);
			setMeta("property", "og:image:alt", defaultTitle);
			setMeta("name", "twitter:title", defaultTitle);
			setMeta("name", "twitter:description", defaultDesc);
			setMeta("name", "twitter:image", DEFAULT_OG_IMAGE);
			setMeta("name", "twitter:image:alt", defaultTitle);
		};
	}, [title, description, canonicalPath, ogImage]);
}