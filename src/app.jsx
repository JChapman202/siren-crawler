import React from 'react';
import {Router, Route, } from 'react-router';
import App from './views/AppView';

React.render((
	<Router>
		<Route path="/" component={App} />
	</Router>
), document.body);
