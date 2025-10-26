const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: 50
}

window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffffffff';
        ctx.fill();
    } 
   update() {
    // bounce off canvas edges
    if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
    }

    // distance from mouse
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    // gentle attraction zone
    if (distance < mouse.radius && distance > 0) {
        // strength weakens with distance
        const attraction = (1 - distance / mouse.radius) * 0.001; // lower = calmer
        this.x += dx * attraction;
        this.y += dy * attraction;
    }

    // normal floating movement
    this.x += this.directionX * 0.017; // slow drifting
    this.y += this.directionY * 0.017;

    this.draw();
}

}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 19000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 3) - 0.15; // small movement
        let directionY = (Math.random() * 3) - 0.15;
        let color = '#000000ff';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                // make opacity decrease smoothly with distance
                opacityValue = 1 - distance / ((canvas.width / 7) * (canvas.height / 7));
                if (opacityValue < 0) opacityValue = 0;
                
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`; // white fading lines
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
                ctx.lineWidth = opacityValue * 1 + 0.5; // Stroke size varies with opacity (distance)
                ctx.closePath();
            }
        }
    }
}
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    connect();
}

function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Set canvas resolution
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Reset transform before scaling to avoid compounding
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  // Adjust mouse radius (use logical pixels)
  mouse.radius = ((height / 80) * (width / 80));

init();

}
resizeCanvas();

// 🔁 Listen for resize
window.addEventListener('resize', resizeCanvas);

// ✅ Optional: handle mobile orientation changes too
window.addEventListener('orientationchange', () => {
  setTimeout(resizeCanvas, 500);
});
animate();

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



