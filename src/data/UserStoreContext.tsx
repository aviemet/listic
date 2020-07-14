import React, { useContext } from 'react'
import UserStore, { UserStoreType } from './UserStore'

const UserStoreContext = React.createContext<Partial<UserStoreType>>({})

export const useUser = () => useContext(UserStoreContext)

export const UserContextProvider = ({ children }) => {
	const userStore = new UserStore()
	
	return (
		<UserStoreContext.Provider value={ userStore }>
			{ children }
		</UserStoreContext.Provider>
	)
}