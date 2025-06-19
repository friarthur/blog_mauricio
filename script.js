// script.js

function abrirWhatsApp() {
  window.open("https://wa.me/555193767649?text=Ol%C3%A1%2C%20Maur%C3%ADcio!%20Gostaria%20de%20agendar%20uma%20aula.", "_blank");
}

// Scroll Reveal Simples
const elements = document.querySelectorAll('.fade-in');

function handleScroll() {
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
