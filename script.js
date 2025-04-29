// Inizializza la libreria AOS (Animate On Scroll) con impostazioni personalizzate
AOS.init({
  duration: 800,          // Durata dell'animazione in millisecondi
  easing: 'ease-in-out', // Funzione di temporizzazione dell'animazione
  once: false            // Se l'animazione deve avvenire solo una volta
});

// Crea l'effetto di inseguimento del cursore
const cursor = document.createElement('div');
cursor.className = 'cursor-bg';
document.body.appendChild(cursor);

// Crea il contenitore delle particelle
const particlesContainer = document.createElement('div');
particlesContainer.id = 'particles';
document.body.appendChild(particlesContainer);

// Inizializza le particelle
tsParticles.load("particles", {
  particles: {
    number: { value: 400, density: { enable: true, value_area: 1200 } }, // Numero di particelle
    color: { value: "#00f3ff" }, // Colore delle particelle
    shape: { type: "circle" }, // Forma delle particelle
    opacity: {
      value: 0.5,
      random: true,
      animation: {
        enable: true,
        speed: 1,
        minimumValue: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 0.1,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "out" },
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: { enable: true, mode: "grab" }, // Effetto al passaggio del mouse
      resize: true
    },
    modes: {
      grab: {
        distance: 150,
        links: {
          opacity: 0.5,
          color: "#00f3ff"
        }
      }
    }
  },
  retina_detect: true,
  background: {
    color: "transparent",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover"
  }
});

// Effetto di inseguimento del cursore in tempo reale senza ritardo
document.addEventListener('mousemove', (e) => {
  requestAnimationFrame(() => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
});

// Variabili per la gestione dello scorrimento
let isScrolling = false;  // Flag per prevenire eventi di scorrimento multipli
let currentSection = 0;   // Traccia la sezione attiva corrente
const sections = document.querySelectorAll('.scroll-section');  // Ottiene tutte le sezioni
const navLinks = document.querySelectorAll('.nav-link');       // Ottiene tutti i link di navigazione

/**
 * Aggiorna la sezione attiva e lo stato della navigazione
 * @param {number} index - Indice della sezione da attivare
 */
function updateActiveSection(index) {
  // Rimuove la classe active da tutte le sezioni e i link di navigazione
  sections.forEach(section => section.classList.remove('active'));
  navLinks.forEach(link => link.classList.remove('active'));

  // Aggiunge la classe active alla sezione corrente e al link di navigazione
  sections[index].classList.add('active');
  navLinks[index].classList.add('active');

  // Aggiorna l'hash dell'URL senza attivare lo scorrimento
  const sectionId = sections[index].getAttribute('id');
  history.replaceState(null, null, `#${sectionId}`);
}

/**
 * Gestisce gli eventi di scorrimento della rotellina del mouse
 * @param {WheelEvent} e - L'oggetto evento della rotellina
 */
function handleWheel(e) {
  if (isScrolling) return;  // Previene eventi di scorrimento multipli

  isScrolling = true;
  const direction = e.deltaY > 0 ? 1 : -1;  // Determina la direzione dello scorrimento

  // Aggiorna la sezione corrente entro i limiti
  currentSection = Math.max(0, Math.min(currentSection + direction, sections.length - 1));
  updateActiveSection(currentSection);

  // Reimposta il flag di scorrimento dopo l'animazione
  setTimeout(() => {
    isScrolling = false;
  }, 1000);
}

// Aggiunge listener per gli eventi di click a tutti i link di navigazione
document.querySelectorAll('[data-section]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = link.getAttribute('data-section');
    // Trova l'indice della sezione di destinazione
    currentSection = Array.from(sections).findIndex(
      section => section.getAttribute('data-section') === targetSection
    );
    updateActiveSection(currentSection);
  });
});

// Inizializza la prima sezione al caricamento della pagina
window.addEventListener('load', () => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    // Se l'URL ha un hash, trova la sezione corrispondente
    currentSection = Array.from(sections).findIndex(
      section => section.getAttribute('id') === hash
    );
  }
  updateActiveSection(currentSection);
});

// Aggiunge listener per gli eventi di scorrimento della rotellina del mouse
window.addEventListener('wheel', handleWheel, { passive: false });

// Gestione degli eventi touch per dispositivi mobili
let touchStart = null;
let touchEnd = null;

// Traccia la posizione iniziale del touch
window.addEventListener('touchstart', (e) => {
  touchStart = e.touches[0].clientY;
});

// Gestisce gli eventi di movimento touch
window.addEventListener('touchmove', (e) => {
  if (!touchStart) return;

  touchEnd = e.touches[0].clientY;
  const direction = touchStart - touchEnd > 0 ? 1 : -1;

  // Verifica se il movimento touch è significativo
  if (Math.abs(touchStart - touchEnd) > 50 && !isScrolling) {
    isScrolling = true;
    currentSection = Math.max(0, Math.min(currentSection + direction, sections.length - 1));
    updateActiveSection(currentSection);

    // Reimposta il flag di scorrimento dopo l'animazione
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
});

// Reimposta il tracciamento touch alla fine del touch
window.addEventListener('touchend', () => {
  touchStart = null;
  touchEnd = null;
});
