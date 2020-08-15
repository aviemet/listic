import React from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import Typography from '@material-ui/core/Typography'
import ResponsiveDrawer from 'Components/ui/ResponsiveDrawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'

import AuthMenu from './AuthMenu'
import { MainListItems, SecondaryListItems } from './listItems'

import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'
import { OpenButton } from 'Components/ui/ResponsiveDrawer/ToggleButton'


const useStyles = makeStyles(theme => ({
  topBarTransition: {
    transition: theme.transitions.create(['padding'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  toolbar: theme.mixins.toolbar
}))

const ApplicationLayout = ({ children }) => {	
  const [open, setOpen] = React.useState(false)
  const classes = useStyles() 

  return (
    <AppContainer>
      <CssBaseline />

      <ResponsiveDrawer>
        <MainListItems />

        <Divider />

        <SecondaryListItems />

      </ResponsiveDrawer>
      
      <ContentContainer>
        <TopBar
          position="fixed"
          className={ clsx({ open: open }) }
          classes={{
            root: classes.topBarTransition
          }}
        >
          <Toolbar>
            <Hidden smUp>
              <OpenButton handleOpen={ () => setOpen(true) } />
            </Hidden>
            <FlexHeading component="h1" variant="h6" noWrap>
              Responsive drawer
            </FlexHeading>
            <AuthMenu />
          </Toolbar>
        </TopBar>

        <div className={classes.toolbar} />

        <Content>
          { children }
        </Content>
      </ContentContainer>

    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
`

const ContentContainer = styled(Container)`
  flex: 1;
`

const TopBar = styled(AppBar)`${({ theme }) => `
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

const Content = styled(Container)`

`


export default ApplicationLayout
