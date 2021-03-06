import React from 'react';
import {PureView} from 'flux-rx';
import {Link} from 'react-router';
import sirenService from '../services/sirenService';
import {getUrl} from '../utilities/links';

class SirenLinkView extends PureView {
	constructor(props) {
		super(props);

		this.state = {
			absoluteHref: getUrl(props.request, props.href)
		};
	}

	render() {
		return (
			<Link to={"/" + encodeURIComponent(this.state.absoluteHref)}>{this.props.href}</Link>
		);
	}

	static get defaultProps() {
		return {
			request: null,
			href: '/'
		};
	}
}

export default SirenLinkView;
