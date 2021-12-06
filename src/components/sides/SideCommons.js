import petrovich from "petrovich";
import {useCallback, useContext, useState} from "react";
import PartiesContext from "../context/PartiesContext.js";
import SydContext from "../context/SydContext.js";
import Collapsible from "../reusable/Collapsible.js";
import {catchFetchStatusCode, checkInn, parsePackage, tryFuncOr, validateEmail} from "../reusable/Funcs.js";

import {useUpdate} from "../reusable/Hooks.js";
import ShowWhen from "../reusable/ShowWhen.js";
import SideComponents from "./SideComponents.js";
import IndividualData from "./sideData/IndividualData.js";
import JuridicalData from "./sideData/JuridicalData.js";
import PhysicalData from "./sideData/PhysicalData.js";
import SydData from "./sideData/SydData.js";

export function useAppContext(ctx, name) {
	const context = useContext(ctx);
	const contextData = context[name];
	const contextUpdate = context.update;

	const update = (key, val) => {
		let split = key.split(".");
		let newKey = split.pop();
		let toChange = contextData;
		split.forEach((pk) => (toChange = toChange[pk]));

		try {
			toChange[newKey] = val;
		} catch (ex) {
			console.log("extension error", toChange);
			throw ex;
		}

		contextUpdate(name, key, contextData);
	};

	return {sideData: contextData, update: update, name};
}
//Не рабочая функция контекства для 7 окон
export function useSydSide(side) {
	const partyContext = useContext(SydContext);
	const sideObject = partyContext.syd[side];
	const updateCtx = partyContext.update;

	const update = (key, val) => {
		let newPartyObj = sideObject;
		// Type changed, reset data and update data class
		if (key === "type" && val !== sideObject.type) {
			newPartyObj = new SydData();
			// type is now set in constructor
			// newPartyObj.type = val;
		} else {
			let split = key.split(".");
			let newKey = split.pop();
			let toChange = newPartyObj;
			split.forEach((pk) => (toChange = toChange[pk]));

			try {
				toChange[newKey] = val;
			} catch (ex) {
				console.log("extension error", toChange);
				throw ex;
			}
		}

		updateCtx("syd", side, newPartyObj);
	};

	return {sideData: sideObject, update: update, side};
}

export function useSideCommons(side) {
	const partyContext = useContext(PartiesContext);
	const sideObject = partyContext.parties[side];
	const updateCtx = partyContext.update;

	const update = (key, val) => {
		let newPartyObj = sideObject;
		// Type changed, reset data and update data class
		if (key === "type" && val !== sideObject.type) {
			switch (val) {
				case 0:
					newPartyObj = new PhysicalData();
					break;
				case 1:
					newPartyObj = new IndividualData();
					break;
				case 2:
					newPartyObj = new JuridicalData();
					break;
				default:
					throw new Error("0 1 2 case only " + val);
			}
			// type is now set in constructor
			// newPartyObj.type = val;
		} else {
			let split = key.split(".");
			let newKey = split.pop();
			let toChange = newPartyObj;
			split.forEach((pk) => (toChange = toChange[pk]));

			try {
				try {
					toChange[newKey] = val;
				} catch (ex) {
					throw new TypeError(ex.toString() + " " + key + " <- " + val);
				}
			} catch (ex) {
				console.log("extension error", toChange);
				throw ex;
			}
		}

		updateCtx("parties", side, newPartyObj);
	};

	return {sideData: sideObject, update: update, side};
}

