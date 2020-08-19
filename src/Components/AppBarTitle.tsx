import React from 'react'
import Typography from '@material-ui/core/Typography'

const AppBarTitle = ({ text }) => {
	return (
		<Typography component="h1" variant="h6" noWrap>
			{ text }
		</Typography>
	)
}

export default AppBarTitle
