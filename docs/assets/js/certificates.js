(function () {
  'use strict';

  var grid = document.getElementById('certGrid');
  if (!grid) return;

  var certificates = [
    { icon: '🔐', title: 'Siber Güvenliğe Giriş', platform: 'BTK Akademi', category: 'security' },
    { icon: '🌐', title: 'Web Uygulama Güvenliği ve Sızma Testi', platform: 'BTK Akademi', category: 'security' },
    { icon: '🛡️', title: 'Güvenlik Duvarına Giriş', platform: 'BTK Akademi', category: 'security' },
    { icon: '🐍', title: 'Python ile Siber Güvenlik Uygulamaları', platform: 'BTK Akademi', category: 'security' },
    { icon: '🔌', title: 'Nesnelerin İnterneti (IoT) ve Güvenliği', platform: 'BTK Akademi', category: 'security' },
    { icon: '🔍', title: 'SIEM Temelleri', platform: 'BTK Akademi', category: 'security' },
    { icon: '🎯', title: 'Siber Olay Tespit ve Müdahale', platform: 'BTK Akademi', category: 'security' },
    { icon: '⚡', title: 'Siber Olaylara Müdahale', platform: 'BTK Akademi', category: 'security' },
    { icon: '🐧', title: 'Siber Güvenlikte Linux İşletim Sistemleri', platform: 'BTK Akademi', category: 'security' },
    { icon: '🛡️', title: 'Ramazan Eğitimleri — Siber Güvenlik 101 Haftası', platform: 'Siber Kulüpler Birliği', category: 'security' },
    { icon: '🏆', title: 'Ramazan Eğitimleri — Siber Güvenlik 101 Haftası Sınavı', platform: 'Siber Kulüpler Birliği', category: 'security' },
    { icon: '⚔️', title: 'Ramazan Eğitimleri — Offensive Security Haftası', platform: 'Siber Kulüpler Birliği', category: 'security' },
    { icon: '🎯', title: 'Ramazan Eğitimleri — Offensive Security Haftası Sınavı', platform: 'Siber Kulüpler Birliği', category: 'security' },
    { icon: '🔰', title: 'Ramazan Eğitimleri — Defensive Security Haftası', platform: 'Siber Kulüpler Birliği', category: 'security' },

    { icon: '🐍', title: 'Python Programlama Dili', platform: 'BTK Akademi', category: 'dev' },
    { icon: '🐍', title: 'Sıfırdan İleri Seviye Python Programlama', platform: 'BTK Akademi', category: 'dev' },
    { icon: '🔀', title: 'Versiyon Kontrolleri: Git ve GitHub', platform: 'BTK Akademi', category: 'dev' },
    { icon: '🐉', title: 'Kali Linux', platform: 'BTK Akademi', category: 'dev' },
    { icon: '🖥️', title: 'Pardus Arayüz Kullanımı', platform: 'BTK Akademi', category: 'dev' },

    { icon: '🚀', title: 'SKY LAB Bootcamp', platform: 'SKY-SEC & Yıldız Teknik Üniversitesi', category: 'ctf' },
    { icon: '👑', title: 'Cyber Apocalypse CTF 2026: The Salt Crown', platform: 'Hack The Box', category: 'ctf' },
    { icon: '🦉', title: 'Athena CTF 2026', platform: 'Astraq Cyber Defence', category: 'ctf' },
    { icon: '🐺', title: 'WolfCTF 2026', platform: 'İvedik OSB & Teknopark Ankara', category: 'ctf' },
    { icon: '🕵️', title: 'Holmes CTF 2026: The Reichenbach Directive', platform: 'Hack The Box', category: 'ctf' },

    { icon: '⚖️', title: 'Patent ve Faydalı Modellerin Korunması', platform: 'BTK Akademi', category: 'ip' },
    { icon: '🎨', title: 'Tasarımların Korunması', platform: 'BTK Akademi', category: 'ip' },
    { icon: '🗺️', title: 'Coğrafi İşaretlerin Korunması', platform: 'BTK Akademi', category: 'ip' },
    { icon: '📛', title: 'Markaların Korunması', platform: 'BTK Akademi', category: 'ip' }
  ];

  var categoryLabels = {
    security: 'Siber Güvenlik',
    dev: 'Yazılım & Sistem',
    ctf: 'CTF & Etkinlik',
    ip: 'Fikri Mülkiyet & Hukuk'
  };

  var totalEl = document.getElementById('certTotal');
  if (totalEl) totalEl.textContent = certificates.length;

  var filterRow = document.getElementById('certFilters');
  var activeCategory = 'all';

  function renderGrid() {
    var items = activeCategory === 'all'
      ? certificates
      : certificates.filter(function (c) { return c.category === activeCategory; });

    grid.innerHTML = items.map(function (c) {
      return '' +
        '<div class="card cert-card reveal is-visible">' +
          '<div class="cert-icon" aria-hidden="true">' + c.icon + '</div>' +
          '<h3>' + c.title + '</h3>' +
          '<div class="cert-platform">' + c.platform + '</div>' +
          '<div class="cert-category">' + categoryLabels[c.category] + '</div>' +
        '</div>';
    }).join('');
  }

  function renderFilters() {
    var cats = ['all'].concat(Object.keys(categoryLabels));
    filterRow.innerHTML = cats.map(function (cat) {
      var label = cat === 'all' ? 'Tümü' : categoryLabels[cat];
      var count = cat === 'all' ? certificates.length : certificates.filter(function (c) { return c.category === cat; }).length;
      var activeClass = cat === activeCategory ? ' is-active' : '';
      return '<button type="button" class="cert-filter' + activeClass + '" data-cat="' + cat + '" aria-pressed="' + (cat === activeCategory) + '">' + label + ' (' + count + ')</button>';
    }).join('');

    filterRow.querySelectorAll('.cert-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeCategory = btn.getAttribute('data-cat');
        renderFilters();
        renderGrid();
      });
    });
  }

  renderFilters();
  renderGrid();
})();
