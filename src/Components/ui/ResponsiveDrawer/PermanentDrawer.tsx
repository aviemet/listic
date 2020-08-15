import React from 'react'
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';

import { useApp } from 'data';

import styled from 'styled-components'
import { observer } from 'mobx-react-lite';
import useWidth from 'lib/useWidth';

const PermanentDrawer = observer(({ children }) => {
	const AppStore = useApp()
	const width = useWidth()

	return (
		<StyledDrawer 
			variant={ width === "xs" ? "temporary" : "permanent"}
			className={ clsx({ open: AppStore.menuOpen }) }
		>
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

export default PermanentDrawer
