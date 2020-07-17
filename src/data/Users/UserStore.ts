import { observable } from 'mobx'
import { auth } from 'data'

export default class UserStore {
	@observable loading = true
	@observable isLoggedIn = false

	constructor() {
		auth.onAuthStateChanged(user => {
			this.isLoggedIn = !!user
			this.loading = false
		})
	}
}

export interface UserStoreType {
	loading: boolean,
	isLoggedIn: boolean
}