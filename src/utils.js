export default (function () {
	const compareTypes = (mask, elem) => typeof mask === typeof elem

	// const isObject = param => param && typeof param === 'object'
	const isObject = param => compareTypes({}, param)

	const filterByPropertyTypes = (mask, elem) => Object
		.keys(mask)
		.filter(prop => compareTypes(mask[prop], elem[prop]))
		.reduce((carry, property) => {
			carry[property] = elem[property]
			return carry
		}, {})

	const deepFreeze = obj => {
		if (
			isObject(obj)
			&& !Object.isFrozen(obj)
		) {
			Object.keys(obj)
				.forEach(name => deepFreeze(obj[name]))
			Object.freeze(obj)
		}
		return obj
	}


	return Object.freeze({
		compareTypes
		, filterByPropertyTypes
		, isObject
		, deepFreeze
	})
})()
