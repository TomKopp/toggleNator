/**
 * toggleNator.js
 *
 * @author Tom Kopp
 * @license MIT
 * @version 2.x.x
 */
(function(root, factory) { // cobbled together from https://github.com/umdjs/umd and jQuery
    if (typeof define === 'function' && define.amd) {
        define([], () => root.toggleNator = factory(root));
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = root.document
            ? factory(root)
            : window => {
                if (!window.document) {
                    throw new Error('A window with a document is required');
                }
                return factory(window);
            };
    }
    else {
        root.toggleNator = root.toggleNator || factory(root, false);
    }
} (typeof window !== 'undefined' ? window : this, function toggleNatorFactory(root) {

    var natorId = 0;
    const defaults = { // default configurations
        active: false
        , byGroup: true
        , group: 'global'
        , triggerClass: 'toggleNator'
        , targetClass: 'toggleNatorTarget'
        , eventEmitter: (item, event) => eventEmitter(item, event)
        , onEvent: (item, event) => onEvent(item, event)
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

    const eventEmitter = function(item, event) {
        item.addEventListener('click', function() { this.dispatchEvent(event); });
    };

    const onEvent = function(item, event) {
        console.log(this, item, event);
    };

    const handleEvent = function(event) {
        this.triggers.forEach(curVal => this.options.onEvent(curVal, event));
    };

    const optionsValidate = function(mask, opt) {
        if (typeof mask !== 'undefined' && typeof opt !== 'undefined' ) {
            Object
                .getOwnPropertyNames(mask)
                .forEach(name => {
                    if (opt.hasOwnProperty(name) && typeof mask[name] !== typeof opt[name] ) {
                        throw new TypeError(`Type of '${name}' does not match. It should be: ${typeof mask[name]}`);
                    }
                });
        }
        return opt;
    };

    const triggersValidate = function(triggers) {
        return (triggers instanceof NodeList
            || triggers instanceof HTMLCollection
            || triggers instanceof Array
            || triggers instanceof Node);
    };

    const triggersRetreave = function(triggers) {
        if (triggers instanceof String || typeof triggers === 'string') {
            triggers = document.querySelectorAll(triggers);
        }
        if (!triggersValidate(triggers)) {
            throw new TypeError('Triggers are not accepted');
        }
        return triggers;
    };

    function toggleNator(triggers, options) {
        const _id = natorId++;
        const _event = new Event('toggleNator-' + _id, { 'bubbles': true, 'cancelable': true });
        this.options = Object.freeze(Object.assign({}, defaults, optionsValidate(defaults, options)));
        this.triggers = Array.prototype.slice.call(triggersRetreave(triggers));

        root.document.addEventListener('toggleNator-' + _id, this, false);
        this.triggers.forEach(item => this.options.eventEmitter(item, _event));
    }

    toggleNator.prototype.handleEvent = handleEvent;

    return toggleNator;
}));
