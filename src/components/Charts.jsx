import React from "react";
import Chart from "chart.js";
import { isEmpty } from "lodash";
import { isMobile } from "react-device-detect";

export default class Charts extends React.Component {
	chartRef = React.createRef();
	constructor() {
		super();
		this.myChart = {};
	}

	componentDidMount() {
		this.createChart(this.props);
	}

	componentDidUpdate() {
		this.createChart(this.props);
	}

	createChart(props) {
		if (props.chartData && props.chartData.length !== undefined) {
			var dates = [];
			var confirmed = [];
			var recovered = [];
			var deaths = [];
			var active = [];
			props.chartData.forEach((element) => {
				dates.push(element.date);
				confirmed.push(element.confirmed);
				recovered.push(element.recovered);
				deaths.push(element.deaths);
				var sum = 0;
				active.push(
					(sum += element.confirmed - element.recovered - element.deaths)
				);
			});

			let padding = 50;
			if (isMobile) {
				padding = 5;
			}

			const myChartRef = this.chartRef.current.getContext("2d");
			if (!isEmpty(this.myChart)) {
				this.myChart.data.datasets[0].data = confirmed;
				this.myChart.data.datasets[1].data = recovered;
				this.myChart.data.datasets[2].data = deaths;
				this.myChart.data.datasets[3].data = active;
				this.myChart.options.title.text = props.selectedCountry;
				this.myChart.update();
			} else {
				/*  if(isMobile){
                Chart.defaults.global.elements.point.borderWidth =0;
            } */
				this.myChart = new Chart(myChartRef, {
					type: "line",

					data: {
						labels: dates,
						datasets: [
							{
								label: "Confirmed",
								data: confirmed,
								borderColor: "#0e50dd",
								fill: false,
								borderWidth: 1,
								pointRadius: 1,
							},
							{
								label: "Recovered",
								data: recovered,
								borderColor: "green",
								fill: false,
								borderWidth: 1,
								pointRadius: 1,
							},
							{
								label: "Deaths",
								data: deaths,
								borderColor: "red",
								fill: false,
								borderWidth: 1,
								pointRadius: 1,
							},
							{
								label: "Active",
								data: active,
								borderColor: "#ffb701",
								fill: false,
								borderWidth: 1,
								pointRadius: 1,
							},
						],
					},
					options: {
						// responsive: true,
						animation: {
							duration: 1500,
							easing: "easeInOutQuint",
						},
						elements: {
							line: {},
						},

						layout: {
							padding: {
								left: padding,
								right: padding,
								top: padding,
								bottom: 10,
							},
						},
						legend: {
							labels: {
								boxWidth: isMobile ? 10 : 40,
								padding: 10,
							},
						},
						title: {
							display: false,
						},
						scales: {
							xAxes: [
								{
									display: true,
									text: "Value",
									ticks: {
										maxTicksLimit: isMobile ? 4 : 10,
										maxRotation: 0,
									},
								},
							],
							yAxes: [
								{
									display: true,
									text: "Value",
								},
							],
						},
					},
				});
			}
		}
	}

	render() {
		return (
			<div
				style={{
					width: "60%",

					paddingBottom: "3rem",
				}}
			>
				<canvas id="myChart" ref={this.chartRef} />
			</div>
		);
	}
}
