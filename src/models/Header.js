import Immutable from 'immutable';

class Header extends Immutable.Record({
	key: null,
	value: null
}) {
	constructor(key, value) {
		super({key, value});
	}
}

export default Header;