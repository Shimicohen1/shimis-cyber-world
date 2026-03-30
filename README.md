# Shimi's Cyber World

Cybersecurity insights, tools, and resources — powered by GitHub Pages + Jekyll.

## Live Site

[https://shimicohen1.github.io/shimis-cyber-world](https://shimicohen1.github.io/shimis-cyber-world)

## Structure

```
/
  _config.yml              # Jekyll configuration
  index.md                 # Home page
  about.md                 # About page
  posts.md                 # Blog listing
  library.md               # Resource library
  tools.md                 # Tools directory
  _layouts/
    default.html           # Base layout
    post.html              # Blog post layout
    page.html              # Static page layout
  _includes/
    head.html              # <head> meta tags
    header.html            # Site header + nav
    footer.html            # Site footer
    post-card.html         # Blog post card component
    resource-card.html     # Resource card component
    tool-card.html         # Tool card component
  _posts/                  # Blog posts (Markdown)
  _data/
    navigation.yml         # Nav menu items
    homepage.yml           # Hero & features config
    resources.yml          # Resource library data
    tools.yml              # Tools directory data
  assets/
    css/style.css          # Theme styles
    js/main.js             # Client-side JS
    img/
      hero/                # Hero/banner images
      logos/               # Brand logos
      posts/               # Post images
      resources/           # Resource images
  downloads/               # Downloadable files
  _backup/                 # Preserved original content
```

## Adding Content

### Blog Posts

Create a file in `_posts/` named `YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD
tags: [tag1, tag2]
---
Your content here...
```

### Resources & Tools

Edit `_data/resources.yml` or `_data/tools.yml` to add entries. Changes appear automatically on the Library and Tools pages.
