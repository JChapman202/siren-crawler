import React from 'react';
import {PureView} from 'flux-rx';
import {Input, Button} from 'react-bootstrap';
import globalHeadersService from '../services/globalHeadersService';

/**
 * View intended to be embedded within a 3 column table layout
 * which has the key in the first column, value in the 2nd and
 * add button in the 3rd.
 */
class GlobalHeadersAddView extends PureView {
	constructor() {
		super();

		this.state = {
			name: '',
			value: ''
		};
	}

	onNameChange(e) {
		this.setState({name: e.target.value});
	}

	onValueChange(e) {
		this.setState({value: e.target.value});
	}

	onSubmit() {
		this.setState({
			name: '',
			value: ''
		});

		globalHeadersService.addHeader(this.state.name, this.state.value);
	}

	render() {
		return (
			<tr>
				<td>
					<Input type='text' onChange={this.onNameChange.bind(this)} value={this.state.name} />
				</td>
				<td>
					<Input type='text' onChange={this.onValueChange.bind(this)} value={this.state.value} />
				</td>
				<td>
					<Button onClick={this.onSubmit.bind(this)} disabled={!this.state.name}>Add</Button>
				</td>
			</tr>
		);
	}
}

export default GlobalHeadersAddView;
