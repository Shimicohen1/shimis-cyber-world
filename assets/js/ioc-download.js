// IOC Download — Shimi's Cyber World
(function () {
  'use strict';

  var dataEl = document.getElementById('ioc-data');
  if (!dataEl) return;

  var iocs;
  try { iocs = JSON.parse(dataEl.textContent); } catch (e) { return; }
  if (!iocs || !iocs.length) return;

  var title = document.querySelector('.post-title');
  var slug = (title ? title.textContent.trim() : 'iocs').replace(/[^a-zA-Z0-9-]/g, '_').substring(0, 60);

  document.querySelectorAll('.ioc-download-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var format = btn.getAttribute('data-format');
      var content, filename, mime;

      if (format === 'csv') {
        content = 'id,type,indicator\n' + iocs.map(function (i) {
          return '"' + (i.id || '').replace(/"/g, '""') + '","' + (i.type || '').replace(/"/g, '""') + '","' + (i.indicator || '').replace(/"/g, '""') + '"';
        }).join('\n');
        filename = slug + '_iocs.csv';
        mime = 'text/csv';
      } else {
        content = JSON.stringify({
          title: title ? title.textContent.trim() : '',
          exported: new Date().toISOString(),
          source: 'Shimi\'s Cyber World',
          ioc_count: iocs.length,
          indicators: iocs
        }, null, 2);
        filename = slug + '_iocs.json';
        mime = 'application/json';
      }

      var blob = new Blob([content], { type: mime + ';charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });
})();
