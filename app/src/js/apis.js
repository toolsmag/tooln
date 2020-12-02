/** external module */
import $ from 'jquery';

var articleContentURL = 'src/json/' + location.search.split('&')[0].slice(1) + '.json';
var articleListURL = 'src/json/articles.json';

export function getArticleList() {
  return $.ajax({ url: articleListURL, dataType: 'json' });
}

export function getArticleContent() {
  return $.ajax({ url: articleContentURL, dataType: 'json' });
}
