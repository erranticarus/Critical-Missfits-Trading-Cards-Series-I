/** @format */

import React from "react";
import Card from "./Card";
import cardsData from "./data";
import "./App.css";

function App() {
	return (
		<div className="app">
			<header className="app-header">
				<img
					src="./assets/banner.png"
					className="app-logo"
					alt="Critical Missfits Trading Cards"
				/>
			</header>

			<main className="app-container">
				{cardsData.map((card) => (
					<Card key={card.id} data={card} />
				))}
			</main>
		</div>
	);
}

export default App;