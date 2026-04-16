// Shimi's Cyber World — Main JS
(function () {
  'use strict';

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  // --- Nav dropdown ---
  document.querySelectorAll('.nav-dropdown').forEach(function (dd) {
    var btn = dd.querySelector('.nav-dropdown__toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = dd.classList.contains('open');
      // Close all other dropdowns
      document.querySelectorAll('.nav-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
      if (!wasOpen) dd.classList.add('open');
      btn.setAttribute('aria-expanded', !wasOpen);
    });
  });
  // Close dropdown on outside click
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
      d.classList.remove('open');
      d.querySelector('.nav-dropdown__toggle').setAttribute('aria-expanded', 'false');
    });
  });

  // --- Scroll reveal ---
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: show everything
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // --- Theme toggle ---
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var html = document.documentElement;
      var isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.removeAttribute('data-theme');
        localStorage.setItem('scw-theme', 'dark');
      } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('scw-theme', 'light');
      }
    });
  }

  // --- Active nav highlighting ---
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var linkPath = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (currentPath === linkPath) {
      link.classList.add('active');
    }
  });

  // --- Signal card expand/collapse ---
  document.querySelectorAll('.signal-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('.signal-card__link')) return;
      card.classList.toggle('open');
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('open');
      }
    });
  });

})();
