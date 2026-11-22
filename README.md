# Pratik Bam — Personal Portfolio

A responsive, single-page portfolio website for Pratik Bam, presenting his background in industrial construction, business studies, independent publishing, skills, projects, and career goals.

## Technology

The site is intended to be a lightweight static website built with HTML, CSS, and vanilla JavaScript. No framework, package manager, or paid dependency is required. The portfolio may load Google Fonts from Google Fonts when a visitor has an internet connection.

## Project structure

```text
.
├── index.html       # Main portfolio page
├── css/ js/ fonts/ images/   # Styles, scripts, self-hosted fonts, photo and book covers
├── js/config.js     # Contact links, photo, book covers and Amazon links
├── netlify.toml     # Netlify static-site configuration
├── PUBLISHING.md    # Step-by-step publishing guide
└── README.md
```

**Status:** the portfolio website (`index.html` and its assets) is now in this repository. See `PUBLISHING.md` for the publishing steps. Replace the placeholder `https://YOUR-SITE-URL` with the real Netlify address after the first deploy.

## Deploy with Netlify

1. Upload the portfolio HTML as `index.html` in the repository root and commit it to the default branch.
2. In Netlify, choose **Add new site → Import an existing project** and connect this GitHub repository.
3. Leave the build command empty. The publish directory is `.` (the repository root), as configured in `netlify.toml`.
4. Deploy. Netlify can then build and publish automatically whenever you push changes to the connected branch.

No deployment has been started from this repository.

## Updating the site

Edit `index.html` to update portfolio content and styling, then commit and push your changes. Netlify will publish the update after the repository is connected and automatic deploys are enabled.
