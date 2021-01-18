/** external module */
import $ from 'jquery';

// <ul class="js-header-navi-items">
//   <li class="nav__item"><a href="article.html?article1">일상의 존중, 봉태규와 하시시박</a></li>
//   <li class="nav__item"><a href="article.html?article2">비누의 요원한 얼굴</a></li>
//   <li class="nav__item"><a href="article.html?article4">보이지 않는 풍요로의 초대, 이솝</a></li>
//   <li class="nav__item"><a href="article.html?article5">친환경 코즈메틱 브랜드, 러쉬</a></li>
//   <li class="nav__item"><a href="article.html?article6">10인의 공간 속 사적인 비누 취향</a></li>
//   <li class="nav__item"><a href="article.html?article7">삶에 정화와 멈춤이 필요한 순간, 한아조</a></li>
//   <li class="nav__item"><a href="article.html?article8">복잡한 세상에서 비누를 바라보는 특별한 시선, 이필호</a></li>
//   <li class="nav__item"><a href="article.html?article3">대호탕의 시간</a></li>
// </ul>

function naviItem({ url, text }) {
  return '<li class="nav__item"><a href="' + url + '">' + text + '</a></li>';
}

export default function navi(datas) {
  var $naviContainer = $('.js-header-navi-items');
  var navItems = datas.map((data) => naviItem(data));
  $naviContainer.html(navItems);
}