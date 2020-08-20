import React from 'react'
import Store, { IStore } from 'lib/Store'
import Model from 'lib/Model'
import AppStore, { IAppStore } from './AppStore'
import AuthStore, { IAuthStore } from 'data/Auth/AuthStore'
import { EventModel } from 'data/Events'
import { ListModel } from 'data/Lists'
import { UserModel } from 'data/Users'
import EventsStore from 'data/Events/EventsStore'

type storeContextTuple = [IStore, React.Context<Partial<IStore>>]

const createStoreContext = (model, path: string): storeContextTuple => {
	const store = new Store(model, path)
	const context = React.createContext<Partial<IStore>>(store)
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
const [usersStore, UsersStoreContext] = createStoreContext(UserModel, 'users')
export const useUsers = () => React.useContext(UsersStoreContext)

/**
 * Events Store
 */
const [eventsStore, EventsStoreContext] = createStoreContext(EventModel, 'events')
// const eventsStore = new EventsStore()
// const EventsStoreContext = React.createContext(eventsStore)
export const useEvents = () => React.useContext(EventsStoreContext)

/**
 * List Store
 */
const [listsStore, ListsStoreContext] = createStoreContext(ListModel, 'lists')
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