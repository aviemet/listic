import { db, auth, ROLES } from 'data'
import Store from 'lib/Store'
import EventModel from './EventModel'

class EventsStore extends Store {
	_model = EventModel
	_base_ref = 'events'
}

export interface IEventsStore {
	title: string,
	lists: object[],
	date: string,
	createdBy: string,
	acl: object[]
}

export default EventsStore