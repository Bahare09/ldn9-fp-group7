import React from "react";
import Header from "../components/Header";
import "./About.css";
import bahare from "../images/bahare.jpg";
import erin from "../images/erin.jpg";
import hadi from "../images/hadi.jpg";
import zahraa from "../images/zahraa.jpg";
import lexi from "../images/lexi.jpg";
import rob from "../images/rob.jpg";
import dom from "../images/dom.jpg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";


const ElementBox = ({ image, description, linkedin, github, index }) => (
	<div key={index} className="element-box">
		<div className="picture-container">
			<img src={image} alt={`element${index + 1}`} />
		</div>
		<p>{description}</p>
		<div className="social-media-links">
			<a href={linkedin} target="_blank" rel="noreferrer">
				<LinkedInIcon />
			</a>
			<a href={github} target="_blank" rel="noreferrer">
				<GitHubIcon />
			</a>
		</div>
	</div>
);

const About = () => {
	const images = [bahare, hadi, zahraa, lexi, rob, dom, erin];
	const descriptions = [
		"Bahare - Developer",
		"Hadi - Developer",
		"Zahraa - Developer",
		"Lexi - Developer",
		"Rob - PM",
		"Dom - Tech Mentor",
		"Erin - PO",
	];
	const linkedins = [
		"linkedin1",
		"linkedin2",
		"linkedin3",
		"linkedin4",
		"linkedin5",
		"linkedin6",
		"linkedin7",
	];
	const githubs = [
		"github1",
		"github2",
		"github3",
		"github4",
		"github5",
		"github6",
		"github7",
	];

	return (
		<div>
			<Header currentPage="about" />
			<main role="main" className="about-page">
				<div className="content">
					<div className="intro-container">
						<h2>About us</h2>
						<p>
							WordWise is an innovative platform aimed at enhancing and
							enriching your English skills. Our interactive tools and engaging
							content provide an effective and fun way to learn new words and
							improve your overall communication.
						</p>
						<h3>Meet the team ⭐</h3>
					</div>
					<div className="elements-container">
						{images.slice(0, 4).map((image, index) => (
							<ElementBox
								key={index}
								image={image}
								description={descriptions[index]}
								linkedin={linkedins[index]}
								github={githubs[index]}
								index={index}
							/>
						))}
					</div>
					<div className="elements-container second-row">
						{images.slice(4, 7).map((image, index) => (
							<ElementBox
								key={index + 4}
								image={image}
								description={descriptions[index + 4]}
								linkedin={linkedins[index + 4]}
								github={githubs[index + 4]}
								index={index + 4}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	);
};

export default About;
