import React from "react";
import ShowWhen from "../reusable/ShowWhen.js";
import DefendantAdder from "./DefendantAdder.js";
import { IndividualFields, JuridicalFields, PhysicalFields, useSideCommons } from "./SideCommons.js";
import SideComponents from "./SideComponents.js";

export default function ZaemshikSide() {
	const {sideObject: zaemshik, update, ctx} = useSideCommons("zaemshik");

	return (
		<>
			<SideComponents.TypeSelector sideData={zaemshik} update={update} />
			<div className="side-padding-wrapper">
				<ShowWhen value={zaemshik.type} is={0}>
					<PhysicalFields ctx={ctx} />
					<DefendantAdder ctx={ctx} />
				</ShowWhen>
				<ShowWhen value={zaemshik.type} is={1}>
					<IndividualFields ctx={ctx} />
					<DefendantAdder ctx={ctx} />
				</ShowWhen>
				<ShowWhen value={zaemshik.type} is={2}>
					<JuridicalFields ctx={ctx} />
					<DefendantAdder ctx={ctx} />
				</ShowWhen>
			</div>
		</>
	);
}
