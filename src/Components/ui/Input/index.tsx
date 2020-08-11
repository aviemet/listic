import React from 'react'
import TextField from '@material-ui/core/TextField'
import { has } from 'lodash'

interface InputParams {
	name: string,
	label: string,
	errors?: object,
	[rest:string]: any
}

/**
 * Input which accepts errors. Id and autocomplete values derived from 'name'
 * @param param0 params
 */
const Input = ({ name, label, errors, ...rest }: InputParams) => {
	let error = false
	let helperText: boolean | string = false

	if(errors) {
		error = has(errors, name)
		helperText = errors[name] && errors[name].message
 	}

	return (
		<TextField
			variant="outlined"
			margin="normal"
			fullWidth
			id={ name }
			name={ name }
			autoComplete={ name }
			label={ label }
			error={ error }
			helperText={ helperText }
			{ ...rest }
		/>
	)
}

export default Input