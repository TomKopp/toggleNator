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
    // cobbled together from https://github.com/umdjs/umd and jQuery
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module. - what if i just name the function??
        // define([], factory); old
        define([], function toggleNator() {
            return (root.toggleNator = factory(root));
        });
    }
    else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        // module.exports = factory(root); old
        root.document
            ? factory(root, true)
            : function (w) {
                if (!w.document) {
                    throw new Error('A window with a document is required');
                }
                return factory(w);
            };
    }
    else {
        // Browser globals (root is window)
        root.toggleNator = root.toggleNator || factory(root);
    }
} (this, function toggleNatorFactory(root) {

    var document = root.document;

    function toggleNator(triggers, options) {
        this.triggers = _preprocessTriggers(triggers);
        this.data = _assign({}, this.defaults, (options === undefined || options === null) ? null : Object(options));
        this.groups = {};

        _processElements(this);
    }

    // function _init(nator) {
        // overwrite global defaults with given options ./
        // prepare elements
        // bind new eventlistener to document
        // apply once to initialize element states
    // }

    function _processElements(nator) {
        if (nator.triggers !== null) {
            // list of triggers
            var list = nator.triggers;
        }
        else {
            // there are no elements to prepare
            return;
        }

        for (var i = 0, lgth = list.length; i < lgth; ++i) {
            var item = list[i];
            item.data = _data(item, 'toggleNator');
            // override globally adjusted defaults with element options
            item.data = _assign({}, nator.data, item.data);
            // get target element and save it for later use
            item.targets = document.querySelectorAll('[data-toggleNatorTarget="' + item.data.target + '"]');
            // add element to appropriate group
            if (nator.groups[item.data.group]) {
                nator.groups[item.data.group].push(item);
            }
            else {
                nator.groups[item.data.group] = [item];
            }
            // console.log(item);
        }
    }

    function _preprocessTriggers(triggers) {
        if (triggers instanceof NodeList || triggers instanceof HTMLCollection || triggers instanceof Array) {
            return triggers;
        }
        if (triggers instanceof Node) {
            // make an array with one object
            return [triggers];
        }
        if (triggers instanceof String || typeof triggers === 'string') {
            return document.querySelectorAll(triggers);
        }
        return null;
    }

    function _assign(element) {
        // loop through default options and replace them by options
        // shamelessly stolen from Object.assign polyfill from MDN (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
        if (element === undefined || element === null) {
            throw new TypeError('Cannot convert first argument to object');
        }
        var to = Object(element);

        for (var i = 1, lgth = arguments.length; i < lgth; i++) {
            var nextSource = arguments[i];
            if (nextSource === undefined || nextSource === null) {
                continue;
            }
            nextSource = Object(nextSource);
            var keysArray = Object.keys(nextSource);

            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined && desc.enumerable) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
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

    toggleNator.prototype.defaults = {
        // default configurations
        byGroup: true
        , group: 'global'
        , state: 'off'
        , triggerClass: 'toggleNator'
        , target: null
        , targetClass: 'toggleNatorTarget'
    };

    toggleNator.prototype.write = function (param) { _write(param); };


    return toggleNator;
}));
