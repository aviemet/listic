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
import { Button } from 'Components/ui'

import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'

import { useEvents } from 'data'
import { useNamedRoutes } from 'rr-named-routes'
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
)

const Events = () => {
	const classes = useStyles()
	const EventStore = useEvents()
	const routes = useNamedRoutes()

	const [ loading, setLoading ] = React.useState(true)
	const [ events, setEvents ] = React.useState({})

	React.useEffect(() => {
		EventStore.getEvents(events => {
			setLoading(false)
			setEvents(events)
			console.log({ events })
		})
	}, [])
	
	return (
    <Container component="main" maxWidth="xl">
			<Grid container spacing={ 2 }>
				<Grid item xs={ 12 } sm={ 6 }>
					<h1>Upcoming Events</h1>
				</Grid>
				<Grid item xs={ 12 } sm={ 6 }>
				<Button
					variant="contained"
					color="secondary"
					className={ classes.button }
					startIcon={ <AddIcon /> }
					component={ Link }
					to={ routes.events.new() }
				>
					New Event
				</Button>
				</Grid>
			</Grid>

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
						{ !loading && Object.entries(events).map(([key, event]: any) => (
							<TableRow key={ key }>
								<TableCell>
									<Link to={ routes.events.show({ id: key }) }>{ event.title }</Link>
								</TableCell>
								<TableCell>{ moment(event.date).format('M/D/YY') }</TableCell>
								<TableCell>{ event.lists.length }</TableCell>
								<TableCell>{ event.lists.reduce((guests, list) => {
									return guests + list.guestCount
								}, 0) }</TableCell>
								<TableCell>
									<Button
										color="secondary"
										startIcon={ <EditIcon /> }
										className={ classes.button }
										component={ Link }
										to={ routes.events.show.edit({ id: key }) }
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

		</Container>
	)
}

export default Events