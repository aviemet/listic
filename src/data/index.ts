import fire from 'lib/fire'
import { useApp, useAuth, useUsers, useEvents, useLists } from './StoreProviders'

export const ROLES = {
	admin: 'admin',
	owner: 'owner',
	manager: 'manager',
	user: 'user'
}

export const auth = fire.auth()
export const db = fire.database()
export { useApp, useAuth, useUsers, useEvents, useLists }