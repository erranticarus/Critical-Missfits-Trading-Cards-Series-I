/** @format */

import React from "react";
import Card from "./Card";
import cardsData from "./data";
import "./App.css";

function App() {
	return (
		<div className="app">
			<header className="app-header">
				<div className="banner-container">
					<img
						src="./assets/banner.png"
						className="app-logo"
						alt="Critical Missfits Trading Cards"
					/>

					<div
						className="banner-shine"
						aria-hidden="true"
					/>
				</div>

				<p className="card-instructions">
					Scroll down to explore the cards
					<br />
					Single-click a card to flip it over • Double-click to zoom in •
					Click anywhere outside the card to zoom back out
				</p>
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