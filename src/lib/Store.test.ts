import Store from './Store'
import Model from './Model'

describe('Store', () => {
	it('Instantiates', () => {
		const store = new Store(Model, '/')

		expect(store).toBeInstanceOf(Store)
	})
})