import React from 'react';
import {Table} from 'react-bootstrap';
import {PureView} from 'flux-rx';
import Immutable from 'immutable';
import SirenLinkView from './SirenLinkView';
import {formatArray} from '../utilities/format';

class SirenLinksView extends PureView {
	render() {
		var linkItems = this.props.links.map(link =>
			<tr>
				<td>
					{formatArray(link.rels)}
				</td>
				<td>
					{formatArray(link.classes)}
				</td>
				<td>
					<SirenLinkView request={this.props.request} href={link.href} />
				</td>
			</tr>
		);

		return (
			<div className='siren-links-view'>
				<Table striped bordered condensed table-sm>
					<thead>
						<tr>
							<th className='siren-links-view-rels-col'>
								Rels
							</th>
							<th className='siren-links-view-classes-col'>
								Class
							</th>
							<th className='siren-links-view-link-col'>
								Link
							</th>
						</tr>
					</thead>
					{linkItems}
				</Table>
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
