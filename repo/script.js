const resultsContainer = document.getElementById('results-container');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
const emptyMessage = document.getElementById('empty-message');

async function fetchImages(query) {
  // 1. Reset state visibility & Show Loading Indicator
  loadingSpinner.style.display = 'block';
  errorMessage.style.display = 'none';
  emptyMessage.style.display = 'none';
  resultsContainer.innerHTML = '';

  try {
    const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(query)}`);
    
    // 2. Handle HTTP Errors (e.g., 404, 500)
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    // 3. Handle Empty Results
    if (!data.results || data.results.length === 0) {
      emptyMessage.style.display = 'block';
      emptyMessage.textContent = 'No results found. Try searching for a different keyword.';
      return;
    }

    // Render results
    renderResults(data.results);

  } catch (error) {
    // 4. Handle Fetch/Network Errors
    console.error('Fetch error:', error);
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Failed to fetch results. Please check your connection and try again.';
  } finally {
    // Hide loading indicator regardless of success or failure
    loadingSpinner.style.display = 'none';
  }
}
