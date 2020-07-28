import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import fire from 'lib/fire'
import { Redirect } from 'react-router';
import { useAuth } from 'data';
import routes from 'Routes/routes';
import { useNamedRoutes } from 'lib/NamedRoutes';

const Logout = () => {
	const auth = useAuth()
	const routes = useNamedRoutes()

	React.useEffect(() => {
		fire.auth().signOut()
	}, [])

	if(auth.isLoggedIn) return <CircularProgress />
	return <Redirect to={ routes.login() } />
}

export default Logout