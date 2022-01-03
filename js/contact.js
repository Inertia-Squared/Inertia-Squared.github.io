var width = innerWidth
var topMob = document.getElementById("topMobile")
if(width<992){topMob.classList.add("order-first")}
window.addEventListener('resize', function () {
  width = innerWidth
  if(width<992 && !topMob.classList.contains("order-first")){topMob.classList.add("order-first")}
  if(width>=992 && topMob.classList.contains("order-first")){topMob.classList.remove("order-first")}
});
const elements = document.getElementsByClassName('fade-load-0')
console.log(elements)

