import React from 'react'
import StoreProviders from 'data/StoreProviders'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'Routes'
import { NamedRoutesProvider } from 'rr-named-routes'
import routes from 'Routes/routes'

const App = () => {

	return (
		<NamedRoutesProvider value={ routes }>
			<StoreProviders>
				<Router>
					<Routes />
				</Router>
			</StoreProviders>
		</NamedRoutesProvider>
	)
}

export default App
