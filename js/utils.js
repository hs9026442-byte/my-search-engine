/* ============================================
   UTILITY FUNCTIONS - Shared across pages
   ============================================ */

/**
 * Escapes HTML special characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML string
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Validates if a string is a valid URL
 * @param {string} string - String to validate
 * @returns {boolean} True if valid URL
 */
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Trims whitespace from input and validates
 * @param {string} input - Input to trim
 * @returns {string} Trimmed input
 */
function sanitizeInput(input) {
    return input.trim();
}

/**
 * Gets URL parameters from query string
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
function getUrlParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

/**
 * Handles API errors gracefully
 * @param {Error} error - Error object
 * @param {string} message - Custom error message
 * @returns {object} Error response object
 */
function handleError(error, message = 'An error occurred') {
    console.error(message, error);
    return {
        success: false,
        message: message,
        error: error
    };
}

/**
 * Debounce function to limit function execution
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Creates an error element for display
 * @param {string} message - Error message
 * @returns {HTMLElement} Error element
 */
function createErrorElement(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'result';
    errorDiv.innerHTML = `
        <h3>⚠️ Error</h3>
        <p>${escapeHtml(message)}</p>
    `;
    return errorDiv;
}

/**
 * Logs events for analytics (placeholder)
 * @param {string} eventName - Event name
 * @param {object} data - Event data
 */
function logEvent(eventName, data = {}) {
    if (process.env.NODE_ENV === 'development') {
        console.log(`Event: ${eventName}`, data);
    }
}
