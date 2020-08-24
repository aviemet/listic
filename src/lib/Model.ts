import { extendObservable, observable, onBecomeObserved } from "mobx"
import { db } from 'lib/fire'

/**
 * A model should know:
 * its own data
 * how to save its own data
 * 
 * Will there ever be a situation where a model wouldn't know its key?
 * 
 * Store.create() first generates a key, then creates a model.
 * 
 * There is the possibility of a model not having any data, but never not having a key
 * 
 * Store will have the ref and listeners if fetch from list.
 */

// db.push(data) create node and returns key
// db.set(data) overwrites data including child nodes
// db.update(data) updates only the values provided, can update multiple nodes at once

class Model implements IModel {
	_base_ref!: string
	_ref: firebase.database.Reference
	// Flag to indicate first save should trigger onCreate and afterCreate hooks
	_isNew = false
	
	@observable data: any = {}
	
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
	constructor(base_ref, key, data?) {
		this._base_ref = base_ref
		this._key = key
		this._ref = db.ref(`${this._base_ref}/${this._key}`)

		if(data) {
			this.set(data)
		}
	}

	/**
	 * Sets data of model locally without db sync
	 * @param data Object of data to be saved to the database
	 */
	set(data: object) {
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