/** @format */

import React from "react";
import Card from "./Card";
import cardsData from "./data";
import "./App.css";

const GalleryBanner = ({ src, alt = "" }) => {
	return (
		<div className="gallery-banner">
			<img
				src={src}
				className="gallery-banner-image"
				alt={alt}
			/>

			<div
				className="gallery-banner-shine"
				style={{
					"--banner-mask": `url(${src})`,
				}}
				aria-hidden="true"
			/>
		</div>
	);
};

function App() {
	const sections = [1, 2, 3];

	return (
		<div className="app">

			{/* ==================== MAIN HEADER ==================== */}

			<header className="app-header">
				<GalleryBanner
					src="./assets/banner.png"
					alt="Critical Missfits Trading Cards"
				/>

				<p className="card-instructions">
					Scroll down to explore the cards
					<br />
					Single-click a card to flip it over • Double-click to zoom in •
					Click anywhere outside the card to zoom back out
				</p>
			</header>

			{/* ==================== CARD 000 ==================== */}

			<section className="gallery-section section-zero">
				<div className="app-container">
					{cardsData
						.filter((card) => card.section === 0)
						.map((card) => (
							<Card key={card.id} data={card} />
						))}
				</div>
			</section>

			{/* ==================== SECTIONS 1–3 ==================== */}

			{sections.map((section) => {
				const sectionCards = cardsData.filter(
					(card) => card.section === section
				);

				return (
					<section
						className={`gallery-section section-${section}`}
						key={section}
					>
						<GalleryBanner
							src={`./assets/banner_${String.fromCharCode(
								96 + section
							)}.png`}
						/>

						<div className="app-container">
							{sectionCards.map((card) => (
								<Card key={card.id} data={card} />
							))}
						</div>
					</section>
				);
			})}
		</div>
	);
}

export default App;