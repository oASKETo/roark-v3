import React, {useRef} from "react";

export default function Collapsible({collapsed, shown, duration = "0.15s", children}) {
	const ref = useRef();

	const collabsedInternal = collapsed ?? !shown;
	return (
		<div
			ref={ref}
			className="collapsible"
			style={{
                //! +200 is cringe
				maxHeight: collabsedInternal ? "0" : !ref.current ? "2000px" : (ref.current.scrollHeight + 200),
				transition: "max-height",
				transitionDuration: duration,
				transitionTimingFunction: collabsedInternal ? "ease-out" : "ease-in",
				willChange: "max-height",
				overflow: "hidden",
			}}
		>
			{children}
		</div>
	);
}
