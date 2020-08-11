import React from 'react';
import MuiButton from '@material-ui/core/Button'

interface ButtonProps {
	children?: any,
	[rest:string]: any
}

const Button = ({ children, ...rest }: ButtonProps) => {
	return (
		<MuiButton variant="contained" { ...rest }>
			{ children }
		</MuiButton>
	)
}

export default Button