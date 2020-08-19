import Model from 'lib/Model'
import { db } from 'data'

class EventModel extends Model implements Partial<IEventData> {
	
	onCreate(data) {
		db.ref('lists').push({
			event: data.key
		})
	}

}

interface IEventData extends Model {
	id: string,
	title: string,
	date: Date,
	lists: [{
		guestCount: number,
		key: string
	}],
	acl: [{
		role: "owner" | "admin" | "editor" | "user",
		user: string
	}]
}

export default EventModel