import React from "react";
import Charts from "./Charts";
import Today from "./Today";
import { Container, Row, Col } from "react-bootstrap";

function CountryData(props) {
	// world data having arrays for dates, confirmed, recovered,active and deaths
	const chartData = props.stats;
	const selectedCountry = props.selectedCountry;
	return (
		<Container fluid>
			<Row>
				<Col md={12} style={{ fontSize: 40, fontWeight: "bold", padding: 20 }}>
					{selectedCountry}
				</Col>
			</Row>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					marginBottom: "2rem",
				}}
			>
				<Charts chartData={chartData} selectedCountry={selectedCountry} />
				<Today data={chartData} />
			</div>
		</Container>
	);
}

export default CountryData;
