/** external module */
import $ from 'jquery';

/** internal module */
import '../scss/common.scss';
import { getArticleList } from './apis';
import headerInteraction from './handler/headerInteraction';
import subjectInteraction from './handler/subjectInteraction';
import visualInteraction from './handler/visualInteraction';
import visualResizing from './handler/visualResizing';

import articleList from './components/articleList';
import banners from './components/banners';

/** bind event handler */
headerInteraction.init();
subjectInteraction.init();
visualInteraction.init();
visualResizing.init();
banners.init();

/** load articles && create articles */
getArticleList().done(function ({ initLength, moreLength, list }) {
  list.length &&
    $('.container--articles')
      .css({ display: 'block' })
      .append(articleList({ initLength, moreLength, list }));
});
