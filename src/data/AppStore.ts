import { observable, action } from 'mobx'

export default class AppStore {
	defaultTitle = "Guest Lists App"
	@observable title = this.defaultTitle
	@observable menuOpen = false

	@action resetTitle() {
		this.title = this.defaultTitle
	}

	@action.bound showMenu() {
		this.menuOpen = true
	}

	@action.bound hideMenu() {
		this.menuOpen = false
	}
}

export interface IAppStore {
	title: string,
	resetTitle: Function,
	menuOpen: boolean,
	showMenu: Function,
	hideMenu: Function
}