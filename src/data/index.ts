import fire from 'lib/fire'
import { useAuth, useUsers, useEvents, useLists } from './StoreProviders'

export const auth = fire.auth()
export const db = fire.database()
export { useAuth, useUsers, useEvents, useLists }