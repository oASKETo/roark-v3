import React from "react";
import Collapsible from "../reusable/Collapsible.js";
import { isNotNullOrEmptyObject } from "../reusable/Funcs.js";
import SideComponents from "./SideComponents.js";

export default function DefendantAdder({ctx}) {
	const adderContext = {sideData: ctx.sideData.defendant, update: (k, v) => ctx.update(`defendant.${k}`, v)};

const shouldShow = !Object.values(ctx.sideData.defendant).some(isNotNullOrEmptyObject);

	return (
		<div className="defendant-adder">
			<SideComponents.StatefulToggleButton label="Дополнительная информация" initialValue={shouldShow}>
				{(toggled) => (
					<Collapsible maxHeightFix collapsed={toggled} duration="0.5s">
						<SideComponents.InputField label="Дата рождения" value="birthDate" ctx={adderContext} disabled={ctx.sideData.defendant.noData} type="date" />
						<SideComponents.InputField label="Место рождения" value="birthPlace" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
						<SideComponents.InputField label="Место работы" value="workPlace" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
						<SideComponents.StatefulToggleButton label="Паспорт" initialValue={Object.values(ctx.sideData.defendant.passport).some(isNotNullOrEmptyObject)}>
							{(toggled) => (
								<Collapsible collapsed={toggled} duration="0.25s">
									<SideComponents.InputField label="серия" value="passport.series" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
									<SideComponents.InputField label="номер" value="passport.number" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
									<SideComponents.InputField label="кем выдан" value="passport.issuer" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
									<SideComponents.InputField
										label="дата выдачи"
										value="passport.issueDate"
										ctx={adderContext}
										type="date"
										disabled={ctx.sideData.defendant.noData}
									/>
								</Collapsible>
							)}
						</SideComponents.StatefulToggleButton>
						<SideComponents.StatefulToggleButton
							label="Водительское удостоверение"
							initialValue={Object.values(ctx.sideData.defendant.driverLicense).some(isNotNullOrEmptyObject)}
						>
							{(toggled) => (
								<Collapsible collapsed={toggled} duration="0.25s">
									<SideComponents.InputField label="серия" value="driverLicense.series" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
									<SideComponents.InputField label="номер" value="driverLicense.number" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
								</Collapsible>
							)}
						</SideComponents.StatefulToggleButton>
						<SideComponents.StatefulToggleButton
							label="Свидетельство о регистрации ТС"
							initialValue={Object.values(ctx.sideData.defendant.vehicleRegistration).some(isNotNullOrEmptyObject)}
						>
							{(toggled) => (
								<Collapsible collapsed={toggled} duration="0.25s">
									<SideComponents.InputField label="серия" value="vehicleRegistration.series" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
									<SideComponents.InputField label="номер" value="vehicleRegistration.number" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
									<SideComponents.InputField label="кем выдан" value="vehicleRegistration.issuer" ctx={adderContext} disabled={ctx.sideData.defendant.noData} />
									<SideComponents.InputField
										label="дата выдачи"
										value="vehicleRegistration.issueDate"
										ctx={adderContext}
										type="date"
										disabled={ctx.sideData.defendant.noData}
									/>
								</Collapsible>
							)}
						</SideComponents.StatefulToggleButton>
						<SideComponents.CheckboxLabel text="Ни один из указанных идентификаторов мне не известен" value="noData" ctx={adderContext} type="checkbox" />
					</Collapsible>
				)}
			</SideComponents.StatefulToggleButton>
		</div>
	);
}
