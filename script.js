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
        const attraction = (1 - distance / mouse.radius) * 0.3; // lower = calmer
        this.x += dx * attraction;
        this.y += dy * attraction;
    }

    // normal floating movement
    this.x += this.directionX * 0.2; // slow drifting
    this.y += this.directionY * 0.2;

    this.draw();
}

}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 1) - 0.5; // small movement
        let directionY = (Math.random() * 1) - 0.5;
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


window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.width / 80));
    init();
});
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animate();

const words = ["coding", "design", "learning", "creating", "exploring"];
  let index = 0;

  const wordElement = document.getElementById("word");

  function cycleWord() {
    wordElement.style.opacity = 0; // fade out
    setTimeout(() => {
      index = (index + 1) % words.length; // move to next word
      wordElement.textContent = words[index];
      wordElement.style.opacity = 1; // fade in
    }, 500);
  }

  // change word every 2 seconds
  setInterval(cycleWord, 2000);