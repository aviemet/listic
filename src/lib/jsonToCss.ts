
const jsonToCss = json => {
	return Object.entries(json).reduce((styleString, [propName, propValue]) => {
		// Check if media queries
		if (propName.indexOf('@') !== -1) {
			return `${styleString}${propName} { ${Object.entries(propValue).reduce((ss, [pn, pv]) => {
				pn = toKebabCase(pn)
				return `${ss}${pn}:${pv+(Number.isInteger(pv) ? 'px' : '')};`;
			}, '')}; }`;
		}

		// convert camel-case properties into dash-splitted attributes
		propName = toKebabCase(propName)

		// append css pixel unit to integer values
		return `${styleString}${propName}: ${propValue+(Number.isInteger(propValue) ? 'px' : '')};`;
	}, '')
}

// Thank you random stack overflow poster 
// https://stackoverflow.com/questions/53529421/passing-mixins-to-styled-component

const toKebabCase = str => str.replace(/([A-Z])/g, matches => `-${matches[0].toLowerCase()}`);

export default jsonToCss