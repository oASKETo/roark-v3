import React from "react";
import {FlowSkipButton} from "../reusable/Button.js";
import ShowWhen from "../reusable/ShowWhen.js";
import DefendantAdder from "./DefendantAdder.js";
import {IndividualFields, JuridicalFields, PhysicalFields, useSideCommons} from "./SideCommons.js";
import SideComponents from "./SideComponents.js";

export default function ZaemshikSide() {
	const ctx = useSideCommons("zaemshik");

	return (
		<>
			<SideComponents.TypeSelector sideData={ctx.sideData} update={ctx.update} />
			<div className="side-padding-wrapper">
				<ShowWhen value={ctx.sideData.type} is={0}>
					<PhysicalFields ctx={ctx} />
					<DefendantAdder ctx={ctx} />
				</ShowWhen>
				<ShowWhen value={ctx.sideData.type} is={1}>
					<IndividualFields ctx={ctx} />
					<DefendantAdder ctx={ctx} />
				</ShowWhen>
				<ShowWhen value={ctx.sideData.type} is={2}>
					<JuridicalFields ctx={ctx} />
				</ShowWhen>
				<br />
				{/* temp */}
				<div className="flow-next-container">
					<FlowSkipButton to="/sides" flowPage="7" text="Суд" width="40%" variant="normal"></FlowSkipButton>
				</div>
			</div>
		</>
	);
}
