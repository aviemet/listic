import { db, auth, ROLES } from 'data'
import Store from 'lib/Store'

class EventsStore extends Store {
}

export interface IEventsStore {
	title: string,
	lists: object[],
	date: string,
	createdBy: string,
	acl: object[]
}

export default EventsStore