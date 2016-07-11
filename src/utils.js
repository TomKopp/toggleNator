export default (function () {
	const compareTypes = (mask, elem) => typeof mask === typeof elem

	const filterByPropertyTypes = (mask, elem) => Object
		.keys(mask)
		.filter(prop => compareTypes(mask[prop], elem[prop]))
		.reduce((carry, property) => {
			carry[property] = elem[property]
			return carry
		}, {})


	return Object.freeze({
		compareTypes
		, filterByPropertyTypes
	})
})()
