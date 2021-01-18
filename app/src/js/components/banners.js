/** external module */
import $ from 'jquery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getBannerList } from '../apis'
/** Register Plugin for GSAP */
gsap.registerPlugin(ScrollTrigger);

/** Get DOM Elements */
var bannerTitles = gsap.utils.toArray('.banner__info .title');

// <div class="banner">
//   <a href="./article.html?article2">
//     <span class="banner__inner">
//       <span class="banner__thumb">
//         <img class="view-pc" src="src/img/article/article2/banner.jpg" alt="" />
//         <img class="view-mo" src="src/img/article/article2/thumb.jpg" alt="" />
//       </span>
//       <span class="banner__info">
//         <span class="label">Article</span>
//         <span class="title"><span>비누의 요원한 얼굴</span></span>
//         <span class="desc">
//           닳고 마른 비누가 희고 깨끗한 배경 가운데 누워 있다.
//           얼마나 오래된 비누인지 짐작하기 어려운 것은 이 배경 때문이다.
//           언제나처럼, 비누는 흘러간 생을 담담히 보내고 내일의 미지를 기다리는 중이다.
//         </span>
//         <span class="author"><strong>Editor</strong> Danbee Bae</span>
//         <span class="read view-mo">Read</span>
//       </span>
//     </span>
//   </a>
// </div>

function bannerItem({ link, imageURL, imageMobileURL, label, title, description, credits }) {
  var authorTitles = Object.keys(credits);
  var authors = !authorTitles.length ? '' : authorTitles.map(function (authorTitle) {
    return '<span class="author"><strong>' + authorTitle + '</strong> ' + credits[authorTitle] + '</span>';
  });

  return '<div class="banner">' +
    '<a href="' + link + '">' + 
      '<span class="banner__inner">' + 
        '<span class="banner__thumb">' + 
          '<img class="view-pc" src="' + imageURL + '" alt="" />' + 
          '<img class="view-mo" src="' + (imageMobileURL || imageURL) + '" alt="" />' + 
        '</span>' + 
        '<span class="banner__info">' + 
          '<span class="label">' + label + '</span>' + 
          '<span class="title"><span>' + title + '</span></span>' + 
          '<span class="desc">' + description + '</span>' + authors + 
          '<span class="read view-mo">Read</span>' + 
        '</span>' + 
      '</span>' + 
    '</a>' + 
  '</div>';
}


export default {
  init: function () {
    getBannerList().done(function ({ list }) {
      if (!list.length) {
        return false;
      }

      $('.banners__inner').append(list.map((data) => bannerItem(data)));

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
    });
  },
};
