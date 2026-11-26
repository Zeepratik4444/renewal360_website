"""One-off: move the 16 old static blog posts into site/src/blog.

Keeps every slug. Pulls title, dek, tags, dates, read time, search title and
description, the article body, and each post's own CSS (scoped to that post,
font and base rules dropped). Rewrites links to pages that moved.

    python site/scripts/port_blog.py
"""
import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "src/content/blog"
OUT = ROOT / "site/src/blog"
(OUT / "posts").mkdir(parents=True, exist_ok=True)
(OUT / "styles").mkdir(parents=True, exist_ok=True)

MOVED = {"/features": "/product", "/how-it-works": "/product", "/glimpses": "/product"}
DROP_SELECTORS = re.compile(r"^(body|html|h1|h2|h3|h4|\*|\.prose-content( [a-z0-9:\-\(\)\.]+)*|\.tag)$")


def text(s):
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", s)).split())


def dashes(s):
    s = re.sub(r"(\d)\s*[–—]\s*(\d)", r"\1-\2", s)
    s = re.sub(r"\s*—\s*", " - ", s)
    return s.replace("–", "-")


def split_rules(css):
    """Top-level rules, keeping @media blocks whole."""
    out, depth, start = [], 0, 0
    for i, ch in enumerate(css):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                out.append(css[start:i + 1].strip())
                start = i + 1
    return [r for r in out if r]


def scope_rule(rule, scope):
    if rule.startswith("@media"):
        head, inner = rule.split("{", 1)
        inner = inner.rsplit("}", 1)[0]
        kept = [scope_rule(r, scope) for r in split_rules(inner)]
        kept = [k for k in kept if k]
        return f"{head.strip()} {{ {' '.join(kept)} }}" if kept else ""
    if rule.startswith("@"):
        return ""
    sel, body = rule.split("{", 1)
    body = re.sub(r"font-family\s*:[^;}]+;?", "", body)
    sels = [s.strip() for s in sel.split(",")]
    sels = [s for s in sels if not DROP_SELECTORS.match(s)]
    if not sels or not body.strip(" }\n"):
        return ""
    return ", ".join(f"{scope} {s}" for s in sels) + " {" + body


posts, seo = [], {}
for f in sorted(SRC.glob("blog-*.html")):
    slug = re.sub(r"^blog-\d+-", "", f.stem)
    # The live URL differs from the file name for this one post.
    slug = {"automate-saas-renewal-emails": "how-to-automate-saas-renewal-emails"}.get(slug, slug)
    s = f.read_text(encoding="utf-8")
    title_tag = text(re.search(r"<title>(.*?)</title>", s, re.S).group(1))
    desc = html.unescape(re.search(r'<meta name="description"\s+content="([^"]*)"', s, re.S).group(1)).strip()
    head = re.search(r"<header[^>]*>(.*?)</header>", s, re.S).group(1)
    h1 = re.search(r"<h1[^>]*>(.*?)</h1>", head, re.S).group(1)
    sub = re.search(r"<span[^>]*>(.*?)</span>", h1, re.S)
    title = text(re.sub(r"<span[^>]*>.*?</span>", "", h1, flags=re.S))
    subtitle = text(sub.group(1)) if sub else ""
    dek = re.search(r"<p[^>]*>(.*?)</p>", head, re.S)
    tags = [text(t) for t in re.findall(r'<span class="tag">(.*?)</span>', head, re.S)]
    date = re.search(r'"datePublished":\s*"([^"]+)"', s).group(1)
    modified = re.search(r'"dateModified":\s*"([^"]+)"', s).group(1)
    rt = re.search(r"(\d+) min read", s)
    body = re.search(r"<main[^>]*>(.*?)</main>", s, re.S).group(1).strip()
    for a, b in MOVED.items():
        body = body.replace(f'href="{a}"', f'href="{b}"').replace(f'href="https://renewal360.in{a}"', f'href="{b}"')
    body = re.sub(r'href="(/blog/[a-z0-9\-]+)/"', r'href="\1"', body)
    body = re.sub(r'href="https://renewal360\.in(/[^"]*)"', r'href="\1"', body)
    body = dashes(body)
    css = "".join(re.findall(r"<style[^>]*>(.*?)</style>", s, re.S))
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    scoped = [scope_rule(r, ".prose") for r in split_rules(css)]
    (OUT / "styles" / f"{slug}.css").write_text(dashes("\n".join(x for x in scoped if x)) + "\n", encoding="utf-8")
    (OUT / "posts" / f"{slug}.html").write_text(body + "\n", encoding="utf-8")
    full = f"{title} {subtitle}".strip() if subtitle else title
    posts.append({
        "slug": slug,
        "title": dashes(full),
        "summary": dashes(text(dek.group(1))) if dek else dashes(desc),
        "date": date,
        "modified": modified,
        "readTime": f"{rt.group(1)} min read" if rt else "",
        "tags": [dashes(t) for t in tags] or ["Article"],
    })
    seo[slug] = {"title": dashes(title_tag), "description": dashes(desc)}

posts.sort(key=lambda p: (p["date"], p["slug"]), reverse=True)
(OUT / "posts.json").write_text(json.dumps(posts, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
(OUT / "seo.json").write_text(json.dumps(seo, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"{len(posts)} posts")
for p in posts:
    print(p["date"], p["slug"], "|", p["title"][:60], "|", p["readTime"], p["tags"][:3])
