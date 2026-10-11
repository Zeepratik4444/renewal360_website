// Remembers the LinkedIn ad click that brought a visitor, so a trial started
// later in the visit can be credited to it (the app reports sign-ups and
// activations back to LinkedIn; see the app's services/onboarding/linkedin.py).
//
// LinkedIn adds li_fat_id to the landing URL when enhanced conversion
// tracking is on. Kept for 30 days in this browser only; nothing is sent
// anywhere until the visitor starts a trial.

const KEY = "rc_ad_click";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

type Stored = { li_fat_id: string; at: number };

export function captureAdClick(): void {
	if (typeof window === "undefined") return;
	try {
		const li = new URLSearchParams(window.location.search).get("li_fat_id");
		if (li) {
			const value: Stored = { li_fat_id: li.slice(0, 200), at: Date.now() };
			window.localStorage.setItem(KEY, JSON.stringify(value));
		}
	} catch {
		// storage blocked: the trial just won't be credited to the ad
	}
}

export function getAdClick(): { li_fat_id: string } | null {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return null;
		const value = JSON.parse(raw) as Stored;
		if (!value?.li_fat_id || Date.now() - value.at > TTL_MS) {
			window.localStorage.removeItem(KEY);
			return null;
		}
		return { li_fat_id: value.li_fat_id };
	} catch {
		return null;
	}
}
