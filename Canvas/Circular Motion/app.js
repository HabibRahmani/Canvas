const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9',
]

let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})


function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCinter =randomIntFromRange(50,120);
    this.lastMouse = {x: x, y: y};  

    this.update = function () {
        let lastPoint = {x: this.x, y: this.y};

        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x -this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y -this.lastMouse.y) * 0.05;

        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCinter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCinter;
        this.draw(lastPoint);
    }

    this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }
}
let particles;
function init() {
    particles = [];
    for (let i = 0; i < 50; i++) {
        const radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colorArray)))
    } 
    console.log(particles);
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle =>{
        particle.update();
    })
}
init();
animate();