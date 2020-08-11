import { db, auth, ROLES } from 'data'


export default class EventsStore {
	private _refString = 'events'
	private _ref = db.ref(this._refString)

	isAuthorized(acl) {
		const role = acl.find(user => {
			if(user.user = auth.currentUser.uid) {
				return user.role
			}
		})
		return !!role
	}

	getEvent(key, callback) {
		const eventRef = db.ref(`${this._refString}/${key}`)
		eventRef.on('value', event => {
			callback(event.val())
		})
	}

	/**
	 * Gets all events
	 * @param callback Function to be called with results
	 */
	getEvents(callback: Function) {
		this._ref.on('value', events => {
			callback(events.val())
		})
	}

	/**
	 * Create a new event
	 * @param data Event data object { title, date }
	 * @param callback Callback passed new event data
	 */
	new(data, callback) {
		// Create the default list
		const listKey = db.ref('lists').push({
			title: `${data.title} List`,
			acl: [
				{
					user: auth.currentUser.uid,
					role: ROLES.owner
				}
			]
		}).key

		// Create the event
		const eventKey = this._ref.push(Object.assign(data, {
			lists: [
				{
					key: listKey,
					guestCount: 0
				}
			],
			createdBy: auth.currentUser.uid,
			acl: [
				{
					user: auth.currentUser.uid,
					role: ROLES.owner
				}
			]
		})).key

		callback(eventKey)
	}
}

export interface IEventsStore {
	title: string,
	lists: object[],
	date: string,
	createdBy: string,
	acl: object[]
}