import React from 'react'
import Model from 'lib/Model'
import Store from 'lib/Store'
import AppStore, { IAppStore } from './AppStore'
import AuthStore, { IAuthStore } from 'data/Auth/AuthStore'
import { EventModel } from 'data/Events'
import { ListModel } from 'data/Lists'
import { UserModel } from 'data/Users'

type storeContextTuple = [Store, React.Context<Partial<Store>>]

const createStoreContext = (path: string, model: typeof Model): storeContextTuple => {
	const store = new Store(path, model)
	const context = React.createContext<Partial<Store>>(store)
	return [store, context]
}

/**
 * App Store
 */
const appStore = new AppStore()
const AppStoreContext = React.createContext<Partial<IAppStore>>(appStore)
export const useApp = () => React.useContext(AppStoreContext)

/**
 * Auth Store
 */
const authStore = new AuthStore()
const AuthStoreContext = React.createContext<Partial<IAuthStore>>(authStore)
export const useAuth = () => React.useContext(AuthStoreContext)

/**
 * Users Store
 */
const [usersStore, UsersStoreContext] = createStoreContext('users', UserModel)
export const useUsers = () => React.useContext(UsersStoreContext)

/**
 * Events Store
 */
const [eventsStore, EventsStoreContext] = createStoreContext('events', EventModel)
export const useEvents = () => React.useContext(EventsStoreContext)

/**
 * List Store
 */
const [listsStore, ListsStoreContext] = createStoreContext('lists', ListModel)
export const useLists = () => React.useContext(ListsStoreContext)

/**
 * Compose providers as wrapper component
 */
const StoreProviders = ({ children }) => (
	<AppStoreContext.Provider value={ appStore }>
		<AuthStoreContext.Provider value={ authStore }>
			<UsersStoreContext.Provider value={ usersStore }>
				<EventsStoreContext.Provider value={ eventsStore }>
					<ListsStoreContext.Provider value={ listsStore }>
						{ children }
					</ListsStoreContext.Provider>
				</EventsStoreContext.Provider>
			</UsersStoreContext.Provider>
		</AuthStoreContext.Provider>
	</AppStoreContext.Provider>
)

export default StoreProviders
