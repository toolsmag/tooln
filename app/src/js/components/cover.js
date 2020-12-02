/** external module */
import $ from 'jquery';

export default function cover({ title, description, imageURL }) {
  var $container = $('<div class="cover__inner"></div>');
  var $title = $('<h2 class="cover__title"></h2>');
  var $description =  $('<p class="cover__text"></p>');
  
  $title.html(title);
  $description.html(description);
  
  return $container.append($title,$description);
}
