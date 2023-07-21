const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

let colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9',
]

let gravity = 1;
let friction = 0.79;

let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

addEventListener("click", function(){
    init();
})

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function () {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}
let ball;
let ballArray;
function init() {
    ballArray = [];
    for (let i = 0; i < 500; i++) {
        let radius = randomIntFromRange(10, 20);

        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(0, canvas.height - radius);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-2, 2);
        let color = randomColor(colorArray);
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}
init();
animate();