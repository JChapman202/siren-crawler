import React from 'react';
import {PureView} from 'flux-rx';
import requestStore from '../stores/requestStore';
import SirenResultView from './SirenResultView';

class RequestView extends PureView {
	constructor() {
		super();
		this.state = {
			request: requestStore.currentRequest
		};
	}

	initialize(disposableStack) {
		disposableStack.push(requestStore.eventStream.subscribe(processStore.bind(this)));
	}

	render() {
		var request = this.state.request;

		if (!request) {
			return null;
		}

		var body = <i className='fa fa-spinner fa-pulse' />

		if (request.status.complete) {
			body = <SirenResultView siren={request.result.body} />
		}

		return (
			<div>
				{body}
			</div>
		);
	}
}

function processStore() {
	this.setState({
		request: requestStore.currentRequest
	});
}

export default RequestView;