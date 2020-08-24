import React from 'react'
import { useHistory } from 'react-router-dom'
import { useNamedRoutes } from 'rr-named-routes'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { Input, Button } from 'Components/ui'

import { useEvents } from 'data'

import { useForm } from 'react-hook-form'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const NewEvent = () => {
	const routes = useNamedRoutes()
	const history = useHistory() // For redirecting to the event up creation
	const { register, errors, handleSubmit } = useForm()
	const EventsStore = useEvents()

	const onSubmit = data => {
		const event = EventsStore.create()
		
		event.save(data, error => {
			if(error) {
				console.error(error)
			} else {
				console.log({ data: event.data })
				history.push(routes.events.show.edit({ id: event.key }))
			}
		})
	}
	
	const classes = useStyles()

	return (
		<Container component="main" maxWidth="lg">
			
			<div className={ classes.paper }>
				<Typography component="h1" variant="h5">
					Create New Event
				</Typography>

				<form className={ classes.form } onSubmit={ handleSubmit(onSubmit) }>
					<Input
						label="Event Title"
						name="title"
						required
						autoFocus
						errors={ errors }
						inputRef={ register({
							required: "Value Required"
						}) }
					/>
					
					<Input
						required
						name="date"
						label="Date"
						type="date"
						errors={ errors }
						inputRef={ register({
							required: "Value Required"
						}) }
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<Button
						type="submit"
						fullWidth
						color="primary"
						className={ classes.submit }
					>
						Create New Event
					</Button>
				</form>
			</div>
		</Container>
	)
}

export default NewEvent