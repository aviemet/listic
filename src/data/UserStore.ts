import { observable } from 'mobx'

export default class UserStore {
	@observable loading = true
	@observable isLoggedIn = false
}

export interface UserStoreType {
	loading: boolean,
	isLoggedIn: boolean
}