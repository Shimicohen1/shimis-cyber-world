/* =====================================================
   Community Storage — localStorage helper
   Shimi's Cyber World — Community Stage
   ===================================================== */

const STORAGE_KEY = 'scwCommunitySubmissions';

/**
 * Get all submissions from localStorage
 * @returns {Array} parsed submissions array
 */
function getSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save a new submission to localStorage
 * @param {Object} submission — the submission object
 */
function saveSubmission(submission) {
  // Future: replace with API call — POST /api/submissions
  const submissions = getSubmissions();
  submissions.push(submission);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

/**
 * Get only approved submissions (status === 'approved')
 * @returns {Array} approved submissions
 */
function getApprovedSubmissions() {
  return getSubmissions().filter(function (s) { return s.status === 'approved'; });
}

/**
 * Clear all submissions (admin/debug helper)
 */
function clearSubmissions() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Generate a URL-safe id from a name + timestamp
 * @param {string} name
 * @returns {string} id slug
 */
function generateSubmissionId(name) {
  var slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return slug + '-' + Date.now().toString(36);
}
