/** external module */
import $ from 'jquery';

/** internal module */
import utils from '../utiles';
import { getNavList } from '../apis';
import navi from '../components/navi';

export default {
  // 초기 네비게이션 확장여부
  isExpanded: false,
  // 현재 활성화된 Navi Index (현재는 0만 있음)
  activeNaviIndex: 0,
  // Html 선택자
  selector: {
    header: '.js-header',
    opener: '.js-header-opner',
    naviBox: '.js-header-navi-box',
    navi: '.js-header-navi',
    naviItems: '.js-header-navi-items',
    moreMark: '.js-header-more-mark',
  },
  init: function () {
    var that = this;

    getNavList().done(function ({ list }) {
      list && navi(list);

      that.getElements();
      that.bindEvents();
    });

    
  },
  getElements: function () {
    this.$container = $(this.selector.header);
    this.$opener = this.$container.find(this.selector.opener);
    this.$naviBox = this.$container.find(this.selector.naviBox);
    this.$navi = this.$container.find(this.selector.navi);
    this.$naviItems = this.$container.find(this.selector.naviItems);
    this.$naviItemMreMark = this.$container.find(this.selector.moreMark);
  },
  bindEvents: function () {
    $(window).on('scroll', $.proxy(this.windowScrollControl, this));
    $(window).on('resize', $.proxy(this.windowResizing, this));
    this.$opener.on('click', $.proxy(this.extendedControl, this));
    this.$navi.on('scroll', $.proxy(this.scrollControl, this));
  },
  extendedControl: function () {
    if (this.isExpanded) {
      this.isExpanded = false;
      this.setCollapsed();
    } else {
      this.isExpanded = true;
      this.setExpanded();

      if (this.$navi.height() > this.$naviItems.outerHeight()) {
        this.hideMoreMark();
      }
    }
  },
  windowResizing: function (e)  {
    if (this.$navi.height() > this.$naviItems.outerHeight()) {
      this.hideMoreMark();
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
    this.$navi.eq(this.activeNaviIndex).show();
    this.$naviBox.show();
    this.$container.attr('data-js-expanded', true);
    this.scrollControl();
  },
  setCollapsed: function () {
    this.$container.attr('data-js-expanded', false);
    this.$navi.scrollTop(0).hide();
    this.$naviBox.hide();
    this.hideMoreMark();
  },
  scrollControl: function (e) {
    e && e.stopPropagation();

    if (this.isExpanded) {
      var $target = this.$navi.eq(this.activeNaviIndex);
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
    if (!this.$naviItemMreMark[0].style.opacity) {
      this.$naviItemMreMark
        .one(
          'transitionend',
          $.proxy(function () {
            this.$naviItemMreMark.hide();
          }, this),
        )
        .attr('style', 'opacity: 0');
    } else {
      this.$naviItemMreMark.attr('style', 'opacity: 0').hide();
    }
  },
};
