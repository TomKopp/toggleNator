import utils from './utils.js'

export default (function () {
	const defaults = {
		active: false
		, byGroup: true
		, group: 'global'
		, eventEmitter: (item, event) => (item, event)
		, onEvent: (item, event) => (item, event)
	}
	const options = {}

	let elements = []

	let optionsClean = opts => Object
		.keys(defaults)
		.filter(prop => utils.compareTypes(defaults[prop], opts[prop]))
		.reduce((accumulator, property) => {
			accumulator[property] = opts[property]
			return accumulator
		}, {})


	return Object.freeze({
		name: 'toggleNator'
		, get elements() {
			return elements
		}
		, get options() {
			return options
		}
		, set elements(elms) {
			elements = Array.prototype.slice.call(elms)
		}
		, set options(opts) {
			if (typeof opts !== 'object') {
				throw new TypeError('Options is no Object.')
			}

			Object.assign(
				options
				, optionsClean(opts)
			) // make deep copy instead of this
		}
	})
})()
