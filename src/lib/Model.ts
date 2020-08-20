import { extendObservable, observable, onBecomeObserved } from "mobx"

// db.push(data) create node and returns key
// db.set(data) overwrites data including child nodes
// db.update(data) updates only the values provided, can update multiple nodes at once

interface IModelData {
	key: string
}

class Model implements IModel {
	_db: firebase.database.Database
	_base_ref: string
	_ref: firebase.database.Reference
	
	@observable data: Partial<IModelData> = {}
	
	protected _key: string
	get key(){
		return this._key
	}
	
	protected beforeSave(data: object){}
	protected afterSave(data: object){}

	/**
	 * Initialize database references and create a new record for this model
	 * Save the database reference and record key on the instance
	 * @param db Database instance
	 * @param base_ref Node base location as string
	 */
	constructor(db, base_ref: string) {
		this._db = db
		this._base_ref = base_ref
		// Create a new record to retrieve a key, store the reference
		this._ref = this._db.ref(`${base_ref}`).push()
		this._key = this._ref.key
	}

	/**
	 * Sets data of model locally without db sync
	 * @param data Object of data to be saved to the database
	 */
	set(data) {
		for(const [key, val] of Object.entries(data)) {
			if(this.data[key]) {
				this.data[key] = val
			} else {
				extendObservable(this.data, { [key]: val })
			}
		}
	}

	save(data?: object, errorCallback?: Function) {
		if(data) this.set(data)

		// Lifecycle before hooks
		this.beforeSave(this.data)

		// Perform save action
		return this._ref.update(this.data, function(error) {
			if(error) {
				errorCallback({ error })
			}
		}).then(() => {
			// Lifecycle after hooks
			this.afterSave(this.data)

			errorCallback(false)
		})
	}
}

export interface IModel {
	set: Function,
	save: Function
}

export default Model