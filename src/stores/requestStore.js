import {Store} from 'flux-rx';
import dispatcher from '../dispatcher';
import Request from '../models/Request';
import RequestMessage from '../messages/RequestMessage';
import RequestLoadedMessage from '../messages/RequestLoadedMessage';
import RequestFailedMessage from '../messages/RequestFailedMessage';

class RequestStore extends Store {
	constructor() {
		super(dispatcher, {
			currentRequest: null
		});

		this.registerMessage(RequestMessage, processRequest.bind(this));
		this.registerMessage(RequestLoadedMessage, processResult.bind(this));
		this.registerMessage(RequestFailedMessage, processFailure.bind(this));
	}

	get currentRequest() {
		return this._state.get('currentRequest');
	}
}

function processRequest(requestMessage) {
	return {
		currentRequest: Request.fromRequestMessage(requestMessage)
	};
}

function processResult(resultMessage) {
	return {
		currentRequest: this._state.get('currentRequest').processResult(resultMessage)
	};
}

function processFailure(failureMessage) {

}

export default new RequestStore();
