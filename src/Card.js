/** @format */

import { useState } from "react";
import "./Card.css";

const Card = ({ data }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const [mousePosition, setMousePosition] = useState({
		x: 50,
		y: 50,
	});

	const handleClick = () => {
		setIsFlipped((current) => !current);
	};

	const handleMouseMove = (e) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();

		const screenX =
			((e.clientX - rect.left) / rect.width) * 100;
		const screenY =
			((e.clientY - rect.top) / rect.height) * 100;

		const x = screenX / 100;
		const y = screenY / 100;

		const maxTilt = 12;

		const rotateY = (x - 0.5) * maxTilt * 2;
		const rotateX = (0.5 - y) * maxTilt * 2;

		setTilt({
			x: rotateX,
			y: rotateY,
		});

		if (isFlipped) {
			setMousePosition({
				x: screenY,
				y: 100 - screenX,
			});
		} else {
			setMousePosition({
				x: screenX,
				y: screenY,
			});
		}
	};

	const handleMouseLeave = () => {
		setTilt({ x: 0, y: 0 });
		setMousePosition({
			x: 50,
			y: 50,
		});
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
				<div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
					{/* ==================== FRONT ==================== */}

					<div
						className="card-front"
						style={{
							"--mouse-x": `${mousePosition.x}%`,
							"--mouse-y": `${mousePosition.y}%`,
						}}
					>
						{/* Base card artwork */}
						<img
							src={data.front}
							className="card-image card-base"
							alt={`${data.name} front`}
						/>

						{/* Border layer */}
						<img
							src={data.border}
							className="card-image card-border"
							alt=""
							aria-hidden="true"
						/>

						{/* Holographic light */}
						<div className="holo-overlay" />
					</div>

					{/* ==================== BACK ==================== */}

					<div
						className="card-back"
						style={{
							"--mouse-x": `${mousePosition.x}%`,
							"--mouse-y": `${mousePosition.y}%`,
						}}
					>
						<img
							src={data.back}
							className="card-image"
							alt={`${data.name} back`}
						/>

						<div className="holo-overlay" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;