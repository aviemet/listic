import { db } from 'data'
import Model from 'lib/Model'

// db.on('value', ...) Creates a responsive connection to the data
// db.once('value', ...) Fetches the data once without responsiveness

/**
 * Extensible class responsible for maintaining a list of models
 * Methods for fetching one or more records from the database
 * Each record instantiates a Model object which facilitates
 * 	syncronizing local data to the database
 */
class Store {
	private _model: typeof Model
	private _base_ref: string

	protected _instances = new Map<string, Model>()
	get data() {
		return Array.from(this._instances, ([_, model]) => {
			return model
		})
	}

	private _limit = 10
	get limit() { return this._limit }
	set limit(val) { this._limit = val }

	private _offset = 0
	get offset() { return this._offset }
	set offset(val) { this._offset = val }

	constructor(model, ref) {
		this._model = model
		this._base_ref = ref
	}

	// Creates and returns a new data model
	// To be used when creating a new record
	new(data?: object) {
		const model = new this._model(data || {})
		model._db = db
		return model
	}

	// store.fetch() Fetch all records at ref, return array
	// store.fetch("{id}") Fetch a single record, return it
	// store.fetch({search options}) Perform advanced find, return array
	fetch(params?: string | object) {
		let ref

		if(!params) {
			ref = db.ref(`${this._base_ref}`)
		} else if(typeof params === 'string') {
			ref = db.ref(`${this._base_ref}/${params}`)
		} else {
			// perform custom query
		}

		return this._query(ref)
	}

	async _query(ref) {
		return new Promise((resolve, reject) => {
			ref.on('value', response => {
				const data = response.val()
				console.log({ data })
				this._instances.set(data.key, new this._model(data))
				resolve(this.data)
			})
		})
	}

}

export interface IStore {
	new: Function,
	fetch: Function,
}

export default Store