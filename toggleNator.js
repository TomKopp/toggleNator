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

    var _groups = {}

    function toggleNator(elements, options) {
        this.elements = elements
        this.options = options

        _init(this)
    }

    function _init(that) {
        // overwrite defaults with given options
        // prepare elements
        // bind new eventlistener to document
        // apply once to initialize element states
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
