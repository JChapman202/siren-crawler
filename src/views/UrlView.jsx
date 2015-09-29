import React from 'react';
import {PureView} from 'flux-rx';
import {Input, Button} from 'react-bootstrap';
import sirenService from '../services/sirenService';

class UrlView extends PureView {
	constructor(props) {
		super(props);

		this.state = {
			url: ''
		};
	}

	handleChange() {
		this.setState({url: this.refs.input.getValue()});
	}

	handleClick(e) {
		e.preventDefault();
		sirenService.getSiren(this.state.url);
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
				<Button bsStyle="primary" onClick={this.handleClick.bind(this)}>Submit</Button>
			</div>
		);
	}
}

export default UrlView;
