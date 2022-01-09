var width = innerWidth
const topMob = document.getElementById("topMobile")
if (width < 1200) {
  topMob.classList.add("order-first")
}
if (width >= 1200 && width < 1440) {
  $('.vanish-xl').css('display', 'none');
} else {
  $('.vanish-xl').css('display', 'initial');
}

window.addEventListener('resize', function () {
  width = innerWidth
  if (width < 1200 && !topMob.classList.contains("order-first")) {
    topMob.classList.add("order-first")
  }
  if (width >= 1200 && topMob.classList.contains("order-first")) {
    topMob.classList.remove("order-first")
  }

  if (width >= 1200 && width < 1440) {
    $('.vanish-xl').css('display', 'none');
  } else {
    $('.vanish-xl').css('display', 'initial');
  }
});
