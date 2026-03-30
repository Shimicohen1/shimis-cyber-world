# Shimi's Cyber World

Cybersecurity insights, tools, and resources — powered by GitHub Pages + Jekyll.

## Live Site

[https://shimicohen1.github.io/shimis-cyber-world](https://shimicohen1.github.io/shimis-cyber-world)

## GitHub Pages Setup

1. Go to **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / Folder: **/ (root)**
4. Save — the site will build automatically on every push

No build tools, no Node, no backend required. GitHub Pages builds the Jekyll site natively.

## Structure

```
_config.yml              # Jekyll configuration
index.md                 # Home page
about.md                 # About page
posts.md                 # Blog listing
library.md               # Resource library
tools.md                 # Tools directory
_layouts/
  default.html           # Base HTML shell
  post.html              # Blog post layout
  page.html              # Static page layout
_includes/
  head.html              # <head> meta tags
  header.html            # Site header + navigation
  footer.html            # Site footer
  post-card.html         # Post card component
  resource-card.html     # Resource card component
  tool-card.html         # Tool card component
_posts/                  # Blog posts (Markdown)
_data/
  navigation.yml         # Nav menu items
  homepage.yml           # Hero, featured content, about block
  resources.yml          # Resource library data
  tools.yml              # Tools directory data
assets/
  css/style.css          # Dark cyber theme
  js/main.js             # Mobile nav toggle
  img/                   # Images (hero, logos, posts, resources)
downloads/               # Downloadable files (PDFs, guides, etc.)
_backup/                 # Original content preserved here
```

## How to Update the Site

All content is managed through Markdown files and YAML data files. Push to `main` and GitHub Pages rebuilds automatically.

---

### Add a Blog Post

Create a file in `_posts/` named with the date format:

```
_posts/YYYY-MM-DD-your-post-title.md
```

Example:

```yaml
---
layout: post
title: "Your Post Title"
date: 2026-04-01
tags: [penetration-testing, tools]
description: "A short summary for cards and SEO."
image: /assets/img/posts/your-image.jpg  # optional
featured: true                            # optional — pins to homepage
---

Your post content in Markdown...
```

Posts appear automatically on the Posts page (newest first) and on the homepage latest section.

---

### Add a Library Resource

Edit `_data/resources.yml` and add an item under the appropriate category:

```yaml
- title: "Resource Name"
  url: "https://example.com/"         # or /downloads/filename.pdf
  description: "Short description."
  type: external                       # external or leave blank for local
  badge: Guide                         # Guide / PDF / Reference / Platform / Tool / Checklist / Template
```

To link a downloadable file, upload it to the `downloads/` folder and use:

```yaml
  url: "/downloads/your-file.pdf"
  type: local
  badge: PDF
```

---

### Edit Homepage Featured Items

Edit `_data/homepage.yml`:

- **`hero`** — title, tagline, banner image, CTA buttons
- **`featured_resources`** — resources shown in the "Library Picks" section
- **`featured_tools`** — tools shown in the "Tools Spotlight" section
- **`about_block`** — the "What is Cyber World?" text block

---

### Edit Tools

Edit `_data/tools.yml`. Each tool needs:

```yaml
- title: "Tool Name"
  description: "What it does."
  url: "https://tool-site.com/"       # omit for unreleased tools
  tags: [category, type]
  status: Open                         # Open / Beta / Coming Soon
  button: Learn More                   # Learn More / Request Access
```

Tools without a `url` get a disabled button automatically.

---

### Change Navigation

Edit `_data/navigation.yml`:

```yaml
main:
  - title: Home
    url: /
  - title: Posts
    url: /posts/
  - title: Library
    url: /library/
  - title: Tools
    url: /tools/
  - title: About
    url: /about/
```

---

## Design

- Dark background with subtle cyber aesthetic
- Blue/cyan accent colors
- Clean card-based layouts
- Strong readable typography
- Mobile responsive — no clutter
- No Bootstrap, no JavaScript frameworks
- Static vanilla HTML/CSS rendered by Jekyll

## Local Development (optional)

```bash
gem install bundler
bundle install
bundle exec jekyll serve
# → http://localhost:4000/shimis-cyber-world/
```
