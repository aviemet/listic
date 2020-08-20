import { extendObservable, observable, onBecomeObserved } from "mobx"
import { db } from 'lib/fire'

// db.push(data) create node and returns key
// db.set(data) overwrites data including child nodes
// db.update(data) updates only the values provided, can update multiple nodes at once

interface IModelData {
	key: string
}

class Model implements IModel {
	_base_ref!: string
	_ref: firebase.database.Reference
	// Flag to indicate first save should trigger onCreate and afterCreate hooks
	private _isNew = false
	
	@observable data: Partial<IModelData> = {}
	
	protected _key: string
	get key(){
		return this._key
	}
	
	protected beforeCreate(data: object){}
	protected afterCreate(data: object){}
	protected beforeSave(data: object){}
	protected afterSave(data: object){}

	/**
	 * Initialize database references and create a new record for this model
	 * Save the database reference and record key on the instance
	 * @param db Database instance
	 * @param base_ref Node base location as string
	 */
	constructor(data?: { [key: string]: object }) {
		if(data) {
			const [key, val] = Object.entries(data)[0]
			this._key = key
			this.set(val)
		} else {
			this._isNew = true
			// Create a new record to retrieve a key, store the reference
			this._ref = db.ref(`${this._base_ref}`).push()
			this._key = this._ref.key
		}
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
		if(this._isNew) this.beforeCreate(this.data)
		this.beforeSave(this.data)

		// Perform save action
		console.log({ ref: this._ref })
		return this._ref.update(this.data, function(error) {
			if(error) {
				errorCallback({ error })
			}
		}).then(() => {
			// Lifecycle after hooks
			this.afterSave(this.data)
			if(this._isNew) this.afterCreate(this.data)
			this._isNew = false
			
			errorCallback(false)
		})
	}
}

export interface IModel {
	set: Function,
	save: Function
}

export default Model