import { extendObservable, observable, onBecomeObserved } from 'mobx'
import { db } from 'lib/fire'
import firebase from 'firebase'

class Model implements IModel {
	// Due to an oddity in the member initialization order for classes in javascript, _collectionId must be a method rather than a member variable. This needs to be overridden to return the string value of the collection name when inhertited
	protected get _collectionId() { return '' }

	protected _collection: firebase.firestore.CollectionReference
	protected _doc: firebase.firestore.DocumentReference
	
	@observable data: any = {}
	@observable saving = false
	
	get id(){
		return this._doc ? this._doc.id : null
	}
	
	protected beforeCreate(){}
	protected afterCreate(){}
	protected beforeSave(){}
	protected afterSave(){}

	constructor(data?, isDoc = false) {
		this._collection = db.collection(this._collectionId)
		if(!data) return
		
		if(isDoc) {
			this._doc = this._collection.doc(data)
			this._doc.get().then(snapshot => {
				this.set(snapshot.data())
			})
		} else {
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

	save() {
		this.saving = true
		let promise: Promise<void>
		if(this._doc) {
			promise = this._doc.update(this.data)
		} else {
			this._doc = this._collection.doc()
			promise = this._doc.set(this.data)
		}
		return promise
			.then(() => this.saving = false)
			.catch(error => {
				console.error({ error })
			})
	}
}

export interface IModel {
	set: Function,
	save: Function
}

export default Model