import React from "react";
import { Row, Col } from "react-bootstrap";
import CaseData from "./CaseData";

function Today(props) {
	if (props.data && props.data.length !== undefined) {
		let confirmed = [],
			deaths = [],
			recovered = [],
			active = [],
			dates = [];
		props.data.forEach((data) => {
			confirmed.push(data.confirmed);
			deaths.push(data.deaths);
			recovered.push(data.recovered);
			active.push(data.confirmed - data.recovered - data.deaths);
			dates.push(data.date);
		});
		return (
			<div>
				<Row style={{}}>
					<Col md={6} className="today-row">
						<CaseData
							class="confirmed"
							data={confirmed}
							dates={dates}
							title="Confirmed"
						/>

						<CaseData
							class="recovered"
							data={recovered}
							dates={dates}
							title="Recovered"
						/>
					</Col>
					<Col md={6} className="today-row">
						<CaseData
							class="deaths"
							data={deaths}
							dates={dates}
							title="Deaths"
						/>

						<CaseData
							class="active"
							data={active}
							dates={dates}
							title="Active"
						/>
					</Col>
				</Row>
			</div>
		);
	} else {
		return <></>;
	}
}

export default Today;
