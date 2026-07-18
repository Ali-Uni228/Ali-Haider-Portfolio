/* ==========================================================================
   INTERACTIONS
   Four small pieces, each justified by actual reuse across the finished
   site (not built ahead of need — see build notes):
     - Scroll progress → JARVIS + DeathLeade architecture diagrams, frame parallax
     - Tilt + reflection → JARVIS + DeathLeade screenshot Frames
     - Magnetic → Contact's four link rows
     - Inspect pins → the site's one signature interaction, paid off here
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---- Scroll progress: one rAF loop, batched read then batched write ---- */
  (function scrollProgress() {
    var tracked = Array.prototype.slice.call(document.querySelectorAll('[data-scroll-progress]'));
    if (!tracked.length) return;
    var ticking = false;

    function measure() {
      var vh = window.innerHeight;
      var rects = tracked.map(function (el) { return el.getBoundingClientRect(); });
      tracked.forEach(function (el, i) {
        var rect = rects[i];
        var total = rect.height + vh;
        var progress = total > 0 ? (vh - rect.top) / total : 0;
        progress = Math.min(1, Math.max(0, progress));
        el.style.setProperty('--progress', reduceMotion ? '1' : progress.toFixed(4));
      });
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(measure); } }

    measure();
    if (!reduceMotion) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }
  })();

  /* ---- Tilt + light reflection ---- */
  (function tilt() {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      el.addEventListener('pointerenter', function () { el.style.willChange = 'transform'; });
      el.addEventListener('pointermove', function (e) {
        var rect = el.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        el.style.setProperty('--ry', ((px - 0.5) * 2).toFixed(3));
        el.style.setProperty('--rx', ((0.5 - py) * 2).toFixed(3));
        el.style.setProperty('--lx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--ly', (py * 100).toFixed(1) + '%');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', 0);
        el.style.setProperty('--ry', 0);
        el.style.willChange = 'auto';
      });
    });
  })();

  /* ---- Magnetic ---- */
  (function magnetic() {
    if (reduceMotion || !finePointer) return;
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      var strength = Number(el.getAttribute('data-magnetic-strength') || 0.3);
      var radius = Number(el.getAttribute('data-magnetic-radius') || 70);
      el.addEventListener('pointerenter', function () { el.style.willChange = 'transform'; });
      el.addEventListener('pointermove', function (e) {
        var rect = el.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        if (Math.sqrt(dx * dx + dy * dy) > radius) return;
        el.style.setProperty('--mx', (dx * strength).toFixed(1) + 'px');
        el.style.setProperty('--my', (dy * strength).toFixed(1) + 'px');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
        el.style.willChange = 'auto';
      });
    });
  })();

  /* ---- Screenshot switcher ----
     One tab row + one stack of .switcher__slide per group (data-slide is
     the shared key). Fine pointers get instant hover-switch; touch/coarse
     pointers and keyboard users switch on click/Enter — same markup, no
     separate mobile component. */
  (function switcher() {
    var tabGroups = document.querySelectorAll('.switcher__tabs');
    if (!tabGroups.length) return;

    tabGroups.forEach(function (group) {
      var tabs = Array.prototype.slice.call(group.querySelectorAll('.switcher__tab'));
      // Slides live in the sibling .frame, not inside the tab group itself.
      var stage = group.nextElementSibling;
      if (!stage) return;
      var slides = Array.prototype.slice.call(stage.querySelectorAll('.switcher__slide'));
      if (!slides.length) return;

      function activate(key) {
        tabs.forEach(function (t) {
          var isMatch = t.getAttribute('data-slide') === key;
          t.classList.toggle('is-active', isMatch);
        });
        slides.forEach(function (s) {
          s.classList.toggle('is-active', s.getAttribute('data-slide') === key);
        });
      }

      tabs.forEach(function (tab) {
        var key = tab.getAttribute('data-slide');
        tab.addEventListener('click', function () { activate(key); });
        if (finePointer) {
          tab.addEventListener('mouseenter', function () { activate(key); });
        }
        tab.addEventListener('focus', function () { activate(key); });
      });
      // Auto-advance every 4s. Pauses on hover/focus so manual switching
      // still works, and never runs for reduced-motion users.
      if (tabs.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var idx = 0;
        var auto = setInterval(function () {
          idx = (idx + 1) % tabs.length;
          activate(tabs[idx].getAttribute('data-slide'));
        }, 4000);
        group.addEventListener('mouseenter', function () { clearInterval(auto); });
        group.addEventListener('focusin', function () { clearInterval(auto); });
      }
    });
  })();

  /* ---- Inspect pins ----
     Screen readers already have the full annotation via aria-label on the
     button itself — this only controls the visible callout for sighted
     pointer/keyboard users. Click-toggle (not hover-only) so touch works. */
  (function pins() {
    var pins = document.querySelectorAll('.pin');
    if (!pins.length) return;
    pins.forEach(function (pin) {
      pin.addEventListener('click', function (e) {
        e.stopPropagation();
        var wasActive = pin.classList.contains('is-active');
        pins.forEach(function (p) { p.classList.remove('is-active'); });
        if (!wasActive) pin.classList.add('is-active');
      });
    });
    document.addEventListener('click', function () {
      pins.forEach(function (p) { p.classList.remove('is-active'); });
    });
  })();
})();
