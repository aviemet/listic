import { observable } from 'mobx'

export default class UserStore {
	@observable isLoggedIn = false
}

export interface UserStoreType {
	isLoggedIn: boolean
}