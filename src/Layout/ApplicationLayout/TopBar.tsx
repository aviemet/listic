import React from 'react'
import clsx from 'clsx'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import { useApp } from 'data'

import AuthMenu from './AuthMenu'

import { layoutStyles } from './styles'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components'

interface TopBarProps {
	open: boolean,
	handleDrawerOpen: Function
}

const TopBar = observer(({ open, handleDrawerOpen }: TopBarProps) => {
  const AppStore = useApp()

	const classes = layoutStyles()

  return (
		<AppBar position="absolute" className='open'>

			<StyledToolbar>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={ () => handleDrawerOpen() }
					className={ clsx(classes.menuButton, open && classes.menuButtonHidden) }
				>
					<MenuIcon />
				</IconButton>

				<Typography component="h1" variant="h6" color="inherit" noWrap className={ classes.title }>
					{ AppStore.title }
				</Typography>

				<AuthMenu />
			</StyledToolbar>


		</AppBar>
  )
})

const StyledAppBar = styled(AppBar)`${({ theme }) => `
	zIndex: theme.zIndex.drawer + 1,
	transition: ${theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	})},
		
	&.open {
		margin-left: ${theme.drawerWidth};
		width: calc(100% - ${theme.drawerWidth}px);
    transition: ${theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })},
	}
`}`

const StyledToolbar = styled(Toolbar)`
	padding-right: 24px;
`

export default TopBar
