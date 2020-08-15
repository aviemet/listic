import React from 'react'
import { useParams } from 'react-router'
import { useApp, useEvents } from 'data'
import Loading from 'Components/LoadingPage'
import { IEventsStore } from 'data/Events/EventsStore'
import ListTabs from './ListsTabs'

const ShowEvent = () => {
	const { id: eventId } = useParams()
	const EventsStore = useEvents()
	const AppStore = useApp()

	const [ loading, setLoading ] = React.useState(true)
	const [ event, setEvent ] = React.useState<Partial<IEventsStore>>({})
	
	React.useEffect(() => {		
		EventsStore.getEvent(eventId, event => {
			setLoading(false)
			setEvent(event)

			if(event) {
				AppStore.title = event.title
			}

		})
		return () => AppStore.resetTitle()
	}, [])

	if(loading) {
		return <Loading />
	}

	if(!event) {
		return <h1>Event Not Found</h1>
	}

	return (
		<ListTabs />
	)
}

export default ShowEvent