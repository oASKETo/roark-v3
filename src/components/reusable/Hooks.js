import {useEffect, useRef} from "react";

// tfw no componentDidUpdate
export function useUpdate(fn, inputs) {
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) return fn();
		else didMountRef.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, inputs);
}

export function useMount(fn) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(fn, []);
}

export function useFirstRender() {
	const ref = useRef(true);
	useEffect(() => {
		ref.current = false;
		return () => {
			ref.current = true;
		};
	}, []);
	return ref.current;
}
