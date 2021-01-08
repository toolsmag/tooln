/** external module */
import $ from 'jquery';
import ScrollMagic from 'ScrollMagic';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';
import { gsap, TweenMax } from 'gsap';

ScrollMagicPluginGsap(ScrollMagic, TweenMax);

/** internal module */
import utils from '../utiles';

export default (function (win, doc, $win, $doc) {
  return {
    $els: {},
    scenes: {},
    tweens: {},
    interval: null,
    controller: null,
    DATA_SIZE_AND_POS_KEY: 'DATA_SIZE_AND_POS_KEY',
    SELECTORS: {
      SUBJECT: '#subject',
      TITLE: '#subjectTitle',
      BOXS: '#subjectBoxs',
      // first image section
      BOX1: '#subjectBox1',
      IMAGE1: '#subjectImage1',
      TEXT1: '#subjectText1',
      // second image section
      BOX2: '#subjectBox2',
      IMAGE2: '#subjectImage2',
      TEXT2: '#subjectText2',
      //  third image section
      BOX3: '#subjectBox3',
      IMAGE3: '#subjectImage3',
      TEXT3: '#subjectText3',
      TEXT4: '#subjectText4',
    },
    init: function () {
      this.setElements();
      this.bindScrollMotion();
      this.bindEvents();
    },
    setElements: function () {
      this.$els = Object.keys(this.SELECTORS).reduce(
        $.proxy(function (acc, cur) {
          var $el = $(this.SELECTORS[cur]);

          this.setSizeAndPosData($el);
          acc[utils.convertStringToCamelCase(cur.toLowerCase())] = $el;

          return acc;
        }, this),
        {},
      );
    },
    setSizeAndPosData: function ($el) {
      var pos = $el.offset();

      $el.data(this.DATA_SIZE_AND_POS_KEY, {
        width: $el.outerWidth(),
        height: $el.outerHeight(),
        poxX: pos.left,
        posY: pos.top,
      });
    },
    getSizeAndPosData: function ($el) {
      return $el.data(this.DATA_SIZE_AND_POS_KEY);
    },
    updateSizeAndPosData: function () {
      Object.keys(this.$els).forEach(
        $.proxy(function (key) {
          this.setSizeAndPosData(this.$els[key]);
        }, this),
      );
    },
    bindEvents: function () {
      $(win).on('resize', $.proxy(this.reset, this));
    },
    reset: (function () {
      var windowWidth = $win.width();

      return function () {
        var curWindowWidth = $win.width();
        var notChanged = windowWidth === $win.width();
        var isMobile = !utils.isDesktop();

        if (isMobile && notChanged) {
          return false;
        }

        clearTimeout(this.interval);
        windowWidth = curWindowWidth;
        this.interval = setTimeout(
          $.proxy(function () {
            this.removeElsStyle();
            this.updateSizeAndPosData();
            this.unbindScrollMotion();
            this.bindScrollMotion();
          }, this),
          100,
        );
      };
    })(),
    removeElsStyle: function () {
      Object.keys(this.$els).forEach(
        $.proxy(function (key) {
          this.$els[key].attr('style', '');
        }, this),
      );
    },
    bindScrollMotion: function () {
      this.controller = new ScrollMagic.Controller();
      this.setTitleMotion();
      this.setFirstSectionMotion();
      this.setSecondSectionMotion();
      this.setThirdSectionMotion();
    },
    unbindScrollMotion: function (a) {
      this.controller.destroy(true);

      Object.keys(this.scenes).forEach(
        $.proxy(function (key) {
          this.scenes[key].destroy(true);
        }, this),
      );
    },
    setTitleMotion: function () {
      this.tweens.title = TweenMax.fromTo(
        this.SELECTORS.TITLE,
        0.7,
        { opacity: 0, y: this.getSizeAndPosData(this.$els.title).height / 2 },
        { opacity: 1, y: 0 },
      );

      this.scenes.title = new ScrollMagic.Scene({
        triggerElement: this.SELECTORS.SUBJECT,
        triggerHook: 0.7,
        duration: this.getSizeAndPosData(this.$els.title).height * 2,
      })
        .setTween(this.tweens.title)
        .addTo(this.controller);
    },
    setFirstSectionMotion: function () {
      var isMobileSize = utils.isMobileSize();

      /**
       * 이미지 등장
       */
      this.tweens.image1 = TweenMax.fromTo(
        this.SELECTORS.IMAGE1,
        0.5,
        { opacity: 0, y: this.getSizeAndPosData(this.$els.image1).height / 10 },
        { opacity: 1, y: 0 },
      );

      this.scenes.image1 = new ScrollMagic.Scene({
        triggerElement: this.SELECTORS.SUBJECT,
        triggerHook: isMobileSize ? 0.7 : 0.5,
        offset: this.getSizeAndPosData(this.$els.title).height,
        duration: this.getSizeAndPosData(this.$els.image1).height * (isMobileSize ? 2 : 1.5),
      })
        .setTween(this.tweens.image1)
        .addTo(this.controller);

      /**
       * 이미지 고정
       */
      if (!isMobileSize) {
        var boxOffset = this.getSizeAndPosData(this.$els.subject);
        var imgOffset = this.getSizeAndPosData(this.$els.image1);
        var buffer =
          Math.abs(boxOffset.posY - imgOffset.posY) + (imgOffset.height - $(win).height()) / 2;

        this.scenes.image1Fixed = new ScrollMagic.Scene({
          triggerElement: this.SELECTORS.SUBJECT,
          triggerHook: 0,
          offset: buffer - 118,
          duration: boxOffset.height - (buffer + imgOffset.height),
        })
          .setPin(this.SELECTORS.IMAGE1, { pushFollowers: false })
          .setClassToggle(this.SELECTORS.IMAGE1, 'is-fixed')
          .addTo(this.controller);
      }

      /**
       * 텍스트 등장
       */
      this.tweens.text1 = TweenMax.fromTo(
        this.SELECTORS.TEXT1,
        0.5,
        {
          opacity: 0,
          y: this.getSizeAndPosData(this.$els.text1).height / (utils.isMobileSize() ? 10 : 1),
        },
        { opacity: 1, y: 0 },
      );
      this.scenes.text1 = new ScrollMagic.Scene({
        triggerElement: this.SELECTORS.SUBJECT,
        triggerHook: 0.7,
        duration: utils.isMobileSize()
          ? this.getSizeAndPosData(this.$els.text1).height
          : this.getSizeAndPosData(this.$els.text1).height * 1.2,
        offset: Math.abs(
          this.getSizeAndPosData(this.$els.text1).posY -
            this.getSizeAndPosData(this.$els.subject).posY,
        ),
      })
        .setTween(this.tweens.text1)
        .addTo(this.controller);
    },
    setSecondSectionMotion: function () {
      var triggerHook = utils.isMobileSize() ? 0.7 : 0.5;

      /**
       * 이미지 등장
       */
      this.tweens.image2 = TweenMax.fromTo(
        this.SELECTORS.IMAGE2,
        0.5,
        { opacity: 0, y: this.getSizeAndPosData(this.$els.image2).height / 10 },
        { opacity: 1, y: 0 },
      );

      this.scenes.image2 = new ScrollMagic.Scene({
        triggerElement: this.SELECTORS.SUBJECT,
        triggerHook,
        duration: utils.isMobileSize()
          ? this.getSizeAndPosData(this.$els.image2).height
          : this.getSizeAndPosData(this.$els.image2).height / 2,
        offset:
          this.getSizeAndPosData(this.$els.image2).posY -
          this.getSizeAndPosData(this.$els.subject).posY,
      })
        .setTween(this.tweens.image2)
        .addTo(this.controller);

      /**
       * 텍스트 등장
       */
      this.tweens.text2 = TweenMax.fromTo(
        this.SELECTORS.TEXT2,
        0.5,
        { opacity: 0, y: this.getSizeAndPosData(this.$els.text2).height / 10 },
        { opacity: 1, y: 0 },
      );

      this.scenes.text2 = new ScrollMagic.Scene({
        triggerElement: this.SELECTORS.SUBJECT,
        triggerHook,
        duration: utils.isMobileSize()
          ? this.getSizeAndPosData(this.$els.text2).height
          : this.getSizeAndPosData(this.$els.text2).height / 2,
        offset:
          this.getSizeAndPosData(this.$els.text2).posY -
          this.getSizeAndPosData(this.$els.subject).posY,
      })
        .setTween(this.tweens.text2)
        .addTo(this.controller);
    },
    setThirdSectionMotion: function () {
      /**
       * 이미지 등장
       */
      this.tweens.image3 = TweenMax.fromTo(
        this.SELECTORS.IMAGE3,
        0.7,
        { opacity: 0, y: this.getSizeAndPosData(this.$els.image3).height / 10 },
        { opacity: 1, y: 0 },
      );

      this.scenes.image3 = new ScrollMagic.Scene({
        triggerElement: this.SELECTORS.SUBJECT,
        triggerHook: utils.isMobileSize() ? 0.7 : 0.6,
        duration: utils.isMobileSize()
          ? this.getSizeAndPosData(this.$els.image3).height
          : this.getSizeAndPosData(this.$els.image3).height / 2,
        offset:
          this.getSizeAndPosData(this.$els.image3).posY -
          this.getSizeAndPosData(this.$els.subject).posY,
      })
        .setTween(this.tweens.image3)
        .addTo(this.controller);

      /**
       * 텍스트 등장
       */
      this.tweens.text3 = TweenMax.fromTo(
        this.SELECTORS.TEXT3,
        1,
        { opacity: 0, y: this.getSizeAndPosData(this.$els.text3).height / 10 },
        { opacity: 1, y: 0 },
      );

      this.scenes.text3 = new ScrollMagic.Scene({
        triggerElement: this.SELECTORS.SUBJECT,
        triggerHook: utils.isMobileSize() ? 0.7 : 0.6,
        duration: utils.isMobileSize()
          ? this.getSizeAndPosData(this.$els.text3).height
          : this.getSizeAndPosData(this.$els.text3).height / 1.6,
        offset:
          this.getSizeAndPosData(this.$els.text3).posY -
          this.getSizeAndPosData(this.$els.subject).posY / 1.1,
      })
        .setTween(this.tweens.text3)
        .addTo(this.controller);

      this.tweens.text4 = TweenMax.fromTo(
        this.SELECTORS.TEXT4,
        1,
        { opacity: 0, y: this.getSizeAndPosData(this.$els.text4).height / 10 },
        { opacity: 1, y: 0 },
      );

      this.scenes.text4 = new ScrollMagic.Scene({
        triggerElement: this.SELECTORS.SUBJECT,
        triggerHook: utils.isMobileSize() ? 0.7 : 0.6,
        duration: utils.isMobileSize()
          ? this.getSizeAndPosData(this.$els.text4).height
          : this.getSizeAndPosData(this.$els.text4).height / 1.6,
        offset:
          this.getSizeAndPosData(this.$els.text4).posY -
          this.getSizeAndPosData(this.$els.subject).posY / 1.1,
      })
        .setTween(this.tweens.text4)
        .addTo(this.controller);
    },
  };
})(window, document, $(window), $(document));
