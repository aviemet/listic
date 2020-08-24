import Model from 'lib/Model'
import { db } from 'lib/fire'

class EventModel extends Model implements Partial<IEventData> {

	beforeCreate(data) {
		db.ref('lists').push({
			event: data.key,
			title: `${data.title} List`
		}).then(response => {
			console.log({ response })
		})
	}

}

export interface IEventData extends Model {
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
