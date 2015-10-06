import Uri from 'urijs';

/**
 * Given a Siren model and an href return the absolute
 * path to the provided href.
 *
 * @param  {Request} request The request which caused this link to be loaded
 * @param  {String} href     The href from the provided siren entity
 * @return {String}          Absolute path
 */
export function getUrl(request, href) {
	var url = new Uri(href);

	if (request && request.href) {
		url = url.absoluteTo(request.href);
	}

	return url.toString();
}
