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
        this.triggers  = (triggers instanceof NodeList || triggers instanceof HTMLCollection|| triggers instanceof Element) ? triggers : null;
        this.options = options || null;
        // this.options = triggers instanceof Object ? options : null;
        this.groups = {};

        _init(this);
        _prepareElements(this);
    }

    function _init(nator) {
        // overwrite global defaults with given options
        // prepare elements
        // bind new eventlistener to document
        // apply once to initialize element states
    }

    function _prepareElements(nator) {
        if (nator.triggers !== null) {
            // list of triggers
            var myNodeList = nator.triggers;
        }
        else {
            // there are no elements to prepare
            return;
        }

        for (var i = 0, lgth = myNodeList.length; i < lgth; ++i) {
            var item = myNodeList[i];
            item.data = _data(item, 'toggleNator');
            // override globally adjusted defaults with element options

            // get target element and save it for later use
            item.target = item.data.target;
            // add element to appropriate group

            _write(item.target);
        }
    }
    
    function _assignOptions(element, options) {
        // loop through default options and replace them by options
    }

    function _data(element, name, value) {
        if (value === undefined) {
            // no value given -> read data attribute and return object
            value = element.getAttribute('data-' + name);
            if (value) {
                return JSON.parse(value);
            }
            else {
                return {};
            }
        }
        else {
            // value is given -> write to data attribute
            element.setAttribute('data-' + name, JSON.stringify(value));
        }
    }

    function _write(param) {
        console.log(param);
    }

    toggleNator.prototype = {
        // default configurations
        defaults: {
            byGroup: true
            , group: 'global'
            , state: 'off'
            , triggerClass: 'toggleNator'
            , target: null
            , targetClass: 'toggleNatorTarget'
        }

        , write: function (param) { _write(param); }
    }


    return toggleNator;
}));
