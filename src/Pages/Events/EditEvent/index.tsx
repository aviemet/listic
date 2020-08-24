import React from 'react'
import { useParams } from 'react-router'
import { useEvents, useApp } from 'data'
import Loading from 'Components/LoadingPage'
import EventForm from './EventForm'
import Container from '@material-ui/core/Container'
import TitleEditInput from './TitleEditInput'
import ListTabs from '../ListsTabs'
import { IEventData } from 'data/Events/EventModel'

interface IEventsList {
	event: object,
	lists: object[]
}

const EditEvent = () => {
	const { id: eventId } = useParams()
	const AppStore = useApp()
	const EventsStore = useEvents()

	const [ loading, setLoading ] = React.useState(true)
	const [ event, setEvent ] = React.useState<Partial<IEventData>>({})
	
	React.useEffect(() => {
		EventsStore.fetch(eventId, event => {
			setEvent(event)
			setLoading(false)

			console.log({ event })
		})
	}, [])

	if(loading) {
		return <Loading />
	}

	return (
		<ListTabs lists={ event.data.lists || [] } />
	)
}

export default EditEvent
