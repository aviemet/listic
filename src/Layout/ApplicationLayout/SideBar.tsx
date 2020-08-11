import React from 'react'
import clsx from 'clsx'

import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { MainListItems , SecondaryListItems } from './listItems'

import { layoutStyles } from './styles'

interface SideBarProps {
	open: boolean,
	handleDrawerClose: Function
}

const SideBar = ({ open, handleDrawerClose }: SideBarProps) => {
	const classes = layoutStyles()

  return (
		<Drawer
			variant="permanent"
			classes={ {
				paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
			} }
			open={ open }
		>

			<div className={ classes.toolbarIcon }>
				<IconButton onClick={ () => handleDrawerClose() }>
					<ChevronLeftIcon />
				</IconButton>
			</div>

			<Divider />

			<List>
				<MainListItems />
			</List>

			<Divider />

			<List>
				<SecondaryListItems />
			</List>

		</Drawer>
  )
}

export default SideBar
