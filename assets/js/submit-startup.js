/* =====================================================
   Submit Startup — Form JS
   Shimi's Cyber World — Community Stage
   ===================================================== */

(function () {
  'use strict';

  var form          = document.getElementById('startup-form');
  var successPanel  = document.getElementById('success-panel');
  var submitAnother = document.getElementById('submit-another');

  /* ---------- Validation Helpers ---------- */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidUrl(url) {
    return /^https?:\/\/.+\..+/.test(url);
  }

  function getCheckedCategories() {
    var checked = [];
    document.querySelectorAll('input[name="categories"]:checked').forEach(function (cb) {
      checked.push(cb.value);
    });
    return checked;
  }

  function clearErrors() {
    document.querySelectorAll('.cs-field--error').forEach(function (el) {
      el.classList.remove('cs-field--error');
    });
  }

  function setError(fieldId) {
    var field = document.getElementById(fieldId);
    if (field) field.classList.add('cs-field--error');
  }

  /* ---------- Validate ---------- */
  function validate() {
    clearErrors();
    var valid = true;

    var name = document.getElementById('startup-name').value.trim();
    if (!name) { setError('field-name'); valid = false; }

    var website = document.getElementById('startup-website').value.trim();
    if (!website || !isValidUrl(website)) { setError('field-website'); valid = false; }

    var desc = document.getElementById('startup-desc').value.trim();
    if (!desc) { setError('field-description'); valid = false; }

    var cats = getCheckedCategories();
    if (cats.length === 0) { setError('field-categories'); valid = false; }

    var contactName = document.getElementById('contact-name').value.trim();
    if (!contactName) { setError('field-contact-name'); valid = false; }

    var email = document.getElementById('contact-email').value.trim();
    if (!email || !isValidEmail(email)) { setError('field-contact-email'); valid = false; }

    return valid;
  }

  /* ---------- Submit ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) {
      // Scroll to first error
      var firstError = document.querySelector('.cs-field--error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var submission = {
      id: generateSubmissionId(document.getElementById('startup-name').value.trim()),
      name: document.getElementById('startup-name').value.trim(),
      website: document.getElementById('startup-website').value.trim(),
      description: document.getElementById('startup-desc').value.trim(),
      categories: getCheckedCategories(),
      contactName: document.getElementById('contact-name').value.trim(),
      contactEmail: document.getElementById('contact-email').value.trim(),
      linkedin: document.getElementById('startup-linkedin').value.trim(),
      founderName: document.getElementById('founder-name').value.trim(),
      whyItMatters: document.getElementById('why-it-matters').value.trim(),
      stage: document.getElementById('startup-stage').value,
      additionalNotes: document.getElementById('additional-notes').value.trim(),
      insight: '',
      tags: [],
      label: 'Pending Review',
      featured: false,
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'pending'
    };

    // Future: replace with API call — POST /api/submissions
    // e.g. fetch('/api/submissions', { method: 'POST', body: JSON.stringify(submission) })
    saveSubmission(submission);

    // Show success
    form.style.display = 'none';
    successPanel.style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Submit Another ---------- */
  submitAnother.addEventListener('click', function () {
    form.reset();
    clearErrors();
    form.style.display = '';
    successPanel.style.display = 'none';
    window.scrollTo({ top: form.offsetTop - 120, behavior: 'smooth' });
  });

})();
