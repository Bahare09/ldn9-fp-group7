import React from "react";
import Header from "../components/Header";
import Footer from "./Footer";
import "./About.css";
import bahare from "../images/bahare.jpg";
import erin from "../images/erin.jpg";
import hadi from "../images/hadi.jpg";
import zahraa from "../images/zahraa.jpg";
import lexi from "../images/lexi.jpg";
import rob from "../images/rob.jpg";
import dom from "../images/dom.jpg";

const About = () => {
	const images = [bahare, hadi, zahraa, lexi, erin, rob, dom];

	return (
		<main role="main" className="about-page">
			<div>
				<Header currentPage="about" />
			</div>
			<div className="about-page">
				<h2>About Us</h2>
				<p>
					WordWise is an innovative platform aimed at enhancing and enriching
					your English skills. Our interactive tools and engaging content
					provide an effective and fun way to learn new words and improve your
					overall communication.
				</p>
				<div className="elements-container">
					{images.map((element, index) => (
						<div key={index} className="element-box">
							<div className="picture-container">
								<img src={element} alt={`element${index + 1}`} />
							</div>
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
			<div>
				<Footer />
			</div>
		</main>
	);
};

export default About;
