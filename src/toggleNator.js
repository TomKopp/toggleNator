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
        byGroup: true
        , group: 'global'
        , state: 'off'
        , triggerClass: 'toggleNator'
        , targetClass: 'toggleNatorTarget'
        , eventEmitter: (item, event) => eventEmitter(item, event)
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

    const handleEvent = function(event) {
        console.log(this, event);
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
            throw new TypeError('Cannot process triggers');
        }
        return triggers;
    };

    const walk = function(items, callback) {
        for (var item of items) {
            callback(item);
        }
        return items;
    };

    function toggleNator(triggers, options) {
        const _id = natorId++;
        // const _options;
        const _triggers = Array.prototype.slice.call(triggersRetreave(triggers));
        const _event = new Event('toggleNator-' + _id, { 'bubbles': true, 'cancelable': true });

        root.document.addEventListener('toggleNator-' + _id, this, false);
        walk(_triggers, item => defaults.eventEmitter(item, _event));

    }

    toggleNator.prototype.handleEvent = handleEvent;

    return toggleNator;
}));
