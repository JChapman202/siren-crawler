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
		this.setState({url: this.refs.input.value});
	}

	handleclick(e) {
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
				<Button
					onClick={this.handleClick.bind(this)}
				/>
			</div>
		);
	}
}

export default UrlView;
