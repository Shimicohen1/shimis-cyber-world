---
layout: page
title: RSS Feed
permalink: /rss/
---

<div class="rss-page">

<div class="rss-hero">
  <div class="rss-hero__icon" data-icon="radar"></div>
  <h1 class="rss-hero__title">Subscribe via RSS</h1>
  <p class="rss-hero__desc">Get every SCW post delivered to your favorite feed reader — no algorithms, no missed updates.</p>
</div>

<div class="rss-feed-url">
  <label class="rss-feed-url__label">Feed URL</label>
  <div class="rss-feed-url__row">
    <input type="text" id="rssFeedUrl" class="rss-feed-url__input" value="{{ '/feed.xml' | absolute_url }}" readonly>
    <button id="rssCopyBtn" class="btn btn--primary rss-feed-url__btn" onclick="navigator.clipboard.writeText(document.getElementById('rssFeedUrl').value).then(function(){var b=document.getElementById('rssCopyBtn');b.textContent='Copied!';setTimeout(function(){b.textContent='Copy URL'},1500)})">Copy URL</button>
  </div>
</div>

<div class="rss-readers">
  <h2 class="rss-readers__title">Open in a feed reader</h2>
  <div class="rss-readers__grid">
    <a href="https://feedly.com/i/subscription/feed/{{ '/feed.xml' | absolute_url }}" target="_blank" rel="noopener noreferrer" class="rss-reader-card">
      <span class="rss-reader-card__icon" style="color:#34d399;">&#9679;</span>
      <strong>Feedly</strong>
      <span>Most popular feed reader</span>
    </a>
    <a href="https://www.inoreader.com/?add_feed={{ '/feed.xml' | absolute_url | url_encode }}" target="_blank" rel="noopener noreferrer" class="rss-reader-card">
      <span class="rss-reader-card__icon" style="color:#3b82f6;">&#9679;</span>
      <strong>Inoreader</strong>
      <span>Power-user features</span>
    </a>
    <a href="https://newsblur.com/?url={{ '/feed.xml' | absolute_url | url_encode }}" target="_blank" rel="noopener noreferrer" class="rss-reader-card">
      <span class="rss-reader-card__icon" style="color:#eab308;">&#9679;</span>
      <strong>NewsBlur</strong>
      <span>Open source reader</span>
    </a>
    <a href="{{ '/feed.xml' | absolute_url }}" class="rss-reader-card">
      <span class="rss-reader-card__icon" data-icon="file"></span>
      <strong>Raw Feed</strong>
      <span>Copy URL into any reader</span>
    </a>
  </div>
</div>

<div class="rss-what">
  <h2 class="rss-what__title">What is RSS?</h2>
  <p>RSS lets you subscribe to websites and get new posts delivered automatically — like email, but without the spam. You choose a feed reader app, add our feed URL, and every new SCW post appears there instantly.</p>
  <p><strong>No account needed on our site. No tracking. No algorithms deciding what you see.</strong></p>
</div>

<div class="rss-also">
  <h2 class="rss-also__title">Other ways to follow SCW</h2>
  <div class="rss-also__grid">
    <a href="https://t.me/shimiscyberworld" target="_blank" rel="noopener" class="rss-also__link rss-also__link--telegram">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0 12 12 0 0 0 11.944 0Zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
      Telegram Channel
    </a>
    <a href="https://www.linkedin.com/company/112773961" target="_blank" rel="noopener" class="rss-also__link rss-also__link--linkedin">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      LinkedIn
    </a>
    <a href="#newsletter" class="rss-also__link rss-also__link--email">
      <svg class="scw-icon" style="width:14px;height:14px;vertical-align:-1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Email Newsletter
    </a>
  </div>
</div>

</div>

