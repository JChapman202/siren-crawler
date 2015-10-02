import React from 'react';
import {PureView} from 'flux-rx';
import {Table, Input} from 'react-bootstrap';
import globalHeadersService from '../services/globalHeadersService';
import globalHeadersStore from '../stores/globalHeadersStore';

class GlobalHeadersView extends PureView {
	constructor() {
		this.state = {
			headers: globalHeadersStore.headers
		};
	}

	render() {
		var rows = this.state.headers.map(header => (
			<tr>
				<td><Input value={header.key} onChange={processKeyChange.bind(this, header)} /></td>
				<td><Input value={header.value} onChange={processValueChange.bind(this, header)} /></td>
			</tr>
		));

		return (
			<div className='global-headers-view'>
				<Table striped bordered condensed>
					<thead>
						<tr>
							Name
						</tr>
						<tr>
							Value
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default GlobalHeadersView;
