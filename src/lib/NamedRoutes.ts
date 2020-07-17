import React from 'react'

export const nested = (base, routes) => {
	const mappedRoutes = {}

	Object.keys(routes).forEach(key => {
		if(typeof routes[key] === "object") {
			mappedRoutes[key] = nested(base, routes[key])
		} else {
			mappedRoutes[key] = `${base}${routes[key]}`.replace(/\/$/, '')
		}
	})

	return mappedRoutes
}

/**
 * Needs only to return the paths as top level properties
 * For use in a router's path declaration
 */
class Paths<T> {
	[dynamicProperty: string]: T

	constructor(routes: T) {
		Object.keys(routes).forEach(route => {
			this[route] = routes[route]
		})
	}
}

class Links {
	routes

	constructor(routes) {
		this.routes = routes
	}
}

export const useNamedRoutes = routes => {
	const paths = new Paths(routes)
	const links = new Links(routes)
	return { links, paths }
}