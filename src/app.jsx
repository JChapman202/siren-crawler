import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './views/AppView';
import globalHeadersService from './services/globalHeadersService';

//if we have any stored headers, load those by default
globalHeadersService.restoreHeaders();

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/(:getHref)" component={App} />
	</Router>
), document.body);
