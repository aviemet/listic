import React from 'react'
import Providers from 'data/Providers'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'Routes'

const App = () => {
	return (
		<Providers>
			<Router>
				<Routes />
			</Router>
		</Providers>
	)
}

export default App
