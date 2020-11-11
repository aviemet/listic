import { db } from 'lib/fire'
import Model from 'lib/Model'
import firebase from 'firebase'

/**
 * Extensible class responsible for maintaining a list of models
 * Methods for fetching one or more records from the database
 * Each record instantiates a Model object which facilitates
 * 	syncronizing local data to the database
 */
class Store {
	// Define these in subclasses
	protected _collectionId: string
	protected _model: typeof Model

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

	constructor(collectionId, model) {
		this._collectionId = collectionId
		this._model = model
	}

	/**
	 * Creates a new database record and returns a Model
	 * @param data Object of data to store
	 */
	async create(data?: object) {
		const model = this._newModel({ data })
		await model.save()
		this._records.set(model.id, model)
		return model
	}

	/**
	 * Builds a new model without saving to database
	 * @param data Object of data to store
	 */
	build(data: object) {
		const model = this._newModel({ data })
		return model
	}

	/**
	 * Fetches a single record from the database and returns a model
	 * @param id Key for data record
	 */
	async fetch(id: string) {
		const model = this._newModel({ id })
		return model
	}

	_newModel({ data, id }: { data?: object, id?: string }) {
		let model
		if(data) {
			model = new this._model(data)
		} else if(id) {
			model = new this._model(id, true)
			this._records.set(id, model)
		} else {
			model = new this._model()
		}
		return model
	}

	private _fetchPaginatedRecords(callback: Function) {
		/*const ref = db.ref(`${this._base_ref}`).on('value', response => {
			this._storeFetchedModels(response)
			const events: [{[key: string]: object}] = response.val()

			if(!events) return

			for(const [key, val] of Object.entries(events)) {
				this._records.set(key, this._newModel(key, val))
			}

			if(callback) callback(this.data)
		})*/
	}

	private _storeFetchedModels(data) {
		
	}
}
/*
export interface IStore {
	create: Function,
	build: Function,
	fetch: Function,
}*/

export default Store
