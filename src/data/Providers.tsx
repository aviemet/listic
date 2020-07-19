import React from 'react'
import AuthStore, { IAuthStore } from 'data/Auth/AuthStore'
import UsersStore, { IUsersStore } from 'data/Users/UsersStore'
import EventsStore, { IEventsStore } from 'data/Events/EventsStore'

const AuthStoreContext = React.createContext<Partial<IAuthStore>>({})
export const useAuth = () => React.useContext(AuthStoreContext)

const UsersStoreContext = React.createContext<Partial<IUsersStore>>({})
export const useUsers = () => React.useContext(UsersStoreContext)


const EventsStoreContext = React.createContext<Partial<IEventsStore>>({})
export const useEvents = () => React.useContext(EventsStoreContext)

const Providers = ({ children }) => (
	<AuthStoreContext.Provider value={ new AuthStore() }>
		<UsersStoreContext.Provider value={ new UsersStore() }>
			<EventsStoreContext.Provider value={ new EventsStore() }>
				{ children }
			</EventsStoreContext.Provider>
		</UsersStoreContext.Provider>
	</AuthStoreContext.Provider>
)

export default Providers
