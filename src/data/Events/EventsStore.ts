import { observable } from 'mobx'
import { db } from 'data'
import Store from 'lib/Store'

export default class EventStore extends Store {
	constructor() {
		super()
		this._ref = db.ref('events')
	}
}

export interface IEventsStore {
}