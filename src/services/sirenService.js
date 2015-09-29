import Siren from 'super-siren';
import dispatcher from '../dispatcher';
import RequestMessage from '../messages/RequestMessage';
import RequestLoadedMessage from '../messages/RequestLoadedMessage';
import RequestFailedMessage from '../messages/RequestFailedMessage';

class SirenService {
	getSiren(href) {
		var requestMessage = new RequestMessage('GET', href);
		dispatcher.dispatch(requestMessage);

		Siren.get(href)
			.then(res => {
				dispatcher.dispatch(new RequestLoadedMessage(requestMessage, res));
			})
			.catch(err => {
				dispatcher.dispatch(new RequestFailedMessage(requestMessage, err));
			});
	}
}

export default new SirenService();
