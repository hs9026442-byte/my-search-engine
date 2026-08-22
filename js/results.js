/* ============================================
   RESULTS PAGE FUNCTIONALITY - results.html
   ============================================ */

// Get elements
const searchBox = document.getElementById('searchBox');
const searchTitle = document.getElementById('searchTitle');
const resultContent = document.getElementById('resultContent');

// Get search query from URL
const query = getUrlParam('q');

/**
 * Fetches search results from Wikipedia API with images
 * @param {string} query - Search query
 */
async function getResult(query) {
    if (!query) {
        resultContent.innerHTML = '<p class="loading">No search query provided.</p>';
        return;
    }

    try {
        // Set loading state
        resultContent.innerHTML = '<p class="loading">Loading results...</p>';
        resultContent.className = 'result loading';

        // Wikipedia API endpoint for page summary
        const apiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(query);

        // Fetch from Wikipedia
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'ByteSearch (https://github.com/hs9026442-byte/my-search-engine)'
            }
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        // Process successful response
        if (data && data.title) {
            // Try to get image from page
            await fetchAndDisplayResult(data, query);
            logEvent('search_success', { query: query });
        } else {
            displayNoResult(query);
        }

    } catch (error) {
        console.error('Search error:', error);
        displayNoResult(query);
        logEvent('search_error', { query: query, error: error.message });
    }
}

/**
 * Fetches image and displays complete result
 * @param {object} data - Wikipedia API response data
 * @param {string} query - Search query
 */
async function fetchAndDisplayResult(data, query) {
    try {
        // Get page image from Wikipedia
        const imageUrl = await getWikipediaImage(data.title);
        displayResult(data, imageUrl);
    } catch (error) {
        console.warn('Could not fetch image:', error);
        // Display result without image if image fetch fails
        displayResult(data, null);
    }
}

/**
 * Fetches image URL from Wikipedia page
 * @param {string} pageTitle - Wikipedia page title
 * @returns {string|null} Image URL or null
 */
async function getWikipediaImage(pageTitle) {
    try {
        const imageApiUrl = 'https://en.wikipedia.org/api/rest_v1/page/media/' + encodeURIComponent(pageTitle);
        
        const response = await fetch(imageApiUrl, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'ByteSearch (https://github.com/hs9026442-byte/my-search-engine)'
            }
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();

        // Look for the first image in the media list
        if (data.items && data.items.length > 0) {
            for (let item of data.items) {
                // Prefer images (jpg, png) over other media
                if (item.type === 'image' && item.srcset) {
                    // Get the highest quality version
                    const srcset = item.srcset;
                    if (srcset && srcset.length > 0) {
                        // Return the URL with the best quality
                        return srcset[srcset.length - 1].src;
                    }
                }
            }
        }
        return null;
    } catch (error) {
        console.warn('Error fetching Wikipedia image:', error);
        return null;
    }
}

/**
 * Displays search result on page with optional image
 * @param {object} data - Wikipedia API response data
 * @param {string|null} imageUrl - Image URL or null
 */
function displayResult(data, imageUrl) {
    const readMoreUrl = data.content_urls?.desktop?.page || '';
    const extract = data.extract || 'No description available.';
    const title = data.title || '';

    resultContent.className = 'result';
    
    let imageHtml = '';
    if (imageUrl) {
        imageHtml = `
            <div class="result-image-container">
                <img 
                    src="${escapeHtml(imageUrl)}" 
                    alt="${escapeHtml(title)}" 
                    class="result-image"
                    loading="lazy"
                    onerror="this.parentElement.style.display='none'"
                >
            </div>
        `;
    }

    resultContent.innerHTML = `
        ${imageHtml}
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(extract)}</p>
        ${readMoreUrl ? `
            <a href="${escapeHtml(readMoreUrl)}" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="Read more about ${escapeHtml(title)} on Wikipedia">
                Read more on Wikipedia →
            </a>
        ` : ''}
    `;
}

/**
 * Displays "no results found" message
 * @param {string} query - Original search query
 */
function displayNoResult(query) {
    resultContent.className = 'result';
    resultContent.innerHTML = `
        <h3>No results found</h3>
        <p>ByteSearch couldn't find information about "${escapeHtml(query)}".</p>
        <p style="margin-top: 15px; color: #9db1ca; font-size: 14px;">
            Try a different search term or check your spelling.
        </p>
    `;
}

/**
 * Performs a new search from results page
 */
function searchAgain() {
    const newQuery = sanitizeInput(searchBox.value);

    if (!newQuery) {
        searchBox.focus();
        return;
    }

    const encodedQuery = encodeURIComponent(newQuery);
    logEvent('search_again', { query: newQuery });

    try {
        window.location.href = 'results.html?q=' + encodedQuery;
    } catch (error) {
        console.error('Navigation error:', error);
        alert('Failed to perform search. Please try again.');
    }
}

/**
 * Initializes the results page
 */
document.addEventListener('DOMContentLoaded', function () {
    if (query) {
        searchBox.value = query;
        searchTitle.textContent = `Results for: ${escapeHtml(query)}`;
        getResult(query);
    } else {
        resultContent.className = 'result';
        resultContent.innerHTML = '<p>Type something in the search box to begin.</p>';
    }

    // Set up event listeners
    const searchButton = document.querySelector('.search-area button');

    searchBox.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            searchAgain();
        }
    });

    if (searchButton) {
        searchButton.addEventListener('click', searchAgain);
    }

    console.log('Results page initialized');
});
