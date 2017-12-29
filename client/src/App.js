import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageHome from './components/PageHome/PageHome';
import PageUser from './components/PageUser/PageUser';
import NotFound from './components/NotFound/NotFound';


class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={PageHome} />
					<Route exact path="/user/:id" component={PageUser} />
					<Route exact path='*' component={NotFound} />
				</Switch>
			</Router>
		);
	}
}

export default App;
