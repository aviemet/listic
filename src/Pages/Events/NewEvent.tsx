import React from 'react';
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { db, useEvents } from 'data'

import { has } from 'lodash'
import { useForm } from 'react-hook-form'

import { newListStyles } from './styles'

const NewEvent = () => {
	const history = useHistory() // For redirecting to the event up creation
	const { register, errors, handleSubmit } = useForm()
	const events = useEvents()

	const onSubmit = data => {
		// const event = events.new()
		// const eventKey = event.save(data).key
		// history.push(`/events/${eventKey}`)
	}
	
	const classes = newListStyles();

	return (
		<Container component="main" maxWidth="lg">
			
			<div className={ classes.paper }>
				<Typography component="h1" variant="h5">
					Create New Event
				</Typography>
				<form className={ classes.form } onSubmit={ handleSubmit(onSubmit) }>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="title"
						label="Event Title"
						name="title"
						autoComplete="title"
						autoFocus
						error={ has(errors, 'title') }
						helperText={ errors.title && errors.title.message }
						inputRef={ register({
							required: "Value Required"
						}) }
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="date"
						label="Date"
						type="date"
						id="date"
						autoComplete="date"
						error={ has(errors, 'date') }
						helperText={ errors.date && errors.date.message }
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
						variant="contained"
						color="primary"
						className={ classes.submit }
					>
						Create New Event
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default NewEvent