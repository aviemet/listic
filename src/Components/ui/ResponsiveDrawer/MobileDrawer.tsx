import React from 'react'

import Drawer from '@material-ui/core/Drawer';

const PermanentDrawer = ({ children }) => {

	return (
		<Drawer>
			{ children }
		</Drawer>
	)
}

export default PermanentDrawer
