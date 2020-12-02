/** external module */
import $ from 'jquery';

export default function intro({ type, label, credits, summary }) {
  var $element = $(
    '<div class="intro">' +
      '<div class="intro__meta">' +
        '<div class="label"><span></span></div>' + 
        '<div class="credits">' + 
        '<p><strong>Words by</strong><span></span></p>' + 
        '<p><strong>Photography by</strong><span></span></p>' + 
        '</div>' +
      '</div>' +
      '<div class="intro__summary"></div>' +
    '</div>'
  );

  $element.find('.label span').html(label);
  $element.find('.intro__summary').html(summary);
  $element.find('.credits').html(Object.keys(credits).map(function (key) {
    return $('<p><strong>'+ key +' by</strong><span>' + credits[key] +'</span></p>');
  }));

  return $element
}
