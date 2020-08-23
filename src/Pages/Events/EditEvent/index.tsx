import React from 'react'
import { useParams } from 'react-router'
import { useEvents, useApp } from 'data'
import Loading from 'Components/LoadingPage'
import EventForm from './EventForm'
import Container from '@material-ui/core/Container'
import TitleEditInput from './TitleEditInput'
import ListTabs from '../ListsTabs'

interface IEventsList {
	event: object,
	lists: object[]
}

const EditEvent = () => {
	const { id: eventId } = useParams()
	const AppStore = useApp()
	const EventsStore = useEvents()

	const [ loading, setLoading ] = React.useState(true)
	const eventRef = React.useRef<IEventsList>()
	// const [ event, setEvent ] = React.useState<Partial<IEventsStore>>({})
	
	React.useEffect(() => {
	}, [])

	if(loading) {
		return <Loading />
	}

	return (
		<ListTabs lists={ eventRef.current.lists } />
	)
}

export default EditEvent
