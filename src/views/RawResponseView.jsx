import React from 'react';
import {PureView} from 'flux-rx';
import jsonMarkup from 'json-markup';

class RawResponseView extends PureView {
	render() {
		var body = this.props.result.text;

		try {
			var json = JSON.parse(body);
			body = jsonMarkup(json);
		}
		catch (e) {

		}

		function createMarkup() { return {__html: body}; };

		return (
			<div dangerouslySetInnerHTML={createMarkup()} />
		);
	}
}

export default RawResponseView;
