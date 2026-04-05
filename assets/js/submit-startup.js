/* Submit Startup — form validation + localStorage save */
(function () {
  var form = document.getElementById('submitForm');
  var success = document.getElementById('submitSuccess');
  if (!form) return;

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

    var submissions = [];
    try { submissions = JSON.parse(localStorage.getItem('scw_community_submissions') || '[]'); } catch (_) {}
    data.submitted = new Date().toISOString();
    submissions.push(data);
    localStorage.setItem('scw_community_submissions', JSON.stringify(submissions));

    form.style.display = 'none';
    success.style.display = '';
  });
})();
