import React from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

import { useEvents } from 'data'
import { useNamedRoutes } from 'rr-named-routes'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	titlebar: {
		display: 'flex'
	},
	h1: {
		flex: 1
	}
}))

const EventsTable = ({ events }) => {
	const classes = useStyles()
	const routes = useNamedRoutes()
	
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell><TableSortLabel>Title</TableSortLabel></TableCell>
						<TableCell><TableSortLabel>Date</TableSortLabel></TableCell>
						<TableCell><TableSortLabel>Lists</TableSortLabel></TableCell>
						<TableCell><TableSortLabel>Guests</TableSortLabel></TableCell>
						<TableCell><TableSortLabel>Actions</TableSortLabel></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ events.map(event => (
						<TableRow key={ event.key }>
							<TableCell>
								<Link to={ routes.events.show({ id: event.key }) }>{ event.data.title }</Link>
							</TableCell>
							<TableCell>{ moment(event.data.date).format('M/D/YY') }</TableCell>
							<TableCell>{ event.data.lists.length }</TableCell>
							<TableCell>{ event.data.lists.reduce((guests, list) => {
								return guests + list.guestCount
							}, 0) }</TableCell>
							<TableCell>
								<IconButton
									color="secondary"
									className={ classes.button }
									component={ Link }
									to={ routes.events.show.edit({ id: event.key }) }
								><EditIcon /></IconButton>
							</TableCell>
						</TableRow>
					)) }
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default EventsTable
