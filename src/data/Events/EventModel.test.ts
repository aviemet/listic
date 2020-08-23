import Store from 'lib/Store'
import EventModel from './EventModel'
import Model from 'lib/Model'
import { v4 as uuid } from 'uuid'
import { db } from 'lib/fire'



describe('EventModel', () => {
	const key = uuid()
	const eventsStore = new Store('events', EventModel)

	const mockEvent = {
		title: "An Event",
		date: new Date().toISOString()
	}

	it('Instantiates with correct values', () => {
		const event = eventsStore.create()

		expect(event).toBeInstanceOf(Model)
		expect(event).toBeInstanceOf(EventModel)
		expect(event._base_ref).toEqual('events')
	})

	describe('new', () => {
		it('Should store the key when called with just a key', () => {
			const event = eventsStore.build(key)

			expect(typeof event.key).toBe('string')
			expect(event.key.length).toBeGreaterThan(0)
			expect(event.data).toEqual({})
		})

		it('Should store data when called with key and data', () => {
			const event = eventsStore.build(key, mockEvent)

			expect(typeof event.key).toBe('string')
			expect(event.key.length).toBeGreaterThan(0)
			expect(event.data).toEqual(mockEvent)
		})
	})

	describe('set', () => {
		const event = eventsStore.create()

		it('Should change data on the model', () => {
			event.set(mockEvent)

			expect(event.data).toEqual(mockEvent)
		})

	})

	describe('save', () => {
		const event = eventsStore.create()

		it('Should persiste values to the database', () => {
			event.set(mockEvent)
			event.save()

			db.ref(`events/${key}`).once('value', snapshot => {
				expect(snapshot.val()).toEqual(mockEvent)
			})
		})
	})
})