import React, { useContext, useEffect } from 'react'
import UserStore, { UserStoreType } from './UserStore'
import fire from 'lib/fire'

const UserStoreContext = React.createContext<Partial<UserStoreType>>({})

export const useUser = () => useContext(UserStoreContext)

export const UserContextProvider = ({ children }) => {
	const userStore = new UserStore()

	useEffect(() => {
		fire.auth().onAuthStateChanged(user => {
			console.log({ user })
			userStore.isLoggedIn = !!user
		})
	}, [])
	
	return (
		<UserStoreContext.Provider value={ userStore }>
			{ children }
		</UserStoreContext.Provider>
	)
}