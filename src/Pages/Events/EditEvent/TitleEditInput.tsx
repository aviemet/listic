import React from 'react'

import Input from '@material-ui/core/Input'
import { observer } from 'mobx-react-lite'
import { useApp } from 'data'
import AppBarTitle from 'Components/AppBarTitle'

interface TitleEditInputProps {
	event: { [key: string]: any },
	onSubmit: Function
}

const TitleEditInput = observer(({ event, onSubmit }: TitleEditInputProps) => {
	const AppStore = useApp()

	if(!event.title) {
		return <AppBarTitle text={ AppStore.defaultTitle } />
	}
	return (
		<Input value="Event Title" onSubmit={ () => onSubmit() } />
	)
})

export default TitleEditInput
