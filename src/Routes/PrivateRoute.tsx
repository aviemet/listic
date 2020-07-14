import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const loggedIn = false

const PrivateRoute = ({ children, ...rest }) => {
	console.log('Private')
	if(!loggedIn) {
		return <Redirect to={ {
			pathname: '/login',
			state: { 
				from: 'originating path',
				message: 'Please log in first'
			}
		} } />
	}

	return (
		<Route { ...rest }>
			{ children }
		</Route>
	)
}

export default PrivateRoute