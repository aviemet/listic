import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import TopBar from './TopBar'
import SideBar from './SideBar'

import { layoutStyles } from './styles'
import styled from 'styled-components'

const Dashboard = ({ children }) => {
  const classes = layoutStyles()
	
  const [open, setOpen] = React.useState(false)

  return (
    <AppContainer>
      <CssBaseline />

      <TopBar open={ open } handleDrawerOpen={ () => setOpen(true) } />

      <SideBar open={ open } handleDrawerClose={ () => setOpen(false) } />

      <Content>
        <AppBarSpacer />

        <ContentContainer maxWidth="lg">
          { children }
        </ContentContainer>
        
      </Content>

    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
`

const Content = styled.main`
  flex-grow: 1;
  height: 100vh;
  overflow: auto;
`

const AppBarSpacer = styled(({ children, ...props}) => {
  // Arguably the simplest way to pull the toolbar styles out of MUI
  const classes = makeStyles(theme => ({ appBarSpacer: theme.mixins.toolbar }))

  return <div { ...props } className={ classes().appBarSpacer }> { children } </div>
})``

const ContentContainer = styled(Container)`${({ theme }) => `
  padding-top: ${theme.spacing(4)}px;
  padding-bottom: ${theme.spacing(4)}px;
`}`

export default Dashboard
