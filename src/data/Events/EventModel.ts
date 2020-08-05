import Model from 'lib/Model'

class EventModel extends Model {

	constructor(data: object) {
		super(data)

	}
	
}

interface IEventData {
	id: string,
	title: string,
	date: Date,
	lists: string[]
}

export default EventModel