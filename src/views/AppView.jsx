import React from 'react';
import {PureView} from 'flux-rx';
import UrlView from './UrlView';
import RequestView from './RequestView';

class AppView extends PureView {
	render() {
		return (
			<div className="header">
				<h1>Siren Crawler</h1>
				<UrlView />
				<RequestView />
			</div>
		);
	}
}

export default AppView;
