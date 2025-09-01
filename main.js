// Navegación móvil
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('#menu');
if (toggle && menu){
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}
// Año en footer
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
// Testimonial slider simple
const dots = document.querySelectorAll('.dots .dot');
const slides = document.querySelectorAll('.tcard');
function showSlide(i){
  slides.forEach((s,idx)=> s.classList.toggle('is-active', idx===i));
  dots.forEach((d,idx)=> d.classList.toggle('is-active', idx===i));
}
dots.forEach((d, i)=> d.addEventListener('click', ()=> showSlide(i)));

// Medir header y actualizar la variable --header-h
const header = document.querySelector('.site-header');
function setHeaderVars(){
  if (!header) return;
  document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
}
setHeaderVars();
window.addEventListener('resize', setHeaderVars);

// Cambiar a sólido al scrollear (apenas te movés)
function updateHeaderSolid(){
  header.classList.toggle('is-scrolled', window.scrollY > 10);
}
updateHeaderSolid();
window.addEventListener('scroll', updateHeaderSolid, { passive:true });

// Si preferís que sea sólido recién al salir del hero, usá esto en vez de lo de arriba:
// const hero = document.querySelector('.hero');
// function updateHeaderSolid(){
//   const trigger = hero.offsetHeight - header.offsetHeight;
//   header.classList.toggle('is-scrolled', window.scrollY >= trigger);
// }

// ===== Scroll Reveal (global)
(function(){
  const SELECTORS = [
    /* hero (index) */
    '.hero__inner > *', '.brandstrip img',
    /* about hero */
    '.about-hero__grid > *', '.about-hero__copy > *',
    /* secciones genéricas */
    '.section .section__title', '.section .lead',
    '.split__inner > *', '.split__copy > *',
    '.grid > *', '.card', '.thumb', '.kpi-item',
    /* KPI split/mosaic */
    '.kpi-split__grid > *', '.kpi-mosaic .kpi-card', '.kpi-copy > *',
    /* industry / testimonial / blog */
    '.industry__grid > *', '.testimonial__layout > *',
    '.posts__grid > *',
    /* about extra */
    '.about-photo__media',
    '.about-history__head > *', '.about-history__col > *',
    '.about-profile__grid > *', '.profile-card', '.profile-copy > *',
    '.callout__inner > *',
    /* footer */
    '.footer__grid--center > *', '.footer__brand', '.footer__legal', '.footer__social'
  ];

  const els = [...new Set(SELECTORS.flatMap(s => Array.from(document.querySelectorAll(s))))];

  els.forEach(el => {
    if (el.closest('.reveal-off')) return;
    el.classList.add('reveal');

    // direcciones por tipo
    if (el.matches('.split__media, .thumb, figure img, .about-photo__media, .profile-card')) el.classList.add('reveal--right');
    if (el.matches('.split__copy, .hero__copy, .os-head, .kpi-copy, .about-hero__copy, .profile-copy, .about-history__head')) el.classList.add('reveal--left');

    // data-reveal opcional
    const dr = el.getAttribute('data-reveal');
    if (dr === 'left')  el.classList.add('reveal--left');
    if (dr === 'right') el.classList.add('reveal--right');
    if (dr === 'zoom')  el.classList.add('reveal--zoom');
  });

  const STAGGER_CONTAINERS = [
    '.grid', '.brandstrip', '.hero__ctas',
    '.kpi-mosaic', '.kpi-strip__grid', '.industry__grid', '.posts__grid',
    '.about-hero__copy', '.about-history__head', '.about-history__col', '.profile-copy', '.callout__inner'
  ];
  document.querySelectorAll(STAGGER_CONTAINERS.join(',')).forEach(c => {
    [...c.children].forEach((ch, i) => {
      if (ch.classList.contains('reveal')) ch.style.transitionDelay = (i * 90) + 'ms';
    });
  });

  const disable = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (disable){ els.forEach(el => el.classList.add('is-visible')); return; }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  els.forEach(el => io.observe(el));
})();

