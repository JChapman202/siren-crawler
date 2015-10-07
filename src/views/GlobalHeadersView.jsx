import React from 'react';
import {PureView} from 'flux-rx';
import {Table, Button, ButtonToolbar} from 'react-bootstrap';
import globalHeadersService from '../services/globalHeadersService';
import globalHeadersStore from '../stores/globalHeadersStore';
import GlobalHeadersAddView from './GlobalHeadersAddView';

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
				<td><input type='text' className='form-control' value={header.key} onChange={onKeyChange.bind(this, header)} /></td>
				<td><input type='text' className='form-control' value={header.value} onChange={onValueChange.bind(this, header)} /></td>
				<td className='action-col'>
					<ButtonToolbar>
						<Button onClick={onRemove.bind(this, header)}>Remove</Button>
					</ButtonToolbar>
				</td>
			</tr>
		));

		return (
			<div className='global-headers-view'>
				<Table striped bordered condensed table-sm>
					<thead>
						<th className='name-column'>
							Name
						</th>
						<th className='value-column'>
							Value
						</th>
						<th className='add-button-column'>

						</th>
					</thead>
					<tbody>
						{rows}
						<GlobalHeadersAddView />
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

function onRemove(header) {
	globalHeadersService.removeHeader(header);
}

function processHeaders() {
	this.setState({
		headers: globalHeadersStore.headers
	});
}

export default GlobalHeadersView;
