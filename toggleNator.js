/**
 * toggleNator.js
 *
 * This version is an advancement and does not need jQuery anymore.
 *
 * @author Tom Kopp
 * @license MIT
 * @version 2.x.x
 */
; (function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.toggleNator = root.toggleNator || factory();
    }
} (this, function toggleNatorFactory() {

    function toggleNator(triggers, options) {
        this.triggers = triggers || null
        this.options = options || null
        this.groups = {}

        _init(this)
        _prepareElements(this)
    }

    function _init(nator) {
        // overwrite global defaults with given options
        // prepare elements
        // bind new eventlistener to document
        // apply once to initialize element states
    }

    function _prepareElements(nator) {
        // list of trigger
        var myNodeList = nator.triggers
        if (myNodeList === null) {
            return
        }
        for (var i = 0, lgth = myNodeList.length; i < lgth; ++i) {
            var item = myNodeList[i]
            item.data = _data(item, 'toggleNator')
            // override globally adjusted defaults with element options

            // get target element and save it for later use
            item.target = item.data.target
            // add element to appropriate group

            _write(item.target)
        }
    }

    function _data(element, name, value) {
        if (value === undefined) {
            value = element.getAttribute('data-' + name)
            return JSON.parse(value)
        } else {
            element.setAttribute('data-' + name, JSON.stringify(value))
        }
    }

    function _write(param) {
        console.log(param)
    }

    toggleNator.prototype = {
        defaults: {
            byGroup: true
            , group: 'global'
            , state: 'off'
            , triggerClass: 'toggleNator'
            , target: null
            , targetClass: 'toggleNatorTarget'
        }

        , write: function (param) { _write(param) }
    }


    return toggleNator;
}));
