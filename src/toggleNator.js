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



	return utils.deepFreeze({
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
			if (!utils.isObject(opts)) {
				throw new TypeError('Options is no Object.')
			}

			Object.assign(
				options
				, utils.filterByPropertyTypes(defaults, opts)
			) // make deep copy instead of this
		}
	})
})()
