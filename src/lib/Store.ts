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
class Store implements IStore {
	private _model: typeof Model
	private _base_ref: string

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

	constructor(model, ref) {
		this._model = model
		this._base_ref = ref
	}

	/**
	 * Creates and returns a new data model
	 */
	new() {
		const model = new this._model(db, this._base_ref)
		this._records.set(model.data.key, model)
		return model
	}

	// store.fetch() Fetch all records at ref, return array
	// store.fetch("{id}") Fetch a single record, return it
	// store.fetch({search options}) Perform advanced find, return array
	fetch(params?: string | object | Function, callback?: Function) {
		if(!params || typeof params === "function") {
			//@ts-ignore
			return this._fetchPaginatedRecords(params || callback)
		} else if(typeof params === 'string') {
			return this._findById(params, callback)
		} else {
			// Advanced find not yet implemented
		}
	}

	private _fetchPaginatedRecords(callback?: Function) {
		const ref = db.ref(`${this._base_ref}`).on('value', response => {
			const events = response.val()
			console.log({ events })
			for(const [key, val] of Object.entries(events)) {
				console.log({ [key]: val })
			}
			console.log({ response: response.val() })
		})
	}

	private _findById(id: string, callback?: Function) {
		return db.ref(`${this._base_ref}/${id}`)
	}
}

export interface IStore {
	new: Function,
	fetch: Function,
}

export default Store