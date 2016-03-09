/**
 * toggleNator.js
 *
 * This version is an advancement and does not need jQuery anymore.
 *
 * @author Tom Kopp
 * @license MIT
 * @version 2.x.x
 */
(function (root, factory) {
    // cobbled together from https://github.com/umdjs/umd and jQuery
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module. - what if i just name the function??
        // define([], factory); old
        define([], function toggleNator() {
            return (root.toggleNator = factory(root, false));
        });
    }
    else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        // module.exports = factory(root); old
        module.exports = root.document
            ? factory(root, true)
            : function (window) {
                if (!window.document) {
                    throw new Error('A window with a document is required');
                }
                return factory(window, false);
            };
    }
    else {
        // Browser globals (root is window)
        root.toggleNator = root.toggleNator || factory(root, false);
    }
} (typeof window !== 'undefined' ? window : this, function toggleNatorFactory(root, noGlobal) {

    var document = root.document;
    var toggleNatorID = 0;

    function toggleNator(triggers, options) {
        this.toggleNatorId = toggleNatorID++;
        this.toggleNatorTriggers = _preprocessTriggers(triggers);
        this.toggleNatorData = _assign({}, this.defaults, (options === undefined || options === null || typeof options === 'string') ? null : options);
        this.toggleNatorGroups = {};
        this.toggleNatorEvent = new Event('toggleNator-' + this.toggleNatorId, { 'bubbles': true, 'cancelable': true });
        this.onToggleNator = function (element) {
            var i = 0;
            var lgth = element.targets.length;

            if (element.state === 'on') {
                // if state is on, add classes
                // ACTIVATE
                _addClass(element.trigger, element.triggerClass);
                while (i < lgth) {
                    _addClass(element.targets[i], element.targetClass);
                    ++i;
                }
            }
            else {
                // if state is off (not on) remove classes
                // DEACTIVATE
                _removeClass(element.trigger, element.triggerClass);
                while (i < lgth) {
                    _removeClass(element.targets[i], element.targetClass);
                    ++i;
                }
            }
        };

        document.addEventListener('toggleNator-' + this.toggleNatorId, this, false);
        _processElements(this);
    }

    function _processElements(nator) {
        if (nator.toggleNatorTriggers) {
            // list of triggers
            var list = nator.toggleNatorTriggers;
        }
        else {
            // there are no elements to prepare
            return;
        }

        for (var i = 0, lgth = list.length; i < lgth; ++i) {
            var item = list[i];

            if (!item.toggleNator) {
                item.toggleNator = [];
            }
            // overwrite globally adjusted defaults with element options
            item.toggleNator[nator.toggleNatorId] = _assign(
                {}
                , nator.toggleNatorData
                , _data(item, 'toggleNator')
            );
            var element = _assign(
                {}
                , item.toggleNator[nator.toggleNatorId]
            );

            // get target element(s) and save it(them) for later use
            element.targets = document.querySelectorAll('[data-toggleNatorTarget="' + element.target + '"]');
            element.trigger = item;
            // add element to appropriate group
            if (nator.toggleNatorGroups[element.group]) {
                nator.toggleNatorGroups[element.group].push(element);
            }
            else {
                nator.toggleNatorGroups[element.group] = [element];
            }

            // initially apply togglenator on this element
            nator.onToggleNator(element);

            // apply overwritable event dispatcher
            item.addEventListener('click', function() {
                this.dispatchEvent(nator.toggleNatorEvent);
            });
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

    function _handleEvent(nator, event) {
        var triggerOptions = event.target.toggleNator[nator.toggleNatorId];
        var groups;

        if (triggerOptions.byGroup) {
            groups = [].concat(nator.toggleNatorGroups[triggerOptions.group]);
        }
        else {
            groups = nator.toggleNatorGroups;
        }
        // BEFORE TOGGLENATOR
        groups.forEach(function (element) {
            if (this === element.trigger) {
                // toggle state on event.target
                element.state === 'on'
                    ? element.state = 'off'
                    : element.state = 'on';
            }
            else {
                // not event.target? state off
                element.state = 'off';
            }
            // ON TOGGLENATOR
            nator.onToggleNator(element);
        }, event.target);
        // AFTER TOGGLENATOR
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
            try {
                return JSON.parse(element.getAttribute('data-' + name));
            }
            catch (e) {
                console.error('A problem occured while parsing the data-attribute: ', e.message);
                return {};
            }
        }
        else {
            // value is given -> write to data attribute
            element.setAttribute('data-' + name, JSON.stringify(value));
        }
    }

    function _addClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        }
        else {
            element.className += ' ' + className;
        }
    }

    function _removeClass(element, className) {
        if (element.classList) {
            element.classList.remove(className);
        }
        else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
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
    toggleNator.prototype.handleEvent = function (event) { _handleEvent(this, event); };


    if (!noGlobal ) {
        window.toggleNator = toggleNator;
    }

    return toggleNator;
}));
