import {Store} from 'flux-rx';
import dispatcher from '../dispatcher';
import Immutable from 'immutable';
import Request from '../models/Request';
import RequestMessage from '../messages/RequestMessage';
import RequestLoadedMessage from '../messages/RequestLoadedMessage';
import RequestFailedMessage from '../messages/RequestFailedMessage';

class RequestStore extends Store {
	constructor() {
		super(dispatcher, {
			currentRequest: null,
			history: new Immutable.List()
		});

		this.registerMessage(RequestMessage, processRequest.bind(this));
		this.registerMessage(RequestLoadedMessage, processResult.bind(this));
		this.registerMessage(RequestFailedMessage, processFailure.bind(this));
	}

	get currentRequest() {
		return this._state.get('currentRequest');
	}

	get history() {
		return this._state.get('history');
	}
}

function processRequest(requestMessage) {
	var request = Request.fromRequestMessage(requestMessage);

	return {
		currentRequest: request,
		history: this._state.get('history').unshift(request)
	};
}

function processResult(resultMessage) {
	return {
		currentRequest: this._state.get('currentRequest').processResult(resultMessage)
	};
}

function processFailure(failureMessage) {
	return {
		currentRequest: this._state.get('currentRequest').processFailure(failureMessage)
	};
}

export default new RequestStore();
