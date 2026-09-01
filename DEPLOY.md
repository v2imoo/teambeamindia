# teambeam.in — deploy & maintain (no coding needed)

This is a separate GitHub repo, published to Cloudflare Pages. Same simple flow as the blog.

## One-time setup
1. Create a new GitHub repo (e.g. `teambeam-in`) and upload everything in this folder to it (keep the structure: `build.js`, `theme.config.js`, `assets/`, `package.json` at the top).
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings: **Framework preset:** None · **Build command:** `node build.js` · **Build output directory:** `site`.
4. Deploy, then add the custom domain `teambeam.in`.

## To add your phone number (click-to-call)
Open `theme.config.js`, set `phone: '+91 ...'` (your real number), commit. It appears as a tap-to-call link in the footer and contact section automatically. Leave it `''` to hide it.

## What auto-updates
The generator builds the home, 404, sitemap, robots, feeds, security headers, and all SEO/schema/hreflang. Design tokens (fonts, colours) live in one place — `assets/styles.css` `:root` — so re-tuning the look is a single edit.

## Preserving SEO
Existing URLs are preserved as pages are added in later batches. If any URL ever changes, add a line to `_redirects` (one hop, 301).

## Notes
- Fonts are self-hosted and subset (fast). No external CDN.
- All structured data is generated and re-validated on every build; a malformed-schema error cannot ship.
- Later batches add the inner pages (What we do, How we work, Who it's for, Where we go, Tools, About) and upgrade the top nav into a full mega-menu.
