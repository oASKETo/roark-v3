import ShowWhen from "../reusable/ShowWhen.js";
import React from "react";
import RepresentativeAdder from "./RepresentativeAdder.js";
import {IndividualFields, JuridicalFields, PhysicalFields, useSideCommons} from "./SideCommons.js";
import SideComponents from "./SideComponents.js";

export default function ZaimodavecSide() {
	const ctx = useSideCommons("zaimodavec");

	return (
		<>
			<SideComponents.TypeSelector sideData={ctx.sideData} update={ctx.update} />
			<div className="side-padding-wrapper">
				<ShowWhen value={ctx.sideData.type} is={0}>
					<PhysicalFields ctx={ctx} />
					<RepresentativeAdder ctx={ctx} />
				</ShowWhen>
				<ShowWhen value={ctx.sideData.type} is={1}>
					<IndividualFields ctx={ctx} />
					<RepresentativeAdder ctx={ctx} />
				</ShowWhen>
				<ShowWhen value={ctx.sideData.type} is={2}>
					<JuridicalFields ctx={ctx} />
					<RepresentativeAdder ctx={ctx} />
				</ShowWhen>
			</div>
		</>
	);
}
