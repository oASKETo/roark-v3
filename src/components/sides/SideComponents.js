import Collapsible from "../reusable/Collapsible.js";
import {catchFetchStatusCode, isNullUndef, nullUndefFix, parsePackage, tryFuncOr} from "../reusable/Funcs.js";
import {useMount, useUpdate} from "../reusable/Hooks.js";
import React, {useEffect, useRef, useState} from "react";
import {HelpCircle} from "react-feather";
import "./Side.css";
import InputMask from "react-input-mask";

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

function RadioGroup({value, ctx, margin = "0", children}) {
	const {sideData, update} = ctx;

	const uniqueName = Math.random().toString();

	let selectedRadio = nullUndefFix(parsePackage(value, sideData), null);
	if (!isNaN(+selectedRadio) && selectedRadio !== null) {
		selectedRadio = +selectedRadio;
	}

	const onChange = (newVal) => {
		update(value, newVal);
	};

	let fixedChildren = [];
	if (Array.isArray(children)) {
		fixedChildren = [...children];
	} else if (children) {
		fixedChildren = [children];
	}
	return (
		<div
			style={{marginLeft: margin}}
			className="radio-group"
			onChange={(ev) => {
                // fix nested radios
                ev.stopPropagation();
                console.log("Change", value)
				if (ev.target.getAttribute("type") === "radio") {
					let val = ev.target.value;
					if (!isNaN(+val)) {
						val = +val;
					}
					onChange(val);
				}
			}}
		>
			{fixedChildren.map((el, i, arr) => {
				if (el.type === RadioLabel) {
					const filteredArr = arr.filter((v) => v.type === RadioLabel);
					const value = el.props.value ?? filteredArr.indexOf(el);
					return React.cloneElement(el, {
						name: uniqueName,
						value,
						key: i,
						checked: selectedRadio === value,
					});
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
			<input type="radio" name={name} id={name} value={value} defaultChecked={checked} />
			{tooltip && (
				<div title={tooltip}>
					<HelpCircle className="side-inputfield-tooltip" />
				</div>
			)}
			<div className="side-radiolabel-label">{text}</div>
		</div>
	);
}

/**
 * @param {object} param
 * @param {"text"|"date"} param.type
 */
function InputField({
	type = "text",
	label,
	placeholder,
	validator,
	tooltip,
	value,
	ctx,
	disabled,
	autofill = {value: undefined, path: undefined, shouldUpdate: (oldValue, newValue) => false},
	checkbox = {side: undefined, label: "", value: undefined, onChange: undefined, disabled: false},
	notifyInvalid = {tester: undefined, messageBuilder: (input) => {}},
	_masked = false,
	_maskOptions,
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
		console.log(ev.target.value);
		if (checkValid(trimmed)) {
			update(value, trimmed === "" ? null : ev.target.value);
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
			<div className="side-inputfield-label">{label}</div>
			<div className="side-inputfield-input-container">
				{checkbox.side === "left" && checkboxElement}
				{!_masked ? (
					<input type={type} disabled={disabled} placeholder={placeholder} value={inputFieldValue} onChange={onChange} onKeyDown={onKeyDownInput} />
				) : (
					<InputMask {..._maskOptions} type={type} disabled={disabled} placeholder={placeholder} value={inputFieldValue} onChange={onChange} onKeyDown={onKeyDownInput} />
				)}
				{notifyInvalid.tester && !!inputFieldValue && !notifyInvalid.tester(inputFieldValue) && (
					<div className="side-inputfield-input-container-invalidhint">{notifyInvalid.messageBuilder(inputFieldValue)}</div>
				)}
				{checkbox.side === "right" && checkboxElement}
			</div>
			{tooltip && (
				<div title={tooltip}>
					<HelpCircle className="side-inputfield-tooltip" />
				</div>
			)}
		</div>
	);
}

function MaskedInputField({
	label,
	placeholder,
	validator,
	tooltip,
	value,
	ctx,
	disabled,
	autofill,
	maskOptions = {
		mask: undefined,
		maskPlaceholder: undefined,
		alwaysShowMask: true,
	},
}) {
	return <InputField {...arguments[0]} _masked={true} _maskOptions={maskOptions} />;
}

function PhoneInputField({label, placeholder, validator, tooltip, value, ctx, disabled, autofill}) {
	return <MaskedInputField {...arguments[0]} maskOptions={{mask: "+7 999 999 99 99", maskChar: " "}} />;
}

// setIfEmpty -
function Select({label, placeholder, setIfEmpty, options, value, ctx}) {
	if (placeholder && placeholder[1] === null && setIfEmpty) {
		throw Error("placeholder can't be null of setIfEmpty is true");
	}
	// Option: [<Text>, <Value>]
	const {sideData, update} = ctx;

	const nullId = Math.random().toString();
	const onChange = (ev) => {
		const val = ev.target.value;
		if (val === nullId) {
			update(value, null);
		} else {
			update(value, val);
		}
	};

	const selectValue = parsePackage(value, sideData);
	useMount(() => {
		if (setIfEmpty && selectValue === null) {
			update(value, placeholder ? placeholder[1] : options[0][1]);
		}
	});

	return (
		<div className="side-inputfield-container">
			<div className="side-inputfield-label">{label}</div>
			<div className="side-inputfield-input-container">
				<select className="side-select-selectelement" value={nullUndefFix(selectValue, "")} onChange={onChange}>
					{placeholder && <option value={placeholder[1] === null ? nullId : placeholder[1]}>{placeholder[0]}</option>}
					{options.map(([text, value], i) => {
						return (
							<option key={i} value={value}>
								{text}
							</option>
						);
					})}
				</select>
			</div>
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
		if (!/^[ЁёА-Яа-я- ]*$/g.test(input)) {
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

		resetScroll();
	};
	const stopPreviewSuggestion = (ev) => {
		setOverrideInput("");
		hoverRef.current.classList.remove("side-inputfield-suggestions-item-hover");
		resetScroll();
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

	//
	const [replaceInput, setReplaceInput] = useState("");
	const [scrollSuggestionIndex, setScrollSuggestionIndex] = useState(-1);
	const suggestionsRef = useRef(null);
	const resetScroll = () => {
		if (suggestionsRef.current && suggestionsRef.current.childNodes[scrollSuggestionIndex === -1 ? 0 : scrollSuggestionIndex]) {
			suggestionsRef.current.childNodes[scrollSuggestionIndex === -1 ? 0 : scrollSuggestionIndex].classList.remove("side-inputfield-suggestions-item-hover");
		}
		setReplaceInput("");
		setScrollSuggestionIndex(-1);
	};

	const onInputBlur = (ev) => {
		isBlurredRef.current = true;
		setSuggestions([]);
		resetScroll();
	};
	const onInputFocus = (ev) => {
		isBlurredRef.current = false;
	};

	const scrollSelection = (ev) => {
		const clearHover = () => {
			if (hoverRef.current) {
				hoverRef.current.classList.remove("side-inputfield-suggestions-item-hover");
				hoverRef.current = null;
			}
		};
		const keys = suggestions;
		let newIndex;
		switch (ev.key) {
			case "ArrowUp":
				clearHover();
				newIndex = scrollSuggestionIndex - 1 <= -1 ? keys.length - 1 : scrollSuggestionIndex - 1;
				console.log(newIndex);
				break;
			case "ArrowDown":
				clearHover();
				newIndex = scrollSuggestionIndex + 1 >= keys.length ? 0 : scrollSuggestionIndex + 1;
				break;
			default:
				if (scrollSuggestionIndex !== -1) {
					const inputSplit = splitInput(input);
					inputSplit[fillInStage] = replaceInput;
					// Also append a space
					setInput(inputSplit.filter((v) => v !== "").join(" ") + (fillInStage < 2 ? " " : ""));
					setSuggestions([]);
					// eslint-disable-next-line no-fallthrough
					resetScroll();
				}
				break;
		}
		if (newIndex || newIndex === 0) {
			suggestionsRef.current.childNodes[scrollSuggestionIndex === -1 ? 0 : scrollSuggestionIndex].classList.remove("side-inputfield-suggestions-item-hover");
			suggestionsRef.current.childNodes[newIndex].classList.add("side-inputfield-suggestions-item-hover");
			setReplaceInput(keys[newIndex]);
			setScrollSuggestionIndex(newIndex);
		}
	};
	//

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
					onKeyDown={scrollSelection}
					onChange={(ev) => {
						if (overrideInput !== "") {
							stopPreviewSuggestion();
						} else if (inputValidator(ev.target.value)) {
							setInput(ev.target.value);
						}
					}}
				/>
				<div className="side-inputfield-mask-container">
					<span className="side-inputfield-mask-pre">{input}</span>
					<span className="side-inputfield-mask-post">{overrideInput === "" && suggestions[0]?.replace(splitInput(input)[fillInStage], "")}</span>
				</div>
				<dialog ref={suggestionsRef} className="side-inputfield-suggestions" style={{display: shouldOpenDialog ? undefined : "none"}} open={shouldOpenDialog}>
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

function StatefulToggleButton({label, disabled, initialValue = false, children}) {
	const [toggled, setToggled] = useState(initialValue);
	const toggle = () => {
		setToggled(!toggled);
	};
	return (
		<>
			<button disabled={disabled} className={`side-button button-element small ${toggled && "toggled"}`} onClick={toggle}>
				{label}
			</button>
			{children(toggled)}
		</>
	);
}

// TODO: tooltip
function AddressField({
	label,
	placeholder,
	tooltip,
	value,
	autofill = {
		value: undefined,
		path: undefined,
		shouldUpdate: (oldValue, newValue) => false,
	},
	onApplySuggestion = (suggestion) => {},
	disabled,
	ctx,
}) {
	const {update} = ctx;

	const inputValidator = (input) => {
		let valid = true;
		if (typeof input !== "string") {
			valid = false;
		}
		if (input.startsWith(" ")) {
			valid = false;
		}
		if (!/^[ЁёА-Яа-я- ]*$/g.test(input)) {
			valid = false;
		}
		return valid;
	};

	const input = nullUndefFix(parsePackage(value, ctx.sideData), "");
	const [suggestions, setSuggestions] = useState({});
	const isBlurredRef = useRef(true);

	let canCallApi = useRef(true);
	let delayedApiCall = useRef(null);
	useMount(() => {
		const id = setInterval(() => {
			canCallApi.current = true;
			if (delayedApiCall.current !== null) {
				// console.log("addres update valid delayed execute");
				delayedApiCall.current();
				delayedApiCall.current = null;
			}
		}, 1000);
		return () => clearInterval(id);
	});

	const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
	//TODO: unnecessary update is called when selecting a dropdown option
	useUpdate(() => {
		// Autofill, etc
		// Don't query api
		if (isBlurredRef.current) {
			return;
		}
		const apiCallFn = async () => {
			let {suggestions: newSuggestions} = await (
				await fetch(url, {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: "Token " + process.env.REACT_APP_DADATA,
					},
					body: JSON.stringify({query: input, count: 4}),
				}).then(catchFetchStatusCode)
			).json();
			if (newSuggestions) {
				newSuggestions = Object.fromEntries(newSuggestions.map((obj) => [Math.random().toString(), obj]));
				setSuggestions(newSuggestions);
			}
			canCallApi.current = false;
		};
		if (canCallApi.current && inputValidator(input)) {
			// console.log("addres update valid");
			apiCallFn();
		} else {
			// console.log("addres update valid delayed set");
			delayedApiCall.current = apiCallFn;
		}
		update(value, input);
	}, [input]);

	// Autofill
	useUpdate(() => {
		const {value: af_value, path: af_path, shouldUpdate: af_shouldUpdate} = autofill;
		if (!isNullUndef(af_path)) {
			const packagevVal = parsePackage(af_path, ctx.sideData);
			if (af_shouldUpdate(input, packagevVal)) {
				update(value, af_value);
			}
		} else if (!isNullUndef(af_value)) {
			if (af_shouldUpdate(input, value)) {
				update(value, af_value);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autofill.value, autofill.path, autofill.shouldUpdate]);

	const inputRef = useRef();
	// cring
	const hoverRef = useRef();
	const applySuggestion = (ev) => {
		const suggestion = suggestions[hoverRef.current.dataset.suggestion];
		onApplySuggestion(suggestion);
		// include postcode
		update(value, suggestion.unrestricted_value);
	};

	const [replaceInput, setReplaceInput] = useState("");
	const [scrollSuggestionIndex, setScrollSuggestionIndex] = useState(-1);
	const suggestionsRef = useRef(null);
	const resetScroll = () => {
		if (suggestionsRef.current && suggestionsRef.current.childNodes[scrollSuggestionIndex === -1 ? 0 : scrollSuggestionIndex]) {
			suggestionsRef.current.childNodes[scrollSuggestionIndex === -1 ? 0 : scrollSuggestionIndex].classList.remove("side-inputfield-suggestions-item-hover");
		}
		setReplaceInput("");
		setScrollSuggestionIndex(-1);
	};

	const onInputBlur = (ev) => {
		isBlurredRef.current = true;
		setSuggestions({});
		resetScroll();
	};
	const onInputFocus = (ev) => {
		isBlurredRef.current = false;
	};

	const onMouseEnter = (ev) => {
		hoverRef.current = ev.target;
		hoverRef.current.classList.add("side-inputfield-suggestions-item-hover");
		resetScroll();
	};
	const onMouseLeave = (ev) => {
		hoverRef.current.classList.remove("side-inputfield-suggestions-item-hover");
		hoverRef.current = null;
		resetScroll();
	};

	const scrollSelection = (ev) => {
		const clearHover = () => {
			if (hoverRef.current) {
				hoverRef.current.classList.remove("side-inputfield-suggestions-item-hover");
				hoverRef.current = null;
			}
		};
		const keys = Object.values(suggestions).map((d) => d.value);
		let newIndex;
		switch (ev.key) {
			case "ArrowUp":
				clearHover();
				newIndex = scrollSuggestionIndex - 1 <= -1 ? keys.length - 1 : scrollSuggestionIndex - 1;
				console.log(newIndex);
				break;
			case "ArrowDown":
				clearHover();
				newIndex = scrollSuggestionIndex + 1 >= keys.length ? 0 : scrollSuggestionIndex + 1;
				break;
			default:
				if (scrollSuggestionIndex !== -1) {
					update(value, replaceInput);
					if (ev.key === "Enter") {
						inputRef.current.blur();
					}
					setSuggestions({});
					// eslint-disable-next-line no-fallthrough
					resetScroll();
				}
				break;
		}
		if (newIndex || newIndex === 0) {
			suggestionsRef.current.childNodes[scrollSuggestionIndex === -1 ? 0 : scrollSuggestionIndex].classList.remove("side-inputfield-suggestions-item-hover");
			suggestionsRef.current.childNodes[newIndex].classList.add("side-inputfield-suggestions-item-hover");
			setReplaceInput(keys[newIndex]);
			setScrollSuggestionIndex(newIndex);
		}
	};

	const shouldOpenDialog = !!Object.keys(suggestions).length && document.activeElement === inputRef.current;

	return (
		<div className="side-inputfield-container">
			<div className="side-inputfield-label">{label}</div>
			<div className="side-inputfield-relwrapper">
				<input
					ref={inputRef}
					type="text"
					placeholder={placeholder}
					value={replaceInput || input}
					onBlur={onInputBlur}
					onKeyDown={scrollSelection}
					onFocus={onInputFocus}
					disabled={disabled}
					onChange={(ev) => {
						update(value, ev.target.value);
					}}
				/>
				<dialog ref={suggestionsRef} className="side-inputfield-suggestions" style={{display: shouldOpenDialog ? undefined : "none"}} open={shouldOpenDialog}>
					{Object.entries(suggestions).map(([key, suggestion]) => {
						return (
							<button
								key={key} // has to be 'key'
								onMouseEnter={onMouseEnter}
								onMouseLeave={onMouseLeave}
								data-suggestion={key}
								onMouseDown={applySuggestion}
								className="side-inputfield-suggestions-item"
							>
								{suggestion.value}
							</button>
						);
					})}
				</dialog>
			</div>
		</div>
	);
}

const SideComponents = {
	TypeSelector,
	Label,
	CheckboxLabel,
	RadioGroup,
	RadioLabel,
	StatefulCheckboxLabel,
	InputField,
	MaskedInputField,
	PhoneInputField,
	Select,
	StatefulToggleButton,
	AddressField,
	NameSelector,
};

export default SideComponents;
