import React from 'react'
import { useParams } from 'react-router'
import { useApp, useEvents } from 'data'
import Loading from 'Components/LoadingPage'
import ListTabs from '../ListsTabs'
import { Container } from '@material-ui/core'
import styled from 'styled-components'
import Filter from './Filter'
import { IEventData } from 'data/Events/EventModel'
import { observer } from 'mobx-react-lite'

const ShowEvent = observer(() => {
	const { id: eventId } = useParams<{ id: string }>()
	const EventsStore = useEvents()
	const AppStore = useApp()

	const [ loading, setLoading ] = React.useState(true)
	const [ event, setEvent ] = React.useState<Partial<IEventData>>({
		title: undefined
	})
	
	React.useEffect(() => {
		EventsStore.fetch(eventId).then(event => {
			setEvent(event)
			setLoading(false)
		})
	}, [])

	console.log({ event })

	React.useEffect(() => {
		if(event.title) {
			AppStore.title = event.title
		} else {
			AppStore.resetTitle()
		}
	}, [event.title])

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
})

const FullWidth = styled.div`
	width: 100%;
`

export default ShowEvent
