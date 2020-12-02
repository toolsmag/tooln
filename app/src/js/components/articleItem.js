/** external module */
import $ from 'jquery';

export var CLASS_SELECTOR = {
  ITEM: '.article',
  TOGGLER: '.button--more',
};

export var ATTR_SELECTOR = {
  TOGGLE: 'data-expanded',
};

export default function articleItem({ type, label, title, link, description, imageURL }) {
  var $container = $('<article>');

  $container.addClass(CLASS_SELECTOR.ITEM.slice(1));
  $container.attr(ATTR_SELECTOR.TOGGLE, false);

  return $container.append(
    articleThumbnail({ type, link, description, imageURL }),
    articleInfo({ label, title, link }),
  );
}

function articleThumbnail({ type, link, description, imageURL }) {
  return $(
    '<span class="article__thumb">' + 
      '<a href="' + link + '">' + 
        '<span class="image"><img src="' + imageURL + '"/></span>' +
        '<span class="desc ' + ('desc--' + (type || 'type1')) + '">' +
          '<span class="inner">' +
          '<span class="text">'+ description +'</span>' +
          '<span class="read"><span>Read</span></span>' +
          '</span>' +
        '</span>' + 
      '</a>' + 
    '</span>'
  );
}

function articleInfo({label, title, link}) {
  return $(
    '<span class="article__info">' + 
      '<span class="meta">' + 
        '<span class="label">'+ label +'</span>' + 
        '<button type="button" class="' + CLASS_SELECTOR.TOGGLER.slice(1) + ' view-mo">' + 
          '<span class="more">MORE</span>' + 
          '<span class="less">LESS</span>' + 
        '</button>' + 
      '</span>' + 
      '<a href="'+ link + '">' + 
        '<span class="title"><span>'+ title +'</span>' + 
      '</a>' + 
    '</span>'
  );
}
