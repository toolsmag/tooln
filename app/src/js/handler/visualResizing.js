/** external module */
import $ from 'jquery';

/** internal module */
import utils from '../utiles';

export default (function (win, doc, $win, $doc) {
  return {
    $els: {},
    videoSize: { width: null, height: null },
    SELECTORS: {
      CONTAINER: '#visual',
      VIDEO_BOX: '#visualVideoBox',
      VIDEO: '#visualVideo',
      DIM_MASK: '#videoMaskRefBg',
      DIMMED: '#visualVideoMask',
    },
    init: function () {
      this.setElements();
      this.bindEvents();
      this.resizingVideo();
      this.resizingVideoDimmed();
    },
    setElements: function () {
      this.$els = Object.keys(this.SELECTORS).reduce(
        $.proxy(function (acc, cur) {
          var $el = $(this.SELECTORS[cur]);
          acc[utils.convertStringToCamelCase(cur.toLowerCase())] = $el;

          return acc;
        }, this),
        {},
      );
    },
    bindEvents: function () {
      $win.on(
        'resize.videoResizing',
        $.proxy(function () {
          this.resizingVideo();
          this.resizingVideoDimmed();
        }, this),
      );
    },
    resizingVideo: function (e) {
      if (this.isCropVertical()) {
        this.$els.video.css({ width: '100%', height: 'initial' });
      } else {
        this.$els.video.css({ width: 'initial', height: '100%' });
      }
    },
    resizingVideoDimmed: function (e) {
      var size = {
        width: $win.width(),
        height: $win.height(),
      };
      this.$els.dimmed.attr(size);
      this.$els.dim_mask.attr(size);
    },
    isCropVertical: function () {
      var y1 = $win.height() / $win.width();
      var y2 =
        (this.$els.video[0].videoHeight || this.$els.video[0].height) /
        (this.$els.video[0].videoWidth || this.$els.video[0].width);
      return y1 < y2;
    },
  };
})(window, document, $(window), $(document));
