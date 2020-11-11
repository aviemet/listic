import Store from 'lib/Store'
import EventModel from './EventModel'
import { v4 as uuid } from 'uuid'
import { db } from 'lib/fire'

describe('EventModel', () => {
	const key = uuid()
	const eventsStore = new Store('events', EventModel)

	const mockEvent = {
		title: "Testing EventModel",
		date: new Date().toISOString()
	}

	describe('Instantiating new Model', () => {
		it('Returns an empty model with no db connection if passed no params', () => {
			const model = new EventModel()
			expect(model).toBeInstanceOf(EventModel)
		})

		it('Stores data passed to it without creating db ref if passed data', () => {
			const model = new EventModel(mockEvent)
			expect(model).toBeInstanceOf(EventModel)
			expect(model.data).toEqual(mockEvent)
		})
	})

	describe('set', () => {
		const model = new EventModel(mockEvent)

		it('Should change data on the model', () => {
			const differentTitle = "A different title"
			model.set({ title: differentTitle })
			expect(model.data.title).toEqual(differentTitle)
		})
	})

	describe('save', () => {
		const model = new EventModel(mockEvent)

		it('Should persist values to the database', done => {
			model.save().then(() => {
				expect(2).toEqual(2)
				db.collection('events').doc(model.id).get().then(snapshot => {
					expect(snapshot.data()).toEqual(mockEvent)
					done()
				})
			})
		})
	})

})