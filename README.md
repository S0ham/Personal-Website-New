# Soham Dutta — Portfolio Website
### Deployment & Maintenance Guide

A pure **HTML + CSS + JS** site. No frameworks, no build step, nothing to install. If you can edit a text file, you can maintain this site.

---

## 📁 What's in the folder

```
soham-site/
├── index.html        → Home
├── about.html        → About + principles
├── experience.html   → Career timeline
├── work.html         → Projects grid
├── mf-tool.html      → MF tool case study
├── skills.html       → The Arsenal
├── beyond.html       → Personal page
├── contact.html      → Contact + services
├── style.css         → ALL styling (one file)
├── main.js           → ALL interactions (one file)
├── soham.jpg         → Your photo
└── README.md         → This guide
```

**Everything is intentionally flat — no subfolders.** This makes GitHub uploads foolproof: just drag all the files in, done. Never rename `style.css`, `main.js` or `soham.jpg`.

---

## 🚀 Part 1 — Deploy (one-time setup, ~15 minutes)

### Step 1: Put the site on GitHub

1. Go to **github.com** → log in → click **+** (top right) → **New repository**
2. Name it something like `soham-portfolio`. Keep it **Public**. Don't add a README (you already have one). Click **Create repository**.
3. On the repo page, click **uploading an existing file**.
4. Drag **all the files** from the `soham-site` folder into the upload box (they are all in one flat folder — no subfolders to worry about).
5. Click **Commit changes**.

### Step 2: Deploy on Vercel

1. Go to **vercel.com** → **Sign up** → choose **Continue with GitHub** (this links the two).
2. Click **Add New… → Project**.
3. Find `soham-portfolio` in the list → **Import**.
4. Change nothing (Vercel auto-detects a static site). Click **Deploy**.
5. ~30 seconds later you get a live URL like `soham-portfolio.vercel.app`. Done. 🎉

### Step 3 (optional): Custom domain

1. Buy a domain (Namecheap, GoDaddy, Hostinger — anywhere).
2. In Vercel: your project → **Settings → Domains** → add `sohamdutta.com` (or whatever you bought).
3. Vercel shows you 1–2 DNS records. Add them in your domain provider's DNS panel.
4. Wait a few minutes to a few hours. Your site is now on your own domain, with free HTTPS.

---

## 🔄 Part 2 — How updates work (the magic part)

**GitHub is the source of truth. Vercel watches it.**

Any time you change a file in the GitHub repo, Vercel automatically redeploys the site within ~30 seconds. You never touch Vercel again.

### Easiest way to edit (no software needed)

1. Open your repo on github.com
2. Click the file you want to change (e.g. `work.html`)
3. Click the **pencil icon** (top right of the file view)
4. Make your edit → click **Commit changes**
5. Wait ~30 seconds → refresh your live site. Updated.

That's the entire update workflow.

---

## ✏️ Part 3 — Common edits cheat-sheet

### Change any text
Open the relevant `.html` file, find the text (Ctrl+F works in the GitHub editor), change it, commit.

### Update your real contact details
In `contact.html`, replace:
- `hello@example.com` (appears twice — in the `href="mailto:..."` AND the visible text)
- `linkedin.com/in/your-profile` and its `href="#"`

Also update the three footer links (`LinkedIn / Instagram / X`) — they appear at the bottom of **every** html file. Search for `foot-links` in each file and replace the `href="#"` with your real URLs.

### Update the certification names
In `skills.html`, find the three cards under "Credentials" and replace the placeholder names with your actual certifications. Then delete the `// Update these three cards...` note line.

### Add screenshots to the MF tool case study
1. Upload your screenshot images to the repo (Add file → Upload files).
2. In `mf-tool.html`, find the two `shot-placeholder` divs and replace each entire div with:
```html
<img src="your-screenshot.png" alt="MF tool input screen"
     style="border-radius:1rem;border:1px solid var(--line)" class="reveal">
```
3. Delete the `// To add screenshots...` note line.

### Swap your photo
Upload a new image named exactly `soham.jpg` (GitHub will ask to replace — say yes). Portrait orientation works best (4:5 ratio). The photo currently appears in two places: the small circular avatar in the home hero's status pill, and the large portrait on the About page.

### About the home hero ("The Uptrend")
- The rising **market chart** is an inline SVG in `index.html` (`hero2-chart`). To reshape the line, edit the coordinate pairs in the two `<path>` elements (`chartLine` and `chartArea` must match).
- The four floating labels (`BRAND ▲`, `SEO ▲` …) are the `chart-tag` spans — edit text or position (`left` / `bottom` percentages) freely.
- The **scrambling orange word** rotates through the list in `data-rotate='[...]'` on the `.roto` span. Add or edit words there (keep them short).
- The **market strip** stats at the bottom of the hero are the `strip-item` spans.
- Want your big photo back in the hero? Simplest option: ask any AI editor to "add a portrait column to the hero2 section using soham.jpg" — or just enlarge the avatar by changing `.status-avatar` width/height in `css/style.css`.

### Add a new project card
In `work.html`, copy an entire `<div class="card reveal"> ... </div>` block, paste it below the last one inside the `grid-3` div, and edit the number, title, description and chips.

### Add a whole new page
1. Duplicate an existing page file (e.g. copy `beyond.html`, rename to `newpage.html`).
2. Edit its content.
3. Add a link to it in the `nav-links` div — **in every html file** (the nav is repeated on each page since there's no build system).

### Change the colors / fonts
Everything lives at the top of `style.css` in the `:root` block:
```css
--bg:     #0a0a0a;   /* page background */
--orange: #ff6b2b;   /* accent color   */
--ink:    #f0ede8;   /* text color     */
```
Change a value once → the entire site updates.

---

## 🧠 Things to know

- **The nav & footer are copy-pasted on every page.** If you edit them, edit them everywhere (8 files). Annoying but simple — and it means zero build tooling.
- **The ticker tape** (home page) and **word band** repeat their content twice in the HTML. That's intentional — it's what makes the loop seamless. If you edit the items, edit both copies identically.
- **The `reveal` class** on any element = fade-up animation on scroll. Add it to anything new you create. `reveal-d1/d2/d3` add stagger delays.
- **Mobile & accessibility** are handled: hamburger nav, reduced-motion support, cursor disabled on touch devices. Don't remove the `<meta name="viewport">` tag.
- **Test locally** by just double-clicking `index.html` — it opens in your browser. (The Google Fonts need internet, everything else works offline.)

---

## 🆘 If something breaks

1. GitHub keeps every version. Go to the repo → **Commits** → click the last-known-good commit → browse files → copy the old content back.
2. Vercel also keeps every deployment: project → **Deployments** → click an older one → **⋯ → Promote to Production** for an instant rollback.

You literally cannot permanently break this site. Edit fearlessly.

— Built July 2026


---

## 🔧 Fixing a broken (unstyled) deployment

If the live site ever shows plain black text on white with blue links, the browser can't find `style.css`. Check your GitHub repo: `index.html`, `style.css`, `main.js` and `soham.jpg` must all sit **side by side at the top level** of the repo. If any are missing or inside a folder, re-upload them to the root. Vercel redeploys automatically within a minute.
