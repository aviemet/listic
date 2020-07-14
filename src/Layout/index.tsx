import React from 'react'
import styled from 'styled-components'

const Layout = ({ children }) => {
	return (
		<Container>
			{ children }
		</Container>
	)
}

const Container = styled.div`
	background: orange;
`

export default Layout