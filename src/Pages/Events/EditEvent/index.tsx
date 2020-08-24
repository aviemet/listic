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
	const [ lists, setLists ] = React.useState([])
	
	React.useEffect(() => {
		EventsStore.fetch(eventId, response => {
			setEvent(response)
			setLoading(false)

			AppStore.title = <TitleEditInput event={ response } onSubmit={ () => console.log('submit') } />

			console.log({ response })
		})
	}, [])

	if(loading) {
		return <Loading />
	}

	return (
		<ListTabs lists={ lists } />
	)
}

export default EditEvent
