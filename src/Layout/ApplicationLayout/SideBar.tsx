import React from 'react'
import clsx from 'clsx'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { MainListItems , SecondaryListItems } from './listItems'

import { sidebarStyles } from './styles'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'

interface SideBarProps {
	open: boolean,
	handleDrawerClose: Function
}

const SideBar = ({ open, handleDrawerClose }: SideBarProps) => {

  return (
		<AppDrawer variant="permanent">

			<ToolBarIcon id="SHIT">
				<IconButton onClick={ () => handleDrawerClose() }>
					<ChevronLeftIcon />
				</IconButton>
			</ToolBarIcon>

			<Divider />

			<List>
				<MainListItems />
			</List>

			<Divider />

			<List>
				<SecondaryListItems />
			</List>

		</AppDrawer>
  )
}

const AppDrawer = styled(({ children, ...rest }) => {
	const classes = makeStyles(theme => ({
		drawerPaper: {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: theme.drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},

		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		},
	}))
	return <Drawer { ...rest } 
		classes={ {
			//@ts-ignore
			paper: clsx(classes.drawerPaper, {
				//@ts-ignore
				[classes.drawerPaperClose]: !open
			}),
		} }>{ children }</Drawer>
})``

const ToolBarIcon = styled(({ children, ...rest }) => {
	const classes = makeStyles(theme => ({ toolbarIcon: {...theme.mixins.toolbar} }))
	//@ts-ignore
	return <div { ...rest } className={ classes.toolbarIcon }>{ children }</div>
})`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 0 8px;
`

export default SideBar
