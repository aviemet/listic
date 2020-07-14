import React from 'react'
import { Redirect, Route } from 'react-router-dom'

interface PrivateRouteProps {
	isAuthorized: boolean
}

const PrivateRoute = ({ isAuthorized, children, ...rest }) => {
	if(!isAuthorized) {
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