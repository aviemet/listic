import Model from 'lib/Model'
import { db } from 'data'

class EventModel extends Model {
	
	onCreate(data) {
		db.ref('lists').push({
			event: data.key
		})
	}

}

interface IEventData {
	id: string,
	title: string,
	date: Date,
	lists: string[]
}

export default EventModel