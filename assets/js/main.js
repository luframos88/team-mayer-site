document.addEventListener('DOMContentLoaded', function () {

  // ---- Menu mobile ----
  var toggleBtn = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('is-open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
      });
    });
  }

  // ---- Rail de parceiros (auto-scroll com pausa por toque) ----
  var rail = document.getElementById('partners-rail');
  if (rail) {
    var raf, touching = false, paused = false, resumeTimer;
    var isMobileQuery = window.matchMedia('(max-width: 860px)');

    function step() {
      if (!touching) {
        var half = (rail.scrollWidth - rail.clientWidth) > 0 ? rail.scrollWidth / 2 : 0;
        if (half) {
          if (rail.scrollLeft >= half) rail.scrollLeft -= half;
          if (!paused) rail.scrollLeft += isMobileQuery.matches ? 0.35 : 0.55;
        }
      }
      raf = requestAnimationFrame(step);
    }
    function hold() { touching = true; clearTimeout(resumeTimer); }
    function release() {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () { touching = false; paused = false; }, 1800);
    }
    rail.addEventListener('touchstart', hold, { passive: true });
    rail.addEventListener('touchmove', hold, { passive: true });
    rail.addEventListener('touchend', release, { passive: true });
    rail.addEventListener('touchcancel', release, { passive: true });
    rail.addEventListener('pointerdown', hold);
    rail.addEventListener('pointerup', release);
    raf = requestAnimationFrame(step);

    function nudgeRail(dir) {
      paused = true;
      var half = rail.scrollWidth / 2;
      if (dir < 0 && rail.scrollLeft - 264 < 0) rail.scrollLeft += half;
      rail.scrollBy({ left: dir * 264, behavior: 'smooth' });
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(function () { paused = false; }, 2600);
    }
    var railPrev = document.getElementById('rail-prev');
    var railNext = document.getElementById('rail-next');
    if (railPrev) railPrev.addEventListener('click', function () { nudgeRail(-1); });
    if (railNext) railNext.addEventListener('click', function () { nudgeRail(1); });
  }
});
