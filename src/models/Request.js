import Immutable from 'immutable';
import requestStatus from './requestStatus';

class Request extends Immutable.Record({
	status: requestStatus.loading,
	method: 'GET',
	href: null,
	result: null,
	requestTime: null,
	responseTime: null
}) {
	constructor(status, method, href) {
		super({
			status: status,
			method: method,
			href: href,
			requestTime: new Date()
		});
	}

	get resultCode() {
		return this.result ? this.result.statusCode : null;
	}

	get duration() {
		var returnVal = null;

		if (this.responseTime) {
			returnVal = this.responseTime.getTime() - this.requestTime.getTime();
		}

		return returnVal;
	}

	static fromRequestMessage(requestMessage) {
		return new Request(requestStatus.loading, requestMessage.requestMethod, requestMessage.requestHref);
	}

	processResult(resultMessage) {
		return this.withMutations(map => {
			map.merge({
				status: requestStatus.loaded,
				result: resultMessage.result,
				responseTime: new Date()
			});
		});
	}

	processFailure(failureMessage) {
		return this.withMutations(map => {
			map.merge({
				status: requestStatus.failed,
				result: failureMessage.error.response,
				responseTime: new Date()
			});
		});
	}
}

export default Request;
