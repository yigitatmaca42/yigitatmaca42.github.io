(function () {
  'use strict';

  var grid = document.getElementById('certGrid');
  if (!grid) return;

  var certificates = [
    { title: 'Siber Güvenliğe Giriş', platform: 'BTK Akademi', category: 'security' },
    { title: 'Web Uygulama Güvenliği ve Sızma Testi', platform: 'BTK Akademi', category: 'security' },
    { title: 'Güvenlik Duvarına Giriş', platform: 'BTK Akademi', category: 'security' },
    { title: 'Python ile Siber Güvenlik Uygulamaları', platform: 'BTK Akademi', category: 'security' },
    { title: 'Nesnelerin İnterneti (IoT) ve Güvenliği', platform: 'BTK Akademi', category: 'security' },
    { title: 'SIEM Temelleri', platform: 'BTK Akademi', category: 'security' },
    { title: 'Siber Olay Tespit ve Müdahale', platform: 'BTK Akademi', category: 'security' },
    { title: 'Siber Olaylara Müdahale', platform: 'BTK Akademi', category: 'security' },
    { title: 'Siber Güvenlikte Linux İşletim Sistemleri', platform: 'BTK Akademi', category: 'security' },
    { title: 'Ramazan Eğitimleri — Siber Güvenlik 101 Haftası', platform: 'Siber Kulüpler Birliği', category: 'security' },
    { title: 'Ramazan Eğitimleri — Siber Güvenlik 101 Haftası Sınavı', platform: 'Siber Kulüpler Birliği', category: 'security' },
    { title: 'Ramazan Eğitimleri — Offensive Security Haftası', platform: 'Siber Kulüpler Birliği', category: 'security' },
    { title: 'Ramazan Eğitimleri — Offensive Security Haftası Sınavı', platform: 'Siber Kulüpler Birliği', category: 'security' },
    { title: 'Ramazan Eğitimleri — Defensive Security Haftası', platform: 'Siber Kulüpler Birliği', category: 'security' },

    { title: 'Python Programlama Dili', platform: 'BTK Akademi', category: 'dev' },
    { title: 'Sıfırdan İleri Seviye Python Programlama', platform: 'BTK Akademi', category: 'dev' },
    { title: 'Versiyon Kontrolleri: Git ve GitHub', platform: 'BTK Akademi', category: 'dev' },
    { title: 'Kali Linux', platform: 'BTK Akademi', category: 'dev' },
    { title: 'Pardus Arayüz Kullanımı', platform: 'BTK Akademi', category: 'dev' },

    { title: 'SKY LAB Bootcamp', platform: 'SKY-SEC & Yıldız Teknik Üniversitesi', category: 'ctf' },
    { title: 'Cyber Apocalypse CTF 2026: The Salt Crown', platform: 'Hack The Box', category: 'ctf' },
    { title: 'Athena CTF 2026', platform: 'Astraq Cyber Defence', category: 'ctf' },
    { title: 'WolfCTF 2026', platform: 'İvedik OSB & Teknopark Ankara', category: 'ctf' },
    { title: 'Holmes CTF 2026: The Reichenbach Directive', platform: 'Hack The Box', category: 'ctf' },

    { title: 'Patent ve Faydalı Modellerin Korunması', platform: 'BTK Akademi', category: 'ip' },
    { title: 'Tasarımların Korunması', platform: 'BTK Akademi', category: 'ip' },
    { title: 'Coğrafi İşaretlerin Korunması', platform: 'BTK Akademi', category: 'ip' },
    { title: 'Markaların Korunması', platform: 'BTK Akademi', category: 'ip' }
  ];

  var categoryLabels = {
    security: 'Siber Güvenlik',
    dev: 'Yazılım & Sistem',
    ctf: 'CTF & Etkinlik',
    ip: 'Fikri Mülkiyet & Hukuk'
  };

  // Trusted, hardcoded icon markup only — never built from external/user data.
  var categoryIcons = {
    security: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    dev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ctf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 3v18" stroke-linecap="round"/><path d="M5 4h11l-2.5 3.5L16 11H5" stroke-linejoin="round"/></svg>',
    ip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v3M12 6l-5 9h10l-5-9zM12 6l5 9h-10l5-9z" stroke-linejoin="round"/><path d="M4 20h16M12 6v14" stroke-linecap="round"/></svg>'
  };

  var totalEl = document.getElementById('certTotal');
  if (totalEl) totalEl.textContent = certificates.length;

  var filterRow = document.getElementById('certFilters');
  var activeCategory = 'all';

  function buildCard(cert) {
    var card = document.createElement('div');
    card.className = 'card cert-card';

    var icon = document.createElement('div');
    icon.className = 'cert-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = categoryIcons[cert.category];

    var title = document.createElement('h3');
    title.textContent = cert.title;

    var platform = document.createElement('div');
    platform.className = 'cert-platform';
    platform.textContent = cert.platform;

    var category = document.createElement('div');
    category.className = 'cert-category';
    category.textContent = categoryLabels[cert.category];

    card.append(icon, title, platform, category);
    return card;
  }

  function renderGrid() {
    var items = activeCategory === 'all'
      ? certificates
      : certificates.filter(function (c) { return c.category === activeCategory; });

    grid.replaceChildren.apply(grid, items.map(buildCard));
  }

  function renderFilters() {
    var cats = ['all'].concat(Object.keys(categoryLabels));

    var buttons = cats.map(function (cat) {
      var label = cat === 'all' ? 'Tümü' : categoryLabels[cat];
      var count = cat === 'all' ? certificates.length : certificates.filter(function (c) { return c.category === cat; }).length;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cert-filter' + (cat === activeCategory ? ' is-active' : '');
      btn.setAttribute('data-cat', cat);
      btn.setAttribute('aria-pressed', String(cat === activeCategory));
      btn.textContent = label + ' (' + count + ')';
      btn.addEventListener('click', function () {
        activeCategory = cat;
        renderFilters();
        renderGrid();
      });
      return btn;
    });

    filterRow.replaceChildren.apply(filterRow, buttons);
  }

  renderFilters();
  renderGrid();
})();
