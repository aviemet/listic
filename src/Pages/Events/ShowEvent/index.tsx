import React from 'react'
import { useParams } from 'react-router'
import { useApp, useEvents } from 'data'
import Loading from 'Components/LoadingPage'
import { IEventsStore } from 'data/Events/EventsStore'
import ListTabs from '../ListsTabs'
import { Container } from '@material-ui/core'
import styled from 'styled-components'
import Filter from './Filter'

const ShowEvent = () => {
	const { id: eventId } = useParams()
	const EventsStore = useEvents()
	const AppStore = useApp()

	const [ loading, setLoading ] = React.useState(true)
	const [ event, setEvent ] = React.useState<Partial<IEventsStore>>({})
	
	React.useEffect(() => {
		const event = EventsStore.fetch(eventId)
		console.log({ event })
	}, [])

	if(!event) {
		return <h1>Event Not Found</h1>
	}

	return (
		<FullWidth>
			<Container>
				<Filter />
			</Container>

			{ loading ? <Loading /> : <ListTabs lists={ [] } /> }

		</FullWidth>
	)
}

const FullWidth = styled.div`
	width: 100%;
`

export default ShowEvent
