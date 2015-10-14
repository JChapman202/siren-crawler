import React from 'react';
import {PureView} from 'flux-rx';
import Immutable from 'immutable';
import {Table} from 'react-bootstrap';
import Siren from 'super-siren';
import SirenLink from './SirenLinkView';
import SirenPropertiesView from './SirenPropertiesView';
import {formatArray} from '../utilities/format';

class SirenEntitiesView extends PureView {
	render() {
		var rows = this.props.entities.sortBy(entity => entity.href || entity.entity.selfLink).map(entity => {
			var returnVal = null;

			if (entity instanceof Siren.LinkedSubEntity) {
				returnVal =
					<tr>
						<td>
							{formatArray(entity.rels)}
						</td>
						<td>
							{formatArray(entity.classes)}
						</td>
						<td>
							<SirenLink request={this.props.request} href={entity.href} />
						</td>
						<td>
							&lt;linked entity&gt;
						</td>
					</tr>
			}
			else if (entity instanceof Siren.EmbeddedSubEntity && entity.entity) {
				returnVal =
					<tr>
						<td>
							{formatArray(entity.rels)}
						</td>
						<td>
							{formatArray(entity.entity.classes)}
						</td>
						<td>
							<span className='siren-result-view-selfLink'>
								{!!entity.entity.selfLink && <SirenLink request={this.props.request} href={entity.entity.selfLink.href} />}
							</span>
						</td>
						<td>
							<SirenPropertiesView properties={entity.entity.properties} />
						</td>
					</tr>
			}

			return returnVal;
		});

		return (
			<div className='siren-entities-view'>
				<Table className='siren-entities-view-grid' striped bordered condensed table-sm>
					<thead>
						<th className='rels-column'>
							Rels
						</th>
						<th className='classes-column'>
							Classes
						</th>
						<th className='link-column'>
							Link
						</th>
						<th className='value-column'>
							Entity
						</th>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</Table>
			</div>
		);
	}

	get defaultProps() {
		return {
			entities: new Immutable.List()
		};
	}
}

export default SirenEntitiesView;
