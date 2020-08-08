import { observable } from 'mobx'
import { db } from 'data'

export default class EventsStore {
	private _refString = 'events'
	private _ref = db.ref(this._refString)

	getEvent(key, callback) {
		db.ref(`${this._refString}/${key}`).on('value', response => {
			callback(response.val())
		})
	}

	getEvents(callback) {
		this._ref.on('value', response => {
			callback(response.val())
		})
	}

	new(data) {
		this._ref.push({
			event: data.key
		})
	}
}

export interface IEventsStore {
	loading: boolean
}