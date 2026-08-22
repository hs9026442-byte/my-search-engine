# my-search-engine

Polished UI for the ByteSearch static demo.

This branch (polish/ui) contains design, accessibility, and SEO improvements: externalized CSS/JS, meta tags, accessible search form, improved loading states, and better contrast.

Run locally:

1. Clone the repo
2. Serve statically (Python):

```bash
python3 -m http.server 8000
```

Open http://localhost:8000/index.html

Notes:
- Results are fetched from the public Wikipedia REST API and are intended for demo purposes only.
- I moved styles to `assets/style.css` and JS to `assets/main.js` on the `polish/ui` branch.
