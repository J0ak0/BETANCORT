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
  // 1) Qué animamos (selectores comunes de todas las páginas)
  const SELECTORS = [
    /* hero */
    '.hero__inner > *', '.brandstrip img',
    /* secciones genéricas */
    '.section .section__title', '.section .lead',
    '.split__inner > *', '.split__copy > *',
    '.grid > *', '.card', '.thumb', '.kpi-item',
    /* KPI split/mosaic */
    '.kpi-split__grid > *', '.kpi-mosaic .kpi-card', '.kpi-copy > *',
    /* industry / testimonial / blog */
    '.industry__grid > *', '.testimonial__layout > *',
    '.posts__grid > *',
    /* footer */
    '.footer__grid--center > *', '.footer__brand', '.footer__legal', '.footer__social'
  ];

  // 2) Recolecta sin duplicados
  const els = [...new Set(SELECTORS.flatMap(s => Array.from(document.querySelectorAll(s))))];

  // 3) Etiqueta con clases reveal + variantes según el tipo
  els.forEach(el => {
    if (el.closest('.reveal-off')) return;       // opt-out si querés excluir algo
    el.classList.add('reveal');

    // reglas rápidas de dirección
    if (el.matches('.split__media, .thumb, figure img')) el.classList.add('reveal--right');
    if (el.matches('.split__copy, .hero__copy, .os-head, .kpi-copy, .about-hero *')) el.classList.add('reveal--left');

    // Si usás data-reveal, respétalo (left|right|up|zoom)
    const dr = el.getAttribute('data-reveal');
    if (dr === 'left')  el.classList.add('reveal--left');
    if (dr === 'right') el.classList.add('reveal--right');
    if (dr === 'zoom')  el.classList.add('reveal--zoom');
    // (por defecto es "up" = translateY ya definido en .reveal)
  });

  // 4) Stagger automático dentro de contenedores con muchos hijos
  const STAGGER_CONTAINERS = [
    '.grid', '.brandstrip', '.hero__ctas',
    '.kpi-mosaic', '.kpi-strip__grid', '.industry__grid', '.posts__grid'
  ];
  document.querySelectorAll(STAGGER_CONTAINERS.join(',')).forEach(c => {
    [...c.children].forEach((ch, i) => {
      // solo si ese hijo se anima
      if (ch.classList.contains('reveal')) ch.style.transitionDelay = (i * 90) + 'ms';
    });
  });

  // 5) IntersectionObserver
  const disable = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (disable){
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }

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
