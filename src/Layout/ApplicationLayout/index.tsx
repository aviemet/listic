import React from 'react'
import clsx from 'clsx'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import { layoutStyles } from './styles'
import TopBar from './TopBar'
import SideBar from './SideBar'

const ApplicationLayout = ({ children }) => {
	const classes = layoutStyles()
	
	const [open, setOpen] = React.useState(false)
	
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={ classes.root }>
      <CssBaseline />

      <TopBar open={ open } handleDrawerOpen={ () => setOpen(true) } />

      <SideBar open={ open } handleDrawerClose={ () => setOpen(false) } />

      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Container maxWidth="lg" className={ classes.container }>
					{ children }
        </Container>
				
      </main>

    </div>
  )
}

export default ApplicationLayout
