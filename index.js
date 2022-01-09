//TODO
//make separate .js file that makes footer have a min Y value that scales with resolution so that footer can't get stuck in the middle of the screen on smaller pages

const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')
var width = innerWidth
var height = innerHeight
canvas.width = width - width / 8
canvas.height = height - 200
var init;
const spacer = document.getElementById("spacer")
spacer.height = height - 200
spacer.width = width - width / 8
const topMob = document.getElementById("topMobile")
//const arrow = document.getElementById("arrow")
//arrow.style.top = "200px"

var particleSize = 35
var particles = 6
var friction = 0.945
class Particle {
  constructor(x, y, rad, col) {
    this.x = x
    this.y = y
    this.rad = rad
    this.col = col
    this.zIndex = 1
    this.xv = 1
    this.yv = 0
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.rad+5, 0, Math.PI * 2, false)
    c.fillStyle = this.col
    c.fill()
    c.strokeStyle = 'black'
    c.stroke()
  }

  updateSelf() {
    this.updatePhysics()
    this.draw()
  }

  updatePhysics() {

    this.x += this.xv
    this.y += this.yv

    let stuck = false;
    if(this.x<0){
      stuck=true;
      this.x=0;
      if(this.wasStuck){
        this.x=canvas.width;
        this.wasStuck=false;
      }
      this.xv*=-1;
      this.wasStuck = true;
      stuck=true;
    }
    if(this.x>canvas.width){
      this.x=canvas.width;
      if(this.wasStuck){
        this.x=0;
        this.wasStuck=false;
      }
      this.wasStuck = true;
      this.xv*=-1;
      stuck=true;
    }
    if(this.y<0){
      this.y=0;
      if(this.wasStuck){
        this.y=canvas.height;
        this.wasStuck=false;
      }
      this.wasStuck = true;
      this.yv*=-1;
      stuck=true;
    }
    if(this.y>canvas.height){
      if(this.wasStuck){
        this.y=0;
        this.wasStuck=false;
      }else{
        this.y=canvas.height;
      }
      this.wasStuck = true;
      this.yv*=-1;
      stuck=true;
    }
    if(!stuck){
      this.wasStuck = false;
    }

    part.forEach(p => this.doInteraction(p))

    this.xv += ExtraVec.x / (5.1*friction*friction)
    this.yv += ExtraVec.y / (5.1*friction*friction)

    this.xv *= friction
    this.yv *= friction
  }

  doInteraction(p) {
    let dist = distance(this.x, this.y, p.x, p.y)
    if (dist < this.rad/2) return

    let vec = Vector2.sub(this.x, this.y, p.x, p.y).norm()

    this.xv -= vec.x * this.rad * 2.3 / dist
    this.yv -= vec.y * this.rad * 2.3 / dist
    this.xv += vec.x * 8100 / (dist * dist)
    this.yv += vec.y * 8100 / (dist * dist)
  }
	
	setSize(amt){
		this.rad = amt
	}

}

//  for (let i = 0; i < particles; i++) {
//    part.push(new Particle(Math.random() * innerWidth, Math.random() * innerHeight, particleSize, 'blue'))
//  }
document.addEventListener("click", (event) => {
	particleSize-=0.25;
  if (particleSize >= 19.5) {
	part.forEach(p => p.setSize(particleSize))
    part.push(new Particle(event.clientX-width/16, scrollY+event.clientY-25-particleSize, particleSize, 'blue'))
    friction -= 0.002

  } else {
    for (let i = 0; i < 62; i++) {
      part.pop()
      friction += 0.002
    }
	particleSize = 35
	part.forEach(p => p.setSize(particleSize))
  }
});

function distance(x1, y1, x2, y2) {
  return (Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)))
}

