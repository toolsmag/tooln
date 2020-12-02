/** external module */
import $ from 'jquery';

export default function text({ type, text }) {
  var $element = $('<div class="paragraph">');

  type === 'title' && $element.addClass('paragraph--title');
  type === 'caption' && $element.addClass('paragraph--caption');

  return $element.html(text);;
}
