import React from "react";
import DogovorContext from "../../context/DogovorContext.js";
import {useAppContext} from "../../sides/SideCommons";
import SideComponents from "../../sides/SideComponents.js";

export default function Dogovor() {
	const ctx = useAppContext(DogovorContext, "dogovor", "dogovor");

	return (
		<>
			<SideComponents.InputField type="text" label="Наименование" value="name.name" ctx={ctx} />
			<SideComponents.InputField type="text" label="Номер" value="name.number" checkbox={{side: "right", label: "Без номера", value: "name.noNumber"}} ctx={ctx} />
			<SideComponents.InputField type="date" label="Дата заключения" value="date" ctx={ctx} />
			<SideComponents.InputField type="text" label="Сумма" value="amount" ctx={ctx} />
			<SideComponents.InputField type="text" label="Пункт, в котором согласован размер займа" value="punkt" ctx={ctx} />
            <br/>
		</>
	);
}
