import React from 'react';
import {PureView} from 'flux-rx';
import Immutable from 'immutable';
import jsonMarkup from 'json-markup';

class SirenPropertiesView extends PureView {
	render() {
		if (!this.props.properties || this.props.properties.isEmpty()) {
			return null;
		}

		var properties = this.props.properties.map((value, key) => {
			var body = value;
			try {
				body = jsonMarkup(value);
			}
			catch (e) {
				body = value;
			}

			var valueHtml = { __html: body };

			return (
				<div className='siren-properties-view-property'>
					<div className='siren-properties-view-property-name'>
						{key}:
					</div>
					<div dangerouslySetInnerHTML={valueHtml} className='siren-properties-view-property-value' />
				</div>
			);
		});

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
