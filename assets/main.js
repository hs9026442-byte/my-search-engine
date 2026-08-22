// assets/main.js — shared logic for index + results
(function(){
  // Helpers
  function el(id){return document.getElementById(id)}
  function escapeHtml(text){const d=document.createElement('div');d.textContent=text;return d.innerHTML}

  // Index page quick buttons
  const quickBtns = document.querySelectorAll('.quick-btn');
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.dataset.q || btn.textContent;
      const input = document.querySelector('input[name="q"]') || document.querySelector('#q');
      if(input){input.value = q}
      // if on index page submit the nearest form
      const form = btn.closest('form') || document.querySelector('.search-form');
      if(form && form.action) form.submit();
    });
  });

  // Results page logic
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q');
  const resultArea = el('resultArea');
  const searchTitle = el('searchTitle');
  const qInput = el('q-results');
  const loadingState = el('loadingState');

  if(qInput){
    // wire search button
    const btn = el('btn-search');
    btn.addEventListener('click', () => {
      const val = qInput.value.trim();
      if(val) {
        // navigate to same page with query param for simplicity
        const url = window.location.pathname + '?q=' + encodeURIComponent(val);
        window.location.href = url;
      }
    });
  }

  if(query !== null){
    if(qInput) qInput.value = query;
    if(searchTitle) searchTitle.textContent = 'Results for: ' + query;
    fetchResult(query);
  } else {
    // no query: prompt
    if(resultArea) resultArea.innerHTML = '<div class="card"><p>Type something in the search box to begin.</p></div>';
  }

  async function fetchResult(q){
    if(!resultArea) return;
    resultArea.innerHTML = '';
    const loading = document.createElement('div');
    loading.className = 'card loading';
    loading.innerHTML = '<div class="spinner" aria-hidden="true"></div><p>Loading results…</p>';
    resultArea.appendChild(loading);

    // Use Wikipedia summary API as a small demo source
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(q);
    try{
      const resp = await fetch(url);
      if(!resp.ok) throw new Error('No result');
      const data = await resp.json();
      resultArea.innerHTML = '';

      const card = document.createElement('div');
      card.className = 'card';
      const title = data.title || q;
      const extract = data.extract || 'No description was found.';
      const pageUrl = data.content_urls?.desktop?.page || '';

      card.innerHTML = '\n        <h3>' + escapeHtml(title) + '</h3>\n        <p>' + escapeHtml(extract) + '</p>\n      ';
      if(pageUrl){
        const a = document.createElement('a');
        a.href = pageUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = 'Read more on Wikipedia →';
        card.appendChild(a);
      }
      resultArea.appendChild(card);
    } catch(err){
      resultArea.innerHTML = '';
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = '<h3>No result found</h3><p>ByteSearch couldn\'t find information about "' + escapeHtml(q) + '".</p>';
      resultArea.appendChild(card);
    }
  }
})();
