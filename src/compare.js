export default (function () {
	return {
		propertyTypes: function propertyTypes(mask, opt) {
			if (!mask) {
				throw new TypeError('Mask is not provided.')
			}
			if (!opt) {
				throw new TypeError('Options are not provided.')
			}
			Object
				.getOwnPropertyNames(mask)
				.forEach(name => {
					if (
						opt[name]
						&& typeof mask[name] !== typeof opt[name]
					) {
						throw new TypeError(`Type of '${name}' does not match. It should be: ${typeof mask[name]}`)
					}
				})
			return opt
		}
	}
})()
