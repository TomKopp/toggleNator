/**
 * jquery.toggleNator.js
 *
 * @author Tom Kopp
 * @license MIT
 * @version 1.0.0
 */
;(function ($) {

  var toggleNator = function (elems, options) {
      this.elems = elems
      this.options = options
    }
    , _groups = {}

  toggleNator.prototype = {
    defaults: {
      byGroup: true
      , group: 'all'
      , state: 'off'
      , target: null
      , class: 'toggleNator'
    }
    , init: function () {
      this.config = $.extend({}, this.defaults, this.options)
      this._prepareElements()
      this._apply()
      this._addEventListeners()
    }
    , toggleNator: function (k, elem) {
      // called on click event
      var that = this
        , $elem = $(elem)

      // change element's state to 'on'
      $elem.data('state', ($elem.data('state') === 'on' ? 'off': 'on'))
      if ($elem.data('byGroup')) {
        // get data-toggle group from clicked element and select all from same group
        $.each(_groups[$elem.data('group')], function (i, el) {
          // change state to 'off' on all other elements
          that._manageState(i, el, $elem)
          that._applyOne(i, el)
        })
      } else {
        that._applyOne(null, $elem)
      }
    }
    , _addEventListeners: function () {
      // set click event on all elements
      var that = this

      that._walkGroups(function (k, elem) {
        $(elem).on('click.toggleNator', function () {
          that.toggleNator(k, elem)
        })
      })
    }
    , _apply: function () {
      // toggle all targets based on element's state
      var that = this

      that._walkGroups(function (k, elem) {
        that._applyOne(k, elem)
      })
    }
    , _applyOne: function (k, elem) {
      // toggle target's class based on element's state
      var $elem = $(elem)

      if ($elem.data('state') === 'on' && $elem.data('state') !== 'off') {
        $elem.removeClass('toggle-off').addClass('toggle-on').data('targetElem').addClass($elem.data('class'))
      } else {
        $elem.removeClass('toggle-on').addClass('toggle-off').data('targetElem').removeClass($elem.data('class'))
      }
    }
    , _prepareElements: function () {
      // set options, group and target for each element
      var options = this.config
      $.each(this.elems, function (k, elem) {
        var that = $(elem)
          , groupId
          , targetElem

        // merge general options with element's options
        that.data($.extend({}, options, that.data('toggle')))
        // get target object and save it in the element for later use
        if (that.data('target')) {
          that.data('targetElem', $('[data-toggleNator-target="'+ that.data('target') +'"]'))
        }

        if (that.data('byGroup')) {
          // if groups should be minded add by element's group
          groupId = that.data('group')
        } else {
          // if not separated by group, store it in default group
          groupId = options.group
        }

        if (groupId in _groups) {
          _groups[groupId] = _groups[groupId].add(that)
        } else {
          _groups[groupId] = that
        }
      })
    }
    , _manageState: function (k, elem, $src) {
      // change state on element
      var $elem = $(elem)
      if ($src.data('state') === 'on' && $src[0] !== $elem[0]) {
        $elem.data('state', 'off')
      }
    }
    , _walkGroups: function (callback) {
      // walk through _groups and their elements and apply callback function
      $.each(_groups, function (key, group) {
        $.each(group, function (k, elem) {
          callback(k, elem)
        })
      })
    }
  }

  $.fn.toggleNator = function (options) {
    new toggleNator(this, options).init()
    return this
  }

})(jQuery)
