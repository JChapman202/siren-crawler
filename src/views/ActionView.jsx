import React from 'react';
import {PureView} from 'flux-rx';
import {Panel, Input, ButtonToolbar, Button} from 'react-bootstrap';
import Siren, {Action} from 'super-siren';
import sirenService from '../services/sirenService';
import {formatArray} from '../utilities/format';

class ActionView extends PureView {
	constructor(props) {
		super(props);

		this.state = {
			fields: props.action.fields
		};
	}

	onFieldChange(field, e) {
		var value = e.target.value;

		if (field.type === 'file') {
			value = e.target.files[0];
		}

		var formData = new FormData(this.refs.form);

		this.setState({
			fields: this.state.fields.set(field.name, this.state.fields.get(field.name).set('value', value))
		});
	}

	onSubmit(e) {
		e.preventDefault();

		var data = { };

		this.state.fields.forEach(field => {
			data[field.name] = field.value
		});

		sirenService.submitAction(this.props.request, this.props.action, data);
	}

	render() {
		var action = this.props.action;
		var formItems = this.state.fields.map(field => {
			var value = field.value;

			if (field.value instanceof File) {
				value = field.value.name;
			}

			var input;

			if (field.type === 'file') {
				input = (<Input type={field.type} label={field.title || field.name} onChange={this.onFieldChange.bind(this, field)} />);
			}
			else {
				input = (<Input type={field.type} label={field.title || field.name} onChange={this.onFieldChange.bind(this, field)} value={value} />);
			}

			return input;
		});

		return (
			<div className='action-view'>
				<Panel header={action.name + ' ' + formatArray(action.classes)}>
					<form ref="form" onSubmit={this.onSubmit.bind(this)}>
						{formItems}
						<ButtonToolbar>
							<Button type="reset">Clear</Button>
							<Button type="submit">Submit</Button>
						</ButtonToolbar>
					</form>
				</Panel>
			</div>
		);
	}

	static get defaultProps() {
		return {
			action: Action.empty
		}
	}
}

export default ActionView;
