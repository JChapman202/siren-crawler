import dispatcher from '../dispatcher';
import Immutable from 'immutable';
import Siren from 'super-siren';
import GlobalHeadersLoadedMessage from '../messages/GlobalHeadersLoadedMessage';

class GlobalHeaderService {
	loadHeaders() {
		dispatchCurrentHeaders();
	}

	/**
	 * Updates the provided global header to use the new key/value
	 * pair.
	 * @param  {Header} header The header instance being updated
	 * @param  {String} key    The new key value
	 * @param  {String} value  The new 'value' value
	 * @return {Void}          undefined
	 */
	updateHeader(header, key, value) {
		dispatchCurrentHeaders();
	}
}

function dispatchCurrentHeaders() {
	var headers = Siren.Client.globalHeaders
		.map((value, key) => new Immutable.Map().set('key', key).set('value', value))
		.toList();

	dispatcher.dispatch(new GlobalHeadersLoadedMessage(headers));
}

export default new GlobalHeaderService();