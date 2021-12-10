import {useContext} from "react";
import {Switch} from "react-router";
import FlowContext from "./components/context/FlowContext";
import Flow from "./components/Flow";
import Main from "./components/Main";
import Navbar from "./components/navbar/Navbar";
import ZaemshikSide from "./components/sides/ZaemshikSide";
import ZaimodavecSide from "./components/sides/ZaimodavecSide";
import SydSide from "./components/sides/SydSide";
import CashOrder from "./components/sides/CashOrder";
import Dogovor from "./components/dogovor/DogovorFlow";

export default function MainContent() {
	const {flow} = useContext(FlowContext);
	return (
		<div className="main-content-container">
			<Navbar flow={flow} />
			<div className="container-body">
				<Switch>
					<Main exact path="/" />
					<Flow
						parent="/"
						root="/sides"
						steps={[
							["Займодавец (Истец)", ZaimodavecSide],
							["Заёмщик (Ответчик)", ZaemshikSide],
                            ...Dogovor,
							["Суд", SydSide],
							["Госпошлина", CashOrder],
							// More screens
						]}
					/>
				</Switch>
			</div>
		</div>
	);
}
