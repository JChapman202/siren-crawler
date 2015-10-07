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

		if (!requestStore.currentRequest || requestStore.currentRequest.href !== newProps.getHref) {
			sirenService.getSiren(newProps.getHref);
		}
	}

	handleChange(e) {
		this.setState({url: e.target.value});
	}

	handleClick(e) {
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
				<input
					className='form-control'
					value={this.state.url}
					type='text'
					placeholder='enter URL'
					onChange={this.handleChange.bind(this)}
				/>
				<ButtonToolbar>
					<Button bsSize='small' bsStyle='primary' onClick={this.handleClick.bind(this)}>Submit</Button>
				</ButtonToolbar>
			</div>
		);
	}
}

export default UrlView;
