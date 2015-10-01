import Uri from 'urijs';

/**
 * Given a Siren model and an href return the absolute
 * path to the provided href.
 *
 * @param  {Siren} siren  The siren instance that provided the href
 * @param  {String} href  The href from the provided siren entity
 * @return {String}       Absolute path
 */
export function getUrl(siren, href) {
	var url = new Uri(href);

	if (siren && siren.selfLink) {
		url = url.absoluteTo(siren.selfLink.href);
	}

	return url.toString();
}
