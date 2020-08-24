import Store from 'lib/Store'
import EventModel from 'data/Events/EventModel'
import { db } from 'lib/fire'
import { v4 as uuid } from 'uuid'

describe('EventsStore', () => {
	const key = uuid()

	const mockEvent = {
		title: "Testing Store",
		date: new Date().toISOString()
	}

	it('Instantiates', () => {
		const eventsStore = new Store('events', EventModel)
		expect(eventsStore).toBeInstanceOf(Store)
	})

	describe('create()', () => {

		// EventStore.create()
		it('Should return an empty EventModel when called with no args', () => {
			const eventsStore = new Store('events', EventModel)
			const newEvent = eventsStore.create()

			expect(newEvent).toBeInstanceOf(EventModel)
			expect(eventsStore.data.length).toBe(1)
			expect(eventsStore.data[0]).toEqual(newEvent)
		})

		// EventStore.create(data)
		it('Should create a new record and store data when called with args', () => {
			const eventsStore = new Store('events', EventModel)
			const newEvent = eventsStore.create(mockEvent)

			expect(newEvent).toBeInstanceOf(EventModel)
			expect(newEvent.data).toEqual(mockEvent)
			expect(eventsStore.data.length).toBe(1)
			expect(eventsStore.data[0]).toEqual(newEvent)
		})

	})

	describe('build()', () => {

		it('Should return a model containing a key and data', () => {
			const eventsStore = new Store('events', EventModel)
			const newEvent = eventsStore.build(key, mockEvent)

			expect(newEvent).toBeInstanceOf(EventModel)
			expect(newEvent.data).toEqual(mockEvent)
			expect(newEvent.key).toEqual(key)
			expect(eventsStore.data.length).toBe(1)
			expect(eventsStore.data[0]).toEqual(newEvent)
		})

	})

	describe('fetch()', () => {

		// fetch(key)
		it('Should fetch a single record from the database and return a model', done => {
			const eventsStore = new Store('events', EventModel)

			const eventRef = db.ref('events').push()
			eventRef.set(mockEvent)

			eventsStore.fetch(eventRef.key, model => {
				expect(model.key).toBe(eventRef.key)
				expect(model.data).toStrictEqual(mockEvent)
				done()
			})
		})

	})

})
