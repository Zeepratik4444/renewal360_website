import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades and rises into view once. Only opacity and transform change (see `.reveal` in styles.css), so it
 * stays smooth on slow phones. Without IntersectionObserver the content simply shows.
 */
export function Reveal({
	children,
	delay = 0,
	className,
	as: Tag = "div",
}: {
	children: ReactNode;
	/** Milliseconds to wait once in view, to stagger siblings. */
	delay?: number;
	className?: string;
	as?: ElementType;
}) {
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		if (typeof IntersectionObserver === "undefined") {
			node.setAttribute("data-in", "");
			return;
		}
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.setAttribute("data-in", "");
						observer.unobserve(entry.target);
					}
				}
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<Tag
			ref={ref}
			className={cn("reveal", className)}
			style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
		>
			{children}
		</Tag>
	);
}
