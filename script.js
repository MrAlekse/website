        const canvas = document.getElementById('starfield');
        const ctx = canvas.getContext('2d');
        let stars = [];
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function createStars(count) {
            stars = [];
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.2 + 0.2,
                    speed: Math.random() * 0.5 + 0.1,
                    alpha: Math.random() * 0.5 + 0.5
                });
            }
        }
        createStars(200);

        function animateStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let star of stars) {
                ctx.save();
                ctx.globalAlpha = star.alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
                ctx.fillStyle = '#fff';
                ctx.shadowColor = '#0ff';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.restore();
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            }
            requestAnimationFrame(animateStars);
        }
        animateStars();