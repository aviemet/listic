import React from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Divider from '@material-ui/core/Divider'
import { useAuth } from 'data'
import { useNamedRoutes } from 'rr-named-routes'

const AuthMenu = () => {
	const auth = useAuth()
	const routes = useNamedRoutes()

  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
		<>
			{ auth.isLoggedIn && (
				<div>
					<IconButton
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={handleMenu}
						color="inherit"
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={ anchorEl }
						anchorOrigin={ {
							vertical: 'top',
							horizontal: 'right',
						} }
						keepMounted
						transformOrigin={ {
							vertical: 'top',
							horizontal: 'right',
						} }
						open={ open }
						onClose={ handleClose }
					>
						<MenuItem onClick={ handleClose }>Profile</MenuItem>
						<MenuItem onClick={ handleClose }>My account</MenuItem>
						<Divider />
						<MenuItem onClick={ handleClose }><Link to={ routes.logout() }>Logout</Link></MenuItem>
					</Menu>
				</div>
			)}
		</>
	)
}

export default AuthMenu