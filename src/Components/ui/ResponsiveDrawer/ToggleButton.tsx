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

import styled from 'styled-components'

interface ToggleButtonProps {
	open: boolean,
	handleOpen: Function,
	handleClose: Function
}

const ToggleButton = ({ open, handleOpen, handleClose }: ToggleButtonProps) => {
	return (
		<ButtonContainer disableGutters={ !open }>
			{ open && <CloseButton handleClose={ handleClose } /> }
			{ !open && <OpenButton handleOpen={ handleOpen } /> }
		</ButtonContainer>
	)
}

const CloseButton = ({ handleClose }) => (
	<IconButton onClick={ () => handleClose() }>
		<ChevronLeftIcon />
	</IconButton>
)

const OpenButton = ({ handleOpen }) => (
	<IconButton onClick={ () => handleOpen() } style={ { paddingRight: 18 } }>
		<MenuIcon />
	</IconButton>
)

const ButtonContainer = styled(Toolbar)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`

export default ToggleButton
