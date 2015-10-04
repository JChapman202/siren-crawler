import React from 'react';
import {PureView} from 'flux-rx';
import {Link} from 'react-router';
import sirenService from '../services/sirenService';
import Siren from 'super-siren';
import Uri from 'urijs';
import {getUrl} from '../utilities/links';

class SirenLinkView extends PureView {
	constructor(props) {
		super(props);

		this.state = {
			href: getUrl(props.siren, props.href)
		};
	}

	handleClick(e) {
		e.preventDefault();
		sirenService.getSiren(this.state.href);
	}

	render() {
		return (
			<Link to={"/" + encodeURIComponent(this.state.href)}>{this.state.href}</Link>
		);
	}

	static get defaultProps() {
		return {
			siren: Siren.empty,
			href: '/'
		};
	}
}

export default SirenLinkView;
