/**
 * toggleNator.js
 * 
 * This version is an advancement and does not need jQuery anymore.
 *
 * @author Tom Kopp
 * @license MIT
 * @version 2.x.x
 */
;(function (toggleNator) {
	
	 function _privateAdder(n1, n2) {
        return n1 + n2;
    }
 
    toggleNator.add = function(n1, n2) {
        return _privateAdder(n1);
    };
    
    console.log(this, toggleNator)
	
})(window.toggleNator = window.toggleNator || {})
