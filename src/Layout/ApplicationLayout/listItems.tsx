import React from 'react';
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import { useNamedRoutes } from 'rr-named-routes'

const ConditionalLinkWrapper = ({ to, children }) => {
	if(!to) return <>{ children }</>
	return <Link to={ to }>{ children }</Link>
}

interface IMenuLinkItem {
	to?: string,
	text: string,
	Icon: React.ReactNode | any
}

const MenuLinkItem: React.FC<IMenuLinkItem> = ({ to, text, Icon }) => (
	<ConditionalLinkWrapper to={ to }>
		<ListItem button>
			<ListItemIcon>
				<Icon />
			</ListItemIcon>
			<ListItemText primary={ text } />
		</ListItem>
	</ConditionalLinkWrapper>
)

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

export const SecondaryListItems = () => {
	const routes = useNamedRoutes() 

	return (
		<div>
			<ListSubheader inset>Upcoming Events</ListSubheader>

			<MenuLinkItem text="An Event" Icon={ AssignmentIcon } />
		</div>
	)
}