"""Crawler's-eye check of the built site (no JavaScript):
visible text, one H1, canonical, valid JSON-LD, no broken internal links.

    python site/scripts/check.py [dist]
"""
import html
import json
import re
import sys
from pathlib import Path

dist = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parents[1] / "dist")
pages = {}
for f in dist.rglob("index.html"):
    rel = "/" + f.parent.relative_to(dist).as_posix()
    pages["/" if rel == "/." else rel] = f.read_text(encoding="utf-8")

bad, rows = [], []
for rel, s in sorted(pages.items()):
    body = re.sub(r"(?s)<(script|style|head|svg)[^>]*>.*?</\1>", "", s)
    txt = " ".join(html.unescape(re.sub(r"<[^>]+>", " ", body)).split())
    lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
    for block in lds:
        try:
            json.loads(block)
        except ValueError as e:
            bad.append(f"{rel} bad JSON-LD: {e}")
    h1 = len(re.findall(r"<h1[\s>]", s))
    if h1 != 1:
        bad.append(f"{rel} has {h1} h1")
    can = re.search(r'rel="canonical" href="([^"]+)"', s)
    want = "https://renewal360.in" + ("/" if rel == "/" else rel)
    if "noindex" not in s and (not can or can.group(1) != want):
        bad.append(f"{rel} canonical {can.group(1) if can else None}")
    for href in re.findall(r'href="(/[^"#?]*)', s):
        h = href.rstrip("/") or "/"
        if h not in pages and not (dist / h.lstrip("/")).is_file():
            bad.append(f"{rel} -> broken link {href}")
    if re.search("[–—]", txt):
        bad.append(f"{rel} long dash")
    rows.append((rel, len(txt), len(lds)))

for rel, n, k in rows:
    print(f"{rel:62} text={n:6} jsonld={k}")
print(f"\n{len(rows)} pages, {len(set(bad))} problems")
print("\n".join(sorted(set(bad))))
sys.exit(1 if bad else 0)
