import './swiper.js';
import { multipleRippleEffect } from './ripple/ripple.js';
import { scrollTo } from './utils.js';
import enableAnimations from './animations.js';
// TODO animations

const enableRipple = () => {
  document.addEventListener('mousedown', function (event) {
    if (event.target.dataset.effect !== 'ripple') return 1;
    multipleRippleEffect(event, { onRippleStart });
    function onRippleStart() {}
  });
};

const enableGoUp = () => {
  const goUp = document.querySelector('.productly-go-up');
  document.addEventListener('scroll', function (event) {
    // get viewport height
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    // show go up if scrolled down
    if (pageYOffset > vh) {
      goUp.classList.add('visible');
    } else {
      goUp.classList.remove('visible');
    }
  });
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('go-up')) {
      scrollTo(document.documentElement, 0, 300);
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  enableRipple();
  enableGoUp();
  enableAnimations();
});
