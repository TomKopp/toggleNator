import compare from './compare.js'

export default (function () {
	const defaults = {
		active: false
        , byGroup: true
        , group: 'global'
        , triggerClass: 'toggleNator'
        , targetClass: 'toggleNatorTarget'
        , eventEmitter: (item, event) => (item, event)
        , onEvent: (item, event) => (item, event)
	}

	let elements = {}
	let options = {}


	return {
		name: 'toggleNator'
		, get elements() {
			return elements
		}
		, get options() {
			return options
		}
		, set elements(elms) {
			elements = elms
		}
		, set options(opts) {
			options = Object.assign(
				{}
				, defaults
				, compare.propertyTypes(defaults, opts)
			)
		}
	}
})()