function NameChangeSection({ctx}) {
	const [checkboxState, setCheckboxState] = useState({
		showFields: tryFuncOr(() => ctx.sideData.changes.name || ctx.sideData.changes.surname || ctx.sideData.changes.paternal, false),
	});

	const stateCtx = {
		sideData: checkboxState,
		update: (key, val) => setCheckboxState({...checkboxState, [key]: val}),
	};

	return (
		<>
			<SideComponents.CheckboxLabel text="В период действия договора займа изменились ФИО займодавца" value="showFields" ctx={stateCtx} />
			<Collapsible collapsed={!checkboxState.showFields} duration="0.1s">
				<SideComponents.InputField label="Новая фамилия" value="changes.surname" ctx={ctx} />
				<SideComponents.InputField label="Новое имя" value="changes.name" ctx={ctx} />
				<SideComponents.InputField label="Новое отчество" value="changes.paternal" ctx={ctx} />
				<SideComponents.InputField type="date" label="Дата изменения ФИО" value="changes.date" ctx={ctx} />
				<SideComponents.Label text="Фамилия, имя либо отчество изменились на основании" />
				<SideComponents.RadioGroup value="changes.changeReason" ctx={ctx}>
					<SideComponents.RadioLabel text="Заключения брака" />
					<Collapsible shown={ctx.sideData.changes.changeReason === 0} duration="0.1s">
						<SideComponents.InputField type="date" label="Дата заключения брака" value="changes.reasonDate" ctx={ctx} />
					</Collapsible>
					<SideComponents.RadioLabel text="Расторжения брака" />
					<Collapsible shown={ctx.sideData.changes.changeReason === 1} duration="0.1s">
						<SideComponents.InputField type="date" label="Дата расторжения брака" value="changes.reasonDate" ctx={ctx} />
					</Collapsible>
					<SideComponents.RadioLabel text="Заявления гражданина об изменении фамилии имени отчества" />
					<Collapsible shown={ctx.sideData.changes.changeReason === 2} duration="0.1s">
						<SideComponents.InputField type="date" label="Дата свидетельства о перемене имени" value="changes.reasonDate" ctx={ctx} />
					</Collapsible>
				</SideComponents.RadioGroup>
			</Collapsible>
		</>
	);
}

function Cases({namePath, surnamePath, paternalPath, changesPath, ctx}) {
	const {sideData} = ctx;
	//? cring?
	const original = {
		first: parsePackage(namePath, sideData),
		middle: parsePackage(paternalPath, sideData),
		last: parsePackage(surnamePath, sideData),
	};

	if (original.first && original.middle && original.last) {
		const changes = {
			first: parsePackage(changesPath + "." + namePath, sideData),
			middle: parsePackage(changesPath + "." + paternalPath, sideData),
			last: parsePackage(changesPath + "." + surnamePath, sideData),
		};

		const gender = petrovich.detect_gender(changes.middle ?? original.middle);
		const formattedName = petrovich(
			{
				gender: gender === "androgynous" ? "male" : gender,
				first: changes.first ?? original.first,
				middle: changes.middle ?? original.middle,
				last: changes.last ?? original.last,
			},
			"genitive"
		);

		return <SideComponents.Label text={`Взыскать в пользу ${formattedName.last} ${formattedName.first} ${formattedName.middle}`} />;
	} else {
		return null;
	}
}

function useINNQuery(inn, depenencies) {
	const [innObject, setInnObject] = useState({});
	useUpdate(() => {
		if (!checkInn(inn)) {
			setInnObject({});
			return;
		}

		const updateInnName = (response) => {
			const first = response.suggestions[0];
			console.log(first.data.address);
			setInnObject({
				address: first.data.address,
				status: first.data.state.status,
				nameOpf: first.data.name.short_with_opf,
				name: first.data.name.full_with_opf,
				kladr: first.data.address.data.kladr_id,
				oktmo: first.data.address.data.oktmo,
				okato: first.data.address.data.okato,
			});
		};
		fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				// TODO: offload to backend
				Authorization: "Token " + process.env.REACT_APP_DADATA,
			},
			body: JSON.stringify({query: inn}),
		})
			.then(catchFetchStatusCode)
			.then((response) => response.json())
			.then(updateInnName);
	}, [inn, ...depenencies]);

	// idk if this is the right way to do it
	// it seems to be right xd
	const shouldAutoupdate = useCallback(() => innObject.status === "ACTIVE", [innObject]);

	return [innObject, shouldAutoupdate];
}

