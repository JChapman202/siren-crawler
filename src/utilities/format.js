export function formatArray(iterable) {
	var returnVal = '[]';

	if (!iterable.isEmpty()) {
		returnVal = iterable.reduce((res, cls) => res + cls + ', ', '[');
		returnVal = returnVal.substring(0, returnVal.length - 2) + ']';
	}

	return returnVal;
}
