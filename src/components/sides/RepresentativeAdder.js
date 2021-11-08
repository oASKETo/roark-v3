import React from "react";
import Collapsible from "../reusable/Collapsible.js";
import { isNotNullOrEmptyObject } from "../reusable/Funcs.js";
import "./Side.css";
import SideComponents from "./SideComponents.js";

export default function RepresentativeAdder({ctx}) {
	const adderContext = {sideData: ctx.sideData.representative, update: (k, v) => ctx.update(`representative.${k}`, v)};

	return (
		<div className="representative-adder">
			<SideComponents.StatefulToggleButton label="Представитель" initialValue={!Object.values(ctx.sideData.representative).some(isNotNullOrEmptyObject)}>
				{(toggled) => (
					<Collapsible collapsed={toggled} duration="0.25s">
						<SideComponents.NameSelector label="ФИО представителя" namePath="name" surnamePath="surname" paternalPath="paternal" ctx={adderContext} />
						<SideComponents.AddressField label="Адрес представителя" value="address" ctx={adderContext} />
						<SideComponents.InputField label="Телефон" value="phone" ctx={adderContext} validator="\+?[0-9]*" />
						<SideComponents.InputField label="Дата выдачи доверенности" value="POADate" ctx={adderContext} type="date" />
						<SideComponents.InputField label="Номер доверенности" value="POANumber" ctx={adderContext} />
					</Collapsible>
				)}
			</SideComponents.StatefulToggleButton>
		</div>
	);
}
