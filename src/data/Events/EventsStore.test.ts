import Store from 'lib/Store'
import EventsStore from './EventsStore'
import EventModel from './EventModel'

beforeEach(() => {
	
})

describe('EventsStore', () => {
	it('Instantiates', () => {
		const store = new EventsStore(EventModel, '/')

		expect(store).toBeInstanceOf(Store)
	})

	
})