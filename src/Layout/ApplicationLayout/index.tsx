import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import ResponsiveDrawer from './ResponsiveDrawer'
import Divider from '@material-ui/core/Divider'

import { MainListItems, SecondaryListItems } from './listItems'
import TopBar from './TopBar'

import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}))

const ApplicationLayout = ({ children }) => {	
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
        <TopBar />

        <div className={classes.toolbar} />

        { children }
      </ContentContainer>

    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
  max-width: 100vw;
`

const ContentContainer = styled.div`
  flex: 1;
  min-width: 1px;
`


export default ApplicationLayout
