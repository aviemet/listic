import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ConditionalRedirectRoute: React.FC<{condition: boolean | undefined, redirect: string, [rest:string]: any}> = ({ condition, redirect, ...rest }) => {
	if(condition) return <Redirect to={ redirect } />
	return <Route { ...rest } />
}

export default ConditionalRedirectRoute