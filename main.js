
var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight



window.addEventListener("mousemove", function (event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener("resize", function (){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    clearcanva()
    init();
    animate()
})

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(c){
    return c[Math.floor(Math.random() * c.length)];
}

var colors = [
    "#ffd27d",
    "#e54ed0",
    "#ffe4f2",
    "#ffa371",
    "#a6a8ff",
    "#fffa86",
    "#a87bff"
]

var mouse = {
    x: undefined,
    y: undefined
}


// var gravity = 1
// // var friction = 0.87
// var friction = 0.97


class Ball {
    constructor(x, y, dx, dy, radius, fillColor) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.radius = radius
        this.fillColor = fillColor

        this.draw = function () {
            c.beginPath()
            c.arc(this.x, this.y, this.radius, 2 * (Math.PI), false)
            c.fillStyle = this.fillColor
            c.fill()
        }

        this.update = function () {

            if (this.y + this.radius + this.dy > window.innerHeight) {
                this.dy = -this.dy * friction
            } else {
                this.dy += gravity
            }

            if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx
            }

            this.y += this.dy
            this.x += this.dx

            this.draw()
        }

    }
}


var balls = [];
var nCircles = 30;

var x,
    y,
    dx,
    dy,
    color,
    radius,

    gravity,
    friction;

let animationId;


function init(){

    gravity = 1    
    friction = 0.97
    
    for (let i = 0; i < nCircles; i++) {

        x = Math.floor(Math.random() * (window.innerWidth - radius * 2) + radius),
        y = Math.floor(Math.random() * (window.innerHeight - radius * 6) + radius),
        vx = randomIntFromRange(2, 4)
        vy = randomIntFromRange(2, 4)
        dx = Math.random() < 0.5 ? -vx : vx,
        dy = Math.random() < 0.5 ? -vy : vy;    
        color = randomColor(colors);
        radius = randomIntFromRange(5, 20);
        balls.push(new Ball(x, y, dx, dy, radius, color))        
        
        
        // console.log(balls[i]);   
        // console.log(`${gravity}, ${friction}`);
    }


}

function animate() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);    
    animationId = requestAnimationFrame(animate);

    balls.forEach(element => {
        element.update()
    })
}



// var lock = false
// canvas.addEventListener("click", () => {
//     if (!lock) {
//         animate()
//         init()
//         // lock = true
//     }    
// })

function clearcanva(){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);   
    cancelAnimationFrame(animationId)
    balls = [];
}
canvas.addEventListener("click", () => {
    clearcanva();
    init() 
    animate()

})


