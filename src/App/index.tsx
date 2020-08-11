import React from 'react'
import StoreProviders from 'data/StoreProviders'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from 'Layout/theme'

import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'Routes'
import { NamedRoutesProvider } from 'rr-named-routes'
import routes from 'Routes/routes'

const App = () => {

	return (
		<NamedRoutesProvider value={ routes }>
			<StoreProviders>

				<MuiThemeProvider theme={ theme }>
					<StyledThemeProvider theme={ theme }>

						<Router>
							<Routes />
						</Router>

					</StyledThemeProvider>
				</MuiThemeProvider>

			</StoreProviders>
		</NamedRoutesProvider>
	)

}

export default App
