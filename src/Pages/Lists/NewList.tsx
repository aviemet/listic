import React from 'react';
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import fire from 'lib/fire'

import { has } from 'lodash'
import { useForm } from 'react-hook-form'

import { newListStyles } from './styles'

const NewList = () => {
	const { register, errors, handleSubmit } = useForm()

	const onSubmit = data => {
		fire.auth().signInWithEmailAndPassword(data.email, data.password).catch(error => {
			console.error({ error })
		});
	}
	
	const classes = newListStyles();

	return (
		<Container component="main" maxWidth="lg">
			
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Create New List
				</Typography>
				<form className={classes.form} onSubmit={ handleSubmit(onSubmit) }>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="title"
						label="List Title"
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
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Create New List
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default NewList