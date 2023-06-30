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
						{images.slice(0, 4).map((element, index) => (
							<div key={index} className="element-box">
								<div className="picture-container">
									<img src={element} alt={`element${index + 1}`} />
								</div>
								<p>{descriptions[index]}</p>
								<div className="social-media-links">
									<a href="#linkedin" target="_blank" rel="">
										<LinkedInIcon />
									</a>
									<a href="#github" target="_blank" rel="">
										Github
									</a>
								</div>
							</div>
						))}
					</div>
					<div className="elements-container second-row">
						{images.slice(4, 7).map((element, index) => (
							<div key={index + 4} className="element-box">
								<div className="picture-container">
									<img src={element} alt={`element${index + 5}`} />
								</div>
								<p>{descriptions[index + 4]}</p>
								<div className="social-media-links">
									<a href="#linkedin" target="_blank" rel="">
										LinkedIn
									</a>
									<a href="#github" target="_blank" rel="">
										Github
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
};

export default About;
