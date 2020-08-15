import React from 'react'
import clsx from 'clsx'

import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import { OpenButton } from 'Components/ui/ResponsiveDrawer/ToggleButton'

import { useApp } from 'data'

import AuthMenu from './AuthMenu'

import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

const useStyles = makeStyles(theme => ({
  topBarTransition: {
    transition: theme.transitions.create(['padding'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  toolbar: theme.mixins.toolbar
}))

const TopBar = observer(() => {
  const AppStore = useApp()

  const classes = useStyles()

  return (
		<StyledAppBar
      position="fixed"
      className={ clsx({ open: AppStore.menuOpen }) }
      classes={{
        root: classes.topBarTransition
      }}
    >
      <Toolbar>
        <Hidden smUp>
          <OpenButton handleOpen={ () => AppStore.showMenu() } />
        </Hidden>
        <FlexHeading component="h1" variant="h6" noWrap>
          Responsive drawer
        </FlexHeading>
        <AuthMenu />
      </Toolbar>
    </StyledAppBar>
  )
})

const StyledAppBar = styled(AppBar)`${({ theme }) => `
  ${theme.breakpoints.up("sm")} {
    padding-left: ${theme.drawerWidthClosed}px;

    &.open {
      padding-left: ${theme.drawerWidthOpen}px;
    }
  }
`}`

const FlexHeading = styled(Typography)`
  flex-grow: 1;
`

export default TopBar
