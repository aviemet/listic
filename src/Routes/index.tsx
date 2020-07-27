import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { useNamedRoutes } from 'lib/NamedRoutes'
import PrivateRoute from './PrivateRoute'
import ConditionalRedirectRoute from './ConditionalRedirectRoute'

import { useAuth } from 'data'
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
	const auth = useAuth()
	const { paths, links } = useNamedRoutes()

	React.useEffect(() => {
		console.log({ paths })
		console.log({ events: paths.events.new })
		console.log({ login: paths.login() })
	}, [])

	if(auth.loading) return <LoadingPage />

	return (
		<Switch>

			<ConditionalRedirectRoute exact path="/login" component={ Login } condition={ auth.isLoggedIn } redirect="/" />
			<ConditionalRedirectRoute exact path="/register" component={ Register } condition={ auth.isLoggedIn } redirect="/" />

			<PrivateRoute path="/" isAuthorized={ auth.isLoggedIn }>
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
