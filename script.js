// ⭐ STARFIELD BACKGROUND
const starCanvas = document.getElementById('starfield');
const starCtx = starCanvas.getContext('2d');
let stars = [];

function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeStarCanvas);
resizeStarCanvas();

function createStars(count) {
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * starCanvas.width,
            y: Math.random() * starCanvas.height,
            radius: Math.random() * 1.2 + 0.2,
            speed: Math.random() * 0.5 + 0.1,
            alpha: Math.random() * 0.5 + 0.5
        });
    }
}
createStars(500);

function animateStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (let star of stars) {
        starCtx.save();
        starCtx.globalAlpha = star.alpha;
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        starCtx.fillStyle = '#fff';
        starCtx.shadowColor = '#0ff';
        starCtx.shadowBlur = 10;
        starCtx.fill();
        starCtx.restore();
        star.y += star.speed;
        if (star.y > starCanvas.height) {
            star.y = 0;
            star.x = Math.random() * starCanvas.width;
        }
    }
    requestAnimationFrame(animateStars);
}
animateStars();


// 📅 CALENDAR CODE (unchanged)
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        editable: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: function(info) {
            alert('You clicked on: ' + info.dateStr);
        },
        eventClick: function(info) {
            alert('Event: ' + info.event.title);
        }
    });
    calendar.render();
});

//calendar edit/remove events
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      editable: true,

      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },

      // ✅ Add new events on date click
      dateClick: function(info) {
        let title = prompt("Enter event title:");
        if (title) {
          calendar.addEvent({
            title: title,
            start: info.dateStr,
            allDay: true
          });
        }
      },

      // ❌ Remove events on click
      eventClick: function(info) {
        if (confirm(`Remove event: "${info.event.title}"?`)) {
          info.event.remove();
        }
      }
    });

    calendar.render();
  });


// 🌌 BLACKHOLE CANVAS
const bhCanvas = document.getElementById("blackholeCanvas");
const bhCtx = bhCanvas.getContext("2d");
bhCanvas.width = window.innerWidth;
bhCanvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 400; i++) {
  particles.push({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * (bhCanvas.width / 2),
    speed: 0.005 + Math.random() * 0.02,
    size: Math.random() * 2 + 1,
    color: `hsla(${180 + Math.random() * 60}, 100%, 70%, 0.8)`
  });
}

function animateBlackhole() {
  bhCtx.fillStyle = "rgba(0, 0, 0, 0.3)";
  bhCtx.fillRect(0, 0, bhCanvas.width, bhCanvas.height);

  // glowing center
  let gradient = bhCtx.createRadialGradient(
    bhCanvas.width / 2, bhCanvas.height / 2, 10,
    bhCanvas.width / 2, bhCanvas.height / 2, 200
  );
  gradient.addColorStop(0, "rgba(0,255,255,0.8)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  bhCtx.fillStyle = gradient;
  bhCtx.beginPath();
  bhCtx.arc(bhCanvas.width/2, bhCanvas.height/2, 200, 0, Math.PI*2);
  bhCtx.fill();

  // particles swirling
  particles.forEach(p => {
    p.angle += p.speed;
    p.radius -= 0.05;
    if (p.radius < 2) {
      p.radius = bhCanvas.width / 2;
      p.angle = Math.random() * Math.PI * 2;
    }
    const x = bhCanvas.width / 2 + p.radius * Math.cos(p.angle);
    const y = bhCanvas.height / 2 + p.radius * Math.sin(p.angle);

    bhCtx.fillStyle = p.color;
    bhCtx.beginPath();
    bhCtx.arc(x, y, p.size, 0, Math.PI * 2);
    bhCtx.fill();
  });

  requestAnimationFrame(animateBlackhole);
}
animateBlackhole();
