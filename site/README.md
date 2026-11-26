# renewal360.in (static site)

Plain HTML/CSS/JS built by a small Node script. No dependencies. Replaces the React app in the repo root.
Plan and targets: [../docs/seo-rebuild-plan-2026-11.md](../docs/seo-rebuild-plan-2026-11.md).

## Work on it

```
npm run dev      # http://localhost:4322, rebuilds on save
npm run build    # writes dist/
python scripts/check.py   # crawler check: text, one H1, canonical, JSON-LD, broken links, long dashes
```

The build fails on a long dash and warns when a search title or description is out of range.

## Where things live

| What | Where |
|---|---|
| Site settings (app URL, email, profiles for `sameAs`, IndexNow key) | `src/site.mjs` |
| Layout, header, footer, schema helpers | `src/layout.mjs` |
| Pages | `src/pages/*.mjs` |
| FAQ answers (used on home, pricing, FAQ) | `src/pages/faq-data.mjs` |
| Blog posts, search titles, per-post CSS | `src/blog/` (`posts.json`, `seo.json`, `posts/`, `styles/`) |
| Terms and privacy text | `src/legal/terms.html` |
| Product tour chapters and transcript | `src/data/tutorial.json` |
| Images and videos | `public/img`, `public/video` |
| nginx | `deploy/renewal360.in.nginx.conf` |

Forms (trial sign-up, Google sign-up, talk to us, set password) call the app at `site.appUrl` (copilot.renewal360.in), so they only work while the app is up.

## Release (needs the owner's OK)

1. `SITE_OUT=dist-release npm run build` and `python scripts/check.py dist-release`
2. Copy `dist-release/` to `/var/www/renewal360/releases/<timestamp>/` on the VM and point `/var/www/renewal360/dist` at it (rollback: point it back).
3. Install `deploy/renewal360.in.nginx.conf`, `sudo nginx -t`, reload.
4. Resubmit `https://renewal360.in/sitemap.xml` in Search Console (`sc-domain:renewal360.in`) and run `node scripts/indexnow.mjs`.

Never remove `public/googlea03baa7136a2a67e.html`: it keeps the Search Console property verified.
