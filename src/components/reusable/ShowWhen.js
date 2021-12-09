export default function ShowWhen({value, is, isNot, andNotUndefined, andNotNull, useDoubleEquals = false, children, margin}) {
	console.log(margin);
	let shouldShow = true;
	if (is !== undefined) {
		if (Array.isArray(is)) {
			// eslint-disable-next-line eqeqeq
			shouldShow = is.some((v) => (useDoubleEquals ? value == v : value === v));
		} else {
			// eslint-disable-next-line eqeqeq
			shouldShow = useDoubleEquals ? value == is : value === is;
		}
	} else if (isNot !== undefined) {
		if (Array.isArray(isNot)) {
			// eslint-disable-next-line eqeqeq
			shouldShow = isNot.some((v) => (useDoubleEquals ? value != v : value !== v));
		} else {
			// eslint-disable-next-line eqeqeq
			shouldShow = useDoubleEquals ? value != is : value !== isNot;
		}
	}

	if (andNotNull) {
		shouldShow = shouldShow && value !== null;
	}
	if (andNotUndefined) {
		shouldShow = shouldShow && value !== undefined;
	}

	if (shouldShow) {
		if (typeof margin === "string") {
			return <div style={{marginLeft: margin}}>{children}</div>;
		} else if (typeof margin === "boolean") {
			return <div style={{marginLeft: "2em"}}>{children}</div>;
		} else {
			return children ?? null;
		}
	} else {
		return null;
	}
}
