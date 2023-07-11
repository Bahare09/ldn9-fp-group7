import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Input from "../components/Input";
import Output from "../components/Output";
import "./Home.css";
import "../components/InputOutput.css";
import Header from "../components/Header";
import AlternativeButton from "../components/AlternativeButton";
import CopyButton from "../components/CopyButton";
import Footer from "../components/Footer";
import TextToSpeech from "../components/TextToSpeech";

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [showOutput, setShowOutput] = useState(false);
	const [outputValue, setOutputValue] = useState("");
	const [isMobile, setIsMobile] = useState(false);
	const [alternativeValue, setAlternativeValue] = useState("");
	const [showAlternatives, setShowAlternatives] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // Add the isLoading state

	const { user, isAuthenticated, loginWithRedirect } = useAuth0();

	const saveUserData = (userData) => {
		fetch("/api/saveUserData", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Failed to save user data");
				}
			})
			.then((data) => {
				console.log(data.message);
			})
			.catch((error) => {
				console.error("Error saving user data:", error);
			});
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			// Retrieve the saved user data from localStorage
			const savedUserData = localStorage.getItem("userData");
			if (savedUserData) {
				const { input, output, alternative } = JSON.parse(savedUserData);
				setInputValue(input);
				setOutputValue(output);
				setAlternativeValue(alternative);
				setShowOutput(true);
			}
		}
	}, [isAuthenticated]);

	const handleChange = (setter) => (event) => {
		setter(event.target.value);
	};

	const onOutputValueChange = handleChange(setOutputValue);
	const onAlternativeValueChange = handleChange(setAlternativeValue);

	const handleSubmit = () => {
		if (inputValue.trim() !== "") {
			setIsLoading(true); // Set loading state to true
			fetchData();
		}
	};

	const fetchData = async () => {
		try {
			const response = await fetch("/api/correction", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ input: inputValue }),
			});

			if (response.ok) {
				const data = await response.json();
				const correctedSentence = data;
				setOutputValue(correctedSentence);
				setShowOutput(true);
			} else {
				console.log("Error: " + response.status);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			setInputValue("");
		}
	};

	const handleReset = () => {
		setShowOutput(false);
		setOutputValue("");
		setAlternativeValue("");
		setInputValue("");
		setShowAlternatives(false);
	};

	const handleSave = () => {
		if (!isAuthenticated) {
			// Save the user data locally
			const userData = {
				input: inputValue,
				output: outputValue,
				alternative: alternativeValue,
			};
			localStorage.setItem("userData", JSON.stringify(userData));

			// Redirect to the login page
			loginWithRedirect();
			return;
		}

		// Proceed with saving the user data to the backend
		const userData = {
			name: user.name,
			email: user.email,
			sub: user.sub,
			input: inputValue,
			output: outputValue,
			alternative: alternativeValue,
		};

		saveUserData(userData);
	};

	const renderAlternatives = () => {
		if (outputValue) {
			return (
				<div className="alternative-container">
					<div className="alternative-output">
						<div className="alternative-buttons-container">
							<AlternativeButton
								outputValue={outputValue}
								setAlternativeValue={setAlternativeValue}
								setShowAlternatives={setShowAlternatives}
							/>
							<button onClick={handleReset} className="reset-button">
								Reset
							</button>
							<button onClick={handleSave} className="reset-button">
								Save
							</button>
						</div>
						{showAlternatives && (
							<div className="alternative-wrap">
								<div className="alternative-div">
									<textarea
										className="alternative-box"
										value={alternativeValue}
										onChange={onAlternativeValueChange}
									/>
								</div>
								<div className="CopyButton-div">
									<CopyButton text={alternativeValue} />
									<TextToSpeech outputValue={alternativeValue} />
								</div>
							</div>
						)}
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<main className="main" role="main">
			<div>
				<Header currentPage="home" />
			</div>
			<div className={isMobile ? "app" : "input-output-container"}>
				{!isMobile && (
					<div className="input-output-alternatives-content">
						<div className="input-output-wrapper">
							<div className="input-container">
								<Input
									inputValue={inputValue}
									setInputValue={setInputValue}
									onSubmit={handleSubmit}
								/>
							</div>
							<div className="output-container">
								<Output
									outputValue={outputValue}
									onReset={handleReset}
									onOutputValueChange={onOutputValueChange}
								/>
							</div>
						</div>
						<div>{renderAlternatives()}</div>
					</div>
				)}
				{isMobile && !showOutput && (
					<div className="input-container">
						<Input
							inputValue={inputValue}
							setInputValue={setInputValue}
							onSubmit={handleSubmit}
						/>
					</div>
				)}
				{isMobile && showOutput && (
					<div className="mobile-output-alternatives-wrapper">
						<div className="mobile-output-container">
							<Output outputValue={outputValue} onReset={handleReset} />
						</div>
						{renderAlternatives()}
					</div>
				)}
			</div>
			<div>
				<Footer />
			</div>
		</main>
	);
};

export default Home;
