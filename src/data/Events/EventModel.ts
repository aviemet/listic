import Model from 'lib/Model'
import { db, auth } from 'lib/fire'
import { extendObservable } from 'mobx'

class EventModel extends Model implements Partial<IEventData> {

	async beforeCreate() {
		const acl = [{
			user: auth.currentUser.uid,
			role: "owner"
		}]

		const list = await db.ref('lists').push({
			event: this.key,
			title: `${this.data.title} List`,
			acl
		})
		extendObservable(this.data, {
			lists: [{
				guestCount: 0,
				key: list.key
			}],
			acl
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
