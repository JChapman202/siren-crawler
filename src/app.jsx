import React from 'react';
import {Router, Route, } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './views/AppView';
import globalHeadersService from './services/globalHeadersService';

//if we have any stored headers, load those by default
globalHeadersService.restoreHeaders();

var history = createBrowserHistory()

React.render((
	<Router history={history}>
		<Route path="/(:getHref)" component={App} />
	</Router>
), document.body);
