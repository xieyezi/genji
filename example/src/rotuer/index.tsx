import React from 'react'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'

import List from '../pages/List'
import Detail from '../pages/Detail'

import './styles.css'

const Router: React.FC = () => {
	return (
		<BrowserRouter>
			<div id="nav">
				<NavLink to="/" exact activeClassName="active">
					List page
				</NavLink>
				<span>|</span>
				<NavLink to="/detail" exact activeClassName="active">
					Detai page
				</NavLink>
			</div>

			<Switch>
				<Route path="/detail">
					<Detail />
				</Route>
				<Route path="/">
					<List />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default Router
