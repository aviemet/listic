import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import ResponsiveDrawer from 'Components/ui/ResponsiveDrawer'
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { layoutStyles } from './styles'
import TopBar from './TopBar'
import SideBar from './SideBar'
import AuthMenu from './AuthMenu'
import { MainListItems, SecondaryListItems } from './listItems'

import styled from 'styled-components'
import { makeStyles } from '@material-ui/core'

const ApplicationLayout = ({ children }) => {	
	const [open, setOpen] = React.useState(false)

  return (
    <AppContainer>
      <CssBaseline />

      <ResponsiveDrawer 
        open={ open } 
        handleClose={ () => setOpen(false) } 
        handleOpen={ () => setOpen(true) }
      >
        <MainListItems />

        <Divider />

        <SecondaryListItems />

      </ResponsiveDrawer>
      
      <ContentContainer>
        <AppBar
          position="fixed"
        >
          <Toolbar>
            <AuthMenu />
          </Toolbar>
        </AppBar>

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
