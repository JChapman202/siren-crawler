import React from 'react/addons';
import Immutable from 'immutable';
import {Panel} from 'react-bootstrap';
import {PureView} from 'flux-rx';
import requestStore from '../stores/requestStore';

class RequestHistoryView extends PureView {
	constructor() {
		super();

		this.state = {
			requests: requestStore.history
		};
	}

	initialize(disposableStack) {
		disposableStack.push(requestStore.eventStream.subscribe(processRequests.bind(this)));
	}

	render() {
		var items = this.state.requests.map(item =>
			<li className={item.method.toLowerCase()}>
				<span className='request-method'>{item.method}</span>
				<span className='request-href'>{item.href}</span>
			</li>
		);

		return (
			<div className='request-history-view'>
				<Panel className='history-panel' header='History'>
					<ul>
						{items}
					</ul>
				</Panel>
			</div>
		);
	}
}

function processRequests() {
	this.setState({
		requests: requestStore.history
	});
}

export default RequestHistoryView;