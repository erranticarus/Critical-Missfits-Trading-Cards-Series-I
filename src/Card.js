/** @format */

import { useState } from "react";
import "./Card.css";

const Card = ({ data }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });

	const handleClick = () => {
		setIsFlipped((current) => !current);
	};

	const handleMouseMove = (e) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();

		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;

		const maxTilt = 12;

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
			onClick={handleClick}
		>
			<div
				className="card-tilt"
				style={{
					transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
				}}
			>
				<div
					className={`card-inner ${isFlipped ? "flipped" : ""}`}
				>
					{/* ==================== FRONT ==================== */}

					<div className="card-front">
						{/* Base artwork */}
						<img
							src={data.front}
							className="card-image card-base"
							alt={`${data.name} front`}
						/>

						{/* Card-specific border */}
						<img
							src={data.border}
							className="card-image card-border"
							alt=""
							aria-hidden="true"
						/>

						{/* Red foil reflection */}
						<div
							className="foil-overlay"
							style={{
								"--border-mask": `url(${data.border})`,
								"--foil-x": `${tilt.y * 3}%`,
								"--foil-y": `${-tilt.x * 3}%`,
								"--foil-angle": `${45 + tilt.y * 2}deg`,
							}}
						/>
					</div>

					{/* ==================== BACK ==================== */}

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