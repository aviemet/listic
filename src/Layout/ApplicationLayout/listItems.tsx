import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core'

import Link from 'Components/ui/Link'

import { useNamedRoutes } from 'rr-named-routes'
import { useApp } from 'data';
import { observer } from 'mobx-react-lite'

const ConditionalLinkWrapper = ({ to, children }) => {
	if(!to) return <>{ children }</>
	return <Link to={ to }>{ children }</Link>
}

interface IMenuLinkItem {
	to?: string,
	text: string,
	Icon: React.ReactNode | any
}

const HoverTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
		fontSize: 16,
		lineHeight: '2.5rem',
		width: 200,
		border: '1px solid #CCC',
		borderRadius: 0,
		margin: '0 0 0 1px',
		height: 50
	}
}))(Tooltip)

const MenuLinkItem: React.FC<IMenuLinkItem> = observer(({ to, text, Icon }) => {
	const AppStore = useApp()

	return (
		<ConditionalLinkWrapper to={ to }>
			<HoverTooltip title={ AppStore.menuOpen ? '' : text } placement='right'>
				<ListItem button>
					<ListItemIcon>
						<Icon />
					</ListItemIcon>
					<ListItemText primary={ text } />
				</ListItem>
			</HoverTooltip>
		</ConditionalLinkWrapper>
	)
})

export const MainListItems = () => {
	const routes = useNamedRoutes()

	return (
		<div>
			<MenuLinkItem to={ routes.dashboard() } text="Dashboard" Icon={ DashboardIcon } />

			<MenuLinkItem to={ routes.events() } text="Events" Icon={ FormatListBulletedIcon } />

			<MenuLinkItem to={ routes.groups() } text="Groups" Icon={ PeopleIcon } />

			<MenuLinkItem to={ routes.reports() } text="Reports" Icon={ BarChartIcon } />
		</div>
	)
}

export const SecondaryListItems = observer(() => {
	const AppStore = useApp()
	const routes = useNamedRoutes()

	return (
		<div>
			{ AppStore.menuOpen && <ListSubheader inset>Upcoming Events</ListSubheader> }

			<MenuLinkItem text="An Event" Icon={ AssignmentIcon } />
		</div>
	)
})