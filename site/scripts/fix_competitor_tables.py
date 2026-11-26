"""Replace the competitor comparison tables in three posts with rows we can stand behind:
no competitor prices, setup times or feature crosses we cannot verify, no internal mechanics.

    python site/scripts/fix_competitor_tables.py
"""
import re
from pathlib import Path

POSTS = Path(__file__).resolve().parents[1] / "src/blog/posts"
CHECK = "Check with the vendor"

TABLES = {
    "churnzero-alternative-growing-saas-teams": [
        ["", "ChurnZero", "Renewal360"],
        ["Pricing", "Quote-based", "Published, starting with a free plan"],
        ["Main focus", "Customer success platform with usage-driven plays and in-app messaging", "Renewals: finds what each renewal is missing and drafts the follow-up"],
        ["Best fit", "Mid-market subscription businesses with a CS operations owner", "Growing SaaS customer success teams"],
        ["Getting started", "Sales-led evaluation and an implementation project", "Start free the same day from a CSV, then connect CRM and inbox"],
        ["AI-drafted outreach", CHECK, "Drafts for every renewal step, each waiting for approval by default"],
        ["What each renewal is missing", "Health scores and plays", "Each renewal checked for champion, signer, value, pricing and more, with evidence"],
        ["Prices in rupees", CHECK, "Yes, as well as dollars, euros and pounds"],
    ],
    "totango-alternative-faster-renewal-automation": [
        ["", "Totango", "Renewal360"],
        ["Pricing", "Quote-based", "Published, starting with a free plan"],
        ["Main focus", "Modular customer success platform for lifecycle programmes (combined with Catalyst in 2024)", "Renewals: finds what each renewal is missing and drafts the follow-up"],
        ["Best fit", "Mid-market and enterprise teams running structured customer programmes", "Growing SaaS customer success teams"],
        ["Getting started", "Demo and sales-led evaluation", "Start free the same day from a CSV, then connect CRM and inbox"],
        ["AI-drafted outreach", CHECK, "Drafts for every renewal step, each waiting for approval by default"],
        ["What each renewal is missing", "Health scores and configured programmes", "Each renewal checked for champion, signer, value, pricing and more, with evidence"],
        ["Prices in rupees", CHECK, "Yes, as well as dollars, euros and pounds"],
    ],
    "gainsight-vs-totango-vs-renewal360": [
        ["", "Gainsight", "Totango", "Renewal360"],
        ["Pricing", "Quote-based", "Quote-based", "Published, starting with a free plan"],
        ["Best fit", "Large enterprise CS teams with mature operations and dedicated admins", "Mid-market to enterprise teams building structured customer programmes", "Growing SaaS teams that want renewals protected without a big rollout"],
        ["Main job", "Run a broad customer success operating model across a large post-sales organisation", "Coordinate lifecycle programmes, value delivery and customer health", "Find what each renewal is missing and do the follow-up, with your approval"],
        ["Getting started", "Sales-led evaluation and an implementation project", "Demo and sales-led evaluation", "Start free the same day from a CSV; no sales call needed"],
        ["AI-drafted renewal outreach", CHECK, CHECK, "Core workflow: drafts per account, a person approves before anything is sent"],
        ["Prices in rupees", CHECK, CHECK, "Yes, as well as dollars, euros and pounds"],
    ],
}


def table_html(rows):
    head, body = rows[0], rows[1:]
    th = "".join(f"<th>{c}</th>" for c in head)
    trs = "".join("<tr>" + "".join(f"<td>{'<strong>' + c + '</strong>' if i == 0 else c}</td>" for i, c in enumerate(r)) + "</tr>" for r in body)
    return f"<thead><tr>{th}</tr></thead><tbody>{trs}</tbody>"


for slug, rows in TABLES.items():
    p = POSTS / f"{slug}.html"
    s = p.read_text(encoding="utf-8")
    m = re.search(r"(<table[^>]*>)(.*?)(</table>)", s, re.S)
    assert m, slug
    s = s[:m.start()] + m.group(1) + table_html(rows) + m.group(3) + s[m.end():]
    p.write_text(s, encoding="utf-8")
    print("fixed", slug)
