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
        byGroup: true,
        group: 'global',
        state: 'off',
        triggerClass: 'toggleNator',
        targetClass: 'toggleNatorTarget',
        eventEmitter: function eventEmitter(item, event) {
            return _eventEmitter(item, event);
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

    var _handleEvent = function _handleEvent(event) {
        console.log(this, event);
    };

    var _triggersRetreave = function _triggersRetreave(triggers) {
        if (triggers instanceof String || typeof triggers === 'string') {
            triggers = document.querySelectorAll(triggers);
        }
        return triggers;
    };

    var _triggersValidate = function _triggersValidate(triggers) {
        return triggers instanceof NodeList || triggers instanceof HTMLCollection || triggers instanceof Array;
    };

    var _walk = function _walk(items, callback) {
        if (_triggersValidate(items)) {
            var i = items.length;
            while (--i > -1) {
                callback(items[i]); // should not do this, callback could change items.length
            }
        }
        return items;
    };

    function toggleNator(triggers, options) {
        var _id = natorId++;
        // const _options;
        var _triggers = _triggersRetreave(triggers);
        var _event = new Event('toggleNator-' + _id, { 'bubbles': true, 'cancelable': true });

        root.document.addEventListener('toggleNator-' + _id, this, false);
        _walk(_triggers, function (item) {
            return defaults.eventEmitter(item, _event);
        });
    }

    toggleNator.prototype.handleEvent = _handleEvent;

    return toggleNator;
});