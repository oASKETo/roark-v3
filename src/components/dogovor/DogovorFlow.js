import React from "react";
import Dogovor from "./stages/Dogovor.js";
import Neustoika from "./stages/Neustoika.js";
import Percent from "./stages/Percent.js";
import SrokVozvrata from "./stages/SrokVozvrata.js";
import VozvratZaima from "./stages/VozvratZaima.js";

const dogovorFlow = [
	["Договор", Dogovor],
	["Срок возврата займа", SrokVozvrata],
	["Проценты за пользование займом", Percent],
	["Возвращение суммы займа", VozvratZaima],
    ["Неустойка", Neustoika],
].map(([name, cmp]) => [name, () => <div className="side-padding-wrapper">{React.createElement(cmp)}</div>]);

export default dogovorFlow;
