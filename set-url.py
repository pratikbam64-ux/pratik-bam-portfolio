#!/usr/bin/env python3
"""Replace the placeholder address everywhere with your real site address.

Usage:   python3 set-url.py https://yourname.github.io/portfolio
         python3 set-url.py https://yourname.netlify.app

Do not put a slash at the end. Run it once, after you know your address.
"""
import sys, pathlib

if len(sys.argv) != 2 or not sys.argv[1].startswith("http"):
    sys.exit("Usage: python3 set-url.py https://your-site-address")

new = sys.argv[1].rstrip("/")
old = "https://YOUR-SITE-URL"
changed = 0
for name in ("index.html", "404.html", "sitemap.xml", "robots.txt"):
    p = pathlib.Path(__file__).parent / name
    text = p.read_text(encoding="utf-8")
    if old in text:
        p.write_text(text.replace(old, new), encoding="utf-8")
        changed += 1
print(f"Updated {changed} files to {new}")
