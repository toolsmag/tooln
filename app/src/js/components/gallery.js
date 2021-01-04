/** external module */
import $ from 'jquery';
import Swiper from 'Swiper';

export default function gallery({ type, imageURLs }) {
  var $element = $(
    '<div class="gallery">' +
      '<div class="gallery__inner">' +
      '<ul class="gallery__slides"></ul>' +
      '<div class="gallery__buttons">' +
      '<button type="button" class="button button--prev" aria-label="이전"></button>' +
      '<button type="button" class="button button--next" aria-label="다음"></button>' +
      '</div>' +
      '</div>' +
      '<div class="gallery__pagination"></div>' +
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

  document.querySelectorAll('.gallery__buttons button').forEach((el) => {
    el.addEventListener('click', () => console.log(1));
  });

  return new Swiper('.gallery__inner', {
    wrapperClass: 'gallery__slides',
    slideClass: 'slide',
    spaceBetween: 30,
    pagination: '.gallery__pagination',
    nextButton: '.gallery__buttons .button--next',
    prevButton: '.gallery__buttons .button--prev',
    bulletClass: 'button',
    bulletActiveClass: 'current',
    paginationClickable: true,
    paginationBulletRender: function (swiper, index, className) {
      return (
        '<button class="' + className + '" aria-label="' + (index + 1) + ' 이미지 보기"></button>'
      );
    },
  });
}
