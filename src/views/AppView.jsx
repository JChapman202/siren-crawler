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
			<div className='app-view'>
				<div className='app-view-header'>
					<h1>Siren Crawler</h1>
				</div>
				<div className='app-view-body'>
					<div className='app-view-body-left'>
						<RequestHistoryView history={this.props.history} />
					</div>
					<div className='app-view-body-main'>
						<UrlView history={this.props.history} getHref={this.props.params.getHref} />
						<GlobalHeadersView />
						<RequestView />
					</div>
				</div>
			</div>
		);
	}
}

export default AppView;
