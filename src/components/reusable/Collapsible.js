import React, {useRef} from "react";

export default function Collapsible({collapsed, duration = "0.5s", children}) {
	const ref = useRef();
	return (
		<div
			ref={ref}
			className="collapsible"
			style={{
				maxHeight: collapsed ? "0" : !ref.current ? "2000px" : ref.current.scrollHeight,
				transition: "max-height",
				transitionDuration: duration,
				transitionTimingFunction: collapsed ? "ease-out" : "ease-in",
				willChange: "max-height",
				overflow: "hidden",
			}}
		>
			{children}
		</div>
	);
}
