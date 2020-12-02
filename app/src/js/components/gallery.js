/** external module */
import $ from 'jquery';
import Swiper from 'Swiper';
import { gsap } from 'gsap';

export default function gallery({ type, imageURLs }) {
  var $element = $(
    '<div class="gallery">' +
      '<div class="gallery__inner">' +
      '<ul class="gallery__slides"></ul>' +
      '<div class="gallery__pagination"></div>' +
      '</div>' +
      '</div>',
  );

  imageURLs.forEach(function (url) {
    $element
      .find('.gallery__slides')
      .append($('<li class="slide"><img src="' + url + '" alt=""></li>'));
  });

  return $element;
}

export function gallerySwiperInit() {
  if (!$('.gallery__inner').length) {
    return false;
  }

  var $slides = $('.gallery__slides');

  return new Swiper('.gallery__inner', {
    wrapperClass: 'gallery__slides',
    slideClass: 'slide',
    spaceBetween: 30,
    // autoHeight: true,
    pagination: '.gallery__pagination',
    bulletClass: 'button',
    bulletActiveClass: 'current',
    paginationClickable: true,
    onTransitionEnd: function (swiper) {
      var index = swiper.activeIndex;
      var height = $slides.find('img').eq(index).height();

      gsap.to($slides[0], { height, overwrite: 'auto' });
    },
    onSlideChangeEnd: function (swiper) {
      var index = swiper.activeIndex;
      var height = $slides.find('img').eq(index).height();

      gsap.to($slides[0], { height, overwrite: 'auto' });
    },
    paginationBulletRender: function (swiper, index, className) {
      return (
        '<button class="' + className + '" aria-label="' + (index + 1) + ' 이미지 보기"></button>'
      );
    },
  });
}
