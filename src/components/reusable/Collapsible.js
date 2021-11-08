import React, {useRef} from "react";

export default function Collapsible({collapsed, maxHeightFix = false, shown, duration = "0.15s", children}) {
	const ref = useRef();

	const collapsedInternal = collapsed ?? !shown;

	const heightCalc = collapsedInternal ? "0" : !ref.current || maxHeightFix ? "2000px" : ref.current.scrollHeight + 200;
	return (
		<div
			ref={ref}
			className="collapsible"
			style={{
				//! +200 is cringe
				maxHeight: heightCalc,
				transition: "max-height",
				transitionDuration: duration,
				transitionTimingFunction: collapsedInternal ? "ease-out" : "ease-in",
				willChange: "max-height",
				overflow: "hidden",
			}}
		>
			{children}
		</div>
	);
}
