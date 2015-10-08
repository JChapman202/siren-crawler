import React from 'react';
import {PureView} from 'flux-rx';
import Immutable from 'immutable';
import Siren from 'super-siren';
import ActionView from './ActionView';

class SirenActionsView extends PureView {
	render() {
		var actions = this.props.actions.map(action => <ActionView siren={this.props.siren} action={action} />);

		return (
			<div className='siren-actions-view'>
				{actions}
			</div>
		);
	}

	static get defaultProps() {
		return {
			siren: Siren.empty,
			actions: new Immutable.List()
		};
	}
}

export default SirenActionsView
