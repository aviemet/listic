class RootStore {

	constructor() {
		
	}
}

export default RootStore


/*
class Model {
	_ref: firebase.database.Reference
	data = {}

	constructor(data, ref) {
		this._ref = ref
		this.data = data
	}
}

class Event extends Model {

}

class Store {
	_model
	_ref: firebase.database.Reference

	constructor(model, mountPoint: string) {
		this._model = model
		this._ref = db.ref(mountPoint)
	}

	// Creates and returns local object
	new(data: object) {
		return new this._model(data, this._ref)
	}

	fetch(params: string | object) {
		return this._ref.on('value', snapshot => {

		})
	}
}


class EventsStore extends Store {

}

const eventsStore = new EventsStore(Event, 'events')

eventsStore.new({})

eventsStore.fetch("id")
*/