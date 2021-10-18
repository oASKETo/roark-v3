
export default function ShowWhen({value, is, isNot, andNotUndefined, andNotNull, useDoubleEquals = false, children}) {
	let shouldShow = true;
	if (is !== undefined) {
		// eslint-disable-next-line eqeqeq
		shouldShow = useDoubleEquals ? value == is : value === is;
	} else if (isNot !== undefined) {
		// eslint-disable-next-line eqeqeq
		shouldShow = useDoubleEquals ? value != is : value !== isNot;
	}

	if (andNotNull) {
		shouldShow = shouldShow && value !== null;
	}
	if (andNotUndefined) {
		shouldShow = shouldShow && value !== undefined;
	}

	if (shouldShow) {
		return children ?? null;
	} else {
		return null;
	}
}
