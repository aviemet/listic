import React from 'react'
import clsx from 'clsx';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import { useApp } from 'data';
import ToggleButton from './ToggleButton'

import useWidth from 'lib/useWidth';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components'

const ResponsiveDrawer = observer(({ children }) => {
	const AppStore = useApp()
	const width = useWidth()

	return (
		<StyledDrawer 
			variant={ width === "xs" ? "temporary" : "permanent"}
			className={ clsx({ open: AppStore.menuOpen }) }
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
