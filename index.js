const canvas = document.getElementById('canvas')
const c = canvas.getContext('2d')
const nav = document.getElementById("mainNav")
var width = innerWidth
var height = innerHeight
canvas.width = width - width/8
canvas.height = height - nav.clientHeight
var init;
const spacer = document.getElementById("spacer")
spacer.height = height - nav.clientHeight
spacer.width= width - width/8
//const tx = document.getElementById('tx')

//console.log([canText.clientWidth/2,canText.offsetWidth/2,canText.width/2])
//const video = document.getElementById('video')
//video.play()
//video.style.height = innerHeight - nav.clientHeight

//console.log("-"+(canText.offsetWidth/2).toString()+"px")
//console.log(canText.offsetWidth)

var friction = 0.925
//const chaos = 0.5
class Particle{
	constructor(x,y,rad,col){
		this.x = x
		this.y = y
		this.rad = rad
		this.col = col
		this.zIndex = 1
		this.xv = 1
		this.yv = 0
	} 
	
	draw(){
		c.beginPath()
		c.arc(this.x, this.y, this.rad, 0, Math.PI*2, false)
		c.fillStyle = this.col
		c.fill()
		c.strokeStyle = 'black'
		c.stroke()
	}
	
	updateSelf(){
		this.updatePhysics()
		this.draw()
	}
	
	updatePhysics(){

		this.x+=this.xv
		this.y+=this.yv

		if(this.x>canvas.width) this.x = 0
		if(this.x<0) this.x = canvas.width
		if(this.y>canvas.height) this.y = 0
		if(this.y<0) this.y = canvas.height
	
		part.forEach(p => this.doInteraction(p))

		this.xv+=ExtraVec.x/5
		this.yv+=ExtraVec.y/5

		this.xv*=friction
		this.yv*=friction
	}
	
	doInteraction(p){
		let dist = distance(this.x,this.y,p.x,p.y)
		if(dist<this.rad/2) return

		let vec = Vector2.sub(this.x,this.y,p.x,p.y).norm()

		this.xv-=vec.x*90/dist
		this.yv-=vec.y*90/dist
		this.xv+=vec.x*90*(this.rad*sqrtl)/(dist*dist)
		this.yv+=vec.y*90*(this.rad*sqrtl)/(dist*dist)
	}
	
}

var sqrtl = Math.sqrt(6)
document.addEventListener("click", () => {
	//extraX = Math.random()*0.35-0.175
	//extraY = Math.random()*0.35-0.1755
	if(part.length<=36){
		part.push(new Particle(Math.random()*innerWidth,Math.random()*innerHeight,25,'blue'))
	friction-=0.0032
		sqrtl=Math.sqrt(part.length/1.25)
	}else{
		for(let i = 0; i < 31; i++) {
			part.pop()
			friction+=0.0032
		}
		sqrtl=Math.sqrt(part.length/1.25)
	}
});

function distance(x1, y1, x2, y2){
	return (Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) ))
}

class Vector2{
	constructor(x,y){
		this.x = x
		this.y = y
	}
	static sub(x1,y1,x2,y2){
		return new Vector2(x1-x2,y1-y2)
	}
	static subV(v1,v2){
		return new Vector2(v1.x-v2.x,v1.y-v2.y)
	}
	sub(v){
		return new Vector2(this.x-v.x,this.y-v.y) 
	}
	mag(){
		return Math.sqrt(this.x*this.x+this.y*this.y)
	}
	norm(){
		let mag = this.mag()
		return new Vector2(this.x/mag,this.y/mag)
	}
	mult(fac){
		return new Vector2(this.x*fac,this.y*fac)
	}
	lim(max){
		let mag = this.mag()
		return (mag>max) ? this.mult(max/mag) : this
	}
	toString(){
		return ""+[this.x, this.y]
	}
}

var part = [];
//nav.style.display = "none"
if(!init){
   init = true;
	//window.scrollTo(0,nav.clientHeight)
	for(let i = 0; i < 6; i++){
		part.push(new Particle(Math.random()*innerWidth,Math.random()*innerHeight,25,'blue'))
	}
   }

var mouseX = 0;
var mouseY = 0;
var lastX = 0;
var lastY = 0;
var ExtraVec = new Vector2(0,0)
document.addEventListener("mousemove", () => {
	mouseX = event.clientX;
	mouseY = event.clientY;
	ExtraVec = Vector2.sub(mouseX,mouseY,lastX,lastY).lim(25)
	//console.log(ExtraVec.lim(5))
});

window.addEventListener('resize', function(){
	width = innerWidth
	height = innerHeight
	canvas.width = width - width/8
	canvas.height = height - nav.clientHeight
	spacer.height = height - nav.clientHeight
	spacer.width= width - width/8
});


function update() {
	c.clearRect(0,0,canvas.width,canvas.height)
	requestAnimationFrame(update)
	part.forEach(p => p.updateSelf())
	lastX = mouseX
	lastY = mouseY
	ExtraVec = ExtraVec.mult(0.9)
	//console.log(ExtraVec)
	//console.log([mouseX,mouseY])
}
update()