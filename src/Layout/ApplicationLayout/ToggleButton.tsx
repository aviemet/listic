import React from 'react'

import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { useApp } from 'data'

import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

const ToggleButton = observer(() => {
	const AppStore = useApp()

	return (
		<ButtonContainer disableGutters={ !AppStore.menuOpen }>
			{ AppStore.menuOpen && <CloseButton handleClose={ AppStore.hideMenu } /> }
			{ !AppStore.menuOpen && <OpenButton handleOpen={ AppStore.showMenu } style={ { paddingRight: 18 } } /> }
		</ButtonContainer>
	)
})

const CloseButton = ({ handleClose }) => (
	<IconButton onClick={ () => handleClose() }>
		<ChevronLeftIcon />
	</IconButton>
)

const OpenButton = ({ handleOpen, ...rest }) => (
	<IconButton onClick={ () => handleOpen() } { ...rest }>
		<MenuIcon />
	</IconButton>
)

const ButtonContainer = styled(Toolbar)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`

export { CloseButton, OpenButton }
export default ToggleButton
