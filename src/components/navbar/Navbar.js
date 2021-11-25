import FlowContext from "../context/FlowContext";
import React, {useContext, useState} from "react";
import {useHistory} from "react-router";
import "./Navbar.css";
import PartiesContext from "../context/PartiesContext";
import ReactModal from "react-modal";
//import {generateDocx} from "../helper/DocumentMaker";

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
			<div className="navbar-right">
				<div>Log in</div>
			</div>
		</nav>
	);
}

export default Navbar;
