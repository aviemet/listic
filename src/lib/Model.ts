import { extendObservable, onBecomeObserved } from "mobx"

class Model {

	constructor(data) {
		extendObservable(this, data)
	}

	set(data) {
		for(const [key, val] of Object.entries(data)) {
			if(this[key]) {
				this[key] = val
			} else {
				const objToExtend = {}
				objToExtend[key] = val
				extendObservable(this, objToExtend)
			}
		}
	}

	save() {
		// Save to database
	}
}

export interface IModel {
	
}

export default Model