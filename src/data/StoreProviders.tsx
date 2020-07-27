import React from 'react'
import Store, { IStore } from 'lib/Store'
import AuthStore, { IAuthStore } from 'data/Auth/AuthStore'
import UsersStore, { IUsersStore } from 'data/Users/UsersStore'
import EventsStore, { IEventsStore } from 'data/Events/EventsStore'
import { EventModel } from 'data/Events'

/**
 * Auth Store
 */
const authStore = new AuthStore()
const AuthStoreContext = React.createContext<Partial<IAuthStore>>(authStore)
export const useAuth = () => React.useContext(AuthStoreContext)

/**
 * Users Store
 */
const usersStore = new UsersStore()
const UsersStoreContext = React.createContext<Partial<IUsersStore>>(usersStore)
export const useUsers = () => React.useContext(UsersStoreContext)

/**
 * Events Store
 */
const eventsStore = new Store(EventModel, 'events')
const EventsStoreContext = React.createContext<Partial<IStore>>(eventsStore)
export const useEvents: any = () => React.useContext(EventsStoreContext)

/**
 * Compose providers as wrapper component
 */
const StoreProviders = ({ children }) => (
	<AuthStoreContext.Provider value={ authStore }>
		<UsersStoreContext.Provider value={ usersStore }>
			<EventsStoreContext.Provider value={ eventsStore }>
				{ children }
			</EventsStoreContext.Provider>
		</UsersStoreContext.Provider>
	</AuthStoreContext.Provider>
)

export default StoreProviders
