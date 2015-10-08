import React from 'react';
import {PureView} from 'flux-rx';
import Siren from 'super-siren';
import {Panel} from 'react-bootstrap';
import ActionView from './ActionView';
import SirenEntitiesView from './SirenEntitiesView';
import SirenLinkView from './SirenLinkView';
import SirenPropertiesView from './SirenPropertiesView';
import {formatArray} from '../utilities/format';

class SirenResultView extends PureView {
	render() {
		var siren = this.props.siren;
		var request = this.props.request;

		//TODO: perhaps tables would make more sense than lis?

		var classItems = formatArray(siren.classes);

		var selfLinkItem = null;
		if (siren.selfLink) {
			selfLinkItem = <SirenLinkView request={request} href={siren.selfLink.href} />
		}

		//TODO: create a Link view type to render the actual link
		//TODO: show all rels
		var linkItems = siren.links.filter(link => link !== siren.selfLink).map(link => <li>{formatArray(link.rels) + ": "}<SirenLinkView request={request} href={link.href} /></li>);
		var linkedEntities = siren.linkedEntities.map(link => <li>{formatArray(link.rels) + ": "}<SirenLinkView request={request} href={link.href} /></li>);
		var embeddedEntities = siren.embeddedEntities.map(entity => <Panel header={"rel: " + formatArray(entity.rels)}><SirenResultView request={request} siren={entity.entity} /></Panel>);

		var actionItems = siren.actions.map(action => <ActionView siren={siren} action={action} />);

		return (
			<div className="siren-result-view">
				<div>
					<span className='siren-result-view-classes'>
						{classItems}
					</span>
					<span className='siren-result-view-selfLink'>
						{selfLinkItem}
					</span>
				</div>
				<SirenPropertiesView properties={siren.properties} />
				<SirenEntitiesView request={request} entities={siren.entities} />
				{
					!linkItems.isEmpty() &&
					<Panel header="Links">
						<ul>
							{linkItems}
						</ul>
					</Panel>
				}
				{
					!actionItems.isEmpty() &&
					<Panel className='siren-result-view-actions' header="Actions">
						{actionItems}
					</Panel>
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
