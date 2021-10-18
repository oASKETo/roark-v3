import FlowContext from "./context/FlowContext.js";
import React, {useContext, useEffect} from "react";
import {Route, useHistory} from "react-router";
import "./Flow.css";
import FlowPage from "./FlowPage.js";
import Button from "./reusable/Button.js";

/*
[
    [
        path,
        title,
        component
    ]
]
*/
export default function Flow({parent = "/", root = "/", steps}) {
	const {flow, update: updateCtx} = useContext(FlowContext);
	const [title, component] = steps[flow.flowPage];

	const resetBreadcrumbs = () => {
		updateCtx("flow", "flowPage", 0);
		updateCtx("flow", "crumbs", []);
	};

	useEffect(() => {
		updateCtx(
			"flow",
			"crumbs",
			steps.slice(0, flow.flowPage + 1).map(([title]) => title)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flow.flowPage]);

	const history = useHistory();
	const flowLength = steps.length;
	const isEndOfFlow = flow.flowPage === flowLength - 1;

	const advance = () => {
		if (isEndOfFlow) {
			resetBreadcrumbs();
			history.push(parent);
		} else {
			updateCtx("flow", "flowPage", flow.flowPage + 1);
		}
	};

	return (
		<Route exact path={root}>
			<FlowPage title={title} component={component} />
			<div className="flow-next-container">
				<Button text={isEndOfFlow ? "Завершить" : "Сохранить и продолжить"} onClick={advance} width="40%" />
			</div>
		</Route>
	);
}
