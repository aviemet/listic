import React from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import AddIcon from '@material-ui/icons/Add'

import { isEmpty } from 'lodash'
import { useEvents } from 'data'
import { useNamedRoutes } from 'rr-named-routes'
import EventsTable from './EventsTable'

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

const Events = () => {
	const classes = useStyles()
	const EventsStore = useEvents()
	const routes = useNamedRoutes()

	const [ loading, setLoading ] = React.useState(true)
	const [ events, setEvents ] = React.useState({})

	React.useEffect(() => {
		EventsStore.fetch(response => {
			setEvents(response)
			setLoading(false)
		})
	}, [])
	
	return (
    <Container maxWidth="lg">
			<div className={ clsx(classes.titlebar) }>
				<h1 className={ clsx(classes.h1) }>Upcoming Events</h1>

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

			</div>

			{ !loading && !isEmpty(events) && <EventsTable events={ events } /> }

		</Container>
	)
}

export default Events
