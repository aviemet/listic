import React from 'react'
import { useParams } from 'react-router-dom'
import { db } from 'data'

const ShowEvent = () => {
	const params = useParams()
	console.log({ params })

	React.useEffect(() => {
		//@ts-ignore
		db.ref(`/events/${params.id}`).once('value').then(snapshot => {
			console.log({ data: snapshot.val() })
		})
	}, [])

	return (
		<h1>Showing an event</h1>
	)
}

export default ShowEvent
