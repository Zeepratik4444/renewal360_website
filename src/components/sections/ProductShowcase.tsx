import dashboardSummary from "@/assets/dashboard-summary.png";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The capture is 1825 x 800 and has two rough edges: the browser's scrollbar down the right side and a
 * row of cards cut in half along the bottom. This box (in source pixels) is the clean part: from the
 * page title down to the end of the ARR waterfall card, with the same 21px margin on every side. The
 * image is cropped to it in CSS, so the file itself is untouched.
 */
const SOURCE = { w: 1825, h: 800 };
const CROP = { x: 14, y: 2, w: 1792, h: 624 };

/** The product, shown once and plainly: a short heading, then the dashboard on a soft mat. */
export function ProductShowcase() {
	return (
		<section className="pb-24 pt-4 sm:pb-32 sm:pt-8" id="product">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<Reveal className="mx-auto max-w-2xl text-center">
					<p className="eyebrow">Inside the product</p>
					<h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
						Executive visibility, <span className="brand-gradient-text">finally</span>.
					</h2>
				</Reveal>

				<Reveal delay={120} className="mt-12 rounded-3xl border border-border bg-gradient-to-b from-brand-soft/70 via-card to-card p-3 sm:mt-14 sm:p-8 lg:p-12">
					{/* On narrow screens the dashboard keeps a readable size and runs off the right edge of its frame. */}
					<div className="overflow-hidden rounded-xl border border-border bg-[#f8fafc] shadow-[0_32px_64px_-36px_rgb(47_71_214/0.38),0_12px_28px_-18px_rgb(11_13_20/0.2)] sm:rounded-2xl">
						<div className="relative min-w-[640px]" style={{ aspectRatio: `${CROP.w} / ${CROP.h}` }}>
							<img
								src={dashboardSummary}
								alt="Renewal360 Executive Summary dashboard: total ARR, at-risk revenue, renewal rate, average deal size, silent accounts and the ARR waterfall for the quarter"
								width={SOURCE.w}
								height={SOURCE.h}
								decoding="async"
								className="absolute h-auto max-w-none"
								style={{
									width: `${(SOURCE.w / CROP.w) * 100}%`,
									left: `${(-CROP.x / CROP.w) * 100}%`,
									top: `${(-CROP.y / CROP.h) * 100}%`,
								}}
							/>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
