import Immutable from 'immutable';

var requestId = 0;

class RequestMessage extends Immutable.Record({
	requestId: null,
	requestMethod: 'GET',
	requestHref: null
}) {
	constructor(requestMethod, requestHref) {
		super({requestId: ++requestId, requestMethod, requestHref});
	}
}

export default RequestMessage;
