"""Stáhne aktuální zprávy o USA, Kanadě a USMCA z Google News (RSS) do data/news.json.
Spouští ho GitHub Actions každé 2 hodiny (.github/workflows/news.yml)."""
import json, os, re, urllib.parse, urllib.request, email.utils, datetime, html
import xml.etree.ElementTree as ET

TOPICS = [
    ("USA", "USA OR \"Spojené státy\" when:3d"),
    ("Kanada", "Kanada OR Kanadě OR kanadský when:7d"),
    ("Obchod", "USMCA OR NAFTA OR (clo AND (Kanada OR Mexiko)) when:14d"),
]
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "news.json")


def fetch(q):
    url = "https://news.google.com/rss/search?" + urllib.parse.urlencode({"q": q, "hl": "cs", "gl": "CZ", "ceid": "CZ:cs"})
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (educational site news fetcher)"})
    return ET.fromstring(urllib.request.urlopen(req, timeout=30).read())


items, seen = [], set()
for tag, q in TOPICS:
    try:
        root = fetch(q)
    except Exception as e:
        print("chyba", tag, e)
        continue
    for it in root.iter("item"):
        title = html.unescape(it.findtext("title") or "").strip()
        src = (it.findtext("source") or "").strip()
        if src and title.endswith(" - " + src):
            title = title[: -len(src) - 3]
        key = re.sub(r"\W+", "", title.lower())[:80]
        if not title or key in seen:
            continue
        seen.add(key)
        try:
            d = email.utils.parsedate_to_datetime(it.findtext("pubDate")).astimezone(datetime.timezone.utc)
        except Exception:
            continue
        items.append({"t": title, "u": it.findtext("link"), "s": src, "d": d.strftime("%Y-%m-%dT%H:%M:%SZ"), "k": tag})

items.sort(key=lambda x: x["d"], reverse=True)
per = {}
final = []
for x in items:
    if per.get(x["k"], 0) < 30:
        per[x["k"]] = per.get(x["k"], 0) + 1
        final.append(x)
if final:
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf8") as f:
        json.dump({"updated": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), "items": final}, f, ensure_ascii=False, indent=0)
    print("ulozeno", len(final))
