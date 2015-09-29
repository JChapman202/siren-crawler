import Immutable from 'immutable';

class RequestStatus extends Immutable.Record({
	name: '',
	success: false,
	complete: false
}) {
	constructor(name, success, complete) {
		super({name, success, complete});
	}
}

export default {
	loading: new RequestStatus('Loading', true, false),
	loaded: new RequestStatus('Loaded', true, true),
	failed: new RequestStatus('Failed', false, true)
};
