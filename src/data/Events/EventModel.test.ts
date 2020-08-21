import Store from 'lib/Store'
import EventsStore from './EventsStore'
import EventModel from './EventModel'
import Model from 'lib/Model'
import uuid from 'uuid/v4'

describe('EventModel', () => {

	it('Instantiates', () => {
		const event = new EventModel()

		expect(event).toBeInstanceOf(Model)
		expect(event).toBeInstanceOf(EventModel)
	})

	describe('new', () => {
		it('Should create a new record and store the key when called with no args', () => {
			const event = new EventModel()

			expect(typeof event.key).toBe('string')
			expect(event.key.length).toBeGreaterThan(0)
			expect(event.data).toEqual({})
		})

		it('Should create a new record and store data when called with args', () => {
			const mockEvent = {
				title: "An Event",
				date: new Date().toISOString()
			}
			const event = new EventModel(mockEvent)

			expect(typeof event.key).toBe('string')
			expect(event.key.length).toBeGreaterThan(0)
			expect(event.data).toEqual(mockEvent)
		})
	})
})