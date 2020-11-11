import Model from 'lib/Model'
import { db } from 'lib/fire'
import { v4 as uuid } from 'uuid'

describe('Model', () => {
	
	class TestModel extends Model {
		get _collectionId() { return 'test' }
	}
	
	it('Extends', () => {
		const testModel = new TestModel
		expect(testModel).toBeInstanceOf(TestModel)
	})
})
