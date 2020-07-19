import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import fire from 'lib/fire'
import { Redirect } from 'react-router';
import { useAuth } from 'data';

const Logout = () => {
	const auth = useAuth()

	React.useEffect(() => {
		fire.auth().signOut()
	}, [])

	if(auth.isLoggedIn) return <CircularProgress />
	return <Redirect to="/login" />
}

export default Logout