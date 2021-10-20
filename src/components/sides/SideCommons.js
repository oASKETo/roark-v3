import PartiesContext from "../context/PartiesContext.js";
import Collapsible from "../reusable/Collapsible.js";
import {checkInn, nullUndefFix, parsePackage, tryFuncOr} from "../reusable/Funcs.js";
import {useUpdate} from "../reusable/Hooks.js";
import ShowWhen from "../reusable/ShowWhen.js";
import {useCallback, useContext, useState} from "react";
import SideComponents from "./SideComponents.js";
import IndividualData from "./sideData/IndividualData.js";
import JuridicalData from "./sideData/JuridicalData.js";
import PhysicalData from "./sideData/PhysicalData.js";
import petrovich from "petrovich";

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
				toChange[newKey] = val;
			} catch (ex) {
				console.log("extension error", toChange);
				throw ex;
			}
		}

		updateCtx("parties", side, newPartyObj);
	};

	const ctx = {sideData: sideObject, update: update};

	return {sideObject, ctx, update};
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
				<SideComponents.InputField label="Новое имя" value="changes.name" ctx={ctx} />
				<SideComponents.InputField label="Новая фамилия" value="changes.surname" ctx={ctx} />
				<SideComponents.InputField label="Новое отчество" value="changes.paternal" ctx={ctx} />
				<SideComponents.InputField type="date" label="Дата изменения ФИО" value="changes.date" ctx={ctx} />
				<SideComponents.Label text="Фамилия, иля либо отчество изменились на основании" />
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

export function PhysicalFields({ctx}) {
	return (
		<>
			<SideComponents.Label text="Данные физического лица" />
			<SideComponents.NameSelector label="ФИО" namePath="name" surnamePath="surname" paternalPath="paternal" ctx={ctx} />
			<Cases namePath="name" surnamePath="surname" paternalPath="paternal" changesPath="changes" ctx={ctx} />
			<SideComponents.InputField label="Адрес места жительства" value="address" ctx={ctx} />
			<SideComponents.InputField label="Телефон" value="phone" ctx={ctx} validator="\+?[0-9]*" />
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
			<SideComponents.InputField label="Адрес места жительства" value="address" ctx={ctx} />
			<SideComponents.InputField label="ОГРНИП" value="ogrnip" ctx={ctx} />
			<NameChangeSection ctx={ctx} />
			<SideComponents.StatefulCheckboxLabel text="В период действия договора займа ИП было ликвидировано" initiallyCollaped={!ctx.sideData.liquidationDate}>
				<SideComponents.InputField type="date" label="Дата ликвидации ИП" value="liquidationDate" ctx={ctx} />
			</SideComponents.StatefulCheckboxLabel>
		</>
	);
}

export function JuridicalFields({ctx}) {
	const [innObject, setInnObject] = useState({});
	useUpdate(() => {
		if (!checkInn(ctx.sideData.inn)) {
			console.log("invalid inn");
			setInnObject({});
			return;
		}

		const updateInnName = ({suggestions: [first]}) => {
			setInnObject({address: first.data.address, status: first.data.state.status, nameOpf: first.data.name.short_with_opf, name: first.data.name.full_with_opf});
		};
		fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				// TODO: offload to backend
				Authorization: "Token 64bda6eefd1d370b9b812b6cebce7216af81b24d",
			},
			body: JSON.stringify({query: ctx.sideData.inn}),
		})
			.then((response) => response.json())
			.then(updateInnName);
	}, [ctx.sideData.inn, ctx.sideData.autofillAddress]);
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
					// idk if this is right in a way
					shouldUpdate: useCallback(() => Object.keys(innObject).length === 0 || innObject.status === "ACTIVE", [innObject]),
				}}
				ctx={ctx}
			/>
			<SideComponents.InputField
				label="Адрес"
				value="address"
				ctx={ctx}
				autofill={{
					value: innObject.address?.unrestricted_value ?? "xd",
					shouldUpdate: useCallback(() => Object.keys(innObject).length === 0 || innObject.status === "ACTIVE", [innObject]),
				}}
			/>
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
