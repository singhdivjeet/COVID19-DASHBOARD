import React from "react";
import covid1 from "./images/covid.png";

function About() {
	return (
		<div
			style={{
				display: "inline-block",
				flexDirection: "column",

				alignItems: "center",
				marginBottom: "3rem",
			}}
		>
			<h1 style={{ fontWeight: "bold" }}>What is Covid19 ?</h1>
			<div
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					paddingTop: "1rem",
				}}
			>
				<img src={covid1} width="30%" height="50%" alt="Coronavirus"></img>
				<p style={{ width: "30%", height: "50%", textAlign: "left" }}>
					Coronavirus disease (COVID-19) is an infectious disease caused by a
					newly discovered coronavirus. Most people infected with the COVID-19
					virus will experience mild to moderate respiratory illness and recover
					without requiring special treatment. Older people, and those with
					underlying medical problems like cardiovascular disease, diabetes,
					chronic respiratory disease, and cancer are more likely to develop
					serious illness.
				</p>
			</div>
		</div>
	);
}

export default About;
