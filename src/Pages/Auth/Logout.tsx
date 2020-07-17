import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import fire from 'lib/fire'
import { Redirect } from 'react-router';
import { useUser } from 'data/Users';

const Logout = () => {
	const user = useUser()

	React.useEffect(() => {
		fire.auth().signOut()
	}, [])

	if(user.isLoggedIn) return <CircularProgress />
	return <Redirect to="/login" />
}

export default Logout