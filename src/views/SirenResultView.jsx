import React from 'react';
import {PureView} from 'flux-rx';
import Siren from 'super-siren';
import {Panel} from 'react-bootstrap';
import ActionView from './ActionView';
import SirenLinkView from './SirenLinkView';

class SirenResultView extends PureView {
	render() {
		var siren = this.props.siren;

		//TODO: perhaps tables would make more sense than lis?

		var classItems = siren.classes.map(cls => <li>{cls}</li>);
		var propertyItems = siren.properties.map((val, key) => <li>{key + ": " + val.toString()}</li>).toList();

		//TODO: create a Link view type to render the actual link
		//TODO: show all rels
		var linkItems = siren.links.map(link => <li>{link.rels.first() + ": "}<SirenLinkView siren={siren} href={link.href} /></li>);
		var linkedEntities = siren.linkedEntities.map(link => <li>{link.rels.first() + ": "}<SirenLinkView siren={siren} href={link.href} /></li>);
		var embeddedEntities = siren.embeddedEntities.map(entity => <Panel header={"rel: " + entity.rels.toJS()}><SirenResultView siren={entity.entity} /></Panel>);

		var actionItems = siren.actions.map(action => <ActionView siren={siren} action={action} />);

		return (
			<div className="siren-result-view">
				{
					!classItems.isEmpty() &&
					<Panel header="Classes">
						<ul>
							{classItems}
						</ul>
					</Panel>
				}
				{
					!propertyItems.isEmpty() &&
					<Panel header="Properties">
						<ul>
							{propertyItems}
						</ul>
					</Panel>
				}
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
