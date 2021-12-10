import React from "react";
import Dogovor from "./stages/Dogovor.js";
import Percent from "./stages/Percent.js";
import SrokVozvrata from "./stages/SrokVozvrata.js";

const dogovorFlow = [
	["Договор", Dogovor],
	["Срок возврата займа", SrokVozvrata],
	["Проценты за пользование займом", Percent],
].map(([name, cmp]) => [name, () => <div className="side-padding-wrapper">{React.createElement(cmp)}</div>]);

export default dogovorFlow;
