import { observable, action } from 'mobx'
import * as data from 'lib/fire'

console.log({ data })
const auth = data.auth

export default class AuthStore {
	@observable loading = true
	@observable isLoggedIn = false

	constructor() {		
		auth.onAuthStateChanged(user => {
			this.isLoggedIn = !!user
			this.loading = false
		})
	}

	@action signOut() {
		auth.signOut()
	}

	@action signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      console.error({ error })
    })
	}

	@action register(email, password) {
    auth.createUserWithEmailAndPassword(email, password).catch(error => {
      console.error({ error })
    })
	}
}

export interface IAuthStore {
	loading: boolean,
	isLoggedIn: boolean,
	signOut: Function,
	signIn: Function,
	register: Function
}