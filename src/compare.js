export let compare = (function () {
	let types = (mask, elem) => typeof mask === typeof elem
	let propertyTypes = (mask, elem) => {
		if (typeof mask !== 'object') {
			throw new TypeError('Mask is no Object.')
		}
		if (typeof elem !== 'object') {
			throw new TypeError('Element is no Object.')
		}
		Object
			.getOwnPropertyNames(mask)
			.forEach(name => {
				if (
					elem[name]
					&& !types(mask[name], elem[name])
				) {
					throw new TypeError(`Type of '${name}' does not match. It should be: ${typeof mask[name]}`)
				}
			})
		return elem
	}


	return Object.freeze({
		propertyTypes
		, types
	})
})()