function DefendantAddressDropdown({ctx}) {
	const [innObject, shouldAutoupdate] = useINNQuery(ctx.sideData.address.inn, []);
	const [suggestion, setSuggestion] = useState({});

	const type = ctx.sideData.address.type;
	const label = {
		normal: "Адрес места жительства",
		last: "Последний известный адрес",
		realestate: "Адрес недвижимости",
		juridical: "Адрес",
	}[type];
	return (
		<>
			<SideComponents.Select
				label="Адрес ответчика"
				setIfEmpty
				value="address.type"
				options={[
					["Адрес места регистрации ответчика", "normal"],
					["Последний известный адрес", "last"],
					["Адрес местонахождения недвижимости ответчика", "realestate"],
					["Адрес места регистрации юр. лица ответчика", "juridical"],
					["Место жительства ответчика неизвестно", "unknown"],
				]}
				ctx={ctx}
			/>
			{type === "realestate" && (
				<SideComponents.Select
					label="Тип имущества"
					placeholder={["Выберите", null]}
					value="address.realestate"
					options={[
						["Квартира", "flat"],
						["Земельный участок", "land"],
						["Жилой дом", "house"],
						["Помещение", "room"],
					]}
					ctx={ctx}
				/>
			)}
			{type && !["unknown", "juridical"].includes(type) && (
				<SideComponents.AddressField label={label} value="address.value" onApplySuggestion={(s) => setSuggestion(s.data)} ctx={ctx} />
			)}
			{type === "juridical" && (
				<>
					<SideComponents.InputField label="ИНН" value="address.inn" ctx={ctx} validator="[0-9]*" />
					<ShowWhen value={innObject.status} isNot={"ACTIVE"} andNotNull andNotUndefined>
						<SideComponents.Label text="Внимание: Юридическое лицо не активно" />
					</ShowWhen>
					<SideComponents.InputField
						label="Наименование юридического лица"
						value="name"
						disabled={innObject.status !== "ACTIVE" && typeof innObject.status === "string"}
						autofill={{
							value: innObject.nameOpf ?? innObject.name ?? "",
							shouldUpdate: shouldAutoupdate,
						}}
						ctx={ctx}
					/>
					<SideComponents.AddressField
						label="Адрес"
						value="address.value"
						ctx={ctx}
						disabled
						autofill={{
							value: innObject.address?.unrestricted_value ?? "",
							shouldUpdate: shouldAutoupdate,
						}}
					/>
				</>
			)}
			<SideComponents.InputField
				label="Код КЛАДР"
				value="address.kladr"
				ctx={ctx}
				disabled
				autofill={{
					value: suggestion.kladr_id ?? innObject.kladr ?? "",
					// infinite loop without "neew !== old"
					// TODO: allow editing?
					shouldUpdate: (old, neew) => !!neew && neew !== old,
				}}
			/>
			<SideComponents.InputField
				label="Код OKATO"
				value="address.okato"
				ctx={ctx}
				disabled
				autofill={{
					value: suggestion.okato ?? innObject.okato ?? "",
					shouldUpdate: (old, neew) => !!neew && neew !== old,
				}}
			/>
			<SideComponents.InputField
				label="Код ОКТМО"
				value="address.oktmo"
				ctx={ctx}
				disabled
				autofill={{
					value: suggestion.oktmo ?? innObject.oktmo ?? "",
					shouldUpdate: (old, neew) => !!neew && neew !== old,
				}}
			/>
		</>
	);
}

function SideAddressDropdown({ctx, onApplySuggestion}) {
	if (ctx.side === "zaimodavec") {
		return <SideComponents.AddressField label="Адрес места жительства" value="address.value" ctx={ctx} onApplySuggestion={onApplySuggestion} />;
	} else {
		return <DefendantAddressDropdown ctx={ctx} />;
	}
}

// sets these three variables without inputfields
// might want to refactor later
function addressSetHiddenStuff(suggestion, ctx) {
	const data = suggestion.data;
	console.log("set vals", "okato", data.okato, "oktmo", data.oktmo);
	ctx.update("address.kladr", data.kladr_id);
	ctx.update("address.okato", data.okato);
	ctx.update("address.oktmo", data.oktmo);
}

export function PhysicalFields({ctx}) {
	return (
		<>
			<SideComponents.Label text="Данные физического лица" />
			<SideComponents.NameSelector label="ФИО" namePath="name" surnamePath="surname" paternalPath="paternal" ctx={ctx} />
			{/* TODO: Адрес по ИНН когда выбран последний пункт */}
			<Cases namePath="name" surnamePath="surname" paternalPath="paternal" changesPath="changes" ctx={ctx} />
			<SideAddressDropdown ctx={ctx} onApplySuggestion={(suggestion) => addressSetHiddenStuff(suggestion, ctx)} />
			<SideComponents.PhoneInputField label="Телефон" value="phone" ctx={ctx} />
			{ctx.side === "zaimodavec" && (
				<SideComponents.InputField
					label="E-Mail"
					value="email"
					notifyInvalid={{
						tester: validateEmail,
						messageBuilder: (input) => "Некорректный адрес: " + input,
					}}
					ctx={ctx}
				/>
			)}
			<NameChangeSection ctx={ctx} />
		</>
	);
}

