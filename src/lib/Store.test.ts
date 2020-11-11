import Store from 'lib/Store'
import EventModel from 'data/Events/EventModel'
import { db } from 'lib/fire'
import { v4 as uuid } from 'uuid'

describe('EventsStore', () => {
	const key = uuid()
	let eventsStore

	const mockEvent = {
		title: "Testing Store",
		date: new Date().toISOString()
	}

	beforeEach(() => {
		eventsStore = new Store('events', EventModel)
	})

	it('Instantiates', () => {
		expect(eventsStore).toBeInstanceOf(Store)
	})

	describe('create()', () => {
		// EventStore.create()
		it('Should return an empty EventModel when called with no args', done => {
			eventsStore.create().then(event => {
				expect(event).toBeInstanceOf(EventModel)
				expect(eventsStore.data.length).toBe(1)
				expect(event.data).toEqual({})
				expect(eventsStore.data[0]).toEqual(event)
				return done()
			})
		})

		// EventStore.create(data)
		it('Should create a new record and store data when called with args', done => {
			const newEvent = eventsStore.create(mockEvent).then(event => {
				console.log({ event })
				expect(event).toBeInstanceOf(EventModel)
				expect(event.data).toEqual(mockEvent)
				expect(eventsStore.data.length).toBe(1)
				expect(eventsStore.data[0]).toEqual(event)
				return done()
			})
		})
	})

	describe('build()', () => {
		// EventStore.build(data)
		it('Should return a model containing data', () => {
			const newEvent = eventsStore.build(mockEvent)

			expect(newEvent).toBeInstanceOf(EventModel)
			expect(newEvent.data).toEqual(mockEvent)
			expect(eventsStore.data.length).toBe(0)
		})

	})

	describe('fetch()', () => {
		// fetch(id)
		it('Should fetch a single record from the database and return a model', done => {
			return eventsStore.create(mockEvent).then(newEvent => {
				console.log({ newEvent })
				return eventsStore.fetch(newEvent.id).then(fetchedEvent => {
					console.log({ fetchedEvent })
					expect(fetchedEvent).toEqual(newEvent)
					expect(fetchedEvent.data).toEqual(mockEvent)
					done()
				})
			})
		})

	})
/*
	describe('all()', () => {
		it('Should fetch all records', async () => {
			await eventsStore.create(mockEvent)
			const events = await eventsStore.all()
			console.log({ events })
			return expect(events.length).toBeGreaterThan(1)
		})
	})*/
/*
	describe('where()', () => {

	})
*/
})
