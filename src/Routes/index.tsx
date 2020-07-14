import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LoginPage from 'App/Auth/Login'
import RegisterPage from 'App/Auth/Register'

const Routes = () => (
	<Switch>
		<Route exact path="/login" component={ LoginPage } />
		<Route exact path="/register" component={ RegisterPage }/>

		<PrivateRoute path="/">

			<Route path="/">
				<h1>Hello</h1>
			</Route>

			<Route path="sup"><h1>Sup</h1></Route>

		</PrivateRoute>

		<Route path="*"><h1>No Route Match</h1></Route>
		
	</Switch>
)

export default Routes