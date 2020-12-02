/** external module */
import { gsap, Expo } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** add gsap plugin */
gsap.registerPlugin(ScrollTrigger);

var eventTargets = [
  {
    trigger: '#subjectTitle',
    target: '#subjectTitle img',
  },
  {
    trigger: '#subjectImage1',
    target: '#subjectImage1 img',
  },
  {
    trigger: '#subjectImage2',
    target: '#subjectImage2 img',
  },
  {
    trigger: '#subjectImage3',
    target: '#subjectImage3 img',
  },
  {
    trigger: '#subjectText1',
    target: '#subjectText1>div',
  },
  {
    trigger: '#subjectText2',
    target: '#subjectText2>div',
  },
  {
    trigger: '#subjectText3',
    target: '#subjectText3>div',
  },
];

function hide(elem) {
  gsap.set(elem, { y: 0, opacity: 0 });
}

function animateFrom(elem, direction) {
  var direction = direction || 1;
  var y = direction * 130;

  gsap.fromTo(elem, { y: y, opacity: 0 }, {
    duration: 3,
    y: 0,
    opacity: 1,
    ease: Expo.easeOut,
    overwrite: "auto",
  });
}

eventTargets.forEach((eventTarget) => {
  hide(eventTarget.target);
  ScrollTrigger.create({
    trigger: eventTarget.trigger,
    onEnter: function () {
      animateFrom(eventTarget.target);
    },
    onEnterBack: function () {
      animateFrom(eventTarget.target, -1);
    },
    onLeave: function () {
      hide(eventTarget.target);
    },
  })
});
