import React from 'react';
import {PureView} from 'flux-rx';
import {Button, ButtonToolbar} from 'react-bootstrap';
import sirenService from '../services/sirenService';
import requestStore from '../stores/requestStore';

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

		if (!requestStore.currentRequest || requestStore.currentRequest.href !== newProps.getHref || requestStore.currentRequest.method.toLowerCase() !== 'get') {
			sirenService.getSiren(newProps.getHref);
		}
	}

	handleChange(e) {
		this.setState({url: e.target.value});
	}

	handleSubmit(e) {
		e.preventDefault();

		//if we are already on this URL, clicking submit acts as a refresh
		sirenService.getSiren(this.state.url);

		if (this.state.url !== this.props.getHref) {
			this.props.history.pushState(null, '/' + encodeURIComponent(this.state.url));
		}
	}

	render() {
		return (
			<div className='url-view'>
				<form ref='form' onSubmit={this.handleSubmit.bind(this)}>
					<input
						className='form-control'
						value={this.state.url}
						type='text'
						placeholder='enter URL'
						onChange={this.handleChange.bind(this)}
					/>
					<ButtonToolbar>
						<Button type='submit' value='GET' bsSize='small' bsStyle='primary'>Submit</Button>
					</ButtonToolbar>
				</form>
			</div>
		);
	}
}

export default UrlView;
