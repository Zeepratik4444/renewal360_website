/**
 * The hero graphic: a fan of fine lines climbing up and to the right, topped by one bold "revenue" line
 * with data points and a pulsing lead dot. Purely decorative: no labels, no numbers, no text, no claim.
 *
 * It reacts to the pointer (the lines lift toward it and a dot rides the main line) and to nothing
 * else. Scrolling does not drive it. When nobody is hovering, a phantom pointer glides along the line
 * so the picture never sits still. It stops drawing while off screen or in a hidden tab, and shows one
 * still frame for anyone who asks for reduced motion.
 *
 * Plain 2D canvas on purpose: smooth anti-aliased curves are what it is good at, and there is no GPU
 * context to lose.
 */

export interface RevenueChartHandle {
	destroy(): void;
}

const TAU = Math.PI * 2;
/** Points per line. 90 segments, so the ten data points of the main line land exactly on samples. */
const SAMPLES = 91;
const KNOTS = 10;
const INTRO_SECONDS = 1.6;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;
const easeOutBack = (t: number) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;
/** Exponential growth normalised to 0..1: nearly flat at first, steep at the end. */
const growth = (u: number, a: number) => (Math.exp(a * u) - 1) / (Math.exp(a) - 1);

/** Small deterministic generator, so the graph has the same shape on every visit. */
function mulberry32(seed: number) {
	let s = seed >>> 0;
	return () => {
		s = (s + 0x6d2b79f5) >>> 0;
		let t = s;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// The mark's own colours: blue at the start of the line, violet where it peaks.
const BLUE = "#1f7cf4";
const MID = "#3a58f0";
const VIOLET = "#7a2fd8";
const TONES = ["rgb(31,124,244)", "rgb(58,88,240)", "rgb(122,47,216)"];

interface Line {
	/** 0 for the lowest fan line, 1 for the highest. The main line sits above them all. */
	g: number;
	main: boolean;
	/** One fan line in the middle is drawn a little stronger, as a second series. */
	strong: boolean;
	start: number;
	end: number;
	steep: number;
	phase: number;
	speed: number;
	alpha: number;
	width: number;
	delay: number;
	/** Whether a small bead travels along this line. */
	bead: boolean;
}

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	life: number;
	max: number;
	size: number;
	tone: number;
	sway: number;
}

export function createRevenueChart(canvas: HTMLCanvasElement, root: HTMLElement): RevenueChartHandle {
	const maybe = canvas.getContext("2d");
	if (!maybe) return { destroy() {} };
	const ctx: CanvasRenderingContext2D = maybe;

	const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const random = mulberry32(360);

	// ---- geometry, rebuilt on resize
	let w = 0;
	let h = 0;
	let x0 = 0;
	let x1 = 0;
	let yBase = 0;
	let plotH = 0;
	let strip = false;
	let lift = 40;
	let sigma = 80;
	let lines: Line[] = [];
	let xs = new Float32Array(SAMPLES);
	let ys = new Float32Array(SAMPLES);
	let progress = new Float32Array(1);
	let particles: Particle[] = [];
	let stroke: CanvasGradient | null = null;
	let area: CanvasGradient | null = null;

	// The main line's "data": fixed offsets at each knot, so it reads as measured points, not a formula.
	const knots = Array.from({ length: KNOTS + 1 }, (_, i) => (i === 0 ? 0 : random() * 2 - 1));

	function knotNoise(u: number) {
		const pos = u * KNOTS;
		const i = Math.min(KNOTS - 1, Math.floor(pos));
		const t = pos - i;
		const p0 = knots[Math.max(0, i - 1)];
		const p1 = knots[i];
		const p2 = knots[i + 1];
		const p3 = knots[Math.min(KNOTS, i + 2)];
		// Catmull-Rom through the knots.
		return 0.5 * (2 * p1 + (p2 - p0) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (3 * p1 - p0 - 3 * p2 + p3) * t * t * t);
	}

	/** Height of a line at `u` (0..1 across the plot) as a fraction of the plot height, before any pointer lift. */
	function heightOf(line: Line, u: number, clock: number) {
		let v = line.start + (line.end - line.start) * growth(u, line.steep);
		const wave = Math.sin(TAU * (u * 1.15 + line.phase) - clock * line.speed) * (0.3 + 0.7 * u);
		if (line.main) v += knotNoise(u) * 0.034 * u ** 0.8 + wave * 0.006;
		else v += wave * 0.009;
		return v;
	}

	function buildLines(count: number) {
		const built: Line[] = [];
		const fans = count - 1;
		const strongAt = Math.round(fans * 0.5);
		for (let j = 0; j < fans; j++) {
			const g = fans === 1 ? 0 : j / (fans - 1);
			const strong = j === strongAt;
			built.push({
				g,
				main: false,
				strong,
				start: 0.035 + 0.03 * g,
				end: lerp(0.18, 0.8, g ** 0.95),
				steep: lerp(1.2, 2.5, g),
				phase: random(),
				speed: 0.35 + random() * 0.4,
				alpha: strong ? 0.62 : lerp(0.13, 0.4, g ** 1.4),
				width: strong ? 1.5 : 1,
				delay: 0.05 + 0.35 * g,
				bead: j % 3 === 1,
			});
		}
		built.push({
			g: 1,
			main: true,
			strong: false,
			start: 0.085,
			end: 0.95,
			steep: 2.75,
			phase: random(),
			speed: 0.5,
			alpha: 1,
			width: 2.6,
			delay: 0.5,
			bead: false,
		});
		return built;
	}

	function resize() {
		const box = canvas.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		w = Math.max(1, Math.round(box.width));
		h = Math.max(1, Math.round(box.height));
		canvas.width = Math.round(w * dpr);
		canvas.height = Math.round(h * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		// A short, wide strip on phones and tablets; a tall panel beside the headline on wide screens.
		strip = h < 340;
		const narrow = w < 560;
		x0 = w * (strip ? 0.02 : 0.08);
		x1 = w * (strip ? 0.93 : 0.915);
		const yTop = h * (strip ? 0.14 : 0.12);
		yBase = h * (strip ? 0.9 : 0.87);
		plotH = yBase - yTop;
		lift = strip ? 18 : 40;
		sigma = (x1 - x0) * 0.13;

		const count = narrow ? 9 : 14;
		if (lines.length !== count) {
			lines = buildLines(count);
			ys = new Float32Array(count * SAMPLES);
			progress = new Float32Array(count);
		}
		xs = new Float32Array(SAMPLES);
		for (let i = 0; i < SAMPLES; i++) xs[i] = lerp(x0, x1, i / (SAMPLES - 1));

		const wanted = reduce ? 0 : narrow ? 44 : 110;
		// Parked off-canvas with staggered timers, so they come alive one by one instead of in a burst.
		while (particles.length < wanted) particles.push({ x: -99, y: -99, vx: 0, vy: 0, life: 0, max: random() * 3, size: 1, tone: 0, sway: 0 });
		particles.length = wanted;

		stroke = ctx.createLinearGradient(x0, 0, x1, 0);
		stroke.addColorStop(0, BLUE);
		stroke.addColorStop(0.45, MID);
		stroke.addColorStop(1, VIOLET);
		area = ctx.createLinearGradient(0, yTop, 0, yBase);
		area.addColorStop(0, "rgba(58,88,240,0.2)");
		area.addColorStop(1, "rgba(58,88,240,0)");
	}

	// ---- pointer: remembered in viewport coordinates and re-read against the canvas every frame, so a
	// scroll never leaves the marker stranded away from the cursor.
	let pointerX = 0;
	let pointerY = 0;
	let pointerActive = false;
	const onMove = (e: PointerEvent) => {
		pointerX = e.clientX;
		pointerY = e.clientY;
		pointerActive = true;
	};
	const onGone = () => {
		pointerActive = false;
	};
	const onUp = (e: PointerEvent) => {
		if (e.pointerType !== "mouse") pointerActive = false;
	};

	// Smoothed pointer state (canvas coordinates), and how strongly it shows and pulls.
	let px = 0;
	let py = 0;
	let show = 0;
	let pull = 0;
	let tilt = 0;
	let placed = false;

	const yAt = (line: number, index: number) => {
		const off = line * SAMPLES;
		const i = Math.max(0, Math.min(SAMPLES - 1, index));
		const whole = Math.min(SAMPLES - 2, Math.floor(i));
		return lerp(ys[off + whole], ys[off + whole + 1], i - whole);
	};
	const indexOfX = (x: number) => ((x - x0) / (x1 - x0)) * (SAMPLES - 1);

	function trace(line: number, upto: number) {
		const off = line * SAMPLES;
		const last = Math.min(SAMPLES - 1, upto);
		const whole = Math.floor(last);
		ctx.beginPath();
		ctx.moveTo(xs[0], ys[off]);
		for (let i = 1; i <= whole; i++) ctx.lineTo(xs[i], ys[off + i]);
		if (last > whole) ctx.lineTo(lerp(xs[whole], xs[whole + 1], last - whole), yAt(line, last));
	}

	function spawn(p: Particle, mainProgress: number, nearX?: number) {
		const mainIndex = lines.length - 1;
		// Mostly from the main line, the rest from the upper half of the fan; biased toward the high end.
		const line = nearX !== undefined || random() < 0.68 ? mainIndex : Math.floor(lerp(mainIndex * 0.45, mainIndex, random()));
		const reach = Math.min(mainProgress, progress[line]);
		const index = nearX !== undefined ? indexOfX(nearX) + (random() - 0.5) * 3 : Math.sqrt(random()) * reach * (SAMPLES - 1);
		const i = Math.max(0, Math.min(SAMPLES - 1, index));
		p.x = lerp(x0, x1, i / (SAMPLES - 1));
		p.y = yAt(line, i) + (random() - 0.5) * 4;
		p.vx = 4 + random() * 12;
		p.vy = -(10 + random() * 26);
		p.life = 0;
		p.max = nearX !== undefined ? 0.9 + random() * 0.9 : 1.6 + random() * 2.2;
		p.size = (strip ? 0.8 : 0.9) + random() * 1.4;
		p.tone = Math.min(2, Math.floor((i / (SAMPLES - 1)) * 3));
		p.sway = random() * TAU;
	}

	function draw(clock: number, dt: number) {
		const mainIndex = lines.length - 1;
		const main = lines[mainIndex];
		const span = x1 - x0;

		// ---- how far each line has drawn in
		for (let j = 0; j < lines.length; j++) {
			progress[j] = reduce ? 1 : easeOutCubic(clamp01((clock - lines[j].delay) / INTRO_SECONDS));
		}
		const mainProgress = progress[mainIndex];
		const settled = mainProgress >= 0.999;

		// ---- where the pointer is, or where the phantom one glides
		const rect = canvas.getBoundingClientRect();
		const zone = root.getBoundingClientRect();
		const overHero = pointerActive && pointerX >= zone.left && pointerX <= zone.right && pointerY >= zone.top && pointerY <= zone.bottom;
		// It only takes over once it is across the plot itself; over the headline the phantom keeps gliding.
		const real = !reduce && overHero && pointerX - rect.left >= x0 - 40;
		let targetX: number;
		let targetY: number;
		let showTo: number;
		let pullTo: number;
		if (real) {
			targetX = pointerX - rect.left;
			targetY = pointerY - rect.top;
			showTo = settled ? 1 : 0;
			pullTo = 1;
		} else {
			const u = 0.14 + 0.78 * (0.5 - 0.5 * Math.cos(clock * 0.45));
			targetX = x0 + u * span;
			targetY = yBase - heightOf(main, u, clock) * plotH;
			showTo = settled && !reduce ? 0.85 : 0;
			pullTo = settled && !reduce ? 0.5 : 0;
		}
		if (!placed) {
			px = targetX;
			py = targetY;
			placed = true;
		}
		const follow = 1 - Math.exp(-dt * (real ? 11 : 4));
		px += (targetX - px) * follow;
		py += (targetY - py) * follow;
		const fade = 1 - Math.exp(-dt * 5);
		show += (showTo - show) * fade;
		pull += (pullTo - pull) * fade;
		// A few pixels of drift with the cursor anywhere over the hero, so the graph feels attached to it.
		const tiltTo = overHero && !reduce ? ((pointerY - zone.top) / Math.max(1, zone.height) - 0.5) * 2 : 0;
		tilt += (tiltTo - tilt) * (1 - Math.exp(-dt * 3));

		// ---- line shapes for this frame
		for (let j = 0; j < lines.length; j++) {
			const line = lines[j];
			const off = j * SAMPLES;
			const weight = 0.45 + 0.55 * line.g;
			for (let i = 0; i < SAMPLES; i++) {
				const u = i / (SAMPLES - 1);
				let y = yBase - heightOf(line, u, clock) * plotH - tilt * 7 * (0.3 + line.g) * u;
				if (pull > 0.001) {
					const dx = (xs[i] - px) / sigma;
					const near = 0.35 + 0.65 * Math.max(0, 1 - Math.abs(py - y) / (0.55 * h));
					y -= lift * Math.exp(-dx * dx) * near * pull * weight;
				}
				ys[off + i] = y;
			}
		}

		ctx.clearRect(0, 0, w, h);
		ctx.lineJoin = "round";
		ctx.lineCap = "round";

		// ---- soft fill under the main line. Drawn first, then its right end is erased into a fade, so it
		// never ends in a hard vertical edge beneath the lead dot.
		const tip = mainProgress * (SAMPLES - 1);
		const tipX = lerp(x0, x1, mainProgress);
		const tipY = yAt(mainIndex, tip);
		if (mainProgress > 0) {
			trace(mainIndex, tip);
			ctx.lineTo(tipX, yBase);
			ctx.lineTo(x0, yBase);
			ctx.closePath();
			ctx.fillStyle = area ?? "rgba(58,88,240,0.08)";
			ctx.fill();
			const fadeWidth = Math.min(tipX - x0, span * 0.16);
			if (fadeWidth > 1) {
				const erase = ctx.createLinearGradient(tipX - fadeWidth, 0, tipX, 0);
				erase.addColorStop(0, "rgba(0,0,0,0)");
				erase.addColorStop(1, "rgba(0,0,0,1)");
				ctx.globalCompositeOperation = "destination-out";
				ctx.fillStyle = erase;
				ctx.fillRect(tipX - fadeWidth, 0, fadeWidth + 2, h);
				ctx.globalCompositeOperation = "source-over";
			}
		}

		// ---- a faint grid: enough to say "graph", not enough to compete with it
		ctx.lineWidth = 1;
		for (let k = 0; k <= 4; k++) {
			const y = Math.round(yBase - (k / 4) * plotH) + 0.5;
			ctx.strokeStyle = k === 0 ? "rgba(11,13,20,0.11)" : "rgba(11,13,20,0.05)";
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
			ctx.stroke();
		}
		ctx.strokeStyle = "rgba(11,13,20,0.14)";
		ctx.beginPath();
		for (let k = 1; k <= KNOTS; k++) {
			const x = Math.round(lerp(x0, x1, k / KNOTS)) + 0.5;
			ctx.moveTo(x, yBase + 1);
			ctx.lineTo(x, yBase + 6);
		}
		ctx.stroke();

		// ---- the fan
		ctx.strokeStyle = stroke ?? MID;
		for (let j = 0; j < mainIndex; j++) {
			if (progress[j] <= 0) continue;
			const line = lines[j];
			ctx.globalAlpha = line.alpha;
			ctx.lineWidth = line.width;
			trace(j, progress[j] * (SAMPLES - 1));
			ctx.stroke();
		}

		// ---- the main line: a wide glow, then the crisp line
		if (mainProgress > 0) {
			ctx.globalAlpha = 0.15;
			ctx.lineWidth = strip ? 7 : 10;
			trace(mainIndex, tip);
			ctx.stroke();

			ctx.globalAlpha = 1;
			ctx.lineWidth = strip ? 2.2 : main.width;
			trace(mainIndex, tip);
			ctx.stroke();
		}

		if (settled && !reduce) {
			// ---- a shine that runs up the main line every few seconds
			const run = (clock * 0.24) % 1.6;
			if (run < 1) {
				const head = run * (SAMPLES - 1);
				ctx.strokeStyle = "#ffffff";
				ctx.lineWidth = strip ? 2.2 : main.width;
				for (let s = 0; s < 6; s++) {
					const from = head - (6 - s) * 1.6;
					const to = head - (5 - s) * 1.6;
					if (to <= 0) continue;
					ctx.globalAlpha = 0.14 * (s + 1);
					ctx.beginPath();
					ctx.moveTo(lerp(x0, x1, Math.max(0, from) / (SAMPLES - 1)), yAt(mainIndex, Math.max(0, from)));
					ctx.lineTo(lerp(x0, x1, to / (SAMPLES - 1)), yAt(mainIndex, to));
					ctx.stroke();
				}
			}
			// ---- small beads travelling up a few of the fan lines
			for (let j = 0; j < mainIndex; j++) {
				const line = lines[j];
				if (!line.bead) continue;
				const travel = (clock * (0.1 + line.speed * 0.12) + line.phase) % 1.35;
				if (travel >= 1) continue;
				const index = travel * (SAMPLES - 1);
				ctx.globalAlpha = Math.sin(Math.PI * travel) * 0.9;
				ctx.fillStyle = TONES[Math.min(2, Math.floor(travel * 3))];
				ctx.beginPath();
				ctx.arc(lerp(x0, x1, travel), yAt(j, index), strip ? 1.5 : 1.9, 0, TAU);
				ctx.fill();
			}
			ctx.strokeStyle = stroke ?? MID;
		}

		// ---- data points on the main line, popping in as the line reaches them
		const dotR = strip ? 2.6 : 3.3;
		ctx.globalAlpha = 1;
		for (let k = 1; k < KNOTS; k++) {
			const index = (k * (SAMPLES - 1)) / KNOTS;
			const grown = clamp01((tip - index) / 5);
			if (grown <= 0) continue;
			const r = dotR * easeOutBack(grown);
			ctx.beginPath();
			ctx.arc(xs[index], ys[mainIndex * SAMPLES + index], Math.max(0, r), 0, TAU);
			ctx.fillStyle = "#ffffff";
			ctx.fill();
			ctx.lineWidth = 1.7;
			ctx.stroke();
		}

		// ---- particles lifting off the lines
		if (particles.length) {
			const repel = pull > 0.3;
			let sparks = real && settled && random() < 26 * dt ? 1 : 0;
			for (const p of particles) {
				p.life += dt;
				if (p.life >= p.max) {
					if (mainProgress < 0.05) continue;
					if (sparks > 0) {
						spawn(p, mainProgress, Math.max(x0, Math.min(x1, px)));
						sparks--;
					} else spawn(p, mainProgress);
				}
				if (repel) {
					const dx = p.x - px;
					const dy = p.y - py;
					const d = Math.hypot(dx, dy);
					if (d < 72 && d > 0.5) {
						const push = (1 - d / 72) * 240 * dt * pull;
						p.vx += (dx / d) * push;
						p.vy += (dy / d) * push;
					}
				}
				p.x += (p.vx + Math.sin(clock * 1.7 + p.sway) * 6) * dt;
				p.y += p.vy * dt;
				const a = Math.sin(Math.PI * clamp01(p.life / p.max)) * 0.6;
				if (a <= 0.01) continue;
				ctx.globalAlpha = a;
				ctx.fillStyle = TONES[p.tone];
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, TAU);
				ctx.fill();
			}
		}

		// ---- the marker under the pointer: a guide line and a dot riding the main line
		if (show > 0.02) {
			const mx = Math.max(x0, Math.min(x1, px));
			const index = indexOfX(mx);
			const my = yAt(mainIndex, index);
			ctx.globalAlpha = show;
			ctx.setLineDash([3, 5]);
			ctx.lineWidth = 1;
			ctx.strokeStyle = "rgba(47,71,214,0.3)";
			ctx.beginPath();
			ctx.moveTo(Math.round(mx) + 0.5, yBase);
			ctx.lineTo(Math.round(mx) + 0.5, Math.min(my, yBase - plotH) - 10);
			ctx.stroke();
			ctx.setLineDash([]);

			// where the guide crosses the stronger fan line
			for (let j = 0; j < mainIndex; j++) {
				if (!lines[j].strong) continue;
				ctx.fillStyle = MID;
				ctx.globalAlpha = show * 0.75;
				ctx.beginPath();
				ctx.arc(mx, yAt(j, index), strip ? 2.2 : 2.8, 0, TAU);
				ctx.fill();
			}

			ctx.globalAlpha = show * 0.16;
			ctx.fillStyle = MID;
			ctx.beginPath();
			ctx.arc(mx, my, strip ? 11 : 15, 0, TAU);
			ctx.fill();
			ctx.globalAlpha = show;
			ctx.fillStyle = "#ffffff";
			ctx.beginPath();
			ctx.arc(mx, my, strip ? 5 : 6.5, 0, TAU);
			ctx.fill();
			ctx.fillStyle = MID;
			ctx.beginPath();
			ctx.arc(mx, my, strip ? 2.8 : 3.6, 0, TAU);
			ctx.fill();

			ctx.strokeStyle = stroke ?? MID;
		}

		// ---- the lead dot at the end of the main line, with a slow pulse once the line has arrived
		if (mainProgress > 0.01) {
			ctx.globalAlpha = 0.16;
			ctx.fillStyle = VIOLET;
			ctx.beginPath();
			ctx.arc(tipX, tipY, strip ? 11 : 16, 0, TAU);
			ctx.fill();
			if (settled && !reduce) {
				const beat = (clock * 0.55) % 1;
				ctx.globalAlpha = (1 - beat) * 0.4;
				ctx.lineWidth = 1.5;
				ctx.strokeStyle = VIOLET;
				ctx.beginPath();
				ctx.arc(tipX, tipY, (strip ? 5 : 6) + beat * (strip ? 13 : 20), 0, TAU);
				ctx.stroke();
			}
			ctx.globalAlpha = 1;
			ctx.fillStyle = VIOLET;
			ctx.beginPath();
			ctx.arc(tipX, tipY, strip ? 4.2 : 5.4, 0, TAU);
			ctx.fill();
			ctx.lineWidth = 2;
			ctx.strokeStyle = "#ffffff";
			ctx.stroke();
		}
		ctx.globalAlpha = 1;
	}

	// ---- running: only while on screen and in a visible tab; the clock only advances while drawing
	let frame = 0;
	let last = 0;
	let clock = 0;
	let onScreen = true;
	let destroyed = false;

	const tick = (now: number) => {
		frame = 0;
		if (destroyed) return;
		const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
		last = now;
		clock += dt;
		draw(clock, dt);
		schedule();
	};
	function schedule() {
		if (frame || destroyed || reduce || !onScreen || document.hidden) return;
		frame = requestAnimationFrame(tick);
	}
	const still = () => draw(INTRO_SECONDS + 1, 0);

	const sizeWatcher = new ResizeObserver(() => {
		resize();
		if (reduce) still();
		else if (!frame) draw(clock, 0);
	});
	sizeWatcher.observe(canvas);

	const viewWatcher = new IntersectionObserver(
		(entries) => {
			onScreen = entries[entries.length - 1].isIntersecting;
			last = 0;
			schedule();
		},
		{ rootMargin: "80px" },
	);
	viewWatcher.observe(canvas);

	const onVisibility = () => {
		last = 0;
		schedule();
	};

	resize();
	if (reduce) still();
	else {
		window.addEventListener("pointermove", onMove, { passive: true });
		window.addEventListener("pointerdown", onMove, { passive: true });
		window.addEventListener("pointerup", onUp, { passive: true });
		window.addEventListener("pointercancel", onGone, { passive: true });
		window.addEventListener("blur", onGone);
		document.documentElement.addEventListener("pointerleave", onGone);
		document.addEventListener("visibilitychange", onVisibility);
		schedule();
	}

	return {
		destroy() {
			destroyed = true;
			if (frame) cancelAnimationFrame(frame);
			frame = 0;
			sizeWatcher.disconnect();
			viewWatcher.disconnect();
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerdown", onMove);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", onGone);
			window.removeEventListener("blur", onGone);
			document.documentElement.removeEventListener("pointerleave", onGone);
			document.removeEventListener("visibilitychange", onVisibility);
		},
	};
}
