import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useNamedRoutes } from 'rr-named-routes'
import PrivateRoute from './PrivateRoute'
import ConditionalRedirectRoute from './ConditionalRedirectRoute'

import { useAuth } from 'data'
import { observer } from 'mobx-react-lite'
import { ApplicationLayout } from 'Layout'

import LoadingPage from 'Components/LoadingPage'
import { Login, Register, Logout } from 'Pages/Auth'
import { Dashboard } from 'Pages/Dashboard' 
import { Groups } from 'Pages/Groups'
import { Events, NewEvent, ShowEvent, EditEvent } from 'Pages/Events'
import { Reports } from 'Pages/Reports' 
import { FourOhFour } from 'Pages'

const Routes = observer(() => {	
	const auth = useAuth()
	const routes = useNamedRoutes()

	if(auth.loading) return <LoadingPage />

	return (
		<Switch>

			<ConditionalRedirectRoute exact path={ routes.login() } component={ Login } condition={ auth.isLoggedIn } redirect="/" />
			<ConditionalRedirectRoute exact path={ routes.register() } component={ Register } condition={ auth.isLoggedIn } redirect="/" />

			<PrivateRoute path="/" isAuthorized={ auth.isLoggedIn }>
				<ApplicationLayout>
					<Switch>
						<Route exact path={ routes.logout() } component={ Logout } />

						<Route exact path={ ["/", routes.dashboard()] } component={ Dashboard } />

						<Route exact path={ routes.events() } component={ Events } />
						<Route exact path={ routes.events.new() } component={ NewEvent } />
						<Route exact path={ routes.events.show() } component={ ShowEvent } />
						<Route exact path={ routes.events.show.edit() } component={ EditEvent } />

						<Route exact path={ routes.groups() } component={ Groups } />

						<Route exact path={ routes.reports() } component={ Reports } />

						<Route path="*" component={ FourOhFour } />
					</Switch>
				</ApplicationLayout>
			</PrivateRoute>

		</Switch>
	)
})

export default Routes
