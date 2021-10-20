import Collapsible from "../reusable/Collapsible.js";
import {isNullUndef, nullUndefFix, parsePackage, tryFuncOr} from "../reusable/Funcs.js";
import {useUpdate} from "../reusable/Hooks.js";
import React, {useEffect, useRef, useState} from "react";
import {HelpCircle} from "react-feather";
import "./Side.css";

function TypeSelector({sideData, update}) {
	const TypeButton = ({name, label, index, active}) => {
		return (
			<div className="side-typeselector-button-container">
				<button className={"side-typeselector-button" + (active ? " active" : "")} onClick={() => update("type", index)}>
					<img src={`/sides/${name}.png`} alt={label} />
				</button>
				<div className="side-typeselector-label">{label}</div>
			</div>
		);
	};

	const typeArray = [
		["physical", "Физическое лицо"],
		["individual", "Индивидуальный предприниматель"],
		["juridical", "Юридическое лицо"],
	];
    
	return (
		<div className="side-typeselector">
			{typeArray.map(([type, label], i) => (
				<TypeButton name={type} index={i} active={sideData.type === i} key={type} label={label} />
			))}
		</div>
	);
}

function Label({text}) {
	return <div className="side-label">{text}</div>;
}

function CheckboxLabel({text, tooltip, value, ctx}) {
	const {sideData, update} = ctx;

	const onChange = (ev) => {
		update(value, ev.target.checked);
	};

	return (
		<div className="side-checkboxlabel-container">
			<input type="checkbox" checked={nullUndefFix(parsePackage(value, sideData), false)} onChange={onChange} />
			{tooltip && (
				<div title={tooltip}>
					<HelpCircle className="side-inputfield-tooltip" />
				</div>
			)}
			<div className="side-checkboxlabel-label">{text}</div>
		</div>
	);
}

function RadioGroup({value, ctx, children}) {
	const {sideData, update} = ctx;

	const uniqueName = Math.random().toString();

	let selectedRadio = nullUndefFix(parsePackage(value, sideData), null);
	if (!isNaN(+selectedRadio) && selectedRadio !== null) {
		selectedRadio = +selectedRadio;
	}

	const onChange = (newVal) => {
		update(value, newVal);
	};
	return (
		<div
			className="radio-group"
			onChange={(ev) => {
				if (ev.target.getAttribute("type") === "radio") {
					let val = ev.target.value;
					if (!isNaN(+val)) {
						val = +val;
					}
					onChange(val);
				}
			}}
		>
			{children.map((el, i, arr) => {
				if (el.type === RadioLabel) {
					const filteredArr = arr.filter((v) => v.type === RadioLabel);
					const value = el.props.value ?? filteredArr.indexOf(el);
					return React.cloneElement(el, {name: uniqueName, value, key: i, checked: selectedRadio === value});
				} else {
					return el;
				}
			})}
		</div>
	);
}

function RadioLabel({text, tooltip, name, value, checked}) {
	return (
		<div className="side-radiolabel-container">
			<input type="radio" name={name} value={value} defaultChecked={checked} />
			{tooltip && (
				<div title={tooltip}>
					<HelpCircle className="side-inputfield-tooltip" />
				</div>
			)}
			<div className="side-radiolabel-label">{text}</div>
		</div>
	);
}

