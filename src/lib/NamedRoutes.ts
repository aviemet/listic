/**
 * Called in a routes object definition
 * Flattens the provided object using `base` as the beginning of the route
 * @param base 
 * @param routes 
 */
export const nested = (base, routes) => {
	const mappedRoutes = {} // Object to build for return

	const indexedRoutes = routes
	if(!indexedRoutes.__index__) {
		indexedRoutes.__index__ = "/"
	}

	Object.keys(indexedRoutes).forEach(key => {
		if(typeof routes[key] === "object") {
			mappedRoutes[key] = nested(base, routes[key])
		} else {
			mappedRoutes[key] = `${base}${routes[key]}`.replace(/\/$/, '')
		}
	})

	return mappedRoutes
}

/**
 * Returns route paths as top level properties
 * For use in a router's path declaration
 */
class Paths<T> {
	[dynamicProperty: string]: T | Function
	/**
	 * Need to have a private variable for storing the entire tree
	 * as one object so as to avoid building it on request. This
	 * means `__processedRoutes__` is a reserved word and is 
	 * unuseable as a route. I hope this isn't an issue for
	 * anyone as it would be a strange thing to name a route
	 */
	private __processedRoutes__

	constructor(routes: T) {
		this.__processedRoutes__ = {}
		Object.keys(routes).forEach(route => {
			this[route] = routes[route]
			this.__processedRoutes__[route] = routes[route]
		})
	}

	toObject(): {string} {
		return this.__processedRoutes__
	}
}

/**
 * Returns the give string with the words supplied by obj replaced
 * @param str string with patterns to be replaced
 * @param obj object where key is the pattern to replace, value is replacement text
 */
const replaceNamedParameters = (str, obj) => {
	let replacedStr = str
	for(const [key, value] of Object.entries(obj)) {
		let regex = new RegExp(`:${key}`)
		replacedStr = replacedStr.replace(regex, value)
	}
	return replacedStr
}

/**
 * Proxy builder for returning named route permutations
 */
const routeBuilder = {
	get: function(target, key, receiver) {
		// Throw an error when a non-existent route is requested
		if(typeof target[key] === 'undefined') {
			throw `Error: "${key}" does not exist as a named route`
		}

		// Recurse to next level when a nested route is requested
		if(typeof target[key] === 'object') {
			return new Proxy(target[key], routeBuilder)
		}

		// Return a function which accepts named parameters when a dynamic route is requested
		if(String(target[key]).includes(':')) {
			return args => {
				// Validate same number of parameters provided as in route
				const namedParameterCount = target[key].match(/:/g).length
				const argsCount = Object.keys(args).length
				if(namedParameterCount !== argsCount) {
					throw `Error: Expected ${namedParameterCount} arguments, received ${argsCount}`
				}
				
				return replaceNamedParameters(target[key], args)
			}
		}
		
		return target[key]
	}
}

/**
 * Hook for using named routes in a react-router project
 * @param routes routes object
 */
export const useNamedRoutes = routes => {
	const paths = new Paths(routes)
	const links: any = new Proxy(paths.toObject(), routeBuilder)

	return { links, paths }
}
