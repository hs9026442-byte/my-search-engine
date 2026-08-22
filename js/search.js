/* ============================================
   MAIN PAGE FUNCTIONALITY - index.html
   ============================================ */

/**
 * Performs a search and redirects to results page
 * Validates input and uses encodeURIComponent for safety
 */
function search() {
    const searchBox = document.getElementById('searchBox');
    const query = sanitizeInput(searchBox.value);

    // Validate input
    if (!query) {
        console.warn('Empty search query');
        searchBox.focus();
        return;
    }

    // Prevent XSS attacks
    const encodedQuery = encodeURIComponent(query);

    // Log the search event
    logEvent('search', { query: query });

    // Redirect to results page
    try {
        window.location.href = 'results.html?q=' + encodedQuery;
    } catch (error) {
        console.error('Navigation error:', error);
        alert('Failed to perform search. Please try again.');
    }
}

/**
 * Performs a quick search with predefined query
 * @param {string} site - Site or search term
 */
function quickSearch(site) {
    const searchBox = document.getElementById('searchBox');
    searchBox.value = site;
    search();
}

/**
 * Initializes event listeners when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function () {
    const searchBox = document.getElementById('searchBox');
    const searchButton = document.querySelector('.search-area button');

    // Focus on search box for better UX
    searchBox.focus();

    // Enter key listener
    searchBox.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            search();
        }
    });

    // Button click listener
    if (searchButton) {
        searchButton.addEventListener('click', search);
    }

    console.log('Main page initialized');
});
