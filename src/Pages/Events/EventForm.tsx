import React from 'react'

import { useForm } from 'react-hook-form'

import { Input, Button } from 'Components/ui'

import { newListStyles } from './styles'

const EventForm = ({ event }) => {
	const { register, errors, handleSubmit } = useForm()

	React.useEffect(() => {
		console.log({ event })
	}, [])
	
	const onSubmit = data => {

	}

	const classes = newListStyles();

	return (
		<form onSubmit={ handleSubmit(onSubmit) }>
			<Input
				defaultValue={ event.title }
				required
				name="title"
				label="Event Title"
				errors={ errors }
				inputRef={ register({
					required: "Value Required"
				}) }
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={ classes.submit }
			>
				Update Event
			</Button>
		</form>
	)
}

export default EventForm
