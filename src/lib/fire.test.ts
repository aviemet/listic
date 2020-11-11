import { fire, db, auth, ROLES } from './fire'

describe("DB in test environment", () => {
	it("connects", () => {
		const collection = db.collection('test')
		expect(collection).not.toBeNull()
	})
})