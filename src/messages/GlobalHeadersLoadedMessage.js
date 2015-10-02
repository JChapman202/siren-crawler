import Immutable from 'immutable';

class GlobalHeadersLoadedMessage extends Immutable.Record({
	headers: new Immutable.List()
}) {
	constructor(headers) {
		super({headers});
	}
}

export default GlobalHeadersLoadedMessage;