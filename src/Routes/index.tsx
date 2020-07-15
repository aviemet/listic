import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ConditionalRedirectRoute from './ConditionalRedirectRoute'

import { useUser } from 'data'
import { observer } from 'mobx-react-lite'
import { ApplicationLayout } from 'Layout'

import { Login, Register, Logout } from 'App/Auth'
import fire from 'lib/fire'

const Routes = observer(() => {	
	const user = useUser()

	return (
		<Switch>
			<ConditionalRedirectRoute exact path="/login" component={ Login } condition={ user.isLoggedIn } redirect="/" />
			<ConditionalRedirectRoute exact path="/register" component={ Register } condition={ user.isLoggedIn } redirect="/" />

			<PrivateRoute path="/" isAuthorized={ user.isLoggedIn }>
				<ApplicationLayout>
					<Switch>
						<Route exact path="/logout" component={ Logout } />

						<Route exact path="/">
							<h1>Hello</h1>
						</Route>

						<Route exact path="/sup"><h1>Sup</h1></Route>

						<Route path="*"><h1>404</h1></Route>
					</Switch>
				</ApplicationLayout>
			</PrivateRoute>

		</Switch>
	)
})

export default Routes
