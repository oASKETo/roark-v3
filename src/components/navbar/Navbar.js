import FlowContext from "../context/FlowContext";
import React, {useContext, useState} from "react";
import {useHistory} from "react-router";
import "./Navbar.css";
import PartiesContext from "../context/PartiesContext";
import ReactModal from "react-modal";
import {generateDocx, generatePdf} from "../helper/DocumentMaker";

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

function DocumentMakerButton() {
	const {parties} = useContext(PartiesContext);
	const [showModal, setShowModal] = useState(false);

	const closeModal = () => {
		setShowModal(false);
	};

	const onDocx = () => {
		generateDocx(parties);
		closeModal();
	};
	const onPdf = () => {
        generatePdf(parties);
		closeModal();
	};
	return (
		<div>
			<button onClick={() => setShowModal(true)}>Документ</button>
			<ReactModal
				isOpen={showModal}
				contentLabel="Yes"
				onRequestClose={closeModal}
				shouldCloseOnOverlayClick={true}
				style={{
					content: {
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
						width: "300px",
						display: "flex",
						flexDirection: "column",
						color: "var(--text-dark)",
						textAlign: "center",
					},
					overlay: {
						backgroundColor: "rgba(0,0,0,0.5)",
					},
				}}
			>
				<div>Выберите формат документа</div>
				<div>
					<button onClick={onDocx}>.docx</button>
					<button onClick={onPdf}>.pdf</button>
				</div>
			</ReactModal>
		</div>
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
				<DocumentMakerButton />
				<div>Log in</div>
			</div>
		</nav>
	);
}

export default Navbar;
