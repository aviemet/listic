import { db } from 'data'
import Model from 'lib/Model'

class Store {
	private _model: typeof Model
	private _base_ref: string
	instances = new Map()

	constructor(model, ref) {
		this._model = model
		this._base_ref = ref
	}

	// Creates and returns a new data model
	new() {
		return new this._model()
	}

	fetch(params: string | object, callback) {
		if(typeof params === 'string') {
			db.ref(`${this._base_ref}/${params}`).on('value', response => {
				const data = response.val()
				data.id = params
				const dataObject = new this._model(data)
				this.instances.set(params, dataObject)
				callback(this.instances.get(params))
			})
		} else {
			// perform custom query
		}
	}
}

export interface IStore {
	new: Function,
	fetch: Function
}

export default Store