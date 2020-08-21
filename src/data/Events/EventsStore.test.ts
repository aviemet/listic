import Store from 'lib/Store'
import EventsStore from './EventsStore'
import EventModel from './EventModel'

describe('EventsStore', () => {
	it('Instantiates', () => {
		const store = new EventsStore()

		expect(store).toBeInstanceOf(Store)
	})

	it('Should create a new record when calling new with no args', () => {
		const eventsStore = new EventsStore()
		const event = eventsStore.new()
		expect(event).toBeInstanceOf(EventModel)
		expect(event).toHaveProperty('_key')
	})

	it('Should not create a new recrod when calling new with data args', () => {
		const mockEvent = {
			title: "An Event",
			date: new Date().toISOString()
		}
		const eventsStore = new EventsStore()
		const event = eventsStore.new()
		expect(event).toBeInstanceOf(EventModel)
		expect(event).not.toHaveProperty('_key')
	})
})