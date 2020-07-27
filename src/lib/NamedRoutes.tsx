import React from 'react'

// Proxy second argument
const callableChainableHandler = {
	get: function(target, key) {
		console.log({ target, key })
		console.log('get')
		return target[key]
	},
	apply: function(target, that, args) {
		console.log('apply')
		return target.__index__
	}
}

// Convert routes object to paths object
const pathsToCallableProxy = (routes: object) => {
	const paths = {}

	for(const [key, value] of Object.entries(routes)) {
		if(typeof value === 'object') {
			paths[key] = new Proxy(new CallableChainable(value), callableChainableHandler)
		}
	}

	return paths
}

// Object who's elements are both chainable and callable
class CallableChainable extends Function {
	constructor(routes: object) {
		super()

		this[INDEX] = routes[INDEX]

		for(const [key, value] of Object.entries(routes)) {
			if(key !== INDEX) {
				this[key] === pathsToCallableProxy(value)
			}
		}

		return new Proxy(this, callableChainableHandler)
	}
}

/*
path() => /
path.events() => /events
path.events.new() => /events/new
path.events.show({ id: 1 }) /events/1
*/

const removeTrailingSlash = str => str.replace(/\/$/, '')

const INDEX = "__index__"

/**
 * Called in a routes object definition
 * Flattens the provided object using `base` as the beginning of the route
 * @param base 
 * @param routes 
 */
export const nested = (base, routes) => {
	let mappedRoutes: any = {}

	const indexedRoutes = routes
	if(!indexedRoutes.hasOwnProperty(INDEX)) {
		indexedRoutes[INDEX] = "/"
	}

	for(const [key, value] of Object.entries(indexedRoutes)) {
		if(typeof value === 'string') {
			if(key === INDEX) {
				mappedRoutes[INDEX] = `${base}${value}`
			} else {
				mappedRoutes[key] = {}
				mappedRoutes[key][INDEX] = `${base}${value}`
			}
		} else if(typeof value === 'object') {
			if(base === '/settings') {
				console.log({ key })
			}
			mappedRoutes[key] = nested(base, value)
		}
	}

	return mappedRoutes
}

// UNUSED RIGHT NOW
// Converts routes object into links object
const callableLinksBuilder = routes => {
	return routes
}

interface NamedRoutesHookObject {
	paths: any,
	links: any
}

/**
 * Hook for using named routes in a react-router project
 * @param routes routes object
 */
const NamedRouteContext = React.createContext<NamedRoutesHookObject>({ paths: undefined, links: undefined })
export const useNamedRoutes = () => React.useContext(NamedRouteContext)

export const NamedRoutesProvider = ({ value, children }) => {
	const nestedValue = nested("", value)

	console.log({ nestedValue })

	// const paths = new callablePathsBuilder(value)
	const paths = pathsToCallableProxy(nestedValue)
	const links = callableLinksBuilder(nestedValue)
	
	return (
		<NamedRouteContext.Provider value={ { paths, links} }>
			{ children }
		</NamedRouteContext.Provider>
	)
}
