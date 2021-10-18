import FlowContext from "../context/FlowContext";
import React, {useContext} from "react";
import {useHistory} from "react-router";
import "./Navbar.css";

function Breadcrumb({name, flowIndex, link}) {
	const {update} = useContext(FlowContext);
	const history = useHistory();
	return (
		<li>
			<button
				className="breadcrumb-button"
				onClick={() => {
					if (link) {
						history.push(link);
						update("flow", "crumbs", []);
					} else {
						update("flow", "flowPage", flowIndex);
					}
				}}
			>
				{name}
			</button>
		</li>
	);
}

function Navbar({flow}) {
	return (
		<nav className="navbar">
			<div className="navbar-left">
				<ul className="navbar-breadcrumbs">
					<Breadcrumb name={"Главная"} link="/" />
					{flow.crumbs.map((name, i) => (
						<Breadcrumb name={name} flowIndex={i} key={name} />
					))}
				</ul>
			</div>
			<div className="navbar-right">Log in</div>
		</nav>
	);
}

export default Navbar;
