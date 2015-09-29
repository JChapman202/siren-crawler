import {PureView} from 'flux-rx';
import requestStore from '../stores/requestStore';

class SirenResultView extends PureView {
	constructor() {
		super();

		this.state = {
			request = requestStore.currentRequest;
		};
	}
}

export default SirenResultView;
