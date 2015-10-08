import React from 'react';
import {PureView} from 'flux-rx';
import {Panel, Input, ButtonToolbar, Button} from 'react-bootstrap';
import Siren, {Action} from 'super-siren';
import sirenService from '../services/sirenService';

class ActionView extends PureView {
	constructor(props) {
		super(props);

		this.state = {
			fields: props.action.fields
		};
	}

	onFieldChange(field, e) {
		this.setState({
			fields: this.state.fields.set(field.name, this.state.fields.get(field.name).set('value', e.target.value))
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
		var formItems = this.state.fields.map(field => <Input type={field.type} label={field.title || field.name} onChange={this.onFieldChange.bind(this, field)} value={field.value} />);

		return (
			<div className='action-view'>
				<Panel header={action.name}>
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
