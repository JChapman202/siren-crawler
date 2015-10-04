import React from 'react';
import {PureView} from 'flux-rx';
import {Input, Button} from 'react-bootstrap';
import sirenService from '../services/sirenService';

class UrlView extends PureView {
	constructor(props) {
		super(props);

		this.state = {
			url: props.getHref
		};
	}

	componentWillMount() {
		if (this.state.url && this.state.url.length > 0) {
			sirenService.getSiren(this.state.url);
		}
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			url: newProps.getHref
		});

		if (newProps.getHref && newProps.getHref !== this.state.url) {
			sirenService.getSiren(newProps.getHref);
		}
	}

	handleChange() {
		this.setState({url: this.refs.input.getValue()});
	}

	handleClick(e) {
		e.preventDefault();

		if (this.state.url === this.props.getHref) {
			//if we are already on this URL, clicking submit acts as a refresh
			sirenService.getSiren(this.props.getHref);
		}
		else {
			this.props.history.pushState(null, '/' + encodeURIComponent(this.state.url));
		}
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
