# Pratik Bam: Personal Portfolio

An editorial, cinematic, single-page portfolio built with plain **HTML, CSS and JavaScript**.
No frameworks, no build step, no paid services, no tracking, no external requests.
Compatible with **free Netlify** and **free GitHub Pages**.

Highlights: cinematic intro, portrait frame, rotating Nepal-to-UAE globe that follows your journey, realistic 3D book coverflow, scroll animations, and full respect for the visitor's "reduce motion" setting.

---

## What is in the folder

```
index.html        The page: all text, SEO tags and structure
css/style.css     All styling and animation
js/main.js        All behavior (intro, globe, coverflow, scroll effects)
js/config.js      YOUR LINKS, PHOTO, COVERS AND AMAZON LINKS GO HERE
fonts/            Fraunces and DM Sans (free, SIL Open Font License) + licences
images/           favicon.svg, apple-touch-icon.png, og-image.jpg (social preview)
images/covers/    Put your real book cover images here
404.html          "Page not found" page
robots.txt        Lets search engines index the site
sitemap.xml       Page list for search engines
netlify.toml      Free Netlify settings (ignored elsewhere)
.nojekyll         Needed by GitHub Pages
set-url.py        Optional helper that swaps in your real web address
```

---

## Step 1: Your details (already filled in, all in `js/config.js`)

`js/config.js` already contains your real email, WhatsApp, Instagram, Facebook, Amazon Author Page, profile photo and the nine books with their Amazon links. To change anything later, open that file in any text editor and edit the matching line.

1. **Contact and social links.** One line per link. They appear as icons at the top of the page and as rows in Contact. The `amazon` entry also powers the **Explore All My Books** button. The optional `note` sets the small line under a label (the WhatsApp number is deliberately not shown on the page).
2. **Profile photo.** `images/portrait.jpg` (900 x 1125 pixels, a crop of your original photo). Replace the file, or change the path in `portrait:`.
3. **Book covers.** The nine covers are in `images/covers/` (800 pixels wide, JPG). The 3D books use each cover's real proportions. If a cover ever fails to load, a simple typographic cover is shown instead of a broken image.
4. **Book titles and order.** Set in the `BOOKS` list in `js/main.js`. The text under each title is only the subtitle printed on the cover itself.

Book keys: `loved`, `perspective`, `struggle`, `world`, `mind`, `bible`, `listen`, `care`, `between`.

---

## Step 2: Publish on Netlify (free, easiest)

1. Create a free account at **netlify.com**.
2. Open **app.netlify.com/drop** and drag the whole unzipped project **folder** onto the page. If it asks for a zip, follow its on-screen hint.
3. You get an address like `https://bright-otter-123.netlify.app`. Rename it in **Site configuration, Change site name**.
4. To update later, drag the folder onto the site's **Deploys** page again.

## Or publish on GitHub Pages (free)

1. Create a free account at **github.com** and click **New repository**.
2. Name it `yourusername.github.io`, set it to **Public**, and create it.
3. Click **uploading an existing file** and drag in everything **inside** the unzipped folder (folders only drag in on a computer; on a phone use Netlify).
4. Click **Commit changes**, then go to **Settings, Pages**, choose branch `main` and folder `/ (root)`, and **Save**.
5. After one or two minutes the site is live at `https://yourusername.github.io`.

A custom domain such as `pratikbam.com` costs money and is **not needed**.

---

## Step 3: Put your real address into the site (important for SEO)

The files contain the placeholder `https://YOUR-SITE-URL`. Replace it with your real address, with no slash at the end.

- **Easy way (needs Python):** `python3 set-url.py https://yourname.netlify.app`
- **Manual way:** open `index.html`, `404.html`, `sitemap.xml` and `robots.txt`, find `https://YOUR-SITE-URL` and replace it with your address. Upload the changed files again.

Then, in `index.html`, find `"sameAs": []` and put your social profile links inside the brackets, in quotes, separated by commas. Search engines use this to connect your accounts.

---

## Step 4: Basic SEO checklist (all free)

Already done: page title, meta description, canonical link, Open Graph and Twitter tags, structured data, `sitemap.xml`, `robots.txt`, mobile-friendly layout, fast local fonts, skip link and keyboard support.

Still for you:
1. Add the site to **Google Search Console** (free) and submit `https://your-address/sitemap.xml`.
2. Paste your link into a WhatsApp chat to yourself to check the social preview card.
3. Share the link on your Amazon author page, social bios and book communities. Links from other places help ranking the most.
4. New sites can take days to weeks to appear in Google. That is normal.

---

## Editing the content

- **Text:** open `index.html` and change the words between the tags.
- **Book descriptions:** edit the `BOOKS` list near the middle of `js/main.js`.
- **Colors:** change the values under `:root` at the top of `css/style.css`.
- **Number tiles:** change `data-to` in `index.html`.

## Accessibility and performance

- Respects the visitor's **reduce motion** setting: effects switch off and all text shows at once.
- Animations pause when the tab is hidden or the globe is off screen. Particle counts are small and lower on phones.
- Visible keyboard focus, a skip link, arrow-key control of the book carousel, and readable contrast.

## Licenses

Your text and books belong to you. The two fonts are free under the SIL Open Font License (see `/fonts`). All code in this project is yours to use and change.
