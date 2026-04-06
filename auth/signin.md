---
layout: page
title: Sign In
permalink: /auth/signin/
---

<div class="auth-page">
  <div class="auth-card">
    <h2>Sign In to SCW</h2>
    <p>Access advanced hardening guidance, detection logic, and full playbooks.</p>

    <div id="authForm">
      <div class="auth-field">
        <label for="authEmail">Email</label>
        <input type="email" id="authEmail" placeholder="you@company.com" autocomplete="email">
      </div>
      <div class="auth-field">
        <label for="authPassword">Password</label>
        <input type="password" id="authPassword" placeholder="••••••••" autocomplete="current-password">
      </div>
      <button id="authSubmit" class="btn btn--primary auth-submit">Sign In</button>
      <p class="auth-error" id="authError">Invalid credentials. Try again.</p>
    </div>

    <div class="auth-status" id="authStatus">
      <p id="authStatusText"></p>
      <button id="authSignout" class="btn btn--ghost btn--sm auth-signout">Sign Out</button>
    </div>

    <div class="auth-demo">
      <h4>Demo Accounts</h4>
      <code>
        Free:&nbsp;&nbsp;&nbsp;&nbsp;free@scw.local / password123<br>
        Premium: premium@scw.local / password123
      </code>
    </div>
  </div>
</div>

<link rel="stylesheet" href="/assets/css/premium-tools.css?v=5">

<script>
(function () {
  'use strict';

  var AUTH_KEY = 'scw_auth';
  var USERS = {
    'free@scw.local':    { password: 'password123', role: 'free',    name: 'Free User' },
    'premium@scw.local': { password: 'password123', role: 'premium', name: 'Premium User' }
  };

  function getAuth() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || null; }
    catch (e) { return null; }
  }

  function showStatus() {
    var auth = getAuth();
    var form = document.getElementById('authForm');
    var status = document.getElementById('authStatus');
    if (auth) {
      form.style.display = 'none';
      status.style.display = '';
      document.getElementById('authStatusText').textContent =
        'Signed in as ' + auth.name + ' (' + auth.role + ')';
    } else {
      form.style.display = '';
      status.style.display = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    showStatus();

    document.getElementById('authSubmit').addEventListener('click', function () {
      var email = document.getElementById('authEmail').value.trim().toLowerCase();
      var pass  = document.getElementById('authPassword').value;
      var err   = document.getElementById('authError');

      var user = USERS[email];
      if (!user || user.password !== pass) {
        err.style.display = '';
        return;
      }

      err.style.display = 'none';
      var session = { email: email, role: user.role, name: user.name };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      showStatus();
    });

    document.getElementById('authPassword').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') document.getElementById('authSubmit').click();
    });

    document.getElementById('authSignout').addEventListener('click', function () {
      localStorage.removeItem(AUTH_KEY);
      showStatus();
    });
  });
})();
</script>
