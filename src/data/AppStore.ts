import { observable, action } from 'mobx'

export default class AppStore {
	defaultTitle = "Guest Lists App"
	@observable title = this.defaultTitle

	@action resetTitle() {
		this.title = this.defaultTitle
	}
}

export interface IAppStore {
	title: string,
	resetTitle: Function
}