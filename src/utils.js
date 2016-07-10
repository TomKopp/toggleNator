export default (function () {
	let compareTypes = (mask, elem) => typeof mask === typeof elem

	let filterByPropertyTypes = (mask, elem) => Object
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
