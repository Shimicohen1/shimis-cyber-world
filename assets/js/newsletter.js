/**
 * newsletter.js — Newsletter signup handler
 *
 * Submits email to the SCW feed engine's newsletter API on Azure.
 * Falls back to localStorage if the API is unreachable.
 */

(function () {
  // ── API endpoint (Azure Container Instance) ──
  var NEWSLETTER_API = "https://scw-newsletter.azurewebsites.net/newsletter";

  // Find all newsletter forms on the page
  var forms = document.querySelectorAll(".js-newsletter-form");
  if (!forms.length) return;

  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var emailInput = form.querySelector(".newsletter__input");
      var btn = form.querySelector(".newsletter__btn");
      var status = form.querySelector(".newsletter__status");
      var btnText = btn.querySelector(".newsletter__btn-text");
      var btnLoading = btn.querySelector(".newsletter__btn-loading");

      var email = (emailInput.value || "").trim().toLowerCase();
      if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showStatus(status, "Please enter a valid email.", "error");
        return;
      }

      // Check if already subscribed (localStorage)
      var subs = JSON.parse(localStorage.getItem("scw_newsletter") || "[]");
      if (subs.indexOf(email) !== -1) {
        showStatus(status, "You're already subscribed! ✓", "success");
        return;
      }

      // UI: loading state
      btn.disabled = true;
      if (btnText) btnText.hidden = true;
      if (btnLoading) btnLoading.hidden = false;

      if (NEWSLETTER_API) {
        // ── Submit to Azure newsletter API ──
        fetch(NEWSLETTER_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
        })
          .then(function (r) {
            if (r.ok) return r.json();
            return r.json().then(function (d) {
              throw new Error(d.error || "Signup failed");
            });
          })
          .then(function (result) {
            saveLocal(email);
            showStatus(status, "You're in! Welcome to the community. \u2713", "success");
            emailInput.value = "";
            trackSignup(email);
          })
          .catch(function (err) {
            // Fallback: save locally if API is down
            saveLocal(email);
            showStatus(status, "You're in! Welcome to the community. \u2713", "success");
            emailInput.value = "";
            trackSignup(email);
            console.warn("[Newsletter] API unreachable, saved locally:", err.message);
          })
          .finally(function () {
            resetBtn(btn, btnText, btnLoading);
          });
      } else {
        // ── Fallback: localStorage only ──
        setTimeout(function () {
          saveLocal(email);
          showStatus(status, "You're in! Welcome to the community. ✓", "success");
          emailInput.value = "";
          trackSignup(email);
          resetBtn(btn, btnText, btnLoading);
        }, 600);
      }
    });
  });

  function saveLocal(email) {
    var subs = JSON.parse(localStorage.getItem("scw_newsletter") || "[]");
    if (subs.indexOf(email) === -1) subs.push(email);
    localStorage.setItem("scw_newsletter", JSON.stringify(subs));
  }

  function showStatus(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = "newsletter__status newsletter__status--" + type;
  }

  function resetBtn(btn, btnText, btnLoading) {
    btn.disabled = false;
    if (btnText) btnText.hidden = false;
    if (btnLoading) btnLoading.hidden = true;
  }

  function trackSignup(email) {
    // GA4 event
    if (typeof gtag === "function") {
      gtag("event", "newsletter_signup", {
        event_category: "engagement",
        event_label: window.location.pathname,
      });
    }
  }

  // ── Show "already subscribed" state on page load ──
  var subs = JSON.parse(localStorage.getItem("scw_newsletter") || "[]");
  if (subs.length > 0) {
    forms.forEach(function (form) {
      var status = form.querySelector(".newsletter__status");
      if (status && !status.textContent) {
        showStatus(status, "You're subscribed ✓", "success");
      }
    });
  }
})();
