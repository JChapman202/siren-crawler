import Siren from 'super-siren';
import dispatcher from '../dispatcher';
import RequestMessage from '../messages/RequestMessage';
import RequestLoadedMessage from '../messages/RequestLoadedMessage';
import RequestFailedMessage from '../messages/RequestFailedMessage';
import {getUrl} from '../utilities/links';

class SirenService {
	getSiren(href) {
		var requestMessage = new RequestMessage('GET', href);

		processRequest(requestMessage, Siren.get(href));
	}

	submitAction(originalRequest, action, data) {
		var requestMessage = new RequestMessage(action.method, getUrl(originalRequest, action.href), data);

		//temporary hack until super-siren supports setting href
		var action = action.withMutations(map => map.set('href', requestMessage.requestHref));

		processRequest(requestMessage, action.perform(data));
	}
}

function processRequest(requestMessage, requestPromise) {
	dispatcher.dispatch(requestMessage);

	requestPromise
		.then(res => {
			dispatcher.dispatch(new RequestLoadedMessage(requestMessage, res));
		})
		.catch(err => {
			dispatcher.dispatch(new RequestFailedMessage(requestMessage, err));
		});
}

export default new SirenService();
