import React from 'react'
import clsx from 'clsx'
import Input from '@material-ui/core/Input'
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	search: {
		margin: '15px auto',
		padding: '10px 15px 10px 20px',
		borderRadius: 25,
		boxShadow: theme.shadows[1]
	}
}))

const Filter = () => {
	const classes = useStyles()

	return (
		<Input
			disableUnderline 
			className={ clsx(classes.search) }
			placeholder="Filter"
			fullWidth
			endAdornment={
					<InputAdornment position="end">
						<IconButton>
							<SearchIcon />
						</IconButton>
					</InputAdornment>
			}
		/>
	)
}

export default Filter
