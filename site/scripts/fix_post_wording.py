"""Bring the old posts' offer wording in line with today's offer (free for 25 accounts,
7 days of Scale, no credit card) and drop internal mechanics (IMAP, Razorpay).

    python site/scripts/fix_post_wording.py
"""
from pathlib import Path

POSTS = Path(__file__).resolve().parents[1] / "src/blog/posts"
REPL = [
    ("Start the 30-day free pilot with 25 accounts", "Start free with 25 accounts"),
    ("Start your 30-day pilot", "Start your free trial"),
    ("No credit card, no setup fee, live in 7 days", "Free for 25 accounts, 7 days of the full Scale plan, no credit card"),
    ("Start Free Pilot →", "Start free trial →"),
    ("Start 30-Day Pilot &rarr;", "Start free trial &rarr;"),
    ("30-Day Pilot", "Free trial"),
    ("free pilot covering up to 25 accounts", "free plan covering up to 25 accounts"),
    ("free pilot for 25 accounts", "free plan for 25 accounts"),
    ("free 25-account pilot", "free 25-account plan"),
    ("for a 25-account pilot", "for a first 25 accounts"),
    ("INR plans, free pilot", "Published plans, free tier"),
    ("Salesforce, HubSpot, Zendesk, Slack, and email (IMAP/SMTP) are all supported natively via OAuth",
     "Salesforce, HubSpot, Zendesk, Amplitude, Slack, Gmail and Outlook are all supported"),
    ("You need INR pricing, Razorpay billing, and support aligned to Indian business hours",
     "You want published pricing, including in rupees"),
    ("✓ Yes (IMAP monitoring)", "✓ Yes"),
    ("Customer replies are monitored via IMAP", "Customer replies are watched in the inbox"),
    ("via IMAP monitoring", "by reading the inbox"),
    ("Real-time IMAP monitoring", "Inbox monitoring"),
    ("Reply-aware IMAP monitoring", "Reply-aware sequences"),
    ("the IMAP reply detection", "the reply detection"),
    ("IMAP monitoring", "Inbox monitoring"),
]

for p in sorted(POSTS.glob("*.html")):
    s = o = p.read_text(encoding="utf-8")
    for a, b in REPL:
        s = s.replace(a, b)
    if s != o:
        p.write_text(s, encoding="utf-8")
        print("updated", p.stem)
left = [p.stem for p in POSTS.glob("*.html") if any(w in p.read_text(encoding="utf-8") for w in ("IMAP", "Razorpay", "30-day pilot", "30-Day"))]
print("still mentions IMAP/Razorpay/30-day:", left or "none")
