import Store from 'lib/Store'
import EventsStore from './EventsStore'
import EventModel from './EventModel'
import uuid from 'uuid/v4'

describe('EventsStore', () => {
	const eventsStore = new EventsStore()

	it('Instantiates', () => {
		expect(eventsStore).toBeInstanceOf(Store)
	})

	describe('EventsStore.create(data?)', () => {

		// EventStore.create()
		it('Should return an empty EventModel when called with no args', () => {
			const newEvent = eventsStore.create()

			expect(newEvent).toBeInstanceOf(EventModel)
			expect(eventsStore.data.length).toBe(1)
			expect(eventsStore.data[0]).toEqual(newEvent)
		})

		// EventStore.create(data)
		it('Should create a new record and store data when called with args', () => {
			const mockEvent = {
				title: "An Event",
				date: new Date().toISOString()
			}
			const newEvent = eventsStore.create(mockEvent)

			expect(newEvent).toBeInstanceOf(EventModel)
			expect(newEvent.data).toEqual(mockEvent)
			expect(eventsStore.data.length).toBe(1)
			expect(eventsStore.data[0]).toEqual(newEvent)
		})

	})

})
