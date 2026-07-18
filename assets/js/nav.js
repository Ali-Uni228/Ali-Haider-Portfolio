(function () {
  'use strict';
  var hamburger = document.querySelector('.nav__hamburger');
  var links = document.querySelector('.nav__links');
  if (hamburger && links) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = links.classList.toggle('nav__links--open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('nav__links--open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!links.classList.contains('nav__links--open')) return;
      var rect = links.getBoundingClientRect();
      var isBackdropClick = e.clientX < rect.left;
      var isOutside = !links.contains(e.target) && !hamburger.contains(e.target);
      if (isBackdropClick || isOutside) {
        links.classList.remove('nav__links--open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Smooth anchor scroll ----
     Only intercepts clicks on in-page a[href^="#"]. Native wheel/trackpad/
     keyboard scrolling is never touched — no scroll-hijacking. */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    if (reduceMotion) {
      target.scrollIntoView();
      if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
      return;
    }

    var startY = window.scrollY;
    var endY = target.getBoundingClientRect().top + startY - 84;
    var distance = endY - startY;
    var duration = Math.min(1300, Math.max(450, Math.abs(distance) * 0.55));
    var startTime = null;

    function step(ts) {
      if (startTime === null) startTime = ts;
      var t = Math.min(1, (ts - startTime) / duration);
      window.scrollTo(0, startY + distance * easeInOutQuint(t));
      if (t < 1) requestAnimationFrame(step);
      else if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
    }
    requestAnimationFrame(step);
  });
})();

