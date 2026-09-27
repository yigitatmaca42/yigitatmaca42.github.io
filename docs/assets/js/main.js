(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Scroll progress bar ---------- */
  var progress = document.querySelector('.scroll-progress');
  if (progress) {
    var updateProgress = function () {
      var h = document.documentElement;
      var scrollable = h.scrollHeight - h.clientHeight;
      var pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      progress.style.width = pct + '%';
    };
    document.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScrollHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    document.addEventListener('scroll', onScrollHeader, { passive: true });
    onScrollHeader();
  }

  /* ---------- Mobile nav (overlay, focus trap, ESC) ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var navMobile = document.getElementById('navMobile');

  if (menuToggle && navMobile) {
    var lastFocused = null;

    var getFocusable = function () {
      return navMobile.querySelectorAll('a, button');
    };

    var openMenu = function () {
      lastFocused = document.activeElement;
      menuToggle.classList.add('is-active');
      navMobile.classList.add('is-active');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var focusable = getFocusable();
      if (focusable.length) focusable[0].focus();
    };

    var closeMenu = function () {
      menuToggle.classList.remove('is-active');
      navMobile.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    };

    var toggleMenu = function () {
      if (navMobile.classList.contains('is-active')) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    menuToggle.addEventListener('click', toggleMenu);

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (!navMobile.classList.contains('is-active')) return;

      if (e.key === 'Escape') {
        closeMenu();
        return;
      }

      if (e.key === 'Tab') {
        var focusable = Array.prototype.slice.call(getFocusable());
        if (!focusable.length) return;
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
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealTargets.length) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealTargets.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  /* ---------- Hero spotlight (mouse-reactive, desktop only) ---------- */
  var hero = document.querySelector('.hero');
  var spotlight = document.querySelector('.hero-spotlight');
  if (hero && spotlight && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    var rafId = null;
    hero.addEventListener('pointermove', function (e) {
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        var rect = hero.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        spotlight.style.setProperty('--mx', x + '%');
        spotlight.style.setProperty('--my', y + '%');
        rafId = null;
      });
    });
    hero.addEventListener('pointerenter', function () { spotlight.classList.add('is-visible'); });
    hero.addEventListener('pointerleave', function () { spotlight.classList.remove('is-visible'); });
  }

  /* ---------- Role rotator ---------- */
  var roleTextEl = document.querySelector('[data-role-text]');
  if (roleTextEl) {
    var roles = ['CTF Player', 'Security Researcher', 'Software Developer'];
    if (reduceMotion) {
      roleTextEl.textContent = roles[0];
    } else {
      var idx = 0;
      var typeRole = function () {
        var word = roles[idx];
        var charIdx = 0;
        roleTextEl.textContent = '';
        var typing = setInterval(function () {
          roleTextEl.textContent = word.slice(0, charIdx + 1);
          charIdx++;
          if (charIdx === word.length) {
            clearInterval(typing);
            setTimeout(eraseRole, 1800);
          }
        }, 55);
      };
      var eraseRole = function () {
        var word = roles[idx];
        var charIdx = word.length;
        var erasing = setInterval(function () {
          roleTextEl.textContent = word.slice(0, charIdx - 1);
          charIdx--;
          if (charIdx === 0) {
            clearInterval(erasing);
            idx = (idx + 1) % roles.length;
            setTimeout(typeRole, 300);
          }
        }, 30);
      };
      typeRole();
    }
  }

  /* ---------- Copy-to-clipboard buttons ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var original = btn.textContent;
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-copy');
      var done = function () {
        btn.textContent = 'Kopyalandı ✓';
        setTimeout(function () { btn.textContent = original; }, 1600);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(done).catch(function () {});
      } else {
        var ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (err) {}
        document.body.removeChild(ta);
      }
    });
  });
})();
