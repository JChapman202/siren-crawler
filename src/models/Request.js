import Immutable from 'immutable';
import requestStatus from './requestStatus';

class Request extends Immutable.Record({
	status: requestStatus.loading,
	method: 'GET',
	href: null,
	result: null
}) {
	constructor(status, method, href) {
		super({status, method, href});
	}

	static fromRequestMessage(requestMessage) {
		return new Request(requestStatus.loading, requestMessage.method, requestMessage.href);
	}

	processResult(resultMessage) {
		return this.withMutations(map => {
			map.set('status', requestStatus.loaded);
			map.set('result', resultMessage.result);
		});
	}

	processFailure(failureMessage) {
		return this.withMutations(map => {
			map.set('status', requestStatus.failed);
		});
	}
}

export default Request;
