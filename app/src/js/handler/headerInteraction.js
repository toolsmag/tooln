/** external module */
import $ from 'jquery';

/** internal module */
import utils from '../utiles';

export default {
  // 초기 네비게이션 확장여부
  isExpanded: false,
  // 현재 활성화된 Navi Index (현재는 0만 있음)
  activeNaviIndex: 0,
  // Html 선택자
  selector: {
    header: '.js-header',
    opener: '.js-header-opner',
    navis: '.js-header-navi',
    naviBox: '.js-header-navi-box',
    moreMark: '.js-header-more-mark',
  },
  init: function () {
    this.getElements();
    this.bindEvents();
  },
  getElements: function () {
    this.$container = $(this.selector.header);
    this.$opener = this.$container.find(this.selector.opener);
    this.$navis = this.$container.find(this.selector.navis);
    this.$naviBox = this.$container.find(this.selector.naviBox);
    this.$naviItemMreMark = this.$container.find(this.selector.moreMark);
  },
  bindEvents: function () {
    $(window).on('scroll', $.proxy(this.windowScrollControl, this));
    this.$opener.on('click', $.proxy(this.extendedControl, this));
    this.$navis.on('scroll', $.proxy(this.scrollControl, this));
  },
  extendedControl: function () {
    if (this.isExpanded) {
      this.isExpanded = false;
      this.setCollapsed();
    } else {
      this.isExpanded = true;
      this.setExpanded();
    }
  },
  windowScrollControl: function (e) {
    if ($(window).scrollTop() < $(window).height()) {
      this.$container.removeAttr('data-js-changed');
    } else {
      this.$container.attr('data-js-changed', true);
    }
  },
  setExpanded: function () {
    this.$navis.eq(this.activeNaviIndex).show();
    this.$naviBox.show();
    this.$container.attr('data-js-expanded', true);
    this.scrollControl();
  },
  setCollapsed: function () {
    this.$container.attr('data-js-expanded', false);
    this.$navis.scrollTop(0).hide();
    this.$naviBox.hide();
    this.hideMoreMark();
  },
  scrollControl: function (e) {
    e && e.stopPropagation();

    if (this.isExpanded) {
      var $target = this.$navis.eq(this.activeNaviIndex);
      var scrollHeight = utils.getScrollHeight($target);
      var scrollPosY = utils.getScrollBottom($target);

      if (scrollPosY === scrollHeight) {
        this.hideMoreMark();
      } else {
        this.showMoreMark();
      }
    }
  },
  showMoreMark: function () {
    this.$naviItemMreMark.show().off('transitionend').attr('style', 'opacity: 1');
  },
  hideMoreMark: function () {
    this.$naviItemMreMark
      .one(
        'transitionend',
        $.proxy(function () {
          this.$naviItemMreMark.hide();
        }, this),
      )
      .attr('style', 'opacity: 0');
  },
};
