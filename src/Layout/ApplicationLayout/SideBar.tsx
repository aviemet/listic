import React from 'react'
import clsx from 'clsx'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { MainListItems , SecondaryListItems } from './listItems'

import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'

interface SideBarProps {
	open: boolean,
	handleDrawerClose: Function,
	handleDrawerOpen: Function
}

const SideBar = ({ open, handleDrawerClose, handleDrawerOpen }: SideBarProps) => {

  return (
		<AppDrawer variant="permanent" className={ clsx({ closed: !open })} id="AppDrawer">

			<ToolBarIcon id="ToolBarIcon">
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

const AppDrawer = styled(Drawer)`${({ theme }) => `
	border: 5px solid organge;

	&.close {
    overflow-x: hidden;
		width: ${theme.spacing(7)}px;
	}
`}`

const ToolBarIcon = styled(({ children, ...rest }) => {
	const classes = makeStyles(theme => ({ toolbar: {...theme.mixins.toolbar} }))()
	//@ts-ignore
	return <div { ...rest } className={ classes.toolbar }>{ children }</div>
})`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 0 8px;
	border: 2px solid orange;
`

export default SideBar
