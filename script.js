const slide = new Slide('.slide', '.slide-wrapper');
slide.init();

// scroll suave
function initSmoothScroll() {
  const menuItems = document.querySelectorAll('.js-menu a[href^="#"]');

  function getScrollTopByHref(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
  }

  function scrollToPosition(to) {
    smoothScrollTo(0, to);
  }

  function scrollToIdOnClick(event) {
    event.preventDefault();
    const to = getScrollTopByHref(event.currentTarget) - 80;
    scrollToPosition(to);
  }

  menuItems.forEach((item) => {
    item.addEventListener('click', scrollToIdOnClick);
  });
  function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1)
        return (distance / 2) * time * time * time * time + from;
      return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
  }
}

initSmoothScroll();

// Parallax
function setParallaxBackground() {
  const parallaxEffect = document.querySelectorAll('.parallax');

  parallaxEffect.forEach(function (element) {
    let dataBackgroundImage = element.getAttribute('data-bg-image');
    element.style.backgroundImage = `url(${dataBackgroundImage})`;
  });
}

document.addEventListener('DOMContentLoaded', setParallaxBackground);

function setParallaxPosition() {
  const parallaxPosition = document.querySelectorAll('.parallax');
  if (window.innerWidth >= 800) {
    parallaxPosition.forEach(function (element) {
      element.classList.remove('mobile-parallax');

      if (!element.dataset.firstTop) {
        element.dataset.firstTop = element.offsetTop;
      }
      let firstTop = element.dataset.firstTop;
      let xPos = '50%';
      let speedParallax = element.getAttribute('data-background-ratio');
      let sizeParallax = element.getAttribute('data-size');
      let positionInitial = element.getAttribute('data-position-initial');

      positionInitial = positionInitial !== null ? positionInitial : '0';

      element.style.backgroundSize = sizeParallax;
      speedParallax = speedParallax !== null ? speedParallax : '0.1';
      let pos = window.scrollY;
      element.style.backgroundPosition = `${xPos} ${Math.round(
        (firstTop - pos - positionInitial) * speedParallax,
      )}px`;
    });
  } else {
    parallaxPosition.forEach(function (element) {
      element.classList.add('mobile-parallax');
      element.style.backgroundPosition = 'center center';
    });
  }
}

window.addEventListener('scroll', setParallaxPosition);
window.addEventListener('resize', setParallaxPosition);
setParallaxPosition();
