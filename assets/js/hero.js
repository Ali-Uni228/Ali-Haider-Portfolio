/* ==========================================================================
   HERO INTERACTION
   Just this section's cursor-follow. Not part of a shared library — if
   JARVIS or DeathLeade later need the same kind of thing, that's when this
   gets factored out, not before.
   ========================================================================== */
(function () {
  'use strict';

  var hero = document.querySelector('.hero');
  var trace = document.querySelector('.hero__trace');
  if (!hero || !trace) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  // Reduced motion or touch: the CSS default position (a fixed soft glow
  // near the name) stands on its own — no listener attached, nothing to
  // disable mid-interaction, nothing left half-working.
  if (reduceMotion || !finePointer) return;

  var raf = null;
  hero.addEventListener('pointermove', function (e) {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      var rect = hero.getBoundingClientRect();
      var mx = ((e.clientX - rect.left) / rect.width) * 100;
      var my = ((e.clientY - rect.top) / rect.height) * 100;
      trace.style.setProperty('--mx', mx.toFixed(1) + '%');
      trace.style.setProperty('--my', my.toFixed(1) + '%');
      raf = null;
    });
  }, { passive: true });
})();
