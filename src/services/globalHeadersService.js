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
		//TODO: ideally this update would not be so disruptive
		Siren.Client.removeHeader(header.key);
		Siren.Client.addHeader(key, value);

		saveHeaders();
		dispatchCurrentHeaders();
	}

	removeHeader(header) {
		Siren.Client.removeHeader(header.key);
		saveHeaders();
		dispatchCurrentHeaders();
	}

	addHeader(key, value) {
		Siren.Client.addHeader(key, value);
		saveHeaders();
		dispatchCurrentHeaders();
	}

	/**
	 * Restores the list of headers from localStorage.
	 * Note that this only works if localStorage is available.
	 * @returns {Void}	undefined
	 */
	restoreHeaders() {
		if (localStorage) {
			var headersJson = localStorage.getItem(storageKeys.headers());

			if (headersJson) {
				var headers = JSON.parse(headersJson);

				//Clear all existing headers
				Siren.Client.globalHeaders.forEach((value, key) => {
					Siren.Client.removeHeader(key);
				});

				//Add stored headers
				for (var key in headers) {
					Siren.Client.addHeader(key, headers[key]);
				}

				dispatchCurrentHeaders();
			}
		}
	}
}

/**
 * Saves the current Siren headers to local storage for later retrieval
 *
 * @returns {Void} undefined
 */
function saveHeaders() {
	if (localStorage) {
		var headers = Siren.Client.globalHeaders.toJS();

		localStorage.setItem(storageKeys.headers(), JSON.stringify(headers));
	}
}

function dispatchCurrentHeaders() {
	var headers = Siren.Client.globalHeaders
		.map((value, key) => new Immutable.Map().set('key', key).set('value', value))
		.toList();

	dispatcher.dispatch(new GlobalHeadersLoadedMessage(headers));
}

var storageKeys = {
	headers: () => {
		return 'headers';
	}
};

export default new GlobalHeaderService();
