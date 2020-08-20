import React from 'react'
import Providers from 'data/Providers'

import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from 'Layout/theme'

import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'Routes'
import { NamedRoutesProvider } from 'rr-named-routes'
import routes from 'Routes/routes'

const App = () => {

	return (
		<NamedRoutesProvider value={ routes }>
			<Providers>

				<MuiThemeProvider theme={ theme }>
					<StyledThemeProvider theme={ theme }>

						<Router>
							<Routes />
						</Router>

					</StyledThemeProvider>
				</MuiThemeProvider>
				
			</Providers>
		</NamedRoutesProvider>
	)

}

export default App
