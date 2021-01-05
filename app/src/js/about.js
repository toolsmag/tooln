/** external module */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** internal module */
import '../scss/common.scss';
import headerInteraction from './handler/headerInteraction';

/** 공통 이벤트 핸들러 */
headerInteraction.init();

/** Register Plugin for GSAP */
gsap.registerPlugin(ScrollTrigger);

/** Get DOM Elements */
var imgs = gsap.utils.toArray('.about-intro__img, .about-info__img, .about-content__desc img');
var sections = gsap.utils.toArray('section');
window.a = imgs;
/** Get Document width */
var getTotalWidth = () => sections.reduce((total, section) => total + section.offsetWidth, 0);

/** Set Scroll Interaction */
ScrollTrigger.matchMedia({
  '(min-width: 769px)': function () {
    // 세로 스크롤시 가로로 스크롤이동
    gsap.to(sections, {
      x: function () {
        return '-' + (getTotalWidth() - window.innerWidth);
      },
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-section',
        pin: true,
        scrub: 1,
        end: function () {
          return '+=' + getTotalWidth();
        },
        invalidateOnRefresh: true,
      },
    });
    
    // 타이틀 모션
    gsap.to('.about-intro__tit', {
      xPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-intro',
        start: 'center center',
        scrub: true,
      },
    });
    
    // 이미지 모션
    imgs.forEach(function (element) {
      gsap.to(element, {
        scale: 1,
        scrollTrigger: {
          scrub: true,
          start: element.parentNode.closest('section').offsetLeft,
          end: function () {
            return '+=' + element.parentNode.closest('section').offsetWidth;
          },
        },
      });
    });
  },
});
