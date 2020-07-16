import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ConditionalRedirectRoute from './ConditionalRedirectRoute'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useUser } from 'data'
import { observer } from 'mobx-react-lite'
import { ApplicationLayout } from 'Layout'

import LoadingPage from 'Components/LoadingPage'
import { Login, Register, Logout } from 'Pages/Auth'
import { Dashboard } from 'Pages/Dashboard' 
import { Groups } from 'Pages/Groups'
import { Lists } from 'Pages/Lists'
import { Reports } from 'Pages/Reports' 
import { FourOhFour } from 'Pages'

const Routes = observer(() => {	
	const user = useUser()
	const location = useLocation()
	const params = useParams()
	const { path, url } = useRouteMatch()
	console.log({ location, params, path, url })

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

						<Route exact path="/lists" component={ Lists } />
						<Route exact path="/lists/new" component={ Lists } />

						<Route exact path="/groups" component={ Groups } />

						<Route exact path="/reports" component={ Reports } />

						<Route path="*" component={ FourOhFour } />
					</Switch>
				</ApplicationLayout>
			</PrivateRoute>

		</Switch>
	)
})

export default Routes
