import { db, auth, ROLES } from 'data'

interface IList {
	acl: object[],
	title: string,
	guests?: object[]
}

interface IEventWithLists {
	acl: object[],
	createdBy: string,
	date: string,
	listsMeta: object[],
	lists: object[]
}

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

	/**
	 * Fetch a single event object, no ansilary data included
	 * @param key id of Event
	 * @param callback receives event object
	 */
	getEvent(key, callback) {
		const eventRef = db.ref(`${this._refString}/${key}`)
		eventRef.on('value', event => {
			callback(event.val())
		})
	}

	/**
	 * Fetch a single event and all associated lists
	 * @param key id of Event
	 * @param callback receives { event, lists } object
	 */
	getEventWithLists(key, callback) {
		const eventObject: { event?: { [key: string]: any }, lists?: object[] } = { event: {}, lists: []}

		const eventRef = db.ref(`${this._refString}/${key}`)

		eventRef.on('value', (event: any) => {
			eventObject.event = event.val()

			if(eventObject.event) {
				eventObject.event.listsMeta.forEach(listIndex => {
					db.ref(`lists/${listIndex.key}`).on('value', list => {
						eventObject.lists.push(list.val())
						if(eventObject.lists.length === eventObject.event.listsMeta.length) {
							callback(eventObject)
						}
					})
				})
			} else {
				callback({ event: false, lists: [] })
			}
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
			listsMeta: [
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