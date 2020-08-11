import { extendObservable, observable, onBecomeObserved } from "mobx"

// db.push(data) create node and returns key
// db.set(data) overwrites data including child nodes
// db.update(data) updates only the values provided, can update multiple nodes at once

class Model {
	_db: firebase.database.Database
	data = {}

	protected onCreate(data){}

	constructor(data?: object) {
		if(data) extendObservable(this.data, data)
	}

	/**
	 * Sets data of model locally without db sync
	 * @param data Object of data to be saved to the database
	 */
	set(data) {
		for(const [key, val] of Object.entries(data)) {
			if(this[key]) {
				this[key] = val
			} else {
				const objToExtend = {}
				objToExtend[key] = val
				extendObservable(this.data, objToExtend)
			}
		}
	}

	save(data?: object, errorCallback?: Function): firebase.database.ThenableReference {
		if(data) this.set(data)

		const result = this._db.ref('events').push(this.data, function(error) {
			if(error) {
				errorCallback(error)
			} else {
				console.log({ this: this })
			}
		})

		if(!this.data.hasOwnProperty('key')) {
			this.onCreate(result)
		}

		return result
	}
}

export interface IModel {
	set: Function,
	save: Function
}

export default Model