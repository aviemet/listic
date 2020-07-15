import React from 'react'
import UserStore, { UserStoreType } from './UserStore'
import fire from 'lib/fire'

const UserStoreContext = React.createContext<Partial<UserStoreType>>({})

export const useUser = () => React.useContext(UserStoreContext)

export const UserContextProvider = ({ children }) => {
	const userStore = new UserStore()

	React.useEffect(() => {
		fire.auth().onAuthStateChanged(user => {
			userStore.isLoggedIn = !!user
			userStore.loading = false
		})
	}, [])
	
	return (
		<UserStoreContext.Provider value={ userStore }>
			{ children }
		</UserStoreContext.Provider>
	)
}