(function () {
  'use strict';

  var listEl = document.getElementById('writeupList');
  if (!listEl || !window.WRITEUPS_DATA) return;

  var data = window.WRITEUPS_DATA;

  var categoryLabels = {
    Web: 'Web', Crypto: 'Crypto', Forensics: 'Forensics', OSINT: 'OSINT',
    Reverse: 'Reverse Eng.', Pwn: 'Pwn', Stego: 'Steganography', Misc: 'Misc',
    Mobile: 'Mobile', Malware: 'Malware', IoT: 'IoT', Cloud: 'Cloud',
    Blockchain: 'Blockchain', AI: 'AI'
  };

  var searchInput = document.getElementById('writeupSearch');
  var categoryRow = document.getElementById('writeupCategoryFilters');
  var difficultyRow = document.getElementById('writeupDifficultyFilters');
  var countEl = document.getElementById('writeupCount');
  var emptyState = document.getElementById('writeupEmptyState');

  var state = { query: '', category: 'all', difficulty: 'all' };

  var arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M8 7h9v9" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function difficultyClass(d) {
    if (d === 'Kolay') return 'diff-kolay';
    if (d === 'Orta') return 'diff-orta';
    if (d === 'Zor') return 'diff-zor';
    return '';
  }

  function buildRow(item) {
    var row = document.createElement('a');
    row.className = 'writeup-row';
    row.href = item.url;
    row.target = '_blank';
    row.rel = 'noopener noreferrer';

    var cat = document.createElement('span');
    cat.className = 'wr-category';
    cat.textContent = categoryLabels[item.category] || item.category;

    var name = document.createElement('span');
    name.className = 'wr-name';
    name.textContent = item.name;
    if (item.description) {
      var desc = document.createElement('span');
      desc.className = 'wr-desc';
      desc.textContent = item.description;
      name.appendChild(desc);
    }

    var diff = document.createElement('span');
    diff.className = 'wr-difficulty ' + difficultyClass(item.difficulty);
    var dot = document.createElement('span');
    dot.className = 'dot';
    diff.append(dot, document.createTextNode(item.difficulty || '—'));

    var points = document.createElement('span');
    points.className = 'wr-points';
    points.textContent = item.points ? item.points + ' p' : '';

    var arrow = document.createElement('span');
    arrow.className = 'wr-arrow';
    arrow.innerHTML = arrowSvg; // trusted static markup, not from data

    row.append(cat, name, diff, points, arrow);
    return row;
  }

  function applyFilters() {
    var q = state.query.trim().toLowerCase();
    return data.filter(function (item) {
      if (state.category !== 'all' && item.category !== state.category) return false;
      if (state.difficulty !== 'all' && item.difficulty !== state.difficulty) return false;
      if (q && item.name.toLowerCase().indexOf(q) === -1 && item.category.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
  }

  function render() {
    var filtered = applyFilters();
    listEl.replaceChildren.apply(listEl, filtered.map(buildRow));
    countEl.textContent = filtered.length + ' / ' + data.length + ' writeup';
    emptyState.hidden = filtered.length !== 0;
    listEl.hidden = filtered.length === 0;
  }

  function buildFilterButton(label, value, group, activeValue) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cert-filter' + (value === activeValue ? ' is-active' : '');
    btn.setAttribute('data-value', value);
    btn.setAttribute('aria-pressed', String(value === activeValue));
    btn.textContent = label;
    btn.addEventListener('click', function () {
      state[group] = value;
      renderFilters();
      render();
    });
    return btn;
  }

  function renderFilters() {
    var categories = ['all'].concat(Array.from(new Set(data.map(function (i) { return i.category; }))).sort());
    var catButtons = categories.map(function (c) {
      var label = c === 'all' ? 'Tümü' : (categoryLabels[c] || c);
      var count = c === 'all' ? data.length : data.filter(function (i) { return i.category === c; }).length;
      return buildFilterButton(label + ' (' + count + ')', c, 'category', state.category);
    });
    categoryRow.replaceChildren.apply(categoryRow, catButtons);

    var difficulties = ['all', 'Kolay', 'Orta', 'Zor'];
    var diffButtons = difficulties.map(function (d) {
      var label = d === 'all' ? 'Tüm Seviyeler' : d;
      return buildFilterButton(label, d, 'difficulty', state.difficulty);
    });
    difficultyRow.replaceChildren.apply(difficultyRow, diffButtons);
  }

  var searchTimer = null;
  searchInput.addEventListener('input', function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.query = searchInput.value;
      render();
    }, 120);
  });

  renderFilters();
  render();
})();
