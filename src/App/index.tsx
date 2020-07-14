import React from 'react'
import { UserContextProvider } from 'data'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'Routes'

// import fire from 'lib/fire'

const App = () => {
	return (
		<UserContextProvider>
			<Router>
				<Routes />
			</Router>
		</UserContextProvider>
	)
}

export default App
