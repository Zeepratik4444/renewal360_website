import { useEffect } from "react";

interface SEOProps {
	title: string;
	description: string;
}

export function useSEO({ title, description }: SEOProps) {
	useEffect(() => {
		// Update title
		document.title = title;

		// Helper to update or create meta tags
		const updateMetaTag = (nameAttr: string, nameValue: string, content: string) => {
			let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
			if (!element) {
				element = document.createElement("meta");
				element.setAttribute(nameAttr, nameValue);
				document.head.appendChild(element);
			}
			element.setAttribute("content", content);
		};

		// Update standard meta description
		updateMetaTag("name", "description", description);

		// Update Open Graph tags
		updateMetaTag("property", "og:title", title);
		updateMetaTag("property", "og:description", description);

		// Update Twitter tags
		updateMetaTag("name", "twitter:title", title);
		updateMetaTag("name", "twitter:description", description);
	}, [title, description]);
}
