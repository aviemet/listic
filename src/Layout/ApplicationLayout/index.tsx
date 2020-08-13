import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import { layoutStyles } from './styles'
import TopBar from './TopBar'
import SideBar from './SideBar'

import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  appBarSpacer: theme.mixins.toolbar,

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}))

const ApplicationLayout = ({ children }) => {
  const classes = useStyles()
	
	const [open, setOpen] = React.useState(false)

  return (
    <AppContainer>
      <CssBaseline />

      <TopBar open={ open } handleDrawerOpen={ () => setOpen(true) } />

      <SideBar open={ open } handleDrawerClose={ () => setOpen(false) } />

      <ContentContainer>
        <AppBarSpacer />

        <Content maxWidth="lg">
					{ children }
        </Content>
				
      </ContentContainer>

    </AppContainer>
  )
}

const AppBarSpacer = styled(props => {
  const classes = makeStyles(theme => ({
    appBarSpacer: theme.mixins.toolbar
  }))()
  return <div { ...props } className={ classes.appBarSpacer } />
})``

const AppContainer = styled.div`
  display: 'flex';
`

const ContentContainer = styled.main`
  flex-grow: 1;
  height: 100vh;
  overflow: 'auto';
`

const Content = styled(Container)`${({ theme }) => `
  padding-top: ${theme.spacing(4)}px;
  padding-bottom: ${theme.spacing(4)}px;
`}`

export default ApplicationLayout
