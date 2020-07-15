import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ConditionalRedirectRoute from './ConditionalRedirectRoute'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useUser } from 'data'
import { observer } from 'mobx-react-lite'
import { ApplicationLayout } from 'Layout'

import LoadingPage from 'Components/LoadingPage'
import { Login, Register, Logout, Dashboard, Groups, Lists, Reports, FourOhFour } from 'App/pages'

const Routes = observer(() => {	
	const user = useUser()

	if(user.loading) return <LoadingPage />

	return (
		<Switch>
			<ConditionalRedirectRoute exact path="/login" component={ Login } condition={ user.isLoggedIn } redirect="/" />
			<ConditionalRedirectRoute exact path="/register" component={ Register } condition={ user.isLoggedIn } redirect="/" />

			<PrivateRoute path="/" isAuthorized={ user.isLoggedIn }>
				<ApplicationLayout>
					<Switch>
						<Route exact path="/logout" component={ Logout } />

						<Route exact path={ ["/", "/dashboard"] } component={ Dashboard } />
						<Route exact path="lists" component={ Lists } />
						<Route exact path="groups" component={ Groups } />
						<Route exact path="reports" component={ Reports } />

						<Route path="*" component={ FourOhFour } />
					</Switch>
				</ApplicationLayout>
			</PrivateRoute>

		</Switch>
	)
})

export default Routes
