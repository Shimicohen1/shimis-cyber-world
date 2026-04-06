/* Hardening Checklist Generator v2 — premium layer + auth-ready
   Preserves: platform tabs, filters, checkboxes, localStorage, progress, export */
(function () {
  'use strict';

  var activePlatform = null;
  var STORAGE_KEY = 'scw_harden_checked';
  var AUTH_KEY    = 'scw_auth';

  /* ── Auth helpers ── */
  function getAuth() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || null; }
    catch (e) { return null; }
  }
  function isPremium() {
    var auth = getAuth();
    return auth && auth.role === 'premium';
  }

  /* ── Persistence ── */
  function getChecked() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveChecked(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  /* ── Severity badge class ── */
  function sevBadge(sev) {
    if (sev === 'critical') return 'live';
    if (sev === 'high') return 'signal';
    return 'drop';
  }

  /* ── Escape HTML ── */
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /* ── Build premium section HTML ── */
  function buildPremiumSection(item) {
    if (!item.hasPremium) return '';
    var p = item.premium;
    var premium = isPremium();

    var html = '<div class="harden-premium">';
    html += '<button class="harden-premium__toggle" data-id="' + item.id + '">';
    html += '<span class="harden-premium__toggle-icon">▸</span>';
    html += '<span>Advanced Guidance</span>';
    if (!premium) html += '<span class="harden-premium__lock">🔒</span>';
    html += '</button>';

    html += '<div class="harden-premium__body" data-premium-id="' + item.id + '" style="display:none;">';

    if (premium) {
      if (p.attackPerspective) {
        html += '<div class="harden-premium__block">';
        html += '<h4 class="harden-premium__heading">⚔️ Attack Perspective</h4>';
        html += '<p class="harden-premium__text">' + esc(p.attackPerspective) + '</p>';
        html += '</div>';
      }
      if (p.implementationNotes) {
        html += '<div class="harden-premium__block">';
        html += '<h4 class="harden-premium__heading">🛠️ Implementation Notes</h4>';
        html += '<pre class="harden-premium__code"><code>' + esc(p.implementationNotes) + '</code></pre>';
        html += '</div>';
      }
      if (p.validationNotes) {
        html += '<div class="harden-premium__block">';
        html += '<h4 class="harden-premium__heading">✅ Validation Steps</h4>';
        html += '<pre class="harden-premium__code"><code>' + esc(p.validationNotes) + '</code></pre>';
        html += '</div>';
      }
      if (p.tuningNotes) {
        html += '<div class="harden-premium__block">';
        html += '<h4 class="harden-premium__heading">🎯 Tuning & False Positives</h4>';
        html += '<p class="harden-premium__text">' + esc(p.tuningNotes) + '</p>';
        html += '</div>';
      }
      if (p.advancedDetection) {
        html += '<div class="harden-premium__block">';
        html += '<h4 class="harden-premium__heading">🔍 Advanced Detection Logic</h4>';
        html += '<pre class="harden-premium__code"><code>' + esc(p.advancedDetection) + '</code></pre>';
        html += '</div>';
      }
      if (p.relatedIds && p.relatedIds.length) {
        html += '<div class="harden-premium__block">';
        html += '<h4 class="harden-premium__heading">🔗 Related Items</h4>';
        html += '<div class="harden-premium__related">';
        p.relatedIds.forEach(function (rid) {
          var rel = (window.HARDEN_ITEMS || []).find(function (r) { return r.id === rid; });
          if (rel) {
            html += '<span class="harden-premium__related-tag" data-goto="' + rid + '">' + esc(rel.id) + ': ' + esc(rel.title) + '</span>';
          }
        });
        html += '</div></div>';
      }

      html += '<div class="harden-premium__actions">';
      html += '<button class="btn btn--ghost btn--sm harden-premium__copy" data-id="' + item.id + '">📋 Copy Advanced Guidance</button>';
      html += '<button class="btn btn--ghost btn--sm harden-premium__export" data-id="' + item.id + '">📄 Export Full Playbook</button>';
      html += '</div>';

      html += '<p class="harden-premium__disclaimer">This content is provided for educational and guidance purposes only. Recommendations, configurations, and detection logic should always be validated in your own environment before deployment.</p>';
    } else {
      if (p.attackPerspective) {
        var teaser = p.attackPerspective.substring(0, 120);
        html += '<div class="harden-premium__block harden-premium__block--locked">';
        html += '<h4 class="harden-premium__heading">⚔️ Attack Perspective</h4>';
        html += '<p class="harden-premium__text harden-premium__text--fade">' + esc(teaser) + '…</p>';
        html += '</div>';
      }
      html += '<div class="harden-premium__locked-cta">';
      html += '<p>🔒 Unlock full guidance: attack perspective, implementation steps, validation commands, tuning notes' + (p.advancedDetection ? ', and detection logic' : '') + '.</p>';
      html += '<a href="/auth/signin/" class="btn btn--ghost btn--sm">Unlock Full Playbook</a>';
      html += '</div>';
    }

    html += '</div></div>';
    return html;
  }

  /* ── Render checklist ── */
  function renderChecklist(platform) {
    activePlatform = platform;
    var items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === platform; });
    var checked = getChecked();

    /* Show controls */
    document.getElementById('hardenCatFilters').style.display = '';
    document.getElementById('hardenSevFilters').style.display = '';
    document.getElementById('hardenProgress').style.display = '';
    document.getElementById('hardenStats').style.display = '';
    document.getElementById('hardenBreak').style.display = '';
    document.getElementById('hardenExport').style.display = '';

    /* Show auth banner for non-premium */
    var banner = document.getElementById('hardenAuthBanner');
    if (banner) {
      var hasPrem = items.some(function (i) { return i.hasPremium; });
      banner.style.display = (hasPrem && !isPremium()) ? '' : 'none';
    }

    /* Stats */
    var critCount = items.filter(function (i) { return i.severity === 'critical'; }).length;
    var highCount = items.filter(function (i) { return i.severity === 'high'; }).length;
    document.getElementById('hardenTotal').textContent = items.length;
    document.getElementById('hardenCritical').textContent = critCount;
    document.getElementById('hardenHigh').textContent = highCount;

    /* Active platform button */
    document.querySelectorAll('.harden-platform-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.platform === platform);
    });

    /* Reset filters */
    document.querySelectorAll('#hardenCatFilters .vault-filter, #hardenSevFilters .vault-filter').forEach(function (b) {
      b.classList.toggle('active', b.dataset.cat === 'all' || b.dataset.sev === 'all');
    });

    /* Build cards */
    var list = document.getElementById('hardenList');
    var html = '';
    items.forEach(function (item) {
      var isChecked = checked[item.id] ? 'checked' : '';
      html += '<div class="harden-item' + (checked[item.id] ? ' harden-item--done' : '') + (item.hasPremium ? ' harden-item--has-premium' : '') + '" data-id="' + item.id + '" data-cat="' + item.category + '" data-sev="' + item.severity + '">';
      html += '  <div class="harden-item__header">';
      html += '    <label class="harden-item__check"><input type="checkbox" ' + isChecked + ' data-id="' + item.id + '"><span class="harden-item__title">' + esc(item.title) + '</span></label>';
      html += '    <div class="harden-item__badges">';
      html += '      <span class="badge badge--' + sevBadge(item.severity) + '">' + item.severity + '</span>';
      html += '      <span class="tag">' + esc(item.category) + '</span>';
      if (item.hasPremium) {
        html += '      <span class="badge badge--premium" title="Advanced Guidance available">★</span>';
      }
      html += '    </div>';
      html += '  </div>';
      html += '  <p class="harden-item__desc">' + esc(item.description) + '</p>';
      html += '  <p class="harden-item__ref">📎 ' + esc(item.reference) + '</p>';
      if (item.command) {
        html += '  <div class="dl-rule__code harden-item__code">';
        html += '    <button class="dl-copy-btn" title="Copy command">📋</button>';
        html += '    <pre><code>' + esc(item.command.trim()) + '</code></pre>';
        html += '  </div>';
      }
      html += buildPremiumSection(item);
      html += '</div>';
    });
    list.innerHTML = html;

    updateProgress(items, checked);
  }

  /* ── Progress ── */
  function updateProgress(items, checked) {
    if (!items) {
      items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === activePlatform; });
    }
    if (!checked) checked = getChecked();

    var done = items.filter(function (i) { return checked[i.id]; }).length;
    var pct = items.length ? Math.round((done / items.length) * 100) : 0;

    document.getElementById('hardenProgressFill').style.width = pct + '%';
    document.getElementById('hardenProgressText').textContent = done + ' / ' + items.length + ' completed (' + pct + '%)';
    document.getElementById('hardenDone').textContent = done;
  }

  /* ── Filter ── */
  function applyFilters() {
    var activeCat = 'all';
    var activeSev = 'all';
    document.querySelectorAll('#hardenCatFilters .vault-filter.active').forEach(function (b) { activeCat = b.dataset.cat; });
    document.querySelectorAll('#hardenSevFilters .vault-filter.active').forEach(function (b) { activeSev = b.dataset.sev; });

    document.querySelectorAll('.harden-item').forEach(function (item) {
      var catMatch = activeCat === 'all' || item.dataset.cat === activeCat;
      var sevMatch = activeSev === 'all' || item.dataset.sev === activeSev;
      item.style.display = (catMatch && sevMatch) ? '' : 'none';
    });
  }

  /* ── Export ── */
  function exportMarkdown() {
    if (!activePlatform) return;
    var items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === activePlatform; });
    var checked = getChecked();
    var premium = isPremium();
    var lines = ['# Security Hardening Checklist — ' + activePlatform.toUpperCase(), ''];
    lines.push('Generated by [Shimi\'s Cyber World](https://shimiscyberworld.com/hardening/)', '');

    items.forEach(function (item) {
      var mark = checked[item.id] ? 'x' : ' ';
      lines.push('- [' + mark + '] **[' + item.severity.toUpperCase() + ']** ' + item.title);
      lines.push('  - ' + item.description);
      lines.push('  - Ref: ' + item.reference);
      if (item.command) {
        lines.push('  ```');
        lines.push('  ' + item.command.trim().split('\n').join('\n  '));
        lines.push('  ```');
      }
      if (premium && item.hasPremium && item.premium) {
        var p = item.premium;
        if (p.attackPerspective) lines.push('  **Attack Perspective:** ' + p.attackPerspective);
        if (p.implementationNotes) {
          lines.push('  **Implementation Notes:**');
          lines.push('  ```');
          lines.push('  ' + p.implementationNotes.split('\n').join('\n  '));
          lines.push('  ```');
        }
        if (p.validationNotes) {
          lines.push('  **Validation Steps:**');
          lines.push('  ```');
          lines.push('  ' + p.validationNotes.split('\n').join('\n  '));
          lines.push('  ```');
        }
        if (p.tuningNotes) lines.push('  **Tuning:** ' + p.tuningNotes);
        if (p.advancedDetection) {
          lines.push('  **Detection Logic:**');
          lines.push('  ```');
          lines.push('  ' + p.advancedDetection.split('\n').join('\n  '));
          lines.push('  ```');
        }
      }
      lines.push('');
    });

    return lines.join('\n');
  }

  function downloadMd() {
    var md = exportMarkdown();
    if (!md) return;
    var blob = new Blob([md], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'hardening-checklist-' + activePlatform + '.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyMd() {
    var md = exportMarkdown();
    if (!md) return;
    navigator.clipboard.writeText(md).then(function () {
      var btn = document.getElementById('hardenCopyMd');
      btn.textContent = '✅ Copied!';
      setTimeout(function () { btn.textContent = '📋 Copy as Markdown'; }, 1500);
    });
  }

  /* ── Export single item playbook ── */
  function exportItemPlaybook(itemId) {
    var item = (window.HARDEN_ITEMS || []).find(function (i) { return i.id === itemId; });
    if (!item || !item.premium) return;
    var p = item.premium;
    var lines = [
      '# Hardening Playbook: ' + item.title, '',
      '**Severity:** ' + item.severity.toUpperCase(),
      '**Category:** ' + item.category,
      '**Platform:** ' + item.platform,
      '**Reference:** ' + (item.reference || 'N/A'), '',
      '## Summary', item.description, ''
    ];
    if (item.command) lines.push('## Command', '```', item.command.trim(), '```', '');
    if (p.attackPerspective) lines.push('## Attack Perspective', p.attackPerspective, '');
    if (p.implementationNotes) lines.push('## Implementation Notes', '```', p.implementationNotes, '```', '');
    if (p.validationNotes) lines.push('## Validation Steps', '```', p.validationNotes, '```', '');
    if (p.tuningNotes) lines.push('## Tuning & False Positives', p.tuningNotes, '');
    if (p.advancedDetection) lines.push('## Detection Logic', '```', p.advancedDetection, '```', '');
    lines.push('---', 'Generated by [Shimi\'s Cyber World](https://shimiscyberworld.com/hardening/)');
    var md = lines.join('\n');
    var blob = new Blob([md], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'playbook-' + itemId + '.md';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ── Copy premium content ── */
  function copyPremiumContent(itemId) {
    var item = (window.HARDEN_ITEMS || []).find(function (i) { return i.id === itemId; });
    if (!item || !item.premium) return;
    var p = item.premium;
    var parts = [item.title + ' — Advanced Guidance\n'];
    if (p.attackPerspective) parts.push('Attack Perspective:\n' + p.attackPerspective + '\n');
    if (p.implementationNotes) parts.push('Implementation Notes:\n' + p.implementationNotes + '\n');
    if (p.validationNotes) parts.push('Validation Steps:\n' + p.validationNotes + '\n');
    if (p.tuningNotes) parts.push('Tuning:\n' + p.tuningNotes + '\n');
    if (p.advancedDetection) parts.push('Detection Logic:\n' + p.advancedDetection + '\n');
    navigator.clipboard.writeText(parts.join('\n'));
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    var platforms = document.getElementById('hardenPlatforms');
    if (!platforms) return;

    /* Platform select */
    platforms.addEventListener('click', function (e) {
      var btn = e.target.closest('.harden-platform-btn');
      if (!btn) return;
      renderChecklist(btn.dataset.platform);
    });

    /* Checkbox toggle */
    document.getElementById('hardenList').addEventListener('change', function (e) {
      if (e.target.type !== 'checkbox') return;
      var id = e.target.dataset.id;
      var checked = getChecked();
      if (e.target.checked) {
        checked[id] = true;
      } else {
        delete checked[id];
      }
      saveChecked(checked);

      var card = e.target.closest('.harden-item');
      if (card) card.classList.toggle('harden-item--done', e.target.checked);

      updateProgress();
    });

    /* Delegated click handler for the list */
    document.getElementById('hardenList').addEventListener('click', function (e) {
      /* Copy command */
      var copyBtn = e.target.closest('.dl-copy-btn');
      if (copyBtn) {
        var code = copyBtn.parentElement.querySelector('code');
        if (!code) return;
        navigator.clipboard.writeText(code.textContent).then(function () {
          copyBtn.textContent = '✅';
          setTimeout(function () { copyBtn.textContent = '📋'; }, 1200);
        });
        return;
      }

      /* Premium toggle */
      var toggleBtn = e.target.closest('.harden-premium__toggle');
      if (toggleBtn) {
        var tid = toggleBtn.dataset.id;
        var body = document.querySelector('[data-premium-id="' + tid + '"]');
        if (!body) return;
        var isOpen = body.style.display !== 'none';
        body.style.display = isOpen ? 'none' : '';
        var icon = toggleBtn.querySelector('.harden-premium__toggle-icon');
        if (icon) icon.textContent = isOpen ? '▸' : '▾';
        return;
      }

      /* Premium copy */
      var premCopy = e.target.closest('.harden-premium__copy');
      if (premCopy) {
        copyPremiumContent(premCopy.dataset.id);
        premCopy.textContent = '✅ Copied!';
        setTimeout(function () { premCopy.textContent = '📋 Copy Advanced Guidance'; }, 1500);
        return;
      }

      /* Premium export */
      var premExport = e.target.closest('.harden-premium__export');
      if (premExport) {
        exportItemPlaybook(premExport.dataset.id);
        return;
      }

      /* Related item navigation */
      var relTag = e.target.closest('.harden-premium__related-tag');
      if (relTag) {
        var targetId = relTag.dataset.goto;
        var targetEl = document.querySelector('[data-id="' + targetId + '"]');
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetEl.classList.add('harden-item--highlight');
          setTimeout(function () { targetEl.classList.remove('harden-item--highlight'); }, 2000);
        }
        return;
      }
    });

    /* Category filter */
    document.getElementById('hardenCatFilters').addEventListener('click', function (e) {
      var btn = e.target.closest('.vault-filter');
      if (!btn) return;
      this.querySelectorAll('.vault-filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });

    /* Severity filter */
    document.getElementById('hardenSevFilters').addEventListener('click', function (e) {
      var btn = e.target.closest('.vault-filter');
      if (!btn) return;
      this.querySelectorAll('.vault-filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });

    /* Export */
    document.getElementById('hardenExportMd').addEventListener('click', downloadMd);
    document.getElementById('hardenCopyMd').addEventListener('click', copyMd);
    document.getElementById('hardenReset').addEventListener('click', function () {
      if (!activePlatform) return;
      var checked = getChecked();
      var items = (window.HARDEN_ITEMS || []).filter(function (i) { return i.platform === activePlatform; });
      items.forEach(function (i) { delete checked[i.id]; });
      saveChecked(checked);
      renderChecklist(activePlatform);
    });

    /* Re-render when auth changes (from sign-in page) */
    window.addEventListener('storage', function (e) {
      if (e.key === AUTH_KEY && activePlatform) {
        renderChecklist(activePlatform);
      }
    });
  });
})();
