import React from 'react'
import clsx from 'clsx'

import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import { OpenButton } from './ToggleButton'

import { useApp } from 'data'

import AuthMenu from './AuthMenu'

import { observer } from 'mobx-react-lite'

const useStyles = makeStyles(theme => ({
  topbar: {
    transition: theme.transitions.create(['padding'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.drawerWidthClosed
    }
  },
  topbarShift: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.drawerWidthOpen
    }
  },
  toolbar: theme.mixins.toolbar,
  heading: {
    flex: 1
  }
}))

const TopBar = observer(() => {
  const AppStore = useApp()

  const classes = useStyles()

  return (
		<AppBar
      position="fixed"
      className={ clsx({ [classes.topbarShift]: AppStore.menuOpen }) }
      classes={{
        root: classes.topbar,
      }}
    >
      <Toolbar className={ clsx(classes.toolbar) }>
        <Hidden smUp>
          <OpenButton handleOpen={ () => AppStore.showMenu() } />
        </Hidden>
        <Typography component="h1" variant="h6" noWrap className={ clsx(classes.heading) }>
          { AppStore.title }
        </Typography>
        <AuthMenu />
      </Toolbar>
    </AppBar>
  )
})

export default TopBar
