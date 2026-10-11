/**
 * A faint blue-violet wash and dot grid behind a page header. Decorative only. The parent needs
 * `relative isolate` so the glow sits behind the content but above the page background.
 */
export function PageGlow() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden">
			<div className="hero-glow absolute inset-0" />
			<div className="dot-grid absolute inset-0" />
		</div>
	);
}
