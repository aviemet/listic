import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { useUser } from 'data'

import ApplicationLayout from 'Layout'

import LoginPage from 'App/Auth/Login'
import RegisterPage from 'App/Auth/Register'

const Routes = () => {	
	const user = useUser()

	return (
		<Switch>
			<Route exact path="/login" component={ LoginPage } />
			<Route exact path="/register" component={ RegisterPage }/>

			<PrivateRoute path="/" isAuthorized={ user.isLoggedIn }>
				<ApplicationLayout>
					<Switch>
						<Route exact path="/">
							<h1>Hello</h1>
						</Route>

						<Route exact path="/sup"><h1>Sup</h1></Route>

						<Route path="*"><h1>No Route Match</h1></Route>
					</Switch>
				</ApplicationLayout>
			</PrivateRoute>

		</Switch>
	)
}

export default Routes