class Vector2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  static sub(x1, y1, x2, y2) {
    return new Vector2(x1 - x2, y1 - y2)
  }
  static subV(v1, v2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y)
  }
  sub(v) {
    return new Vector2(this.x - v.x, this.y - v.y)
  }
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  norm() {
    let mag = this.mag()
    return new Vector2(this.x / mag, this.y / mag)
  }
  mult(fac) {
    return new Vector2(this.x * fac, this.y * fac)
  }
  lim(max) {
    let mag = this.mag()
    return (mag > max) ? this.mult(max / mag) : this
  }
  toString() {
    return "" + [this.x, this.y]
  }
}

var part = [];
if (!init) {
  width = innerWidth
  height = innerHeight
  canvas.width = width - width / 8
  canvas.height = height - 200
  spacer.height = height - 200
  spacer.width = width - width / 8
  init = true;
  for (let i = 0; i < particles; i++) {
    part.push(new Particle(Math.random() * innerWidth, Math.random() * innerHeight, particleSize, 'blue'))
  }
}

var mouseX = 0;
var mouseY = 0;
var lastX = 0;
var lastY = 0;
var ExtraVec = new Vector2(0, 0)
document.addEventListener("mousemove", () => {
  mouseX = event.clientX
  mouseY = event.clientY
  ExtraVec = Vector2.sub(mouseX, mouseY, lastX, lastY).lim(36)
});

window.addEventListener('resize', function () {
  width = innerWidth
  height = innerHeight
  canvas.width = width - width / 8
  canvas.height = height - 200
  spacer.height = height - 200
  spacer.width = width - width / 8
  if(width<992 && !topMob.classList.contains("order-first")){topMob.classList.add("order-first")}
  if(width>=992 && topMob.classList.contains("order-first")){topMob.classList.remove("order-first")}
});

$(window).on("load",function() {
    function fade() {
        var animation_height = $(window).innerHeight() * 0.25;
        var ratio = Math.round( (1 / animation_height) * 10000 ) / 10000;

        $('.fade').each(function() {

            var objectTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).innerHeight();

            if ( objectTop < windowBottom ) {
                if ( objectTop < windowBottom - animation_height ) {
                    $(this).css( {
                        transition: 'opacity 0.1s linear',
                        opacity: 1
                    } );

                } else {
                    $(this).css( {
                        transition: 'opacity 0.25s linear',
                        opacity: (windowBottom - objectTop) * ratio
                    } );
                }
            } else {
                $(this).css( 'opacity', 0 );
            }
        });
    }
    $('.fade').css( 'opacity', 0 );
    fade();
    $(window).scroll(function() {fade();});
});

$('#collapseOne').on('show.bs.collapse', function () {
  let animated = document.getElementById("accImg1")
  animated.classList.remove('rotateUnflip')
	animated.offsetWidth
  animated.classList.add('rotateFlip')
})

$('#collapseOne').on('hide.bs.collapse', function () {
  let animated = document.getElementById("accImg1")
  animated.classList.remove('rotateFlip')
	animated.offsetWidth
  animated.classList.add('rotateUnflip')
})

$('#collapseTwo').on('show.bs.collapse', function () {
  let animated = document.getElementById("accImg2")
  animated.classList.remove('rotateUnflip')
	animated.offsetWidth
  animated.classList.add('rotateFlip')
})

$('#collapseTwo').on('hide.bs.collapse', function () {
  let animated = document.getElementById("accImg2")
  animated.classList.remove('rotateFlip')
	animated.offsetWidth
  animated.classList.add('rotateUnflip')
})

$('#collapseThree').on('show.bs.collapse', function () {
  let animated = document.getElementById("accImg3")
  animated.classList.remove('rotateUnflip')
	animated.offsetWidth
  animated.classList.add('rotateFlip')
})

$('#collapseThree').on('hide.bs.collapse', function () {
  let animated = document.getElementById("accImg3")
  animated.classList.remove('rotateFlip')
	animated.offsetWidth
  animated.classList.add('rotateUnflip')
})

function update() {
  c.clearRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(update)
  part.forEach(p => p.updateSelf())
  lastX = mouseX
  lastY = mouseY
  ExtraVec = ExtraVec.mult(0.9)
}
update()
