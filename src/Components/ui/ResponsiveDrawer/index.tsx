import React from 'react'
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import ToggleButton from './ToggleButton'

import styled from 'styled-components'

interface ResponsiveDrawerProps {
	open: boolean,
	handleOpen: Function,
	handleClose: Function,
	children: any
}

const ResponsiveDrawer = ({ open, handleOpen, handleClose, children }: ResponsiveDrawerProps) => {
	console.log({ open })

	return (
		<StyledDrawer 
			variant="permanent"
			className={ clsx({ open: open }) }
		>
			<ToggleButton 
				open={ open } 
				handleOpen={ handleOpen }
				handleClose={ handleClose } 
			/>
			<Divider />
			{ children }
		</StyledDrawer>
	)
}

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
