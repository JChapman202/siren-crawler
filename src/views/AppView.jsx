import React from 'react';
import {PureView} from 'flux-rx';
import UrlView from './UrlView';

class AppView extends PureView {
	render() {
		return (
			<div className="header">
				<h1>Siren Crawler</h1>
				<UrlView />
			</div>
		);
	}
}

export default AppView;
