/** external module */
import $ from 'jquery';

/** internal module */
import text from './text';

export default function image({ isWide, imageURL, caption }) {
  var $container = $('<div class="picture">');
  var $image = $('<img>');
  var $text = caption ? text({ type: 'caption', text: caption }) : '';

  isWide && $container.addClass('picture--wide');
  $image.attr('src', imageURL);

  return $container.append([$image, $text]);
}
