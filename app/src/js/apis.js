/** external module */
import $ from 'jquery';

var getBaseUrl = () => {
  var isDEV = location.host.match('github') || location.host.match('9999');
  return !!isDEV ? '' : 'https://toolsmag.github.io/tooln/dist/';
};

var naviListURL = getBaseUrl() + 'src/json/navi.json';
var bannerListURL = getBaseUrl() + 'src/json/banners.json';
var articleContentURL = getBaseUrl() + 'src/json/' + location.search.split('&')[0].slice(1) + '.json';
var articleListURL = getBaseUrl() + 'src/json/articles.json';

export function getArticleList() {
  return $.ajax({ url: articleListURL, dataType: 'json' });
}

export function getArticleContent() {
  return $.ajax({ url: articleContentURL, dataType: 'json' });
}

export function getNavList() {
  return $.ajax({ url: naviListURL, dataType: 'json' });
}

export function getBannerList() {
  return $.ajax({ url: bannerListURL, dataType: 'json' });
}