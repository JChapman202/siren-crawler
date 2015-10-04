import React from 'react';
import {PageHeader} from 'react-bootstrap';
import {PureView} from 'flux-rx';
import UrlView from './UrlView';
import RequestView from './RequestView';
import GlobalHeadersView from './GlobalHeadersView';
import RequestHistoryView from './RequestHistoryView';

class AppView extends PureView {
	render() {
		return (
			<div>
				<PageHeader>Siren Crawler</PageHeader>
				<RequestHistoryView />
				<GlobalHeadersView />
				<UrlView />
				<RequestView />
			</div>
		);
	}
}

export default AppView;
