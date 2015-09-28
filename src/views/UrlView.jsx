import React from 'react';
import {PureView} from 'flux-rx';
import {Input} from 'react-bootstrap';

class UrlView extends PureView {
	constructor(props) {
		super(props);

		this.state = {
			url: ''
		};
	}

	handleChange() {
		this.setState({url: this.refs.input.value});
	}

	render() {
		return (
			<div>
				<Input
					value={this.state.url}
					type="text"
					label="URL"
					placeholder="enter URL"
					ref="input"
					labelClassName="label"
					onChange={this.handleChange.bind(this)}
				/>
			</div>
		);
	}
}

export default UrlView;
