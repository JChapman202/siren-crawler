import Immutable from 'immutable';

class RequestLoadedMessage extends Immutable.Record({
	request: null,
	result: null
}) {
	constructor(request, result) {
		super({request, result});
	}
}

export default RequestLoadedMessage;
