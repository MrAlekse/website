const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d', { alpha: true });

let particlesArray = [];
let mouse = { x: null, y: null, active: false };

// === Handle mouse & touch ===
function setMousePosition(x, y) {
  mouse.x = x;
  mouse.y = y;
  mouse.active = true;
}

window.addEventListener('mousemove', e => setMousePosition(e.x, e.y));
window.addEventListener('mouseleave', () => mouse.active = false);

window.addEventListener('touchmove', e => {
  const touch = e.touches[0];
  if (touch) setMousePosition(touch.clientX, touch.clientY);
}, { passive: true });
window.addEventListener('touchend', () => mouse.active = false);

// === Particle class ===
class Particle {
  constructor(x, y, dx, dy, size, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // Bounce off walls
    if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
    if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

    // Attraction effect (stronger when closer)
    if (mouse.active) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxRange = 250; // attraction range in px

      if (dist < maxRange) {
        const strength = (1 - dist / maxRange) * 0.002; // 0.01 = attraction strength
        this.x += dx * strength;
        this.y += dy * strength;
      }
    }

    // Natural floating
    this.x += this.dx * 0.07;
    this.y += this.dy * 0.07;

    this.draw();
  }
}

// === Init particles ===
function init() {
  particlesArray = [];
  const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 20000));

  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 2;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - 0.5);
    const dy = (Math.random() - 0.5);
    const color = 'rgba(255, 255, 255, 1)';
    particlesArray.push(new Particle(x, y, dx, dy, size, color));
  }
}

// === Connect particles ===
function connect() {
  const maxDist = 150;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const dist = dx * dx + dy * dy;
      if (dist < maxDist * maxDist) {
        const opacity = 1 - dist / (maxDist * maxDist);
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = opacity;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// === Animation ===
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => p.update());
  connect();
  requestAnimationFrame(animate);
}

// === Resize ===
function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
  init();
}


window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 500));

// === Start ===
resizeCanvas();
animate();

function setVhUnit() {
  const vh = (window.visualViewport ? window.visualViewport.height : window.innerHeight) * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Update CSS height unit & canvas size on resize
function updateViewport() {
  setVhUnit();
  resizeCanvas();
}

// Initialize once
setVhUnit();
resizeCanvas();
animate();

// Keep responsive across all devices
window.addEventListener('resize', updateViewport);
window.addEventListener('orientationchange', () => setTimeout(updateViewport, 300));
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', updateViewport);
}





//typing animation
const words = ["Web Developer", "App Developer", "Frontend Developer", "Video Editor", "Graphic Designer", "Photographer", "Power Point Designer"];
  const wordElement = document.getElementById("word");

  let wordIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    const displayed = currentWord.substring(0, letterIndex);
    wordElement.textContent = displayed;

    if (!isDeleting && letterIndex < currentWord.length) {
      // typing forward
      letterIndex++;
      setTimeout(type, 150);
    } else if (isDeleting && letterIndex > 0) {
      // deleting
      letterIndex--;
      setTimeout(type, 100);
    } else {
      if (!isDeleting) {
        // pause before deleting
        isDeleting = true;
        setTimeout(type, 1000);
      } else {
        // move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 200);
      }
    }
  }

  type();

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

// Optional: Animate hamburger into X
menuToggle.addEventListener('click', () => {
  const bars = menuToggle.querySelectorAll('div');
  bars[0].classList.toggle('rotate-top');
  bars[1].classList.toggle('hide-middle');
  bars[2].classList.toggle('rotate-bottom');
});

//about section animation

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector("#about");
  if (!aboutSection) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 }); // triggers earlier

  observer.observe(aboutSection);
});

//contact section 
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      showStatus("✅ Message sent successfully!", "success");
      form.reset();
    } else {
      showStatus("❌ Oops! Something went wrong. Please try again.", "error");
    }
  } catch (error) {
    showStatus("❌ Network error. Please check your connection.", "error");
  }
});

function showStatus(message, type) {
  status.textContent = message;
  status.className = type;
  status.style.opacity = "1"; // fully visible

  // Fade out after 5 seconds
  setTimeout(() => {
    status.style.transition = "opacity 0.8s ease";
    status.style.opacity = "0";
  }, 5000);
}

//projects section
//projects section
const gallery = document.querySelector(".scroll-gallery");
let scrollSpeed = 0;
let position = 0;
let isDragging = false;
let startX, scrollLeft;

// 🔁 Clone content for infinite scroll illusion
function cloneGallery() {
  const clones = gallery.innerHTML;
  gallery.insertAdjacentHTML("beforeend", clones);
}
cloneGallery();

// 🧭 Handle mouse wheel
window.addEventListener("wheel", (e) => {
  scrollSpeed += e.deltaY * 0.1; // faster speed
});

// 🖱️ Handle click + drag for horizontal scroll
gallery.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = position;
  scrollSpeed = 0; // Reset speed to prevent momentum during drag
  gallery.style.cursor = "grabbing";
});

gallery.addEventListener("mouseleave", () => {
  isDragging = false;
  gallery.style.cursor = "grab";
});

gallery.addEventListener("mouseup", () => {
  isDragging = false;
  gallery.style.cursor = "grab";
});

gallery.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 3; // drag sensitivity
  position = scrollLeft - walk;
});

// 🌀 Animate continuous scroll
function loopScroll() {
  // Only apply scrollSpeed when not dragging
  if (!isDragging) {
    position += scrollSpeed;
  }

  const totalWidth = gallery.scrollWidth / 2;

  // Smooth wrap using modulo (handles negative positions too)
  position = ((position % totalWidth) + totalWidth) % totalWidth;

  // Apply transform
  gallery.style.transform = `translateX(${-position}px)`;

  // Apply friction
  scrollSpeed *= 0.93;

  requestAnimationFrame(loopScroll);
}
loopScroll();

// 🔗 Clickable cards
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const link = card.dataset.link;
    if (link) window.open(link, "_blank");
  });
});



//skills section
const skillsList = document.querySelector(".skills-list");
let timeout;

function stackBack() {
  // Add a temporary class for smooth collapse
  skillsList.classList.add("stacking");
  
  // Wait for the CSS transition to finish, then remove active
  setTimeout(() => {
    skillsList.classList.remove("active", "stacking");
  }, 500); // match this duration with CSS
}

// Spread skills on hover
skillsList.addEventListener("mouseenter", () => {
  clearTimeout(timeout);
  skillsList.classList.add("active");
  skillsList.classList.remove("stacking"); // cancel any collapse animation
});

// Start 5s timer when leaving
skillsList.addEventListener("mouseleave", () => {
  clearTimeout(timeout);
  timeout = setTimeout(stackBack, 5000);
});



