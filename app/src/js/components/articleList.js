/** external module */
import $ from 'jquery';
/** internal module */
import utiles from '../utiles';
import articleItem, { CLASS_SELECTOR, ATTR_SELECTOR } from './articleItem';

export default function articleList({ initLength, moreLength, list }) {
  var $container = $('<div class="articles"><div class="articles__inner"></div></div>');
  var $loadMore = $('<div class="load--more"><button type="button"><span>Load More</span></button></div>');
  var currIndex = 0;
  var total = list.length;

  /* ********************************************************** */
  // 함수 선언
  /* ********************************************************** */
  function updateCurrIndex(index) {
    currIndex = index;
  }

  function toggleLoadButton() {
    if (currIndex >= total) { 
      $loadMore.css('display', 'none');
    } else {
      $loadMore.css('display', 'block');
    }
  }

  function toggleDescription($el, isReset) {
    var $target = $el ? $el.closest(CLASS_SELECTOR.ITEM) : $(CLASS_SELECTOR.ITEM);

    if (isReset) {
      return $target.attr(ATTR_SELECTOR.TOGGLE, false);
    }

    if ($target.attr(ATTR_SELECTOR.TOGGLE) === 'false') {
      $target.attr(ATTR_SELECTOR.TOGGLE, true);
    } else {
      $target.attr(ATTR_SELECTOR.TOGGLE, false);
    }
  }
  
  function loadarticle(loadLength) {
    var lastIndex = currIndex + loadLength;

    $container.find('.articles__inner').append(
      list.slice(currIndex, lastIndex).map(function (item) {
        return articleItem(item);
      }),
    );

    updateCurrIndex(lastIndex);
    toggleLoadButton();
  }

  /* ********************************************************** */
  // 이벤트 바인드
  /* ********************************************************** */
  $(window).on('resize', function () {
    !utiles.isMobileSize() && toggleDescription(null, true);
  })
  $container.on('click', function (e) {
    var $target = $(e.target);

    if ($target.is(CLASS_SELECTOR.TOGGLER) || $target.closest(CLASS_SELECTOR.TOGGLER).length) {
      toggleDescription($target);
    }

    if ($target.is($loadMore) || $target.closest('.load--more').length) {
      loadarticle(moreLength);
    }
  });

  /* ********************************************************** */
  // 실행 스크립트
  /* ********************************************************** */
  $container.append($loadMore);
  loadarticle(initLength);
  return $container;
}