export function IndividualFields({ctx}) {
	return (
		<>
			<SideComponents.Label text="Данные индивидуального предпринимателя" />
			<SideComponents.NameSelector label="ФИО" namePath="name" surnamePath="surname" paternalPath="paternal" ctx={ctx} />
			<Cases namePath="name" surnamePath="surname" paternalPath="paternal" changesPath="changes" ctx={ctx} />

			<SideAddressDropdown ctx={ctx} onApplySuggestion={(suggestion) => addressSetHiddenStuff(suggestion, ctx)} />
			<SideComponents.InputField label="ОГРНИП" value="ogrnip" validator={(str) => str.length <= 15 && (/^[0-9]*$/g).test(str)} ctx={ctx} />
			{ctx.side === "zaimodavec" && <SideComponents.PhoneInputField label="Телефон" value="phone" ctx={ctx} />}
			{ctx.side === "zaimodavec" && (
				<SideComponents.InputField
					label="E-Mail"
					value="email"
					notifyInvalid={{
						tester: validateEmail,
						messageBuilder: (input) => "Некорректный адрес: " + input,
					}}
					ctx={ctx}
				/>
			)}
			<NameChangeSection ctx={ctx} />
			<SideComponents.StatefulCheckboxLabel text="В период действия договора займа ИП было ликвидировано" initiallyCollaped={!ctx.sideData.liquidationDate}>
				<SideComponents.InputField type="date" label="Дата ликвидации ИП" value="liquidationDate" ctx={ctx} />
			</SideComponents.StatefulCheckboxLabel>
		</>
	);
}

export function JuridicalFields({ctx}) {
	// INN query
	const [innObject, shouldAutoupdate] = useINNQuery(ctx.sideData.inn, [ctx.sideData.autofillAddress]);
	return (
		<>
			<SideComponents.Label text="Данные юридического лица" />
			<SideComponents.InputField label="ИНН" value="inn" ctx={ctx} validator="[0-9]*" />
			<ShowWhen value={innObject.status} isNot={"ACTIVE"} andNotNull andNotUndefined>
				<SideComponents.Label text="Внимание: Юридическое лицо не активно" />
			</ShowWhen>
			<SideComponents.InputField
				label="Наименование юридического лица"
				value="name"
				disabled={innObject.status !== "ACTIVE" && typeof innObject.status === "string"}
				autofill={{
					value: innObject.nameOpf ?? innObject.name ?? "",
					shouldUpdate: shouldAutoupdate,
				}}
				ctx={ctx}
			/>
			<SideComponents.AddressField
				label="Адрес"
				value="address.value"
				ctx={ctx}
				onApplySuggestion={(suggestion) => addressSetHiddenStuff(suggestion, ctx)}
				autofill={{
					value: innObject.address?.unrestricted_value ?? "",
					shouldUpdate: shouldAutoupdate,
				}}
			/>
			<SideComponents.InputField
				label="Код КЛАДР"
				value="address.kladr"
				ctx={ctx}
				autofill={{
					value: innObject.kladr ?? "",
					shouldUpdate: shouldAutoupdate,
				}}
			/>
			<SideComponents.InputField
				label="Код ОКТМО"
				value="address.oktmo"
				ctx={ctx}
				autofill={{
					value: innObject.oktmo ?? "",
					shouldUpdate: shouldAutoupdate,
				}}
			/>
			<SideComponents.InputField
				label="Код ОКАТО"
				value="address.okato"
				ctx={ctx}
				autofill={{
					value: innObject.okato ?? "",
					shouldUpdate: shouldAutoupdate,
				}}
			/>
			{ctx.side === "zaimodavec" && <SideComponents.PhoneInputField label="Телефон" value="phone" ctx={ctx} />}
			{ctx.side === "zaimodavec" && (
				<SideComponents.InputField
					label="E-Mail"
					value="email"
					notifyInvalid={{
						tester: validateEmail,
						messageBuilder: (input) => "Некорректный адрес: " + input,
					}}
					ctx={ctx}
				/>
			)}
			<SideComponents.StatefulCheckboxLabel text="Договор займа заключён с филиалом или представительством" initiallyCollaped={!ctx.sideData.filial?.name}>
				<SideComponents.InputField
					label="Наименование филиала или представительства"
					tooltip="Выберите этот пункт, только если стороной по договору является филиал, либо представительство"
					value="filial.name"
					ctx={ctx}
				/>
			</SideComponents.StatefulCheckboxLabel>
		</>
	);
}
