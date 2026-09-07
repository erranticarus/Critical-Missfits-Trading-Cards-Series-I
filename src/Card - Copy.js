/** @format */

import { useState } from "react";
import "./Card.css";

const Card = ({ data }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [holoPosition, setHoloPosition] = useState({ x: 50, y: 50 });

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	const handleMouseMove = (e) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		setHoloPosition({ x, y });
	};

	return (
		<div
			className={`card-container ${data.flipType} ${isFlipped ? "flipped" : ""}`}
			onClick={handleClick}
			onMouseMove={handleMouseMove}>
			<div className="card-inner">
				{/* Front of the card */}
				<div className="card-front">
					{/* Background gradient layer */}
					<div
						className="layer-bg gradient-bg"
						style={{
							background: `linear-gradient(135deg,
                rgba(26, 26, 26, 0.95) 0%,
                rgba(45, 45, 45, 0.9) 50%,
                rgba(26, 26, 26, 0.95) 100%),
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(0, 0, 0, 0.1) 2px,
                  rgba(0, 0, 0, 0.1) 4px
                )`,
						}}></div>

					{/* Character artwork (PNG raster) */}
					<img src={data.image} className="layer-art" alt={data.name} />

					{/* Holographic foil overlay */}
					<div
						className="holo-overlay"
						style={{
							backgroundImage: `
								radial-gradient(
									circle at ${holoPosition.x}% ${holoPosition.y}%,
									rgba(255, 255, 255, 0.3) 0%,
									rgba(0, 255, 255, 0.4) 15%,
									rgba(255, 0, 255, 0.4) 30%,
									transparent 60%
								),
								linear-gradient(
									115deg,
									transparent 10%,
									rgba(255, 255, 255, 0.5) 20%,
									rgba(0, 255, 255, 0.6) 30%,
									rgba(255, 0, 255, 0.6) 40%,
									rgba(255, 255, 0, 0.5) 50%,
									rgba(255, 100, 255, 0.6) 60%,
									rgba(100, 255, 255, 0.6) 70%,
									rgba(255, 255, 255, 0.5) 80%,
									transparent 90%
								)
							`
						}}
					></div>

					{/* SVG frame overlay (vector graphics) */}
					<svg
						className="layer-frame"
						viewBox="0 0 300 450"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect
							x="5"
							y="5"
							width="290"
							height="440"
							rx="15"
							stroke={data.frameColor}
							strokeWidth="4"
							fill="none"
						/>

						{/* IDE-style title bar */}
						<path
							d="M5 20C5 11.7157 11.7157 5 20 5H280C288.284 5 295 11.7157 295 20V40H5V20Z"
							fill="#2d2d2d"
						/>
						<line
							x1="5"
							y1="40"
							x2="295"
							y2="40"
							stroke={data.frameColor}
							strokeWidth="2"
						/>

						{/* Window buttons */}
						<circle cx="25" cy="22" r="5" fill="#FF5F56" />
						<circle cx="45" cy="22" r="5" fill="#FFBD2E" />
						<circle cx="65" cy="22" r="5" fill="#27C93F" />

						{/* Corner accents */}
						<path
							d="M5 400 V445 H50"
							stroke={data.frameColor}
							strokeWidth="4"
						/>
						<circle cx="50" cy="445" r="3" fill={data.frameColor} />

						{/* Bottom Right Corner Accent */}
						<path
							d="M295 400 V445 H250"
							stroke={data.frameColor}
							strokeWidth="4"
						/>
						<circle cx="250" cy="445" r="3" fill={data.frameColor} />

						{/* MavScript branding */}
						<text
							x="150"
							y="435"
							textAnchor="middle"
							fontFamily="Courier New, monospace"
							fontSize="12"
							fill={data.frameColor}
							opacity="0.8">
							&lt;MavScript /&gt;
						</text>
					</svg>

					{/* Title and rarity badge */}
					<div className="card-title">
						<h2>{data.name}</h2>
						<span className="rarity">LEGENDARY</span>
					</div>
				</div>

				{/* Back of the card */}
				<div className="card-back">
					{/* Background for card back */}
					<div
						className="layer-bg gradient-bg"
						style={{
							background: `linear-gradient(135deg,
                rgba(34, 34, 34, 0.95) 0%,
                rgba(50, 50, 50, 0.9) 50%,
                rgba(34, 34, 34, 0.95) 100%)`,
						}}></div>

					{/* Simple border frame for back */}
					<svg
						className="layer-frame"
						viewBox="0 0 300 450"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect
							x="5"
							y="5"
							width="290"
							height="440"
							rx="15"
							stroke={data.frameColor}
							strokeWidth="4"
							fill="none"
						/>
					</svg>

					{/* Character stats and description */}
					<div className="card-content">
						<h3 style={{ color: data.frameColor }}>{data.role}</h3>

						<ul className="stats-list">
							{Object.entries(data.stats).map(([key, value]) => (
								<li key={key}>
									<span className="stat-key" style={{ color: data.frameColor }}>
										{key.charAt(0).toUpperCase() + key.slice(1)}:
									</span>
									<span className="stat-value"> {value}</span>
								</li>
							))}
						</ul>

						<p className="lore">"{data.desc}"</p>
					</div>
				</div>
			</div>

			{/* Tilt tracking grid - 25 invisible zones for mouse position */}
			<div className="tilt-canvas">
				{[...Array(25)].map((_, i) => (
					<div key={i} className={`tilt-zone tilt-${i + 1}`}></div>
				))}
			</div>
		</div>
	);
};

export default Card;
