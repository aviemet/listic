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

const Content = styled(Container)`

`


export default ApplicationLayout
