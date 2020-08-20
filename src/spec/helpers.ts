import firebase from '@firebase/testing'
import fs from 'fs'

const setup = async (auth, data) => {
	const projectId = `rules-spec${Date.now()}`
	const app = await firebase.initializeTestApp({
		projectId,
		auth
	})

	const db = app.database()

	if(data) {
		for(const key in data) {
			const ref = db.ref(key)
			await ref.set(data[key])
		}
	}

	return db
}

export { setup }