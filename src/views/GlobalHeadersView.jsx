import React from 'react';
import {PureView} from 'flux-rx';
import {Table, Input} from 'react-bootstrap';
import globalHeadersService from '../services/globalHeadersService';
import globalHeadersStore from '../stores/globalHeadersStore';

class GlobalHeadersView extends PureView {
	constructor() {
		super();

		this.state = {
			headers: globalHeadersStore.headers
		};
	}

	initialize(disposableStack) {
		disposableStack.push(globalHeadersStore.eventStream.subscribe(processHeaders.bind(this)));
		globalHeadersService.loadHeaders();
	}

	render() {
		var rows = this.state.headers.map(header => (
			<tr>
				<td><Input type='text' value={header.key} onChange={onKeyChange.bind(this, header)} /></td>
				<td><Input type='text' value={header.value} onChange={onValueChange.bind(this, header)} /></td>
			</tr>
		));

		return (
			<div className='global-headers-view'>
				<Table striped bordered condensed>
					<thead>
						<th>
							Name
						</th>
						<th>
							Value
						</th>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</Table>
			</div>
		);
	}
}

function onKeyChange(header, e) {
	globalHeadersService.updateHeader(header, e.target.value, header.value);
}

function onValueChange(header, e) {
	globalHeadersService.updateHeader(header, header.key, e.target.value);
}

function processHeaders() {
	this.setState({
		headers: globalHeadersStore.headers
	});
}

export default GlobalHeadersView;
