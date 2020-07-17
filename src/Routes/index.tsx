import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './routes'
import { useNamedRoutes } from 'lib/NamedRoutes'
import PrivateRoute from './PrivateRoute'
import ConditionalRedirectRoute from './ConditionalRedirectRoute'

import { useUser } from 'data/Users'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { ApplicationLayout } from 'Layout'

import LoadingPage from 'Components/LoadingPage'
import { Login, Register, Logout } from 'Pages/Auth'
import { Dashboard } from 'Pages/Dashboard' 
import { Groups } from 'Pages/Groups'
import { Events, NewEvent, ShowEvent } from 'Pages/Lists'
import { Reports } from 'Pages/Reports' 
import { FourOhFour } from 'Pages'

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

						<Route exact path="/events" component={ Events } />
						<Route exact path="/events/new" component={ NewEvent } />
						<Route exact path="/events/:id" component={ ShowEvent } />

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
