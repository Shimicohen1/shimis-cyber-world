/**
 * analytics.js — GA4 event tracking for SCW
 *
 * Tracks: affiliate_click, tool_click, premium_click
 * Uses data-track attributes on links for categorization.
 * Auto-detects sponsored/affiliate links by URL patterns.
 */

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-3QRH1ZBFH9');

document.addEventListener('click', function (e) {
  var link = e.target.closest('a');
  if (!link) return;

  var href = link.getAttribute('href') || '';
  var text = (link.textContent || '').trim().substring(0, 100);
  var path = window.location.pathname;
  var track = link.dataset.track;

  // Explicit data-track attributes
  if (track === 'affiliate' || track === 'tool' || track === 'premium') {
    gtag('event', track + '_click', {
      link_url: href,
      link_text: text,
      page_path: path
    });
    return;
  }

  // Auto-detect affiliate links by URL pattern
  if (
    href.indexOf('impact.com') !== -1 ||
    href.indexOf('ref=') !== -1 ||
    href.indexOf('affiliate') !== -1 ||
    href.indexOf('?tag=') !== -1 ||
    href.indexOf('partnerize') !== -1
  ) {
    gtag('event', 'affiliate_click', {
      link_url: href,
      link_text: text,
      page_path: path
    });
    return;
  }

  // Auto-detect sponsored tool cards
  if (link.classList.contains('tool-card--sponsored') || link.closest('.tool-card--sponsored')) {
    gtag('event', 'tool_click', {
      link_url: href,
      link_text: text,
      page_path: path,
      sponsored: true
    });
    return;
  }

  // Track all external link clicks
  if (href.indexOf('http') === 0 && href.indexOf(window.location.hostname) === -1) {
    gtag('event', 'outbound_click', {
      link_url: href,
      link_text: text,
      page_path: path
    });
  }
});
