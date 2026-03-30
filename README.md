# Shimi's Cyber World

Cybersecurity insights, tools, and resources — powered by GitHub Pages + Jekyll.

## Live Site

[https://shimicohen1.github.io/shimis-cyber-world](https://shimicohen1.github.io/shimis-cyber-world)

## Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # Page templates
├── _includes/           # Reusable components (header, footer)
├── _posts/              # Blog posts (Markdown)
├── _pages/              # Static pages (About, Blog)
├── assets/
│   ├── css/style.css    # Custom styles
│   ├── images/          # Logo, banner, and media
│   └── js/              # JavaScript (future)
├── index.html           # Home page
└── _backup/             # Preserved original content
```

## Adding Content

Create a new file in `_posts/` with the format:
```
YYYY-MM-DD-title.md
```

With front matter:
```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
---
```
