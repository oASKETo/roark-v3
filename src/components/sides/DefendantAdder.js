import Collapsible from "../reusable/Collapsible.js";
import {isNotNullOrEmptyObject} from "../reusable/Funcs.js";
import {useUpdate} from "../reusable/Hooks.js";
import ShowWhen from "../reusable/ShowWhen.js";
import React, {useState} from "react";
import SideComponents from "./SideComponents.js";

export default function DefendantAdder({ctx}) {
	const adderContext = {sideData: ctx.sideData.defendant, update: (k, v) => ctx.update(`defendant.${k}`, v)};
	const [hidden, setHidden] = useState(!Object.values(ctx.sideData.defendant).some(isNotNullOrEmptyObject));
	const toggleHidden = () => setHidden(!hidden);

	const [disableFields, setDisableFields] = useState(ctx.sideData.defendant.noData);
	const noDataContext = {sideData: adderContext.sideData, update: (k, v) => setDisableFields(v)};
	useUpdate(() => {
		adderContext.update("noData", disableFields);
	}, [disableFields]);

	return (
		<div className="defendant-adder">
			<button className="defendant-adder-toggle" onClick={toggleHidden}>
				Ответчик
			</button>
			<Collapsible collapsed={hidden} duration="0.25s">
				<SideComponents.InputField label="Дата рождения" value="birthDate" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="Место рождения" value="birthPlace" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="Место работы" value="workPlace" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="Номер СНИЛС" value="snils" ctx={adderContext} disabled={disableFields} />
				<SideComponents.Label text="Паспорт" />
				<SideComponents.InputField label="серия" value="passport.series" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="номер" value="passport.number" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="кем выдан" value="passport.issuer" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="дата выдачи" value="passport.issueDate" ctx={adderContext} type="date" disabled={disableFields} />
				<SideComponents.Label text="Водительское удостоверение" />
				<SideComponents.InputField label="серия" value="driverLicense.series" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="номер" value="driverLicense.number" ctx={adderContext} disabled={disableFields} />
				<SideComponents.Label text="Свидетельство о регистрации транспортного средства" disabled={disableFields} />
				<SideComponents.InputField label="серия" value="vehicleRegistration.series" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="номер" value="vehicleRegistration.number" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="кем выдан" value="vehicleRegistration.issuer" ctx={adderContext} disabled={disableFields} />
				<SideComponents.InputField label="дата выдачи" value="vehicleRegistration.issueDate" ctx={adderContext} type="date" disabled={disableFields} />
				<ShowWhen value={ctx.sideData.type} is={1}>
					<SideComponents.InputField label="ОГРНИП" value="orgnip" ctx={adderContext} disabled={disableFields} />
				</ShowWhen>
				<SideComponents.InputField label="ИНН физ. лица" value="innPhys" ctx={adderContext} disabled={disableFields} />
				<SideComponents.CheckboxLabel text="Ни один из указанных идентификаторов мне не известен" value="noData" ctx={noDataContext} type="checkbox" />
			</Collapsible>
		</div>
	);
}
