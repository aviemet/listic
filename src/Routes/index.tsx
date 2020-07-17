import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './routes'
import { useNamedRoutes } from 'lib/NamedRoutes'
import PrivateRoute from './PrivateRoute'
import ConditionalRedirectRoute from './ConditionalRedirectRoute'

import { useUser } from 'data/Users'
import { observer } from 'mobx-react-lite'
import { ApplicationLayout } from 'Layout'

import LoadingPage from 'Components/LoadingPage'
import { Login, Register, Logout } from 'Pages/Auth'
import { Dashboard } from 'Pages/Dashboard' 
import { Groups } from 'Pages/Groups'
import { Events, NewEvent } from 'Pages/Lists'
import { Reports } from 'Pages/Reports' 
import { FourOhFour } from 'Pages'

const Routes = observer(() => {	
	const user = useUser()

	const { links, paths } = useNamedRoutes(routes)

	React.useLayoutEffect(() => {
		console.log({ links })
	}, [])

	if(user.loading) return <LoadingPage />

	return (
		<Switch>

			<ConditionalRedirectRoute exact path={ paths.login } component={ Login } condition={ user.isLoggedIn } redirect="/" />
			<ConditionalRedirectRoute exact path={ paths.register } component={ Register } condition={ user.isLoggedIn } redirect="/" />

			<PrivateRoute path="/" isAuthorized={ user.isLoggedIn }>
				<ApplicationLayout>
					<Switch>
						<Route exact path={ paths.logout } component={ Logout } />

						<Route exact path={ paths.dashboard.index } component={ Dashboard } />

						<Route exact path={ paths.events.index } component={ Events } />
						<Route exact path={ paths.events.new } component={ NewEvent } />

						<Route exact path={ paths.groups.index } component={ Groups } />

						<Route exact path={ paths.reports.index } component={ Reports } />

						<Route path="*" component={ FourOhFour } />
					</Switch>
				</ApplicationLayout>
			</PrivateRoute>

		</Switch>
	)
})

export default Routes
