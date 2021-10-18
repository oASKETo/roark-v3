import React from "react";
import {useHistory} from "react-router";
import "./Button.css";

export default function Button({width, height, text, variant, color, disabledColor, to, disabled, onClick}) {
	const history = useHistory();
	const goTo = () => {
		history.push(to);
	};

	let action;
	if (onClick) {
		action = onClick;
	} else if (to) {
		action = goTo;
	}
	return (
		<div style={{width: width, height: height}} className={`button-element-container ${variant ?? "normal" /* big small */}`}>
			<button disabled={disabled} onClick={action} style={{background: disabled ? disabledColor : color}} className={"button-element" + (disabled ? " disabled" : "")}>
				{text}
			</button>
		</div>
	);
}

export function IconButton({text, width, height, variant, src, reverse}) {
	return (
		<div style={{width: width}} className={`button-element-container ${variant ?? "normal" /* big small */}`}>
			<button className={`button-element icon-button ${reverse ? "reverse" : ""}`}>
				<img src={src} alt={text} className="button-icon" />
				{text}
			</button>
		</div>
	);
}
