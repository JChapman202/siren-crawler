import React from 'react';
import {PureView} from 'flux-rx';
import {Panel} from 'react-bootstrap';
import requestStore from '../stores/requestStore';
import SirenResultView from './SirenResultView';
import RawResponseView from './RawResponseView';
import Siren from 'super-siren';

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
			if (request.result && request.result.body instanceof Siren) {
				body = <SirenResultView request={request} siren={request.result.body} />
			}
			else {
				body = <RawResponseView request={request} result={request.result} />;
			}
		}

		return (
			<div className='request-view'>
				<Panel header={request.method + ' ' + request.href + ' - ' + request.resultCode + ' (' + request.duration + ' ms)'}>
					{body}
				</Panel>
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
