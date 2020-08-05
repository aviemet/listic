import React from 'react'
import Store, { IStore } from 'lib/Store'
import Model from 'lib/Model'
import AuthStore, { IAuthStore } from 'data/Auth/AuthStore'
import { EventModel } from 'data/Events'
import { UserModel } from 'data/Users'

type storeContextTuple = [IStore, React.Context<Partial<IStore>>]

const createStoreContext = (model, path: string): storeContextTuple => {
	const store = new Store(model, path)
	const context = React.createContext<Partial<IStore>>(store)
	return [store, context]
}

/**
 * Auth Store
 */
const authStore = new AuthStore()
const AuthStoreContext = React.createContext<Partial<IAuthStore>>(authStore)
export const useAuth = () => React.useContext(AuthStoreContext)

/**
 * Users Store
 */
const [usersStore, UsersStoreContext] = createStoreContext(UserModel, 'users')
export const useUsers = () => React.useContext(UsersStoreContext)

/**
 * Events Store
 */
const [eventsStore, EventsStoreContext] = createStoreContext(EventModel, 'events')
export const useEvents = () => React.useContext(EventsStoreContext)

/**
 * List Store
 */
const [listsStore, ListsStoreContext] = createStoreContext(EventModel, 'lists')
export const useLists = () => React.useContext(ListsStoreContext)

/**
 * Compose providers as wrapper component
 */
const StoreProviders = ({ children }) => (
	<AuthStoreContext.Provider value={ authStore }>
		<UsersStoreContext.Provider value={ usersStore }>
			<EventsStoreContext.Provider value={ eventsStore }>
				<ListsStoreContext.Provider value={ listsStore }>
					{ children }
				</ListsStoreContext.Provider>
			</EventsStoreContext.Provider>
		</UsersStoreContext.Provider>
	</AuthStoreContext.Provider>
)

export default StoreProviders