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

  // ---- Carrossel de materiais ----
  var gallery = [
    { src: 'assets/img/galeria-1.jpg', alt: 'Bolas, raquetes e materiais esportivos sobre a bandeira da Team Mayer' },
    { src: 'assets/img/galeria-2.jpg', alt: 'Casaco térmico FastSwim rosa em cabide' },
    { src: 'assets/img/galeria-3.jpg', alt: 'Calças e bermudas de neoprene para natação' },
    { src: 'assets/img/galeria-4.png', alt: 'Óculos e acessórios de natação à beira da piscina' }
  ];
  var slide = 0;
  var mainImg = document.getElementById('gallery-image');
  var bgImg = document.getElementById('gallery-image-bg');
  var dots = document.querySelectorAll('.gallery-dot');
  var galleryTimer;

  function renderSlide() {
    var item = gallery[slide];
    if (mainImg) { mainImg.src = item.src; mainImg.alt = item.alt; }
    if (bgImg) { bgImg.src = item.src; }
    dots.forEach(function (dot, i) {
      dot.style.background = i === slide ? '#ffffff' : 'rgba(255,255,255,0.45)';
    });
  }
  function goToSlide(i) {
    slide = (i + gallery.length) % gallery.length;
    renderSlide();
    restartGalleryTimer();
  }
  function restartGalleryTimer() {
    clearInterval(galleryTimer);
    galleryTimer = setInterval(function () { goToSlide(slide + 1); }, 4500);
  }
  var galleryPrev = document.getElementById('gallery-prev');
  var galleryNext = document.getElementById('gallery-next');
  if (galleryPrev) galleryPrev.addEventListener('click', function () { goToSlide(slide - 1); });
  if (galleryNext) galleryNext.addEventListener('click', function () { goToSlide(slide + 1); });
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goToSlide(i); });
  });
  if (mainImg) { renderSlide(); restartGalleryTimer(); }

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
