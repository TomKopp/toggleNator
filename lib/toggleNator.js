'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * toggleNator.js
 *
 * @author Tom Kopp
 * @license MIT
 * @version 2.x.x
 */
(function (root, factory) {
    // cobbled together from https://github.com/umdjs/umd and jQuery
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return root.toggleNator = factory(root);
        });
    } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        module.exports = root.document ? factory(root) : function (window) {
            if (!window.document) {
                throw new Error('A window with a document is required');
            }
            return factory(window);
        };
    } else {
        root.toggleNator = root.toggleNator || factory(root, false);
    }
})(typeof window !== 'undefined' ? window : undefined, function toggleNatorFactory(root) {

    var natorId = 0;
    var defaults = { // default configurations
        active: false,
        byGroup: true,
        group: 'global',
        triggerClass: 'toggleNator',
        targetClass: 'toggleNatorTarget',
        eventEmitter: function eventEmitter(item, event) {
            return _eventEmitter(item, event);
        },
        onEvent: function onEvent(item, event) {
            return _onEvent(item, event);
        }
    };

    // function _data(element, name, value) {
    //     if (value === undefined) { // no value given -> read data attribute and return object
    //         try {
    //             return JSON.parse(element.getAttribute('data-' + name));
    //         }
    //         catch (e) {
    //             // console.error('A problem occured while prosessing the data-attribute: ', e.message);
    //             return {};
    //         }
    //     }
    //     else { // value is given -> write to data attribute
    //         element.setAttribute('data-' + name, JSON.stringify(value));
    //     }
    // }

    var _eventEmitter = function _eventEmitter(item, event) {
        item.addEventListener('click', function () {
            this.dispatchEvent(event);
        });
    };

    var _onEvent = function _onEvent(item, event) {
        console.log(this, item, event);
    };

    var handleEvent = function handleEvent(event) {
        var _this = this;

        this.triggers.forEach(function (curVal) {
            return _this.options.onEvent(curVal, event);
        }, this);
    };

    var optionsValidate = function optionsValidate(mask, opt) {
        if (typeof mask !== 'undefined' && typeof opt !== 'undefined') {
            Object.getOwnPropertyNames(mask).forEach(function (name) {
                if (opt.hasOwnProperty(name) && _typeof(mask[name]) !== _typeof(opt[name])) {
                    throw new TypeError('Type of \'' + name + '\' does not match. It should be: ' + _typeof(mask[name]));
                }
            });
        }
        return opt;
    };

    var triggersValidate = function triggersValidate(triggers) {
        return triggers instanceof NodeList || triggers instanceof HTMLCollection || triggers instanceof Array || triggers instanceof Node;
    };

    var triggersRetreave = function triggersRetreave(triggers) {
        if (triggers instanceof String || typeof triggers === 'string') {
            triggers = document.querySelectorAll(triggers);
        }
        if (!triggersValidate(triggers)) {
            throw new TypeError('Triggers are not accepted');
        }
        return triggers;
    };

    function toggleNator(triggers, options) {
        var _this2 = this;

        var _id = natorId++;
        var _event = new Event('toggleNator-' + _id, { 'bubbles': true, 'cancelable': true });
        this.options = Object.freeze(Object.assign({}, defaults, optionsValidate(defaults, options)));
        this.triggers = Array.prototype.slice.call(triggersRetreave(triggers));

        root.document.addEventListener('toggleNator-' + _id, this, false);
        this.triggers.forEach(function (item) {
            return _this2.options.eventEmitter(item, _event);
        });
    }

    toggleNator.prototype.handleEvent = handleEvent;

    return toggleNator;
});