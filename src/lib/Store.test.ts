import Store from './Store'
import Model from './Model'

describe('Store', () => {
	it('Instantiates', () => {
		const store = new Store()

		expect(store).toBeInstanceOf(Store)
	})
})