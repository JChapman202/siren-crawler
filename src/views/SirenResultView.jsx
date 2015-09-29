import React from 'react';
import {PureView} from 'flux-rx';
import Siren from 'super-siren';
import {Panel} from 'react-bootstrap';

class SirenResultView extends PureView {
	constructor() {
		super();
	}

	render() {
		var siren = this.props.siren;

		//TODO: perhaps tables would make more sense than lis?

		var classItems = siren.classes.map(cls => <li>{cls}</li>);
		var propertyItems = siren.properties.map((val, key) => <li>{key + ": " + val.toString()}</li>).toList();

		//TODO: create a Link view type to render the actual link
		//TODO: show all rels
		var linkItems = siren.links.map(link => <li>{link.rels.first() + ": "}<a href={link.href}>{link.href}</a></li>);
		var linkedEntities = siren.linkedEntities.map(link => <li>{link.rels.first() + ": "}<a href={link.href}>{link.href}</a></li>);

		//TODO: add actions
		//TODO: add embedded entities
		return (
			<div className="siren-result-view">
				<Panel header="Classes">
					<ul>
						{classItems}
					</ul>
				</Panel>
				<Panel header="Properties">
					<ul>
						{propertyItems}
					</ul>
				</Panel>
				<Panel header="Links">
					<ul>
						{linkItems}
					</ul>
				</Panel>
				<Panel header="Linked Entities">
					<ul>
						{linkedEntities}
					</ul>
				</Panel>
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
