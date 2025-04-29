// Importa gli stili e le librerie necessarie
import './style.css'; // Importa il foglio di stile personalizzato
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa il CSS principale di Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Importa il bundle JavaScript di Bootstrap
import AOS from 'aos';  // Importa la libreria Animate On Scroll (AOS)

// Inizializza AOS quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,          // Durata dell'animazione in millisecondi
    easing: 'ease-in-out', // Funzione di temporizzazione dell'animazione
    once: false            // Le animazioni si ripetono ad ogni scorrimento
  });
});
