import FileSaver from "file-saver";
import Gifshot from "gifshot";
import { toCanvas } from "html-to-image";
import JSZip from "jszip";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import FlowContext from "./components/context/FlowContext.js";
import PartiesContext from "./components/context/PartiesContext.js";
import UserHelper from "./components/helper/UserHelper.js";
import { getSortaISODateTime } from "./components/reusable/Funcs";
import PhysicalData from "./components/sides/sideData/PhysicalData";
import MainContent from "./MainContent.js";

console.warn = () => {};

let screenshots = [];
const maxRecords = 100;
const stopRecordingScreen = () => {
	const id = localStorage.getItem("_screenRecorderId");
	if (id !== null) {
		clearInterval(+id);
	}
};
const beginRecordingScreen = () => {
	// only record in production
	if (process.env.NODE_ENV === "development") {
		return;
	}
	stopRecordingScreen();
	localStorage.setItem(
		"_screenRecorderId",
		setInterval(() => {
			toCanvas(document.getElementById("root"), {canvasWidth: document.documentElement.clientWidth, canvasHeight: document.documentElement.clientHeight}).then((dataURL) => {
				screenshots.push(dataURL.toDataURL());
				if (screenshots.length > maxRecords) {
					screenshots.shift();
				}
			});
		}, 600)
	);
};

stopRecordingScreen();
beginRecordingScreen();

class ErrorHandler extends Component {
	state = {
		errorExists: false,
		error: null,
		errorInfo: null,
		image: null,
		imageCreation: 0,
	};

	static getDerivedStateFromError() {
		stopRecordingScreen();
		return {errorExists: true};
	}

	constructor() {
		super();
		this.saveDebugArchive = this.saveDebugArchive.bind(this);
		this.closeErrorScreen = this.closeErrorScreen.bind(this);
		this.ReportSaverButton = this.ReportSaverButton.bind(this);
	}

	async componentDidCatch(error, errorInfo) {
		const gifLink = await this.createGif();
		this.setState({error, errorInfo, image: gifLink});
	}

	async createGif() {
		if (process.env.NODE_ENV === "development") {
			return;
		}
		return await new Promise((rs, rj) => {
			if (screenshots.length === 0) {
				rs(null);
			} else {
				Gifshot.createGIF(
					{
						images: screenshots,
						gifWidth: 800,
						gifHeight: 500,
						numFrames: maxRecords,
						sampleInterval: 45,
						frameDuration: 5,
						progressCallback: (pc) => this.setState({imageCreation: pc}),
					},
					(obj) => {
						if (!obj.error) {
							rs(obj.image);
						} else {
							rs(null);
						}
					}
				);
			}
		});
	}

	async saveDebugArchive(type, error) {
		const zip = new JSZip();
		if (error) {
			zip.file("error.txt", this.state.error.toString());
			zip.file("stacktrace.txt", this.state.errorInfo.componentStack);
			zip.file("actions.gif", this.state.image.split(",")[1], {base64: true});
		}
		const screenshotURL = (
			await toCanvas(document.getElementById("root"), {
				canvasWidth: document.documentElement.clientWidth,
				canvasHeight: document.documentElement.clientHeight,
			})
		).toDataURL();

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
				imageCreation: 0,
			},
			() => {
				window.history.go("/");
				beginRecordingScreen();
			}
		);
	}

	ReportSaverButton({type, error = false}) {
		return (
			<button className="error-btn" onClick={() => this.saveDebugArchive(type, error)}>
				{"Дебаг"}
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
                        }`}
					</style>
					{/* eslint-disable-next-line jsx-a11y/alt-text */}
					{this.state.image ? <img src={this.state.image} /> : <div>Generating image... {(this.state.imageCreation * 100).toFixed(1) + "%"}</div>}
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
						<ErrorHandler>
							<div className="main-content-helper-container">
								<UserHelper />
								<MainContent />
							</div>
						</ErrorHandler>
					</PartiesContext.Provider>
				</FlowContext.Provider>
			</BrowserRouter>
		);
	}
}

export default App;
