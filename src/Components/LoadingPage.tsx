import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'

const LoadingPage = () => (
	<FullPageContainer>
		<CircularProgress />
	</FullPageContainer>
)

const FullPageContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
  justify-content: center;
  align-items: center;
`

export default LoadingPage