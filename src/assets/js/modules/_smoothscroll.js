// smooth scroll
import MoveTo from 'moveto'

const moveto = new MoveTo({
  tolerance: 100,
  duration: 800,
  easing: 'easeOutQuart',
})
let anchorTags = document.querySelectorAll('a[href^="#"]');
let totopBtn = document.getElementById('totopBtn');

anchorTags = Array.prototype.slice.call(anchorTags, 0)//IE対策
anchorTags.forEach((value) => {
  moveto.registerTrigger(value)
  value.addEventListener('click', function () {
    document.getElementById('globalNav').checked = false;
  })
})

const moveto2 = new MoveTo({
  duration: 800,
  easing: 'easeOutQuart',
})
totopBtn.addEventListener('click', function () {
  moveto2.registerTrigger(this)
})
