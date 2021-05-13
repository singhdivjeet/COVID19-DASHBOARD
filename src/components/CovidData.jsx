import React from "react";
import CountryData from "./CountryData";
import { Container, Row, Col, Button } from "react-bootstrap";
import SelectBox from "./SelectBox";
import About from "./About";

export default class CovidData extends React.Component {
	constructor() {
		super();
		this.state = {
			countryArr: [],
			data: {},
			worldStats: {},
			selectedCounty: "",
		};
		this.getData = this.getData.bind(this);
		this.backToGlobalNumbers = this.backToGlobalNumbers.bind(this);
		fetch("https://pomber.github.io/covid19/timeseries.json")
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				var worldStats = { confirmed: 0, recovered: 0, deaths: 0 };
				var countryArr = Object.keys(data).map((i) => i); //Learn
				// console.log(countryArr);
				countryArr.forEach((country) => {
					let countryData = data[country];

					// pick last object for today data
					countryData = countryData[countryData.length - 1];
					worldStats.confirmed += countryData.confirmed;
					worldStats.recovered += countryData.recovered;
					worldStats.deaths += countryData.deaths;
					// console.log(countryData, worldStats);
				});
				// world data
				var worldChart = [];
				countryArr.forEach((country) => {
					let countryData = data[country];
					countryData.forEach((dailyData, index) => {
						if (worldChart[index] === undefined) {
							var worldStats = {
								date: dailyData.date,
								confirmed: dailyData.confirmed,
								recovered: dailyData.recovered,
								deaths: dailyData.deaths,
							};
							worldChart.push(worldStats);
						} else {
							worldChart[index].confirmed += dailyData.confirmed;
							worldChart[index].recovered += dailyData.recovered;
							worldChart[index].deaths += dailyData.deaths;
						}
					});
				});
				// console.log(worldChart);
				this.setState({
					countryArr: countryArr,
					data: data,
					worldStats: worldStats,
					worldChart: worldChart,
				});
			});
	}

	getData(event) {
		var country = event.target.value;
		if (country !== "select") {
			this.setState({
				selectedCountry: country,
			});
		} else {
			this.setState({
				selectedCountry: "",
			});
		}
	}

	backToGlobalNumbers() {
		this.setState({
			selectedCountry: "",
		});
	}

	render() {
		const countryStats = this.state.data[this.state.selectedCountry];
		const worldChart = this.state.worldChart;
		const lastUpdated =
			worldChart !== undefined ? worldChart[worldChart.length - 1].date : "";
		// var objDate = new Date(lastUpdated).toLocaleString().slice(0, -13);

		var monthNames = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		function dateFormat(d) {
			var t = new Date(d);
			return (
				t.getDate() + " " + monthNames[t.getMonth()] + " " + t.getFullYear()
			);
		}

		return (
			<Container
				fluid
				style={{ backgroundColor: "#fdfffc", padding: 0 }}
				className="App"
			>
				{/*Header starts here */}
				<Row className="App-header">
					<Col md={3} style={{ textAlign: "left", width: "100%" }}>
						COVID19 DASHBOARD
					</Col>
					{/*Select Box for country search starts here */}
					<SelectBox
						onChangeFunction={this.getData}
						countryArr={this.state.countryArr}
						selectedValue={this.state.selectedCountry}
					/>
				</Row>
				{/*Header ends here */}
				<Row>
					{/*Get back to global numbers */}
					<Col md={{ span: 1 }} xs={1}>
						{this.state.selectedCountry ? (
							<Button className="back" onClick={this.backToGlobalNumbers}>
								BACK
							</Button>
						) : (
							<></>
						)}
						{/*Last updated */}
					</Col>
					<Col
						md={{ span: 2, offset: 9 }}
						xs={{ span: 6, offset: 5 }}
						style={{ fontSize: 16, marginTop: "1rem" }}
					>
						Last Updated : {dateFormat(lastUpdated)}
						{/* {objDate} */}
					</Col>
				</Row>
				<Container fluid>
					{this.state.selectedCountry ? (
						<CountryData
							stats={countryStats}
							selectedCountry={this.state.selectedCountry}
						/>
					) : (
						<CountryData stats={worldChart} selectedCountry="WORLD" />
					)}
					{/* <About /> */}
				</Container>
				<footer>
					<div className="App-footer">
						<div>
							<a
								href="https://github.com/pomber/covid19"
								style={{
									color: "white",
									textDecoration: "underline",
									marginLeft: "1rem",
								}}
							>
								Datasource
							</a>
						</div>
						{/* <Col>
						
						</Col> */}
						<div>
							Created by{" "}
							<a
								href="https://github.com/singhdivjeet/COVID19-DASHBOARD"
								target="_blank"
								style={{ color: "white" }}
							>
								Divjeet{" "}
							</a>
							&
							<a
								href="https://github.com/shubhpatr"
								target="_blank"
								style={{ color: "white", marginRight: "1rem" }}
							>
								{" "}
								Shubham
							</a>
						</div>
					</div>
				</footer>
			</Container>
		);
	}
}
