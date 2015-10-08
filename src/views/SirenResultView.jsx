import React from 'react';
import {PureView} from 'flux-rx';
import Siren from 'super-siren';
import {Panel} from 'react-bootstrap';
import ActionView from './ActionView';
import SirenLinkView from './SirenLinkView';
import SirenPropertiesView from './SirenPropertiesView';

class SirenResultView extends PureView {
	render() {
		var siren = this.props.siren;
		var request = this.props.request;

		//TODO: perhaps tables would make more sense than lis?

		var classItems = '[]';

		if (!siren.classes.isEmpty()) {
			classItems = siren.classes.reduce((res, cls) => res + cls + ', ', '[');
			classItems = classItems.substring(0, classItems.length - 2) + ']';
		}

		var selfLinkItem = null;
		if (siren.selfLink) {
			selfLinkItem = <SirenLinkView request={request} href={siren.selfLink.href} />
		}

		//TODO: create a Link view type to render the actual link
		//TODO: show all rels
		var linkItems = siren.links.filter(link => link !== siren.selfLink).map(link => <li>{link.rels.first() + ": "}<SirenLinkView request={request} href={link.href} /></li>);
		var linkedEntities = siren.linkedEntities.map(link => <li>{link.rels.first() + ": "}<SirenLinkView request={request} href={link.href} /></li>);
		var embeddedEntities = siren.embeddedEntities.map(entity => <Panel header={"rel: " + entity.rels.toJS()}><SirenResultView request={request} siren={entity.entity} /></Panel>);

		var actionItems = siren.actions.map(action => <ActionView siren={siren} action={action} />);

		return (
			<div className="siren-result-view">
				<div>
					<div className='siren-result-view-selfLink'>
						{selfLinkItem}
					</div>
					<div className='siren-result-view-classes'>
						{classItems}
					</div>
				</div>
				<SirenPropertiesView properties={siren.properties} />
				{
					!linkItems.isEmpty() &&
					<Panel header="Links">
						<ul>
							{linkItems}
						</ul>
					</Panel>
				}
				{
					!linkedEntities.isEmpty() &&
					<Panel header="Linked Entities">
						<ul>
							{linkedEntities}
						</ul>
					</Panel>
				}
				{
					!embeddedEntities.isEmpty() &&
					<Panel header="Embedded Entities">
						{embeddedEntities}
					</Panel>
				}
				{
					!actionItems.isEmpty() &&
					<Panel header="Actions">
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
