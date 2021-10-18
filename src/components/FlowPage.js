import React from "react";
import "./FlowPage.css";

const FlowPage = React.memo(
	({component, title}) => {
		return (
			<div className="flow-page">
				<div className="flow-page-title-container">
					<h1 className="flow-page-title">{title}</h1>
				</div>
				<div className="flow-page-content">{React.createElement(component, {})}</div>
			</div>
		);
	},
	(prev, next) => {
		return prev.component === next.component && prev.title === next.title;
	}
);

export default FlowPage;
