/** external module */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Register Plugin for GSAP */
gsap.registerPlugin(ScrollTrigger);

/** Get DOM Elements */
var bannerTitles = gsap.utils.toArray('.banner__info .title');

export default {
  init: function () {
    console.log(1);
    /** Set Scroll Interaction */
    ScrollTrigger.matchMedia({
      '(max-width: 769px)': function () {
        // 이미지 모션
        bannerTitles.forEach(function (element) {
          gsap.fromTo(
            element,
            { y: element.offsetHeight },
            {
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger:element,
                start: "center bottom",
                end: function () {
                  return '+=' + element.getBoundingClientRect().height;
                },
              },
            },
          );
        });
        ///
      },
    });
    ////
  },
};
