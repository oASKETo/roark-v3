import {Component} from "react";
import "./Main.css";
import Button from "./reusable/Button.js";

export default class Main extends Component {
	MainRow({children}) {
		return <div className="main-row">{children}</div>;
	}

	render() {
		return (
			<div className="main-container">
				<this.MainRow>
					<Button to="/sides" text="Начать!" width="90%" variant="big" />
				</this.MainRow>
				<br />
				<this.MainRow>
					<Button disabled text="Калькулятор" width="65%" variant="big" disabledColor="#1596c2" color="deepskyblue" />
				</this.MainRow>
			</div>
		);
	}
}
