import React from 'react';
import {PureView} from 'flux-rx';
import Immutable from 'immutable';

class SirenPropertiesView extends PureView {
	render() {
		if (!this.props.properties || this.props.properties.isEmpty()) {
			return null;
		}

		var properties = this.props.properties.map((value, key) =>
			<div className='siren-properties-view-property'>
				<div className='siren-properties-view-property-name'>
					{key}:
				</div>
				<div className='siren-properties-view-property-value'>
					{value}
				</div>
			</div>
		);

		return (
			<div className='siren-properties-view'>
				{properties}
			</div>
		);
	}

	static get defaultProps() {
		return {
			properties: new Immutable.Map()
		};
	}
}

export default SirenPropertiesView;
