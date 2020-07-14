import React, { useContext } from 'react'
import UserStore from './UserStore'

const UserStoreContext = React.createContext({})

export const useUser = () => useContext(UserStoreContext)

export const UserContextProvider = ({ children }) => {
	const userStore = new UserStore()
	
	return (
		<UserStoreContext.Provider value={ userStore }>
			{ children }
		</UserStoreContext.Provider>
	)
}