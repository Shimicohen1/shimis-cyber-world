/* Submit Startup — form validation + API submission */
(function () {
  var form = document.getElementById('submitForm');
  var success = document.getElementById('submitSuccess');
  var submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  if (!form) return;

  var API_URL = "https://scw-nl.azurewebsites.net/community-submit";

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {};
    var fields = form.querySelectorAll('input, select, textarea');
    var valid = true;
    fields.forEach(function (f) {
      if (f.required && !f.value.trim()) { valid = false; f.style.borderColor = 'var(--red)'; }
      else { f.style.borderColor = ''; }
      data[f.name] = f.value.trim();
    });
    if (!valid) return;

    // Disable button while submitting
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, data: j }; }); })
    .then(function (result) {
      if (result.ok) {
        form.style.display = 'none';
        success.style.display = '';
      } else {
        alert(result.data.error || 'Submission failed. Please try again.');
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit for Review'; }
      }
    })
    .catch(function () {
      alert('Network error. Please check your connection and try again.');
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit for Review'; }
    });
  });
})();
