export default (function () {
	return {
		propertyTypes: (mask, elem) => {
			if (!mask) {
				throw new TypeError('Mask is not provided.')
			}
			if (!elem) {
				throw new TypeError('Options are not provided.')
			}
			Object
				.getOwnPropertyNames(mask)
				.forEach(name => {
					if (
						elem[name]
						&& !this.types(mask[name], elem[name])
					) {
						throw new TypeError(`Type of '${name}' does not match. It should be: ${typeof mask[name]}`)
					}
				})
			return elem
		}
		, types: (mask, elem) => typeof mask === typeof elem
	}
})()
