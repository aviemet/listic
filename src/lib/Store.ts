import { db } from 'data'
import Model from 'lib/Model'

class Store {
	private _model: typeof Model
	private _base_ref: string
	instances = new Map<string, object>()

	constructor(model, ref) {
		this._model = model
		this._base_ref = ref
	}

	// Creates and returns a new data model
	new(data?: object) {
		const model = new this._model(data || {})
		model._db = db
		return model
	}

	fetch(params: string | object) {
		if(typeof params === 'string') {
			db.ref(`${this._base_ref}/${params}`).on('value', response => {
				const data = response.val()
				console.log({ data })
				const dataObject = new this._model(data)
				this.instances.set(params, dataObject)
				
				return this.instances.get(params)
			})
		} else {
			// perform custom query
		}
	}
}

export interface IStore {
	new: Function,
	fetch: Function,
	instances: Map<string, object>
}

export default Store