function InputField({
	type = "text",
	label,
	placeholder,
	validator,
	tooltip,
	value,
	disabled,
	ctx,
	autofill = {value: undefined, path: undefined, shouldUpdate: (oldValue, newValue) => false},
	checkbox = {side: undefined, label: "", value: undefined, onChange: undefined, disabled: false},
}) {
	checkbox.onChange === undefined && (checkbox.onChange = (ev) => ctx.update(checkbox.value, ev.target.checked));
	const {sideData, update} = ctx;

	// input value=
	const inputFieldValue = nullUndefFix(parsePackage(value, sideData), "");

	const checkValid = (value) => {
		if (validator) {
			// regex
			if (typeof validator === "string") {
				console.log("validate regexp", `^(?:${validator})$`);
				return new RegExp(`^(?:${validator})$`, "g").test(value);
			}
			// predicate
			else if (typeof validator === "function") {
				return validator(value);
			}
			// validator present but didn't match
			return false;
		}
		// no validator
		return true;
	};

	const onChange = (ev) => {
		const trimmed = ev.target.value.trim();
		if (checkValid(trimmed)) {
			update(value, trimmed === "" ? null : trimmed);
		}
	};

	const onKeyDownInput = (ev) => {
		const trimmed = ev.target.value.trim();
		if (ev.key === "Backspace" && !checkValid(trimmed)) {
			update(value, "");
		}
	};

	// Autofill functionality
	useUpdate(() => {
		const {value, path, shouldUpdate} = autofill;
		if (!isNullUndef(path)) {
			const packagevVal = parsePackage(path, sideData);
			if (shouldUpdate(inputFieldValue, packagevVal)) {
				onChange({target: {value: value}});
			}
		} else if (!isNullUndef(value)) {
			if (shouldUpdate(inputFieldValue, value)) {
				// fake event
				onChange({target: {value: value}});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autofill.value, autofill.path, autofill.shouldUpdate]);

	// one-time id so label works
	const checkboxId = Math.random();

	const checkboxElement = (
		<div className="side-inputfield-checkbox-container">
			<input
				id={checkboxId}
				type="checkbox"
				className={"side-inputfield-checkbox " + checkbox.side}
				checked={tryFuncOr(() => nullUndefFix(parsePackage(checkbox.value, sideData), false), false)}
				onChange={checkbox.onChange}
				disabled={checkbox.disabled}
			/>
			<label className="side-inputfield-checkbox-label" htmlFor={checkboxId}>
				{checkbox.label}
			</label>
		</div>
	);

	return (
		<div className="side-inputfield-container">
			{checkbox.side === "left" && checkboxElement}
			<div className="side-inputfield-label">{label}</div>
			<div className="side-inputfield-input-container">
				<input type={type} disabled={disabled} placeholder={placeholder} value={inputFieldValue} onChange={onChange} onKeyDown={onKeyDownInput} />
			</div>
			{checkbox.side === "right" && checkboxElement}
			{tooltip && (
				<div title={tooltip}>
					<HelpCircle className="side-inputfield-tooltip" />
				</div>
			)}
		</div>
	);
}

function StatefulCheckboxLabel({text, tooltip, initiallyCollaped = true, duration, children}) {
	const [show, setShow] = useState(!initiallyCollaped);
	const checkboxCtx = {
		sideData: {show},
		update: (k, v) => {
			console.log(k, v);
			setShow(v);
		},
	};
	return (
		<>
			<CheckboxLabel text={text} tooltip={tooltip} value="show" ctx={checkboxCtx} />
			<Collapsible collapsed={!show} duration={duration}>
				{children}
			</Collapsible>
		</>
	);
}

function NameSelector({label, namePath, surnamePath, paternalPath, ctx}) {
	// pads array to three elements
	const splitInput = (input) => {
		const split = input.split(" ");
		return [...split, ...Array(3 - split.length).fill("")];
	};

	const initialInputValue = [
		nullUndefFix(parsePackage(surnamePath, ctx.sideData), ""),
		nullUndefFix(parsePackage(namePath, ctx.sideData), ""),
		nullUndefFix(parsePackage(paternalPath, ctx.sideData), ""),
	]
		.filter((v) => v !== "")
		.join(" ");
	const [input, setInput] = useState(initialInputValue);
	const [overrideInput, setOverrideInput] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const isBlurredRef = useRef(true);

	// Set stage to -1 when input is empty. Triggers useEffect that clears suggestions
	const fillInStage = input.length === 0 ? -1 : input.split(" ").length - 1;
	const getQuery = (input) => {
		const vars = ["last_name", "first_name", "patronym"];
		const inputVals = splitInput(input);
		return `https://ahunter.ru/site/suggest/person?output=json;personlim=4;active=${vars[fillInStage]};last_name=${inputVals[0]};first_name=${inputVals[1]};patronym=${inputVals[2]}`;
	};

	useUpdate(() => {
		(async () => {
			let {suggestions: newSuggestions} = await (await fetch(getQuery(input))).json();
			if (newSuggestions) {
				newSuggestions = newSuggestions.map((obj) => obj.value);
				// Remove if suggestion equals current input
				const inputSplit = splitInput(input);
				newSuggestions = newSuggestions.filter((obj) => obj !== inputSplit[fillInStage]);
				setSuggestions(newSuggestions);
			}
		})();

		const split = splitInput(input).map((v) => (v === "" ? null : v));
		const paths = [surnamePath, namePath, paternalPath];
		split.forEach((part, i) => {
			ctx.update(paths[i], part === "" ? null : part);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [input]);
	useEffect(() => {
		setSuggestions([]);
	}, [fillInStage]);

	const inputValidator = (input) => {
		let valid = true;
		if (typeof input !== "string") {
			valid = false;
		}
		if (input.startsWith(" ")) {
			valid = false;
		}
		if (!/^[А-Яа-я- ]*$/g.test(input)) {
			valid = false;
		}
		if (input.split(" ").length > 3) {
			valid = false;
		}
		return valid;
	};

	const inputRef = useRef();
	// cring
	const hoverRef = useRef();
	const previewSuggestion = (ev) => {
		hoverRef.current = ev.target;

		const suggestion = ev.target.dataset.suggestion;
		const inputSplit = splitInput(input);
		inputSplit[fillInStage] = suggestion;
		setOverrideInput(inputSplit.filter((v) => v !== "").join(" "));
		hoverRef.current.classList.add("side-inputfield-suggestions-item-hover");

		console.log(inputSplit.filter((v) => v !== "").join(" "));
	};
	const stopPreviewSuggestion = (ev) => {
		setOverrideInput("");
		hoverRef.current.classList.remove("side-inputfield-suggestions-item-hover");
		console.log("after stop", overrideInput, input);
	};
	const applySuggestion = (ev) => {
		const suggestion = hoverRef.current.dataset.suggestion;
		const inputSplit = splitInput(input);
		inputSplit[fillInStage] = suggestion;
		setOverrideInput("");
		// Also append a space
		setInput(inputSplit.filter((v) => v !== "").join(" ") + (fillInStage < 2 ? " " : ""));
		// Keep field focused, unless last suggestion
		if (fillInStage === 2) {
			inputRef.current.blur();
		} else {
			ev.preventDefault();
		}
	};

	//* This is WIP ---------------
	const [emulateHoverOn, setEmulateHoverOn] = useState({current: -1, previous: -1});
	const suggestionListRef = useRef();
	const emulateHover = (ev) => {
		// const newObj = {current: emulateHoverOn.current, previous: emulateHoverOn.current};
		// if (ev.key === "ArrowDown") {
		// 	if (newObj.current + 1 < suggestionListRef.current.childNodes.length) {
		// 		newObj.current += 1;
		// 	}
		// } else if (ev.key === "ArrowUp") {
		// 	if (newObj.current - 1 >= 0) {
		// 		newObj.current -= 1;
		// 	}
		// }
		// setEmulateHoverOn(newObj);
	};
	const removeFakeHover = () => {
		// setEmulateHoverOn({current: -1, previous: emulateHoverOn});
	};
	useEffect(() => {
		// if (emulateHoverOn.current === -1) {
		// 	return;
		// }
		// console.log("emulate hover", emulateHoverOn);
		// if (emulateHoverOn.previous !== -1) {
		// 	const leaveEvent = new MouseEvent("mouseleave");
		// 	// suggestionListRef.current.childNodes[emulateHoverOn.previous].dispatchEvent(leaveEvent);
		// }
		// if (emulateHoverOn.current !== -1) {
		// 	const enterEvent = new MouseEvent("mouseenter");
		// 	// suggestionListRef.current.childNodes[emulateHoverOn.current].dispatchEvent(enterEvent);
		// 	console.log("enter dispatched");
		// }
	}, [emulateHoverOn]);
	//* ---------------

	const onInputBlur = (ev) => {
		isBlurredRef.current = true;
		removeFakeHover();
		setSuggestions([]);
	};
	const onInputFocus = (ev) => {
		isBlurredRef.current = false;
	};

	const shouldOpenDialog = !!suggestions.length && document.activeElement === inputRef.current;

	return (
		<div className="side-inputfield-container">
			<div className="side-inputfield-label">{label}</div>
			<div className="side-inputfield-relwrapper">
				<input
					ref={inputRef}
					type="text"
					value={overrideInput === "" ? input : overrideInput}
					onBlur={onInputBlur}
					onFocus={onInputFocus}
					onKeyDown={emulateHover}
					onChange={(ev) => {
						if (overrideInput !== "") {
							stopPreviewSuggestion();
						} else if (inputValidator(ev.target.value)) {
							setInput(ev.target.value.replace("ё", "е"));
						}
					}}
				/>
				<div className="side-inputfield-mask-container">
					<span className="side-inputfield-mask-pre">{input}</span>
					<span className="side-inputfield-mask-post">{overrideInput === "" && suggestions[0]?.replace(splitInput(input)[fillInStage], "")}</span>
				</div>
				<dialog className="side-inputfield-suggestions" ref={suggestionListRef} style={{display: shouldOpenDialog ? undefined : "none"}} open={shouldOpenDialog}>
					{suggestions.map((suggestion) => {
						return (
							<button
								key={suggestion}
								data-suggestion={suggestion}
								onMouseDown={applySuggestion}
								onMouseEnter={previewSuggestion}
								onMouseLeave={stopPreviewSuggestion}
								className="side-inputfield-suggestions-item"
							>
								{suggestion}
							</button>
						);
					})}
				</dialog>
			</div>
		</div>
	);
}

function AddressField({label, placeholder, tooltip, value, ctx}) {
    const {sideData, update} = ctx;

    

}

const SideComponents = {
	TypeSelector,
	Label,
	CheckboxLabel,
	RadioGroup,
	RadioLabel,
	StatefulCheckboxLabel,
	InputField,
	NameSelector,
};

export default SideComponents;
