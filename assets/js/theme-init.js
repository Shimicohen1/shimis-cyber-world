// Theme initializer — runs synchronously before paint to prevent FOUC
(function() {
  var t = localStorage.getItem('scw-theme');
  if (t === 'light' || (!t && window.matchMedia('(prefers-color-scheme: light)').matches)) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
