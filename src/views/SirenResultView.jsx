import React from 'react';
import {PureView} from 'flux-rx';
import Siren from 'super-siren';
import {Panel} from 'react-bootstrap';
import ActionView from './ActionView';
import SirenActionsView from './SirenActionsView';
import SirenEntitiesView from './SirenEntitiesView';
import SirenLinkView from './SirenLinkView';
import SirenLinksView from './SirenLinksView';
import SirenPropertiesView from './SirenPropertiesView';
import {formatArray} from '../utilities/format';

class SirenResultView extends PureView {
	render() {
		var siren = this.props.siren;
		var request = this.props.request;

		var selfLinkItem = null;
		if (siren.selfLink) {
			selfLinkItem = <SirenLinkView request={request} href={siren.selfLink.href} />
		}

		var links = siren.links.filter(link => link !== siren.selfLink);

		return (
			<div className="siren-result-view">
				<div>
					<span className='siren-result-view-selfLink'>
						{selfLinkItem}
					</span>
				</div>
				{
					!siren.classes.isEmpty() &&
					<div className='section-header'>
						Classes
					</div>
				}
				{
					!siren.classes.isEmpty() && formatArray(siren.classes)
				}
				{
					!siren.properties.isEmpty() &&
					<div className='section-header'>
						Properties
					</div>
				}
				{
					!siren.properties.isEmpty() &&
					<SirenPropertiesView properties={siren.properties} />
				}
				{
					!siren.entities.isEmpty() &&
					<div className='section-header'>
						Entities
					</div>
				}
				{
					!siren.entities.isEmpty() &&
					<SirenEntitiesView request={request} entities={siren.entities} />
				}
				{
					!links.isEmpty() &&
					<div className='section-header'>
						Links
					</div>
				}
				{
					!links.isEmpty() &&
					<SirenLinksView request={request} links={links} />
				}
				{
					!siren.actions.isEmpty() &&
					<div className='section-header'>
						Actions
					</div>
				}
				{
					!siren.actions.isEmpty() &&
					<SirenActionsView siren={siren} request={request} actions={siren.actions} />
				}
			</div>
		)
	}

	static get defaultProps() {
		return {
			siren: Siren.empty
		};
	}
}

export default SirenResultView;
