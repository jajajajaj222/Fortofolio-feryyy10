// 1. ANIMASI KETIK OTOMATIS
const words = [
    "Developer Pemula",
    "Pemrograman masih sederhana",
    "Siswa SMK Jurusan RPL",
    "Membuat website sederhana",
    "Seorang pelajar yang ingin meraih impiannya"
];

let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typing-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 90);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typing-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 45);
    };
    loopDeleting();
}

// 2. EFEK KLIK CYBER SPARK PARTICLES (ESTETIK & BERUBAH WARNA)
document.addEventListener('click', function(e) {
    const colors = ['#38bdf8', '#a855f7', '#ec4899', '#34d399', '#facc15'];
    const sparkCount = 8; // Jumlah percikan saat diklik

    for (let k = 0; k < sparkCount; k++) {
        const spark = document.createElement('div');
        spark.className = 'cyber-spark';
        document.body.appendChild(spark);

        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4;
        const destX = (Math.random() - 0.5) * 120;
        const destY = (Math.random() - 0.5) * 120;
        const rot = Math.random() * 360;

        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.background = color;
        spark.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        spark.style.left = `${e.pageX}px`;
        spark.style.top = `${e.pageY}px`;

        spark.animate([
            { transform: `translate(-50%, -50%) translate(0, 0) scale(1) rotate(0deg)`, opacity: 1 },
            { transform: `translate(-50%, -50%) translate(${destX}px, ${destY}px) scale(0) rotate(${rot}deg)`, opacity: 0 }
        ], {
            duration: 600 + Math.random() * 200,
            easing: 'cubic-bezier(0, .9, .57, 1)',
            fill: 'forwards'
        });

        setTimeout(() => spark.remove(), 800);
    }
});

// 3. ANIMASI PARTIKEL MELAYANG DI LAYAR (CANVAS)
const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let j = 0; j < 35; j++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.8,
        color: Math.random() > 0.5 ? '#38bdf8' : '#a855f7',
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

// 4. LOGIKA MODE SWITCHER (DARK / LIGHT MODE)
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        themeToggleBtn.innerHTML = '☀️ Light';
    } else {
        themeToggleBtn.innerHTML = '🌙 Dark';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    typingEffect();
    animateParticles();
});
