import React from 'react'
import clsx from 'clsx';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core'

import ToggleButton from './ToggleButton'

import { useApp } from 'data';
import useWidth from 'lib/useWidth';

import { observer } from 'mobx-react-lite';
import styled from 'styled-components'


const useStyles = makeStyles(theme => ({
	drawerPaper: {
		overflowX: 'hidden'
	}
}))

const ResponsiveDrawer = observer(({ children }) => {
	const AppStore = useApp()
	const classes = useStyles()
	const width = useWidth()

	return (
		<StyledDrawer 
			variant={ width === "xs" ? "temporary" : "permanent"}
			className={ clsx({ open: AppStore.menuOpen }) }
			classes={ { paper: classes.drawerPaper } }
			open={ AppStore.menuOpen }
		>

			<ToggleButton/>

			<Divider />

			{ children }

		</StyledDrawer>
	)
})

const StyledDrawer = styled(Drawer)`${({ theme }) => `
	transition: ${theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	})};
	&.open {
		width: ${theme.drawerWidthOpen}px;
	}
`}`

export default ResponsiveDrawer
