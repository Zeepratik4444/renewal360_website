import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { createRevenueChart } from "./chartEngine";

/**
 * The animated climbing graph in the hero. Decorative, so it is hidden from assistive tech and never
 * takes clicks. It listens for the pointer across the whole hero section it sits in.
 */
export function RevenueChart({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const zone = canvas.closest("section") ?? canvas.parentElement;
		if (!zone) return;
		const chart = createRevenueChart(canvas, zone as HTMLElement);
		return () => chart.destroy();
	}, []);

	return (
		<div aria-hidden className={cn("chart-mask pointer-events-none", className)}>
			<canvas ref={canvasRef} className="block h-full w-full" />
		</div>
	);
}
