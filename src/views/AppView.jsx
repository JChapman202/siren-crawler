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
				<PageHeader className='app-view-header'>Siren Crawler</PageHeader>
				<div className='app-view-body'>
					<div className='app-view-body-left'>
						<RequestHistoryView />
					</div>
					<div className='app-view-body-main'>
						<GlobalHeadersView />
						<UrlView history={this.props.history} getHref={this.props.params.getHref} />
						<RequestView />
					</div>
				</div>
			</div>
		);
	}
}

export default AppView;
