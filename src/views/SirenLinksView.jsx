import React from 'react';
import {PureView} from 'flux-rx';
import Immutable from 'immutable';
import SirenLinkView from './SirenLinkView';
import {formatArray} from '../utilities/format';

class SirenLinksView extends PureView {
	render() {
		var linkItems = this.props.links.map(link =>
			<div className='siren-links-view-item'>
				<span className='siren-links-view-item-rels'>
					{formatArray(link.rels)}:
				</span>
				<span className='siren-links-view-item-link'>
					<SirenLinkView request={this.props.request} href={link.href} />
				</span>
			</div>
		);

		return (
			<div className='siren-links-view'>
				{linkItems}
			</div>
		)
	}

	static get defaultProps() {
		return {
			links: new Immutable.List()
		};
	}
}

export default SirenLinksView;
