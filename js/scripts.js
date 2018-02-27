document.addEventListener('DOMContentLoaded', () => {

  const logo = document.querySelector('#logo');
  // const me = document.querySelector('#me');
  // const page = document.querySelector('#page');

  for (let i = logo.children.length; i >= 0; i--) {
    logo.appendChild(logo.children[Math.random() * i | 0]);
  }
  TweenMax.staggerFrom(logo.children, 0.1, {
    opacity: 0,
    scale: 0,
    ease: Elastic.easeOut.config(1, 0.3)
  }, 0.02);

  // TweenMax.from(page, 2, {
  //   opacity: 0,
  //   ease: Power2.easeOut
  // });

  // TweenMax.set(me, { perspective: 400 })
  // TweenMax.from(me, 0.3, {
  //   opacity: 0,
  //   transformOrigin: "top center",
  //   rotationX: -90,
  //   ease: Power2.easeOut,
  //   delay: 0.5
  // });

  const rTop = document.querySelector('.skew-right');
  const lTop = document.querySelector('.skew-left');

  TweenMax.from(rTop, 0.5, {
    x: "-100%",
    ease: SlowMo.ease.config(0.7, 0.7, false),
    delay: 1
  });
  TweenMax.from(lTop, 0.5, {
    x: "100%",
    ease: SlowMo.ease.config(0.7, 0.7, false),
    delay: 1
  });

});