<style>
.rss-page { max-width: 640px; margin: 0 auto; }
.rss-hero { text-align: center; padding: 2rem 0 1.5rem; }
.rss-hero__icon { font-size: 3rem; margin-bottom: .5rem; display: block; }
.rss-hero__title { font-family: var(--f-display); font-size: 1.6rem; font-weight: 700; color: var(--white); margin: 0 0 .5rem; }
.rss-hero__desc { color: var(--gray); font-size: .9rem; margin: 0; }

.rss-feed-url { background: rgba(255,255,255,.04); border: 1px solid var(--border); border-radius: var(--r-md); padding: 1.2rem; margin-bottom: 1.5rem; }
.rss-feed-url__label { display: block; font-family: var(--f-mono); font-size: .65rem; letter-spacing: .1em; text-transform: uppercase; color: var(--dim); margin-bottom: .5rem; }
.rss-feed-url__row { display: flex; gap: .5rem; }
.rss-feed-url__input { flex: 1; background: rgba(0,0,0,.3); border: 1px solid var(--border); border-radius: var(--r-sm); padding: .5rem .75rem; color: var(--white); font-family: var(--f-mono); font-size: .8rem; outline: none; }
.rss-feed-url__btn { white-space: nowrap; }

.rss-readers { margin-bottom: 1.5rem; }
.rss-readers__title { font-family: var(--f-mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--dim); margin: 0 0 .8rem; }
.rss-readers__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: .75rem; }
.rss-reader-card { display: flex; flex-direction: column; gap: .2rem; padding: 1rem; background: rgba(255,255,255,.03); border: 1px solid var(--border); border-radius: var(--r-md); text-decoration: none; transition: border-color .15s, background .15s; }
.rss-reader-card:hover { border-color: var(--cyan); background: rgba(6,182,212,.05); }
.rss-reader-card__icon { font-size: 1.4rem; margin-bottom: .2rem; }
.rss-reader-card strong { color: var(--white); font-size: .9rem; }
.rss-reader-card span:last-child { color: var(--dim); font-size: .75rem; }

.rss-what { background: rgba(255,255,255,.03); border: 1px solid var(--border); border-radius: var(--r-md); padding: 1.2rem; margin-bottom: 1.5rem; }
.rss-what__title { font-family: var(--f-mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--dim); margin: 0 0 .6rem; }
.rss-what p { color: var(--gray); font-size: .85rem; line-height: 1.6; margin: 0 0 .6rem; }
.rss-what p:last-child { margin-bottom: 0; }

.rss-also { margin-bottom: 2rem; }
.rss-also__title { font-family: var(--f-mono); font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--dim); margin: 0 0 .8rem; }
.rss-also__grid { display: flex; flex-wrap: wrap; gap: .6rem; }
.rss-also__link { display: inline-flex; align-items: center; gap: .5rem; padding: .5rem 1rem; border-radius: var(--r-sm); color: #fff; text-decoration: none; font-size: .85rem; font-weight: 500; transition: opacity .15s; }
.rss-also__link:hover { opacity: .85; color: #fff; }
.rss-also__link--telegram { background: #26a5e4; }
.rss-also__link--linkedin { background: #0a66c2; }
.rss-also__link--email { background: rgba(255,255,255,.1); color: var(--white); border: 1px solid var(--border); }

[data-theme="light"] .rss-hero__title { color: var(--fg); }
[data-theme="light"] .rss-feed-url { background: rgba(0,0,0,.02); }
[data-theme="light"] .rss-feed-url__input { background: #fff; color: var(--fg); }
[data-theme="light"] .rss-reader-card { background: rgba(0,0,0,.02); }
[data-theme="light"] .rss-reader-card strong { color: var(--fg); }
[data-theme="light"] .rss-what { background: rgba(0,0,0,.02); }
[data-theme="light"] .rss-also__link--email { background: rgba(0,0,0,.05); color: var(--fg); }

@media (max-width: 480px) {
  .rss-readers__grid { grid-template-columns: 1fr; }
  .rss-feed-url__row { flex-direction: column; }
}
</style>
