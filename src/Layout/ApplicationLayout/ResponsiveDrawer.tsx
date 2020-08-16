import React from 'react'
import clsx from 'clsx';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core'

import ToggleButton from './ToggleButton'

import { useApp } from 'data';
import useWidth from 'lib/useWidth';

import { observer } from 'mobx-react-lite';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		height: '100vh',
		width: theme.drawerWidthClosed,

		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		})
	},
	drawerOpen: {
		width: theme.drawerWidthOpen
	},
	drawerPaper: {
		overflowX: 'hidden',
		position: 'absolute',
		whiteSpace: 'nowrap',
		width: 'inherit'
	}
}))

const ResponsiveDrawer = observer(({ children }) => {
	const AppStore = useApp()
	const classes = useStyles()
	const width = useWidth()

	return (
		<Drawer 
			variant={ width === "xs" ? "temporary" : "permanent"}
			className={ clsx({ [classes.drawerOpen]: AppStore.menuOpen }) }
			classes={ { 
				root: classes.root, 
				paper: classes.drawerPaper
			} }
			open={ AppStore.menuOpen }
		>

			<ToggleButton/>

			<Divider />

			{ children }

		</Drawer>
	)
})

export default ResponsiveDrawer
