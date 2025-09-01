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


