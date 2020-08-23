import { db } from 'lib/fire'
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
	// Define these in subclasses
	protected _model: typeof Model
	protected _base_ref: string

	protected _records = new Map<string, Model>()
	get data() {
		return Array.from(this._records, ([_, model]) => {
			return model
		})
	}

	private _limit = 10
	get limit() { return this._limit }
	set limit(val) { this._limit = val }

	private _offset = 0
	get offset() { return this._offset }
	set offset(val) { this._offset = val }

	constructor(base_ref, model) {
		this._base_ref = base_ref
		this._model = model
	}

	newModel(key?: string, data?: object) {
		return new this._model(this._base_ref, key, data)
	}

	/**
	 * Creates a new database record and returns a Model
	 */
	create(data?: object) {
		// Create a new record to retrieve a key, store the reference
		const ref = db.ref(`${this._base_ref}`).push()

		const model = this.newModel(ref.key, data || null)
		this._records.set(model.data.key, model)
		return model
	}

	build(key?: string, data?: object) {
		return this.newModel(key, data)
	}

	// store.fetch() Fetch paginated records at ref
	// store.fetch("{id}") Fetch a single record, return it
	// store.fetch({search options}) Perform advanced find, return array

	fetch(params?: string | object, callback?: Function) {
		if(!params || typeof params === "function") {
			
		} else if(typeof params === 'string') {
			return this._findById(params, callback)
		} else {
			// Advanced find not yet implemented
		}
	}

	private _fetchPaginatedRecords(callback: Function) {
		const ref = db.ref(`${this._base_ref}`).on('value', response => {
			const events: [{[key: string]: object}] = response.val()

			if(!events) return

			for(const [key, val] of Object.entries(events)) {
				this._records.set(key, this.newModel(key, val))
			}

			if(callback) callback(this.data)
		})
	}

	private _findById(id: string, callback: Function) {
		return db.ref(`${this._base_ref}/${id}`).on('value', snapshot => {
			callback(snapshot.val())
		})
	}
}

export interface IStore {
	create: Function,
	fetch: Function,
}

export default Store
