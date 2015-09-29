import Immutable from 'immutable';

class RequestFailedMessage extends Immutable.Record({
	request: null,
	error: null
}) {
	constructor(request, error) {
		super({request, error});
	}
}

export default RequestFailedMessage;
