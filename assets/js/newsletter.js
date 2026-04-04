/**
 * newsletter.js — Newsletter signup handler
 *
 * Submits email to Brevo (Sendinblue) Contacts API.
 * Falls back to localStorage collection if API key is not configured.
 *
 * To activate Brevo:
 * 1. Sign up at https://app.brevo.com
 * 2. Get an API key from Settings > SMTP & API > API Keys
 * 3. Create a contact list (note the list ID)
 * 4. Set BREVO_API_KEY and BREVO_LIST_ID below
 */

(function () {
  // ── Brevo config ──
  // Replace with your real Brevo API key and list ID when ready
  var BREVO_API_KEY = "";   // e.g. "xkeysib-xxxx..."
  var BREVO_LIST_ID = null; // e.g. 2

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
      if (btnText) btnText.style.display = "none";
      if (btnLoading) btnLoading.style.display = "inline";

      if (BREVO_API_KEY) {
        // ── Submit to Brevo API ──
        var body = {
          email: email,
          updateEnabled: true,
          attributes: { SOURCE: "scw-website", SIGNUP_PAGE: window.location.pathname },
        };
        if (BREVO_LIST_ID) body.listIds = [BREVO_LIST_ID];

        fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "api-key": BREVO_API_KEY,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        })
          .then(function (r) {
            if (r.ok || r.status === 204) return { ok: true };
            return r.json().then(function (d) {
              if (d.code === "duplicate_parameter") return { ok: true, duplicate: true };
              throw new Error(d.message || "Signup failed");
            });
          })
          .then(function (result) {
            saveLocal(email);
            showStatus(status, "You're in! Welcome to the community. ✓", "success");
            emailInput.value = "";
            trackSignup(email);
          })
          .catch(function (err) {
            showStatus(status, "Something went wrong. Try again.", "error");
            console.error("[Newsletter]", err);
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
    if (btnText) btnText.style.display = "inline";
    if (btnLoading) btnLoading.style.display = "none";
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
