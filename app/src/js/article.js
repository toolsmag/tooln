/** external module */
import $ from 'jquery';

/** internal module */
import '../scss/common.scss';
import * as apis from './apis';
import headerInteraction from './handler/headerInteraction';
import cover from './components/cover';
import text from './components/text';
import image from './components/image';
import intro from './components/intro';
import gallery, { gallerySwiperInit } from './components/gallery';
import relatedList from './components/articleList';

/** bind event handler */
headerInteraction.init();

/** creator for article */ 
var contents = { gallery, image, intro, title: text, text };

/** load related data && create related list */
function createRelatedList($container, relatedIds) {
  apis.getArticleList().done(function (data) {
    var relatedItemDatas = data.list.filter(function (item) {
      return relatedIds.indexOf(item.id) >= 0;
    });

    relatedItemDatas.length &&
      $container.css({ display: 'block' }).append(
        relatedList({
          initLength: data.initLength,
          moreLength: data.moreLength,
          list: relatedItemDatas,
        }),
      );
  });
}

// acticle script
apis.getArticleContent()
  .done(function (data) {
    var $coverEl = $('.cover');
    var $writeEl = $('.write');
    var $relatedEl = $('.related');

    // create article contents
    var coverChild = cover(data.cover);
    var writeChild = data.contents.map(function (content) {
      return contents[content.type](content);
    });

    // add article contents
    $coverEl.css('background-image', 'url(' + data.cover.imageURL + ')').append(coverChild);
    $writeEl.append(writeChild);

    // swiper setting
    gallerySwiperInit();

    // create & add related list
    data.related.length && createRelatedList($relatedEl, data.related);
  })
  .fail(function (qXHR, textStatus, errorThrown) {
    alert('요청하신 내용을 처리할 수 없습니다. (' + errorThrown + ')');
    window.history.back();
  })
  .always(function (data) {});
