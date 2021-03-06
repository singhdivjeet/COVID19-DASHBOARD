import React from "react";
import { Col } from "react-bootstrap";
import CaseChart from "./CaseChart";
function CaseData(props) {
	var changeInNumberFromPrevDay =
		props.data[props.data.length - 1] - props.data[props.data.length - 2];
	var sign =
		changeInNumberFromPrevDay > 0
			? "+"
			: changeInNumberFromPrevDay < 0
			? "-"
			: "";
	return (
		<div className={props.class}>
			<div style={{}}>
				{props.data[props.data.length - 1]}
				<br />
				{props.title}
				<div>
					[{sign}
					{Math.abs(changeInNumberFromPrevDay)}]
				</div>
			</div>
			<CaseChart chartData={props.data} dates={props.dates} color="#005C25" />
		</div>
	);
}

export default CaseData;
