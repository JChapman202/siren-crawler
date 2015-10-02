import {Store} from 'flux-rx';
import dispatcher from '../dispatcher';
import Immutable from 'immutable';
import Header from '../models/Header';
import GlobalHeadersLoadedMessage from '../messages/GlobalHeadersLoadedMessage';

class GlobalHeadersStore extends Store {
	constructor() {
		super(dispatcher, {
			headers: Immutable.List()
		});

		this.registerMessage(GlobalHeadersLoadedMessage, processHeaders.bind(this));
	}

	get headers() {
		return this._state.get('headers');
	}
}

function processHeaders(headersMessage) {
	return {
		headers: headersMessage.map(map => new Header(map.get('key'), map.get('value')))
	};
}

export default new GlobalHeadersStore();