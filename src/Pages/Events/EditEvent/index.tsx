import React from 'react'
import { useParams } from 'react-router'
import { useEvents } from 'data'
import Loading from 'Components/LoadingPage'
import { IEventsStore } from 'data/Events/EventsStore'
import EventForm from '../EventForm'

const EditEvent = () => {
	const { id: eventId } = useParams()
	const EventsStore = useEvents()
	const [ loading, setLoading ] = React.useState(true)
	const [ event, setEvent ] = React.useState<Partial<IEventsStore>>({})
	
	React.useEffect(() => {
		EventsStore.getEvent(eventId, event => {
			// if(!EventsStore.isAuthorized(event.acl))

			setEvent(event)
			setLoading(false)
		})
	}, [])

	if(loading) {
		return <Loading />
	}

	return (
		<>
			<EventForm event={ event } />
		</>
	)
}

export default EditEvent
