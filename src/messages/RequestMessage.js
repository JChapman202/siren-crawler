import Immutable from 'immutable';

var requestId = 0;

class RequestMessage extends Immutable.Record({
	requestId: null,
	requestMethod: 'GET',
	requestHref: null,
	data: null
}) {
	constructor(requestMethod, requestHref, data) {
		super({requestId: ++requestId, requestMethod, requestHref, data});
	}
}

export default RequestMessage;
