import FileSaver from "file-saver";
import {toCanvas} from "html-to-image";
import JSZip from "jszip";
import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import "./App.css";
import CashOrderContext from "./components/context/CashOrderContext.js";
import FlowContext from "./components/context/FlowContext.js";
import PartiesContext from "./components/context/PartiesContext.js";
import SydContext from "./components/context/SydContext.js";
import UserHelper from "./components/helper/UserHelper.js";
import {getSortaISODateTime} from "./components/reusable/Funcs";
import PhysicalData from "./components/sides/sideData/PhysicalData";
import SydData from "./components/sides/sideData/SydData";
import MainContent from "./MainContent.js";

console.warn = () => {};

const takeScreenshot = async () => {
	const URL = await toCanvas(document.getElementById("webapp"), {
		canvasWidth: document.documentElement.clientWidth,
		canvasHeight: document.documentElement.clientHeight,
	});
	return URL.toDataURL();
};

class ErrorHandler extends Component {
	state = {
		errorExists: false,
		error: null,
		errorInfo: null,
		image: null,
	};

	static getDerivedStateFromError() {
		return {errorExists: true, image: takeScreenshot()};
	}

	constructor() {
		super();
		this.saveDebugArchive = this.saveDebugArchive.bind(this);
		this.closeErrorScreen = this.closeErrorScreen.bind(this);
		this.ReportSaverButton = this.ReportSaverButton.bind(this);
	}

	async componentDidCatch(error, errorInfo) {
		const image = await this.state.image;
		this.setState((state) => ({error, errorInfo, image}));
	}

	async saveDebugArchive(type, error) {
		const zip = new JSZip();
		if (error) {
			zip.file("error.txt", this.state.error.toString());
			zip.file("stacktrace.txt", this.state.errorInfo.componentStack);
			zip.file("actions.gif", this.state.image.split(",")[1], {base64: true});
		}

		const screenshotURL = await takeScreenshot();
		console.log(screenshotURL);

		zip.file("image.png", screenshotURL.split(",")[1], {base64: true});
		zip.file("appinfo.txt", process.env.REACT_APP_VERSION);
		zip.generateAsync({type: "blob"}).then((blob) => {
			FileSaver.saveAs(blob, `${type}_${getSortaISODateTime()}.zip`);
			this.closeErrorScreen();
		});
	}

	closeErrorScreen() {
		this.setState(
			{
				error: null,
				errorInfo: null,
				image: null,
				errorExists: false,
			},
			() => {
				window.history.go("/");
			}
		);
	}

	ReportSaverButton({type, error = false}) {
		return (
			<button className="error-btn" onClick={() => this.saveDebugArchive(type, error)}>
				Дебаг
			</button>
		);
	}

	render() {
		if (this.state.errorExists) {
			return (
				<div>
					<div>
						<button className="error-btn" onClick={this.closeErrorScreen}>
							{"<- Home"}
						</button>
						<this.ReportSaverButton error type="crash" />
					</div>
					<h4>{this.state.error && this.state.error.toString()}</h4>
					<details open>
						<summary>Error Details:</summary>
						<ol style={{whiteSpace: "pre"}}>{this.state.errorInfo && this.state.errorInfo.componentStack.split("\n").map((v, i) => <li key={i}>{v}</li>)}</ol>
					</details>
					<style>
						{`* {
                            background-color: #00f !important;
                            color: #fff !important;
                            border: none !important;
                        }
                        .error-btn {
                            color: white !important;
                            border: 2px solid white !important;
                        }
                        #root {
                            padding: 18px !important;
                        }
                        img {

                        }`}
					</style>
					{/* eslint-disable-next-line jsx-a11y/alt-text */}
					{this.state.image && <img width="640" src={this.state.image} />}
					<br />
				</div>
			);
		} else {
			return (
				<>
					{this.props.children}
					<div className="debug-container">
						<this.ReportSaverButton type="debug" />
					</div>
				</>
			);
		}
	}
}

class App extends Component {
	state = {
		flow: {
			flowPage: 0,
			crumbs: [],
		},
		parties: {
			zaimodavec: new PhysicalData(),
			zaemshik: new PhysicalData(),
		},
		syd: {
			sydSideData: new SydData(),
		},
		order: {
			value: {
				element: 1,
			},
		},
		update: (what, key, value) => {
			this.setState((state) => ({[what]: {...state[what], [key]: value}}));
		},
	};

	contextVal = (key) => {
		return {[key]: {...this.state[key]}, update: this.state.update};
	};

	render() {
		return (
			<BrowserRouter>
				<FlowContext.Provider value={this.contextVal("flow")}>
					<PartiesContext.Provider value={this.contextVal("parties")}>
						<SydContext.Provider value={this.contextVal("syd")}>
							<CashOrderContext.Provider value={this.contextVal("order")}>
								<ErrorHandler>
									<div id="webapp" className="main-content-helper-container">
										<UserHelper />
										<MainContent />
									</div>
								</ErrorHandler>
							</CashOrderContext.Provider>
						</SydContext.Provider>
					</PartiesContext.Provider>
				</FlowContext.Provider>
			</BrowserRouter>
		);
	}
}

export default App;
