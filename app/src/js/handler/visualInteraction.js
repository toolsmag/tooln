/** external module */
import $ from 'jquery';
import { TweenLite, Expo, Elastic } from 'gsap';

/** internal module */
import utils from '../utiles';

export default (function (win, doc, $win, $doc) {
  return {
    SELECTORS: {
      CONTAINER: '#visual',
      CIRCLES: '#videoMaskCircles',
      TRACKER: '#videoMaskTracker',
      TEMP: '#videoMaskCircleTemp',
    },
    $els: {},
    cursor: { x: 0, y: 0 },
    circle: { minRadius: 0, maxRadius: 0 },
    tracker: {
      cx: 0,
      cy: 0,
      r: 0,
      minRadius: 60,
      maxRadius: 80,
      ease: 0.17,
      traceable: false,
    },
    init: function () {
      this.isMobileSize = utils.isMobileSize();

      // set Elements
      this.$els.circles = $(this.SELECTORS.CIRCLES);
      this.$els.tracker = $(this.SELECTORS.TRACKER);
      this.$els.temp = $(this.SELECTORS.TEMP);
      // set Events
      $win.on('resize', $.proxy(this.resizeEventHandler, this));
      $win.on('scroll', $.proxy(this.scrollEventHandler, this));
      $doc.on('click', $.proxy(this.clickEventHandler, this));
      $doc.on('mouseenter', $.proxy(this.mouseenterEventHandler, this));
      $doc.one('mousemove', $.proxy(this.mouseenterEventHandler, this));
      $doc.on('mousemove', $.proxy(this.mousemoveEventHandler, this));
      $doc.on('mouseleave', $.proxy(this.mouseleaveEventHandler, this));
      // set property
      this.setTracable(!this.isMobileSize);
      this.setCircleRadiusRange(this.isMobileSize);
    },
    clickEventHandler: function (e) {
      if ($(e.target).closest(this.SELECTORS.CONTAINER).length) {
        this.setCursorPos(e);
        this.createCircle();
      }
    },
    resizeEventHandler: function () {
      this.isMobileSize = utils.isMobileSize();

      this.setTracable(!this.isMobileSize);
      this.setCircleRadiusRange(this.isMobileSize);
      this.isMobileSize && this.trackingend();
    },
    scrollEventHandler: function () {
      if ($win.scrollTop() < $win.height() && !this.tracker.traceable) {
        $doc.trigger('mouseenter');
      }
    },
    mousemoveEventHandler: function (e) {
      this.setCursorPos(e);
    },
    mouseenterEventHandler: function (e) {
      if (!utils.isMobileSize()) {
        this.setTracable(true);
        this.trackingstart(e);
      }
    },
    mouseleaveEventHandler: function (e) {
      this.trackingend();
    },
    setCursorPos: function (e) {
      var event = e.originalEvent || window.event;
      
      if (this.isMobileSize) {
        this.cursor.x = event.pageX || this.cursor.x;
        this.cursor.y = event.pageY || this.cursor.y;
      } else {
        this.cursor.x = event.clientX || this.cursor.x;
        this.cursor.y = event.clientY || this.cursor.y;
      }
    },
    setTracable: function (traceable) {
      this.tracker.traceable = traceable;
    },
    setCircleRadiusRange: function (isMobileSize) {
      this.circle = isMobileSize
        ? { minRadius: 60, maxRadius: 110 }
        : { minRadius: 110, maxRadius: 200 };
    },
    createCircle: function () {
      var radius = Math.max(
        Math.floor(Math.random() * this.circle.maxRadius),
        this.circle.minRadius,
      );
      var $circle = this.$els.temp.clone().attr({ cx: this.cursor.x, cy: this.cursor.y });

      // dom apnned
      this.$els.circles.append($circle);
      // show motions
      TweenLite.to($circle, 0.5, { ease: Elastic.easeOut.config(1, 0.7), attr: { r: radius } });

      // // remove
      setTimeout(function () {
        TweenLite.to($circle, 0.4, {
          ease: Expo.easeInOut,
          attr: { r: 0 },
          opacity: 0,
          onComplete: function () {
            $circle.remove();
          },
        });
      }, 1500);
    },
    trackingstart: function (e) {
      this.setCursorPos(e);

      this.tracker.cx = this.cursor.x;
      this.tracker.cy = this.cursor.y;

      this.$els.tracker.attr({
        cx: this.tracker.cx,
        cy: this.tracker.cy,
      });

      clearTimeout(this.interval);
      this.tracking();
    },
    tracking: function () {
      if (!this.tracker.traceable) {
        return false;
      }

      if ($win.height() <= $win.scrollTop()) {
        this.trackingend();
        return false;
      }

      requestAnimationFrame($.proxy(this.tracking, this));

      this.tracker.cx += (this.cursor.x - this.tracker.cx) * this.tracker.ease;
      this.tracker.cy += (this.cursor.y - this.tracker.cy) * this.tracker.ease;

      var movementX = Math.abs(this.cursor.x - this.tracker.cx);
      var movementY = Math.abs(this.cursor.y - this.tracker.cy);
      var velocity = Math.sqrt(movementX * movementX + movementY * movementY) * this.tracker.ease;

      this.tracker.r =
        this.tracker.r < this.tracker.minRadius
          ? this.tracker.r + 100 * this.tracker.ease
          : Math.min(Math.max(velocity), this.tracker.minRadius) + this.tracker.maxRadius;
      this.$els.tracker.attr({
        cx: this.tracker.cx,
        cy: this.tracker.cy,
        r: this.tracker.r,
      });
    },
    trackingend: function () {
      this.interval = setTimeout(
        $.proxy(function () {
          this.setTracable(false);
          TweenLite.to(this.$els.tracker, 0.4, {
            ease: Expo.easeInOut,
            attr: { r: 0 },
          });
        }, this),
        600,
      );
    },
  };
})(window, document, $(window), $(document));
