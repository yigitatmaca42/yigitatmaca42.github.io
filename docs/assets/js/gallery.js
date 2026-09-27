(function () {
  'use strict';

  var galleries = {
    tsgk: [
      { src: 'pictures/TSGKCTF25/scoreboard.webp', alt: 'TSGK CTF skor tablosu' },
      { src: 'pictures/TSGKCTF25/top10.webp', alt: 'TSGK CTF ilk 10 sıralaması' }
    ],
    ktu: [
      { src: 'pictures/KTUBW25/scoreboard.webp', alt: 'KTU BEiNG-WISE CTF skor tablosu' },
      { src: 'pictures/KTUBW25/team.webp', alt: 'KTU BEiNG-WISE CTF takım görseli' }
    ],
    skydays: [
      { src: 'pictures/SKYDAYS26/prize.webp', alt: 'SKYDAYS ödül anı' },
      { src: 'pictures/SKYDAYS26/team.webp', alt: 'SKYDAYS takım görseli' }
    ],
    ituctf: [
      { src: 'pictures/ITUCTF26/scoreboard.webp', alt: 'ITUCTF\'26 skor tablosu' },
      { src: 'pictures/ITUCTF26/score.webp', alt: 'ITUCTF\'26 puan detayı' },
      { src: 'pictures/ITUCTF26/top10.webp', alt: 'ITUCTF\'26 ilk 10 sıralaması' }
    ],
    wolfctf: [
      { src: 'pictures/WOLFCTF26/score.webp', alt: 'WOLFCTF\'26 puan detayı' },
      { src: 'pictures/WOLFCTF26/scoreboard.webp', alt: 'WOLFCTF\'26 skor tablosu' }
    ],
    htbca26: [
      { src: 'pictures/HTBSaltCrown26/rank.webp', alt: 'Cyber Apocalypse 2026 sıralama' },
      { src: 'pictures/HTBSaltCrown26/team.webp', alt: 'Cyber Apocalypse 2026 takım görseli' },
      { src: 'pictures/HTBSaltCrown26/info.webp', alt: 'Cyber Apocalypse 2026 etkinlik bilgisi' }
    ],
    pratik: [
      { src: 'pictures/PRATIKCTF26/profile.webp', alt: 'PRATIK profil görseli' },
      { src: 'pictures/PRATIKCTF26/scoreboard.webp', alt: 'PRATIK skor tablosu' },
      { src: 'pictures/PRATIKCTF26/stats.webp', alt: 'PRATIK istatistikleri' }
    ],
    nnsctf: [
      { src: 'pictures/NSSCTF26/score.webp', alt: 'NNS CTF 2026 puan detayı' }
    ],
    htbholmes26: [
      { src: 'pictures/HTBHolmes26/rank.webp', alt: 'Holmes CTF 2026 sıralama' },
      { src: 'pictures/HTBHolmes26/team.webp', alt: 'Holmes CTF 2026 takım görseli' },
      { src: 'pictures/HTBHolmes26/info.webp', alt: 'Holmes CTF 2026 etkinlik bilgisi' }
    ],
    watchlist26: [
      { src: 'pictures/WATCHLIST26/rank.webp', alt: 'WATCHLIST CTF sıralama' },
      { src: 'pictures/WATCHLIST26/team.webp', alt: 'WATCHLIST CTF takım görseli' }
    ]
  };

  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var imgEl = document.getElementById('lightboxImage');
  var captionEl = document.getElementById('lightboxCaption');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');

  var currentSet = [];
  var currentIndex = 0;
  var lastFocused = null;

  function render() {
    var item = currentSet[currentIndex];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    captionEl.textContent = (currentIndex + 1) + ' / ' + currentSet.length + ' — ' + item.alt;
    var multi = currentSet.length > 1;
    prevBtn.style.display = multi ? 'grid' : 'none';
    nextBtn.style.display = multi ? 'grid' : 'none';
  }

  function open(key, startIndex) {
    if (!galleries[key]) return;
    currentSet = galleries[key];
    currentIndex = startIndex || 0;
    lastFocused = document.activeElement;
    lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    render();
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
    imgEl.src = '';
    if (lastFocused) lastFocused.focus();
  }

  function next() {
    currentIndex = (currentIndex + 1) % currentSet.length;
    render();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + currentSet.length) % currentSet.length;
    render();
  }

  document.querySelectorAll('[data-gallery]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      open(trigger.getAttribute('data-gallery'), 0);
    });
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-active')) return;

    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Tab') {
      var focusable = [closeBtn, prevBtn, nextBtn].filter(function (el) {
        return el.offsetParent !== null;
      });
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();
