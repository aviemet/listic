import React from 'react'
import { UserContextProvider } from 'data/Users'

const Providers = ({ children }) => {
	return (
		<UserContextProvider>
			{ children }
		</UserContextProvider>
	)
}

export default Providers
