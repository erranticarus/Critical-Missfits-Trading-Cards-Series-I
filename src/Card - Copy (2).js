/** @format */

import { useState } from "react";
import "./Card.css";

const Card = ({ data }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	const handleMouseMove = (e) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();

		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;

		// Maximum tilt in degrees
		const maxTilt = 12;

		// Move toward the cursor
		const rotateY = (x - 0.5) * maxTilt * 2;
		const rotateX = (0.5 - y) * maxTilt * 2;

		setTilt({
			x: rotateX,
			y: rotateY,
		});
	};

	const handleMouseLeave = () => {
		setTilt({ x: 0, y: 0 });
	};

	return (
		<div
			className="card-container"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<div
				className="card-tilt"
				style={{
					transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
				}}
			>
				<div
					className={`card-inner ${isFlipped ? "flipped" : ""}`}
					onClick={handleClick}
				>
					{/* Front */}
					<div className="card-front">
						<img
							src={data.front}
							className="card-image"
							alt={`${data.name} front`}
						/>
					</div>

					{/* Back */}
					<div className="card-back">
						<img
							src={data.back}
							className="card-image"
							alt={`${data.name} back`}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;